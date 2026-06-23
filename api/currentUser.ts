import { UserProfile_T } from "@/src/features/profile/types";
import { API_URL } from "./API_CONFIG";
import { jwtHeaders } from "@/utils/utils";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";

export let CURRENT_USER = {
  firstName: useAuthStore.getState().user?.first_name,
  lastName: useAuthStore.getState().user?.last_name,
  username: useAuthStore.getState().user?.username,
  UID: useAuthStore.getState().user?.user_id,
  avatarUrl: useAuthStore.getState().user?.avatar_url,
  bgImgUrl: useAuthStore.getState().user?.bg_img_url,
  createdAt: useAuthStore.getState().user?.created_at,
  bio: useAuthStore.getState().user?.bio,
  followers: useAuthStore.getState().user?.followers,
};

export async function updateCurrentUserData() {

}

export async function getUserProfileData(userID: number): Promise<UserProfile_T> {
  const jwt = useAuthStore.getState().user?.jwt;
  const response = await fetch(`${API_URL}/users/${userID}`,
    {
      method: "GET",
      headers: jwtHeaders(jwt)
    }
  );
  const data = await response.json();
  ////console.warn("UserProfile: ", data);
  return data.results;
}