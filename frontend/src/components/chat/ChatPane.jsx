import React from "react";
import MessageList from "./MessageList";
import MessageComposer from "./MessageComposer";

const ChatPane = ({ selectedUser, messages, userDetails, onSend, newMessage, setNewMessage }) => {
  return (
    <div className="flex-1 flex flex-col h-[80vh]">
      <div className="card mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={selectedUser?.avatarLink || '/favicon.ico'} className="h-10 w-10 rounded-full" alt="avatar" />
          <div>
            <div className="font-medium">{selectedUser?.username || 'Select a user'}</div>
            <div className="text-xs text-gray-300">{selectedUser?.status || ''}</div>
          </div>
        </div>
        <div className="text-sm text-gray-300">Online</div>
      </div>

      <div className="flex-1 overflow-auto no-scrollbar">
        <MessageList messages={messages} userDetails={userDetails} />
      </div>

      <div className="mt-3">
        <MessageComposer onSend={onSend} newMessage={newMessage} setNewMessage={setNewMessage} />
      </div>
    </div>
  );
};

export default ChatPane;
