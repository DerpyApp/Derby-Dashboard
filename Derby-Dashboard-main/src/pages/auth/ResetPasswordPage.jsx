import AuthLayout       from '@components/layout/AuthLayout/AuthLayout';
import ResetPasswordForm from '@features/auth/components/ResetPasswordForm';

function ResetHero() {
  const rules = [
    'At least 8 characters',
    'One uppercase letter (A–Z)',
    'One lowercase letter (a–z)',
    'One number (0–9)',
    'One special character (!@#$…)',
  ];

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

      <div className="glass-card p-6 space-y-3">
        <p className="text-xs text-brand-muted/70 uppercase tracking-widest font-semibold">
          Password requirements
        </p>
        <ul className="space-y-2">
          {rules.map((rule) => (
            <li key={rule} className="flex items-center gap-2 text-sm text-brand-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout heroContent={<ResetHero />}>
      <ResetPasswordForm />
    </AuthLayout>
  );
}
