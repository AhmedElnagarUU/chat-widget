
window.onload = function() {
  // Launcher button
  const btn = document.createElement('div');
  btn.textContent = '💬';
  btn.style.width = '60px';
  btn.style.height = '60px';
  btn.style.background = 'linear-gradient(135deg,#ff6b6b,#f06595)';
  btn.style.color = 'white';
  btn.style.fontSize = '24px';
  btn.style.display = 'flex';
  btn.style.alignItems = 'center';
  btn.style.justifyContent = 'center';
  btn.style.borderRadius = '50%';
  btn.style.position = 'fixed';
  btn.style.bottom = '20px';
  btn.style.right = '20px';
  btn.style.cursor = 'pointer';
  btn.style.boxShadow = '0 6px 16px rgba(0,0,0,.3)';
  document.body.appendChild(btn);

  // Chat panel
  const panel = document.createElement('div');
  panel.style.width = '320px';
  panel.style.height = '420px';
  panel.style.background = '#fff';
  panel.style.borderRadius = '12px';
  panel.style.overflow = 'hidden';
  panel.style.position = 'fixed';
  panel.style.bottom = '90px';
  panel.style.right = '20px';
  panel.style.display = 'none';
  panel.style.flexDirection = 'column';
  panel.style.boxShadow = '0 8px 24px rgba(0,0,0,.25)';

  // Header
  const header = document.createElement('div');
  header.textContent = '✨ Chat Widget';
  header.style.background = 'linear-gradient(135deg,#845ef7,#5c7cfa)';
  header.style.color = 'white';
  header.style.padding = '10px';
  header.style.fontWeight = 'bold';
  header.style.textAlign = 'center';
  panel.appendChild(header);

  // Messages area
  const body = document.createElement('div');
  body.style.flex = '1';
  body.style.padding = '10px';
  body.style.overflowY = 'auto';
  body.style.background = '#f8f9fa';
  panel.appendChild(body);

  // Input area
  const inputWrap = document.createElement('div');
  inputWrap.style.display = 'flex';
  inputWrap.style.borderTop = '1px solid #ddd';
  inputWrap.style.background = '#fff';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Type a message...';
  input.style.flex = '1';
  input.style.border = 'none';
  input.style.padding = '10px';
  input.style.outline = 'none';

  const sendBtn = document.createElement('button');
  sendBtn.textContent = '➤';
  sendBtn.style.border = 'none';
  sendBtn.style.background = 'linear-gradient(135deg,#51cf66,#38d9a9)';
  sendBtn.style.color = 'white';
  sendBtn.style.padding = '0 16px';
  sendBtn.style.cursor = 'pointer';
  sendBtn.style.fontSize = '18px';

  inputWrap.appendChild(input);
  inputWrap.appendChild(sendBtn);
  panel.appendChild(inputWrap);

  document.body.appendChild(panel);

  // Toggle chat
  btn.onclick = () => {
    panel.style.display = (panel.style.display === 'none') ? 'flex' : 'none';
  };

  // Add message
  function addMsg(txt){
    if(!txt) return;
    const msg = document.createElement('div');
    msg.textContent = txt;
    msg.style.padding = '8px 12px';
    msg.style.margin = '6px 0';
    msg.style.borderRadius = '12px';
    msg.style.maxWidth = '75%';
    msg.style.color = 'white';
    msg.style.alignSelf = 'flex-end';
    msg.style.background = 'linear-gradient(135deg,#339af0,#4dabf7)';
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  // Send function
  function sendMsg(){
    addMsg(input.value.trim());
    input.value = '';
  }
  sendBtn.onclick = sendMsg;
  input.onkeydown = e => { if(e.key==='Enter'){e.preventDefault();sendMsg();} };
};
