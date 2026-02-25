import React from "react";

const MessageItem = ({ message, isOwn }) => {
  return (
    <div className={`flex items-end gap-3 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      {!isOwn && (
        <img src={message.avatarLink || '/favicon.ico'} alt="avatar" className="h-8 w-8 rounded-full" />
      )}


      <div className={`max-w-[70%] ${isOwn ? 'bg-primary/20 text-white' : 'bg-surface text-gray-100'} p-3 rounded-xl`}> 
        <div className="text-sm">{message.text}</div>
        <div className="flex items-center justify-end gap-2 mt-1">
          <div className="text-xs text-gray-400">{new Date(message.createdAt || Date.now()).toLocaleTimeString()}</div>
          {isOwn && message.read && (
            <div className="text-xs text-green-400">✔</div>
          )}
        </div>
      </div>

      {isOwn && (
        <img src={message.avatarLink || '/favicon.ico'} alt="avatar" className="h-8 w-8 rounded-full" />
      )}
    </div>
  );
};

export default MessageItem;
