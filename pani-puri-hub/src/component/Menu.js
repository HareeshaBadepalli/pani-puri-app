import React, { useState } from "react";
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

const Menu = () => {
  const [cart, setCart] = useState({});
  const [cartVisible, setCartVisible] = useState(false);
  const [message, setMessage] = useState("");

  // Function to handle increment
  const incrementQuantity = (item) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item.id]: prevCart[item.id]
        ? { ...prevCart[item.id], quantity: prevCart[item.id].quantity + 1 }
        : { ...item, quantity: 1 },
    }));
  };

  // Function to handle decrement
  const decrementQuantity = (item) => {
    setCart((prevCart) => {
      if (!prevCart[item.id] || prevCart[item.id].quantity === 1) {
        const updatedCart = { ...prevCart };
        delete updatedCart[item.id]; // Remove item from cart if quantity reaches 0
        return updatedCart;
      }
      return {
        ...prevCart,
        [item.id]: { ...prevCart[item.id], quantity: prevCart[item.id].quantity - 1 },
      };
    });
  };

  // Function to add items to the cart
  const addToCart = (item) => {
    if (!cart[item.id] || cart[item.id].quantity === 0) {
      setMessage(`Please select a quantity for ${item.name} before adding to cart.`);
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    setMessage(`${item.name} added to cart.`);
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="menu-container">
      {/* Header with "Our Menu" and "View Cart" */}
      <div className="menu-header">
        <h1 className="heading">Our Menu</h1>
        <button className="view-cart" onClick={() => setCartVisible(!cartVisible)}>
          {cartVisible ? "Hide Cart" : "View Cart"} 🛒
        </button>
      </div>

      {/* Display message when an item is added */}
      {message && <div className="cart-message">{message}</div>}

      {/* Show cart items when "View Cart" is clicked */}
      {cartVisible && (
        <div className="cart-container">
          <h2>Your Cart</h2>
          {Object.values(cart).length > 0 ? (
            <ul>
              {Object.values(cart).map((item) => (
                <li key={item.id}>
                  {item.name} - {item.quantity} x {item.price} Rs ={" "}
                  {item.quantity * item.price} Rs
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}

      {/* Menu items */}
      <div className="menu-items">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-card">
            <img src={`/${item.img}`} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price} Rs</p>
            <div className="cart-controls">
              <button className="decrement" onClick={() => decrementQuantity(item)}>-</button>
              <span className="quantity">{cart[item.id]?.quantity || 0}</span>
              <button className="increment" onClick={() => incrementQuantity(item)}>+</button>
            </div>
            <button className="add-to-cart" onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
