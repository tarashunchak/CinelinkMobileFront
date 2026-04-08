import { ChatID, UserID, RTMessage } from "../models/models";

type MessageHandler = (message: any) => void;

class WSConnector {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private pingInterval: any;

  constructor(
    private url: string,
    private onMessage: MessageHandler,
    private onOpen: () => void
  ) { }

  public connect() {
    this.ws = new WebSocket(this.url)

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.startPing();
      this.onOpen();
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.onMessage(data);
      } catch (e) {
        console.error("Failed to parse WS message: ", e);
      }
    };

    this.ws.onclose = () => {
      this.stopPing();
      this.attemptReconnect();
    };
  }

  private attemptReconnect() {
    if (this.reconnectAttempts, this.maxReconnectAttempts) {
      ++this.reconnectAttempts;
      setTimeout(() => this.connect(), 2000 * this.reconnectAttempts);
    }
  }

  private startPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: "ping" })
    }, 30000)
  }

  private stopPing() {
    clearInterval(this.pingInterval);
  }

  public send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws?.send(JSON.stringify(data));
    } else {
      console.warn("WS is not open. Message not sent: ", data);
    }
  }

  public disconnect() {
    this.ws?.close();
  }
};