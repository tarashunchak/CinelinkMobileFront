import { API_URL } from "@/api/API_CONFIG";

type ChatID = number;
type UserID = number;

interface Message {
  message_id: number | null;
  chat_id: number;
  sender_id: number;
  timestamp: string;
  content: {
    message_type: string;
    message: any;
  }
};

const WS_ADDRESS = (chatID: ChatID) =>
  (`ws://192.168.0.199:8080/ws/${chatID}`);
const HTTP_ADDRESS = (chatID: ChatID) =>
  (`http://192.168.0.199:8080/chats/${chatID}/messages`);

class RTChatClient {
  private conns: Map<ChatID, WebSocket> = new Map();
  private chatCallback: Map<ChatID, any> = new Map();

  constructor(chatID: ChatID = 0) {
    if (chatID !== 0)
      this.conns.set(chatID, new WebSocket(WS_ADDRESS(chatID)));
  };

  public async connect(chatID: ChatID) {
    if (this.conns.get(chatID)) {
      return
    } else {
      this.conns.set(chatID, new WebSocket(WS_ADDRESS(chatID)));
    }
  };

  public async disconnect(chatID: ChatID) {
    this.conns.get(chatID)?.close();
  };

  public async setOnMessageCallBack(chatID: ChatID, hook: any) {
    this.chatCallback.set(chatID, hook);
    if (this.conns.get(chatID))
      this.conns.get(chatID).onmessage = (event) => {

      }
  };

  public async setOnTypingCallBack(chatID: ChatID, hook: any) {
    this.chatCallback.set(chatID, hook);
    if (this.conns.get(chatID))
      this.conns.get(chatID).onmessage = (event) => {

      }
  };

  public async setOnOnlineCallBack(chatID: ChatID, hook: any) {
    this.chatCallback.set(chatID, hook);
    if (this.conns.get(chatID))
      this.conns.get(chatID).onmessage = (event) => {

      }
  };

  public async mergeMessages(chatID: ChatID, old: Message[]): Promise<Message[]> {
    const tmpArr = new Array();

    old.forEach((item: Message) => {
      tmpArr.push(item);
    });

    this.chatHook.get(chatID)?.forEach((item: Message) => {
      tmpArr.push(item);
    });

    return tmpArr;
  };

  public async sendMessage(chatID: ChatID, message: Message) {
    const resp = await fetch(HTTP_ADDRESS(chatID),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message)
      }
    );
    const data = await resp?.json();

    return data?.results;
  };

  public async onSend(chatID: ChatID, func: Function) {
    //if (chatID && func)
    // this.onSendMap.set(chatID, func);
  };

  public async onMessage(chatID: ChatID, old: Message) {
    /*this.conns?.get(chatID)?.onmessage = async () => {
    };*/
  };

  public async onClose(chatID: ChatID, func: Function) {
    //if (chatID && func)
    //this.conns.get(chatID)?.onclose = func;
  };

  public async onOpen(chatID: ChatID, func: Function) {
    //if (chatID && func)
    // this.conns.get(chatID)?.onopen = func;
  };

  public async getChat(chatID: ChatID) {
    console.log("chatID: ", chatID);
    const response = await fetch(`${API_URL}/chats/${chatID}`);
    const data = await response.json();
    console.log("chat: ", data?.results);
    return data?.results;
  };

  public async setOnline(userID: UserID, isOnline: boolean) {
    this.conns.get(0)?.send(JSON.stringify({
      type: "online",
      content: {
        user_id: userID,
        is_online: isOnline,
      }
    }))
  };

  public async setTyping(chatID: ChatID, userID: UserID | undefined, isTyping: boolean) {
    this.conns.get(chatID)?.send(JSON.stringify({
      type: "typing",
      content: {
        chat_id: chatID,
        user_id: userID,
        is_typing: isTyping,
      }
    }))
  };
};

export const RTChat: RTChatClient = new RTChatClient();