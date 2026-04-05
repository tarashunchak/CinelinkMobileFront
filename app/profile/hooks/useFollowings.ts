import { GetUserFollowings } from "@/api/followers/followers";
import { useCallback, useState } from "react";

export function useFollowings(userID: number) {
  const [followings, setFollowings] = useState();
  const [followingsLoading, setLoading] = useState<boolean>();

  const loadFollowings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await GetUserFollowings(userID);
      if (!data) return;
      setFollowings(data);
    } finally {
      setLoading(false);
    }
  }, [userID])

  return {
    followings,
    loadFollowings,
    followingsLoading,
  };
}