import axios from "axios";

const api = axios.create({
//   baseURL: "http://localhost:5000",
  baseURL: "http://localhost:5000/s/v1",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTdmY2U3ZTBmM2JmOWVjYzQyZGNmM2QiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzAwMzIzNTUsImV4cCI6MTc3MDA2NDc1NX0.PQotAKirFAHRmo_1b1XiRFfJSftMlHxENKjOn3GV3Kc";
    // const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.method === "get") {
    config.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    config.headers["Pragma"] = "no-cache";
    config.headers["Expires"] = "0";
  }

  return config;
});

export default api;
