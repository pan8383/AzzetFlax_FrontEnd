import axios from 'axios';

import { ROUTES } from '@/lib/routes';

const LOGIN_PATH = ROUTES.route.auth.login;
const REFRESH_API_PATH = ROUTES.api.auth.refresh;

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  ?? 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let refreshQueue: (() => void)[] = [];

axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    const status = error.response?.status;
    const originalRequest = error.config;

    // ログインページではリダイレクトしない
    const isLoginPage = typeof window !== 'undefined' && window.location.pathname === LOGIN_PATH;

    if (
      status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes(REFRESH_API_PATH)
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(resolve => {
          refreshQueue.push(() => resolve(axiosInstance(originalRequest)));
        });
      }

      isRefreshing = true;

      try {
        await axiosInstance.post(REFRESH_API_PATH);

        refreshQueue.forEach(cb => cb());
        refreshQueue = [];

        return axiosInstance(originalRequest);
      } catch {

        // ログインページ以外ならリダイレクト
        if (!isLoginPage) {
          window.location.href = LOGIN_PATH;
        }

        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
