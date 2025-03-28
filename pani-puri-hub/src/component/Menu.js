import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./menupage.css";

const menuItems = [
  { id: 1, name: "Dahi Papdi", price: 40, img: "images/dahi_papdi.png" },
  { id: 2, name: "Dahi Puri", price: 40, img: "images/Dahi-puri.png" },
  { id: 3, name: "Pani Puri", price: 15, img: "images/pani-puri.png" },
  { id: 4, name: "Samosa Chaat", price: 30, img: "images/samosa-chaat.png" },
  { id: 5, name: "Sev Puri", price: 25, img: "images/sev-puri.png" },
  { id: 6, name: "Bhel Puri", price: 35, img: "images/bhel-puri.png" },
  { id: 7, name: "Masala Puri", price: 30, img: "images/masala-puri.png" },
];

const Menu = ({ cart, setCart }) => {
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Increase quantity
  const increaseQuantity = (item) => {
    setQuantities((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  // Decrease quantity (min 0)
  const decreaseQuantity = (item) => {
    setQuantities((prev) => ({
      ...prev,
      [item.id]: Math.max((prev[item.id] || 0) - 1, 0),
    }));
  };

  // Add to cart
  const addToCart = (item) => {
    const quantityToAdd = quantities[item.id] || 0;
    if (quantityToAdd > 0) {
      setCart((prevCart) => ({
        ...prevCart,
        [item.id]: {
          ...item,
          quantity: (prevCart[item.id]?.quantity || 0) + quantityToAdd,
        },
      }));
      setMessage(`${item.name} added to cart!`);
      setTimeout(() => setMessage(""), 10000);
    }
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1 className="heading">Our Menu</h1>
        <button className="view-cart" onClick={() => navigate("/cart")}>
          View Cart 🛒
        </button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="menu-items">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-card">
            <img src={`/${item.img}`} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price} Rs</p>

            <div className="cart-controls">
              <button className="decrement" onClick={() => decreaseQuantity(item)}>-</button>
              <span className="quantity">{quantities[item.id] || 0}</span>
              <button className="increment" onClick={() => increaseQuantity(item)}>+</button>
            </div>

            <button className="add-to-cart" onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
