import { TOKEN_KEY } from "../config/constants";

const STORAGE_KEY = import.meta.env.VITE_AUTH_TOKEN_STORAGE_KEY || "accessToken";

export function getAccessToken() {
  // Allow a one-off override via ?token=...
  const fromQuery = new URLSearchParams(window.location.search).get("token");
  if (fromQuery) {
    localStorage.setItem(TOKEN_KEY || STORAGE_KEY, fromQuery);
    return fromQuery;
  }
  return (
    localStorage.getItem(TOKEN_KEY) ||
    localStorage.getItem("derpy_access_token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem(STORAGE_KEY) ||
    null
  );
}

export function hasAccessToken() {
  return !!getAccessToken();
}
