import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

import { registerSchema } from '@features/auth/schemas/authSchemas';
import { registerUser } from '@features/auth/api/authApi';
import { ROUTES } from '@config/constants';

import Input from '@components/ui/Input/Input';
import Modal from '@components/ui/Modal/Modal';

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5 fill-[#1877F2] shrink-0" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError('');
    try {
      await registerUser(data);
      setSuccessModal(true);
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full text-left space-y-5">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Join the Community
          </h1>
          <p className="text-gray-400 text-sm font-normal leading-relaxed">
            Create your account to start playing, competing, and booking venues.
          </p>
        </div>

        {serverError && (
          <div role="alert" className="flex items-center gap-3 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm animate-fade-in">
            <span className="shrink-0">⚠️</span>
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3.5">
          <Input
            id="register-fullname"
            label="FULL NAME"
            placeholder="Enter your full name"
            required
            leftIcon={<User className="w-4 h-4 text-gray-300" />}
            errorText={errors.fullName?.message}
            {...register('fullName')}
          />

          <Input
            id="register-email"
            label="EMAIL ADDRESS"
            type="email"
            placeholder="Enter your email"
            required
            leftIcon={<Mail className="w-4 h-4 text-gray-300" />}
            errorText={errors.email?.message}
            {...register('email')}
          />

          <Input
            id="register-phone"
            label="PHONE NUMBER"
            type="tel"
            placeholder="Enter your phone number"
            required
            leftIcon={<Phone className="w-4 h-4 text-gray-300" />}
            errorText={errors.phone?.message}
            {...register('phone')}
          />

          <Input
            id="register-password"
            label="PASSWORD"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            required
            leftIcon={<Lock className="w-4 h-4 text-gray-300" />}
            rightIcon={
              <button
                type="button"
                id="register-toggle-password"
                onClick={() => setShowPassword((v) => !v)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            errorText={errors.password?.message}
            {...register('password')}
          />

          <div className="pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                id="register-terms"
                className="w-4 h-4 rounded bg-[#181d24] border-[#2b323d] text-[#C8F13A] focus:ring-[#C8F13A] accent-[#C8F13A] cursor-pointer shrink-0"
                {...register('terms')}
              />
              <span className="text-xs text-gray-300">
                I agree to the{' '}
                <a href="#terms" className="text-[#C8F13A] hover:underline font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" className="text-[#C8F13A] hover:underline font-medium">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {errors.terms?.message && (
              <p className="text-xs text-red-400 mt-1">
                {errors.terms.message}
              </p>
            )}
          </div>

          <button
            id="register-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#C8F13A] hover:bg-[#b8e12a] active:bg-[#a8cf25] text-black font-bold text-base py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(200,241,58,0.3)] transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </>
            )}
          </button>
        </form>

        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-[#2b323d]" />
          <span className="flex-shrink mx-4 text-[11px] font-mono font-bold text-gray-400 tracking-widest uppercase">
            OR REGISTER WITH
          </span>
          <div className="flex-grow border-t border-[#2b323d]" />
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <button
            type="button"
            className="flex items-center justify-center gap-2.5 bg-[#181d24] hover:bg-[#202630] active:bg-[#14181f] border border-[#2b323d] text-white py-2.5 px-4 rounded-xl font-medium text-sm transition-colors cursor-pointer"
          >
            <GoogleIcon />
            <span>Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2.5 bg-[#181d24] hover:bg-[#202630] active:bg-[#14181f] border border-[#2b323d] text-white py-2.5 px-4 rounded-xl font-medium text-sm transition-colors cursor-pointer"
          >
            <FacebookIcon />
            <span>Facebook</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 pt-1">
          Already have an account?{' '}
          <Link
            to={ROUTES.LOGIN}
            id="register-login-link"
            className="text-[#C8F13A] hover:underline font-semibold transition-colors ml-1"
          >
            Log In
          </Link>
        </p>
      </div>

      <Modal
        isOpen={successModal}
        onClose={() => navigate(ROUTES.LOGIN)}
        onConfirm={() => navigate(ROUTES.LOGIN)}
        variant="success"
        title="Account Created! 🎉"
        description="Your Derpy account is ready. Sign in to start booking venues and competing."
        confirmLabel="Sign in now"
      />
    </>
  );
}
