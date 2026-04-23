import { API_URL } from "./../API_CONFIG";

interface message {
  message_type: string;
  message: any;
};

interface ChatMessage_T {
  message_id: number;
  chat_id: number;
  user_id: number;
  content: message;
  timestamp: string;
};

export async function SendChatMessages(message: any) {
  console.log("chatID messages: ", message?.chat_id);
  const response = await fetch(`${API_URL}/chats/${message?.chat_id}/messages`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {
          chat_id: message?.chat_id,
          user_id: message?.user_id,
          content: message?.content,
        }
      ),
    }
  );
  const data = await response.json();
  return data?.status === 200;
};