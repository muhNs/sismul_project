import axios, { InternalAxiosRequestConfig } from 'axios';
import { useStore } from './store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // We use HttpOnly cookies now, so no need to attach token from state
  return config;
}, (error: unknown) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error: any) => {
  if (error.response && error.response.status === 401) {
    if (typeof window !== "undefined") {
      // Clear invalid localStorage session and Zustand store
      localStorage.removeItem("userRole");
      useStore.getState().logout();
      
      // If we are in an admin route (and not already on login page), redirect to login
      if (window.location.pathname.startsWith("/admin") && window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      }
    }
  }
  return Promise.reject(error);
});

export default api;
