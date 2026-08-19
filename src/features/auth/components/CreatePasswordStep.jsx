import { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const CreatePasswordStep = ({ formData, onChange, onNext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      {/* Header Info */}
      <div className="flex flex-col items-center text-center">
        {/* Shield / Security Icon */}
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1d24] border border-[#C8F13A]/20 shadow-lg shadow-[#C8F13A]/5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C8F13A] text-black font-bold">
            <Lock className="h-4 w-4" />
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mb-1.5 flex items-center justify-center gap-1.5">
          <span className="h-1 w-5 rounded-full bg-[#C8F13A]"></span>
          <span className="h-1 w-5 rounded-full bg-[#C8F13A]"></span>
          <span className="h-1 w-5 rounded-full bg-[#C8F13A]"></span>
          <span className="h-1 w-5 rounded-full bg-white/10"></span>
        </div>
        <p className="mb-4 font-mono text-[11px] text-gray-400">Step 3 of 4</p>

        <h1 className="text-xl font-bold tracking-wide text-white">Create Password</h1>
        <p className="mt-0.5 text-xs text-gray-400">Secure your account</p>
      </div>

      {/* Section Box */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-[#16191e] p-4">
        <div className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-[#C8F13A]">
          <Lock className="h-3.5 w-3.5" />
          <span className="uppercase font-mono">SECURITY</span>
        </div>

        {/* Form Fields */}
        <form onSubmit={onNext} className="space-y-3">
          {/* Password Input */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-[#16191e] px-1 text-[10px] font-mono text-gray-400">
              Password
            </label>
            <div className="flex items-center rounded-xl border border-white/15 bg-transparent px-3 py-2.5 transition-all focus-within:border-[#C8F13A]">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData?.password || ''}
                onChange={onChange}
                placeholder="••••••••"
                className="w-full bg-transparent text-xs text-white placeholder-gray-600 focus:outline-none font-mono"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-[#16191e] px-1 text-[10px] font-mono text-gray-400">
              Confirm Password
            </label>
            <div className="flex items-center rounded-xl border border-white/15 bg-transparent px-3 py-2.5 transition-all focus-within:border-[#C8F13A]">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData?.confirmPassword || ''}
                onChange={onChange}
                placeholder="••••••••"
                className="w-full bg-transparent text-xs text-white placeholder-gray-600 focus:outline-none font-mono"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C8F13A] py-3 text-xs font-semibold text-black transition-all hover:bg-[#b0d82d] active:scale-[0.99]"
          >
            <span>Continue</span>
            <ArrowRight className="h-4 w-4 text-black" />
          </button>
        </form>
      </div>
    </>
  );
};
