import axios, { InternalAxiosRequestConfig } from 'axios';
import { useStore } from './store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika error 401 dan bukan saat mencoba refresh token itu sendiri
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/api/v1/auth/refresh-token') {
      originalRequest._retry = true;

      try {
        await axios.post(`${api.defaults.baseURL}/api/v1/auth/refresh-token`, {}, {
          withCredentials: true,
        });

        return api(originalRequest);
      } catch (refreshError) {
        // Jika refresh token gagal (expired/invalid), redirect ke halaman login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
