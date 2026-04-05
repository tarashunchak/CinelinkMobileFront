import { getUserProfileData } from "@/api/currentUser";
import { GetUserFollowers } from "@/api/followers/followers";
import { UserProfile_T } from "@/app/profile/types";
import { useCallback, useState } from "react";

export function useFollowers(userID: number) {
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
};