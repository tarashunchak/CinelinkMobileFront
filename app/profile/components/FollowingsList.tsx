import { GetUserFollowings } from "@/api/followers/followers";
import { useFocusEffect } from "expo-router";
import { heightPercentageToDP as hp, } from "react-native-responsive-screen";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import UserCard from "@/components/userCard";
import { UserCard_T } from "@/app/types/user";
import Spacer from "@/components/ui/spacer";
import { FlatList } from "react-native-gesture-handler";

export default function FollowingsList({ userID }: { userID: number }) {
  const [followings, setFollowings] = useState<UserCard_T[]>(Array.from({ length: 10 }));

  useFocusEffect(
    useCallback(() => {
      async function loadContent() {
        const data: UserCard_T[] = await GetUserFollowings(userID);
        if (data)
          setFollowings(data);
      }
      loadContent();
    }, [])
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
      ListFooterComponent={<Spacer spacing={hp(8)} />}
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