import { API_URL } from "@/api/API_CONFIG";

export async function GetQueryResult(query: string) {
  const response = await fetch(`${API_URL}/search/${query}`);
  if (!response.ok)
    return;
  const text = await response.text()
  const data = text ? JSON.parse(text) : null;
  return data ? data?.results : null;
}