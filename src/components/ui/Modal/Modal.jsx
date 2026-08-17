import { useEffect, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';
import Button from '@components/ui/Button/Button';

// ─────────────────────────────────────────────────────────────
//  Modal — Accessible dialog using Figma design tokens
// ─────────────────────────────────────────────────────────────

const VARIANT_CONFIG = {
  success: {
    icon:       <CheckCircle className="w-12 h-12 text-brand-primary" />,
    titleColor: 'text-brand-primary',
    iconBg:     'bg-brand-primary/10 border border-brand-primary/30',
  },
  error: {
    icon:       <XCircle className="w-12 h-12 text-red-400" />,
    titleColor: 'text-red-400',
    iconBg:     'bg-red-600/10 border border-red-600/30',
  },
  warning: {
    icon:       <AlertTriangle className="w-12 h-12 text-amber-400" />,
    titleColor: 'text-amber-400',
    iconBg:     'bg-amber-600/10 border border-amber-600/30',
  },
  info: {
    icon:       <Info className="w-12 h-12 text-brand-accent" />,
    titleColor: 'text-brand-accent',
    iconBg:     'bg-brand-accent/10 border border-brand-accent/30',
  },
};

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  variant = 'info',
  confirmLabel = 'OK',
  cancelLabel,
  onConfirm,
  isLoading = false,
}) {
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.info;

  const handleKeyDown = useCallback(
    (e) => { if (e.key === 'Escape' && isOpen) onClose?.(); },
    [isOpen, onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? 'modal-description' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-bg/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative glass-card w-full max-w-md p-8 animate-slide-up text-center">
        {/* Close */}
        <button
          id="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-brand-muted/60 hover:text-brand-light transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 mx-auto ${config.iconBg}`}>
          {config.icon}
        </div>

        {/* Title */}
        <h2 id="modal-title" className={`text-2xl font-bold mb-3 ${config.titleColor}`}>
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p id="modal-description" className="text-brand-muted text-sm leading-relaxed mb-8">
            {description}
          </p>
        )}

        {/* Actions */}
        <div className={`flex gap-3 ${cancelLabel ? 'flex-row' : 'flex-col'}`}>
          <Button
            id="modal-confirm-btn"
            fullWidth
            variant={variant === 'error' ? 'danger' : 'primary'}
            onClick={onConfirm || onClose}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
          {cancelLabel && (
            <Button
              id="modal-cancel-btn"
              fullWidth
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
