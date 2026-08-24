// ─────────────────────────────────────────────────────────────
//  DerbyLogo — Speed-styled inline SVG brand logo
//  Icon: Green (#C8F13A) 'D' with motion-line strokes
//  Text: Bold italic white (#FEFEFE) "DERBY"
// ─────────────────────────────────────────────────────────────

export default function DerbyLogo({ className = '' }) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 160 34"
        height="32"
        width="auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Derby logo"
        className="h-8 w-auto"
      >
        {/* ── Speed-styled 'D' icon (green) ── */}
        {/* Motion lines – three decreasing horizontal bars to the left of D */}
        <line x1="0"  y1="10" x2="14" y2="10" stroke="#C8F13A" strokeWidth="3.2" strokeLinecap="round" />
        <line x1="3"  y1="17" x2="14" y2="17" stroke="#C8F13A" strokeWidth="3.2" strokeLinecap="round" />
        <line x1="6"  y1="24" x2="14" y2="24" stroke="#C8F13A" strokeWidth="3.2" strokeLinecap="round" />

        {/* Bold angular D glyph */}
        <path
          d="M17 5 H26 C34 5 40 11 40 17 C40 23 34 29 26 29 H17 Z
             M22 10 V24 H26 C31 24 35 21 35 17 C35 13 31 10 26 10 Z"
          fill="#C8F13A"
          fillRule="evenodd"
        />

        {/* ── "DERBY" text (white, bold italic) ── */}
        <text
          x="47"
          y="25"
          fontFamily="Arial Black, Arial, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="22"
          letterSpacing="3"
          fill="#FEFEFE"
        >
          DERBY
        </text>
      </svg>
    </div>
  );
}
