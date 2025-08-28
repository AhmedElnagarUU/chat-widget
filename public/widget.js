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

    // --- Auto scroll to bottom ---
    function scrollToBottom() {
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // --- Send message ---
    async function sendMessage() {
      if (!input.value.trim()) return;

      // 1️⃣ Append user message
      const userDiv = document.createElement("div");
      userDiv.textContent = input.value;
      userDiv.style.margin = "5px 0";
      userDiv.style.padding = "6px 10px";
      userDiv.style.borderRadius = "8px";
      userDiv.style.maxWidth = "80%";
      userDiv.style.background = "#d1e7dd";
      userDiv.style.alignSelf = "flex-end";
      messagesDiv.appendChild(userDiv);
      scrollToBottom();

      const textToSend = input.value;
      input.value = "";

      // 2️⃣ Append temporary loading (AI typing...)
      const aiDiv = document.createElement("div");
      aiDiv.textContent = "Typing...";
      aiDiv.style.margin = "5px 0";
      aiDiv.style.padding = "6px 10px";
      aiDiv.style.borderRadius = "8px";
      aiDiv.style.maxWidth = "80%";
      aiDiv.style.background = "#f1f1f1";
      aiDiv.style.alignSelf = "flex-start";
      messagesDiv.appendChild(aiDiv);
      scrollToBottom();

      // Animate dots
      let dots = 0;
      const typingInterval = setInterval(() => {
        dots = (dots + 1) % 4;
        aiDiv.textContent = "Typing" + ".".repeat(dots);
      }, 500);

      // 3️⃣ Send to API and replace loading with reply
      try {
        const res = await fetch(`${apiUrl}/api/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({ text: textToSend }),
        });
        const data = await res.json();

        clearInterval(typingInterval);
        aiDiv.textContent = data.reply || "⚠️ No response";
        scrollToBottom();
      } catch (err) {
        clearInterval(typingInterval);
        aiDiv.textContent = "⚠️ Failed to connect";
        console.error("Failed to send message", err);
      }
    }

    button.addEventListener("click", sendMessage);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  });
})();
