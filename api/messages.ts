import { API_URL } from "./API_CONFIG";

export async function RemoveMessage(chatID: number, messageID: number): Promise<boolean> {
  console.warn("Deleting message: ", chatID, " ", messageID);
  const response = await fetch(`${API_URL}/chats/${chatID}/messages/${messageID}`,
    {
      method: "DELETE",
    }
  );

  const text = await response.text();
  const data = JSON.parse(text);
  console.warn("Deleting result: ", data);
  return response.ok && data?.status === 200;
};