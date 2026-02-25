const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

// =========================
// GET PROFILE CONTROLLER
// =========================
const profileController = async (req, res) => {
  try {
    const token = req.cookies?.authToken;

    if (!token) {
      return res.status(401).json("No token");
    }

    jwt.verify(token, process.env.JWTPRIVATEKEY, {}, async (err, userData) => {
      if (err) {
        return res.status(401).json("Invalid token");
      }

      const user = await User.findById(userData._id).select("-password");
      return res.json(user);
    });

  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json("Internal Server Error");
  }
};

// =========================
// UPDATE PROFILE CONTROLLER
// =========================
const profileUpdate = async (req, res) => {
  try {
    const token = req.cookies?.authToken;

    if (!token) {
      return res.status(401).json("No token");
    }

    jwt.verify(token, process.env.JWTPRIVATEKEY, {}, async (err, userData) => {
      if (err) {
        return res.status(401).json("Invalid token");
      }

      const { firstName, lastName, email, avatarLink } = req.body;

      const user = await User.findById(userData._id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user fields
      user.firstName = firstName ?? user.firstName;
      user.lastName = lastName ?? user.lastName;
      user.email = email ?? user.email;
      user.avatarLink = avatarLink ?? user.avatarLink;

      await user.save();

      const updatedUser = user.toObject();
      delete updatedUser.password;

      return res.json(updatedUser);
    });

  } catch (err) {
    console.error("Profile update error:", err);
    return res.status(500).json("Internal Server Error");
  }
};

// Export controllers
module.exports = { profileController, profileUpdate };