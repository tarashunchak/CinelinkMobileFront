import { API_URL } from "@/api/API_CONFIG";
import { ChatID, EMPTY_OBJECT, UserID } from "../models/models";
import { create } from "zustand";
import { EntityManager } from "./base_class";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { timestamp } from "@/app/direct_chat/utils/utils";
import { UsersManager } from "./users_manager";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";

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
  typingStatus: Record<ChatID, Record<number, boolean>>;
  lastMessages: Record<number, LastMessage_T>;
  lastSeenMessagesIDs: Record<number, number>;
  _setLastMessage: (chatID: ChatID, msg: LastMessage_T) => void;
  _setTypingStatus: (chatID: ChatID, userID: UserID, status: boolean) => void;
  _setLastSeenMessagesIDs: (chatID: ChatID, messageID: number) => void;
  _setManyLastSeenMessagesIDs: (items: Map<ChatID, number>) => void;
  _add: (chatID: ChatID, chat: Chat_T) => void;
  _addMany: (chats: Map<ChatID, Chat_T>) => void;
  _remove: (chatID: ChatID) => void;
  _update: (chatID: ChatID, data: Partial<Chat_T>) => void;
};

const useChatStore = create<ChatState>((set) => ({
  chats: {},
  typingStatus: {},
  lastMessages: {},
  lastSeenMessagesIDs: {},
  _setLastMessage: (chatID, msg) => set((s) => ({
    lastMessages: { ...s.lastMessages, [chatID]: msg }
  })),
  _setLastSeenMessagesIDs: (chatID, messageID) => set((s) => ({
    lastSeenMessagesIDs: { ...s.lastSeenMessagesIDs, [chatID]: messageID }
  })),
  _setManyLastSeenMessagesIDs: (items) => set((s) => ({

  })),
  _setTypingStatus: (chatID, userID, status) => set((s) => ({
    typingStatus: {
      ...s.typingStatus, [chatID]: {
        ...s.typingStatus[chatID],
        [userID]: status
      }
    }
  })),
  _add: (chatID, chat) => set((s) => ({
    chats: { ...s.chats, [chatID]: chat }
  })),
  _addMany: (newChats) => set((s) => ({
    chats: { ...s.chats, ...Object.fromEntries(newChats) }
  })),
  _remove: (chatID) => set((s) => {
    const { [chatID]: _, ...remainingChats } = s.chats;
    return { chats: remainingChats }
  }),
  _update: (chatID, data) => set((s) => ({

  })),
}));

export class ChatsManager extends EntityManager<Chat_T> {
  private static instance: ChatsManager;
  private currUserID: number = 0;
  private isLoading: boolean = false;

  constructor() {
    super();
  };

  public static getInstance(): ChatsManager {
    if (!ChatsManager.instance)
      ChatsManager.instance = new ChatsManager();
    return ChatsManager.instance;
  };

  public init(userID: UserID) {
    this.currUserID = userID;
    this.load(userID);
  };

  public async load(chatID: ChatID= 0) {
    if (this.isLoading) return;

    try {
      if (chatID) {
        const resp = await fetch(`${API_URL}/chats/${chatID}`);
        const data = await resp.json();
        if (!resp.ok || data?.status !== 200)
          return;
        useChatStore.getState()._add(data.chat_id, data);
      }else {
        const resp = await fetch(`${API_URL}/users/${this.currUserID}/chats`);
        const data = await resp.json();
        if (!resp.ok || data?.status !== 200)
          return;
        const map = new Map<number, Chat_T>(data?.results?.map((chat: Chat_T) => {
          useChatStore.getState()._setLastMessage(chat.chat_id, chat.last_message);
          return [chat.chat_id, chat];
        }));
        useChatStore.getState()._addMany(map);
      }
    } finally {
      this.isLoading = false;
    }
  };

  public setTypingStatus(chatID: ChatID, userID: UserID, status: boolean) {
    console.warn("SET TYPING STATUS: ", chatID, " ", userID, " ", status);
    useChatStore.getState()._setTypingStatus(chatID, userID, status);
  };

  public setLastMessage(chatID: ChatID, msg: any) {
    useChatStore.getState()._setLastMessage(chatID, msg);
  };

  public add(chatID: ChatID, chat: any) {
    useChatStore.getState()._add(chatID, chat);
  };

  public addMany(chats: Map<number, Chat_T>) {
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

async function load(chatID: ChatID = 0) {
  await ChatsManager.getInstance().load(chatID);
};

export function useUserChats(): Chat_T[] {
  const chats = useChatStore(useShallow((s) => Object.values(s.chats)));
  const lastMessages = useChatStore(s => s.lastMessages);

  useEffect(() => {
    if (chats.length === 0) load();
  }, [chats.length]);

  return [...chats]?.sort((a: Chat_T, b: Chat_T)=>{
    const aTime = new Date(lastMessages[a.chat_id]?.timestamp || 0).getTime();
    const bTime = new Date(lastMessages[b.chat_id]?.timestamp || 0).getTime();
    return bTime - aTime;
  });
};

export function useChat(chatID: ChatID): any {
  const chat = useChatStore(s => s.chats[chatID] || EMPTY_OBJECT);
  useEffect(() => {
    if (chat === EMPTY_OBJECT)
      load(chatID);
    console.warn("useChat");
  }, [chatID, chat]);
  return chat;
};

export function useTypingStatus(chatID: ChatID, userID: UserID): boolean {
  const status = useChatStore(s => s.typingStatus[chatID]?.[userID] ?? false)
  useEffect(() => {
    console.warn("STATUS: ", status);
  }, [chatID, userID, status]);
  return status;
};

export function useLastChatMessage(chatID: ChatID): any {
  const message = useChatStore(s => s.lastMessages[chatID]);
  useEffect(() => {
  }, [chatID, message?.message_id]);

  if (!message || !message.message)
    return "";

  const user = UsersManager.getInstance().get(message?.user_id);
  const username = user?.username ?? "You";
  return {
    text: `${username}: ${message?.message}`,
    time: timestamp(new Date(message?.timestamp)),
  }
};

export function useUnseenMessagesCount(chatID: ChatID = 0): number {
  return 0;
};