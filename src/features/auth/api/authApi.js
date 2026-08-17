import apiClient from '@config/axios';
import { API_ENDPOINTS } from '@config/constants';

// ─────────────────────────────────────────────────────────────
//  Auth API — Integrations with ASP.NET Core Auth Controller
// ─────────────────────────────────────────────────────────────

/**
 * Login with email & password.
 * @param {{ email: string, password: string, rememberMe?: boolean }} data
 * @returns {Promise<{ accessToken, refreshToken, user }>}
 */
export const loginUser = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
  return response.data;
};

/**
 * Register a new user account.
 * @param {{ fullName: string, email: string, phone: string, password: string }} data
 * @returns {Promise<{ message: string }>}
 */
export const registerUser = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
  return response.data;
};

/**
 * Request an OTP to be sent to the given email.
 * @param {{ email: string }} data
 * @returns {Promise<{ message: string }>}
 */
export const sendOTP = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.SEND_OTP, data);
  return response.data;
};

/**
 * Verify a 6-digit OTP code.
 * @param {{ email: string, otp: string }} data
 * @returns {Promise<{ resetToken: string }>}
 */
export const verifyOTP = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, data);
  return response.data;
};

/**
 * Reset the user's password using a verified reset token.
 * @param {{ email: string, resetToken: string, newPassword: string }} data
 * @returns {Promise<{ message: string }>}
 */
export const resetPassword = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
  return response.data;
};
