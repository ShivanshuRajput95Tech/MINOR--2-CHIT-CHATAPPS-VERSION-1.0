import React from "react";
import MessageItem from "./MessageItem";
import { motion, AnimatePresence } from "framer-motion";

function dayKey(ts) {
  const d = new Date(ts);
  return d.toDateString();
}

const MessageList = ({ messages = [], userDetails }) => {
  if (!messages || messages.length === 0) {
    return <div className="px-2 py-4 text-center text-gray-400 mt-8">No messages yet — start the conversation</div>;
  }

  // Render messages with date separators and simple grouping
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
      <AnimatePresence initial={false}>
        {items.map((it) => {
          if (it.type === "day") {
            return (
              <motion.div
                key={it.key}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-center text-xs text-gray-400 my-3"
              >
                {it.label}
              </motion.div>
            );
          }

          const m = it.message;
          return (
            <motion.div
              key={it.key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
            >
              <MessageItem message={m} isOwn={m.sender === userDetails?._id} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default MessageList;
