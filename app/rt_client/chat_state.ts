import { create } from "zustand";
import { ChatMessage } from "./message_storage/message_storage";

export interface ChatState {
  messages: Record<number, ChatMessage[]>;
  typingStatus: Record<number, boolean>;
  onlineStatus: Record<number, boolean>;

  _setChatMessages: (chatID: number, msgs: ChatMessage[]) => void;
  _setTyping: (chatID: number, status: boolean) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  messages: {},
  typingStatus: {},
  onlineStatus: {},
  _setChatMessages: (chatID, msgs) => set((s) => ({
    messages: { ...s.messages, [chatID]: msgs }
  })),
  _setTyping: (chatID, status) => set((s) => ({
    typingStatus: { ...s.typingStatus, [chatID]: status }
  }))
}));