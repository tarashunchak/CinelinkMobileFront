import { ChatID, UserID, RTMessage } from "./models/models";
import { WSConnector, WSMessage } from "./ws_connector/ws_connector";
import { Chat, ChatManager, ChatMessage } from "./chat_manager/chat_manager";
import * as Makers from "./message_makers/message_makers";
import { Handlers } from "./message_handlers/message_handlers";

const WS_ADDRESS = (userID: UserID): string =>
  `${process.env.EXPO_PUBLIC_WS_URL}/${userID}`;
//`ws://192.168.0.187:8080/ws/${userID}`;
const HTTP_ADDRESS = (chatID: ChatID): string =>
  `${process.env.EXPO_PUBLIC_API_URL}/chats/${chatID}/messages`;

class RTClient_ {
  private wsConnections: Map<UserID, WSConnector> = new Map();
  private chatManager: ChatManager = new ChatManager();

  private onWSMessage(data: any) {
    const type = data?.type;
    const chatID: number = data?.chat_id;
    const callbacks = this.chatManager?.getCallbacks(chatID);
    const handler = Handlers.get(type);
    if (handler) {
      handler(data, this.chatManager);
    }
    /*switch (type) {
      case "message": {
        console.log("Message received");
        this.chatManager?.handleIncommingMessage(chatID, data);
        callbacks?.onMessage?.get(chatID)?.(data);
        break;
      }
      case "typing": {
        console.log("Typing received");
        console.warn("Callbacks: ", callbacks?.onTyping?.get(chatID));
        callbacks?.onTyping?.get(chatID)?.(data);
        break;
      }
      case "online": {
        console.log(`User Is ${data?.content?.is_online ? "Online" : "Offline"}: `, data);
        callbacks?.onOnline?.get(chatID)?.(data);
        break;
      }
    }*/
  }

  public connect(userID: UserID) {
    console.warn("User id in connect: ", userID);
    //const url = `${process.env.EXPO_PUBLIC_WS_URL}/` + userID;
    const url = WS_ADDRESS(userID);
    console.warn("url: ", url);
    this.wsConnections?.set(userID, new WSConnector(
      url,
      (data: any) => { this.onWSMessage(data); },
      () => { this.setOnlineStatus(userID, true); },
      () => { },
    ));
  };

  public disconnect(userID: UserID) {
    this.setOnlineStatus(userID, false);
    this.wsConnections?.get(userID)?.disconnect();
  };

  public async getChatMessages(chatID: ChatID): Promise<ChatMessage[]> {
    return this.chatManager.getChatMessages(chatID);
  };

  public async getChat(chatID: ChatID): Promise<Chat> {
    return this.chatManager.getChat(chatID);
  };

  public async setOnMessageCallBack(chatID: ChatID, callback: (_: WSMessage) => void) {
    this.chatManager.callbacks.onMessage.set(chatID, callback);
  };

  public setOnTypingCallBack(chatID: ChatID, callback: (_: WSMessage) => void) {
    this.chatManager.setOnTyping(chatID, callback);
  }

  public setOnOnlineCallBack(chatID: ChatID, callback: (_: WSMessage) => void) {
    this.chatManager.setOnOnline(chatID, callback);
  }

  public async setOnlineStatus(userID: UserID, isOnline: boolean = true) {
    this.wsConnections.get(userID)?.send(
      Makers.makeOnlineMessage({ user_id: userID, is_online: isOnline })
    );
  };

  public async setTypingStatus(chatID: ChatID, userID: UserID, isTyping: boolean) {
    console.warn(`User: ${userID} is ${!isTyping ? "not" : ''} typing in chat ${chatID}`);
    this.wsConnections.get(userID)?.send(
      Makers.makeTypingMessage({ user_id: userID, chat_id: chatID, is_typing: isTyping })
    );
  };

  public async setChatEntering(chatID: ChatID, userID: UserID) {
    this.wsConnections?.get(userID)?.send(
      Makers.makeChatEnteringMessage({ chat_id: chatID, user_id: userID })
    );
    this.wsConnections?.get(userID)?.send(
      Makers.makeSeenAllMessage({ chat_id: chatID, user_id: userID })
    );
  };

  public async setChatLeaving(chatID: ChatID, userID: UserID) {
    this.wsConnections?.get(userID)?.send(
      Makers.makeChatLeavingMessage({ chat_id: chatID, user_id: userID })
    );
  };

  public async setPageEntering(userID: UserID, page: string) {
    this.wsConnections?.get(userID)?.send(
      Makers.makePageEnteringMessage({ user_id: userID, page })
    );
  };

  public async setPageLeaving(userID: UserID, page: string) {
    this.wsConnections?.get(userID)?.send(
      Makers.makePageLeavingMessage({ user_id: userID, page })
    );
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

    return data?.results;
  };
};
//export const RTClient: RTChatClient = new RTChatClient();
export const RTClient: RTClient_ = new RTClient_();