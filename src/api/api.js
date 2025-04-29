import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // заміни, якщо бекенд на іншому хості
});

// Додаємо токен, якщо є (для авторизованих запитів у майбутньому)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
