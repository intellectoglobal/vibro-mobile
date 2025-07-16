/* eslint-disable import/no-named-as-default-member */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { SecureStoreKeys, SecureStoreService } from "./secureStore";

// Configure your base API URL
const BASE_URL = "https://vibro.onrender.com/api/";
// const BASE_URL = "http://192.168.0.103:8000/api/";

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for auth token or other headers
api.interceptors.request.use(
  async (config) => {
    // You can modify the config here (e.g., add auth token)
    const authInfo = (await SecureStoreService?.get(
      SecureStoreKeys.AUTH_INFO
    )) as any;
    if (authInfo && authInfo?.isAuthenticated) {
      config.headers.Authorization = `Bearer ${authInfo?.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (axios.isAxiosError(error)) {
      // Transform all API errors here
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

/**
 * GET request
 * @param endpoint - The API endpoint
 * @param params - Query parameters
 * @param config - Additional axios config
 * @returns Promise with response data
 */
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

/**
 * POST request
 * @param endpoint - The API endpoint
 * @param data - Request body data
 * @param config - Additional axios config
 * @returns Promise with response data
 */
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

/**
 * PUT request
 * @param endpoint - The API endpoint
 * @param data - Request body data
 * @param config - Additional axios config
 * @returns Promise with response data
 */
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

/**
 * DELETE request
 * @param endpoint - The API endpoint
 * @param config - Additional axios config
 * @returns Promise with response data
 */
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

// Export the configured axios instance in case needed directly
export default api;
