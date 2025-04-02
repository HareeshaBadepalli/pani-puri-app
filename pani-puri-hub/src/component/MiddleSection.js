import React from "react";
import "./MiddleSection.css"; // Import CSS for styling
import { useNavigate } from "react-router-dom";
const MiddleSection = () => {
  const navigate=useNavigate();

  return (
    <div className="middle-container">
      {/* Central Image */}
      <div className="central-image">
        <img src="/images/pani-puri-1.png" alt="Central Pani Puri" />
      </div>

      {/* Surrounding Images */}
      <img src="/images/pani-puri-5.png" alt="Side Pani Puri" className="side top-left" />
      <img src="/images/pani-puri-6.png" alt="Side Pani Puri" className="side top-right" />
      <img src="/images/pani-puri-4.png" alt="Side Pani Puri" className="side bottom-left" />
      <img src="/images/pani-puri-7.png" alt="Side Pani Puri" className="side bottom-right" />

      

    </div>
  );
};

export default MiddleSection;
