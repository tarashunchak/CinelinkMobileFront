import { create } from "zustand";
import { EntinyManager } from "./base_class";

type Message_T = {

};

interface MessagesState {
  messages: Record<number, Message_T[]>;
  _add: (chatID: number, msg: Message_T) => void;
  _addMany: (chatID: number, msgs: Message_T[]) => void;
  _remove: (chatID: number, msgID: number) => void;
};

const useMessageStore = create<MessagesState>((set)=>({
  messages: {},
  _add: (chatID, msg)=> set((s)=>({
    messages: {...s.messages, [chatID]: [msg, ...(s.messages[chatID] || [])]}
  })),
  _addMany: (chatID, msgs) => set((s)=>({
    messages: {...s.messages, [chatID]: msgs}
  })),
  _remove: (chatID, msgs) => set((s)=>({
  })),
}));

export class MesssageManager extends EntinyManager<Message_T> {
  public async load(currUserID: number): Promise<void> {
    
  };

  public add(id: number, item: Message_T): void {
    useMessageStore.getState()._add(id, item)
  };

  public addMany(chatID: number, msgs: Message_T[]): void {
    useMessageStore.getState()._add(chatID, msgs)
  };

  public remove(id: number): void {
    
  };

  public update(id: number, data: Partial<Message_T>): void {
    
  };
};