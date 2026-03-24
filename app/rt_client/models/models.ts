export type ChatID = number;
export type UserID = number;

interface Chat {
  chat_id: number;
  creator_id: number;
  image_url: string;
  name: string;
  chat_type: string;
};

interface ChatMember {
  member_index: number;
  user_id: number;
  username: string;
  full_name: string;
  avatar_url: string;
  role: string;
  is_online: boolean;
};

export type OnlineMessage = {
  user_id: number;
  is_online: boolean;
};

export type TypingMessage = {
  user_id: number;
  chat_id: number;
  is_typing: boolean;
};

export type Message = {
  message_type: string;
  message: any;
  message_id: number | null;
  chat_id: number | null;
  sender_id: number;
  timestamp: string;
};

export type RTMessage = {
  type: string;
  content: OnlineMessage | TypingMessage | Message;
};

export interface DirectChat {
  info: Chat;
  peer: ChatMember;
};

export interface GroupChat {
  info: Chat;
  members: ChatMember[];
};