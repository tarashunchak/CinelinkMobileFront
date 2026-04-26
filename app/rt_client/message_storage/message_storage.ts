export class MessageStorage {
  private messages: Map<number, any[]> = new Map();

  public deleteMessage(message_id: number): any[] {
    this.messages.delete(message_id);
    return Array.from(this.messages.values());
  };

  public addMessage(message: any): any[] {
    this.messages.set(message?.message_id, message);
    return Array.from(this.messages.values());
  };

  public clearChat(chatID: number): any[] {
    const tmp = this.messages.get(chatID);
    this.messages.set(chatID, []);
    return tmp ?? [];
  };
};