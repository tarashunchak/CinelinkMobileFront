import { jwtHeaders } from "@/utils/utils";
import { ChatID, UserID } from "./../models/models";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";

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
  };
};

export type ChatMessage = {
  chat_id: ChatID,
  sender_id: UserID,
  timestamp: string,
  message_type: string,
  message: any,
};

export class ChatManager {
  private messages: Map<ChatID, ChatMessage[]> = new Map();
  private loadedStatus: Map<ChatID, boolean> = new Map();

  public callbacks = {
    onMessage: new Map<ChatID, Function>(),
    onTyping: new Map<ChatID, Function>(),
    onOnline: new Map<ChatID, Function>(),
    onSend: new Map<ChatID, Function>(),
  };

  public setCallBack(chatID: ChatID, callBack: Function) {

  };

  public async setOnOnline(chatID: ChatID, callback: Function) {
    this.callbacks?.onOnline?.set(chatID, callback);
  };

  public async setOnTyping(chatID: ChatID, callback: Function) {
    this.callbacks?.onTyping?.set(chatID, callback);
  };

  public getCallbacks(chatID: ChatID) {
    return {
      onMessage: this.callbacks?.onMessage?.get(chatID),
      onTyping: this.callbacks?.onTyping?.get(chatID),
      onOnline: this.callbacks?.onOnline?.get(chatID),
      onSend: this.callbacks?.onSend?.get(chatID),
    };
  };

  public async handleIncommingMessage(chatID: ChatID, message: ChatMessage) {
    const current = this.messages?.get(chatID) ?? [];
    this.messages.set(chatID, [message, ...current]);
  };

  public async getChat(chatID: ChatID): Promise<Chat> {
    console.warn("Chat ID in getChat: ", chatID)
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/chats/${chatID}`,
      {
        method: "GET",
        headers: jwtHeaders(useAuthStore?.getState()?.user?.jwt)
      }
    );
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
};