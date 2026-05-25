import { create } from "zustand";
import { EntityManager } from "./base_class";
import { ChatID } from "../models/models";
import { useEffect } from "react";
import { API_URL } from "@/api/API_CONFIG";
import { UsersManager } from "./users_manager";
import { timestamp } from "@/src/features/chats/utils";
import { ChatsManager } from "./chats_manager";

type Message_T = {
  user_id: number;
  chat_id: number;
  message_id: number;
  message_type: string;
  message: any;
  timestamp: string;
};

type PageInfo = {
  next_cursor: number;
  has_next_page: boolean;
};

interface MessagesState {
  messages: Record<number, Message_T[]>;
  page_info: Record<number, PageInfo>;
  _setPageInfo: (chatID: number, info: PageInfo) => void;
  _add: (chatID: number, msg: Message_T) => void;
  _addMany: (chatID: number, msgs: Message_T[]) => void;
  _remove: (chatID: number, msgID: number) => void;
};

const useMessageStore = create<MessagesState>((set) => ({
  messages: {},
  page_info: {},
  _setPageInfo: (chatID, info) => set((s) => ({
    page_info: {...s.page_info, [chatID]: info}
  })),
  _add: (chatID, msg) => set((s) => ({
    messages: { ...s.messages, [chatID]: [msg, ...(s.messages[chatID] || [])] }
  })),
  _addMany: (chatID, msgs) => set((s) => ({
    messages: { 
      ...s.messages, 
      [chatID]: [
        ...(s.messages[chatID] ||[]),
        ...msgs,
      ]
    }
  })),
  _remove: (chatID, msgs) => set((s) => {
    const {[chatID]: _, ...remainingMessages} = s.messages;
    return {messages: remainingMessages};
  }),
}));

export class MessagesManager extends EntityManager<Message_T> {
  private static instance: MessagesManager;
  private isLoading: boolean =  false;

  public static getInstance(): MessagesManager {
    if (!MessagesManager.instance)
      MessagesManager.instance = new MessagesManager();
    return MessagesManager.instance
  };

  public init(chatID: ChatID) {
    this.load(chatID);
  };

  public async load(chatID: ChatID): Promise<void> {
    if(this.isLoading) return;

    this.isLoading = true;
    const pageInfo = useMessageStore.getState().page_info[chatID]; 
    if(pageInfo && !pageInfo?.has_next_page) return;
    try {
      const response = await fetch(`${API_URL}/chats/${chatID}/messages?cursor=${pageInfo?.next_cursor ?? 1}`)
      const data = await response?.json();
      if (data?.results) {
        const reversed = [...data?.results?.data];
        const current = useMessageStore.getState().messages;
        if (JSON.stringify(current) !== JSON.stringify(reversed)) {
          this.addArray(chatID, reversed);
          ChatsManager.getInstance().setLastMessage(chatID, reversed[0])
          console.warn("\n\n\nPAGE INFO: ", data.results.page_info)
          useMessageStore.getState()._setPageInfo(chatID, data.results.page_info)
        }
        //this.lastSeenMessageId = reversed[0]?.message_id;
      }
    } finally {
      this.isLoading = false;
    }
  };

  public add(id: number, item: Message_T): void {
    useMessageStore.getState()._add(id, item)
    ChatsManager.getInstance().setLastMessage(id, item)
  };

  public addMany(msgs: Map<number, Message_T>): void {
    // nothing
  };

  public addArray(id: number, items: Message_T[]): void {
    useMessageStore.getState()._addMany(id, items);
  };

  public remove(id: number): void {

  };

  public update(id: number, data: Partial<Message_T>): void {

  };

  public get(id: number = 0): void {

  };
};

async function load(chatID: ChatID){
  await MessagesManager.getInstance().load(chatID);
};

export function useChatMessages(chatID: ChatID): Message_T [] {
  const messages: Message_T[] = useMessageStore(s => s.messages[chatID]);
  useEffect(()=>{
    if (!messages) load(chatID);
  }, [chatID, messages]);
  return messages;
};



export function useLastChatMessage(chatID: ChatID): any {
  const message: Message_T = useMessageStore(s => s.messages[chatID]?.[0]);
  useEffect(()=>{
    if (!message) 
      load(chatID);
  }, [chatID, message]);

  if(!message) 
    return "";

  const user = UsersManager.getInstance().get(message?.user_id);
  const username = user?.username ?? "Unknown";

  return {
    text: `${username}: ${message?.message}`,
    time: timestamp(new Date(message?.timestamp)),
  }
};