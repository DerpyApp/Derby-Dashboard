import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const VARIANT_CONFIGS = {
  error: {
    containerClass: 'bg-red-500/10 border-red-500/30 text-red-300',
    iconClass: 'text-red-400',
    Icon: AlertCircle,
  },
  success: {
    containerClass: 'bg-[#C8F13A]/10 border-[#C8F13A]/30 text-lime-200',
    iconClass: 'text-[#C8F13A]',
    Icon: CheckCircle2,
  },
  warning: {
    containerClass: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    iconClass: 'text-amber-400',
    Icon: AlertTriangle,
  },
  info: {
    containerClass: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    iconClass: 'text-blue-400',
    Icon: Info,
  },
};

/**
 * @param {Object} props
 * @param {'error'|'success'|'warning'|'info'} [props.variant='error']
 * @param {string} [props.title]
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.message]
 * @param {() => void} [props.onClose]
 * @param {string} [props.className]
 */
export default function Alert({
  variant = 'error',
  title,
  children,
  message,
  onClose,
  className = '',
}) {
  const config = VARIANT_CONFIGS[variant] || VARIANT_CONFIGS.error;
  const { Icon, containerClass, iconClass } = config;
  const content = message || children;

  if (!content && !title) return null;

  return (
    <div
      role="alert"
      className={`relative flex items-start gap-3 p-3.5 rounded-xl border text-xs leading-relaxed transition-all animate-fade-in ${containerClass} ${className}`}
    >
      <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${iconClass}`} />
      <div className="flex-1 min-w-0">
        {title && <div className="font-semibold text-sm mb-0.5">{title}</div>}
        {content && <div className="break-words">{content}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-gray-400 hover:text-white transition-colors p-0.5 -mr-1 rounded-md"
          aria-label="Dismiss alert"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
