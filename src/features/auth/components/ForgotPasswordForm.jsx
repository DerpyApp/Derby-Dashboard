import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

import forgotIcon from '@assets/forgot-icon.png';
import Alert from '@components/ui/Alert';

import { forgotPasswordSchema } from '@features/auth/schemas/authSchemas';
import { sendOTP } from '@features/auth/api/authApi';
import { ROUTES } from '@config/constants';

// ─────────────────────────────────────────────────────────────
//  ForgotPasswordForm — matches reference image exactly
//  Card: dark #1a1f27, lime top-glow, left-aligned content
// ─────────────────────────────────────────────────────────────

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError('');
    setSuccessMessage('');
    try {
      const response = await sendOTP({ email: data.email });
      const successMsg = response?.message || 'OTP sent successfully to your email!';
      setSuccessMessage(successMsg);
      // Navigate to OTP form with email and success message in state
      navigate(ROUTES.OTP, {
        state: {
          email: data.email,
          successMessage: successMsg,
        },
      });
    } catch (err) {
      setServerError(err.message || 'Failed to send OTP to email. Please check your email and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* ── Outer card ──────────────────────────────────────────── */
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: '#1a1f27',
        border: '1px solid #2a3040',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
      }}
    >
      {/* ── Lime top-glow bar ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, #C8F13A 35%, #C8F13A 65%, transparent 100%)',
        }}
      />
      {/* Soft glow diffusion under the bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(to bottom, rgba(200,241,58,0.08) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Card body ──────────────────────────────────────────── */}
      <div className="relative px-7 py-8 space-y-5">

        {/* ── Reset icon badge (top-left, circular-arrow icon) ─── */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: 'rgba(200,241,58,0.10)',
            border: '1px solid rgba(200,241,58,0.22)',
          }}
        >
          <img src={forgotIcon} alt="Forgot Password Icon" className="w-6 h-6 object-contain" />
        </div>

        {/* ── Heading + subtitle ─────────────────────────────────── */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">
            Forgot Password?
          </h1>
          <p className="text-[13px] text-gray-400 leading-relaxed">
            No worries, enter your email address and we will send you an OTP to reset it.
          </p>
        </div>

        {/* ── Status Alerts ─────────────────────────────────────── */}
        {serverError && (
          <Alert
            variant="error"
            message={serverError}
            onClose={() => setServerError('')}
          />
        )}
        {successMessage && (
          <Alert
            variant="success"
            message={successMessage}
            onClose={() => setSuccessMessage('')}
          />
        )}

        {/* ── Form ───────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

          {/* Email Address field */}
          <div className="space-y-1.5">
            <label
              htmlFor="forgot-email"
              className="block text-[11px] font-semibold tracking-[0.12em] uppercase"
              style={{ color: '#8a9ab0' }}
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] pointer-events-none"
                style={{ color: '#8a9ab0' }}
              />
              <input
                id="forgot-email"
                type="email"
                placeholder="user@usergmail.com"
                autoComplete="email"
                className="w-full text-white text-sm placeholder-[#4a5568] outline-none transition-colors"
                style={{
                  background: '#111317',
                  border: errors.email ? '1px solid rgba(239,68,68,0.5)' : '1px solid #2a3040',
                  borderRadius: '10px',
                  padding: '10px 12px 10px 36px',
                }}
                onFocus={(e) => { if (!errors.email) e.target.style.borderColor = 'rgba(200,241,58,0.45)'; }}
                onBlur={(e)  => { if (!errors.email) e.target.style.borderColor = '#2a3040'; }}
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Send OTP button */}
          <button
            type="submit"
            id="forgot-submit-btn"
            disabled={isLoading}
            className="w-full font-bold text-[15px] rounded-xl transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            style={{
              background: '#C8F13A',
              color: '#111317',
              padding: '12px 0',
              boxShadow: '0 0 18px rgba(200,241,58,0.22)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#bce42f'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#C8F13A'; }}
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-[#111317] border-t-transparent rounded-full animate-spin" />
            ) : (
              'Send OTP →'
            )}
          </button>
        </form>

        {/* ── Back to Login ──────────────────────────────────────── */}
        <div className="text-center pt-1">
          <Link
            to={ROUTES.LOGIN}
            id="forgot-back-link"
            className="inline-flex items-center gap-1.5 text-[13px] transition-colors"
            style={{ color: '#8a9ab0' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#8a9ab0'; }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}
