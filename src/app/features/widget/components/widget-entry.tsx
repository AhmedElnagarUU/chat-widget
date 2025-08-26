import React from "react";
import ReactDOM from "react-dom/client";
import ChatWidget from "./ChatWidget";

// Extend the Window interface
declare global {
  interface Window {
    mountChatWidget: (chatId: string, apiUrl: string) => void;
  }
}

// Expose mount function globally
window.mountChatWidget = (chatId: string, apiUrl: string) => {
  const div = document.createElement("div");
  div.id = "chat-widget-root";
  document.body.appendChild(div);

  const root = ReactDOM.createRoot(div);
  root.render(<ChatWidget chatId={chatId} apiUrl={apiUrl} />);
};
