import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Get email and password from localStorage
  const loggedInEmail = localStorage.getItem("email");
  const loggedInPassword = localStorage.getItem("password");

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>Sri Durga Chat Bandar</h1>
      <ul style={styles.navLinks}>
        {/* Conditionally render Addmenuitem button only for specific user */}
        {loggedInEmail === "badepallihareesha123@gmail.com" &&
          loggedInPassword === "Hareesha@123" && (
            <li>
              <button
                onClick={() => navigate("/admindashboard")}
                style={styles.navLinkButton}
              >
                AdminDashboard
              </button>
            </li>
          )}

        <li>
          <button onClick={() => navigate("/home")} style={styles.navLinkButton}>
            Home
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/menu")} style={styles.navLinkButton}>
            Menu
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/login")} style={styles.navLinkButton}>
            Signout
          </button>
        </li>
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
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
  },
  navLinkButton: {
    background: "none",
    border: "none",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#222",
    transition: "color 0.3s ease",
  },
};

export default Navbar;
