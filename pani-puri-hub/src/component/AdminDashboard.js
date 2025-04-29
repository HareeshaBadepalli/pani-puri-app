import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Still used for button styles and layout
import { useHistory } from 'react-router-dom'; // Import to navigate programmatically

function AdminDashboard() {
  const navigate = useNavigate();

  const goToAddItem = () => {
    navigate('/add-item');
  };

  const goToOrderHistory = () => {
    navigate('/order-history');
  };

  const goBackToHome = () => {
    navigate('/home'); // Adjust this route if your home page is different
  };

  const goToReviewsPage = () => {
    navigate('/reviews'); // Navigate to the reviews page
  };

  return (
    <div
      className="admin-dashboard-bg"
      style={{
        backgroundImage: "url('/images/home_page.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <button
        onClick={goBackToHome}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 16px',
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        ⬅ Back
      </button>

      <div className="admin-dashboard-box">
        <h2>Welcome Admin</h2>
        <div className="admin-buttons">
          <button onClick={goToAddItem} className="admin-btn">Add Menu Item</button>
          <button onClick={goToOrderHistory} className="admin-btn">Order History</button>
          <button onClick={goToReviewsPage} className="admin-btn">View Reviews</button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
