import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://app.qa.techvgi.com/schoolerp-qa/api", // Replace with your API base URL
  // baseURL: "http://localhost:8181/api", // Replace with your API base URL
  // baseURL: "http://localhost:8080/api", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
