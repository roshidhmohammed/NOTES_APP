import { useEffect, useRef } from "react";

export function useNoteSocket(id, onReceive) {
  const wsRef = useRef(null);
  const lastSent = useRef({ content: "", title: "" });

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_APP_SOCKET_URL+id);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const { content, title } = JSON.parse(event.data);

      if (
        content !== lastSent.current.content ||
        title !== lastSent.current.title
      ) {
        onReceive(content, title);
      }
    };

    return () => {
      ws.close();
    };
  }, [id]);

  const sendUpdate = (content, title) => {
    lastSent.current = { content, title };

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ content, title }));
    }
  };

  return { sendUpdate };
}
