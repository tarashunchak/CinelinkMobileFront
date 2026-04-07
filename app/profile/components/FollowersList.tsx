import { GetUserFollowers } from "@/api/followers/followers";
import { textStyle } from "@/styles/textStyles";
import UserCard from "@/components/userCard";
import { heightPercentageToDP as hp, } from "react-native-responsive-screen";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { UserCard_T } from "@/app/types/user";

export default function FollowersList({ userID }: { userID: number }) {
  const [followers, setFollowers] = useState<UserCard_T[]>();

  useFocusEffect(
    useCallback(() => {
      async function loadContent() {
        const data: UserCard_T[] = await GetUserFollowers(userID);
        if (!data) return;
        setFollowers(data);
      }
      loadContent();
    }, [])
  );

  return (
    <FlatList
      style={{ paddingTop: 5, paddingBottom: hp(8), maxHeight: hp(40) }}
      data={followers}
      scrollEnabled={true}
      keyExtractor={(item: any, index: number) => String(item?.user_id)}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <UserCard user={item} />}
      ListFooterComponent={<View style={{ height: hp(8) }}></View>}
    />
  )
}
