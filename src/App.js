// src/App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Bgm from './components/bgm.mp4';
import { Link } from 'react-router-dom';

function Home() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Use an environment variable for the backend URL (set this in Vercel), or fallback to "/"
  const backendURL = process.env.REACT_APP_BACKEND_URL || "/";

  const handleExplore = (e) => {
    e.preventDefault(); // Prevent the default link action

    // Retrieve the user profile from localStorage (default to Free if not found)
    const storedProfile = JSON.parse(localStorage.getItem("userProfile")) || { plan: "Free" };

    if (storedProfile.plan === "Free") {
      // Show the custom upgrade modal for free users
      setShowUpgradeModal(true);
    } else {
      // Redirect premium users to the MoodSync backend homepage
      window.location.href = backendURL;
    }
  };

  const handleUpgradeConfirm = () => {
    // Redirect to the pricing page (relative path)
    window.location.href = "/pricing";
  };

  const handleUpgradeCancel = () => {
    setShowUpgradeModal(false);
  };

  return (
    <div className="app-container">
      {/* Video Background */}
      <div className="video-container">
        <video loop autoPlay muted className="video-background">
          <source src={Bgm} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Header with Branding and Navigation */}
      <header className="transparent-header">
        <h1 className="logo">
          <Link to="/profile" style={{ textDecoration: 'none', color: '#f0f8ff' }}>
            MoodSync
          </Link>
        </h1>
        <nav className="nav-links">
          <a className="nav-link" href="/contact">Contact Us</a>
          <a className="nav-link" href="/pricing">Buy Now</a>
          <a className="nav-link logout" href="/login">Logout</a>
        </nav>
      </header>

      {/* Content Section with Glass Effect */}
      <div className="content-container">
        <div className="glass-effect">
          <h1 id="abt">
            Redefine Your Sound Experience.
          </h1>
          <p id="abt2">
            At MoodSync, we harness cutting-edge AI to curate personalized playlists that resonate with your emotions. Our innovative platform analyzes your expressions in real time, delivering a bespoke soundscape designed exclusively for you. Elevate your auditory journey and embrace a new era of music.
          </p>
          <a
            href={backendURL}
            id="abt3"
            className="btn try-btn"
            onClick={handleExplore}
          >
            Explore MoodSync
          </a>
        </div>
      </div>

      {/* Custom Upgrade Modal */}
      {showUpgradeModal && (
        <div className="modal-overlay" onClick={handleUpgradeCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Upgrade Required</h2>
            <p>This feature is available for premium subscribers only. Would you like to upgrade now?</p>
            <div className="modal-buttons">
              <button className="modal-btn upgrade-btn" onClick={handleUpgradeConfirm}>
                Upgrade
              </button>
              <button className="modal-btn cancel-btn" onClick={handleUpgradeCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
