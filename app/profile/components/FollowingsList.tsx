import { GetUserFollowings } from "@/api/followers/followers";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import UserCard from "@/components/userCard";
import { UserCard_T } from "@/app/types/user";

export default function FollowingsList({ userID }: { userID: number }) {
  const [followings, setFollowings] = useState<UserCard_T[]>();

  useFocusEffect(
    useCallback(() => {
      async function loadContent() {
        const data: UserCard_T[] = await GetUserFollowings(userID);
        if (!data) return;

        setFollowings(data);
      }
      loadContent();
    }, [])
  );

  return (
    <FlatList
      style={{ paddingTop: 5, paddingBottom: "8%" }}
      data={followings}
      keyExtractor={(_: any, index: number) => String(index)}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <UserCard user={item} />}
    />
  )
}