// MessageInputForm.jsx
import React from "react";

const MessageInputForm = ({
  selectedUserId,
  newMessage,
  setNewMessage,
  sendMessage,
}) => {
  return (
    <>
      {!!selectedUserId && (
        <form
          onSubmit={sendMessage}
          className="relative m-4 w-[95%] lg:w-[80%]"
        >
          {/* Message Input */}
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none"
            placeholder="Your Message"
            value={newMessage}
            onChange={(ev) => setNewMessage(ev.target.value)}
            required
          />

          {/* Send Button */}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 bg-primarySecond hover:bg-primary rounded-full text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.4}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.27 3.12A59.8 59.8 0 0 1 21.49 12 59.77 59.77 0 0 1 3.27 20.88L6 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      )}
    </>
  );
};

export default MessageInputForm;