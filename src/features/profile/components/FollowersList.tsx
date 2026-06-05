import { GetUserFollowers } from "@/api/followers";
import UserCard from "@/src/components/user-card";
import { textStyle } from "@/styles/textStyles";
import { heightPercentageToDP as hp, } from "react-native-responsive-screen";
import { useFocusEffect } from "expo-router";
import React, { memo, useCallback, useEffect, useState } from "react";
import { UserCard_T } from "@/src/types/user";
import Spacer from "@/src/components/ui/spacer";
import { Text, FlatList, StyleSheet } from "react-native";
import { UsersManager, useUser, useUsers, useUserStore } from "@/src/rt_client/managers/users_manager";

function FollowersList({ userID }: { userID: number }) {
  //const {followers, loadFollowers, followersLoading} = useFollowers(userID);
  const [followers, setFollowers] = useState<UserCard_T[]>();
  const userProfile = useUser(userID);
  const users = useUsers();

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      async function loadContent() {
        const data: UserCard_T[] = await GetUserFollowers(userID);
        if (mounted && data) setFollowers(data);
        if (mounted === false) {
          setFollowers(userProfile.followers_ids?.map((id) => {
            return users[id];
          }))
        }
      }
      loadContent();
      return () => { mounted = false }
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
      initialNumToRender={10}
      keyExtractor={(item: any, index: number) => String(item?.user_id ?? index)}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      ListFooterComponent={<Spacer orientation="v" spacing={hp(8)} />}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={
        <Text
          style={[
            textStyle.gray32,
            styles.emptyList
          ]}>
          {"No followers... :(\n yet"}
        </Text>
      }
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
  emptyList: {
    alignSelf: "center",
    opacity: 0.4,
    marginTop: "25%",
    textAlign: "center"
  },
});