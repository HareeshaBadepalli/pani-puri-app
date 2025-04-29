import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  // Automatically sync cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const totalCost = Object.values(cart).reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const incrementQuantity = (item) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item.id]: {
        ...prevCart[item.id],
        quantity: prevCart[item.id].quantity + 1,
      },
    }));
  };

  const decrementQuantity = (item) => {
    setCart((prevCart) => {
      if (prevCart[item.id].quantity === 1) {
        const updatedCart = { ...prevCart };
        delete updatedCart[item.id];
        return updatedCart;
      }
      return {
        ...prevCart,
        [item.id]: {
          ...prevCart[item.id],
          quantity: prevCart[item.id].quantity - 1,
        },
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
<img src={`/images/${item.imagePath}`} alt={item.name} className="item-image" />

              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>{item.price} Rs</p>
                <div className="cart-controls">
                  <button className="decrement" onClick={() => decrementQuantity(item)}>
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="increment" onClick={() => incrementQuantity(item)}>
                    +
                  </button>
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
      <button
        className="pay-button"
        onClick={() => {
          localStorage.setItem("cart", JSON.stringify(cart));
          navigate("/payment");
        }}
      >
        Click to Pay
      </button>
      <button className="back-button" onClick={() => navigate("/menu")}>
        Back to Menu
      </button>
    </div>
  );
};

export default Cart;