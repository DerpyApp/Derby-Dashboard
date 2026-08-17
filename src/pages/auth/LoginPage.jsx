import AuthLayout from '@components/layout/AuthLayout/AuthLayout';
import LoginForm  from '@features/auth/components/LoginForm';
import photoLogin from '@assets/photo-login.jpg';
import logo      from '@assets/logo.png';

// ── Login-specific hero logo overlay (img tag, top-left of hero card) ──
function LoginHeroLogo() {
  return (
    <img
      src={logo}
      alt="Derby"
      className="h-8 w-auto object-contain"
      draggable={false}
    />
  );
}

function LoginHero() {
  return (
    <div className="space-y-3">
      <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
        Elevate Your Game.
      </h1>
      <p className="text-gray-300 text-sm lg:text-base font-normal max-w-md leading-relaxed">
        Join the elite community of urban athletes. Book premium courts, find matches, and manage your schedule effortlessly.
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout heroImage={photoLogin} heroContent={<LoginHero />} heroLogo={<LoginHeroLogo />}>
      <LoginForm />
    </AuthLayout>
  );
}


