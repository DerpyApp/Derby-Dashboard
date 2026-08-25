// ─────────────────────────────────────────────────────────────
//  Axios Instance — Configured for ASP.NET Core Backend
//  • Request interceptor: attaches Bearer JWT token
//  • Response interceptor: handles 401 auto-logout + 403 redirect
// ─────────────────────────────────────────────────────────────

import axios from 'axios';
import { REFRESH_TOKEN_KEY, TOKEN_KEY, USER_KEY, ROUTES } from './constants';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ── Request Interceptor ──────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response Interceptor ─────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response?.status === 401) {
      // Clear all auth data and redirect to login
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      // Avoid redirect loops if already on an auth page
      const authPaths = [ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.FORGOT_PASSWORD];
      if (!authPaths.includes(window.location.pathname)) {
        window.location.href = ROUTES.LOGIN;
      }
    }

    // Normalize error shape for consistent handling in features
    const normalizedError = {
      status: response?.status,
      message:
        response?.data?.message ||
        response?.data?.title || // ASP.NET ProblemDetails title
        error.message ||
        'An unexpected error occurred.',
      errors: response?.data?.errors || null, // ASP.NET validation errors dict
    };

    return Promise.reject(normalizedError);
  },
);

export default apiClient;
