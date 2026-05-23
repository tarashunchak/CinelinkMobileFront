import { GetUserFollowers } from "@/api/followers/followers";
import UserCard from "@/components/userCard";
import { heightPercentageToDP as hp, } from "react-native-responsive-screen";
import { useFocusEffect } from "expo-router";
import React, { memo, useCallback, useState } from "react";
import { UserCard_T } from "@/app/(app)/types/user";
import Spacer from "@/components/ui/spacer";
import { FlatList, StyleSheet } from "react-native";

function FollowersList({ userID }: { userID: number }) {
  const [followers, setFollowers] = useState<UserCard_T[]>([]);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      async function loadContent() {
        const data: UserCard_T[] = await GetUserFollowers(userID);
        if (mounted && data) setFollowers(data);
      }
      loadContent();
      return () => {mounted = false}
    }, [userID])
  );

  const renderItem = ({ item }: any) => {
    return <UserCard user={item} />;
  };

  return (
    <FlatList
      scrollEnabled={false}
      style={styles.view}
      data={followers}
      keyExtractor={(item: any, index: number) => String(item?.user_id ?? index)}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      ListFooterComponent={<Spacer orientation="v" spacing={hp(8)} />}
      contentContainerStyle={styles.contentContainer}
    />
  )
};

export default memo(FollowersList);

const styles = StyleSheet.create({
  view: {
    paddingTop: 5,
  },
  contentContainer: {
    padding: hp(0.5),
  },
});