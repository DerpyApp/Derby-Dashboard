import { forwardRef } from 'react';

// ─────────────────────────────────────────────────────────────
//  Input — Accessible form input using Figma design tokens
// ─────────────────────────────────────────────────────────────

const Input = forwardRef(function Input(
  {
    id,
    label,
    labelClassName = '',
    helperText,
    errorText,
    leftIcon,
    rightIcon,
    disabled = false,
    className = '',
    containerClassName = '',
    required,
    type = 'text',
    ...props
  },
  ref,
) {
  const hasError = Boolean(errorText);
  const inputId  = id || props.name;

  return (
    <div className={`w-full space-y-1.5 ${containerClassName}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-[11px] font-bold tracking-widest text-gray-400 uppercase font-mono ${labelClassName}`}
        >
          {label}
          {required && <span className="ml-1 text-[#C8F13A]">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative flex items-center">
        {/* Left icon */}
        {leftIcon && (
          <span className="absolute left-3.5 text-gray-300 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          className={[
            'input-base',
            leftIcon  ? 'pl-10' : '',
            rightIcon ? 'pr-10' : '',
            hasError  ? 'input-error' : '',
            disabled  ? 'opacity-50 cursor-not-allowed' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />

        {/* Right icon */}
        {rightIcon && (
          <span className="absolute right-3.5 text-gray-300 flex items-center justify-center">
            {rightIcon}
          </span>
        )}
      </div>

      {/* Error text */}
      {hasError && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="text-xs text-red-400 flex items-center gap-1 animate-fade-in"
        >
          <svg viewBox="0 0 16 16" className="w-3 h-3 shrink-0 fill-current">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.75 3.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5zm.75 6.5a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
          </svg>
          {errorText}
        </p>
      )}

      {/* Helper text */}
      {!hasError && helperText && (
        <p id={`${inputId}-helper`} className="text-xs text-brand-muted/60">
          {helperText}
        </p>
      )}
    </div>
  );
});

export default Input;
