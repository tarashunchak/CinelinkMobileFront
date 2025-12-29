import { API_URL } from "@/api/API_CONFIG";

export async function GetUserRecommendations(userID: number) {
  const response = await fetch(`${API_URL}/users/${userID}/recommendations`)
  const data = await response.json();
  return data?.results;
};