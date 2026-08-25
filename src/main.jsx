import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { AuthProvider } from '@app/providers/AuthContext';
import { GOOGLE_CLIENT_ID } from '@config/constants';
import App from './App.jsx';
import '@styles/globals.css';

// ─────────────────────────────────────────────────────────────
//  DOM Root Entry Point
// ─────────────────────────────────────────────────────────────
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);

