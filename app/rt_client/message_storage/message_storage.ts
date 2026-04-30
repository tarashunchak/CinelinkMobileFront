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
  private lastMessageId: number = 0;

  public loadMessages() {

  }

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
    return this.messages.values().toArray();
  };

  public getLastChatMessage(): ChatMessage | null {
    return this.messages.values().toArray().reverse()[0];
  };

  public setEventHandler(handlers: MessageEventsHandlers) {

  };
};