// ─────────────────────────────────────────────────────────────
//  ForgotPasswordPage — Standalone centered card, dark bg
// ─────────────────────────────────────────────────────────────
import ForgotPasswordForm from '@features/auth/components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: '#0d0d0f' }}>
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
