import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© 2025 Sri Durga Chat Bandar. All Rights Reserved.</p>
      <p>Contact: +91 98765 43210 | Email: info@chatbandar.com</p>
      <p>Location: Kurnool, India</p>
    </footer>
  );
};

const styles = {
  footer: {
    background: "linear-gradient(to right, #ff9900, #ffcc00)", // Gradient background
    color: "black",
    textAlign: "center",
    padding: "20px",
    fontSize: "16px",
    position: "relative",
    width: "100%",
    bottom: "0",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.2)", // Top shadow effect
  }
};

export default Footer;
