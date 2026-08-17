import logoImg from '@assets/logo.png';

// ─────────────────────────────────────────────────────────────
//  DerbyLogo — Brand logo using official static asset logo.png
// ─────────────────────────────────────────────────────────────

export default function DerbyLogo({ className = '' }) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={logoImg}
        alt="Derby Logo"
        className="h-8 w-auto object-contain"
        draggable={false}
      />
    </div>
  );
}
