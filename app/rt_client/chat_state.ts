import { create } from "zustand";
import { ChatMessage } from "./message_storage/message_storage";

interface User {
  id: number;
  username: string;
  avatar_url?: string;
};

interface TypingStatus {
  user_id: number;
  status: boolean;
};

export interface ChatState {
  users: Record<number, User>;
  messages: Record<number, ChatMessage[]>;
  lastMessage: Record<number, ChatMessage>;
  typingStatus: Record<number, Record<number, boolean>>;
  onlineStatus: Record<number, boolean>;

  _setOnline: (userID: number, status: boolean) => void;
  _setChatMessages: (chatID: number, msgs: ChatMessage[]) => void;
  _setTyping: (chatID: number, status: TypingStatus) => void;
  _setLastMessage: (chatID: number, msg: ChatMessage) => void;
  _setUser: (userID: number, user: User) => void;
  _setUsersBatch: (users: Map<number, User>) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  users: {},
  messages: {},
  typingStatus: {},
  onlineStatus: {},
  lastMessage: {},
  _setChatMessages: (chatID, msgs) => set((s) => ({
    messages: { ...s.messages, [chatID]: msgs }
  })),
  _setTyping: (chatID, status) => set((s) => ({
    typingStatus: {
      ...s.typingStatus, [chatID]: {
        ...s.typingStatus[chatID],
        [status.user_id]: status.status
      }
    }
  })),
  _setOnline: (userID, status) => set((s) => ({
    onlineStatus: { ...s.onlineStatus, [userID]: status }
  })),
  _setLastMessage: (chatID, msg) => set((s) => ({
    lastMessage: { ...s.lastMessage, [chatID]: msg }
  })),
  _setUser: (userID, user) => set((s) => ({
    users: { ...s.users, [userID]: user }
  })),
  _setUsersBatch: (newUsers) => set((s) => ({
    users: { ...s.users, ...newUsers }
  })),
}));