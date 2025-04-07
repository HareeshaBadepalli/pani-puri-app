import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./menupage.css";

const menuItems = [
  { id: 1, name: "Dahi Papdi", price: 40, img: "images/dahi_papdi.png",stock:50 },
  { id: 2, name: "Dahi Puri", price: 40, img: "images/Dahi-puri.png",stock:50},
  { id: 3, name: "Pani Puri", price: 15, img: "images/pani-puri.png",stock:100},
  { id: 4, name: "Samosa Chaat", price: 30, img: "images/samosa-chaat.png", stock:30},
  { id: 5, name: "Sev Puri", price: 25, img: "images/sev-puri.png",stock:40 },
  { id: 6, name: "Bhel Puri", price: 35, img: "images/bhel-puri.png",stock:35 },
  { id: 7, name: "Masala Puri", price: 30, img: "images/masala-puri.png",stock:25 },
];

const Menu = ({ cart, setCart }) => {
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [lastName, setLastName] = useState("Guest");

  const navigate = useNavigate();

  useEffect(() => {
    const storedLastName = localStorage.getItem("lastName");
    if (storedLastName) {
      setLastName(storedLastName);
    }
  }, []); 

  const increaseQuantity = (item) => {
    setQuantities((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const decreaseQuantity = (item) => {
    setQuantities((prev) => ({
      ...prev,
      [item.id]: Math.max((prev[item.id] || 0) - 1, 0),
    }));
  };

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
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredItems = menuItems
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1 className="heading">Our Menu</h1>
        <span className="user-info">Welcome, {lastName}</span>
        <button className="view-cart" onClick={() => navigate("/cart")}>View Cart 🛒</button>
      </div>

      <div className="menu-controls">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="menu-items">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="menu-card">
              <img src={`/${item.img}`} alt={item.name} />
              <h3>{highlightText(item.name, searchTerm)}</h3>
              <p>{item.price} Rs</p>

              <div className="cart-controls">
                <button className="decrement" onClick={() => decreaseQuantity(item)}>-</button>
                <span className="quantity">{quantities[item.id] || 0}</span>
                <button className="increment" onClick={() => increaseQuantity(item)}>+</button>
              </div>

              <button className="add-to-cart" onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p className="no-results">No items found</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
