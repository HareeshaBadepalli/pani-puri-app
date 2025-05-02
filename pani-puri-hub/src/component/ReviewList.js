import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ← here
import "./ReviewList.css";
import api from '../api/apiService';

const ReviewList = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [filterType, setFilterType] = useState("customer_name");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [reviewsRes, menuItemsRes] = await Promise.all([
          api.getAllFeedback(), // Fetch reviews
          api.getMenuItems(),    // Fetch menu items
        ]);
  
        if (reviewsRes.status === 200 && menuItemsRes.status === 200) {
          console.log("Reviews Data: ", reviewsRes.data);
          console.log("Menu Items Data: ", menuItemsRes.data);
          setReviews(reviewsRes.data);    // Set reviews data
          setMenuItems(menuItemsRes.data); // Set menu items data
        } else {
          console.error("API response status is not OK");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []); // Run this effect only once when component mounts
  

  const getImagePathForItem = (itemName) => {
    const menuItem = menuItems.find((item) => item.name === itemName);
    return menuItem ? menuItem.imagePath : null;
  };

  // 🔍 Filtered reviews
  const filteredReviews = reviews.filter((review) => {
    if (filterType === "customer_name") {
      return review.customer_name?.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterType === "itemName") {
      return review.itemName?.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <div className="review-list-container">
      <button className="back-button" onClick={() => navigate("/admindashboard")}>
        ← Back to Dashboard
      </button>

      <h2>Item Reviews</h2>

      {/* 🔽 Filter Controls */}
      <div className="filter-controls">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="customer_name">Filter by Customer Name</option>
          <option value="itemName">Filter by Item Name</option>
        </select>
        <input
          type="text"
          placeholder={`Search ${filterType.replace("_", " ")}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="scroll-box">
        <table className="review-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Image</th>
              <th>Review Rating</th>
              <th>Customer Name</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-reviews">
                  No matching reviews found
                </td>
              </tr>
            ) : (
              filteredReviews.map((review, index) => {
                const imagePath = getImagePathForItem(review.itemName);
                return (
                  <tr key={index}>
                    <td>{review.itemName}</td>
                    <td>
                      {imagePath ? (
                        <img
                        src={api.getImageUrl(imagePath)} // Use the getImageUrl from API service
                        alt={review.itemName}
                          className="review-image"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>
                      {review.rating
                        ? "★".repeat(review.rating) + "☆".repeat(5 - review.rating)
                        : "No rating"}
                    </td>
                    <td>{review.customer_name || "N/A"}</td>
                    <td>{review.comment || "N/A"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewList;
