import { API_URL } from "@/api/API_CONFIG";
import { getCurrentUserID, jwtHeaders } from "@/utils/utils";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";

export async function GetUserChats(userID: number) {
  const response = await fetch(`${API_URL}/users/${userID}/chats`, {
    headers: jwtHeaders(undefined),
  });
  if (!response.ok) {
    switch (response.status) {
      case 404:
        throw new Error("Not Found");
      case 400:
        throw new Error("Bad Request");
      case 500:
        throw new Error("Internal");
      default:
        throw new Error(`HTTP error: ${response.status}`);
    }
  }
  const data = await response.json();
  return data?.results;
};

export async function GetChat(chatID: number) {
  const jwt = useAuthStore.getState().user?.jwt;
  const response = await fetch(`${API_URL}/chats/${chatID}`,
    {
      method: "GET",
      headers: jwtHeaders(jwt)
    }
  )
  const data = await response.json();
  return data?.results;
};

export async function GetChatMessages(chatID: number) {
  const response = await fetch(`${API_URL}/chats/${chatID}/messages`);
  if (!response.ok) { }
  const data = await response.json();
  return data?.results;
};

export async function GetDirectChatID(userID: number): Promise<number> {
  //if (1) return 3;
  //console.warn("GETDirectChatID");
  const response = await fetch(`${API_URL}/chats/get-or-create/${userID}`, {
    headers: jwtHeaders(undefined),
  });
  const text = await response.text();
  const data = JSON.parse(text);
  //console.warn("GETDIRECTCHATID: ", data?.results);
  return data?.results;
};