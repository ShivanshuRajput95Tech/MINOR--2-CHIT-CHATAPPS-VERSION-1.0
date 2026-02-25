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

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));

// ROUTES
app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);

// SERVER
const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

// WEBSOCKETS
createWebSocketServer(server);

// Serve frontend (Vite build)
const distPath = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(distPath));

// Express 5 compatible catch-all
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});