import React, { useState } from 'react';
import axios from 'axios';
import './OrderHistory.css';

const OrderHistory = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [orders, setOrders] = useState([]);
  
  const fetchOrders = async () => {
    if (!selectedDate) return;  // Don't fetch if no date is selected

    try {
      // Make sure the selectedDate is correctly passed as a query param
      const response = await axios.get(`http://localhost:8093/api/orders/orders/by-date`, {
        params: { date: selectedDate },  // Passing the date in YYYY-MM-DD format
      });

      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        setOrders([]);  // Reset to empty if no data is returned
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);  // Reset on error
    }
  };

  return (
    <div className="order-history-container">
      <h2>Order History by Date</h2>

      <div className="date-picker">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}  // Update selectedDate state on change
        />
        <button onClick={fetchOrders}>Fetch Orders</button>
      </div>

      {orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Payment Method</th>
              <th>Total Price</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.customerName}</td>
                <td>{order.address}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.totalPrice}</td>
                <td>
                  <ul>
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.itemName} (Qty: {item.quantity}) - ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        selectedDate && <p>No orders found for this date.</p>  // Handle case when no orders are found
      )}
    </div>
  );
};

export default OrderHistory;
