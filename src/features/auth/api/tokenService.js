import { TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from '@config/constants';

// ─────────────────────────────────────────────────────────────
//  Token Service — Secure JWT management via localStorage
//  Provides a clean abstraction so storage mechanism can be
//  swapped (e.g. to httpOnly cookies) without touching features.
// ─────────────────────────────────────────────────────────────

export const tokenService = {
  // ── Access Token ────────────────────────────────────────
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token) {
    if (!token) return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  // ── Refresh Token ────────────────────────────────────────
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(token) {
    if (!token) return;
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  // ── User Payload ─────────────────────────────────────────
  getUser() {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  setUser(user) {
    if (!user) return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
  },

  // ── Batch Operations ─────────────────────────────────────
  persistSession({ accessToken, refreshToken, user }) {
    this.setToken(accessToken);
    if (refreshToken) this.setRefreshToken(refreshToken);
    if (user) this.setUser(user);
  },

  clearSession() {
    this.removeToken();
    this.removeRefreshToken();
    this.removeUser();
  },

  // ── Helpers ──────────────────────────────────────────────
  isAuthenticated() {
    return Boolean(this.getToken());
  },
};
