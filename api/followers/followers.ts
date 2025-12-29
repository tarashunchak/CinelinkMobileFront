import { API_URL } from "@/api/API_CONFIG";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";

export async function GetUserFollowers(userID: number) {
  console.log("USER ID followers: ", userID)
  const response = await fetch(`${API_URL}/users/${userID}/followers`)
  const data = await response.json();
  return data?.results;
};

export async function FollowUser(userID: number) {
  console.log("USER ID following: ", userID)
  const response = await fetch(`${API_URL}/users/${userID}/followers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ follower_id: useAuthStore.getState().user?.user_id })
  })
  const data = await response.json();
  return data?.status;
};