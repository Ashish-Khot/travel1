import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",   // 👈 THIS is the fix
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// Attach JWT only when it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
