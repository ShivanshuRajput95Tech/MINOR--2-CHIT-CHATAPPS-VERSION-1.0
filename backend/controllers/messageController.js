const protect = require("../middleware/protect");
const Message = require("../models/messageModel");
const wsServer = require("../wsServer");

const messageController = async (req, res) => {
  try {
    // Authenticate user from cookies
    const userData = await protect(req);
    const ourUserId = userData._id;
    const { userId } = req.params;

    // Fetch chat between both users
    const messages = await Message.find({
      $or: [
        { sender: ourUserId, recipient: userId },
        { sender: userId, recipient: ourUserId }
      ]
    }).sort({ createdAt: 1 });

    return res.json(messages);

  } catch (err) {
    console.error("Error in messageController:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Mark messages from a specific user as read
const markAsRead = async (req, res) => {
  try {
    const userData = await protect(req);
    const ourUserId = userData._id;
    const { userId } = req.params;

    // Find unread messages from this sender to the current user
    const unreadMessages = await Message.find({ sender: userId, recipient: ourUserId, read: false }).lean();

    if (unreadMessages.length === 0) {
      return res.json({ modifiedCount: 0 });
    }

    const ids = unreadMessages.map((m) => m._id);

    // Update messages where sender is userId and recipient is ourUserId
    const result = await Message.updateMany(
      { _id: { $in: ids } },
      { $set: { read: true } }
    );

    // Broadcast a read event per-message to the original sender via WebSocket (if connected)
    try {
      const wss = wsServer && wsServer.wss;
      if (wss) {
        unreadMessages.forEach((m) => {
          const senderId = m.sender && m.sender.toString();
          if (!senderId) return;

          [...wss.clients].forEach((client) => {
            if (client.userId && client.userId.toString() === senderId) {
              client.send(
                JSON.stringify({
                  type: "read",
                  messageId: m._id,
                  by: ourUserId,
                  byName: userData.firstName + (userData.lastName ? ` ${userData.lastName}` : ""),
                })
              );
            }
          });
        });
      }
    } catch (err) {
      console.error("Error broadcasting read events:", err);
    }

    return res.json({ modifiedCount: result.modifiedCount || result.nModified || ids.length });
  } catch (err) {
    console.error("Error in markAsRead:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getMessages: messageController, markAsRead };