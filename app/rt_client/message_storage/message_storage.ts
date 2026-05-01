import { useChatStore } from "../chat_state";
import { ChatID } from "../models/models";

export interface ChatMessage {
  chat_id: number;
  user_id: number;
  timestamp: string;
  message_type: string;
  message: any;
  message_id: number;
};

export type MessageEvents = "update" | "delete" | "add";

export interface MessageEventsHandlers {
  type: MessageEvents;
  handler: (message: ChatMessage) => any;
};

export class MessageStorage {
  private messages: Map<number, ChatMessage> = new Map();
  private chatID: ChatID;
  private lastMessageId: number = 0;

  constructor(chatID: ChatID) {
    this.chatID = chatID;
  };

  public async loadMessages() {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/chats/${this.chatID}/messages`)
    const text = await response?.text();
    const data = JSON.parse(text);

    console.warn("LoadMessages 1");
    if (!data?.results)
      return [];

    console.warn("LoadMessages 2: ", data?.results);
    this.messages?.set(this.chatID, data?.results);
    useChatStore.getState()._setChatMessages(this.chatID, data?.results?.reverse());
  };

  public deleteMessage(message_id: number): ChatMessage[] {
    this.messages.delete(message_id);
    return Array.from(this.messages.values());
  };

  public addMessage(message: ChatMessage): ChatMessage[] {
    this.messages.set(message?.message_id, message);
    return Array.from(this.messages.values());
  };

  public clearChat(): ChatMessage[] | [] {
    const tmp = this.messages.values();
    this.messages.clear();
    return tmp.toArray();
  };

  public getChatMessages(): ChatMessage[] | [] {
    return Array.from(this.messages.values());
  };

  public getLastChatMessage(): ChatMessage | null {
    return this.messages.values().toArray().reverse()[0];
  };

  public setEventHandler(handlers: MessageEventsHandlers) {

  };
};