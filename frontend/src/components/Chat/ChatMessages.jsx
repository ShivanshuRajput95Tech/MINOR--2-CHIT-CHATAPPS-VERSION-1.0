// ChatMessages.jsx
import React, { useEffect, useRef } from "react";

const ChatMessages = ({ messages, userDetails, selectedUserId }) => {
  const messagesContainerRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      className="absolute bottom-24 w-full px-7 lg:px-20 left-1/2 transform -translate-x-1/2 overflow-y-auto no-scrollbar max-h-[70vh]"
      ref={messagesContainerRef}
    >
      {/* If user is selected */}
      {!!selectedUserId && (
        <div className="flex flex-col gap-3">
          {messages.map((message) => {
            const isOwnMessage = message.sender === userDetails?._id;

            return (
              <div
                key={message._id}
                className={`text-white px-5 py-3 rounded-b-2xl max-w-[500px] relative group ${
                  isOwnMessage
                    ? "self-end bg-primarySecond rounded-l-2xl"
                    : "self-start bg-primary rounded-r-2xl"
                }`}
              >
                <div
                  className="break-words flex flex-wrap"
                  style={{ wordWrap: "break-word" }}
                >
                  {message.text}
                </div>

                {/* Tail bubble arrow */}
                <div
                  className={`absolute top-0 w-0 h-0 border-b-[20px] border-b-transparent ${
                    isOwnMessage
                      ? "-right-4 border-l-[20px] border-l-primarySecond"
                      : "-left-4 border-r-[20px] border-r-primary"
                  }`}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* No messages yet */}
      {selectedUserId && messages.length === 0 && (
        <div className="text-gray-500 text-center mt-10">
          Start a conversation
        </div>
      )}
    </div>
  );
};

export default ChatMessages;