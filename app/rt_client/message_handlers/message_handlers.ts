interface WSMessage {
  type: string;
  content: {
    user_id: number;
    chat_id?: number;
    message_id?: number;
    message_type?: string;
    message?: any;
    is_typing?: boolean;
    is_online?: boolean;
    page?: string;
  }
}

function handleTyping(msg: WSMessage) {
}

function handleOnline(msg: WSMessage) {
}

function handleSeenAll(msg: WSMessage) {
}

function handleMessage(msg: WSMessage) {
}

function handleMessageEdited(msg: WSMessage) {
}

function handleMessageDeleted(msg: WSMessage) {
}

function handleChatCreated(msg: WSMessage) {
}

function handleChatDeleted(msg: WSMessage) {
}

function handleChatEntering(msg: WSMessage) {
}

function handleChatLeaving(msg: WSMessage) {
}

export const Handlers = new Map<string, Function>([
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