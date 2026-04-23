import { ChatManager } from "../chat_manager/chat_manager";
import { WSMessage } from "../ws_connector/ws_connector";

type WSHandler = (msg: WSMessage, manager: ChatManager) => void;

function handleTyping(msg: WSMessage, manager: ChatManager) {
  const { chat_id, user_id, is_typing } = msg.content;
  manager.callbacks?.onTyping?.get(chat_id)?.(msg);
};

function handleOnline(msg: WSMessage, manager: ChatManager) {
  const { chat_id, user_id, is_online } = msg.content;
  manager.callbacks?.onOnline?.get(chat_id)?.(msg);
};

function handleSeenAll(msg: WSMessage, manager: ChatManager) {
  const { chat_id, user_id } = msg.content;
  //manager.callbacks?.onOnline?.get(chat_id)?.(msg);
};

function handleMessage(msg: WSMessage, manager: ChatManager) {
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
]);