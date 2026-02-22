const protect = require("../middleware/protect");
const Message = require("../models/messageModel");

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

module.exports = { getMessages: messageController };