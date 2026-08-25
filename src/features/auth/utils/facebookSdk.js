import { FACEBOOK_APP_ID } from '@config/constants';

let fbInitPromise = null;

/**
 * Initializes the Facebook SDK dynamically.
 * Resolves with the window.FB object when ready.
 */
export const initFacebookSdk = (appId = FACEBOOK_APP_ID) => {
  if (typeof window === 'undefined') return Promise.resolve(null);

  if (window.FB) {
    return Promise.resolve(window.FB);
  }

  if (fbInitPromise) {
    return fbInitPromise;
  }

  fbInitPromise = new Promise((resolve) => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: String(appId),
        cookie: true,
        xfbml: true,
        version: 'v20.0',
      });
      resolve(window.FB);
    };

    // Load SDK script if not already present
    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.onerror = () => resolve(null);
      document.body.appendChild(script);
    }
  });

  return fbInitPromise;
};

/**
 * Triggers Facebook Login dialog via the official Facebook JS SDK.
 * Options: { scope: 'public_profile,email', fields: 'name,email,picture' }
 * Returns { accessToken, userID, profile, authResponse }
 */
export const loginWithFacebookSdk = async (options = {}) => {
  const config = typeof options === 'string' ? { scope: options } : options;
  const appId = config.appId || FACEBOOK_APP_ID;
  const rawScope = config.scope || 'public_profile,email';
  const rawFields = config.fields || 'name,email,picture';

  const FB = await initFacebookSdk(appId);

  if (!FB) {
    throw new Error('Failed to initialize Facebook SDK. Please check your internet connection or ad blocker.');
  }

  // Clean scope string: trim whitespace, ensure valid comma-separated format
  const cleanScope = rawScope
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .join(',');

  const cleanFields = rawFields
    .split(',')
    .map((f) => f.trim())
    .filter(Boolean)
    .join(',');

  const performLogin = (scopeToRequest) =>
    new Promise((resolve, reject) => {
      FB.login(
        (response) => {
          if (!response || !response.authResponse) {
            const errorMsg = response?.error?.message || response?.error_message || '';
            if (
              errorMsg.toLowerCase().includes('invalid scope') ||
              errorMsg.toLowerCase().includes('invalid scopes')
            ) {
              reject(new Error('INVALID_SCOPES'));
            } else if (response?.status === 'not_authorized') {
              reject(new Error('Facebook authorization was not granted.'));
            } else {
              reject(new Error('Facebook sign-in was cancelled or closed.'));
            }
            return;
          }

          const { accessToken, userID } = response.authResponse;

          // Fetch user profile from Graph API with explicitly configured fields
          FB.api(
            '/me',
            { fields: cleanFields },
            (profile) => {
              resolve({
                accessToken,
                token: accessToken,
                userID,
                profile: profile || {},
                email: profile?.email || '',
                name: profile?.name || '',
                authResponse: response.authResponse,
              });
            }
          );
        },
        { scope: scopeToRequest }
      );
    });

  try {
    return await performLogin(cleanScope);
  } catch (err) {
    // If Facebook rejected 'email' scope, gracefully fallback to 'public_profile'
    if (err.message === 'INVALID_SCOPES' && cleanScope.includes('email')) {
      try {
        return await performLogin('public_profile');
      } catch (fallbackErr) {
        throw fallbackErr;
      }
    }
    throw err;
  }
};
