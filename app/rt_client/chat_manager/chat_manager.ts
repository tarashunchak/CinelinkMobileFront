import { ChatID, UserID, RTMessage } from "./../models/models";

export type Chat = {
  info: {
    chat_id: number,
    chat_type: string,
    img_url: string,
    name: string,
  },
  peer: {
    avatar_url: string,
    is_online: boolean,
    last_seen: string,
    member_index: number,
    role: string,
    user_id: number,
    username: string,
  }
};

export type ChatMessage = {
  chat_id: ChatID,
  sender_id: UserID,
  timestamp: string,
  message_type: string,
  message: any,
};

class ChatManager {
  private messages: Map<ChatID, ChatMessage[]> = new Map();
  private loadedStatus: Map<ChatID, boolean> = new Map();

  public callbacks = {
    onMessage: new Map<ChatID | UserID, Function>(),
    onTyping: new Map<ChatID, Function>(),
    onOnline: new Map<ChatID, Function>(),
    onSend: new Map<ChatID, Function>(),
  };

  public async handleIncommingMessage(chatID: ChatID, message: ChatMessage) {
    const current = this.messages?.get(chatID) ?? [];
    this.messages.set(chatID, [message, ...current]);
  };

  public async getChat(chatID: ChatID): Promise<Chat> {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/chats/${chatID}`)
    const text = await response?.text();
    const data = JSON.parse(text);
    return data?.results;
  };

  public async getChatMessages(chatID: ChatID): Promise<ChatMessage[]> {
    if (this.loadedStatus?.get(chatID))
      return this.messages?.get(chatID) ?? [];

    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/chats/${chatID}/messages`)
    const text = await response?.text();
    const data = JSON.parse(text);

    if (!data?.results)
      return [];

    this.messages?.set(chatID, data?.results);
    this.loadedStatus?.set(chatID, true);

    return data?.results;
  };
}