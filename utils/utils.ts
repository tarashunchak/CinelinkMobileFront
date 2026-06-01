import { useAuthStore } from "@/local_storage/user/asyncStorage/store";

export function isCurrentUser(userID: number) {
  return userID === useAuthStore?.getState()?.user?.user_id;
};

export function getCurrentUserID() {
  return useAuthStore?.getState()?.user?.user_id;
};

export async function getCurrentUser() {
  return useAuthStore?.getState()?.user;
}

export function jwtHeaders(jwt: string | undefined) {
  const locJWT = useAuthStore.getState().user?.jwt;
  return {
    "Authorization": "Bearer " + (jwt ?? locJWT),
  };
};
