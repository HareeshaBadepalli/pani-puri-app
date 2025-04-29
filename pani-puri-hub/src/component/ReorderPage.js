import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ReorderPage.css";

const ReorderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const customerName = localStorage.getItem("lastName");
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  useEffect(() => {
    if (customerName) {
      setLoading(true);
      setError(null);

      const fetchOrders = axios.get(`http://localhost:8090/api/orders/by-customer-name?name=${customerName}`);
      const fetchMenuItems = axios.get("http://localhost:8090/api/menu");

      Promise.all([fetchOrders, fetchMenuItems])
        .then(([ordersRes, menuItemsRes]) => {
          setOrders(ordersRes.data);
          setMenuItems(menuItemsRes.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching orders or menu items:", err);
          setError("Failed to load data.");
          setLoading(false);
        });
    }
  }, [customerName]);

  const getImageForItem = (itemName) => {
    const item = menuItems.find(m => m.name.trim().toLowerCase() === itemName.trim().toLowerCase());
    return item?.imagePath || "default.jpg";
  };

  const handleReorder = (order) => {
    const cartItemsArray = order.items?.map((item) => ({
      name: item.itemName,
      price: item.price,
      quantity: item.quantity,
      imagePath: getImageForItem(item.itemName), // also include image if needed
    }));
  
    // Convert array to object with item.id as keys
    const cartItemsObj = {};
    cartItemsArray.forEach((item) => {
      cartItemsObj[item.name] = item;
    });
  
    // Save the correct format in localStorage
    localStorage.setItem("cart", JSON.stringify(cartItemsObj));
  
    // Navigate to cart page
    navigate("/cart");
  };
  

  return (
    <div className="reorder-container">
      <h2 className="reorder-title">Your Previous Orders</h2>

      {loading ? (
        <p>Loading previous orders...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : orders.length === 0 ? (
        <p>No previous orders found.</p>
      ) : (
        <table className="reorder-table">
          <thead>
            <tr>
              <th>Order Date</th>
              <th>Address</th>
              <th>Payment Method</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return order.items?.map((item, idx) => (
                <tr key={idx}>
                  {idx === 0 && (
                    <>
                      <td rowSpan={order.items?.length}>{formatDate(order.orderDate)}</td>
                      <td rowSpan={order.items?.length}>{order.address}</td>
                      <td rowSpan={order.items?.length}>{order.paymentMethod}</td>
                    </>
                  )}
                  <td>
                    <img
                      src={`http://localhost:8090/images/${getImageForItem(item.itemName)}`}
                      alt={item.itemName}
                      className="reorder-image"
                    />
                  </td>
                  <td>{item.itemName.trim()}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.price * item.quantity}</td>
                  {idx === 0 && (
                    <td rowSpan={order.items?.length}>
                      <button className="reorder-button" onClick={() => handleReorder(order)}>
                        Reorder
                      </button>
                    </td>
                  )}
                </tr>
              ));
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReorderPage;
