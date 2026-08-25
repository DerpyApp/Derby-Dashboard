import { useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { verifyOTP, sendOTP } from '@features/auth/api/authApi';
import { ROUTES } from '@config/constants';
import Alert from '@components/ui/Alert';

export default function OTPForm({ email: defaultEmail = 'user@example.com' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || defaultEmail;

  const [otp, setOtp] = useState(['', '', '', '']);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [statusMsg, setStatusMsg] = useState(
    location.state?.successMessage || ''
  );

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value) && value !== '') return;

    const newOtp = [...otp];
    // Handle pasted content or multi-digit paste
    if (value.length > 1) {
      const pasted = value.slice(0, 4).split('');
      for (let i = 0; i < 4; i++) {
        newOtp[i] = pasted[i] || '';
      }
      setOtp(newOtp);
      const nextFocus = Math.min(pasted.length, 3);
      inputRefs[nextFocus].current?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);
    setServerError('');

    // Auto-advance
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 4) {
      setServerError('Please enter the complete 4-digit verification code.');
      return;
    }

    setIsLoading(true);
    setServerError('');
    setStatusMsg('');

    try {
      const response = await verifyOTP({ email, otp: code });
      const resetToken =
        response?.resetToken ||
        response?.token ||
        response?.data?.resetToken ||
        response?.data?.token ||
        '';

      navigate(ROUTES.RESET_PASSWORD, {
        state: { email, resetToken },
      });
    } catch (err) {
      setServerError(err.message || 'Invalid or expired OTP token. Please try again.');
      setOtp(['', '', '', '']);
      inputRefs[0].current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setServerError('');
    setStatusMsg('');

    try {
      const response = await sendOTP({ email });
      setStatusMsg(response?.message || 'A new verification code has been sent to your email.');
    } catch (err) {
      setServerError(err.message || 'Failed to resend verification code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] bg-[#16191e] border border-[#232830] rounded-2xl p-8 text-center shadow-2xl">
      {/* Centered Circular Mail Badge */}
      <div className="mx-auto mb-6 w-12 h-12 rounded-full bg-[#1c222b] border border-[#2b3340] flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8F13A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          <path d="m16 19 2 2 4-4" />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
        Verify Your Email
      </h1>

      {/* Subtitle */}
      <p className="text-[#8e98a5] text-xs leading-relaxed max-w-[300px] mx-auto mb-5">
        We've sent a 4-digit code to <span className="text-white font-medium">{email}</span>. Enter it below to continue.
      </p>

      {/* Alerts */}
      <div className="space-y-3 mb-5 text-left">
        {serverError && (
          <Alert
            variant="error"
            message={serverError}
            onClose={() => setServerError('')}
          />
        )}

        {statusMsg && (
          <Alert
            variant="success"
            message={statusMsg}
            onClose={() => setStatusMsg('')}
          />
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* 4 White Digit Input Boxes */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              id={`otp-input-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              disabled={isLoading}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-white text-gray-900 font-bold text-center text-xl rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-[#C8F13A] shadow-sm transition-all disabled:opacity-50"
              aria-label={`Digit ${index + 1} of 4`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          type="submit"
          id="otp-verify-btn"
          disabled={isLoading || otp.join('').length < 4}
          className="w-full font-bold text-sm py-3 px-4 rounded-xl bg-[#C8F13A] text-[#111317] hover:bg-[#bce42f] shadow-[0_0_16px_rgba(200,241,58,0.2)] transition-all flex items-center justify-center gap-2 mb-5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-[#111317] border-t-transparent rounded-full animate-spin" />
          ) : (
            'Verify Code →'
          )}
        </button>

        {/* Resend Link */}
        <div className="text-xs text-[#8e98a5] mb-4">
          Didn't receive the code?{' '}
          <button
            type="button"
            id="otp-resend-btn"
            disabled={isResending}
            onClick={handleResend}
            className="text-[#C8F13A] font-semibold hover:underline bg-transparent border-0 p-0 cursor-pointer disabled:opacity-50"
          >
            {isResending ? 'Sending...' : 'Resend Code'}
          </button>
        </div>

        {/* Back to Login Link */}
        <div>
          <Link
            to={ROUTES.LOGIN}
            id="otp-back-link"
            className="text-xs text-[#8e98a5] hover:text-white transition-colors inline-flex items-center gap-1"
          >
            ← Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
