// CafeBot Frontend Interactive Client Script

document.addEventListener('DOMContentLoaded', () => {
  const chatToggleBtn = document.getElementById('chat-toggle-btn');
  const chatWindow = document.getElementById('chat-window');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const quickChips = document.querySelectorAll('.quick-chip');

  if (!chatToggleBtn || !chatWindow) return;

  function formatTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function scrollToBottom() {
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  function openChat() {
    chatWindow.classList.add('open');
    chatWindow.setAttribute('aria-hidden', 'false');
    chatToggleBtn.classList.add('active');
    chatToggleBtn.querySelector('.toggle-label').textContent = 'Close';
    if (chatInput) {
      setTimeout(() => chatInput.focus(), 150);
    }
  }

  function closeChat() {
    chatWindow.classList.remove('open');
    chatWindow.setAttribute('aria-hidden', 'true');
    chatToggleBtn.classList.remove('active');
    chatToggleBtn.querySelector('.toggle-label').textContent = 'Chat with CafeBot';
  }

  chatToggleBtn.addEventListener('click', () => {
    if (chatWindow.classList.contains('open')) {
      closeChat();
    } else {
      openChat();
    }
  });

  if (chatCloseBtn) {
    chatCloseBtn.addEventListener('click', closeChat);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatWindow.classList.contains('open')) {
      closeChat();
    }
  });

  function appendMessage(sender, text) {
    const msgEl = document.createElement('div');
    msgEl.className = `chat-message ${sender}`;

    const bubbleEl = document.createElement('div');
    bubbleEl.className = 'message-bubble';
    bubbleEl.textContent = text;

    const timeEl = document.createElement('span');
    timeEl.className = 'message-time';
    timeEl.textContent = formatTime();

    msgEl.appendChild(bubbleEl);
    msgEl.appendChild(timeEl);
    chatMessages.appendChild(msgEl);
    scrollToBottom();
  }

  function handleSend(text) {
    const messageText = (text || chatInput.value).trim();
    if (!messageText) return;

    // 1. Show customer's bubble immediately
    appendMessage('user', messageText);
    if (chatInput) chatInput.value = '';

    // 2. Fixed mock reply without calling any API
    setTimeout(() => {
      appendMessage('bot', "Hi! I’m CafeBot. My AI brain isn’t connected yet.");
    }, 400);
  }

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSend();
    });
  }

  quickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-question');
      if (q) handleSend(q);
    });
  });
});
