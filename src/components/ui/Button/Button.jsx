import { forwardRef } from 'react';
import Spinner from '@components/ui/Spinner/Spinner';

// ─────────────────────────────────────────────────────────────
//  Button — Accessible, variant-driven button component
//  Uses Figma design tokens via brand-* Tailwind classes
// ─────────────────────────────────────────────────────────────

const VARIANT_CLASSES = {
  primary:
    'bg-brand-primary hover:bg-brand-secondary active:opacity-90 text-brand-bg font-semibold ' +
    'shadow-[0_0_20px_rgba(200,241,58,0.25)] hover:shadow-[0_0_28px_rgba(200,241,58,0.4)] ' +
    'focus-visible:ring-brand-primary',
  secondary:
    'bg-brand-surface hover:bg-brand-accent/40 active:opacity-90 text-brand-light ' +
    'border border-brand-muted/30 focus-visible:ring-brand-muted',
  ghost:
    'bg-transparent hover:bg-brand-surface active:opacity-80 text-brand-muted hover:text-brand-light ' +
    'focus-visible:ring-brand-muted',
  danger:
    'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white focus-visible:ring-red-500',
  outline:
    'bg-transparent border border-brand-primary text-brand-primary hover:bg-brand-primary/10 ' +
    'focus-visible:ring-brand-primary',
};

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2.5',
  xl: 'px-8 py-4 text-base rounded-2xl gap-3',
};

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className = '',
    type = 'button',
    ...props
  },
  ref,
) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      className={[
        'inline-flex items-center justify-center transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary,
        SIZE_CLASSES[size]       || SIZE_CLASSES.md,
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner size="sm" className="text-current" />
          <span>Loading…</span>
        </>
      ) : (
        <>
          {leftIcon  && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

export default Button;
