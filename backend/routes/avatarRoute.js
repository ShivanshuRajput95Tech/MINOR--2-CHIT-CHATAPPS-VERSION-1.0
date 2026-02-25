const express = require("express");
const avatarController = require("../controllers/avatarController");
const router = express.Router();

// Upload a new avatar
router.post("/", avatarController.uploadAvatar);

// Get all avatars
router.get("/all", avatarController.getAllAvatars);

module.exports = router;