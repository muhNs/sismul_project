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

export default api;
