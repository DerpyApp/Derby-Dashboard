import OTPForm from '@features/auth/components/OTPForm';
import logoImg from '@assets/logo.png';

export default function OtpPage() {
  return (
    <div className="min-h-screen bg-[#0d0f12] text-white flex flex-col font-sans">
      {/* Top Header Bar with DERBY Logo */}
      <header className="w-full px-8 py-5 border-b border-[#1c2128]/60 flex items-center bg-[#0d0f12]">
        <div className="flex items-center">
          <img src={logoImg} alt="Derby Logo" className="h-8 w-auto object-contain" />
        </div>
      </header>

      {/* Main Content Area - Centered Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <OTPForm />
      </main>
    </div>
  );
}
