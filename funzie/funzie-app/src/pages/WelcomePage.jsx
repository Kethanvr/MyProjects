// src/pages/WelcomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../styles/global.css'; // Importing global styles
import '../styles/welcomepage.css'; // Importing page-specific styles

const WelcomePage = () => {
  const navigate = useNavigate(); // Hook to navigate to the chat page

  const handleRedirectToChat = () => {
    navigate('/chat'); // Redirect to the chat page when clicked
  };

  return (
    <div>
      {/* Header - Navbar */}
      <header className="d-flex justify-content-between align-items-center p-4">
        <div className="logo">
          <h2>Funzie</h2>
        </div>
        <nav>
          <ul className="d-flex list-unstyled gap-4">
            <li>
              <button id='1' className="text-dark text-decoration-none bo" onClick={handleRedirectToChat}>
                Home
              </button>
            </li>
            <li><a href="#" className="text-dark text-decoration-none">Menu</a></li>
            <li><a href="#" className="text-dark text-decoration-none">About Us</a></li>
            <li><a href="#" className="text-dark text-decoration-none">Contact Us</a></li>
          </ul>
        </nav>
        <div>
          <button className="btn btn-outline-dark">Login</button>
          <button className="btn btn-dark">Sign Up</button>
        </div>
      </header>

      {/* Main Section - Updated Content */}
      <main className="container mt-5">
        <div className="row align-items-center">
          {/* Text Content */}
          <div className="col-md-6">
            <h1>
              Let's Have Fun Learning! <span style={{ color: '#FF4081' }}>With Funzie!</span>
            </h1>
            <p className="text-muted">
              Join Funzie for exciting stories, games, and learning activities. Explore new adventures and discover fun facts, all while learning with your new friend, Funzie!
            </p>
            <div className="d-flex align-items-center mt-4">
              <button className="btn btn-dark ms-2" onClick={handleRedirectToChat}>
                Start Exploring
              </button>
            </div>
          </div>

          {/* Image Content */}
          <div className="col-md-6 text-center">
            <img 
              src="https://images.aiscribbles.com/74e2933d287e4878adba5c7d222cfe14.png?v=ff8569" 
              alt="Funzie Character"
              className="img-fluid rounded-circle shadow-lg"
              style={{ width: '80%' }}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center mt-5 py-4 bg-dark text-white">
        <p>&copy; 2024 Funzie. All Rights Reserved.</p>
      </footer>

      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default WelcomePage;
