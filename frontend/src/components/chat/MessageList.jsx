import React from "react";
import MessageItem from "./MessageItem";
import "./MessageList.css";

function dayKey(ts) {
  const d = new Date(ts);
  return d.toDateString();
}

const MessageList = ({ messages = [], userDetails }) => {
  if (!messages || messages.length === 0) {
    return <div className="px-2 py-4 text-center text-gray-400 mt-8">No messages yet — start the conversation</div>;
  }

  const items = [];
  let lastDay = null;
  messages.forEach((m, idx) => {
    const dKey = dayKey(m.createdAt || m._id || Date.now());
    if (dKey !== lastDay) {
      items.push({ type: "day", key: `day-${dKey}-${idx}`, label: dKey });
      lastDay = dKey;
    }

    items.push({ type: "msg", key: m._id || m.id || `m-${idx}`, message: m });
  });

  return (
    <div className="px-2 py-4 flex flex-col gap-3">
      {items.map((it) => {
        if (it.type === "day") {
          return (
            <div key={it.key} className="message-day-separator">
              {it.label}
            </div>
          );
        }

        const m = it.message;
        return (
          <div key={it.key} className="message-fade-in">
            <MessageItem message={m} isOwn={m.sender === userDetails?._id} />
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
