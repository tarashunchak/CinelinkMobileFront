export interface Props {
  user_id: number;
  chat_id?: number;
  message_id?: number;
  message_type?: string;
  message?: any;
  is_typing?: boolean;
  is_online?: boolean;
  page?: string;
};

export function makeTypingMessage(props: Props) {
  return JSON.stringify({
    type: "typing",
    content: {
      chat_id: props.chat_id,
      user_id: props.user_id,
      is_typing: props.is_typing,
    }
  });
};

export function makeOnlineMessage(props: Props) {
  return JSON.stringify({
    type: "online",
    content: {
      user_id: props.user_id,
      is_online: props.is_online,
    }
  })
};

export function makeSeenAllMessage(props: Props) {
  return JSON.stringify({
    type: "seen_all",
    content: {
      user_id: props.user_id,
      chat_id: props.chat_id,
    }
  })
};

export function makeMessageSendingMessage(props: Props) {
  return JSON.stringify({
    type: "message_sending",
    content: {
      user_id: props.user_id,
      chat_id: props.chat_id,
      message_type: props.message_type,
      message: props.message,
    }
  })
};

export function makeMessageEditedMessage(props: Props) {
  return JSON.stringify({
    type: "message_edited",
    content: {
      user_id: props.user_id,
      chat_id: props.chat_id,
      message_id: props.message_id,
      message_type: props.message_type,
      message: props.message,
    }
  });
};

export function makeMessageDeletedMessage(props: Props) {
  return JSON.stringify({

  });
};

export function makeChatCreatedMessage(props: Props) {
  return JSON.stringify({

  });
};

export function makeChatDeletedMessage(props: Props) {
  return JSON.stringify({

  });
};

export function makeChatEnteringMessage(props: Props) {
  return JSON.stringify({
    type: "chat_entering",
    content: {
      chat_id: props.chat_id,
      user_id: props.user_id,
    }
  });
};

export function makeChatLeavingMessage(props: Props) {
  return JSON.stringify({
    type: "chat_leaving",
    content: {
      chat_id: props.chat_id,
      user_id: props.user_id,
    }
  });
};

export function makePageEnteringMessage(props: Props) {
  return JSON.stringify({
    type: "page_entering",
    content: {
      user_id: props.user_id,
      page: props.page,
    }
  });
};

export function makePageLeavingMessage(props: Props) {
  return JSON.stringify({
    type: "page_leaving",
    content: {
      user_id: props.user_id,
      page: props.page,
    }
  });
};