import { Trophy, Zap, Shield } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
//  AuthHeroCard — Left-panel hero content (Figma tokens)
// ─────────────────────────────────────────────────────────────

const features = [
  {
    icon:  <Zap    className="w-5 h-5 text-brand-primary" />,
    title: 'Instant Booking',
    desc:  'Reserve your court in under 30 seconds. No phone calls, no waiting.',
  },
  {
    icon:  <Shield className="w-5 h-5 text-brand-accent" style={{ filter: 'brightness(2)' }} />,
    title: 'Secure Payments',
    desc:  'Bank-grade encryption protects every transaction.',
  },
  {
    icon:  <Trophy className="w-5 h-5 text-amber-400" />,
    title: 'Verified Courts',
    desc:  'Every facility is reviewed and rated by real players.',
  },
];

export default function AuthHeroCard() {
  return (
    <div className="w-full max-w-md mx-auto space-y-10 text-left">
      {/* Headline */}
      <div className="space-y-3">
        <h1 className="text-5xl font-black text-brand-light leading-tight">
          Your Game.<br />
          <span className="gradient-text">Your Court.</span><br />
          Your Rules.
        </h1>
        <p className="text-brand-muted text-base leading-relaxed">
          Derpy connects athletes with the best sports facilities. Book, play, repeat.
        </p>
      </div>

      {/* Feature list */}
      <div className="space-y-4">
        {features.map(({ icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-surface/80 border border-brand-muted/20 flex items-center justify-center shrink-0 mt-0.5">
              {icon}
            </div>
            <div>
              <p className="font-semibold text-brand-light text-sm">{title}</p>
              <p className="text-brand-muted/70 text-xs leading-relaxed mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Social proof */}
      <div className="flex items-center gap-4 pt-2">
        <div className="flex -space-x-2">
          {['🏃', '🧘', '⛹️', '🤸'].map((emoji, i) => (
            <div
              key={i}
              className="w-9 h-9 rounded-full border-2 border-brand-bg flex items-center justify-center text-sm"
              style={{ background: 'linear-gradient(135deg, #C8F13A, #16436D)' }}
            >
              {emoji}
            </div>
          ))}
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-light">50,000+ Athletes</p>
          <p className="text-xs text-brand-muted/60">already playing with Derpy</p>
        </div>
      </div>
    </div>
  );
}
