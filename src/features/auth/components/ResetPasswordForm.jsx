import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';

import { resetPasswordSchema } from '@features/auth/schemas/authSchemas';
import { resetPassword } from '@features/auth/api/authApi';
import { ROUTES } from '@config/constants';

import Input from '@components/ui/Input/Input';
import Button from '@components/ui/Button/Button';
import Modal from '@components/ui/Modal/Modal';
import Alert from '@components/ui/Alert';

function getStrength(password = '') {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const STRENGTH_LABELS = ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
const STRENGTH_COLORS = ['', 'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-brand-primary', 'bg-brand-primary'];

function PasswordStrengthMeter({ password }) {
  const score = getStrength(password);
  if (!password) return null;

  return (
    <div className="space-y-1.5 animate-fade-in">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              level <= score ? STRENGTH_COLORS[score] : 'bg-brand-surface'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${score >= 4 ? 'text-brand-primary' : score >= 3 ? 'text-amber-400' : 'text-red-400'}`}>
        {STRENGTH_LABELS[score]}
      </p>
    </div>
  );
}

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const resetToken = location.state?.resetToken || '';

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const newPasswordValue = watch('newPassword');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError('');
    try {
      await resetPassword({ email, resetToken, newPassword: data.newPassword });
      setSuccessModal(true);
    } catch (err) {
      setServerError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1.5">
          <h2 className="text-3xl font-bold text-brand-light">New password</h2>
          <p className="text-brand-muted text-sm">
            Choose a strong password to secure your account
          </p>
        </div>

        {/* Server error alert */}
        {serverError && (
          <Alert
            variant="error"
            message={serverError}
            onClose={() => setServerError('')}
          />
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div className="space-y-2">
            <Input
              id="reset-new-password"
              label="New password"
              type={showNew ? 'text' : 'password'}
              placeholder="••••••••"
              required
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  id="reset-toggle-new-password"
                  onClick={() => setShowNew((v) => !v)}
                  className="text-brand-muted/60 hover:text-brand-light transition-colors"
                  aria-label={showNew ? 'Hide password' : 'Show password'}
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              errorText={errors.newPassword?.message}
              {...register('newPassword')}
            />
            <PasswordStrengthMeter password={newPasswordValue} />
          </div>

          <Input
            id="reset-confirm-password"
            label="Confirm new password"
            type={showConfirm ? 'text' : 'password'}
            placeholder="••••••••"
            required
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button
                type="button"
                id="reset-toggle-confirm-password"
                onClick={() => setShowConfirm((v) => !v)}
                className="text-brand-muted/60 hover:text-brand-light transition-colors"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            errorText={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          {/* Password Requirements Card */}
          <div className="bg-[#1c222b] border border-[#263230] rounded-xl p-4 text-left space-y-2.5">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              PASSWORD REQUIREMENTS
            </p>
            <ul className="space-y-1.5">
              {[
                'At least 8 characters',
                'One uppercase letter (A–Z)',
                'One lowercase letter (a–z)',
                'One number (0–9)',
                'One special character (!@#$%...)',
              ].map((rule) => (
                <li key={rule} className="flex items-center gap-2 text-xs text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8F13A] shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <Button
            id="reset-submit-btn"
            type="submit"
            fullWidth
            size="lg"
            isLoading={isLoading}
            leftIcon={!isLoading && <ShieldCheck className="w-4 h-4" />}
            className="mt-2"
          >
            Reset password
          </Button>

          <div className="text-center pt-2">
            <Link
              to={ROUTES.LOGIN}
              id="reset-back-link"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Login
            </Link>
          </div>
        </form>
      </div>

      {/* Success modal */}
      <Modal
        isOpen={successModal}
        onClose={() => navigate(ROUTES.LOGIN)}
        onConfirm={() => navigate(ROUTES.LOGIN)}
        variant="success"
        title="Password Reset! 🔐"
        description="Your password has been successfully updated. You can now sign in with your new password."
        confirmLabel="Sign in"
      />
    </>
  );
}
