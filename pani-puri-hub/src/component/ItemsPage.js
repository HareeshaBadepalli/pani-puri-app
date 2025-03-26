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
My Pani Puri has come into existence out of Panipuri Lovers all over the world.
We at My Pani Puri are committed to offering the highest standards and the most uniquely tasting Panipuri that can ever exist.
Maintaining quality is our foremost priority.
Our motive is to be the first in the market to produce fresh and the most hygienic Panipuri.
Your love has already helped us to succeed in creating a successful Pani Puri brand.
We take every step to make our customers happy.
You do not have to find a reason to be happy, just gobble a plate or two of Panipuri with us and instantly cheer yourself up.
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
          <li>😋 Vada Pav</li>
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
