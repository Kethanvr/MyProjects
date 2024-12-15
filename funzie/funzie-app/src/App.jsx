// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import ChatPage from './pages/ChatPage'; // Import ChatPage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/chat" element={<ChatPage />} /> {/* Add route for chat */}
      </Routes>
    </Router>
  );
};

export default App;
