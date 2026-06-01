import { GetUserFollowings } from "@/api/followers";
import { useFocusEffect } from "expo-router";
import { heightPercentageToDP as hp, } from "react-native-responsive-screen";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import UserCard from "@/src/components/user-card";
import { UserCard_T } from "@/app/(app)/types/user";
import Spacer from "@/src/components/ui/spacer";
import { FlatList } from "react-native-gesture-handler";

export default function FollowingsList({ userID }: { userID: number }) {
  const [followings, setFollowings] = useState<UserCard_T[]>([]);

  useFocusEffect(
    useCallback(() => {
      let mounted = false;
      async function loadContent() {
        const data: UserCard_T[] = await GetUserFollowings(userID);
        if (mounted && data) setFollowings(data);
      }
      loadContent();
      return () => {mounted = true}
    }, [userID])
  );

  const renderItem = ({ item }: any) => {
    return <UserCard user={item} />;
  };

  return (
    <FlatList
      scrollEnabled={false}
      style={styles.view}
      data={followings}
      keyExtractor={(item: any, index: number) => String(item?.user_id ?? index)}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      ListFooterComponent={<Spacer orientation="v" spacing={hp(8)} />}
      contentContainerStyle={styles.contentContainer}
    />
  )
};

const styles = StyleSheet.create({
  view: {
    paddingTop: 5,
  },
  contentContainer: {
    padding: hp(0.5),
  },
});