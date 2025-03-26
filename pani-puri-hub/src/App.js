import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import MiddleSection from "./component/MiddleSection";
import ItemsPage from "./component/ItemsPage";
import Menu from "./component/Menu";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MiddleSection />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
