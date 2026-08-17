import DerbyLogo from '@components/ui/Logo/DerbyLogo';
import photoRegister from '@assets/photo-register.jpg';

// ─────────────────────────────────────────────────────────────
//  AuthLayout — Split-screen desktop layout (Figma tokens)
//  Left:  Hero panel with background image & Derby logo
//  Right: Form panel with #111317 background
// ─────────────────────────────────────────────────────────────

export default function AuthLayout({ children, heroContent, heroImage = photoRegister, heroLogo }) {
  return (
    <div className="min-h-screen bg-[#111317] text-brand-light flex items-center justify-center px-4 py-8 sm:px-6">
      <div className="w-full max-w-md lg:max-w-5xl bg-[#111317] border border-[#263230] rounded-2xl lg:rounded-3xl flex flex-col lg:flex-row items-stretch overflow-hidden shadow-2xl my-auto">

        {/* ── Left Hero Panel ──────────────────────────────── */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between min-h-[640px] border-r border-[#263230]">
          {/* Background image & gradient overlay */}
          <img
            src={heroImage}
            alt="Derby Hero Court"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-[#111317]/50 to-[#111317]/30" />

          {/* Top-left Overlay: Brand Logo */}
          <div className="relative z-10 p-8 lg:p-10">
            {heroLogo ?? <DerbyLogo />}
          </div>

          {/* Bottom Overlay: Text Content */}
          <div className="relative z-10 p-8 lg:p-10 space-y-2 text-left">
            {heroContent || (
              <div className="space-y-3">
                <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  Elevate Your Game.
                </h1>
                <p className="text-gray-300 text-sm lg:text-base font-normal max-w-md leading-relaxed">
                  Join the elite community of urban athletes. Book premium courts, find matches, and manage your schedule effortlessly.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Right Form Panel ─────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-center items-center py-8 lg:py-12 px-6 sm:px-8 lg:px-12 bg-[#111317]">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center mb-8">
            <DerbyLogo />
          </div>

          <div className="w-full max-w-[440px] animate-slide-up">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}

