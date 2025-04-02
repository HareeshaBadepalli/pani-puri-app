import React from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";  // Styling

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome!</h2>
        <p>Please choose an option:</p>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/signing")}>Sign Up</button>
      </div>
    </div>
  );
};

export default AuthPage;
