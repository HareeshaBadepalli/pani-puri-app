import React from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css"; // Import the CSS file
const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  // Calculate total cost
  const totalCost = Object.values(cart).reduce((total, item) => total + item.quantity * item.price, 0);

  // Increment quantity
  const incrementQuantity = (item) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item.id]: { ...prevCart[item.id], quantity: prevCart[item.id].quantity + 1 },
    }));
  };

  // Decrement quantity
  const decrementQuantity = (item) => {
    setCart((prevCart) => {
      if (prevCart[item.id].quantity === 1) {
        const updatedCart = { ...prevCart };
        delete updatedCart[item.id];
        return updatedCart;
      }
      return {
        ...prevCart,
        [item.id]: { ...prevCart[item.id], quantity: prevCart[item.id].quantity - 1 },
      };
    });
  };

  return (
    <div className="cart-container">
      <h1>Your Cart 🛒</h1>
      {Object.values(cart).length > 0 ? (
        <div className="cart-items">
          {Object.values(cart).map((item) => (
            <div key={item.id} className="cart-card">
              <img src={`/${item.img}`} alt={item.name} className="cart-img" />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>{item.price} Rs</p>
                <div className="cart-controls">
                  <button className="decrement" onClick={() => decrementQuantity(item)}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="increment" onClick={() => incrementQuantity(item)}>+</button>
                </div>
                <p className="item-total">Total: {item.quantity * item.price} Rs</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <h2 className="total-cost">Total Cost: {totalCost} Rs</h2>
       
      {/* Click to Pay Button */}
      <button className="pay-button" onClick={() => navigate("/payment")}>
        Click to Pay
      </button>
      <button className="back-button" onClick={() => navigate("/menu")}>Back to Menu</button>
    </div>
  );
};

export default Cart;
