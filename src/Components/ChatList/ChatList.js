import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../Socket";
import { token } from "../../Hooks/UserHooks";
import {jwtDecode} from "jwt-decode"; // Corrected import
import "./ChatList.css";
import { useLocation } from "react-router-dom";

const ChatList = () => {
  const [rooms, setRooms] = useState([]); // Chat rooms list
  const [activeRoom, setActiveRoom] = useState(null); // Currently active room
  const [user_Id, setUser_Id] = useState(null); // Logged-in user's ID
  const [usersMap, setUsersMap] = useState({}); // Map of userId to userName
  const [messages, setMessages] = useState([]); // Messages for the active chat
  const [newMessage, setNewMessage] = useState(""); // New message input
  const [username, setUsername] = useState([]); // List of all users
 
  const location = useLocation();
  const { roomId, userId, receiverId } = location.state || {};

  // Decode token to get user ID
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser_Id(decodedToken?.userId || decodedToken?.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Fetch chat rooms and user names
  useEffect(() => {
    if (user_Id) {
      axios
        .get(`http://localhost:5000/api/chats?userId=${user_Id}`)
        .then((res) => {
          // Filter chat rooms where the logged-in user is either sender or receiver
          const userChats = res.data.filter(
            (room) => room.senderId === user_Id || room.receiverId === user_Id
          );
  
          setRooms(userChats);
  
          // Collect unique user IDs involved in the chats, excluding the logged-in user
          const otherUserIds = Array.from(
            new Set(
              userChats.map((room) =>
                room.senderId === user_Id ? room.receiverId : room.senderId
              )
            )
          );
  
          // Fetch the names of the other users
          return axios.post(`http://localhost:5000/api/users/bulk`, {
            ids: otherUserIds,
          });
        })
        .then((userRes) => {
          setUsername(userRes.data); // Users involved in chats
          const userMap = userRes.data.reduce((map, user) => {
            map[user._id] = user.name || "Unknown User";
            return map;
          }, {});
          setUsersMap(userMap);
        })
        .catch((error) => {
          console.error("Error fetching chat rooms or user data:", error);
        });
    }
  }, [user_Id]);
  
  

  // Automatically set active room based on location.state or rooms
  useEffect(() => {
    if (roomId) {
      setActiveRoom(roomId);
    } else if (rooms.length > 0) {
      setActiveRoom(rooms[0].roomId); // Default to the first room
    }
  }, [roomId, rooms]);

  // Fetch messages for the active room
  useEffect(() => {
    if (activeRoom) {
      axios
        .get(`http://localhost:5000/api/messages?roomId=${activeRoom}`)
        .then((res) => setMessages(res.data))
        .catch((error) => console.error("Error fetching messages:", error));
    }
  }, [activeRoom]);

  // Send a new message
  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const newMessageData = {
      roomId: activeRoom,
      senderId: user_Id,
      receiverId,
      message: newMessage,
    };

    await axios.post("http://localhost:5000/api/chats", newMessageData);
    socket.emit("send_message", newMessageData);
    setMessages((prev) => [...prev, newMessageData]);
    setNewMessage("");
  };
  console.log(user_Id)

  return (
    <div className="chat-system">
      {/* Chat List */}
      <div className="chat-list">
        <h3>Chats</h3>
        {username.length === 0 ? (
          <p>No chat users found.</p>
        ) : (
          username.map((user) => (
            <div
              key={user._id}
              className={`chat-item ${
                rooms.find((room) => room.roomId === activeRoom)?.receiverId === user._id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveRoom(
                  rooms.find((room) => room.receiverId === user._id)?.roomId || null
                )
              }
            >
              {user.name || "Unknown User"}
            </div>
          ))
        )}
      </div>

      {/* Active Chat */}
      <div className="chat-window">
  {activeRoom ? (
    <>
      <div className="chat-header">
        <h3>
          Chat with{" "}
          {rooms.find((room) => room.roomId === activeRoom)?.senderId === user_Id
            ? // If the sender of the active room is the logged-in user, show the receiver's name
              usersMap[
                rooms.find((room) => room.roomId === activeRoom)?.receiverId
              ] || "Unknown User"
            : // Otherwise, show the sender's name
              usersMap[
                rooms.find((room) => room.roomId === activeRoom)?.senderId
              ] || "Unknown User"}
        </h3>
      </div>
      <div className="chat-messages">
        {messages.length === 0 ? (
          <p>No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.senderId === user_Id ? "sent" : "received"
              }`}
            >
              {msg.message}
            </div>
          ))
        )}
      </div>
    </>
  ) : (
    <p>No chats available. Start a new conversation!</p>
  )}

  {/* Chat Input Box */}
  <div className="chat-input">
    <input
      type="text"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      placeholder="Type a message..."
    />
    <button onClick={sendMessage}>Send</button>
  </div>
</div>

    </div>
  );
};

export default ChatList;
