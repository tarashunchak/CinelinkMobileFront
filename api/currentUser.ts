import { UserProfile } from "@/app/screens/UserPage/types";
import { API_URL } from "./API_CONFIG";

export let CURRENT_USER = {
  firstName: "",
  lastName: "",
  username: "",
  UID: 1,
};

export async function updateCurrentUserData() {

}

export async function getUserProfileData(userID: number): Promise<UserProfile> {
  const response = await fetch(`${API_URL}/user/profile?userID=${userID}`);
  const json = await response.json();
  const data: UserProfile = json.results;
  console.warn("UserProfile: ", data);
  return data;
  /*return {
    first_name: "c",
    last_name: "c",
    username: "c",
    joined_at: "c",
    bio: "c",
    image_url: "c",
    followers: 0,
    followings: 0,
    is_following: false,
    posts: 0,
  }*/;
}