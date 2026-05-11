import { ChatManager } from "../chat_manager/chat_manager";
import { Content, WSMessage } from "../ws_connector/ws_connector";
import { useChatStore } from "../app_state";

type WSHandler = (msg: WSMessage, manager: ChatManager) => void;

function handleTyping(msg: WSMessage, manager: ChatManager) {
  const { chat_id, user_id, is_typing }: Content = msg.content;
  manager.callbacks?.onTyping?.get(chat_id)?.(msg);
  useChatStore.getState()._setTyping(msg.content?.chat_id, {
    user_id: msg.content?.user_id,
    status: msg.content?.is_typing ?? false
  });
};

function handleOnline(msg: WSMessage, manager: ChatManager) {
  const { chat_id, user_id, is_online }: Content = msg.content;
  //manager.callbacks?.onOnline?.get(chat_id)?.(msg);
  useChatStore.getState()._setOnline(msg.content?.user_id, msg.content?.is_online);
};

function handleSeenAll(msg: WSMessage, manager: ChatManager) {
  const { chat_id, user_id } = msg.content;
  //manager.callbacks?.onOnline?.get(chat_id)?.(msg);
};

function handleMessage(msg: WSMessage, manager: ChatManager) {
  console.warn("HANDLE MESSAGE !!!!!!!!!!!!!!!!!");
  const message = {
    chat_id: msg?.content?.chat_id,
    user_id: msg?.content?.user_id,
    timestamp: msg?.content?.timestamp ?? "...",
    message_type: msg?.content?.message_type ?? "text",
    message: msg?.content?.message,
    message_id: msg?.content?.message_id ?? 0,
  };
  console.warn("MESSSSSSSSSSAGE:       ", message);
  manager.addMessage(msg?.content?.chat_id, message);
};

function handleMessageEdited(msg: WSMessage, manager: ChatManager) {
};

function handleMessageDeleted(msg: WSMessage, manager: ChatManager) {
};

function handleChatCreated(msg: WSMessage, manager: ChatManager) {
  useChatStore.getState()._setChat(msg.content?.chat_id, 
    {
      chat_id: msg.content?.chat_id,
      image_url: msg.content?.image_url,
      name: msg.content?.name,
      type: msg.content?.chat_type,
      participatns_ids: msg.content?.participants_ids,
    });
};

function handleChatDeleted(msg: WSMessage, manager: ChatManager) {
  useChatStore.getState()._removeChat(msg.content?.chat_id);
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