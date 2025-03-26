import React from "react";
import "./menupage.css"; // Ensure you have this file for styling

const menuItems = [
  { id: 1, name: "Dahi Papdi", price: "40 Rs", img: "images/dahi_papdi.png" },
  { id: 2, name: "Dahi Puri", price: "40 Rs", img: "images/Dahi-puri.png" },
  { id: 3, name: "Pani Puri", price: "15 Rs", img: "images/pani-puri.png" },
  { id: 4, name: "Samosa Chaat", price: "30 Rs", img: "images/samosa-chaat.png" },
  { id: 5, name: "Sev Puri", price: "25 Rs", img: "images/sev-puri.png" },
  { id: 6, name: "Bhel Puri", price: "35 Rs", img: "images/bhel-puri.png" },
  { id: 7, name: "Masala Puri", price: "30 Rs", img: "images/masala-puri.png" },
];
const Menu = () => {
    return (
      <div className="menu-container">
        <h1>Our Menu</h1>
        <div className="menu-items">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-card">
              <img src={`/${item.img}`} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default Menu;
