require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Internal modules
const connectDB = require("./db/db.js");
const userRoute = require("./routes/userRoute.js");
const avatarRoute = require("./routes/avatarRoute.js");
const createWebSocketServer = require("./wsServer.js");

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
  "https://swifty-chatty-appy.onrender.com"
];

// CORS config
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  })
);

// API routes
app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);

// Start server
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});

// WebSocket server
createWebSocketServer(server);

// =========================
// SERVE FRONTEND (VITE BUILD)
// =========================
const frontendPath = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(frontendPath));

// SPA fallback (Express v5 compatible)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});