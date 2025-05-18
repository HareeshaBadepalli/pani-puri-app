import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/apiService';  // Import the apiService
import './AddNewItem.css';

const AddNewItem = ({ editItem, onClose, onUpdated }) => {
  const isUpdateMode = !!editItem;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    image: null,
  });
   
const navigate = useNavigate();
const goBackToitem = () => {
  navigate("/add-item"); // or replace with the correct route
};

  useEffect(() => {
    if (isUpdateMode && editItem) {
      setFormData({
        name: editItem.name || "",
        price: editItem.price || "",
        image: null, // Image update optional
      });
    }
  }, [editItem, isUpdateMode]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      if (formData.image) data.append("image", formData.image);

      if (isUpdateMode) {
        await api.updateMenuItem(editItem.id, data); // Call the update function from apiService
        alert("Item updated successfully");
        if (onUpdated) onUpdated();
        if (onClose) onClose();
      } else {
        await api.addMenuItem(data); // Call the add function from apiService
        alert("Item added successfully");
        window.location.href = "/add-item";
      }
    } catch (err) {
      console.error("Error saving item", err);
      alert("Failed to save item");
    }
  };

  return (
    <div className={isUpdateMode ? "modal" : "add-new-form"}>
    <button onClick={goBackToitem} className="back-button">
  ← Back to Menu Items
    </button>
      <h2>{isUpdateMode ? "Update Item" : "Add New Menu Item"}</h2>
      <input
        type="text"
        name="name"
        placeholder="Item Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>{isUpdateMode ? "Save" : "Submit"}</button>
      {isUpdateMode && <button onClick={onClose}>Cancel</button>}
    </div>
  );
};

export default AddNewItem;
