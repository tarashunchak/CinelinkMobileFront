import { create } from "zustand";
import { ChatMessage } from "./message_storage/message_storage";

export interface ChatState {
  lastMessage: Record<number, string>;
  messages: Record<number, ChatMessage[]>;
  typingStatus: Record<number, boolean>;
  onlineStatus: Record<number, boolean>;

  _setOnline: (userID: number, status: boolean) => void;
  _setChatMessages: (chatID: number, msgs: ChatMessage[]) => void;
  _setTyping: (chatID: number, status: boolean) => void;
  _setLastMessage: (chatID: number, msg: string) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  messages: {},
  typingStatus: {},
  onlineStatus: {},
  lastMessage: {},
  _setChatMessages: (chatID, msgs) => set((s) => ({
    messages: { ...s.messages, [chatID]: msgs }
  })),
  _setTyping: (chatID, status) => set((s) => ({
    typingStatus: { ...s.typingStatus, [chatID]: status }
  })),
  _setOnline: (userID, status) => set((s) => ({
    onlineStatus: { ...s.onlineStatus, [userID]: status }
  })),
  _setLastMessage: (chatID, msg) => set((s) => ({
    lastMessage: { ...s.lastMessage, [chatID]: msg }
  })),
}));