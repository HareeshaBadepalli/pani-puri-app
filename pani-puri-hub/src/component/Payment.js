import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./payment.css";

const Payment = () => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiMethod, setUpiMethod] = useState("");
  const [cartItems, setCartItems] = useState([]); 
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    console.log("Stored Cart Data:", storedCart); // Debugging

    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        console.log("Parsed Cart:", parsedCart); // Debugging
        setCartItems(parsedCart);
        const total = parsedCart.reduce((sum, item) => sum + item.quantity * item.price, 0);
        setTotalPrice(total);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, []);

  // Handle payment
  const handlePayment = async () => {
    if (!address.trim()) {
      setMessage("⚠️ Please enter your delivery address!");
      return;
    }

    if (!paymentMethod) {
      setMessage("⚠️ Please select a payment method!");
      return;
    }

    if (paymentMethod === "Pay by UPI" && !upiMethod) {
      setMessage("⚠️ Please select a UPI method!");
      return;
    }

    if (cartItems.length === 0) {
      setMessage("⚠️ Your cart is empty! Add items before proceeding.");
      return;
    }

    const orderData = {
      address,
      paymentMethod: paymentMethod === "Pay by UPI" ? upiMethod : paymentMethod,
      totalPrice,
      items: cartItems, 
    };

    try {
      const response = await fetch("http://localhost:8090/api/orders/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setMessage(`✅ Order placed successfully! Delivery to: ${address}`);
        localStorage.removeItem("cart");
        navigate("/order-success");
      } else {
        setMessage("❌ Order failed! Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage("❌ Something went wrong! Please try again.");
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment & Delivery Details</h1>

      <textarea 
        placeholder="Enter Address" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
      ></textarea>

      <div className="payment-options">
        <h3>Payment Method</h3>
        <label>
          <input
            type="radio"
            name="payment"
            value="Cash on Delivery"
            onChange={(e) => {
              setPaymentMethod(e.target.value);
              setUpiMethod("");
              setMessage("");
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
              setMessage("");
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
              Google Pay (GPay)
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
            {item.itemName} - {item.quantity} x ₹{item.price}
          </li>
        ))}
      </ul>

      <h3>Total: ₹{totalPrice}</h3>

      <button className="pay-now-button" onClick={handlePayment}>
        Pay Now
      </button>

      <button className="back-button" onClick={() => navigate("/cart")}>
        Back to Cart
      </button>

      {message && <p className="payment-message">{message}</p>}
    </div>
  );
};

export default Payment;
