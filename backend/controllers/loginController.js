const bcrypt = require("bcrypt");
const { User, validateLogin } = require("../models/userModel");

const loginController = async (req, res) => {
  try {
    // Validate user input
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid Email" });
    }

    // Check if password matches
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    // Ensure email is verified
    if (!user.verified) {
      return res.status(400).send({ message: "Please verify your email first." });
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    // Send cookie + response
    return res
      .status(200)
      .cookie("authToken", token, {
        httpOnly: false,   // (true is more secure in production)
        sameSite: "none",
        secure: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      })
      .send({
        message: "Login successful",
        status: 200,
        token: token,       // Optional: also return token if frontend needs it
        userId: user._id,
      });

  } catch (error) {
    console.error("Error in loginController:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { login: loginController };