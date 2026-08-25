import apiClient from '@config/axios';
import { API_ENDPOINTS } from '@config/constants';

const USE_MOCK_API = false;

const mockDelay = (data, delay = 800) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

const extractErrorMessage = (error) => {
  // Check ASP.NET / Validation Problem details response: errors dictionary
  if (error?.response?.data?.errors && typeof error.response.data.errors === 'object') {
    const messages = Object.values(error.response.data.errors).flat().filter(Boolean);
    if (messages.length) return messages.join(' ');
  }

  // Check error.errors object
  if (error?.errors && typeof error.errors === 'object') {
    const messages = Object.values(error.errors).flat().filter(Boolean);
    if (messages.length) return messages.join(' ');
  }

  return (
    error?.response?.data?.message ||
    error?.response?.data?.title ||
    error?.response?.data?.error ||
    (typeof error?.response?.data === 'string' ? error.response.data : null) ||
    error?.message ||
    'An unexpected error occurred.'
  );
};

const throwAuthError = (error, fallbackMessage) => {
  const extractedMsg = extractErrorMessage(error);
  const finalMessage = (extractedMsg && extractedMsg !== 'An unexpected error occurred.')
    ? extractedMsg
    : fallbackMessage || 'An unexpected error occurred.';
  const authError = new Error(finalMessage);
  authError.status = error?.status || error?.response?.status;
  authError.errors = error?.errors || error?.response?.data?.errors || null;
  authError.data = error?.response?.data;
  throw authError;
};

export const getAuthenticatedSession = (response, fallbackUser = {}) => {
  const accessToken =
    response?.token ||
    response?.accessToken ||
    response?.jwt ||
    response?.data?.token ||
    response?.data?.accessToken;

  if (!accessToken) {
    throw new Error('Authentication succeeded, but no access token was returned.');
  }

  const user =
    response?.user ||
    response?.profile ||
    response?.data?.user ||
    {
      id: response?.id || response?.userId || response?.data?.id,
      name: response?.name || response?.fullName || response?.data?.name || fallbackUser.name,
      email: response?.email || response?.data?.email || fallbackUser.email,
      phone: response?.phone || response?.data?.phone || fallbackUser.phone,
      role: response?.role || response?.data?.role || fallbackUser.role || 'Player',
    };

  return {
    accessToken,
    refreshToken: response?.refreshToken || response?.data?.refreshToken,
    user,
  };
};

export const loginUser = async (data) => {
  if (USE_MOCK_API) {
    return mockDelay({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      user: { email: data.email, name: 'Demo User', role: 'User' },
    });
  }

  const payload = {
    email: data.email,
    password: data.password,
  };

  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
    return response.data;
  } catch (error) {
    throwAuthError(error, 'Login failed: Invalid credentials or server unavailable.');
  }
};

export const registerUser = async (data) => {
  if (USE_MOCK_API) {
    return mockDelay({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      user: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role || 'Player',
      },
    });
  }

  const payload = {
    name: data.name || data.fullName || '',
    email: data.email,
    password: data.password,
    phone: data.phone || data.phoneNumber || '',
    role: data.role || 'Player',
  };

  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, payload);
    return response.data;
  } catch (error) {
    throwAuthError(error, 'Registration failed. Please check your details and try again.');
  }
};

export const forgotPassword = async (data) => {
  if (USE_MOCK_API) {
    return mockDelay({ message: 'OTP sent successfully to your email!' });
  }

  const payload = {
    email: data.email,
  };

  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, payload);
    return response.data;
  } catch (error) {
    throwAuthError(error, 'Failed to send OTP to email. Please check your email and try again.');
  }
};

export const sendOTP = forgotPassword;

export const verifyOTP = async (data) => {
  if (USE_MOCK_API) {
    return mockDelay({ resetToken: 'mock-reset-token-xyz-123' });
  }

  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, data);
    return response.data;
  } catch (error) {
    throwAuthError(error, 'Invalid or expired OTP token. Please try again.');
  }
};

export const resetPassword = async (data) => {
  if (USE_MOCK_API) {
    return mockDelay({ message: 'Password reset successfully!' });
  }

  const payload = {
    email: data.email,
    resetToken: data.resetToken || data.token,
    newPassword: data.newPassword,
  };

  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, payload);
    return response.data;
  } catch (error) {
    throwAuthError(error, 'Failed to reset password. Please check your token or try again.');
  }
};

export const loginWithGoogle = async (googleData) => {
  if (USE_MOCK_API) {
    return mockDelay({
      token: 'mock-google-jwt-token',
      accessToken: 'mock-google-jwt-token',
      refreshToken: 'mock-google-refresh-token',
      user: {
        id: 'google-user-123',
        email: googleData?.email || 'google.user@example.com',
        name: googleData?.name || 'Google Player',
        role: 'Player',
      },
    });
  }

  const payload = typeof googleData === 'string'
    ? { token: googleData, idToken: googleData, credential: googleData }
    : {
        idToken: googleData?.idToken || googleData?.credential || googleData?.token || googleData?.access_token,
        token: googleData?.token || googleData?.credential || googleData?.idToken || googleData?.access_token,
        credential: googleData?.credential || googleData?.idToken || googleData?.token,
        accessToken: googleData?.access_token || googleData?.accessToken,
        email: googleData?.email,
        name: googleData?.name,
        role: 'Player',
        ...googleData,
      };

  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.GOOGLE_LOGIN, payload);
    return response.data;
  } catch (error) {
    if (error?.response?.status === 404) {
      throw new Error('Google sign-in is currently unavailable on the server (endpoint /api/User/google-login not found). Please use standard email/password login.');
    }
    throwAuthError(error, 'Google authentication failed. Please verify your credentials or try again.');
  }
};

export const googleLogin = loginWithGoogle;

export const loginWithFacebook = async (facebookData) => {
  if (USE_MOCK_API) {
    return mockDelay({
      token: 'mock-facebook-jwt-token',
      accessToken: 'mock-facebook-jwt-token',
      refreshToken: 'mock-facebook-refresh-token',
      user: {
        id: 'facebook-user-123',
        email: facebookData?.email || 'facebook.user@example.com',
        name: facebookData?.name || 'Facebook Player',
        role: 'Player',
      },
    });
  }

  const payload = typeof facebookData === 'string'
    ? { token: facebookData, accessToken: facebookData }
    : {
        token: facebookData?.token || facebookData?.accessToken,
        accessToken: facebookData?.accessToken || facebookData?.token,
        userID: facebookData?.userID,
        email: facebookData?.email,
        name: facebookData?.name,
        role: 'Player',
        ...facebookData,
      };

  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.FACEBOOK_LOGIN, payload);
    return response.data;
  } catch (error) {
    if (error?.response?.status === 404) {
      throw new Error('Facebook sign-in is currently unavailable on the server (endpoint /api/User/facebook-login not found). Please use standard email/password login.');
    }
    throwAuthError(error, 'Facebook authentication failed. Please verify your credentials or try again.');
  }
};

export const facebookLogin = loginWithFacebook;


