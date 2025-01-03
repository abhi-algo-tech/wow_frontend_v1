import axios from "axios";

const axiosInstance = axios.create({

  // baseURL: "http://178.16.139.242:8080/api", // main port
  baseURL: "http://178.16.139.242:8091/api", // dev port
  // baseURL: "http://localhost:9090/api", // local port
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
