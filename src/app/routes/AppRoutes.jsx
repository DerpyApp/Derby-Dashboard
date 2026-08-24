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
import TournamentPage from "@pages/tournament/tournament";
import ContactPage from "@pages/ContactPage";
import PricingPage from "@pages/PricingPage";
import AboutUs from "@components/AboutUs";
import PaymentPage from "@components/Payment/PaymenyPage/steps/PaymentPage";

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
        <Route path="/tournament" element={<TournamentPage />} />
        <Route path="/tournaments" element={<TournamentPage />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/legal" element={<LegalPage />} />
      </Route>

      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      <Route path={ROUTES.OTP} element={<OTPPage />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />

      <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />

      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
}
