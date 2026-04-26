import { API_URL } from "@/api/API_CONFIG";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { jwtHeaders } from "@/utils/utils";

export async function GetUserFollowers(userID: number): Promise<any> {
  console.log("USER ID followers: ", userID)
  const response = await fetch(`${API_URL}/users/${userID}/followers`)
  const data = await response.json();
  return data?.results;
};

export async function GetUserFollowings(userID: number): Promise<any> {
  console.log("USER ID followings: ", userID)
  const response = await fetch(`${API_URL}/users/${userID}/followings`)
  const data = await response.json();
  return data?.results;
};

export async function FollowUser(userID: number): Promise<boolean> {
  console.log("USER ID following: ", userID)
  const response = await fetch(`${API_URL}/users/${userID}/followers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ follower_id: useAuthStore.getState().user?.user_id })
  })
  const data = await response.json();
  return data?.status === 200;
};

export async function UnfollowUser(userID: number): Promise<any> {
  const jwt = useAuthStore.getState().user?.jwt;
  const response = await fetch(`${API_URL}/users/${userID}/followers`, {
    method: "DELETE",
    headers: jwtHeaders(jwt)
  })
  const data = await response.json();
  return data.status == 200;
};