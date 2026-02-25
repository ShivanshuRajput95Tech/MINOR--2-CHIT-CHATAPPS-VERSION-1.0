import React from "react";

const MessageComposer = ({ onSend, newMessage, setNewMessage }) => {
  const submit = (e) => {
    e?.preventDefault();
    if (!newMessage?.trim()) return;
    onSend();
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-3" aria-label="Message composer">
      <input
        aria-label="Message input"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Write a message..."
        className="flex-1 bg-surface rounded-full py-3 px-4 text-sm border border-gray-700 focus-visible:shadow-md"
      />

      <button aria-label="Send message" type="submit" className="bg-primary px-4 py-2 rounded-full text-sm text-black font-semibold hover:bg-primary-600">
        Send
      </button>
    </form>
  );
};

export default MessageComposer;
