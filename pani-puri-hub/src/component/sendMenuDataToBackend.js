const sendMenuDataToBackend = async () => {
    const menuItems = [
      { itemName: "Dahi Papdi", price: 40, stock: 50 },
      { itemName: "Dahi Puri", price: 40, stock: 50 },
      { itemName: "Pani Puri", price: 15, stock: 100 },
      { itemName: "Samosa Chaat", price: 30, stock: 30 },
      { itemName: "Sev Puri", price: 25, stock: 40 },
      { itemName: "Bhel Puri", price: 35, stock: 35 },
      { itemName: "Masala Puri", price: 30, stock: 25 },
    ];
  
    try {
      const response = await fetch("http://localhost:8092/api/menu/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuItems),
      });
  
      if (!response.ok) {
        console.error("❌ Failed to send menu data.");
      } else {
        console.log("✅ Menu data sent successfully.");
      }
    } catch (err) {
      console.error("❌ Error sending menu data:", err);
    }
  };
  export default sendMenuDataToBackend; // ✅ Make sure this is here
