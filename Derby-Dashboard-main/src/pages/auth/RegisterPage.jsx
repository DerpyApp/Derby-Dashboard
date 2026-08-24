import DerbyLogo from '@components/ui/Logo/DerbyLogo';
import RegisterForm from '@features/auth/components/RegisterForm';
import photoRegister from '@assets/photo-register.jpg';

function RegisterHero() {
  return (
    <div className="space-y-2">
      <h1 className="text-5xl lg:text-6xl font-black text-white tracking-wide uppercase leading-none">
        DERBY
      </h1>
      <p className="text-gray-200 text-sm font-normal max-w-md leading-relaxed">
        Elevate your game. Book elite venues and join a community of top-tier athletes.
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#111317] text-brand-light flex items-center justify-center p-6 lg:p-8">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-12 my-auto">

        {/* ── Left Hero Panel ──────────────────────────────── */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-[50%] relative overflow-hidden rounded-3xl flex-col justify-end shadow-2xl bg-[#111317] min-h-[640px] border border-[#2B323D]/40">
          {/* Background image & gradient overlay */}
          <img
            src={photoRegister}
            alt="Derby Hero Court"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-[#111317]/50 to-[#111317]/30" />

          {/* Bottom Overlay: Text Content */}
          <div className="relative z-10 p-8 lg:p-10 space-y-2 text-left">
            <RegisterHero />
          </div>
        </div>

        {/* ── Right Form Panel ─────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-center items-center py-6 px-4 sm:px-6 lg:px-8">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center mb-8">
            <DerbyLogo />
          </div>

          <div className="w-full max-w-[440px] animate-slide-up">
            <RegisterForm />
          </div>
        </div>

      </div>
    </div>
  );
}
