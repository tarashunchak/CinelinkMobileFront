import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { API_URL } from "./../API_CONFIG";
import { getCurrentUser, jwtHeaders } from "@/utils/utils";

type APIResponse = {
  status: number;
  results: any;
}

export async function GetUserChats(userID: number) {
  const response = await fetch(`${API_URL}/users/${userID}/chats`);
  /*if (!response.ok) {
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
  }*/
  const data = await response.json();
  return data.results;
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
  //console.log("chat: ", data?.results);
  //console.warn("JWT before authorization: ");
  return data?.results;
};

export async function GetChatMessages(chatID: number) {
  console.log("chatID messages: ", chatID);
  const response = await fetch(`${API_URL}/chats/${chatID}/messages`);
  const data = await response.json();
  return data?.results;
};