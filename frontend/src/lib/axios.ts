import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

// KONFIGURASI BASE URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// STATE GLOBAL UNTUK REFRESH TOKEN GUARD
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: unknown = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

// SETUP INTERCEPTOR
const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalConfig = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (!error.response) {
        console.error("🚨 Gagal terhubung ke server (Network/Timeout Error).");
        return Promise.reject(error);
      }

      const status = error.response.status;

      // PENANGANAN 401 (TOKEN EXPIRED)
      if (
        status === 401 &&
        originalConfig &&
        !originalConfig.url?.includes("/auth/refresh-token")
      ) {
        if (originalConfig._retry) {
          console.error("🚨 Infinite loop terdeteksi! Menghentikan request.");
          return Promise.reject(error);
        }

        originalConfig._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => instance(originalConfig))
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          await axios.post(
            `${API_BASE_URL}/auth/refresh-token`,
            {},
            { withCredentials: true },
          );
          processQueue(null);
          return instance(originalConfig);
        } catch (refreshError) {
          processQueue(refreshError);

          if (typeof window !== "undefined") {
            const currentPath = window.location.pathname;
            if (currentPath.startsWith("/admin")) {
              window.location.href = "/admin/login";
            } else {
              window.location.href = "/login";
            }
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      if (status === 403) {
        console.warn("🚨 Akses ditolak! Anda tidak memiliki izin.");
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

// EXPORT INSTANCE API

export const publicApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const privateApi = setupInterceptors(
  axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  }),
);
