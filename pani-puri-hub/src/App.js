import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import MiddleSection from "./component/MiddleSection";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MiddleSection />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
