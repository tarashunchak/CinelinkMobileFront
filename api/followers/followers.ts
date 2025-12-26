import { API_URL } from "@/api/API_CONFIG";

export async function GetUserFollowers(userID: number) {
  const response = await fetch(`${API_URL}/users/${userID}/followers`)
  const data = await response.json();
  return data?.results;
};