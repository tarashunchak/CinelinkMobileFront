import { API_URL } from "@/api/API_CONFIG";
import { ChatID } from "../models/models";
import { create } from "zustand";
import { EntinyManager } from "./base_class";

type Chat_T = {
  chat_id: number;
  chatname: string;
  avatar_url: string;
};

interface ChatState {
  chats: Record<ChatID, Chat_T>;
  typingStatus: Record<ChatID, boolean>;
  _setTypingStatus: (chatID: ChatID, status: boolean) =>  void;
  _add: (chatID: ChatID, chat: Chat_T) => void;
  _addMany: (chats: Map<ChatID, Chat_T>) => void;
  _remove: (chatID: ChatID) => void;
  _update: (chatID: ChatID, data: Partial<Chat_T>) => void;
};

const useChatStore = create<ChatState>((set) => ({
  chats: {},
  typingStatus: {},
  _setTypingStatus: (chatID, status) => set((s) => ({
    typingStatus: {...s.typingStatus, [chatID]: status}
  })),
  _add: (chatID, chat) => set((s) => ({
    chats: {...s.chats, [chatID]: chat}
  })),
  _addMany: (newChats) => set((s) => ({
    chats: {...s.chats, ...newChats}
  })),
  _remove: (chatID) => set((s)=>{
    const {[chatID]: _, ...remainingChats } = s.chats;
    return {chats: remainingChats}
  }),
  _update: (chatID, data) => set((s)=>({

  })),
}));

export class ChatsManager extends EntinyManager<Chat_T> {
  public async load(chatID: ChatID) {
    const resp = await fetch(`${API_URL}`);
    const data = await resp.json();
    if(!resp.ok || data?.status !== 200)
      return;

    useChatStore.getState()._addMany(data?.results);
  };

  public add(chatID: ChatID, chat: any){
    useChatStore.getState()._add(chatID, chat);
  };

  public addMany(chats: Map<number, Chat_T>){
    useChatStore.getState()._addMany(chats);
  };

  public remove(chatID: ChatID) {
    useChatStore.getState()._remove(chatID);
  };

  public update(chatID: ChatID, data: Partial<any>) {
    useChatStore.getState()._update(chatID, data);
  };
};