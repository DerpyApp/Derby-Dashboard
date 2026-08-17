import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@config/constants';
import ProtectedRoute from './ProtectedRoute';

// ── Page imports ─────────────────────────────────────────────
import LoginPage          from '@pages/auth/LoginPage';
import RegisterPage       from '@pages/auth/RegisterPage';
import ForgotPasswordPage from '@pages/auth/ForgotPasswordPage';
import OTPPage            from '@pages/auth/OTPPage';
import ResetPasswordPage  from '@pages/auth/ResetPasswordPage';
import VenuesPage         from '@pages/VenuesPage';

// Placeholder dashboard (replace with real feature page)
function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-bg text-brand-light">
      <h1 className="text-4xl font-bold gradient-text mb-2">Welcome to Derpy 🏟️</h1>
      <p className="text-brand-muted">Dashboard coming soon...</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  AppRoutes — Centralized Route Definitions
// ─────────────────────────────────────────────────────────────
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path={ROUTES.LOGIN}            element={<LoginPage />} />
      <Route path={ROUTES.REGISTER}         element={<RegisterPage />} />
      <Route path={ROUTES.FORGOT_PASSWORD}  element={<ForgotPasswordPage />} />
      <Route path={ROUTES.OTP}              element={<OTPPage />} />
      <Route path={ROUTES.RESET_PASSWORD}   element={<ResetPasswordPage />} />

      {/* Protected Routes */}
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Venues Route */}
      <Route path={ROUTES.VENUES} element={<VenuesPage />} />

      {/* Fallback */}
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path="*"           element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
}
