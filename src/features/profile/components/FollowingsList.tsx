import { useFocusEffect, useRouter } from "expo-router";
import { heightPercentageToDP as hp, } from "react-native-responsive-screen";
import React, { useMemo, useCallback } from "react";
import { StyleSheet } from "react-native";
import UserCard from "@/src/components/user-card";
import Spacer from "@/src/components/ui/spacer";
import { FlatList } from "react-native-gesture-handler";
import { UsersManager, useUser, useUsers } from "@/src/rt_client/src/managers/users_manager";
import FriendCard from "@/src/components/friend-card";

export default function FollowingsList({ userID }: { userID: number }) {
  //const [followings, setFollowings] = useState<any[]>([]);
  const userProfile = useUser(userID);
  const users = useUsers();
  const router = useRouter();

  const handlePress = useCallback((userID: number)=>{
    router.push({
      pathname: "/profile",
      params: {userID}
    });
  }, []);

  const followings = useMemo(()=>{
    console.warn("Followers ids: ", userProfile?.followings_ids)
    return userProfile?.followings_ids?.map((id)=>users[id]).filter(Boolean) ?? [];
  }, [userProfile?.followings_ids, users])

  useFocusEffect(
    useCallback(() => {
      userProfile?.followings_ids?.forEach((id)=>{
          UsersManager.getInstance().load(id);
      });
    }
      , [userProfile?.followers_ids]));

  const renderItem = useCallback(({ item }: any) => 
    <FriendCard user={item} onPress={handlePress}/> , 
  []);

  return (
    <FlatList
      scrollEnabled={false}
      style={styles.view}
      data={followings}
      keyExtractor={(item: any, index: number) => item?.user_id ? `user-${item?.user_id}` : String(index)}
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