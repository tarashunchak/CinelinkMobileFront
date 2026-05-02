import { GetChatMessages } from "@/api/chats";
import { ChatManager } from "../chat_manager/chat_manager";
import { Content, WSMessage } from "../ws_connector/ws_connector";
import { ChatMessage } from "../message_storage/message_storage";

type WSHandler = (msg: WSMessage, manager: ChatManager) => void;

function handleTyping(msg: WSMessage, manager: ChatManager) {
  const { chat_id, user_id, is_typing }: Content = msg.content;
  manager.callbacks?.onTyping?.get(chat_id)?.(msg);
};

function handleOnline(msg: WSMessage, manager: ChatManager) {
  const { chat_id, user_id, is_online }: Content = msg.content;
  manager.callbacks?.onOnline?.get(chat_id)?.(msg);
};

function handleSeenAll(msg: WSMessage, manager: ChatManager) {
  const { chat_id, user_id } = msg.content;
  //manager.callbacks?.onOnline?.get(chat_id)?.(msg);
};

function handleMessage(msg: any, manager: ChatManager) {
  console.warn("HANDLE MESSAGE !!!!!!!!!!!!!!!!!");
  const message = {
    chat_id: msg?.chat_id,
    user_id: msg?.user_id,
    timestamp: msg?.timestamp ?? "...",
    message_type: msg?.message_type ?? "text",
    message: msg?.message,
    message_id: msg?.message_id ?? 0,
  };
  console.warn("MESSSSSSSSSSAGE:       ", message);
  manager.addMessage(msg?.chat_id, message);
};

function handleMessageEdited(msg: WSMessage, manager: ChatManager) {
};

function handleMessageDeleted(msg: WSMessage, manager: ChatManager) {
};

function handleChatCreated(msg: WSMessage, manager: ChatManager) {
};

function handleChatDeleted(msg: WSMessage, manager: ChatManager) {
};

function handleChatEntering(msg: WSMessage, manager: ChatManager) {
};

function handleChatLeaving(msg: WSMessage, manager: ChatManager) {
};

export const Handlers = new Map<string, WSHandler>([
  ["typing", handleTyping],
  ["online", handleOnline],
  ["seen_all", handleSeenAll],
  ["chat_leaving", handleChatLeaving],
  ["chat_entering", handleChatEntering],
  ["chat_created", handleChatCreated],
  ["chat_deleted", handleChatDeleted],
  ["message_edited", handleMessageEdited],
  ["message_deleted", handleMessageDeleted],
  ["message", handleMessage],
]);