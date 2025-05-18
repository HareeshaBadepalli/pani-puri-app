import React, { useState, useEffect } from 'react';
import api from '../api/apiService';
import './OrderHistory.css';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('');

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await api.getOrders();
      setOrders(response.data);
      setSearchTerm('');
      clearFilters();
    } catch (error) {
      console.error('Error fetching all orders:', error);
    }
  };

  const clearFilters = () => {
    setFilterDate('');
    setMinPrice('');
    setMaxPrice('');
    setFilterPaymentMethod('');
  };

  const navigate = useNavigate();

const goBackToAdmin = () => {
  navigate('/admindashboard'); // Change path if needed
};

  const applyFilters = () => {
    let filtered = [...orders];

    if (filterDate) {
      filtered = filtered.filter(order =>
        new Date(order.orderDate).toLocaleDateString() === new Date(filterDate).toLocaleDateString()
      );
    }

    if (minPrice) {
      filtered = filtered.filter(order => order.totalPrice >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(order => order.totalPrice <= parseFloat(maxPrice));
    }

    if (filterPaymentMethod) {
      filtered = filtered.filter(order =>
        order.paymentMethod.toLowerCase().includes(filterPaymentMethod.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredOrders = applyFilters().filter((order) => {
    const term = searchTerm.toLowerCase();
    return (
      (order.customerName?.toLowerCase() || '').includes(term) ||
      (order.address?.toLowerCase() || '').includes(term) ||
      (order.paymentMethod?.toLowerCase() || '').includes(term)
    );
  });

  return (
  
    <div className="order-history-container">
      <button className="back-button" onClick={goBackToAdmin}>
  ⬅ Back o AdminDashboard
</button>
      <h2>Order History</h2>

      <div className="top-bar">
        <div className="search-bar">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search by customer, address, or payment method..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-sync-alt refresh-icon" title="Refresh" onClick={fetchAllOrders}></i>
          <i className="fas fa-filter filter-icon" title="Filter" onClick={() => setShowFilterModal(true)}></i>
        </div>
      </div>

      {showFilterModal && (
        <div className="filter-modal">
          <div className="modal-content">
            <h3>Filter Orders</h3>
            <div>
            <div className="filter-group">
              <div className="filter-Date">
                <label>Date:</label>
                <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
              </div>
            </div>

            <div className="filter-group1">
              <div className="filter-field">
                <label>Min Price:</label>
                <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
              </div>

              <div className="filter-field">
                <label>Max Price:</label>
                <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
              </div>

              <div className="filter-field">
                <label>Payment Method:</label>
                <input type="text" value={filterPaymentMethod} onChange={(e) => setFilterPaymentMethod(e.target.value)} />
              </div>
            </div>
          </div>
            <div className="modal-buttons">
              <button onClick={() => setShowFilterModal(false)}>Close</button>
              <button onClick={() => setShowFilterModal(false)}>Apply</button>
            </div>
          </div>
        </div>
      )}

      {filteredOrders.length > 0 ? (
        <div className="scroll-box">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Address</th>
                <th>Payment Method</th>
                <th>Total Price</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{order.customerName}</td>
                  <td>{order.address}</td>
                  <td>{order.paymentMethod}</td>
                  <td>₹{order.totalPrice}</td>
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
        </div>
      ) : (
        <p>No matching orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
