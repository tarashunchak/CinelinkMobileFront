import { API_URL } from "@/api/API_CONFIG";
import { ChatID, EMPTY_ARRAY, EMPTY_OBJECT, UserID } from "../models/models";
import { create } from "zustand";
import { EntinyManager } from "./base_class";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { ChatManager } from "../chat_manager/chat_manager";

type Chat_T = {
  chat_id: number;
  name: string;
  img_url: string;
};

type LastMessage_T = {
  message_id: number,
  message_type: string;
  message: any,
  user_id: number;
  chat_id: number;
  timestamp: string;
};

interface ChatState {
  chats: Record<ChatID, Chat_T>;
  typingStatus: Record<ChatID, boolean>;
  lastMessages: Record<number, LastMessage_T>;
  _setLastMessage: (chatID: ChatID, msg: LastMessage_T) => void;
  _setTypingStatus: (chatID: ChatID, status: boolean) =>  void;
  _add: (chatID: ChatID, chat: Chat_T) => void;
  _addMany: (chats: Map<ChatID, Chat_T>) => void;
  _remove: (chatID: ChatID) => void;
  _update: (chatID: ChatID, data: Partial<Chat_T>) => void;
};

const useChatStore = create<ChatState>((set) => ({
  chats: {},
  typingStatus: {},
  lastMessages: {},
  _setLastMessage: (chatID, msg) => set((s) => ({
    lastMessages: {...s.lastMessages, [chatID]: msg}
  })),
  _setTypingStatus: (chatID, status) => set((s) => ({
    typingStatus: {...s.typingStatus, [chatID]: status}
  })),
  _add: (chatID, chat) => set((s) => ({
    chats: {...s.chats, [chatID]: chat}
  })),
  _addMany: (newChats) => set((s) => ({
    chats: {...s.chats, ...Object.fromEntries(newChats)}
  })),
  _remove: (chatID) => set((s)=>{
    const {[chatID]: _, ...remainingChats } = s.chats;
    return {chats: remainingChats}
  }),
  _update: (chatID, data) => set((s)=>({

  })),
}));

export class ChatsManager extends EntinyManager<Chat_T> {
  private static instance: ChatsManager;
  private currUserID: number = 0;
  constructor(){
    super();
  };

  public static getInstance(): ChatsManager {
    if(!ChatsManager.instance)
      ChatsManager.instance = new ChatsManager();
    return ChatsManager.instance;
  };

  public init(userID: UserID){
    this.currUserID = userID;
    this.load(userID);
  };

  public async load(userID: UserID = 0) {
    const resp = await fetch(`${API_URL}/users/${this.currUserID}/chats`);
    const data = await resp.json();
    if(!resp.ok || data?.status !== 200)
      return;

    const map = new Map<number, Chat_T>(data?.results?.map((chat: Chat_T)=> [chat.chat_id, chat]));
    useChatStore.getState()._addMany(map);
  };

  public add(chatID: ChatID, chat: any){
    useChatStore.getState()._add(chatID, chat);
  };

  public addMany(chats: Map<number, Chat_T>){
    useChatStore.getState()._addMany(chats);
  };

  public addArray(id: number, items: Chat_T[]): void {
    // nothing
  };

  public remove(chatID: ChatID) {
    useChatStore.getState()._remove(chatID);
  };

  public update(chatID: ChatID, data: Partial<any>) {
    useChatStore.getState()._update(chatID, data);
  };

  public get(chatID: number): void {
    // nothing
  };
};

async function load(chatID: ChatID = 0){
  await ChatsManager.getInstance().load(chatID);
};

export function useUserChats(): Chat_T[]{
  const chats = useChatStore(useShallow((s) => Object.values(s.chats)))
  useEffect(()=>{
    if(chats.length === 0) load();
  }, [chats.length]);
  return chats;
};

export function useChat(chatID: ChatID): any {
  const chat = useChatStore(s => s.chats[chatID] || EMPTY_OBJECT);
  useEffect(()=>{
    if(chat === EMPTY_OBJECT) load(chatID);
  }, [chatID, chat]);
  return chat;
};