import axios from "axios";
import { useAuth } from "../stores/useAuth";

export const axiosInstance = axios.create({
  baseURL: "https://securepies-us.backendless.app/api",
});
// bikir84466@iaciu.com
// Admin123

export const axiosInstance2 = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const refreshInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

axiosInstance2.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Token expired" &&
      !originalRequest._retry
    ) {
      try {
        await refreshInstance.post("/auth/refresh");
        return axiosInstance2(originalRequest);
      } catch (error) {
        useAuth.getState().logout();
        return Promise.reject(error);
      }
    }
  },
);
