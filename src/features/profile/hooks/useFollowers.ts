import { useEffect, useMemo } from "react";
import { UsersManager, useUser, useUsers, useUserStore } from "@/src/rt_client/managers/users_manager";

async function LoadManyUsers(usersIds: number[]) {
  const users = useUserStore.getState().userProfiles;
  usersIds?.forEach((id)=>{
      if(!users[id])
        UsersManager.getInstance().load(id);
  });
};

export function useFollowers(userID: number) {
  const userProfile = useUser(userID);
  const users = useUsers();

  useEffect(()=>{
    void LoadManyUsers(userProfile?.followers_ids);
  }, [userProfile?.followers_ids?.join(',')]);

  const followers = useMemo(() => {
    return userProfile?.followers_ids?.map((id) => users[id]).filter(Boolean) ?? [];
  }, [userProfile?.followers_ids, users]);

  return followers;
};

export function useFollowings(userID: number) {
  const userProfile = useUser(userID);
  const users = useUsers();

  useEffect(()=>{
    void LoadManyUsers(userProfile?.followings_ids);
  }, [userProfile?.followings_ids?.join(',')]);

  const followings = useMemo(() => {
    return userProfile?.followings_ids?.map((id) => users[id]).filter(Boolean) ?? [];
  }, [userProfile?.followings_ids, users])

  return followings;
};