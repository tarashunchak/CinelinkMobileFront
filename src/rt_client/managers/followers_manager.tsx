import React, { useEffect, useState } from "react";
import { UsersManager, useUsers, useUserStore } from "./users_manager";
import { GetUserFollowers } from "@/api/followers";

interface Props {
  userID: number; 
  followersIDs: number[] | undefined;
};

export function useUserFollowers({userID, followersIDs}: Props): any[]{
  const [followers, setFollowers] = useState<any[]>([]);

  async function load(){
    const data = await GetUserFollowers(userID);
    if(data && data.length !== 0) setFollowers(data);
  };

  useEffect(()=>{
    load();
    setFollowers(followersIDs?.map((id: number, index: number)=>{
      const user = useUserStore.getState().userProfiles[id];
      if(user)
        return user;
      return UsersManager.getInstance().load(id);
    }))
  }, [userID, followers, users]);

  return followers;
};