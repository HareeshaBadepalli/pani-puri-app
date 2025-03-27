import React from "react";
import { useNavigate } from "react-router-dom";
import "./Items.css"; // Make sure this file includes the CSS above

const Items = () => {
  const navigate = useNavigate();

  return (
    <div className="items-container">
      <h1 className="title">Sri Durga Chat Bandar</h1>
      <h2 className="sub-title">Our Special Items</h2>

      {/* Description text placed first */}
      <div className="description">
        <pre>
        At My Pani Puri, we celebrate the love for Panipuri with a commitment to quality, hygiene, and unmatched taste. Our goal is to bring you the freshest and most delightful Panipuri experience. Thanks to your love and support
        </pre>
      </div>

      {/* Items list placed after the description */}
      <div className="items-list-container">
        <ul className="items-list">
          <li>🌶️ Pani Puri (Spicy)</li>
          <li>🌶️ Masala Puri</li>
          <li>🌶️ Sev Puri</li>
          <li>🌶️ Bhel Puri (Spicy)</li>
          <li>🍭 Sweet Lassi</li>
          <li>😋 Dahi Puri</li>
          <li>😋 Samosa</li>
          <li>Dahi paadi</li>
        </ul>
      </div>

      <div className="button-container">
        <button className="navigate-button" onClick={() => navigate("/menu")}>
          Click here to see more info
        </button>
      </div>
    </div>
  );
};

export default Items;
