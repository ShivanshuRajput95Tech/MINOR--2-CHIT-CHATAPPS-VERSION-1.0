require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Import internal modules
const connection = require("./db/db.js");
const userRoute = require("./routes/userRoute.js");
const avatarRoute = require("./routes/avatarRoute.js");
const createWebSocketServer = require("./wsServer.js");

// Connect to database
connection();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
  "https://swifty-chatty-appy.onrender.com"
];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// API Routes
app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);

// Server Port
const port = process.env.PORT || 8000;

// Start server
const server = app.listen(port, () =>
  console.log(`Application running on port ${port}`)
);

// Initialize WebSocket Server
createWebSocketServer(server);

// =====================================
// SERVE FRONTEND (Vite / React Build)
// =====================================
app.use(
  express.static(path.join(__dirname, "..", "frontend", "dist"))
);

// Catch-all route for SPA
app.get("/*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "frontend", "dist", "index.html"),
    (err) => {
      if (err) {
        console.error("Error sending file:", err);
      }
    }
  );
});