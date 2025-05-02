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
import AuthPage from "./component/AuthPage";
import AddMenuItem from "./component/AddMenuItem";
import AddNewItem from "./component/AddNewItem";
import UpdateMenuItem from "./component/UpdateMenuItem";
import AdminDashboard from "./component/AdminDashboard";
import OrderHistory from "./component/OrderHistory";
import ReorderPage from "./component/ReorderPage";
import ReviewList from "./component/ReviewList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState({}); // cart state

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(auth === "true");
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signing" element={<Signing />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/home" element={<><Navbar /><MiddleSection /><Footer /></>} />
            <Route path="/menu" element={<><Navbar /><Menu cart={cart} setCart={setCart} /><Footer /></>} />
            <Route path="/cart" element={<><Navbar /><Cart cart={cart} setCart={setCart} /><Footer /></>} />
            <Route path="/payment" element={<><Navbar /><Payment /><Footer /></>} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/reorder" element={<ReorderPage />} />
            <Route path="/reviews" element={<ReviewList />} />
        



            {/* Menu Management */}
            <Route path="/add-item" element={<AddMenuItem />} />
            <Route path="/add-new-item" element={<AddNewItem />} />
            <Route path="/update-item/:id" element={<UpdateMenuItem />} /> {/* 👈 Add this */}

          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}

      </Routes>
    </Router>
  );
}

export default App;
