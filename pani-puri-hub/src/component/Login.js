import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Ensure this file is in the correct location

const Login = ({ setIsAuthenticated }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8090/api/users/login", loginData);
      alert("Login successful!");

      localStorage.setItem("isAuthenticated", "true"); // Save login status
      setIsAuthenticated(true);
      navigate("/home"); // Redirect to main content
    } catch (error) {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="login-container"> {/* Background styling */}
      <div className="login-box"> {/* Centered form box */}
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
