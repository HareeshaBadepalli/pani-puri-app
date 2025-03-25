import React from "react";
import Navbar from './component/Navbar';
import MiddleSection from "./component/MiddleSection"; // ✅ Correct Import
import Footer from "./component/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <MiddleSection />
      <Footer />
    </div>
  );
}

export default App;
