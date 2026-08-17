import apiClient from '@config/axios';
import { API_ENDPOINTS } from '@config/constants';

// 💡 غير المتغير ده لـ false أول ما الـ Backend يجهز ويبدأ يشتغل
const USE_MOCK_API = true;

// دالة مساعدة لمحاكاة تأخير الـ Network (800ms)
const mockDelay = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), 800));

// ─────────────────────────────────────────────────────────────
//  Auth API — Integrations with ASP.NET Core Auth Controller
// ─────────────────────────────────────────────────────────────

/**
 * Login with email & password.
 * @param {{ email: string, password: string, rememberMe?: boolean }} data
 * @returns {Promise<{ accessToken, refreshToken, user }>}
 */
export const loginUser = async (data) => {
  if (USE_MOCK_API) {
    return mockDelay({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      user: { email: data.email, fullName: 'Demo User' },
    });
  }
  const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
  return response.data;
};

/**
 * Register a new user account.
 * @param {{ fullName: string, email: string, phone: string, password: string }} data
 * @returns {Promise<{ message: string }>}
 */
export const registerUser = async (data) => {
  if (USE_MOCK_API) {
    return mockDelay({ message: 'Registration successful!' });
  }
  const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
  return response.data;
};

/**
 * Request an OTP to be sent to the given email.
 * @param {{ email: string }} data
 * @returns {Promise<{ message: string }>}
 */
export const sendOTP = async (data) => {
  if (USE_MOCK_API) {
    return mockDelay({ message: 'OTP sent successfully!' });
  }
  const response = await apiClient.post(API_ENDPOINTS.AUTH.SEND_OTP, data);
  return response.data;
};

/**
 * Verify a 6-digit OTP code.
 * @param {{ email: string, otp: string }} data
 * @returns {Promise<{ resetToken: string }>}
 */
export const verifyOTP = async (data) => {
  if (USE_MOCK_API) {
    return mockDelay({ resetToken: 'mock-reset-token-xyz-123' });
  }
  const response = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, data);
  return response.data;
};

/**
 * Reset the user's password using a verified reset token.
 * @param {{ email: string, resetToken: string, newPassword: string }} data
 * @returns {Promise<{ message: string }>}
 */
export const resetPassword = async (data) => {
  if (USE_MOCK_API) {
    return mockDelay({ message: 'Password reset successfully!' });
  }
  const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
  return response.data;
};