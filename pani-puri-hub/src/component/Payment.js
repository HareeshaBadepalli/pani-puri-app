import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderFeedback from "./OrderFeedback";

import "./payment.css"; // We'll also enhance this CSS slightly below

const Payment = () => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiMethod, setUpiMethod] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]);

  const navigate = useNavigate();
  const storedlastName = localStorage.getItem("lastName");

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const cartObject = JSON.parse(storedCart);
        const cartArray = Object.values(cartObject);
        setCartItems(cartArray);
        const total = cartArray.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0
        );
        setTotalPrice(total);
      } catch (error) {
        console.error("Error parsing cart:", error);
        setCartItems([]);
        setTotalPrice(0);
      }
    }
  }, []);

  const handlePayment = async () => {
    if (!address.trim()) {
      setMessage("⚠️ Please enter your address.");
      return;
    }

    if (!paymentMethod) {
      setMessage("⚠️ Please select a payment method.");
      return;
    }

    if (paymentMethod === "Pay by UPI" && !upiMethod) {
      setMessage("⚠️ Please select a UPI method.");
      return;
    }

    if (cartItems.length === 0) {
      setMessage("⚠️ Your cart is empty.");
      return;
    }

    const orderData = {
      customerName: storedlastName,
      address,
      paymentMethod: paymentMethod === "Pay by UPI" ? upiMethod : paymentMethod,
      totalPrice,
      items: cartItems.map((item) => ({
        itemName: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await fetch("http://localhost:8091/api/orders/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setMessage("✅ Order placed successfully!");
        setOrderPlaced(true);
        setOrderedItems(cartItems);
        localStorage.removeItem("cart");
      } else {
        setMessage("❌ Failed to place order. Try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setMessage("❌ Something went wrong.");
    }
  };

  if (orderPlaced) {
    return (
      <div className="payment-container">
        <div className="success-animation">🌸🌸🌸</div>
        <h2>{message}</h2>
        <OrderFeedback orderedItems={orderedItems} />
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <h1>Payment & Delivery</h1>

      <textarea
        placeholder="Enter Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      ></textarea>

      <div className="payment-options">
        <h3>Choose Payment Method</h3>
        <label>
          <input
            type="radio"
            name="payment"
            value="Cash on Delivery"
            onChange={(e) => {
              setPaymentMethod(e.target.value);
              setUpiMethod("");
            }}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="Pay by UPI"
            onChange={(e) => {
              setPaymentMethod(e.target.value);
              setUpiMethod("");
            }}
          />
          Pay by UPI
        </label>

        {paymentMethod === "Pay by UPI" && (
          <div className="upi-options">
            <label>
              <input
                type="radio"
                name="upi"
                value="Google Pay"
                onChange={(e) => setUpiMethod(e.target.value)}
              />
              Google Pay
            </label>
            <label>
              <input
                type="radio"
                name="upi"
                value="PhonePe"
                onChange={(e) => setUpiMethod(e.target.value)}
              />
              PhonePe
            </label>
            <label>
              <input
                type="radio"
                name="upi"
                value="Paytm"
                onChange={(e) => setUpiMethod(e.target.value)}
              />
              Paytm
            </label>
          </div>
        )}
      </div>

      <h3>Order Summary</h3>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity} x ₹{item.price}
          </li>
        ))}
      </ul>

      <h3>Total: ₹{totalPrice}</h3>

      <button onClick={handlePayment}>Pay Now</button>
      <button onClick={() => navigate("/cart")}>Back to Cart</button>

      {message && <p className="payment-message">{message}</p>}
    </div>
  );
};

export default Payment;
