import { Phone, ArrowRight } from 'lucide-react';
import speedometerIcon from '../../../assets/speedometer.png';

export const ContactDetailsStep = ({ formData, onChange, onNext }) => {
  return (
    <>
      {/* Header Info */}
      <div className="flex flex-col items-center text-center">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#C8F13A] p-2 shadow-lg shadow-[#C8F13A]/10">
          <img src={speedometerIcon} alt="Speedometer" className="h-full w-full object-contain" />
        </div>

        {/* Step Indicator */}
        <div className="mb-1.5 flex items-center justify-center gap-1.5">
          <span className="h-1 w-5 rounded-full bg-[#C8F13A]"></span>
          <span className="h-1 w-5 rounded-full bg-[#C8F13A]"></span>
          <span className="h-1 w-5 rounded-full bg-white/10"></span>
          <span className="h-1 w-5 rounded-full bg-white/10"></span>
        </div>
        <p className="mb-4 font-mono text-[11px] text-gray-400">Step 2 of 4</p>

        <h1 className="text-xl font-bold tracking-wide text-white">Contact Details</h1>
        <p className="mt-0.5 text-xs text-gray-400">How can we reach you?</p>
      </div>

      {/* Section Subhead */}
      <div className="mt-6 mb-4 border-b border-white/5 pb-2">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-[#C8F13A]">
          <Phone className="h-3.5 w-3.5" />
          <span className="uppercase font-mono">CONTACT DETAILS</span>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={onNext} className="space-y-4">
        {/* Phone Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-mono text-gray-300">Phone Number</label>
          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#1a1d24] px-3 py-2.5 transition-all focus-within:border-[#C8F13A]">
            <div className="flex items-center gap-1.5 text-xs font-mono text-gray-300 cursor-pointer select-none">
              <span className="border border-dashed border-gray-500 px-1 py-0.5 text-[10px] text-gray-300">EG</span>
              <span>+20</span>
              <span className="text-[10px] text-gray-400">▼</span>
            </div>
            <div className="h-4 w-[1px] bg-gray-700"></div>
            <input
              type="tel"
              name="phoneNumber"
              value={formData?.phoneNumber || ''}
              onChange={onChange}
              placeholder="010023321333"
              className="w-full bg-transparent text-xs text-white placeholder-gray-600 focus:outline-none font-mono"
              required
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-mono text-gray-300">Email</label>
          <div className="flex items-center rounded-xl border border-white/10 bg-[#1a1d24] px-3 py-2.5 transition-all focus-within:border-[#C8F13A]">
            <input
              type="email"
              name="email"
              value={formData?.email || ''}
              onChange={onChange}
              placeholder="Enter your email address"
              className="w-full bg-transparent text-xs text-white placeholder-gray-600 focus:outline-none font-mono"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C8F13A] py-3 text-xs font-semibold text-black transition-all hover:bg-[#b0d82d] active:scale-[0.99]"
        >
          <span>Next</span>
          <ArrowRight className="h-4 w-4 text-black" />
        </button>
      </form>
    </>
  );
};
