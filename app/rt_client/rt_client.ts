import { API_URL } from "@/api/API_CONFIG";
import { ChatID, UserID, RTMessage } from "./models/models";
import { getCurrentUserID } from "@/utils/utils";
import { GetChat } from "@/api/chats/chats";
import { MessagesQueue } from "./messagesQueue/messagesQueue";

const WS_ADDRESS = (userID: UserID) =>
  (`ws://192.168.0.187:8080/ws/${userID}`);
const HTTP_ADDRESS = (chatID: ChatID) =>
  (`http://192.168.0.187:8080/chats/${chatID}/messages`);

class RTChatClient {
  private conns: Map<UserID, WebSocket> = new Map();
  private chatCallback: Map<ChatID, any> = new Map();
  private chatMessages: Map<ChatID, RTMessage[]> = new Map();
  private OnMessage: Map<ChatID, Function> = new Map();
  private OnSend: Map<ChatID, Function> = new Map();
  private OnOnline: Map<ChatID, Function> = new Map();
  private OnTyping: Map<ChatID, Function> = new Map();
  private messagesQueue: MessagesQueue = new MessagesQueue();

  private configure(userID: UserID) {
    this.conns.get(userID)!.onmessage = (event) => {
      const data: RTMessage = JSON.parse(event.data);
      const type = data?.type;
      console.log("MESSAGE HANDLER: ", data);
      switch (type) {
        case "message": {
          console.log("Message received");
          this.chatMessages.get(userID)?.push(data);
          this.OnMessage.get(userID)?.();
          break;
        }
        case "typing": {
          this.OnTyping.get(data?.content?.chat_id)?.(data?.content);
          break;
        }
        case "online": {
          console.log("User Is Online: ", data);
          this.OnOnline.get(data?.content?.chat_id)?.(data.content);
          break;
        }
      }
    };
  };

  constructor(userID: UserID = getCurrentUserID()) {
    /*if (userID !== 0) {
      this.conns.set(userID, new WebSocket(WS_ADDRESS(userID)));
      this.configure(userID);
    }*/
  };


  public async connect(userID: UserID) {
    if (this.conns.get(userID)) {
      return
    } else {
      this.conns.set(userID, new WebSocket(WS_ADDRESS(userID)));
      this.conns.get(userID)?.addEventListener("open", () => {
        this.setOnline(userID, true);
      })
    }
    this.configure(userID);
  };

  public async disconnect(chatID: ChatID) {
    this.conns.get(chatID)?.close();
  };

  public async setOnMessageCallBack(userID: UserID, hook: Function) {
    this.OnMessage.set(userID, hook);

  };

  public async setOnTypingCallBack(chatID: ChatID, hook: Function) {
    this.OnTyping.set(chatID, hook);
  };


  public async setOnOnlineCallBack(chatID: ChatID, hook: Function) {
    this.OnOnline.set(chatID, hook);
  };

  public async mergeMessages(chatID: ChatID, old: RTMessage[]): Promise<RTMessage[]> {
    const tmpArr = new Array();

    old.forEach((item: RTMessage) => {
      tmpArr.push(item);
    });

    this.chatMessages.get(chatID)?.forEach((item: RTMessage) => {
      tmpArr.push(item);
    });

    return tmpArr;
  };

  public async sendMessage(chatID: ChatID, message: RTMessage) {
    const resp = await fetch(HTTP_ADDRESS(chatID),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message)
      }
    );
    const data = await resp?.json();

    this.OnSend.get(chatID)?.();

    return data?.results;
  };

  public async onSend(chatID: ChatID, func: Function) {

  };

  public async onMessage(chatID: ChatID, func: Function) {
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
    //console.log("chatID: ", chatID);
    /*const response = await fetch(`${API_URL}/chats/${chatID}`);
    const data = await response.json();*/
    //console.log("chat: ", data?.results);
    //return data?.results;
    return GetChat(chatID || 0);
  };

  public async getChatMessages(chatID: ChatID) {
    const response = await fetch(`${API_URL}/chats/${chatID}/messages`);
    const data = await response.json();
    return data?.results;
  };

  public async setOnline(userID: UserID, isOnline: boolean = true) {
    this.conns.get(userID)?.send(JSON.stringify({
      type: "online",
      content: {
        user_id: userID,
        is_online: isOnline,
      }
    }));
  };

  public async setOffline(userID: UserID) {
    this.conns.get(userID)?.send(JSON.stringify({
      type: "online",
      content: {
        user_id: userID,
        is_online: false,
      }
    }));
  };

  public async setTyping(chatID: ChatID, userID: UserID, isTyping: boolean) {
    console.warn(`User: ${userID} is ${!isTyping ? "not" : ''} typing in chat ${chatID}`);
    console.warn(`Chat conns: ${this.conns.get(userID)}`);
    this.conns.get(userID)?.send(JSON.stringify({
      type: "typing",
      content: {
        chat_id: chatID,
        user_id: userID,
        is_typing: isTyping,
      }
    }));
  };

  public async setChatEntering(chatID: ChatID, userID: UserID) {
    console.warn(`User: ${userID} is enter chat ${chatID}`);
    console.warn(`Chat conns: ${this.conns.get(userID)}`);
    this.conns.get(userID)?.send(JSON.stringify({
      type: "chat_entering",
      content: {
        chat_id: chatID,
        user_id: userID,
      }
    }));
  };

  public async setChatLeaving(chatID: ChatID, userID: UserID) {
    console.warn(`User: ${userID} is leaving chat ${chatID}`);
    console.warn(`Chat conns: ${this.conns.get(userID)}`);
    this.conns.get(userID)?.send(JSON.stringify({
      type: "chat_leaving",
      content: {
        chat_id: chatID,
        user_id: userID,
      }
    }));
  };

  public async setPageEntering(page: string, userID: UserID) {
    console.warn(`User: ${userID} is entering page ${page}`);
    this.conns.get(userID)?.send(JSON.stringify({
      type: "page_entering",
      content: {
        page: page,
        user_id: userID,
      }
    }));
  };

  public async setPageLeaving(page: string, userID: UserID) {
    console.warn(`User: ${userID} is leaving page ${page}`);
    this.conns.get(userID)?.send(JSON.stringify({
      type: "page_leaving",
      content: {
        page: page,
        user_id: userID,
      }
    }));
  };

};

export const RTClient: RTChatClient = new RTChatClient();