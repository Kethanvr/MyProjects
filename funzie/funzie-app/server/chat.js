import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Create an instance of the GoogleGenerativeAI API client
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// In-memory chat history storage (this can be replaced with a database)
let chatHistory = [];

// POST endpoint to handle chat requests
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Ensure each item in chatHistory has a 'parts' array and valid 'role'
    const formattedHistory = history.map((entry) => {
      // Ensure we are only using valid roles
      const role = entry.role === "chatbot" ? "model" : entry.role;

      return {
        role: role,
        parts: [{ text: entry.text }],
      };
    });

    // Update chat history with the user's current message
    formattedHistory.push({ role: "user", parts: [{ text: message }] });

    // Start chat with the model and send the message
    const chat = model.startChat({ history: formattedHistory });
    let result = await chat.sendMessageStream(message);
    let chatResponse = "";

    // Stream the response and append it to the chat history
    for await (const chunk of result.stream) {
      chatResponse += chunk.text();
    }

    // Save the model's response in chat history
    formattedHistory.push({ role: "model", parts: [{ text: chatResponse }] });

    // Send the response back to the frontend
    res.json({ reply: chatResponse });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong with the API", details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
