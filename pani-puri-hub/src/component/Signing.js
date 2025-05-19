import React, { useState } from "react";
import api from "../api/apiService";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signing = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await api.signup(user);
      alert(response.data);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("User already exists! Try logging in.");
      } else {
        alert("Signup failed. Please try again.");
      }
    }
  };

  // 🔙 Back to Login button click handler
  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={user.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={user.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={user.mobileNumber}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>

        {/* 🔙 Back to Login Button */}
        <button onClick={handleBackToLogin} className="back-login-button">
          🔙 Back to Login
        </button>
      </div>
    </div>
  );
};

export default Signing;
