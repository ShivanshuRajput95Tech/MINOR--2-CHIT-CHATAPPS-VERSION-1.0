import { useEffect, useRef, useState } from "react";
import wsService from "../services/ws";

// Simple hook that exposes connection status, lastMessage and send
export default function useWebSocket() {
  const [status, setStatus] = useState("closed");
  const [lastMessage, setLastMessage] = useState(null);
  const listenersRef = useRef([]);

  useEffect(() => {
    wsService.connect();

    const unsubOpen = wsService.subscribe("open", () => setStatus("open"));
    const unsubClose = wsService.subscribe("close", () => setStatus("closed"));
    const unsubError = wsService.subscribe("error", () => setStatus("error"));

    const unsubMessage = wsService.subscribe("message", (ev) => {
      try {
        const data = JSON.parse(ev.data);
        setLastMessage(data);
        // also call any local subscribers
        listenersRef.current.forEach((fn) => fn(data));
      } catch (err) {
        // if not JSON, pass raw
        listenersRef.current.forEach((fn) => fn(ev.data));
      }
    });

    return () => {
      unsubOpen();
      unsubClose();
      unsubError();
      unsubMessage();
    };
  }, []);

  function sendMessage(payload) {
    return wsService.send(payload);
  }

  function subscribe(fn) {
    listenersRef.current.push(fn);
    return () => {
      listenersRef.current = listenersRef.current.filter((f) => f !== fn);
    };
  }

  function close() {
    wsService.close();
  }

  return { status, lastMessage, sendMessage, subscribe, close };
}
