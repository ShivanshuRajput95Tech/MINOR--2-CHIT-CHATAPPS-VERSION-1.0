const { User } = require("../models/userModel");

const peopleController = async (req, res) => {
  try {
    // Return only verified users
    const users = await User.find({ verified: true }).select("-password");

    return res.json(users);

  } catch (error) {
    console.error("Error in peopleController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getPeople: peopleController };