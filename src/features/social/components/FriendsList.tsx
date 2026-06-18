import { textStyle } from "@/styles/textStyles";
import React, { memo, useCallback, useEffect, useMemo } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FlatList, StyleSheet } from "react-native";
import { UsersManager, useUser, useUsers } from "@/src/rt_client/managers/users_manager";
import Spacer from "@/src/components/ui/spacer";
import  UserCard from "@/src/components/user-card";
import { getCurrentUserID } from "@/utils/utils";
import { useRouter } from "expo-router";
import { UserID } from "@/src/rt_client/models/models";

interface Props {
  user_id: number;
  username: string;
  first_name: string | undefined;
  last_name: string | undefined;
  avatar_url: string | undefined;
  is_online: boolean;
}

function FriendsList() {
  const userProfile = useUser(getCurrentUserID());
  const users = useUsers();
  const router = useRouter();

  const handlePress = useCallback((userID: UserID)=>{
    router.push({
      pathname: "profile",
      params: { userID },
    });
  }, []);

  const friendsIds = useMemo(()=>
    Array.from(new Set([...userProfile?.followers_ids, ...userProfile?.followings_ids])?.values()),
  [userProfile!.followers_ids, userProfile!.followings_ids]);

  const friends = useMemo(()=>{
    return friendsIds?.map((id) => users?.[id])
  }, [getCurrentUserID(), users]);

  useEffect(()=>{
    friendsIds.forEach(id => {
      if(!users?.[id]) UsersManager.getInstance().load(id);
    })
  }, [userProfile!.followers_ids, userProfile!.followings_ids]);

  const renderItem = useCallback(({ item }: any) => (
    <UserCard user={item} onPress={handlePress}/>
  ), [getCurrentUserID(), users]);

  return (
    <FlatList
      data={friends}
      keyExtractor={(item: any, index: number) => item?.user_id ? `user-${item?.user_id}` : String(index)}
      renderItem={renderItem}
      removeClippedSubviews
      contentContainerStyle={styles.contentContainer}
      ListFooterComponent={<Spacer orientation="v" spacing={hp(10)}/>}
    />
  );
};

export default memo(FriendsList);

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    height: "100%",
    gap: "6%",
    alignItems: "center",
  },
  image: {
    height: 58,
    width: 58,
    borderRadius: 29,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 0.5,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  textView: {
    flexDirection: "column",
    height: hp(10) * 0.6,
    justifyContent: "space-between",
  },
  infoView: {
    flexDirection: "row",
    gap: 10,
  },
  isOnlineView: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center"
  },
  isOnlineDot: {
    height: 12,
    width: 12,
    backgroundColor: "#329E4F",
    borderRadius: 10,
    position: "absolute",
    right: 3,
    bottom: 3,
    borderColor: "white",
    borderWidth: 0.5,
  },
  text: {
    ...textStyle.white14,
    color: "#329E4F",
  },
  cardContainer: {
    flexDirection: "row",
    width: "100%",
    height: hp("8.5%"),
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
    borderRadius: 15,
    justifyContent: "space-between",
    paddingLeft: "3%",
    marginBottom: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    alignSelf: "center",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
    borderRadius: 999,
  },
  chatIcon: {
    width: 24,
    height: 24,
    margin: 5,
  },
  contentContainer: {
    paddingHorizontal: "1%",
    paddingTop: "3%",
  },
});