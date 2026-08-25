// ─────────────────────────────────────────────────────────────
//  API Endpoint Constants
//  All paths are relative to VITE_API_BASE_URL defined in .env
// ─────────────────────────────────────────────────────────────

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/User/login',
    REGISTER: '/api/User/register',
    GOOGLE_LOGIN: '/api/User/google-login',
    FACEBOOK_LOGIN: '/api/User/facebook-login',
    FORGOT_PASSWORD: '/api/User/forgot-password',
    SEND_OTP: '/api/User/forgot-password',
    VERIFY_OTP: '/api/User/verify-otp',
    RESET_PASSWORD: '/api/User/reset-password',
    REFRESH_TOKEN: '/api/User/refresh',
    LOGOUT: '/api/User/logout',
  },
  COURTS: {
    LIST: '/api/courts',
    DETAIL: (id) => `/api/courts/${id}`,
    AVAILABILITY: (id) => `/api/courts/${id}/availability`,
  },
  BOOKINGS: {
    LIST: '/api/Booking/me',
    CREATE: '/api/Booking',
    DETAIL: (id) => `/api/Booking/${id}`,
    CANCEL: (id) => `/api/Booking/${id}/cancel`,
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

export const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  '820082278812-cq7e1mfu8m4bisvq68apb3ff8nioefie.apps.googleusercontent.com';

export const FACEBOOK_APP_ID =
  import.meta.env.VITE_FACEBOOK_APP_ID ||
  '1540732264400627';

export const TOKEN_KEY = 'derpy_access_token';
export const REFRESH_TOKEN_KEY = 'derpy_refresh_token';
export const USER_KEY = 'derpy_user';

export const OTP_RESEND_COOLDOWN_SECONDS = 60;
export const OTP_LENGTH = 6;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  WELCOME: '/welcome',
  FORGOT_PASSWORD: '/forgot-password',
  OTP: '/verify-otp',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  COURTS: '/courts',
  BOOKINGS: '/bookings',
  PROFILE: '/profile',
};
