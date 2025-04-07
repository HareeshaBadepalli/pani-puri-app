import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ setIsAuthenticated }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:8092/api/users/login", loginData);

      if (response.data && response.data.message === "Login successful!") {
        alert("Login successful!");

        // Store values in localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("lastName", response.data.lastName);

        setIsAuthenticated(true);
        navigate("/home");
      } else {
        alert("Invalid email or password!");
      }
    } catch (error) {
      alert("Invalid email or password!");
      console.error("Login failed:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
