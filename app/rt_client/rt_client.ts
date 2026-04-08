import { API_URL } from "@/api/API_CONFIG";
import { ChatID, UserID, RTMessage } from "./models/models";
import { getCurrentUserID } from "@/utils/utils";
import { GetChat } from "@/api/chats/chats";
import { MessagesQueue } from "./messagesQueue/messagesQueue";
import { WSConnector } from "./ws_connector/ws_connector";
import { Chat, ChatManager, ChatMessage } from "./chat_manager/chat_manager";

const WS_ADDRESS = (userID: UserID): string =>
  `${process.env.EXPO_PUBLIC_WS_URL}/${userID}`;
const HTTP_ADDRESS = (chatID: ChatID): string =>
  `${process.env.EXPO_PUBLIC_API_URL}/chats/${chatID}/messages`;

class RTClient_ {
  private wsConnections: Map<UserID, WSConnector> = new Map();
  private chatManager: ChatManager = new ChatManager();

  private onWSMessage(data: any) {
    const type = data?.type;
    const chatID: number = data?.content?.chat_id;
    switch (type) {
      case "message": {
        console.log("Message received");
        this.chatManager?.handleIncommingMessage(chatID, data);
        this.chatManager?.getCallbacks(chatID)?.onMessage?.(data);
        break;
      }
      case "typing": {
        console.log("Typing received");
        this.chatManager?.getCallbacks(chatID)?.onTyping?.(data)
        break;
      }
      case "online": {
        console.log("User Is Online: ", data);
        this.chatManager?.getCallbacks(chatID)?.onOnline?.(data)
        break;
      }
    }
  }

  public connect(userID: UserID) {
    this.wsConnections?.set(userID, new WSConnector(
      WS_ADDRESS(userID),
      (data: any) => this.onWSMessage,
      () => { }
    ))
  };

  public disconnect(userID: UserID) {
    this.wsConnections?.get(userID)?.disconnect();
  };

  public async getChatMessages(chatID: ChatID): Promise<ChatMessage[]> {
    return this.chatManager.getChatMessages(chatID);
  };

  public async getChat(chatID: ChatID): Promise<Chat> {
    return this.chatManager.getChat(chatID);
  };

  public async setOnMessageCallBack(chatID: ChatID, callBack: Function) {
    this.chatManager.callbacks.onMessage.set(chatID, callBack);
  };

  public async setOnTypingCallBack(chatID: ChatID, callBack: Function) {
    this.chatManager.callbacks.onTyping.set(chatID, callBack);
  };

  public async setOnOnlineCallBack(chatID: ChatID, callBack: Function) {
    this.chatManager.callbacks.onOnline.set(chatID, callBack);
  };

  public async setChatEntering(chatID: ChatID, userID: UserID) {
    this.wsConnections?.get(userID)?.send({
      type: "chat_entering",
      content: {
        user_id: userID,
        chat_id: chatID,
      }
    });
  };

  public async setChatLeaving(chatID: ChatID, userID: UserID) {
    this.wsConnections?.get(userID)?.send({
      type: "chat_leaving",
      content: {
        user_id: userID,
        chat_id: chatID,
      }
    });
  };
};

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
      switch (type) {
        case "message": {
          console.log("Message received");
          this.chatMessages.get(userID)?.push(data);
          this.OnMessage.get(userID)?.();
          break;
        }
        case "typing": {
          const chat_id: ChatID = data?.content?.chat_id;
          console.warn(`Connection ${chat_id}: ${this.OnTyping.get(chat_id)}`)
          this.OnTyping.get(chat_id)?.(data?.content);
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
        this.configure(userID);
      })
    }
  };

  public async disconnect(chatID: ChatID) {
    this.conns.get(chatID)?.close();
  };

  public async setOnMessageCallBack(userID: UserID, callback: Function) {
    this.OnMessage.set(userID, callback);

  };

  public async setOnTypingCallBack(chatID: ChatID, callback: Function) {
    this.OnTyping.set(chatID, callback);
  };


  public async setOnOnlineCallBack(chatID: ChatID, callback: Function) {
    this.OnOnline.set(chatID, callback);
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
    console.warn("Chat conns: ", this.conns.get(userID));
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
    const ws = this.conns.get(userID);
    if (ws?.OPEN) {
      ws?.send(JSON.stringify({
        type: "chat_entering",
        content: {
          chat_id: chatID,
          user_id: userID,
        }
      }));
    }
  };

  public async setChatLeaving(chatID: ChatID, userID: UserID) {
    console.warn(`User: ${userID} is leaving chat ${chatID}`);
    console.warn("Chat conns: ", this.conns.get(userID));
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
    const ws = this.conns.get(userID);
    if (ws && ws?.readyState === ws?.OPEN) {
      ws?.send(JSON.stringify({
        type: "page_entering",
        content: {
          page: page,
          user_id: userID,
        }
      }));
    }
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