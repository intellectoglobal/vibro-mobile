// axiosInstance.ts
import axios from "axios";

// const baseUrl = "https://vibro.onrender.com/api/";
// const baseUrl = "http://localhost:8000/api/";
const baseUrl = "http://192.168.0.103:8000/api/";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Interceptor to attach token
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyNTE4MDQyLCJpYXQiOjE3NTI1MDEyNDIsImp0aSI6IjUwNmI2YWFmNDdkYTRhMTdhZGVjNzk2ZWM2ZTZhNDE1IiwidXNlcl9pZCI6MjV9.jhB4aj-SlO6KtFX0ZmyKYdvx2BmiUbjdvCMual8XyfU"
        if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🧠 Helper to get token (modify based on your app logic)
const getAccessToken = async (): Promise<string | null> => {
  try {
    // Replace this with wherever you store your token (AsyncStorage, Redux, LocalStorage, etc.)
    const token = localStorage.getItem("access_token");
    return token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};

export default axiosInstance;