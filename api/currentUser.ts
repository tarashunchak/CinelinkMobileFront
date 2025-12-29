import { UserProfile_T } from "@/app/profile/types";
import { API_URL } from "./API_CONFIG";
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
  const response = await fetch(`${API_URL}/users/${userID}`);
  const json = await response.json();
  const data: UserProfile_T = json.results;
  console.warn("UserProfile: ", data);
  return data;
}