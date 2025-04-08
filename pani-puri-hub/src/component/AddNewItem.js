import React, { useEffect, useState } from "react";
import axios from "axios";
import './AddNewItem.css';

const AddNewItem = ({ editItem, onClose, onUpdated }) => {
  const isUpdateMode = !!editItem;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: ""
  });

  useEffect(() => {
    if (isUpdateMode && editItem) {
      setFormData({
        name: editItem.name || "",
        price: editItem.price || "",
        stock: editItem.stock || ""
      });
    }
  }, [editItem, isUpdateMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (isUpdateMode) {
        await axios.put(`http://localhost:8093/api/menu/update/${editItem.id}`, null, {
          params: {
            name: formData.name,
            price: formData.price,
            stock: formData.stock
          }
        });
        alert("Item updated successfully");
        if (onUpdated) onUpdated();
        if (onClose) onClose();
      } else {
        await axios.post("http://localhost:8093/api/menu/add", null, {
          params: {
            name: formData.name,
            price: formData.price,
            stock: formData.stock
          }
        });
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
      <h2>{isUpdateMode ? "Update Item" : "Add New Menu Item"}</h2>
      <input type="text" name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
      <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} />
      <button onClick={handleSubmit}>{isUpdateMode ? "Save" : "Submit"}</button>
      {isUpdateMode && <button onClick={onClose}>Cancel</button>}
    </div>
  );
};

export default AddNewItem;
