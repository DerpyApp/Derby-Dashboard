import AuthLayout from '@components/layout/AuthLayout/AuthLayout';
import ResetPasswordForm from '@features/auth/components/ResetPasswordForm';
import logoImg from '@assets/logo.png';

function ResetHero() {
  return (
    <div className="w-full max-w-md mx-auto space-y-8 text-left">
      <div className="space-y-3">
        <div className="text-7xl">🔐</div>
        <h1 className="text-5xl font-black text-brand-light leading-tight">
          Set New<br />
          <span className="gradient-text">Password</span>
        </h1>
        <p className="text-brand-muted text-base leading-relaxed">
          Choose a strong password to keep your Derpy account safe.
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      heroLogo={<img src={logoImg} alt="Derby Logo" className="h-8 w-auto object-contain" />}
      heroContent={<ResetHero />}
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
