// src/pages/ChatPage.jsx
import React, { useState } from "react";
import "../styles/chatpage.css";
import axios from "axios";  // To make API requests

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  // Send user message to the server
  const handleSendMessage = async () => {
    if (userInput.trim() !== "") {
      // Add user message to chat history
      setMessages([...messages, { sender: "user", text: userInput }]);
      setUserInput("");

      try {
        // Make API request to backend (ensure the URL is correct)
        const response = await axios.post("http://localhost:5000/api/chat", {
          message: userInput,
          history: messages.map((msg) => ({
            role: msg.sender,
            text: msg.text,
          })),
        });

        // Add the chatbot's response to the chat history
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "chatbot", text: response.data.reply },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "chatbot", text: "Error with the chatbot API" },
        ]);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Funzie Chat</h2>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "user-message" : "chatbot-message"}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask me anything!"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
