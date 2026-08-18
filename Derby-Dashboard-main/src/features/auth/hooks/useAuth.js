import { useAuthContext } from '@app/providers/AuthContext';

// ─────────────────────────────────────────────────────────────
//  useAuth — Convenient hook for consuming auth state & actions
// ─────────────────────────────────────────────────────────────
export function useAuth() {
  const { user, token, isAuthenticated, isLoading, login, logout } = useAuthContext();

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
