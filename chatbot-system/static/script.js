document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('message-input');
  const messages = document.getElementById('messages');
  const sendBtn = document.getElementById('send-btn');

  function timestamp() {
    const d = new Date();
    return d.toLocaleTimeString();
  }

  function append(text, cls) {
    const wrapper = document.createElement('div');
    const el = document.createElement('div');
    el.className = 'message ' + cls;
    el.textContent = text;
    wrapper.appendChild(el);
    const meta = document.createElement('span');
    meta.className = 'meta';
    meta.textContent = timestamp();
    wrapper.appendChild(meta);
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
  }

  function setLoading(loading) {
    sendBtn.disabled = loading;
    input.disabled = loading;
    sendBtn.textContent = loading ? 'Sending...' : 'Send';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    append(text, 'user');
    input.value = '';
    setLoading(true);

    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      append(data.reply || 'No response', 'bot');
    } catch (err) {
      append('Error connecting to server', 'bot');
    } finally {
      setLoading(false);
    }
  });

  // Allow sending with Enter key
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });
});
