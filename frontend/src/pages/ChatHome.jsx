// ChatHome.jsx
import React, { useEffect, useState } from "react";
import { useProfile } from "../context/profileContext";
import axios from "axios";
import ChatMessages from "../components/Chat/ChatMessages";
import MessageInputForm from "../components/Chat/MessageInputForm";
import Nav from "../components/Chat/Nav";
import OnlineUsersList from "../components/Chat/OnlineUsersList";
import TopBar from "../components/Chat/TopBar";
import { socketUrl } from "../config/apiConfig";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const ChatHome = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { userDetails } = useProfile();
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  // WebSocket connection setup
  const connectToWebSocket = () => {
    const wsLocal = new WebSocket(socketUrl);
    wsLocal.addEventListener("message", handleMessage);
    setWs(wsLocal);
  };

  useEffect(() => {
    connectToWebSocket();

    ws?.addEventListener("close", () => {
      connectToWebSocket();
    });
  }, [userDetails, selectedUserId]);

  // Fetch messages when user changes
  useEffect(() => {
    if (selectedUserId) {
      axios
        .get(`/api/user/messages/${selectedUserId}`)
        .then((res) => setMessages(res.data))
        .catch((err) => console.error("Error fetching messages:", err));
    }
  }, [selectedUserId]);

  // Fetch offline people
  useEffect(() => {
    axios.get("/api/user/people").then((res) => {
      const offlinePeopleArr = res.data
        .filter((p) => p._id !== userDetails?._id)
        .filter((p) => !onlinePeople[p._id]);

      const offlinePeopleMapped = offlinePeopleArr.reduce((acc, p) => {
        acc[p._id] = p;
        return acc;
      }, {});

      setOfflinePeople(offlinePeopleMapped);
    });
  }, [onlinePeople, userDetails]);

  // Real-time messages listener
  useEffect(() => {
    if (!ws) return;

    const handleRealTimeMessage = (event) => {
      const messageData = JSON.parse(event.data);
      if (messageData.text) {
        setMessages((prev) => [...prev, messageData]);
      }
    };

    ws.addEventListener("message", handleRealTimeMessage);

    return () => ws.removeEventListener("message", handleRealTimeMessage);
  }, [ws, selectedUserId]);

  // Show online users
  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId, username, avatarLink }) => {
      if (userId !== userDetails?._id) {
        people[userId] = { username, avatarLink };
      }
    });
    setOnlinePeople(people);
  };

  // Handle WS messages (online list OR chat message)
  const handleMessage = (ev) => {
    const messageData = JSON.parse(ev.data);

    if (messageData.online) {
      showOnlinePeople(messageData.online);
    } else if (messageData.text && messageData.sender === selectedUserId) {
      setMessages((prev) => [...prev, messageData]);
    }
  };

  // Send message
  const sendMessage = (ev) => {
    ev?.preventDefault();

    ws.send(
      JSON.stringify({
        text: newMessage,
        recipient: selectedUserId,
      })
    );

    setMessages((prev) => [
      ...prev,
      {
        text: newMessage,
        sender: userDetails._id,
        recipient: selectedUserId,
        _id: Date.now(),
      },
    ]);

    setNewMessage("");
  };

  // Auth protection
  useEffect(() => {
    checkAuth();
    if (!isAuthenticated) navigate("/");
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Nav />

      <OnlineUsersList
        onlinePeople={onlinePeople}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        offlinePeople={offlinePeople}
      />

      <section className="w-[71%] lg:w-[62%] relative pb-10">
        {selectedUserId && (
          <TopBar
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            offlinePeople={offlinePeople}
            onlinePeople={onlinePeople}
          />
        )}

        <ChatMessages
          messages={messages}
          userDetails={userDetails}
          selectedUserId={selectedUserId}
        />

        <div className="absolute w-full bottom-0 flex justify-center">
          <MessageInputForm
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            selectedUserId={selectedUserId}
          />
        </div>
      </section>
    </div>
  );
};

export default ChatHome;