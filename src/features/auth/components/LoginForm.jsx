import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

import { loginSchema } from '@features/auth/schemas/authSchemas';
import { loginUser } from '@features/auth/api/authApi';
import { useAuth } from '@features/auth/hooks/useAuth';
import { ROUTES } from '@config/constants';

import Input from '@components/ui/Input/Input';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError('');
    try {
      const response = await loginUser(data);
      login({ accessToken: response.accessToken, refreshToken: response.refreshToken, user: response.user });
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Welcome Back! 👋
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Log in to your account to continue booking your favorite courts.
        </p>
      </div>

      {/* Server error */}
      {serverError && (
        <div role="alert" className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm animate-fade-in">
          <span className="shrink-0">⚠️</span>
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Email or Username input */}
        <Input
          id="login-email"
          label="Email or Username"
          type="text"
          placeholder="Enter your email or username"
          required
          leftIcon={<User className="w-5 h-5 text-gray-400" />}
          errorText={errors.email?.message}
          {...register('email')}
        />

        {/* Password input */}
        <Input
          id="login-password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          required
          leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
          rightIcon={
            <button
              type="button"
              id="login-toggle-password"
              onClick={() => setShowPassword((v) => !v)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          }
          errorText={errors.password?.message}
          {...register('password')}
        />

        {/* Remember me & Forgot Password action row */}
        <div className="flex items-center justify-between pt-1 pb-1">
          <label htmlFor="login-remember-me" className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              id="login-remember-me"
              type="checkbox"
              className="w-4 h-4 rounded bg-[#181D24] border-[#2B323D] text-[#C8F13A] accent-[#C8F13A] focus:ring-0 cursor-pointer"
              {...register('rememberMe')}
            />
            <span className="text-sm text-gray-300">Remember me</span>
          </label>
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            id="login-forgot-link"
            className="text-sm font-semibold text-[#C8F13A] hover:underline transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Primary Button */}
        <button
          type="submit"
          id="login-submit-btn"
          disabled={isLoading}
          className="w-full py-3.5 px-4 bg-[#C8F13A] hover:bg-[#bce42f] text-[#111317] font-bold text-base rounded-xl shadow-[0_0_20px_rgba(200,241,58,0.25)] transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? (
            <span className="inline-block w-5 h-5 border-2 border-[#111317] border-t-transparent rounded-full animate-spin" />
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Social Options */}
      <div className="space-y-4 pt-2">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2B323D]" />
          </div>
          <div className="relative bg-[#111317] px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
            Or continue with
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2.5 py-3 px-4 bg-[#181D24] hover:bg-[#222832] border border-[#2B323D] hover:border-gray-600 rounded-xl text-white text-sm font-medium transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2.5 py-3 px-4 bg-[#181D24] hover:bg-[#222832] border border-[#2B323D] hover:border-gray-600 rounded-xl text-white text-sm font-medium transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Facebook</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-400 pt-2">
        Don't have an account?{' '}
        <Link
          to={ROUTES.REGISTER}
          id="login-register-link"
          className="text-[#C8F13A] hover:underline font-semibold transition-colors"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
