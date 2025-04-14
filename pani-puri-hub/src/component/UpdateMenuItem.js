import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateMenuItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    id: "",
    name: "",
    price: "",
    imagePath: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (location.state && location.state.item) {
      setItem(location.state.item);
      if (location.state.item.imagePath) {
        setPreview(`http://localhost:8093/images/${location.state.item.imagePath}`);
      }
    } else {
      alert("No item data found.");
      navigate("/add-menu-item");
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("price", item.price);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      await axios.put(
        `http://localhost:8093/api/menu/update/${item.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      alert("Item updated successfully");
      navigate("/add-item");
    } catch (error) {
      console.error("Error updating item", error);
      alert("Failed to update item");
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="add-container">
          <h2 className="heading-table">Update Menu Item</h2>
          <div className="form-section">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={item.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={item.price}
                onChange={handleChange}
              />
            </label>
            <label>
              Image:
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
            <button className="save-btn" onClick={handleUpdate}>
              Save
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .page-wrapper {
          min-height: 100vh;
          background: linear-gradient(to right,rgb(91, 148, 156),rgb(164, 197, 128));
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
        }

        .add-container {
          max-width: 600px;
          width: 100%;
          margin: 40px auto;
          padding: 30px 25px;
          background-color: rgb(87, 140, 209);
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(87, 83, 178, 0.1);
        }

        .heading-table {
          text-align: center;
          font-size: 26px;
          font-weight: bold;
          margin-bottom: 25px;
          color: rgb(30, 12, 12);
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-section label {
          display: flex;
          flex-direction: column;
          font-size: 26px;
          color:rgb(11, 11, 9);
        }

        .form-section input {
          padding: 10px 12px;
          font-size: 16px;
          border-radius: 8px;
          border: 2px solid rgb(21, 2, 2);
          margin-top: 6px;
          transition: 0.3s border-color ease-in-out, 0.3s box-shadow ease-in-out;
        }

        .form-section input:focus {
          border-color: #28a745;
          outline: none;
          box-shadow: 0 0 6px rgba(40, 167, 69, 0.3);
          background-color:rgb(137, 166, 84);
        }

        .save-btn {
          padding: 12px 20px;
          font-size: 16px;
          font-weight: bold;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 10px;
          transition: background-color 0.3s ease-in-out, transform 0.2s ease;
        }

        .save-btn:hover {
          background-color: #218838;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
};

export default UpdateMenuItem;
