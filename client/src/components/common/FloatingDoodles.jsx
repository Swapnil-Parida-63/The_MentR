import { memo } from 'react';

/**
 * High-definition hand-drawn educational doodles for TheMentR.
 * Fills negative/empty space with playful, premium brand personality.
 */
export const DOODLE_SVGS = {
  paperPlane: (
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M 5 65 C 25 35, 55 70, 75 25" stroke="currentColor" strokeWidth="1.8" strokeDasharray="4 4" strokeLinecap="round" />
      <path d="M 72 25 L 95 15 L 85 38 L 80 28 Z" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M 80 28 L 95 15" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),

  bulb: (
    <svg viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <circle cx="30" cy="25" r="16" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.12" />
      <path d="M 23 41 H 37 M 25 46 H 35 M 27 51 H 33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="5" x2="30" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="10" x2="49" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="10" x2="11" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="25" x2="55" y2="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="25" x2="5" y2="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  cap: (
    <svg viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M 8 22 L 35 10 L 62 22 L 35 34 Z" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 18 27 L 18 38 C 18 45 52 45 52 38 L 52 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 57 23 L 57 42 C 57 44 59 46 61 44 L 61 38" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),

  book: (
    <svg viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M 8 18 C 20 10 32 12 35 18 C 38 12 50 10 62 18 L 62 44 C 50 36 38 38 35 44 C 32 38 20 36 8 44 Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <line x1="35" y1="18" x2="35" y2="44" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),

  atom: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <ellipse cx="30" cy="30" rx="26" ry="10" stroke="currentColor" strokeWidth="1.8" transform="rotate(30 30 30)" />
      <ellipse cx="30" cy="30" rx="26" ry="10" stroke="currentColor" strokeWidth="1.8" transform="rotate(-30 30 30)" />
      <circle cx="30" cy="30" r="4.5" fill="currentColor" />
    </svg>
  ),

  sparkle: (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M 25 2 Q 25 25 48 25 Q 25 25 25 48 Q 25 25 2 25 Q 25 25 25 2 Z" fill="currentColor" />
      <circle cx="40" cy="10" r="2.5" fill="currentColor" />
      <circle cx="10" cy="40" r="2" fill="currentColor" />
    </svg>
  ),

  aPlus: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
      <text x="14" y="38" fontFamily="var(--font-hero, sans-serif)" fontSize="24" fontWeight="800" fill="currentColor">A+</text>
    </svg>
  ),

  math: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <text x="6" y="28" fontFamily="var(--font-hero, sans-serif)" fontSize="26" fontWeight="bold" fill="currentColor">∑</text>
      <text x="32" y="52" fontFamily="var(--font-hero, sans-serif)" fontSize="24" fontWeight="bold" fill="currentColor">π</text>
    </svg>
  ),

  pencil: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M 12 48 L 10 50 L 16 48 L 46 18 L 42 14 L 12 44 Z" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M 42 14 L 46 10 C 48 8 51 8 53 10 L 53 10 C 55 12 55 15 53 17 L 49 21 L 42 14 Z" stroke="currentColor" strokeWidth="1.8" />
      <line x1="16" y1="40" x2="20" y2="44" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),

  magnify: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <circle cx="26" cy="26" r="18" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
      <line x1="39" y1="39" x2="54" y2="54" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  compass: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <circle cx="30" cy="30" r="24" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 3" />
      <polygon points="30,12 36,30 30,26 24,30" fill="currentColor" />
      <polygon points="30,48 36,30 30,34 24,30" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
      <circle cx="30" cy="30" r="3" fill="currentColor" />
    </svg>
  ),

  star: (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <polygon points="25,5 31,18 45,19 34,29 38,43 25,35 12,43 16,29 5,19 19,18" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.12" strokeLinejoin="round" />
    </svg>
  )
};

/**
 * Renders a cluster of floating educational doodles along the empty margins of any section or page.
 */
function FloatingDoodlesComponent({ items = [], className = '' }) {
  if (!items || items.length === 0) return null;

  return (
    <div 
      className={`floating-doodles-container ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1
      }}
      aria-hidden="true"
    >
      {items.map((item, idx) => {
        const SvgIcon = DOODLE_SVGS[item.type] || DOODLE_SVGS.sparkle;
        const size = item.size || 48;
        const color = item.color || '#4F7CFF';
        const opacity = item.opacity !== undefined ? item.opacity : 0.42;
        const rotate = item.rotate || 0;
        const animDuration = 4 + (idx % 4) * 1.5;

        return (
          <div
            key={`doodle-${idx}`}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              color: color,
              opacity: opacity,
              transform: `rotate(${rotate}deg)`,
              '--doodle-rot': `${rotate}deg`,
              filter: 'drop-shadow(0 2px 6px rgba(79, 124, 255, 0.06))',
              animation: `doodleFloat ${animDuration}s ease-in-out infinite alternate`,
              animationDelay: `${(idx * 0.4) % 3}s`,
              ...item.position
            }}
          >
            {SvgIcon}
          </div>
        );
      })}

      <style>{`
        @keyframes doodleFloat {
          0% { transform: translateY(0) rotate(var(--doodle-rot, 0deg)); }
          100% { transform: translateY(-10px) rotate(calc(var(--doodle-rot, 0deg) + 4deg)); }
        }
        @media (max-width: 768px) {
          .floating-doodles-container > div {
            opacity: 0.22 !important;
            transform: scale(0.75) rotate(var(--doodle-rot, 0deg)) !important;
          }
        }
      `}</style>
    </div>
  );
}

export const FloatingDoodles = memo(FloatingDoodlesComponent);
