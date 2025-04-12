import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddMenuItem.css";

const AddMenuItem = () => {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get("http://localhost:8094/api/menu");
      setMenuItems(res.data);
    } catch (err) {
      console.error("Error fetching items", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8094/api/menu/delete/${id}`);
      fetchMenuItems();
    } catch (err) {
      console.error("Error deleting item", err);
    }
  };

  const handleEdit = (item) => {
    navigate(`/update-item/${item.id}`, { state: { item } });
  };

  return (
    <div className="add-container">
    <button className="back-btn" onClick={() => navigate('/menu')}>
        Back
      </button>     
       <h2 className="heading-table">Add New Menu Item</h2>
      <div className="button-bar">
        <button className="action-btn" onClick={() => navigate("/add-new-item")}>
          Add Item
        </button>
      </div>

      <table className="menu-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td>
  {item.imagePath ? (
    <img
  src={`http://localhost:8094/images/${item.imagePath}`} 
  alt="menu item" 
  style={{ width: '100px' }}
/>
  ) : (
    "No image"
  )}
</td>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td>
                <button className="update-btn" onClick={() => handleEdit(item)}>Update</button>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddMenuItem;
