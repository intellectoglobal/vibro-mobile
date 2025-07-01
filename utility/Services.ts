// axiosInstance.ts
import axios from "axios";


// const baseUrl = "https://vibro.onrender.com/api"
// const base_url = "http://localhost:8000/api"
const baseUrl = "http://192.168.0.105:8000/api"


const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
