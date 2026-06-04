import { API_URL } from "@/api/API_CONFIG";
import { jwtHeaders } from "@/utils/utils";

export async function GetUserRecommendations(userID: number) {
  const response = await fetch(`${API_URL}/users/${userID}/recommendations`, {
    headers: jwtHeaders(undefined),
  })
  const data = await response.json();
  return data?.results;
};