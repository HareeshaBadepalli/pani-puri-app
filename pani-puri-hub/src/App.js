import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import MiddleSection from "./component/MiddleSection";
import ItemsPage from "./component/ItemsPage";
import Menu from "./component/Menu";
import Cart from "./component/Cart"; // Import Cart Page
import Payment from "./component/Payment";

function App() {
  const [cart, setCart] = useState({}); // Cart state in App.js for sharing across pages

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MiddleSection />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/menu" element={<Menu cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/payment" element={<Payment />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
