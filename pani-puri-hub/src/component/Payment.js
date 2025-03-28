import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./payment.css"; // CSS for styling

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiMethod, setUpiMethod] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  const handlePayment = () => {
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

    setMessage(`✅ Order placed successfully! Delivery to: ${address}`);
  };

  return (
    <div className="payment-container">
      <h1>Payment & Delivery Details</h1>

      {/* 🏠 Address Input */}
      <div className="address-section">
        <h3>Enter Delivery Address:</h3>
        <textarea
          placeholder="Enter your full address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
      </div>

      {/* Cash on Delivery Option */}
      <div className="payment-options">
        <h3>Cash on Delivery</h3>
        <label>
          <input
            type="radio"
            name="payment"
            value="Cash on Delivery"
            onChange={(e) => {
              setPaymentMethod(e.target.value);
              setUpiMethod("");
              setMessage(""); // Reset message
            }}
          />
          Cash on Delivery
        </label>
      </div>

      {/* Pay by UPI Options */}
      <div className="payment-options">
        <h3>Pay by UPI</h3>
        <label>
          <input
            type="radio"
            name="payment"
            value="Pay by UPI"
            onChange={(e) => {
              setPaymentMethod(e.target.value);
              setUpiMethod("");
              setMessage(""); // Reset message
            }}
          />
          Pay by UPI
        </label>

        {/* Show UPI options only when Pay by UPI is selected */}
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

      <button className="pay-now-button" onClick={handlePayment}>
        Pay Now
      </button>

      <button className="back-button" onClick={() => navigate("/cart")}>
        Back to Cart
      </button>

      {/* ✅ Success/Error Message Displayed Here */}
      {message && <p className="payment-message">{message}</p>}
    </div>
  );
};

export default Payment;
