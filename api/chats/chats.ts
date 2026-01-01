import { API_URL } from "./../API_CONFIG";

export async function GetUserChats(userID: number) {
  const response = await fetch(`${API_URL}/users/${userID}/chats`);
  const data = await response.json();
  return data?.results;
};

export async function GetChat(chatID: number) {
  const response = await fetch(`${API_URL}/chats/${chatID}`);
  const data = await response.json();
  return data?.results;
};