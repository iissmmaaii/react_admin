import axios from 'axios';
import { tokenStorage } from '../auth/tokenStorage';
import { env } from '../config/env';
import { AppError } from '../errors/AppError';

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 20_000,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.request.use((config) => {
  const session = tokenStorage.get();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  config.headers['X-Correlation-Id'] = crypto.randomUUID();
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status as number | undefined;
    const message =
      error.response?.data?.message ||
      (status === 0 ? 'تعذر الاتصال بالخادم' : error.message) ||
      'حدث خطأ غير متوقع';

    if (status === 401) {
      tokenStorage.clear();
      if (!window.location.pathname.endsWith('/login')) {
        window.location.assign('/login');
      }
    }

    return Promise.reject(new AppError(message, status, error.response?.data));
  },
);
