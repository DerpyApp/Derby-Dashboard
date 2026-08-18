import { useState } from 'react';
import { User, Calendar, ArrowRight } from 'lucide-react';
import registerPhoto from '../../../assets/photo-register.jpg';
import speedometerIcon from '../../../assets/speedometer.png';
import { ContactDetailsStep } from './ContactDetailsStep';
import { CreatePasswordStep } from './CreatePasswordStep';

export default function RegisterForm({ onSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1
    firstName: '',
    lastName: '',
    userName: '',
    dateOfBirth: '',
    gender: 'Male',
    // Step 2
    phoneNumber: '',
    email: '',
    // Step 3
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleNextStep = (e) => {
    if (e) e.preventDefault();
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="flex w-full max-w-[960px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#121519]/90 shadow-2xl backdrop-blur-md md:flex-row">
      {/* Banner Left Side */}
      <div className="relative flex min-h-[350px] flex-1 flex-col justify-end p-8 md:min-h-[580px]">
        <img src={registerPhoto} alt="Derby Banner" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold tracking-wider text-white">DERBY</h2>
          <p className="mt-2 text-xs text-gray-300 max-w-[280px]">
            Elevate your game. Book elite venues and join a community of top-tier athletes.
          </p>
        </div>
      </div>

      {/* Right Side Form Dynamic */}
      <div className="flex flex-1 flex-col justify-center p-8 text-white">
        {currentStep === 1 && (
          <>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#C8F13A] p-2 shadow-lg">
                <img src={speedometerIcon} alt="Speedometer" className="h-full w-full object-contain" />
              </div>
              <div className="mb-1.5 flex items-center justify-center gap-1.5">
                <span className="h-1 w-5 rounded-full bg-[#C8F13A]"></span>
                <span className="h-1 w-5 rounded-full bg-white/10"></span>
                <span className="h-1 w-5 rounded-full bg-white/10"></span>
                <span className="h-1 w-5 rounded-full bg-white/10"></span>
              </div>
              <p className="mb-4 font-mono text-[11px] text-gray-400">Step 1 of 4</p>
              <h1 className="text-xl font-bold tracking-wide text-white">Personal Information</h1>
              <p className="mt-0.5 text-xs text-gray-400">Tell us about yourself</p>
            </div>

            <div className="mt-6 mb-4 border-b border-white/5 pb-2">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#C8F13A]">
                <User className="h-3.5 w-3.5" />
                <span>PERSONAL INFO</span>
              </div>
            </div>

            <form onSubmit={handleNextStep} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-2.5">
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required className="w-full rounded-xl border border-white/10 bg-[#1a1d24] px-3 py-2 text-xs text-white focus:border-[#C8F13A] focus:outline-none" />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required className="w-full rounded-xl border border-white/10 bg-[#1a1d24] px-3 py-2 text-xs text-white focus:border-[#C8F13A] focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="Username" required className="w-full rounded-xl border border-white/10 bg-[#1a1d24] px-3 py-2 text-xs text-white focus:border-[#C8F13A] focus:outline-none" />
                <div className="relative">
                  <input type="text" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="DD/MM/YYYY" required className="w-full rounded-xl border border-white/10 bg-[#1a1d24] px-3 py-2 pr-8 text-xs text-white focus:border-[#C8F13A] focus:outline-none" />
                  <Calendar className="absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-[#1a1d24] p-1">
                <button type="button" onClick={() => handleGenderSelect('Male')} className={`rounded-lg py-1.5 text-xs font-semibold ${formData.gender === 'Male' ? 'bg-[#C8F13A] text-black' : 'text-gray-400'}`}>Male</button>
                <button type="button" onClick={() => handleGenderSelect('Female')} className={`rounded-lg py-1.5 text-xs font-semibold ${formData.gender === 'Female' ? 'bg-[#C8F13A] text-black' : 'text-gray-400'}`}>Female</button>
              </div>
              <button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C8F13A] py-2.5 text-xs font-semibold text-black">
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </>
        )}

        {currentStep === 2 && (
          <ContactDetailsStep formData={formData} onChange={handleChange} onNext={handleNextStep} />
        )}

        {currentStep === 3 && (
          <CreatePasswordStep formData={formData} onChange={handleChange} onNext={handleNextStep} />
        )}
      </div>
    </div>
  );
}