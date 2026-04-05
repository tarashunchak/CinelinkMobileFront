import { GetUserFollowings } from "@/api/followers/followers";
import { useFocusEffect } from "expo-router";
import { heightPercentageToDP as hp, } from "react-native-responsive-screen";
import React, { useCallback, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
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
      style={styles.view}
      data={followings}
      keyExtractor={(item: any, _: number) => String(item?.user_id)}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <UserCard user={item} />}
      ListFooterComponent={<View style={{ height: hp(8) }}></View>}
    />
  )
};

const styles = StyleSheet.create({
  view: {
    paddingTop: 5,
    paddingBottom: "8%"
  }
});