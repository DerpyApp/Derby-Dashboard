import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@config/constants';

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#0d0f12] p-4 text-white overflow-hidden">
      {/* Background Radial Lime Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[#C8F13A]/20 blur-[120px] pointer-events-none" />

      {/* Main Content Card */}
      <div className="relative z-10 flex max-w-md flex-col items-center text-center">
        {/* Checkmark Circle Icon */}
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#1a1d24] border border-[#C8F13A]/30 shadow-lg shadow-[#C8F13A]/20">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C8F13A] text-black">
            <Check className="h-5 w-5 stroke-[3]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Welcome to <br />
          the Team, <br />
          Champion!
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-xs leading-relaxed text-gray-400 max-w-xs">
          Your account has been successfully created. You're now ready to book your first match and join the community.
        </p>

        {/* Back to Home Button */}
        <button
          onClick={handleBackToHome}
          className="mt-8 rounded-xl bg-[#C8F13A] px-8 py-3 text-xs font-bold text-black transition-all hover:bg-[#b0d82d] hover:shadow-lg hover:shadow-[#C8F13A]/20 active:scale-95"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
