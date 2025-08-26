"use client";

import { useState, useEffect } from "react";

interface Message {
  id: number;
  text: string;
}

interface ChatWidgetProps {
  chatId: string;
  apiUrl: string;
}

export default function ChatWidget({ chatId, apiUrl }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Fetch messages from API
  useEffect(() => {
    fetch(`${apiUrl}/api/messages?chatId=${chatId}`, {
      headers: { "ngrok-skip-browser-warning": "69420" },
      cache: "no-store"
    })
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [chatId, apiUrl]);

  // Send new message
  const sendMessage = async () => {
    if (!input) return;
    const res = await fetch(`${apiUrl}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420"
      },
      body: JSON.stringify({ chatId, text: input }),
    });
    const newMessage = await res.json();
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "300px",
      height: "400px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      zIndex: 9999
    }}>
      <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ margin: "5px 0" }}>{msg.text}</div>
        ))}
      </div>
      <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: "5px", border: "none" }}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} style={{ padding: "5px 10px" }}>Send</button>
      </div>
    </div>
  );
}
