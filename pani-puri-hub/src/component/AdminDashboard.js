import React from 'react';
import { useNavigate } from 'react-router-dom';


function AdminDashboard() {
  const navigate = useNavigate();

  const goToAddItem = () => {
    navigate('/add-item');
  };

  const goToOrderHistory = () => {
    navigate('/order-history');  // Navigate to the order history page
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome Admin</h2>
      <button onClick={goToAddItem} className="admin-btn">Add Menu Item</button>

      {/* Future Features */}
      <button onClick={goToOrderHistory} className="admin-btn">Order History</button> {/* Corrected here */}
      <button className="admin-btn">View Feedback</button>
    </div>
  );
}

export default AdminDashboard;
