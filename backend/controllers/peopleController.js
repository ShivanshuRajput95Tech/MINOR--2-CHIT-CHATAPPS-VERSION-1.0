const { User } = require("../models/userModel");
const protect = require("../middleware/protect");
const Message = require("../models/messageModel");

const peopleController = async (req, res) => {
  try {
    // Protect and get current user
    const userData = await protect(req);
    const ourUserId = userData._id;

    // Fetch verified users
    const users = await User.find({ verified: true }).select("-password");

    // For each user, compute unread count (messages they sent to current user that are unread)
    const enhanced = await Promise.all(
      users
        .filter((u) => u._id.toString() !== ourUserId.toString())
        .map(async (u) => {
          const unread = await Message.countDocuments({ sender: u._id, recipient: ourUserId, read: false });
          const lastMsg = await Message.findOne({
            $or: [
              { sender: ourUserId, recipient: u._id },
              { sender: u._id, recipient: ourUserId },
            ],
          })
            .sort({ createdAt: -1 })
            .lean();

          return {
            _id: u._id,
            username: u.firstName + (u.lastName ? ` ${u.lastName}` : ""),
            avatarLink: u.avatarLink,
            online: u.online || false,
            unread,
            lastMessage: lastMsg ? lastMsg.text : "",
          };
        })
    );

    return res.json(enhanced);

  } catch (error) {
    console.error("Error in peopleController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getPeople: peopleController };

// Get single user by id (with unread and lastMessage relative to current user)
const getPersonById = async (req, res) => {
  try {
    const userData = await protect(req);
    const ourUserId = userData._id;
    const { id } = req.params;

    const u = await User.findById(id).select("-password").lean();
    if (!u) return res.status(404).json({ error: "User not found" });

    const unread = await Message.countDocuments({ sender: u._id, recipient: ourUserId, read: false });
    const lastMsg = await Message.findOne({
      $or: [
        { sender: ourUserId, recipient: u._id },
        { sender: u._id, recipient: ourUserId },
      ],
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      _id: u._id,
      username: u.firstName + (u.lastName ? ` ${u.lastName}` : ""),
      avatarLink: u.avatarLink,
      online: u.online || false,
      unread,
      lastMessage: lastMsg ? lastMsg.text : "",
    });
  } catch (err) {
    console.error("Error in getPersonById:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getPersonById = getPersonById;