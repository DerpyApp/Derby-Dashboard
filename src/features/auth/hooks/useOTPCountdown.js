import { useState, useEffect, useRef, useCallback } from 'react';
import { OTP_RESEND_COOLDOWN_SECONDS } from '@config/constants';

// ─────────────────────────────────────────────────────────────
//  useOTPCountdown — Manages OTP resend cooldown timer
// ─────────────────────────────────────────────────────────────

/**
 * @param {number} initialSeconds  defaults to OTP_RESEND_COOLDOWN_SECONDS (60)
 * @returns {{ countdown: number, isExpired: boolean, restart: () => void }}
 */
export function useOTPCountdown(initialSeconds = OTP_RESEND_COOLDOWN_SECONDS) {
  const [countdown, setCountdown] = useState(initialSeconds);
  const intervalRef = useRef(null);

  const start = useCallback((seconds = initialSeconds) => {
    clearInterval(intervalRef.current);
    setCountdown(seconds);

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [initialSeconds]);

  // Auto-start on mount
  useEffect(() => {
    start();
    return () => clearInterval(intervalRef.current);
  }, [start]);

  const restart = useCallback(() => {
    start(initialSeconds);
  }, [start, initialSeconds]);

  const isExpired = countdown === 0;

  // Format as MM:SS
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return { countdown, formatted, isExpired, restart };
}
