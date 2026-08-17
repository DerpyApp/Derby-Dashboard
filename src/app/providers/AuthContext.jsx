import { createContext, useContext, useEffect, useReducer } from 'react';
import { tokenService } from '@features/auth/api/tokenService';

// ─────────────────────────────────────────────────────────────
//  AuthContext — Global authentication state
// ─────────────────────────────────────────────────────────────

const AuthContext = createContext(null);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true, // true on first mount while reading storage
};

function authReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: Boolean(action.payload.token),
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────
//  Provider
// ─────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const token = tokenService.getToken();
    const user = tokenService.getUser();
    dispatch({ type: 'INIT', payload: { token, user } });
  }, []);

  const login = ({ accessToken, refreshToken, user }) => {
    tokenService.persistSession({ accessToken, refreshToken, user });
    dispatch({ type: 'LOGIN', payload: { token: accessToken, user } });
  };

  const logout = () => {
    tokenService.clearSession();
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    ...state,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─────────────────────────────────────────────────────────────
//  Hook export — use in useAuth.js
// ─────────────────────────────────────────────────────────────
export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within <AuthProvider>');
  }
  return ctx;
}

export default AuthContext;
