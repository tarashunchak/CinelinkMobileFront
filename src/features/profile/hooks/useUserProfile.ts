import { getUserProfileData } from "@/api/currentUser";
import { UserProfile_T } from "@/src/features/profile/types";
import { useCallback, useState } from "react";
import { getCurrentUserID } from "@/utils/utils";

export function useUserProfile(userID: number) {
  const [user, setUser] = useState<UserProfile_T>();
  const [userLoading, setLoading] = useState<boolean>();

  const loadUser = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUserProfileData(userID ?? getCurrentUserID());
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