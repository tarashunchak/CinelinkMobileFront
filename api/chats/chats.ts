import { API_URL } from "./../API_CONFIG";

export async function GetUserChats(userID: number) {
  const response = await fetch(`${API_URL}/users/${userID}/chats`);
  const data = await response.json();
  return data?.results;
};

export async function GetChat(chatID: number) {
  console.log("chatID: ", chatID);
  const response = await fetch(`${API_URL}/chats/${chatID}`);
  const data = await response.json();
  console.log("chat: ", data?.results);
  return data?.results;
};

export async function GetChatMessages(chatID: number) {
  console.log("chatID messages: ", chatID);
  const response = await fetch(`${API_URL}/chats/${chatID}/messages`);
  const data = await response.json();
  return data?.results;
};