import { getUserProfileData } from "@/api/currentUser";
import { UserProfile_T } from "@/app/profile/types";
import { useCallback, useState } from "react";

export function useUserProfile(userID: number) {
  const [user, setUser] = useState<UserProfile_T>();
  const [loading, setLoading] = useState<boolean>();

  const loadUser = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUserProfileData(userID);
      if (!data) return;
      setUser(data);
    } finally {
      setLoading(false);
    }
  }, [userID])

  return {
    user,
    loadUser,
    loading,
  };
};