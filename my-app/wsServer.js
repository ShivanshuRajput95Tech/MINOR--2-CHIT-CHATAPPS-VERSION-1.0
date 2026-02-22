const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
const Message = require("./models/messageModel");
const { User } = require("./models/userModel");

function createWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  // Notify all users about online people
  async function notifyAboutOnlinePeople() {
    const onlineUsers = await Promise.all(
      [...wss.clients].map(async (client) => {
        if (!client.userId) return null;

        const user = await User.findById(client.userId);
        return {
          userId: client.userId,
          username: client.username,
          avatarLink: user?.avatarLink || null,
        };
      })
    );

    const filteredUsers = onlineUsers.filter(Boolean);

    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          online: filteredUsers,
        })
      );
    });
  }

  wss.on("connection", (connection, req) => {
    // Heartbeat / keep-alive system
    connection.isAlive = true;

    connection.timer = setInterval(() => {
      connection.ping();
      connection.deathTimer = setTimeout(() => {
        connection.isAlive = false;
        clearInterval(connection.timer);
        connection.terminate();
        notifyAboutOnlinePeople();
        console.log("A connection died.");
      }, 1000);
    }, 5000);

    connection.on("pong", () => {
      clearTimeout(connection.deathTimer);
    });

    // Extract JWT from cookies
    const cookies = req.headers.cookie;
    if (cookies) {
      const tokenString = cookies
        .split(";")
        .find((c) => c.trim().startsWith("authToken="));

      if (tokenString) {
        const token = tokenString.split("=")[1];

        jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
          if (err) {
            console.log("JWT Error:", err);
            return;
          }

          connection.userId = userData._id;
          connection.username = `${userData.firstName} ${userData.lastName}`;
          notifyAboutOnlinePeople();
        });
      }
    }

    // Handle incoming messages
    connection.on("message", async (msg) => {
      try {
        const data = JSON.parse(msg.toString());
        const { recipient, text } = data;

        if (!recipient || !text || !connection.userId) return;

        // Save message to database
        const messageDoc = await Message.create({
          sender: connection.userId,
          recipient,
          text,
        });

        // Deliver message to recipient
        [...wss.clients].forEach((client) => {
          if (client.userId === recipient) {
            client.send(
              JSON.stringify({
                sender: connection.username,
                text,
                id: messageDoc._id,
              })
            );
          }
        });
      } catch (error) {
        console.error("Message error:", error);
      }
    });

    // On connect: send online users
    notifyAboutOnlinePeople();
  });

  return wss;
}

module.exports = createWebSocketServer;