import AuthLayout from '@components/layout/AuthLayout/AuthLayout';
import OTPForm    from '@features/auth/components/OTPForm';

function OTPHero() {
  return (
    <div className="w-full max-w-md mx-auto space-y-8 text-left">
      <div className="space-y-3">
        <div className="text-7xl">📬</div>
        <h1 className="text-5xl font-black text-brand-light leading-tight">
          Check Your<br />
          <span className="gradient-text">Inbox</span>
        </h1>
        <p className="text-brand-muted text-base leading-relaxed">
          A 6-digit verification code is on its way. Enter it within 60 seconds to continue.
        </p>
      </div>

      <div className="glass-card p-6 space-y-3">
        <p className="text-xs text-brand-muted/70 uppercase tracking-widest font-semibold">Tips</p>
        <ul className="space-y-2 text-sm text-brand-muted">
          <li className="flex items-start gap-2">
            <span className="text-brand-primary mt-0.5">•</span>
            Check your spam/junk folder if you don't see it
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-primary mt-0.5">•</span>
            The code expires in 60 seconds — request a new one if needed
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-primary mt-0.5">•</span>
            You can paste the code directly into the fields
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function OTPPage() {
  return (
    <AuthLayout heroContent={<OTPHero />}>
      <OTPForm />
    </AuthLayout>
  );
}
