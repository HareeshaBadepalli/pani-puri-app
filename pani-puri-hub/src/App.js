import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import MiddleSection from "./component/MiddleSection";
import Menu from "./component/Menu";
import Cart from "./component/Cart";
import Payment from "./component/Payment";
import Login from "./component/Login";
import Signing from "./component/Signing";
import AuthPage from "./component/AuthPage";  // Import AuthPage



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState({}); // Add cart state

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(auth === "true");
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signing" element={<Signing />} />

        {isAuthenticated ? (
          <>
            <Route path="/home" element={<><Navbar /><MiddleSection /><Footer /></>} />
            <Route path="/menu" element={<><Navbar /><Menu cart={cart} setCart={setCart} /><Footer /></>} />
            <Route path="/cart" element={<><Navbar /><Cart cart={cart} setCart={setCart} /><Footer /></>} />
            <Route path="/payment" element={<><Navbar /><Payment /><Footer /></>} />

          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;