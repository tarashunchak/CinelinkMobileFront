import { API_URL } from "../API_CONFIG";

export async function GetHomeMovies() {
  const response = await fetch(`${API_URL}/home`);
  const data = await response.json();
  return data?.results;
}