import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, ArrowRight } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import registerPhoto from '../../../assets/photo-register.jpg';
import speedometerIcon from '../../../assets/speedometer.png';
import { ContactDetailsStep } from './ContactDetailsStep';
import { CreatePasswordStep } from './CreatePasswordStep';
import { CompleteProfileStep } from './CompleteProfileStep';
import { getAuthenticatedSession, loginWithGoogle, loginWithFacebook, registerUser } from '@features/auth/api/authApi';
import { loginWithFacebookSdk } from '@features/auth/utils/facebookSdk';
import { useAuth } from '@features/auth/hooks/useAuth';
import { REFRESH_TOKEN_KEY, ROUTES, TOKEN_KEY, USER_KEY } from '@config/constants';
import Alert from '@components/ui/Alert';

export default function RegisterForm({ onSubmit }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1
    firstName: '',
    lastName: '',
    userName: '',
    dateOfBirth: '',
    gender: 'Male',
    agreedToTerms: false,
    // Step 2
    phoneNumber: '',
    email: '',
    // Step 3
    password: '',
    confirmPassword: '',
    // Step 4
    position: 'Defender',
    skillLevel: 3,
    city: 'Cairo',
    favoriteSports: ['football'],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError('');
  };

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleStep1Next = (e) => {
    if (e) e.preventDefault();
    setServerError('');

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setServerError('Please enter your full first and last name.');
      return;
    }
    if (!formData.userName.trim()) {
      setServerError('Please enter a username.');
      return;
    }
    if (!formData.dateOfBirth.trim()) {
      setServerError('Please enter your date of birth (DD/MM/YYYY).');
      return;
    }
    if (!formData.agreedToTerms) {
      setServerError('You must agree to the Terms of Service and Privacy Policy to proceed.');
      return;
    }

    setCurrentStep(2);
  };

  const handleStep2Next = (e) => {
    if (e) e.preventDefault();
    setServerError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      setServerError('Please enter a valid email address (e.g. user@example.com).');
      return;
    }

    const cleanPhone = (formData.phoneNumber || '').replace(/[\s\-()]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setServerError('Please enter a valid phone number (at least 10 digits).');
      return;
    }

    setCurrentStep(3);
  };

  const handleStep3Next = (e) => {
    if (e) e.preventDefault();
    setServerError('');

    const pwd = formData.password || '';
    if (pwd.length < 8) {
      setServerError('Password must be at least 8 characters long.');
      return;
    }
    if (!/[A-Z]/.test(pwd)) {
      setServerError('Password must contain at least one uppercase letter (A-Z).');
      return;
    }
    if (!/[a-z]/.test(pwd)) {
      setServerError('Password must contain at least one lowercase letter (a-z).');
      return;
    }
    if (!/[0-9]/.test(pwd)) {
      setServerError('Password must contain at least one numeric digit (0-9).');
      return;
    }
    if (!/[^A-Za-z0-9]/.test(pwd)) {
      setServerError('Password must contain at least one special character (!@#$%...).');
      return;
    }
    if (pwd !== formData.confirmPassword) {
      setServerError('Passwords do not match. Please ensure both password fields match.');
      return;
    }

    setCurrentStep(4);
  };

  const handleFinalSubmit = async (e) => {
    if (e) e.preventDefault();
    setServerError('');

    if (formData.password !== formData.confirmPassword) {
      setServerError('Password and confirm password must match.');
      setCurrentStep(3);
      return;
    }

    const name = [formData.firstName, formData.lastName].filter(Boolean).join(' ').trim();
    const userData = {
      name: name || formData.userName,
      email: formData.email.trim(),
      password: formData.password,
      phone: formData.phoneNumber,
      role: 'Player',
    };

    setIsSubmitting(true);

    try {
      const response = await registerUser(userData);
      const { accessToken, refreshToken, user } = response;

      if (!accessToken) {
        throw new Error('Registration succeeded, but no access token was returned.');
      }

      if (!user) {
        throw new Error('Registration succeeded, but no user payload was returned.');
      }

      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      }

      login({ accessToken, refreshToken, user });
      if (onSubmit) onSubmit(formData);
      navigate(ROUTES.WELCOME, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true);
      setServerError('');
      try {
        let profile = {};
        try {
          const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          });
          if (res.ok) {
            profile = await res.json();
          }
        } catch {
          // ignore profile fetch errors
        }

        const authPayload = {
          token: tokenResponse.access_token,
          accessToken: tokenResponse.access_token,
          idToken: tokenResponse.id_token || tokenResponse.access_token,
          email: profile?.email,
          name: profile?.name,
          role: 'Player',
        };

        const response = await loginWithGoogle(authPayload);
        const session = getAuthenticatedSession(response, {
          email: profile?.email || 'google.user@example.com',
          name: profile?.name || 'Player',
          role: 'Player',
        });
        login(session);
        if (onSubmit) onSubmit(formData);
        navigate(ROUTES.HOME, { replace: true });
      } catch (err) {
        setServerError(err.message || 'Google registration failed. Please try again.');
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      setServerError('Google sign-in was cancelled or failed. Please try again.');
    },
  });

  const handleFacebookLogin = async () => {
    setIsFacebookLoading(true);
    setServerError('');
    try {
      const fbResult = await loginWithFacebookSdk({
        scope: 'public_profile,email',
        fields: 'name,email,picture',
      });
      const authPayload = {
        accessToken: fbResult.accessToken,
        token: fbResult.accessToken,
        userID: fbResult.userID,
        email: fbResult.email || fbResult.profile?.email,
        name: fbResult.name || fbResult.profile?.name,
        role: 'Player',
      };

      const response = await loginWithFacebook(authPayload);
      const session = getAuthenticatedSession(response, {
        email: fbResult.email || fbResult.profile?.email || 'facebook.user@example.com',
        name: fbResult.name || fbResult.profile?.name || 'Facebook Player',
        role: 'Player',
      });
      login(session);
      if (onSubmit) onSubmit(formData);
      navigate(ROUTES.HOME, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Facebook registration failed. Please try again.');
    } finally {
      setIsFacebookLoading(false);
    }
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
        {serverError && (
          <Alert
            variant="error"
            message={serverError}
            onClose={() => setServerError('')}
            className="mb-4"
          />
        )}

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

            <form onSubmit={handleStep1Next} className="space-y-3.5">
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
              <label className="flex items-start gap-2 rounded-xl border border-white/10 bg-[#1a1d24] px-3 py-2 text-xs leading-relaxed text-gray-300">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData((prev) => ({ ...prev, agreedToTerms: e.target.checked }))}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-white/20 bg-[#1a1d24] text-[#C8F13A] accent-[#C8F13A] focus:ring-[#C8F13A]"
                />
                <span>
                  I agree to the{' '}
                  <Link to="/legal?tab=terms" className="text-[#C8F13A] hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/legal?tab=privacy" className="text-[#C8F13A] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              <button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C8F13A] py-2.5 text-xs font-semibold text-black cursor-pointer">
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>

            {/* Social Options */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative bg-[#121519] px-2 text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                Or continue with
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                id="register-google-btn"
                onClick={() => handleGoogleLogin()}
                disabled={isGoogleLoading || isFacebookLoading || isSubmitting}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#2B323D] bg-[#181D24] py-2.5 px-3 text-xs font-medium text-white transition-all hover:border-gray-600 hover:bg-[#222832] cursor-pointer disabled:opacity-60"
              >
                {isGoogleLoading ? (
                  <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                )}
                <span>{isGoogleLoading ? 'Connecting...' : 'Google'}</span>
              </button>

              <button
                type="button"
                id="register-facebook-btn"
                onClick={() => handleFacebookLogin()}
                disabled={isFacebookLoading || isGoogleLoading || isSubmitting}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#2B323D] bg-[#181D24] py-2.5 px-3 text-xs font-medium text-white transition-all hover:border-gray-600 hover:bg-[#222832] cursor-pointer disabled:opacity-60"
              >
                {isFacebookLoading ? (
                  <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="h-4 w-4 fill-[#1877F2] shrink-0" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                )}
                <span>{isFacebookLoading ? 'Connecting...' : 'Facebook'}</span>
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-gray-400">
              Already have an account?{' '}
              <Link to={ROUTES.LOGIN} className="font-semibold text-[#C8F13A] hover:underline">
                Log In
              </Link>
            </p>
          </>
        )}

        {currentStep === 2 && (
          <ContactDetailsStep formData={formData} onChange={handleChange} onNext={handleStep2Next} />
        )}

        {currentStep === 3 && (
          <CreatePasswordStep formData={formData} onChange={handleChange} onNext={handleStep3Next} />
        )}

        {currentStep === 4 && (
          <CompleteProfileStep
            formData={formData}
            isSubmitting={isSubmitting}
            setFormData={setFormData}
            onSubmit={handleFinalSubmit}
          />
        )}
      </div>
    </div>
  );
}
