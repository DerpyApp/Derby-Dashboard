import axios from "axios";
import { getAccessToken } from "./authToken";

const rawBaseUrl = (import.meta.env.VITE_API_BASE_URL || "https://derby.runasp.net").replace(/\/+$/, "");
export const API_BASE_URL = rawBaseUrl.endsWith("/api") ? rawBaseUrl : `${rawBaseUrl}/api`;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((requestConfig) => {
  const token = getAccessToken();
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  return requestConfig;
});
