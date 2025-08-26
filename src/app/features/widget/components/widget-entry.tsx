import React from "react";
import ReactDOM from "react-dom/client";
import ChatWidget from "./ChatWidget";

// Expose mount function globally
(window as any).mountChatWidget = (chatId: string, apiUrl: string) => {
  const div = document.createElement("div");
  div.id = "chat-widget-root";
  document.body.appendChild(div);

  const root = ReactDOM.createRoot(div);
  root.render(<ChatWidget chatId={chatId} apiUrl={apiUrl} />);
};
