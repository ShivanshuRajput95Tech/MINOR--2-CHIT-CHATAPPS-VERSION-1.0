// ChatHome.jsx
import React, { useEffect, useState } from "react";
import { useProfile } from "../context/profileContext";
import axios from "axios";
import useWebSocket from "../hooks/useWebSocket";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

import ChatLayout from "../components/layout/ChatLayout";
import Sidebar from "../components/chat/Sidebar";
import ChatPane from "../components/chat/ChatPane";
import { toast } from "react-hot-toast";

const ChatHome = () => {
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { userDetails } = useProfile();
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  // Fetch messages when user changes
  useEffect(() => {
    if (selectedUserId) {
      axios
        .get(`/api/user/messages/${selectedUserId}`)
        .then((res) => setMessages(res.data))
        .catch((err) => console.error("Error fetching messages:", err));
    }
  }, [selectedUserId]);

  // When selecting a user, mark their messages as read on the server and update unread locally
  useEffect(() => {
    if (!selectedUserId) return;

    axios
      .post(`/api/user/messages/read/${selectedUserId}`)
      .then((res) => {
        // optimistic local update: set unread to 0 for selected user
        setOnlinePeople((prev) => {
          if (!prev[selectedUserId]) return prev;
          return { ...prev, [selectedUserId]: { ...prev[selectedUserId], unread: 0 } };
        });

        setOfflinePeople((prev) => {
          if (!prev[selectedUserId]) return prev;
          return { ...prev, [selectedUserId]: { ...prev[selectedUserId], unread: 0 } };
        });

        // Re-fetch authoritative people list to avoid edge-cases and refresh lastMessage/unread
        axios
          .get("/api/user/people")
          .then((res) => {
            const online = {};
            const offline = {};
            (res.data || []).forEach((p) => {
              if (p.online) online[p._id] = p;
              else offline[p._id] = p;
            });
            setOnlinePeople(online);
            setOfflinePeople(offline);
          })
          .catch((err) => console.error("Error refreshing people after mark-read:", err));
      })
      .catch((err) => {
        // ignore error — we'll refresh people list when appropriate
        console.error("Error marking messages read:", err);
      });
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

  // WebSocket hook
  const { status, lastMessage, sendMessage: wsSend, subscribe } = useWebSocket();

  // Subscribe to incoming messages via hook
  useEffect(() => {
    const unsub = subscribe((data) => {
      if (!data) return;

      // server sends online list, message objects (type: 'message') and read receipts (type: 'read')
      if (data.online) {
        showOnlinePeople(data.online);
        return;
      }

      if (data.type === "message" || data.text) {
        // ensure sender is an id
        const senderId = data.sender;

        // If message belongs to currently open conversation -> append
        if (senderId === selectedUserId) {
          setMessages((prev) => [...prev, data]);
        } else {
          // Not viewing this conversation: increment unread count and show a toast
          const incrementUnreadFor = async (id) => {
            // if sender not present in lists, refetch people and then increment
            const presentInOnline = !!onlinePeople[id];
            const presentInOffline = !!offlinePeople[id];

            if (!presentInOnline && !presentInOffline) {
              try {
                const res = await axios.get("/api/user/people");
                const online = {};
                const offline = {};
                (res.data || []).forEach((p) => {
                  if (p.online) online[p._id] = p;
                  else offline[p._id] = p;
                });
                setOnlinePeople(online);
                setOfflinePeople(offline);
              } catch (err) {
                console.error("Error fetching people on unknown sender:", err);
              }
            } else {
              setOnlinePeople((prev) => {
                if (!prev[id]) return prev;
                const currentUnread = prev[id].unread || 0;
                return { ...prev, [id]: { ...prev[id], unread: currentUnread + 1 } };
              });

              setOfflinePeople((prev) => {
                if (!prev[id]) return prev;
                const currentUnread = prev[id].unread || 0;
                return { ...prev, [id]: { ...prev[id], unread: currentUnread + 1 } };
              });
            }
          };

          incrementUnreadFor(senderId);

          toast(({ id: tId }) => (
            <div className="flex items-center gap-3">
              <div className="font-medium">New message</div>
              <div className="text-sm text-gray-300">{data.text}</div>
            </div>
          ));
        }

        return;
      }

      if (data.type === "read") {
        // server informs that 'by' user has read messages in conversation with current user
        const readerId = data.by;

        // If current user is the sender (we received this), and the reader is the open conversation partner, mark own messages as read
        if (selectedUserId && selectedUserId === readerId) {
          setMessages((prev) => prev.map((m) => {
            if (m.sender === userDetails._id && m.recipient === readerId) {
              return { ...m, read: true };
            }
            return m;
          }));
        }

        // Also, refresh people list to update unread badges
        axios.get('/api/user/people').then((res) => {
          const online = {};
          const offline = {};
          (res.data || []).forEach((p) => {
            if (p.online) online[p._id] = p;
            else offline[p._id] = p;
          });
          setOnlinePeople(online);
          setOfflinePeople(offline);
        }).catch(err => console.error('Error refreshing people after read receipt', err));
      }
    });

    return () => unsub();
  }, [subscribe, selectedUserId]);

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

  // Send message (via ws hook)
  const sendMessage = (ev) => {
    ev?.preventDefault();
    if (!selectedUserId || !newMessage?.trim()) return;

    wsSend({ text: newMessage, recipient: selectedUserId });

    // optimistic update
    setMessages((prev) => [
      ...prev,
      {
        text: newMessage,
        sender: userDetails._id,
        recipient: selectedUserId,
        _id: Date.now(),
        createdAt: Date.now(),
      },
    ]);

    setNewMessage("");
  };

  // Auth protection
  useEffect(() => {
    checkAuth();
    if (!isAuthenticated) navigate("/");
  }, []);

  const selectedUser = onlinePeople[selectedUserId] || offlinePeople[selectedUserId] || null;

  return (
    <ChatLayout
      sidebar={
        <Sidebar
          onlinePeople={onlinePeople}
          offlinePeople={offlinePeople}
          onSelect={setSelectedUserId}
          selectedUserId={selectedUserId}
        />
      }
    >
      <section className="relative pb-6">
        <ChatPane
          selectedUser={selectedUser}
          messages={messages}
          userDetails={userDetails}
          onSend={sendMessage}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      </section>
    </ChatLayout>
  );
};

export default ChatHome;