const mongoose = require("mongoose");

/**
 * Connect to MongoDB using MONGO_URI or DB environment variable.
 * Exits the process if no connection string is provided.
 */
module.exports = async function connectDB() {
  const uri = process.env.MONGO_URI || process.env.DB;

  if (!uri) {
    console.error("❌ MONGO_URI (or DB) is not set in .env");
    process.exit(1);
  }

  try {
    // No options needed in Mongoose v7+
    await mongoose.connect(uri);

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};