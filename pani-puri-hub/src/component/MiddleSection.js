import React, { useEffect, useState } from "react";
import "./MiddleSection.css";
import axios from "axios";

const MiddleSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8090/api/feedback/all")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  return (
    <div className="middle-container">
      {/* Shifted Central Image */}
      <div className="central-image-wrapper">
        <div className="central-image">
          <img src="/images/pani-puri-1.png" alt="Central Pani Puri" />
        </div>
      </div>

      {/* Side Images */}
      <img src="/images/pani-puri-5.png" alt="Side" className="side top-left" />
      <img src="/images/pani-puri-6.png" alt="Side" className="side top-right" />
      <img src="/images/pani-puri-4.png" alt="Side" className="side bottom-left" />
      <img src="/images/pani-puri-7.png" alt="Side" className="side bottom-right" />

      {/* Review Section */}
      <div className="review-box">
        <h3 className="review-heading">What Our Customers Say</h3>
        <div className="scroll-box">
          {reviews.length === 0 ? (
            <p className="no-review">No reviews yet.</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="review-card">
                <strong>{review.itemName}</strong>
                <p>Rating: {"⭐".repeat(review.rating)}</p>
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MiddleSection;
