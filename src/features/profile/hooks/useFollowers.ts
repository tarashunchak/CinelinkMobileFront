import { getUserProfileData } from "@/api/currentUser";
import { GetUserFollowers } from "@/api/followers/followers";
import { UserProfile_T } from "@/src/features/profile/types";
import UserCard from "@/src/components/user-card";
import { textStyle } from "@/styles/textStyles";
import { heightPercentageToDP as hp, } from "react-native-responsive-screen";
import { useFocusEffect, useRouter } from "expo-router";
import React, { memo, useCallback, useMemo } from "react";
import Spacer from "@/src/components/ui/spacer";
import { Text, StyleSheet, FlatList } from "react-native";
import { UsersManager, useUser, useUsers, useUserStore } from "@/src/rt_client/managers/users_manager";
import FriendCard from "@/src/components/friend-card";
import {shallow} from "zustand/shallow";

/*export function useFollowers(userID: number) {
  const [followers, setFollowers] = useState<UserProfile_T>();
  const [followersLoading, setFollowersLoading] = useState<boolean>();

  const loadFollowers = useCallback(async () => {
    setFollowersLoading(true);
    try {
      const data = await GetUserFollowers(userID);
      if (!data) return;
      setFollowers(data);
    } finally {
      setFollowersLoading(false);
    }
  }, [userID])

  return {
    followers,
    loadFollowers,
    followersLoading,
  };
  };*/

async function LoadManyUsers(usersIds: []) {
  usersIds?.forEach((id)=>{
      UsersManager.getInstance().load(id);
  });
};

export function useFollowers(userID: number) {
  const followersIds = useUserStore(
    (s: any) => s.userProfiles[userID]?.followers_ids,
    shallow
  )
  const users = useUsers();

  const followers = useMemo(() => {
    console.warn("Followings ids: ", followersIds)
    return followersIds?.map((id) => users[id]).filter(Boolean) ?? [];
  }, [followersIds, users])

  return followers;
    //return userProfile?.followers_ids?.map((id) => users[id]).filter(Boolean) ?? [];
};

export function useFollowings(userID: number) {
  const followingsIds = useUserStore(
    (s: any) => s.userProfiles[userID]?.followings_ids,
    shallow
  )
  const users = useUsers();

  const followings = useMemo(() => {
    console.warn("Followings ids: ", followingsIds)
    return followingsIds?.map((id) => users[id]).filter(Boolean) ?? [];
  }, [followingsIds, users])

  return followings;
  //return userProfile?.followings_ids?.map((id) => users[id]).filter(Boolean);
};