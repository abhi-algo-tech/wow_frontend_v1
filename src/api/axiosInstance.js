import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://13.53.38.136:8080/api",
  // baseURL: "https://wow-backend-v1.onrender.com/api",
  // baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
