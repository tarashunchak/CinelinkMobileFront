import { API_URL } from "@/api/API_CONFIG";

export async function GetQueryResult(query: string) {
  const response = await fetch(`${API_URL}/search/${query}`)
  if (!response.ok)
    return;
  const data = await response.json();
  return data?.results;
}