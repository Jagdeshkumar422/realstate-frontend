import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../../Socket";
import { jwtDecode } from "jwt-decode"; // Corrected import
import "./message.css";
import { token } from "../../../Hooks/UserHooks";

const Message = () => {
  const [rooms, setRooms] = useState([]); // Chat rooms list
  const [activeRoom, setActiveRoom] = useState(null); // Currently active room
  const [sellerId, setSellerId] = useState(null); // Logged-in seller's ID
  const [usersMap, setUsersMap] = useState({}); // Map of userId to userName
  const [messages, setMessages] = useState([]); // Messages for the active chat
  const [newMessage, setNewMessage] = useState(""); // New message input
  const [username, setUsername] = useState([]); // Store usernames
  const [selectedUser, setSelectedUser] = useState(null); // Store selected chat user

  // Decode token to get seller ID
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setSellerId(decodedToken?.userId || decodedToken?.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  // Fetch chat rooms and user details
  useEffect(() => {
    if (sellerId) {
      axios
        .get(`http://localhost:5000/api/chats?receiverId=${sellerId}`)
        .then((res) => {
          const relevantRooms = res.data.filter(
            (room) => room.senderId === sellerId || room.receiverId === sellerId
          );

          const uniqueRoomsMap = new Map();
          relevantRooms.forEach((room) => {
            uniqueRoomsMap.set(room.roomId, room);
          });

          const uniqueRooms = Array.from(uniqueRoomsMap.values());
          setRooms(uniqueRooms);

          // Extract unique user IDs
          const userIds = new Set(
            uniqueRooms.flatMap((room) => [room.senderId, room.receiverId])
          );

          if (userIds.size > 0) {
            return axios.post(`http://localhost:5000/api/users/bulk`, {
              ids: Array.from(userIds),
            });
          }

          return { data: [] };
        })
        .then((userRes) => {
          setUsername(userRes.data);
          const userMap = userRes.data.reduce((map, user) => {
            map[user._id] = user.name; // Ensure correct mapping
            return map;
          }, {});
          setUsersMap(userMap);
        })
        .catch((error) => {
          console.error("Error fetching chat rooms or user data:", error);
        });
    }
  }, [sellerId]);

  // Fetch messages for the active room
  useEffect(() => {
    if (activeRoom) {
      axios
        .get(`http://localhost:5000/api/messages?roomId=${activeRoom}`)
        .then((res) => setMessages(res.data))
        .catch((error) => console.error("Error fetching messages:", error));
    }
  }, [activeRoom]);

  // Handle selecting a chat room
  const handleSelectRoom = (roomId, userId) => {
    setActiveRoom(roomId);
    setSelectedUser(userId); // Set selected user's ID
  };

  // Send a new message
  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const activeRoomDetails = rooms.find((room) => room.roomId === activeRoom);

    if (!activeRoomDetails) {
      console.error("Active room details not found.");
      return;
    }

    const receiverId =
      activeRoomDetails.senderId === sellerId
        ? activeRoomDetails.receiverId
        : activeRoomDetails.senderId;

    const newMessageData = {
      roomId: activeRoomDetails.roomId,
      senderId: sellerId,
      receiverId,
      message: newMessage,
    };

    try {
      await axios.post("http://localhost:5000/api/chats", newMessageData);
      socket.emit("send_message", newMessageData);

      setMessages((prev) => [...prev, newMessageData]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
    }
  };

  return (
    <div className="chat-system">
      {/* Left Side: Chat List */}
      <div className="chat-list">
        <h3>Your Property Chats</h3>
        {rooms.length === 0 ? (
          <p>No chat users found.</p>
        ) : (
          rooms.map((room) => {
            const chatPartnerId =
              room.senderId === sellerId ? room.receiverId : room.senderId;
            const chatPartnerName = usersMap[chatPartnerId] || "Unknown User";

            return (
              <div
                key={room.roomId}
                className={`chat-item ${activeRoom === room.roomId ? "active" : ""}`}
                onClick={() => handleSelectRoom(room.roomId, chatPartnerId)}
              >
                {chatPartnerName}
              </div>
            );
          })
        )}
      </div>

      {/* Right Side: Active Chat */}
      <div className="chat-window">
        {activeRoom ? (
          <>
            <div className="chat-header">
              <h3>
                Chat with {usersMap[selectedUser] || "Unknown User"}
              </h3>
            </div>
            <div className="chat-messages">
              {messages.length === 0 ? (
                <p>No messages yet. Start the conversation!</p>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.senderId === sellerId ? "sent" : "received"}`}
                  >
                    {msg.message}
                  </div>
                ))
              )}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <p>Select a chat to view messages.</p>
        )}
      </div>
    </div>
  );
};

export default Message;
