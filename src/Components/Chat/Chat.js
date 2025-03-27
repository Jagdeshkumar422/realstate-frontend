// // src/Components/Chat.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import socket from "../../Socket";
// import { useLocation } from "react-router-dom";

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const location = useLocation();
//   const { roomId, userId, receiverId } = location.state || {};


//   useEffect(() => {
//     // Join chat room
//     socket.emit("join_room", roomId);

//     // Load existing messages
//     axios.get(`http://localhost:5000/api/chats/${roomId}`).then((res) => setMessages(res.data));

//     // Receive new messages
//     socket.on("receive_message", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, [roomId]);

//   const sendMessage = async () => {
//     if (message.trim() === "") return;

//     const newMessage = {
//       roomId,
//       senderId: userId,
//       receiverId,
//       message,
//     };

//     // Save message to database
//     await axios.post("http://localhost:5000/api/chats", newMessage);

//     // Emit message to other users in the room
//     socket.emit("send_message", newMessage);
//     setMessages((prev) => [...prev, newMessage]);
//     setMessage("");
//   };

//   return (
//     <div>
//       <p>room id: {roomId}</p>
//       <p>user id: {userId}</p>
//       <p>receiverId: {receiverId}</p>
//       <div style={{ height: "400px", overflowY: "scroll" }}>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <b>{msg.senderId === userId ? "You" : "Other"}:</b> {msg.message}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();
  const { roomId, userId } = location.state;

  useEffect(() => {
    // Fetch messages for the room
    axios
      .get(`http://localhost:5000/api/messages?roomId=${roomId}`)
      .then((res) => setMessages(res.data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, [roomId]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const messageData = { roomId, senderId: userId, message: newMessage };
    try {
      await axios.post("http://localhost:5000/api/messages", messageData);
      setMessages((prev) => [...prev, messageData]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.senderId === userId ? "sent" : "received"}`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
