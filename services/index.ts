/* eslint-disable import/no-named-as-default-member */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { SecureStoreKeys, SecureStoreService } from "./secureStore";
import store from "@/store";
import { logoutRequest } from "@/Redux/reducer/auth/authSlice";

// Configure your base API URL
const BASE_URL = "https://vibro.onrender.com/api";
// const BASE_URL = "http://192.168.0.107:8000/api";

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const authInfo = (await SecureStoreService?.get(
      SecureStoreKeys.AUTH_INFO
    )) as any;
    if (authInfo?.isAuthenticated) {
      config.headers.Authorization = `Bearer ${authInfo.access}`;
    }

    if (__DEV__) {
      console.log("📤 [API REQUEST]", {
        url: `${config.baseURL ?? ""}${config.url ?? ""}`,
        method: config.method,
        headers: config.headers,
        data: config.data,
        params: config.params,
      });
    }

    return config;
  },
  (error) => {
    if (__DEV__) {
      console.error("❌ [REQUEST ERROR]", error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log("📥 [API RESPONSE]", {
        url: `${response.config.baseURL ?? ""}${response.config.url ?? ""}`,
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  async (error) => {
    const res = error.response
    if (axios.isAxiosError(error)) {
      if (__DEV__) {
        console.error("❌ [API ERROR]", {
          url: `${error.config?.baseURL ?? ""}${error.config?.url ?? ""}`,
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      }
       // 🔒 Handle expired token
    if (
      res?.data?.code === "token_not_valid" &&
      res?.data?.messages?.some((msg: any) =>
        msg.message === "Token is invalid or expired"
      )
    ) {

      store.dispatch(logoutRequest());

      return Promise.reject({
        message: "Session expired. Redirecting to login.",
        status: 401,
        data: res.data,
        isAxiosError: true,
      });
    }

      return Promise.reject({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
        isAxiosError: true,
      });
    }
    return Promise.reject(error);
  }
);

// GET request
export const get = async <T>(
  endpoint: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.get<T>(endpoint, { ...config, params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// POST request
export const post = async <T>(
  endpoint: string,
  data?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.post<T>(endpoint, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PUT request
export const put = async <T>(
  endpoint: string,
  data?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.put<T>(endpoint, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE request
export const del = async <T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.delete<T>(endpoint, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Export the configured axios instance
export default api;
