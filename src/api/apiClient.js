import axios from "axios";
import { getAccessToken } from "./authToken";

// PadelBooking API base URL (see API_FLOW.md — Base URL: https://localhost:7166).
// Override with VITE_API_BASE_URL for staging/production.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://localhost:7166/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Every 🔒 endpoint in API_FLOW.md (Booking, Payments, ...) needs
// `Authorization: Bearer <accessToken>`. Attach it automatically so callers
// don't have to.
apiClient.interceptors.request.use((requestConfig) => {
  const token = getAccessToken();
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  return requestConfig;
});
