const express = require("express");
const router = express.Router();

// Controllers
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const verifyEmailController = require("../controllers/emailVerifyController");
const profileController = require("../controllers/profileController");
const messageController = require("../controllers/messageController");
const peopleController = require("../controllers/peopleController");

// Routes

// Register user
router.post("/register", registerController.register);

// Login user
router.post("/login", loginController.login);

// Verify email
router.get("/:id/verify/:token", verifyEmailController.verify);

// Get profile
router.get("/profile", profileController.profileController);

// Get messages with a user
router.get("/messages/:userId", messageController.getMessages);

// Mark messages from a user as read
router.post("/messages/read/:userId", messageController.markAsRead);

// Get all people/users
router.get("/people", peopleController.getPeople);

// Get single person
router.get("/people/:id", peopleController.getPersonById);

// Update profile
router.put("/profile/update", profileController.profileUpdate);

module.exports = router;