import React from 'react'
import "../styles/Maintenance.css";

function Sports() {
  return (
    <div className="maintenance-container">
      <div className="maintenance-card">
        <div className="maintenance-icon">🛠️</div>

        <h1 className="maintenance-title">
          Page Under Maintenance
        </h1>

        <p className="maintenance-text">
          This page is currently undergoing scheduled maintenance.
          We’ll be back shortly. Thank you for your patience.
        </p>

        <p className="maintenance-subtext">
          Please check back again soon.
        </p>
      </div>
    </div>
  )
}

export default Sports;
