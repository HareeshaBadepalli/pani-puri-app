import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./OrderFeedback.css";

const OrderFeedback = ({ orderedItems }) => {
  const [customerName, setCustomerName] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch customer name and initialize feedbacks
  useEffect(() => {
    const storedName = localStorage.getItem("lastName") || "";
    setCustomerName(storedName);

    const initialFeedbacks = orderedItems.map((item) => ({
      itemName: item.name || item.itemName,
      imagePath: item.imagePath,
      rating: 0,
      comment: "",
      customer_name: storedName, // now it's guaranteed to be updated
    }));

    setFeedbacks(initialFeedbacks);
  }, [orderedItems]);

  const handleFeedbackChange = (index, field, value) => {
    const updated = [...feedbacks];
    updated[index][field] = value;
    setFeedbacks(updated);
  };

  const handleStarClick = (index, star) => {
    handleFeedbackChange(index, "rating", star);
  };

  const handleSubmit = async () => {
    try {
      for (const fb of feedbacks) {
        const response = await fetch("http://localhost:8090/api/feedback/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fb),
        });

        if (!response.ok) {
          throw new Error(`Failed to submit feedback for ${fb.itemName}`);
        }
      }

      setMessage("✅ Thank you for your feedback!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage("❌ Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="feedback-container">
      <h2>We'd love your feedback{customerName && `, ${customerName}`}!</h2>
      {feedbacks.map((fb, index) => (
        <div className="feedback-card" key={index}>
          <h4>{fb.itemName}</h4>
          {fb.imagePath && (
            <img
              src={`http://localhost:8090/images/${fb.imagePath}`}
              alt={fb.itemName}
              className="feedback-image"
            />
          )}
          <div className="rating-row">
            <label>Rating:</label>
            <div className="star-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={24}
                  color={i < fb.rating ? "gold" : "#ccc"}
                  onClick={() => handleStarClick(index, i + 1)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
          </div>

          <label>Comments:</label>
          <textarea
            value={fb.comment}
            onChange={(e) => handleFeedbackChange(index, "comment", e.target.value)}
            placeholder="Write your thoughts..."
          ></textarea>
        </div>
      ))}
      <button className="submit-feedback-btn" onClick={handleSubmit}>
        Submit Feedback
      </button>
      {message && <p className="feedback-message">{message}</p>}
    </div>
  );
};

export default OrderFeedback;
