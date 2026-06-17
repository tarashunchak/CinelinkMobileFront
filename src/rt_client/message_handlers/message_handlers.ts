import { ChatManager } from "../chat_manager/chat_manager";
import { Content, WSMessage } from "../ws_connector/ws_connector";
import { useChatStore } from "../app_state";
import { ChatsManager } from "../managers/chats_manager";
import { MessagesManager } from "../managers/messages_manager";
import { UsersManager } from "../managers/users_manager";

type WSHandler = (msg: WSMessage, manager: ChatManager) => void;

async function handleTyping(msg: WSMessage, manager: ChatManager) {
  const { chat_id, user_id, is_typing }:Content = msg.content;
  console.warn("Handle typing: ", msg.content);
  manager.callbacks?.onTyping?.get(chat_id)?.(msg);
  ChatsManager.getInstance().setTypingStatus(chat_id, user_id, is_typing)
};

async function handleOnline(msg: WSMessage, manager: ChatManager) {
  const { chat_id, user_id, is_online }:Content = msg.content;
  //manager.callbacks?.onOnline?.get(chat_id)?.(msg);
  //useChatStore.getState()._setOnline(msg.content?.user_id, msg.content?.is_online);
  console.warn("ONLINE: ",msg);
  UsersManager.getInstance().setOnlineStatus(msg.content?.user_id, msg.content?.is_online);
};

async function handleSeenAll(msg: WSMessage, manager: ChatManager) {
  const { chat_id, user_id }:Content = msg.content;
  //manager.callbacks?.onOnline?.get(chat_id)?.(msg);
};

async function handleMessage(msg: WSMessage, manager: ChatManager) {
  //console.warn("HANDLE MESSAGE !!!!!!!!!!!!!!!!!");
  const {chat_id}: Content = msg.content ;

  console.warn("MESSSSSSSSSSAGE:       ", msg.content);
  //manager.addMessage(msg?.content?.chat_id, message);
  MessagesManager.getInstance().add(msg.content?.chat_id, msg.content);
};

function handleMessageEdited(msg: WSMessage, manager: ChatManager) {
};

function handleMessageDeleted(msg: WSMessage, manager: ChatManager) {
};

function handleChatCreated(msg: WSMessage, manager: ChatManager) {
  ChatsManager.getInstance().add(msg.content?.chat_id, msg.content);
  
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

  /*const message = {
    chat_id: msg?.content?.chat_id,
    user_id: msg?.content?.user_id,
    timestamp: msg?.content?.timestamp ?? "...",
    message_type: msg?.content?.message_type ?? "text",
    message: msg?.content?.message,
    message_id: msg?.content?.message_id ?? 0,
  };*/

/*useChatStore.getState()._setChat(
    {
      chat_id: msg.content?.chat_id,
      image_url: msg.content?.image_url,
      name: msg.content?.name,
      type: msg.content?.chat_type,
      participatns_ids: msg.content?.participants_ids,
    });*/