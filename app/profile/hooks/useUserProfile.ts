import { getUserProfileData } from "@/api/currentUser";
import { UserProfile_T } from "@/app/profile/types";
import { useCallback, useState } from "react";

export function useUserProfile(userID: number) {
  const [user, setUser] = useState<UserProfile_T>();
  const [userLoading, setLoading] = useState<boolean>();

  const loadUser = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUserProfileData(userID);
      if (!data) return;
      setUser(data);
    } finally {
      setLoading(false);
      console.warn("USER PROFILE: ", user);
    }
  }, [userID])

  return {
    user,
    loadUser,
    userLoading,
  };
};