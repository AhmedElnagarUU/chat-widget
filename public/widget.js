(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // --- Create chat button (toggle) ---
    const chatButton = document.createElement("div");
    chatButton.id = "chat-widget-button";
    chatButton.innerHTML = "💬"; 
    chatButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #007bff;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      z-index: 9999;
      transition: transform 0.2s ease;
    `;
    chatButton.onmouseenter = () => (chatButton.style.transform = "scale(1.1)");
    chatButton.onmouseleave = () => (chatButton.style.transform = "scale(1)");
    document.body.appendChild(chatButton);

    // --- Create chat widget ---
    const container = document.createElement("div");
    container.id = "chat-widget-root";
    container.style.cssText = `
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 320px;
      height: 400px;
      border: 1px solid #ccc;
      border-radius: 12px;
      background: #fff;
      display: none;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      z-index: 9998;
      transition: all 0.3s ease;
    `;
    document.body.appendChild(container);

    // --- Messages area ---
    const messagesDiv = document.createElement("div");
    messagesDiv.style.flex = "1";
    messagesDiv.style.overflowY = "auto";
    messagesDiv.style.padding = "10px";
	   messagesDiv.style.color = "black";
    container.appendChild(messagesDiv);

    // --- Input area ---
    const inputDiv = document.createElement("div");
    inputDiv.style.display = "flex";
    inputDiv.style.borderTop = "1px solid #ccc";
    inputDiv.style.background = "#f9f9f9";
    container.appendChild(inputDiv);

    const input = document.createElement("input");
    input.style.flex = "1";
    input.style.padding = "10px";
	  input.style.color = "black";
    input.style.border = "none";
    input.style.outline = "none";
    input.placeholder = "Type a message...";
    inputDiv.appendChild(input);

    const button = document.createElement("button");
    button.style.padding = "10px 15px";
    button.style.background = "#007bff";
    button.style.color = "white";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.textContent = "➤";
    inputDiv.appendChild(button);

    // --- Toggle widget open/close ---
    chatButton.addEventListener("click", () => {
      container.style.display =
        container.style.display === "none" ? "flex" : "none";
    });

    // --- API connection ---
    const apiUrl = "https://YOUR-NGROK-URL.ngrok-free.app"; // 👈 put your ngrok URL
    const chatId = "customer123";

    // --- Load messages from server ---
    async function loadMessages() {
      const res = await fetch(`${apiUrl}/api/messages?chatId=${chatId}`, {
        headers: { "ngrok-skip-browser-warning": "true" }
      });
      const data = await res.json();
      messagesDiv.innerHTML = "";
      data.forEach((msg) => {
        const div = document.createElement("div");
        div.textContent = msg.text;
        div.style.margin = "5px 0";
        div.style.padding = "6px 10px";
        div.style.borderRadius = "8px";
        div.style.maxWidth = "80%";
        div.style.background = msg.sender === "me" ? "#d1e7dd" : "#f1f1f1";
        div.style.alignSelf = msg.sender === "me" ? "flex-end" : "flex-start";
        messagesDiv.appendChild(div);
      });
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // --- Send message ---
    async function sendMessage() {
      if (!input.value) return;

      // 1️⃣ Append immediately to chat
      const userDiv = document.createElement("div");
      userDiv.textContent = input.value;
      userDiv.style.margin = "5px 0";
      userDiv.style.padding = "6px 10px";
      userDiv.style.borderRadius = "8px";
      userDiv.style.maxWidth = "80%";
      userDiv.style.background = "#d1e7dd";
      userDiv.style.alignSelf = "flex-end";
      messagesDiv.appendChild(userDiv);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;

      const textToSend = input.value;
      input.value = "";

      // 2️⃣ Send to API
      try {
        await fetch(`${apiUrl}/api/messages`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
          },
          body: JSON.stringify({ chatId, text: textToSend }),
        });
      } catch (err) {
        console.error("Failed to send message", err);
      }
    }

    button.addEventListener("click", sendMessage);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });

    loadMessages();
  });
})();