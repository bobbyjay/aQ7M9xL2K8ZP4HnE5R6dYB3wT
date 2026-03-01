import React from 'react';
import { useAuth } from "../context/AuthContext";
import logo from '../assets/clutchdenEmbedded.svg';
import '../styles/hmnav.css';

function HmNav() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  // While auth status is loading, we can return nothing or a placeholder
  if (authLoading) return null;

  // handle register button on clicks
  const handleRegisterClick = () => {
    window.location.href = '/register';
  };

  // handle login button on clicks
  const handleLoginClick = () => {
    if (isAuthenticated) {
      window.location.href = '/bets';
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <div className="hmnav-container">
      {/* Logo */}
      <div className="hmnav-logo">
        <img src={logo} alt="ClutchDen Logo" />
      </div>

      {/* Buttons */}
      <div className="hmnav-actions">
        {!isAuthenticated && (
          <button onClick={handleRegisterClick} className="hmnav-btn hmnav-register">Register</button>
        )}
        <button onClick={handleLoginClick} className="hmnav-btn hmnav-enter">
          {isAuthenticated ? "Enter" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default HmNav;