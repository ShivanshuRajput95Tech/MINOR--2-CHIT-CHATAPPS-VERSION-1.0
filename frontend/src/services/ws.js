// ws.js - small WebSocket service with reconnection and simple event subscription
import { socketUrl } from "../config/apiConfig";

class WSService {
  constructor() {
    this.ws = null;
    this.listeners = { open: [], close: [], message: [], error: [] };
    this.reconnectInterval = 1000;
    this.maxReconnectInterval = 30000;
    this.shouldReconnect = true;
  }

  connect() {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) return;

    try {
      this.ws = new WebSocket(socketUrl);
    } catch (err) {
      console.error("WebSocket connect error", err);
      this.scheduleReconnect();
      return;
    }

    this.ws.addEventListener("open", (ev) => {
      this.reconnectInterval = 1000; // reset backoff
      this.listeners.open.forEach((cb) => cb(ev));
    });

    this.ws.addEventListener("close", (ev) => {
      this.listeners.close.forEach((cb) => cb(ev));
      if (this.shouldReconnect) this.scheduleReconnect();
    });

    this.ws.addEventListener("error", (ev) => {
      this.listeners.error.forEach((cb) => cb(ev));
    });

    this.ws.addEventListener("message", (ev) => {
      this.listeners.message.forEach((cb) => cb(ev));
    });
  }

  scheduleReconnect() {
    setTimeout(() => {
      this.reconnectInterval = Math.min(this.reconnectInterval * 1.5, this.maxReconnectInterval);
      this.connect();
    }, this.reconnectInterval);
  }

  send(data) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket not open, cannot send");
      return false;
    }
    this.ws.send(typeof data === "string" ? data : JSON.stringify(data));
    return true;
  }

  subscribe(type, cb) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(cb);
    return () => this.unsubscribe(type, cb);
  }

  unsubscribe(type, cb) {
    if (!this.listeners[type]) return;
    this.listeners[type] = this.listeners[type].filter((f) => f !== cb);
  }

  close() {
    this.shouldReconnect = false;
    if (this.ws) this.ws.close();
  }
}

const wsService = new WSService();
export default wsService;
