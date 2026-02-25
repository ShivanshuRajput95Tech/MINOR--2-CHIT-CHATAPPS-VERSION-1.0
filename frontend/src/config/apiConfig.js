// apiConfig.js

let baseUrl;
let socketUrl;

// If running in PRODUCTION mode (Render, Vercel, etc.)
if (import.meta.env.VITE_NODE_ENV === "production") {
  baseUrl = "https://your-deployed-backend-url.com";     // <-- replace with real URL
  socketUrl = "wss://your-deployed-backend-url.com";      // <-- replace with real URL
} else {
  // Development mode (local)
  const PORT = 4000;  // Must match your backend .env PORT
  baseUrl = `http://localhost:${PORT}`;
  socketUrl = `ws://localhost:${PORT}`;
}

export { baseUrl, socketUrl };