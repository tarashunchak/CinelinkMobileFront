import UserCard from "@/src/components/user-card";
import { textStyle } from "@/styles/textStyles";
import { heightPercentageToDP as hp, } from "react-native-responsive-screen";
import { useFocusEffect, useRouter } from "expo-router";
import React, { memo, useCallback, useMemo } from "react";
import Spacer from "@/src/components/ui/spacer";
import { Text, StyleSheet, FlatList } from "react-native";
import { UsersManager, useUser, useUsers } from "@/src/rt_client/src/managers/users_manager";
import FriendCard from "@/src/components/friend-card";

function FollowersList({ userID }: { userID: number }) {
  const userProfile = useUser(userID);
  const users = useUsers();
  const router = useRouter();

  const followers = useMemo(() => {
    console.warn("Followers ids: ", userProfile?.followers_ids)
    return userProfile?.followers_ids?.map((id) => users[id]).filter(Boolean) ?? [];
  }, [userProfile?.followers_ids?.length, users])

  const handlePress = useCallback((userID: number)=>{
    router.push({
      pathname: "/profile",
      params: {userID}
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      userProfile?.followers_ids?.forEach((id) => {
        if (!users[id]) UsersManager.getInstance().load(id);
      });
    }
    , [userProfile?.followers_ids]
  ));

  const renderItem = useCallback(({ item }: any) => 
    <FriendCard user={item} onPress={handlePress}/>, 
  []);

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