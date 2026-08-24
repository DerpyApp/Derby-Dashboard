// The PadelBooking API (see API_FLOW.md) issues its JWT accessToken from
// POST /api/User/login. This payment page is a step *inside* that larger
// app's flow (Booking -> Payment), so it doesn't log the user in itself —
// it expects a token to already exist from the login step that happened
// before the user got here.
//
// Storage key is configurable via VITE_AUTH_TOKEN_STORAGE_KEY in case the
// host app stores it under a different name; defaults to "accessToken",
// which is the field name PadelBooking's login response uses.

const STORAGE_KEY = import.meta.env.VITE_AUTH_TOKEN_STORAGE_KEY || "accessToken";

export function getAccessToken() {
  // Allow a one-off override via ?token=... (handy for testing this page in
  // isolation without wiring up the full app's login flow).
  const fromQuery = new URLSearchParams(window.location.search).get("token");
  if (fromQuery) {
    localStorage.setItem(STORAGE_KEY, fromQuery);
    return fromQuery;
  }
  return localStorage.getItem(STORAGE_KEY) || null;
}

export function hasAccessToken() {
  return !!getAccessToken();
}
