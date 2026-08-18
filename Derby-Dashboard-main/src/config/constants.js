// ─────────────────────────────────────────────────────────────
//  API Endpoint Constants
//  All paths are relative to VITE_API_BASE_URL defined in .env
// ─────────────────────────────────────────────────────────────

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    SEND_OTP: '/api/auth/send-otp',
    VERIFY_OTP: '/api/auth/verify-otp',
    RESET_PASSWORD: '/api/auth/reset-password',
    REFRESH_TOKEN: '/api/auth/refresh-token',
    LOGOUT: '/api/auth/logout',
  },
  COURTS: {
    LIST: '/api/courts',
    DETAIL: (id) => `/api/courts/${id}`,
    AVAILABILITY: (id) => `/api/courts/${id}/availability`,
  },
  BOOKINGS: {
    LIST: '/api/bookings',
    CREATE: '/api/bookings',
    DETAIL: (id) => `/api/bookings/${id}`,
    CANCEL: (id) => `/api/bookings/${id}/cancel`,
  },
  USER: {
    PROFILE: '/api/user/profile',
    UPDATE_PROFILE: '/api/user/profile',
  },
};

// ─────────────────────────────────────────────────────────────
//  App-wide constants
// ─────────────────────────────────────────────────────────────

export const APP_NAME = 'Derpy';
export const APP_TAGLINE = 'Book Your Court. Play Your Game.';

export const TOKEN_KEY = 'derpy_access_token';
export const REFRESH_TOKEN_KEY = 'derpy_refresh_token';
export const USER_KEY = 'derpy_user';

export const OTP_RESEND_COOLDOWN_SECONDS = 60;
export const OTP_LENGTH = 6;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  OTP: '/verify-otp',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  COURTS: '/courts',
  BOOKINGS: '/bookings',
  PROFILE: '/profile',
};
