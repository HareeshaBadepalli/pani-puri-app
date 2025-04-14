import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./menupage.css";
import axios from "axios";

const Menu = ({ cart, setCart }) => {
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedItemName, setSelectedItemName] = useState("");
  const [lastName, setLastName] = useState("Guest");
  const [menuItems, setMenuItems] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState({});
  const [clickedButton, setClickedButton] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedLastName = localStorage.getItem("lastName");
    const storedEmail = localStorage.getItem("email");
    if (storedLastName) setLastName(storedLastName);
    if (storedEmail === "badepallihareesha123@gmail.com") setIsAdmin(true);

    fetch("http://localhost:8096/api/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
        const disabledMap = {};
        data.forEach((item) => {
          if (!item.available) disabledMap[item.id] = true;
        });
        setDisabledButtons(disabledMap);
      })
      .catch((err) => console.error("Failed to fetch menu items", err));
  }, []);
  const updateAvailabilityInBackend = async (itemId, currentStatus) => {
    const endpoint = currentStatus
      ? `http://localhost:8093/api/menu/${itemId}/disable`
      : `http://localhost:8093/api/menu/${itemId}/enable`;
  
    try {
      const response = await axios.put(endpoint);
      if (response.status === 200) {
        // Update availability in local state
        const updated = menuItems.map(item =>
          item.id === itemId ? { ...item, available: !currentStatus } : item
        );
        setMenuItems(updated);
      }
    } catch (error) {
      console.error('Failed to toggle availability', error);
    }
  };
  
  const handleClick = (itemId, action) => {
    if (disabledButtons[itemId]) return;

    setQuantities((prev) => {
      const currentQty = prev[itemId] || 0;
      const newQty = action === "increment" ? currentQty + 1 : Math.max(currentQty - 1, 0);
      return { ...prev, [itemId]: newQty };
    });

    setClickedButton({ id: itemId, action });
    setTimeout(() => setClickedButton(null), 300);
  };

  const addToCart = (item) => {
    if (disabledButtons[item.id]) return;

    const quantityToAdd = quantities[item.id] || 0;
    if (quantityToAdd > 0) {
      setCart((prevCart) => ({
        ...prevCart,
        [item.id]: {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: (prevCart[item.id]?.quantity || 0) + quantityToAdd,
          imagePath: item.imagePath,
        },
      }));

      setMessage(`${item.name} added to cart!`);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredItems = menuItems
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesItem = selectedItemName ? item.name === selectedItemName : true;
      return matchesSearch && matchesItem;
    })
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1 className="heading">Our Menu</h1>
        <span className="user-info">Welcome, {lastName}</span>
        <button className="view-cart" onClick={() => navigate("/cart")}>
          View Cart 🛒
        </button>
      </div>

      <div className="menu-controls">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>

        <select value={selectedItemName} onChange={(e) => setSelectedItemName(e.target.value)}>
          <option value="">Filter by Item</option>
          {menuItems.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="menu-items">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const isDisabled = disabledButtons[item.id];

            return (
              <div key={item.id} className={`menu-card ${isDisabled ? "card-disabled" : ""}`}>
                <div className="image-wrapper">
                  <img
                    src={`http://localhost:8093/images/${item.imagePath}`}
                    alt={item.name}
                    className={isDisabled ? "disabled-image" : ""}
                  />
                  {isDisabled && <div className="overlay">No Items Available</div>}
                </div>

                <h3>{highlightText(item.name, searchTerm)}</h3>
                <p>{item.price} Rs</p>

                <div className="cart-controls">
                  <button
                    className={`decrement ${
                      clickedButton?.id === item.id && clickedButton?.action === "decrement"
                        ? "clicked"
                        : ""
                    }`}
                    onClick={() => handleClick(item.id, "decrement")}
                    disabled={isDisabled}
                  >
                    -
                  </button>

                  <span className="quantity" style={{ color: isDisabled ? "red" : "black" }}>
                    {isDisabled ? 0 : quantities[item.id] || 0}
                  </span>

                  <button
                    className={`increment ${
                      clickedButton?.id === item.id && clickedButton?.action === "increment"
                        ? "clicked"
                        : ""
                    }`}
                    onClick={() => handleClick(item.id, "increment")}
                    disabled={isDisabled}
                  >
                    +
                  </button>
                </div>

                {isDisabled && <p className="stock-message">Stock is not available</p>}

                <button
                  className="add-to-cart"
                  onClick={() => addToCart(item)}
                  disabled={isDisabled}
                >
                  Add to Cart
                </button>

                {isAdmin && (
                  <button
                    className="re-enable-button"
                    onClick={() => {
                      const newAvailableStatus = !isDisabled;

                      setDisabledButtons((prev) => {
                        const updated = { ...prev };
                        if (newAvailableStatus === true) {
                          updated[item.id] = true;
                        } else {
                          delete updated[item.id];
                        }
                        return updated;
                      });

                      setQuantities((prev) => ({ ...prev, [item.id]: 0 }));
                      updateAvailabilityInBackend(item.id, newAvailableStatus);
                    }}
                  >
                    {isDisabled ? "Re-enable" : "Disable"}
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p className="no-results">No items found</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
