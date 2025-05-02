import axios from "axios";

// Base URL — update this once if the port or host changes
const BASE_URL = "http://localhost:8090";
const IMAGE_BASE_URL = `${BASE_URL}/images`;

const api = {
  // 🧑 User APIs
  login: (loginData) => axios.post(`${BASE_URL}/api/users/login`, loginData),
  signup: (userData) => axios.post(`${BASE_URL}/api/users/signup`, userData),

  // 🍽️ Menu APIs
  getMenuItems: () => axios.get(`${BASE_URL}/api/menu`),
  deleteMenuItem: (id) => axios.delete(`${BASE_URL}/api/menu/delete/${id}`),
  addMenuItem: (data) => axios.post(`${BASE_URL}/api/menu/add`, data),
  updateMenuItem: (id, data) => axios.put(`${BASE_URL}/api/menu/update/${id}`, data),
  disableMenuItem: (itemId) => axios.patch(`${BASE_URL}/api/menu/${itemId}/disable`),
  enableMenuItem: (itemId) => axios.patch(`${BASE_URL}/api/menu/${itemId}/enable`),

  // 🖼️ Image Helper
  getImageUrl: (filename) => `${IMAGE_BASE_URL}/${filename}`,

  // 📝 Feedback APIs
  getAllFeedback: () => axios.get(`${BASE_URL}/api/feedback/all`),
  submitFeedback: (feedbackData) => axios.post(`${BASE_URL}/api/feedback/submit`, feedbackData),

  updateMenuItemWithImage: (id, formData) => {
    return axios.put(`${BASE_URL}/api/menu/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  
  // 🧾 Order APIs
  placeOrder: (orderData) => axios.post(`${BASE_URL}/api/orders/place`, orderData),
  getOrders: () => axios.get(`${BASE_URL}/api/orders/all`),
  getOrdersByCustomerName: (name) =>
    axios.get(`${BASE_URL}/api/orders/by-customer-name?name=${name}`),
};

export default api;
