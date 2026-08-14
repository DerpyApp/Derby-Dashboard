import { useRef, useCallback } from 'react';
import { OTP_LENGTH } from '@config/constants';

// ─────────────────────────────────────────────────────────────
//  OTPInput — Multi-digit input with auto-focus & paste support
// ─────────────────────────────────────────────────────────────

/**
 * @param {Object} props
 * @param {string[]} props.value   - Array of digit strings, length === OTP_LENGTH
 * @param {Function} props.onChange - Called with full updated array
 * @param {boolean}  props.hasError
 * @param {boolean}  props.disabled
 */
export default function OTPInput({
  value,
  onChange,
  hasError = false,
  disabled = false,
  length = OTP_LENGTH,
}) {
  const inputsRef = useRef([]);

  const focusInput = (index) => {
    const el = inputsRef.current[index];
    if (el) el.focus();
  };

  const handleChange = useCallback(
    (e, index) => {
      const char = e.target.value.replace(/\D/g, '').slice(-1); // only last digit
      const next = [...value];
      next[index] = char;
      onChange(next);

      if (char && index < length - 1) {
        focusInput(index + 1);
      }
    },
    [value, onChange, length],
  );

  const handleKeyDown = useCallback(
    (e, index) => {
      if (e.key === 'Backspace') {
        if (value[index]) {
          // Clear current field
          const next = [...value];
          next[index] = '';
          onChange(next);
        } else if (index > 0) {
          // Move to previous field and clear it
          const next = [...value];
          next[index - 1] = '';
          onChange(next);
          focusInput(index - 1);
        }
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' && index > 0) {
        focusInput(index - 1);
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        focusInput(index + 1);
      }
    },
    [value, onChange, length],
  );

  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
      if (!text) return;
      const next = Array(length).fill('');
      text.split('').forEach((char, i) => {
        next[i] = char;
      });
      onChange(next);
      // Focus the last filled input or the next empty one
      const lastIndex = Math.min(text.length, length - 1);
      focusInput(lastIndex);
    },
    [onChange, length],
  );

  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <div
      className="flex items-center gap-3 justify-center"
      role="group"
      aria-label="One-time password input"
    >
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          id={`otp-input-${i}`}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          onFocus={handleFocus}
          disabled={disabled}
          aria-label={`Digit ${i + 1} of ${length}`}
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          className={[
            'otp-input',
            value[i] ? 'filled' : '',
            hasError ? '!border-red-500 !bg-red-500/10' : '',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      ))}
    </div>
  );
}
