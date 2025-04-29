import React, { useState, useEffect } from "react";
import "./ReviewList.css";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsRes, menuRes] = await Promise.all([
          fetch("http://localhost:8090/api/feedback/all"),
          fetch("http://localhost:8090/api/menu")
        ]);

        if (reviewsRes.ok && menuRes.ok) {
          const reviewsData = await reviewsRes.json();
          const menuData = await menuRes.json();
          setReviews(reviewsData);
          setMenuItems(menuData);
        } else {
          console.error("Failed to fetch reviews or menu items");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Helper to get imagePath based on itemName
  const getImagePathForItem = (itemName) => {
    const menuItem = menuItems.find(item => item.name === itemName);
    return menuItem ? menuItem.imagePath : null;
  };

  return (
    <div className="review-list-container">
      <h2>Item Reviews</h2>
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
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-reviews">
                  No reviews yet
                </td>
              </tr>
            ) : (
              reviews.map((review, index) => {
                const imagePath = getImagePathForItem(review.itemName);
                return (
                  <tr key={index}>
                    <td>{review.itemName}</td>
                    <td>
                      {imagePath ? (
                        <img
                          src={`http://localhost:8090/images/${imagePath}`}
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
