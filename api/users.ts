import { jwtHeaders } from "@/utils/utils";
import { API_URL } from "./API_CONFIG";

export async function GetUserLastSeenTimestamp(userID: number): Promise<string> {
  const response = await fetch(`${API_URL}/users/${userID}/last-seen`,
    {headers: jwtHeaders(undefined)}
  );
  try {
    const text = await response.text();
    const data = await JSON.parse(text);
    if(data) return data?.results;
  } catch (err) {
    console.warn("GetUserLastSeenTimestamp err: ", err);
  }

  return "";
};