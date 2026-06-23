import { ChatID, UserID } from "./src/models/models";
import { WSConnector, WSMessage } from "./src/ws_connector/ws_connector";
import { Chat, ChatManager } from "./src/chat_manager/chat_manager";
import * as Makers from "./src/event_driven/message_makers";
import { Handlers } from "./src/event_driven/message_handlers";
//import { useEffect } from "react";
//import { useChatStore } from "./app_state";
import { ChatMessage } from "./src/message_storage/message_storage";
import { MessagesManager } from "./src/managers/messages_manager";
import { RTCLIENT_CONFIG } from "./config";

const WS_ADDRESS = (userID: UserID): string => 
  `${RTCLIENT_CONFIG.WS_URL}/ws/${userID}`

const HTTP_ADDRESS = (chatID: ChatID): string =>
  `${RTCLIENT_CONFIG.API_URL}/chats/${chatID}/messages`;

class RTClient_ {
  private wsConnections: Map<UserID, WSConnector> = new Map();
  private chatManager: ChatManager = new ChatManager();
  private onReconnect: ()=> void = ()=>{};

  private onWSMessage(data: any) {
    const type = data?.type;
    const handler = Handlers.get(type);
    if (handler)
      handler(data, this.chatManager);
  };

  public connect() {
    const userID = RTCLIENT_CONFIG.CURR_USER_ID_SELECTOR();
    const url = WS_ADDRESS(userID);
    console.warn("url: ", url);
    this.wsConnections?.set(userID, new WSConnector(
      url,
      (data: any) => { this.onWSMessage(data); },
      () => { 
        this.setOnlineStatus(userID, true); 
        this.onReconnect();
      },
      () => { },
    ));
  };

  public getChatMessages = this.chatManager.getChatMessages;

  public disconnect(userID: UserID) {
    this.setOnlineStatus(userID, false);
    this.wsConnections?.get(userID)?.disconnect();
  };

  public async getChat(chatID: ChatID): Promise<Chat> {
    return this.chatManager.getChat(chatID);
  };

  public async setOnReconnect(callback: ()=>void) {
    this.onReconnect = callback;
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
    //console.warn(`User: ${userID} is ${!isTyping ? "not" : ''} typing in chat ${chatID}`);
    this.wsConnections.get(userID)?.send(
      Makers.makeTypingMessage({ user_id: userID, chat_id: chatID, is_typing: isTyping })
    );
  };

  public async setChatEntering(chatID: ChatID, userID: UserID) {
    this.chatManager.connect(chatID);
    this.wsConnections?.get(userID)?.send(
      Makers.makeChatEnteringMessage({ chat_id: chatID, user_id: userID })
    );
    this.wsConnections?.get(userID)?.send(
      Makers.makeSeenAllMessage({ chat_id: chatID, user_id: userID })
    );

    //const messageID: number = [...useChatStore.getState().messages[chatID] || []].reverse()[0]?.message_id ?? 0;
    //useChatStore.getState()._setLastSeenMessageID(chatID, messageID);
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

  public async sendMessage(chatID: ChatID, message: ChatMessage) {
    if(message.message?.length === 0) return;
    const resp = await fetch(HTTP_ADDRESS(chatID),
      {
        method: "POST",
        headers: { "Content-Type": "application/json",
          ...RTCLIENT_CONFIG.JWT_SELECTOR(undefined)
        },
        body: JSON.stringify(Makers.makeMessageSendingMessage(message))
      }
    );
    const data = await resp?.json();
    const msg: ChatMessage = data?.results?.content;
    if (resp?.ok && data?.status === 200) {
      console.warn("Data ok: ", msg)
      MessagesManager.getInstance().add(chatID, msg);
    }
    return data?.results;
  };

  public getLastSeenMessageID(chatID: ChatID) {
    //const messageID = useChatStore.getState().lastSeenMessageID[chatID];
    //return messageID;
  };

  public createMessageStorage = this.chatManager.connect;

  public isLoaded = this.chatManager.isLoaded;
};

export const RTClient: RTClient_ = new RTClient_();

const EMPTY_ARRAY: ChatMessage[] = [];

/*export const useChatMessages = (chatID: ChatID) => {
  const messages = useChatStore(state => state.messages[chatID] || EMPTY_ARRAY);
  useEffect(() => {
    if (messages.length === 0)
      RTClient.getChatMessages(chatID);
  }, [chatID, messages.length]);
  return messages;
};*/

/*export function useChatLastMessage(chatID: ChatID): string {
  const lastMessage = useChatStore(state => state.lastMessage[chatID] ?? "");
  //const typing = useChatStore(state => state.typingStatus[userID] || false);
  useEffect(() => { }, [chatID, lastMessage]);
  return lastMessage;
};

export function useUserStatus(userID: UserID): boolean {
  const status = useChatStore(state => state.onlineStatus[userID] ?? false);
  useEffect(() => { }, [userID]);
  return status;
};

export function useTypingStatus(userID: UserID): boolean {
  const status = useChatStore(state => state.typingStatus[userID] ?? false);
  useEffect(() => { }, [userID, status]);
  return status[userID];
};

export function useUserTypingInChatStatus(userID: UserID, chatID: ChatID): boolean {
  const status = useChatStore(state => state.typingStatus[chatID] ?? false)
  useEffect(() => { }, [userID, chatID]);
  return status[userID];
};

export function useUnseenMessageCount(chatID: ChatID): number {
  const lastMessage = useChatStore(state => state.lastMessage[chatID]?.message_id ?? 0);
  return lastMessage;
};

export function useChatTypingUsers(chatID: ChatID): string {
  return "a";
};


export function useChat(chatID: ChatID){
  const typingListener = (e: Event)=>{
    if(typeof e === FocusEvent)
    RTClient.setTypingStatus(chatID, RTCLIENT_CONFIG.CURR_USER_ID_SELECTOR(), status);
  };
};*/