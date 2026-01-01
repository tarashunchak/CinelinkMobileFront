import { useAuthStore } from "@/local_storage/user/asyncStorage/store";

export function isCurrentUser(userID: number) {
  return userID === useAuthStore?.getState()?.user?.user_id;
}

export function getCurrentUserID() {
  return useAuthStore?.getState()?.user?.user_id;
}