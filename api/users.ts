import { API_URL } from "./API_CONFIG";

export async function GetUserLastSeenTimestamp(userID: number): Promise<string> {
  const response = await fetch(`${API_URL}/users/${userID}/last-seen`);
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
  } finally {
    console.warn("data: ", data);
  }
  return data?.results;
};