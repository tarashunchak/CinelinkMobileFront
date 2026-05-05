import { GetUserFollowers } from "@/api/followers/followers";
import UserCard from "@/components/userCard";
import { heightPercentageToDP as hp, } from "react-native-responsive-screen";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { UserCard_T } from "@/app/types/user";
import Spacer from "@/components/ui/spacer";
import { FlatList } from "react-native-gesture-handler";

export default function FollowersList({ userID }: { userID: number }) {
  const [followers, setFollowers] = useState<UserCard_T[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function loadContent() {
        const data: UserCard_T[] = await GetUserFollowers(userID);
        if (!data) return;
        setFollowers(data);
        console.warn("FollowersList: ", data)
      }
      loadContent();
    }, [])
  );

  return (
    <FlatList
      style={{ paddingTop: 5 }}
      data={followers}
      scrollEnabled={true}
      keyExtractor={(item: any, index: number) => String(item?.user_id)}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <UserCard user={item} />}
      ListFooterComponent={<Spacer spacing={hp(8)} />}
    />
  )
}
