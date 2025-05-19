import React from "react";

const Footer = () => {
  const handleLocateMe = () => {
    window.open("https://maps.app.goo.gl/QzTpHGQZ1T1RfHKw5", "_blank");
  };

  return (
    <footer style={styles.footer}>
      <p>© 2025 Sri Durga Chat Bandar. All Rights Reserved.</p>
      <p>Contact: +91 98765 43210 | Email: info@chatbandar.com</p>
      <p>Location: Kurnool, India</p>
      <button style={styles.locateButton} onClick={handleLocateMe}>
        📍 Locate Me
      </button>
    </footer>
  );
};

const styles = {
  footer: {
    background: "linear-gradient(to right, #ff9900, #ffcc00)",
    color: "black",
    textAlign: "center",
    padding: "20px",
    fontSize: "16px",
    position: "relative",
    width: "100%",
    bottom: "0",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.2)",
  },
  locateButton: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Footer;
