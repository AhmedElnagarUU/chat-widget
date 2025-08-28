(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "AIzaSyAwseOvx19kX9p8MMyiheOQEn9HfGvLwqw";
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    // --- Chat button ---
    const chatButton = document.createElement("div");
    chatButton.innerHTML = "💬";
    chatButton.style.cssText = `
      position: fixed; bottom: 20px; right: 20px;
      width: 60px; height: 60px; border-radius: 50%;
      background: #007bff; color: white;
      display: flex; align-items: center; justify-content: center;
      font-size: 24px; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      z-index: 9999;
    `;
    document.body.appendChild(chatButton);

    // --- Chat box ---
    const container = document.createElement("div");
    container.style.cssText = `
      position: fixed; bottom: 90px; right: 20px;
      width: 320px; height: 400px;
      display: none; flex-direction: column;
      border: 1px solid #ccc; border-radius: 12px;
      background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      overflow: hidden; z-index: 9998;
    `;
    document.body.appendChild(container);

    const messagesDiv = document.createElement("div");
    messagesDiv.style.cssText = "flex:1; overflow-y:auto; padding:10px; color:black;";
    container.appendChild(messagesDiv);

    const inputDiv = document.createElement("div");
    inputDiv.style.cssText = "display:flex; border-top:1px solid #ccc; background:#f9f9f9;";
    container.appendChild(inputDiv);

    const input = document.createElement("input");
    input.style.cssText = "flex:1; padding:10px; border:none; outline:none; color:black;";
    input.placeholder = "Type a message...";
    inputDiv.appendChild(input);

    const sendBtn = document.createElement("button");
    sendBtn.textContent = "➤";
    sendBtn.style.cssText = "padding:10px 15px; background:#007bff; color:white; border:none; cursor:pointer;";
    inputDiv.appendChild(sendBtn);

    // --- Toggle ---
    chatButton.onclick = () => {
      container.style.display = container.style.display === "none" ? "flex" : "none";
    };

    // --- Add message helper ---
    function addMessage(text, sender = "ai") {
      const div = document.createElement("div");
      div.textContent = text;
      div.style.margin = "5px 0";
      div.style.padding = "6px 10px";
      div.style.borderRadius = "8px";
      div.style.maxWidth = "80%";
      div.style.alignSelf = sender === "me" ? "flex-end" : "flex-start";
      div.style.background = sender === "me" ? "#d1e7dd" : "#f1f1f1";
      messagesDiv.appendChild(div);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
      return div;
    }

    // --- Send to Gemini ---
    async function sendMessage() {
      if (!input.value) return;
      const userText = input.value;
      input.value = "";

      addMessage(userText, "me");

      // Temporary "..." while waiting
      const loadingDiv = addMessage("...", "ai");

      try {
        const res = await fetch(`${API_URL}?key=${API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userText }] }]
          })
        });
        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response";
        loadingDiv.textContent = reply;
      } catch (err) {
        loadingDiv.textContent = "⚠️ Error: " + err.message;
      }
    }

    sendBtn.onclick = sendMessage;
    input.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });
  });
})();