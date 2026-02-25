const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sender: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "user", 
      required: true 
    },

    recipient: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "user", 
      required: true 
    },

    text: { 
      type: String, 
      required: true 
    },

    // Optional: mark message read/unread (useful later)
    read: { 
      type: Boolean, 
      default: false 
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;