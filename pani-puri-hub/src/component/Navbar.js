import React from "react";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>Sri Durga Chat Bandar</h1>
      <ul style={styles.navLinks}>
        <li><a href="/" style={styles.navLink}>Home</a></li>
        <li><a href="/menu" style={styles.navLink}>Menu</a></li>
        <li><a href="/contact" style={styles.navLink}>Contact</a></li>
        <li><a href="/order" style={styles.orderButton}>Order Online</a></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(to right, #ffcc00, #ff6600)",
    padding: "15px 30px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  logo: {
    color: "blue",
    fontSize: "48px",
    fontFamily: "'Pacifico', cursive",
    textAlign: "center",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)"
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
  },
  navLink: {
    textDecoration: "none",
    color: "#222",
    fontSize: "20px",
    fontWeight: "bold",
    transition: "color 0.3s ease",
  },
  orderButton: {
    backgroundColor: "#d10000",
    color: "white",
    padding: "10px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "all 0.3s ease",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  },
};

// Adding hover effects using JavaScript
styles.navLink[":hover"] = { color: "#ff6600" };
styles.orderButton[":hover"] = {
  backgroundColor: "#ff0000",
  transform: "scale(1.05)",
  boxShadow: "0px 6px 12px rgba(255, 0, 0, 0.5)",
};

export default Navbar;
