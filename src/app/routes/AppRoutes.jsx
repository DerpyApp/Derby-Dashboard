import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@config/constants";
import MainLayout from "@components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import HomePage from "@pages/HomePage";
import LoginPage from "@pages/auth/LoginPage";
import RegisterPage from "@pages/auth/RegisterPage";
import WelcomePage from "@pages/auth/Welcome";
import ForgotPasswordPage from "@pages/auth/ForgotPasswordPage";
import OTPPage from "@pages/OtpPage";
import ResetPasswordPage from "@pages/auth/ResetPasswordPage";
import LegalPage from "@pages/auth/LegalPage";
import DetailsPage from "@pages/Details/DetailsPage";

function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-bg text-brand-light">
      <h1 className="mb-2 text-4xl font-bold gradient-text">
        Welcome to Derpy
      </h1>
      <p className="text-brand-muted">Dashboard coming soon...</p>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Route>

      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      <Route path={ROUTES.OTP} element={<OTPPage />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
      <Route path="/legal" element={<LegalPage />} />
      <Route path="/details" element={<DetailsPage />} />

      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
}
