import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/apiService';
import "./ReorderPage.css";

const ReorderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const customerName = localStorage.getItem("lastName");
  const navigate = useNavigate();

  // Format order date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  useEffect(() => {
    if (customerName) {
      setLoading(true);
      setError(null);

      const fetchOrders = api.getOrdersByCustomerName(customerName);
      const fetchMenuItems = api.getMenuItems();
      
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

  // Get the image path for the item from the menu
  const getImageForItem = (itemName) => {
    const item = menuItems.find(m => m.name.trim().toLowerCase() === itemName.trim().toLowerCase());
    return item?.imagePath || "default.jpg"; // Default image if no match
  };

  // Handle reorder and add items to the cart
  const handleReorder = (order) => {
  if (!order.items || order.items.length === 0) {
    alert("No items found in this order.");
    return;
  }

  const cartItemsObj = {};
  order.items.forEach((item) => {
    const imagePath = getImageForItem(item.itemName) || "default.jpg";
    cartItemsObj[item.itemId] = {
      id: item.itemId,
      name: item.itemName,
      price: item.price,
      quantity: item.quantity,
      imagePath: imagePath ,
    };
  });

  // Store in localStorage
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
                   src={api.getImageUrl(getImageForItem(item.itemName))}
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
