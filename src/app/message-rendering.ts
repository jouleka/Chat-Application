/** Keep websocket message content as text; it must never be interpreted as HTML. */
export function appendChatMessage(body: unknown): void {
  document.querySelectorAll('.chat').forEach(container => {
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = String(body ?? '');
    container.appendChild(message);
  });
}
