import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';

import { verifyOTP, sendOTP } from '@features/auth/api/authApi';
import { useOTPCountdown }    from '@features/auth/hooks/useOTPCountdown';
import { ROUTES }             from '@config/constants';

import OTPInput from '@components/ui/OTPInput/OTPInput';
import Button   from '@components/ui/Button/Button';

export default function OTPForm() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const email     = location.state?.email || '';

  const [digits,      setDigits]      = useState(Array(6).fill(''));
  const [serverError, setServerError] = useState('');
  const [isLoading,   setIsLoading]   = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendMsg,   setResendMsg]   = useState('');

  const { formatted, isExpired, restart } = useOTPCountdown(60);

  const otp = digits.join('');
  const isFilled = otp.length === 6;

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isFilled) return;

    setIsLoading(true);
    setServerError('');
    try {
      const response = await verifyOTP({ email, otp });
      navigate(ROUTES.RESET_PASSWORD, {
        state: { email, resetToken: response.resetToken },
      });
    } catch (err) {
      setServerError(err.message || 'Invalid OTP. Please check and try again.');
      setDigits(Array(6).fill(''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setServerError('');
    setResendMsg('');
    try {
      await sendOTP({ email });
      restart();
      setResendMsg('A new OTP has been sent to your email.');
      setDigits(Array(6).fill(''));
    } catch (err) {
      setServerError(err.message || 'Failed to resend OTP.');
    } finally {
      setIsResending(false);
    }
  };

  // Guard: if no email in state, redirect back
  if (!email) {
    return (
      <div className="text-center space-y-4">
        <p className="text-brand-muted">Session expired. Please start again.</p>
        <Link
          to={ROUTES.FORGOT_PASSWORD}
          className="text-brand-primary hover:text-brand-secondary font-semibold text-sm"
        >
          ← Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1.5">
        <h2 className="text-3xl font-bold text-brand-light">Check your inbox</h2>
        <p className="text-brand-muted text-sm">
          We sent a 6-digit code to{' '}
          <span className="text-brand-light font-medium">{email}</span>
        </p>
      </div>

      {/* Server error */}
      {serverError && (
        <div
          role="alert"
          className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm animate-fade-in"
        >
          <span className="shrink-0">⚠️</span>
          {serverError}
        </div>
      )}

      {/* Resend success */}
      {resendMsg && !serverError && (
        <div
          role="status"
          className="flex items-center gap-3 p-4 bg-brand-primary/10 border border-brand-primary/30 rounded-xl text-brand-primary text-sm animate-fade-in"
        >
          ✓ {resendMsg}
        </div>
      )}

      {/* OTP Input */}
      <form onSubmit={handleVerify} className="space-y-8">
        <div className="space-y-3">
          <OTPInput
            value={digits}
            onChange={setDigits}
            hasError={Boolean(serverError)}
            disabled={isLoading}
          />

          {/* Countdown */}
          <p className="text-center text-xs text-brand-muted/70">
            {isExpired ? (
              <span className="text-red-400">Code expired</span>
            ) : (
              <>
                Code expires in{' '}
                <span className="text-brand-light font-mono font-semibold tabular-nums">
                  {formatted}
                </span>
              </>
            )}
          </p>
        </div>

        <Button
          id="otp-verify-btn"
          type="submit"
          fullWidth
          size="lg"
          isLoading={isLoading}
          disabled={!isFilled}
        >
          Verify Code
        </Button>
      </form>

      {/* Resend */}
      <div className="text-center space-y-2">
        <p className="text-sm text-brand-muted">Didn't receive the code?</p>
        <Button
          id="otp-resend-btn"
          variant="ghost"
          size="sm"
          onClick={handleResend}
          isLoading={isResending}
          disabled={!isExpired && !isResending}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          {isExpired ? 'Resend code' : `Resend available in ${formatted}`}
        </Button>
      </div>

      {/* Back */}
      <p className="text-center text-sm text-brand-muted">
        <Link
          to={ROUTES.FORGOT_PASSWORD}
          id="otp-back-link"
          className="text-brand-primary hover:text-brand-secondary font-semibold transition-colors"
        >
          ← Use different email
        </Link>
      </p>
    </div>
  );
}
