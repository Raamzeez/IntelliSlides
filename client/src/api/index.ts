import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  validateStatus: (s) => s <= 500,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
  },
});

export default api;
