import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Premium colorful vector SVGs with complete viewBox safety and grounding
const illustrations = {
  teachers: (
    <svg width="150" height="130" viewBox="0 0 160 140" fill="none" style={{ overflow: 'visible', maxWidth: '100%' }}>
      <defs>
        <radialGradient id="teacher-glow" cx="60%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.32" />
          <stop offset="60%" stopColor="#BAE6FD" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="85" cy="70" r="60" fill="url(#teacher-glow)" />

      {/* Decorative dashed outer orbit */}
      <circle cx="80" cy="65" r="44" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.22" />

      {/* User Avatar */}
      <circle cx="80" cy="46" r="16" stroke="#0284C7" strokeWidth="2.5" fill="#FFFFFF" />
      <path
        d="M 48 94 C 48 76, 62 68, 80 68 C 98 68, 112 76, 112 94"
        stroke="#0284C7"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="#FFFFFF"
      />

      {/* Verification Checkmark Badge */}
      <g className="teach-badge" style={{ transformOrigin: '100px 62px', transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
        <circle cx="100" cy="62" r="12" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
        <path d="M 95 62 L 99 66 L 106 58" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Sparkles */}
      <path d="M 126 28 Q 126 34 132 34 Q 126 34 126 40 Q 126 34 120 34 Q 126 34 126 28 Z" fill="#38BDF8" />
      <path d="M 34 82 Q 34 87 39 87 Q 34 87 34 92 Q 34 87 29 87 Q 34 87 34 82 Z" fill="#818CF8" />
      <path d="M 136 68 Q 136 71 139 71 Q 136 71 136 74 Q 136 71 133 71 Q 136 71 136 68 Z" fill="#34D399" />
    </svg>
  ),

  assessment: (
    <svg width="125" height="115" viewBox="0 0 135 125" fill="none" style={{ overflow: 'visible', maxWidth: '100%' }}>
      <defs>
        <radialGradient id="assess-glow" cx="60%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#818CF8" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#C7D2FE" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="70" cy="62" r="52" fill="url(#assess-glow)" />

      {/* Clipboard */}
      <g className="assess-board" style={{ transition: 'transform 0.35s ease' }}>
        <rect x="34" y="18" width="50" height="72" rx="7" stroke="#6366F1" strokeWidth="2.4" fill="#FFFFFF" />

        {/* Clip top */}
        <path
          d="M 47 18 V 13 C 47 11.5 48.5 10 50.5 10 H 67.5 C 69.5 10 71 11.5 71 13 V 18"
          stroke="#6366F1"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="#FFFFFF"
        />

        {/* Checklist items */}
        <path d="M 43 36 L 46 39 L 51 33" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="56" y1="36" x2="74" y2="36" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />

        <path d="M 43 50 L 46 53 L 51 47" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="56" y1="50" x2="70" y2="50" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" opacity="0.65" />

        <path d="M 43 64 L 46 67 L 51 61" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="56" y1="64" x2="74" y2="64" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />

        <line x1="43" y1="76" x2="63" y2="76" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      </g>

      {/* Sparkles */}
      <path d="M 102 52 Q 102 57 107 57 Q 102 57 102 62 Q 102 57 97 57 Q 102 57 102 52 Z" fill="#F43F5E" />
      <path d="M 92 16 Q 92 19 95 19 Q 92 19 92 22 Q 92 19 89 19 Q 92 19 92 16 Z" fill="#60A5FA" />
    </svg>
  ),

  matching: (
    <svg width="180" height="130" viewBox="0 0 190 130" fill="none" style={{ overflow: 'visible', maxWidth: '100%' }}>
      <defs>
        <radialGradient id="matching-glow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.25" />
          <stop offset="45%" stopColor="#60A5FA" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="95" cy="65" rx="85" ry="58" fill="url(#matching-glow)" />

      {/* Left Student Avatar (Blue) */}
      <g className="match-person-left" style={{ transition: 'transform 0.35s ease' }}>
        <circle cx="36" cy="48" r="11" stroke="#0284C7" strokeWidth="2.5" fill="#FFFFFF" />
        <path d="M 16 86 C 16 73, 25 66, 36 66 C 47 66, 56 73, 56 86" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" fill="#FFFFFF" />
      </g>

      {/* Dashed connector line Left */}
      <path className="match-line-left" d="M 58 70 C 68 65, 70 65, 76 67" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />

      {/* Center TheMentR Logo Node */}
      <g className="match-center-node" style={{ transformOrigin: '95px 65px', transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
        <circle cx="95" cy="65" r="23" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" />
        <circle cx="95" cy="65" r="19" fill="rgba(2, 132, 199, 0.05)" />
        {/* Two dots above M */}
        <circle cx="88" cy="57" r="2.2" fill="#0284C7" />
        <circle cx="102" cy="57" r="2.2" fill="#0284C7" />
        {/* M Icon */}
        <path d="M 83 74 L 88 62 L 95 69 L 102 62 L 107 74" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Dashed connector line Right */}
      <path className="match-line-right" d="M 114 67 C 122 65, 124 65, 134 70" stroke="#7C3AED" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />

      {/* Right Mentor Avatar (Purple) */}
      <g className="match-person-right" style={{ transition: 'transform 0.35s ease' }}>
        <circle cx="154" cy="48" r="11" stroke="#7C3AED" strokeWidth="2.5" fill="#FFFFFF" />
        <path d="M 134 86 C 134 73, 143 66, 154 66 C 165 66, 174 73, 174 86" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" fill="#FFFFFF" />
      </g>

      {/* Yellow energy lightning accents */}
      <path d="M 158 26 L 162 33 L 158 35 L 163 43" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Pink accent sparks */}
      <line x1="24" y1="36" x2="18" y2="31" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="43" x2="11" y2="43" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  safe: (
    <svg width="125" height="115" viewBox="0 0 135 125" fill="none" style={{ overflow: 'visible', maxWidth: '100%' }}>
      <defs>
        <radialGradient id="safe-glow" cx="60%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#FB7185" stopOpacity="0.28" />
          <stop offset="60%" stopColor="#FECDD3" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="70" cy="62" r="52" fill="url(#safe-glow)" />

      {/* Shield Outline in Coral */}
      <path
        d="M 70 20 L 98 30 C 98 62, 83 82, 70 92 C 57 82, 42 62, 42 30 Z"
        stroke="#F43F5E"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="#FFFFFF"
      />

      {/* Lock in center */}
      <g className="safe-lock-icon" style={{ transformOrigin: '70px 56px', transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
        <rect x="60" y="50" width="20" height="16" rx="3.5" stroke="#F43F5E" strokeWidth="2.2" fill="#FFFFFF" />
        <path d="M 64 50 V 43 C 64 39.5 67 37 70 37 C 73 37 76 39.5 76 43 V 50" stroke="#F43F5E" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="70" cy="58" r="1.8" fill="#F43F5E" />
      </g>

      {/* Coral Sparkle Stars */}
      <path d="M 108 30 Q 108 35 113 35 Q 108 35 108 40 Q 108 35 103 35 Q 108 35 108 30 Z" fill="#F43F5E" />
      <path d="M 32 68 Q 32 72 36 72 Q 32 72 32 76 Q 32 72 28 72 Q 32 72 32 68 Z" fill="#FB7185" />
    </svg>
  ),

  board: (
    <svg width="125" height="115" viewBox="0 0 135 125" fill="none" style={{ overflow: 'visible', maxWidth: '100%' }}>
      <defs>
        <radialGradient id="board-glow" cx="60%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.28" />
          <stop offset="60%" stopColor="#BAE6FD" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="70" cy="62" r="52" fill="url(#board-glow)" />

      {/* Stack of Isometric Colorful Books */}
      <g transform="translate(5, 5)">
        {/* Book 3 - Bottom (Mint/Emerald) */}
        <g className="book-bottom">
          <path d="M 28 74 L 68 84 L 94 70 L 54 60 Z" fill="#ECFDF5" stroke="#10B981" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M 28 74 V 81 L 68 91 V 84 Z" fill="#10B981" stroke="#10B981" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 68 84 L 68 91 L 94 77 V 70 Z" fill="#059669" stroke="#059669" strokeWidth="1.5" strokeLinejoin="round" />
        </g>

        {/* Book 2 - Middle (Purple) */}
        <g className="book-mid" style={{ transition: 'transform 0.3s ease' }}>
          <path d="M 28 56 L 68 66 L 94 52 L 54 42 Z" fill="#F3E8FF" stroke="#7C3AED" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M 28 56 V 63 L 68 73 V 66 Z" fill="#7C3AED" stroke="#7C3AED" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 68 66 L 68 73 L 94 59 V 52 Z" fill="#6D28D9" stroke="#6D28D9" strokeWidth="1.5" strokeLinejoin="round" />
        </g>

        {/* Book 1 - Top (Blue) */}
        <g className="book-top" style={{ transition: 'transform 0.3s ease' }}>
          <path d="M 28 38 L 68 48 L 94 34 L 54 24 Z" fill="#EFF6FF" stroke="#0284C7" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M 28 38 V 45 L 68 55 V 48 Z" fill="#0284C7" stroke="#0284C7" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 68 48 L 68 55 L 94 41 V 34 Z" fill="#0369A1" stroke="#0369A1" strokeWidth="1.5" strokeLinejoin="round" />
        </g>
      </g>

      {/* Sparkles around books */}
      <line x1="22" y1="32" x2="16" y2="26" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="24" x2="26" y2="16" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      <path d="M 106 72 Q 106 76 110 76 Q 106 76 106 80 Q 106 76 102 76 Q 106 76 106 72 Z" fill="#10B981" />
    </svg>
  ),

  onetoone: (
    <svg width="180" height="130" viewBox="0 0 190 130" fill="none" style={{ overflow: 'visible', maxWidth: '100%' }}>
      <defs>
        <radialGradient id="onetoone-glow" cx="60%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#E9D5FF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="65" rx="85" ry="58" fill="url(#onetoone-glow)" />

      {/* Grounding desk baseline */}
      <line x1="18" y1="94" x2="165" y2="94" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" opacity="0.3" />

      {/* Tutor on Left (with laptop) */}
      <g className="tutor-figure" style={{ transition: 'transform 0.35s ease' }}>
        <circle cx="56" cy="46" r="12" stroke="#7C3AED" strokeWidth="2.5" fill="#FFFFFF" />
        <path d="M 32 94 C 32 76, 42 68, 56 68 C 70 68, 80 76, 80 94" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" fill="#FFFFFF" />
        {/* Laptop base & screen */}
        <path d="M 50 94 L 68 94" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 54 94 L 58 81 L 68 81" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Student on Right */}
      <g className="student-figure" style={{ transition: 'transform 0.35s ease' }}>
        <circle cx="126" cy="54" r="10" stroke="#7C3AED" strokeWidth="2.5" fill="#FFFFFF" />
        <path d="M 106 94 C 106 80, 114 74, 126 74 C 138 74, 146 80, 146 94" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" fill="#FFFFFF" />
      </g>

      {/* Glowing Idea Lightbulb above student */}
      <g className="one-bulb" style={{ transformOrigin: '126px 24px', transition: 'transform 0.3s ease, filter 0.3s ease' }}>
        {/* Light rays */}
        <line x1="126" y1="10" x2="126" y2="4" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="136" y1="14" x2="142" y2="9" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="116" y1="14" x2="110" y2="9" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />

        {/* Bulb circle & base */}
        <circle cx="126" cy="24" r="7" stroke="#F59E0B" strokeWidth="2.2" fill="#FEF3C7" />
        <path d="M 123 31 H 129" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Pink accent dashes on left */}
      <line x1="24" y1="46" x2="18" y2="42" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="54" x2="16" y2="58" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
};

export default function ServicesSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 960);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="services"
      style={{
        background: 'linear-gradient(180deg, #F0F4FF 0%, #F8FAFC 50%, #FFFFFF 100%)',
        padding: isMobile ? '56px 0' : '88px 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Soft ambient background blur circles */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '-5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(186, 230, 253, 0.35) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233, 213, 255, 0.35) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: isMobile ? '32px' : '48px' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 13,
              color: '#3B82F6',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: 10,
              background: 'rgba(59, 130, 246, 0.08)',
              padding: '4px 12px',
              borderRadius: 100
            }}
          >
            What We Offer
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-hero, var(--font-sans))',
              fontWeight: 800,
              fontSize: isMobile ? 'clamp(28px, 6vw, 36px)' : 'clamp(36px, 3.2vw, 46px)',
              lineHeight: 1.18,
              letterSpacing: '-0.025em',
              color: '#0F172A',
              margin: '0 0 12px'
            }}
          >
            Every advantage, built in.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 400,
              fontSize: 15,
              color: '#64748B',
              lineHeight: 1.6,
              maxWidth: '560px',
              margin: 0
            }}
          >
            Our integrated learning ecosystem harmonizes diagnosis, teacher verification, smart matching, and continuous accountability for complete peace of mind.
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* COLORFUL BENTO GRID (DESKTOP & MOBILE RESPONSIVE)             */}
        {/* ------------------------------------------------------------- */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '18px' : '22px'
          }}
        >
          {/* ========================================================= */}
          {/* CARD 1: Verified Teachers (Spans 2 Columns on Desktop)   */}
          {/* ========================================================= */}
          <motion.div
            onMouseEnter={() => setHoveredCard('teachers')}
            onMouseLeave={() => setHoveredCard(null)}
            className="bento-card card-teachers"
            style={{
              gridColumn: isMobile ? 'span 1' : 'span 2',
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1.2px solid rgba(186, 230, 253, 0.8)',
              boxShadow:
                hoveredCard === 'teachers'
                  ? '0 20px 35px -8px rgba(56, 189, 248, 0.2), 0 4px 12px -2px rgba(0, 0, 0, 0.03)'
                  : '0 8px 24px -4px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
              padding: isMobile ? '24px 20px' : '28px 32px',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              minHeight: isMobile ? 'auto' : 220,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transform: hoveredCard === 'teachers' ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Soft Cyan Mesh Glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: isMobile ? '100%' : '55%',
                background: 'radial-gradient(ellipse at 80% 50%, rgba(186, 230, 253, 0.45) 0%, rgba(224, 242, 254, 0.2) 50%, transparent 80%)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            {/* Left Content */}
            <div style={{ flex: 1, minWidth: isMobile ? '100%' : '55%', zIndex: 1, marginBottom: isMobile ? 16 : 0 }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 20, color: '#0F172A', margin: '0 0 6px' }}>
                Verified Teachers
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 14, color: '#64748B', lineHeight: 1.45, margin: '0 0 16px' }}>
                Every teacher passes our multi-stage verification process.
              </p>

              {/* Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Identity Verification', 'Demo Class & Knowledge Test', 'Continuous Reviews'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, fontWeight: 600, color: '#1E293B' }}>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: '#10B981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: 11,
                        fontWeight: 800,
                        flexShrink: 0
                      }}
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Graphic */}
            <div
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '100%' : 160,
                height: 130,
                zIndex: 1
              }}
            >
              <motion.div animate={{ y: hoveredCard === 'teachers' ? -4 : 0 }} transition={{ duration: 0.35 }}>
                {illustrations.teachers}
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* CARD 2: Assessment First (Spans 1 Column on Desktop)      */}
          {/* ========================================================= */}
          <motion.div
            onMouseEnter={() => setHoveredCard('assessment')}
            onMouseLeave={() => setHoveredCard(null)}
            className="bento-card card-assessment"
            style={{
              gridColumn: 'span 1',
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1.2px solid rgba(199, 210, 254, 0.8)',
              boxShadow:
                hoveredCard === 'assessment'
                  ? '0 20px 35px -8px rgba(129, 140, 248, 0.2), 0 4px 12px -2px rgba(0, 0, 0, 0.03)'
                  : '0 8px 24px -4px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
              padding: isMobile ? '24px 20px' : '28px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: isMobile ? 'auto' : 220,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transform: hoveredCard === 'assessment' ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Soft Lavender Mesh Glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '75%',
                background: 'radial-gradient(ellipse at 85% 50%, rgba(224, 231, 255, 0.55) 0%, rgba(238, 242, 255, 0.2) 50%, transparent 80%)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            <div style={{ zIndex: 1, width: '100%' }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 20, color: '#0F172A', margin: '0 0 6px' }}>
                Assessment First
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 14, color: '#64748B', lineHeight: 1.45, margin: '0 0 14px' }}>
                We analyze learning gaps before match starts.
              </p>

              {/* Step indicator flow */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#4F46E5',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 700
                    }}
                  >
                    1
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>Evaluate</span>
                </div>

                <span style={{ color: '#818CF8', fontWeight: 700, margin: '0 2px' }}>→</span>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#6366F1',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 700
                    }}
                  >
                    2
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>Map</span>
                </div>
              </div>
            </div>

            {/* Illustration placement */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
                height: 110,
                marginTop: 6,
                zIndex: 1
              }}
            >
              <motion.div animate={{ y: hoveredCard === 'assessment' ? -4 : 0 }} transition={{ duration: 0.35 }}>
                {illustrations.assessment}
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* CARD 3: Personalized Matching (Spans 2 Columns on Desktop) */}
          {/* ========================================================= */}
          <motion.div
            onMouseEnter={() => setHoveredCard('matching')}
            onMouseLeave={() => setHoveredCard(null)}
            className="bento-card card-matching"
            style={{
              gridColumn: isMobile ? 'span 1' : 'span 2',
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1.2px solid rgba(167, 243, 208, 0.7)',
              boxShadow:
                hoveredCard === 'matching'
                  ? '0 22px 40px -8px rgba(52, 211, 153, 0.2), 0 4px 12px -2px rgba(0, 0, 0, 0.03)'
                  : '0 8px 24px -4px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
              padding: isMobile ? '24px 20px' : '28px 32px',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              minHeight: isMobile ? 'auto' : 240,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transform: hoveredCard === 'matching' ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Mint / Cyan Mesh Glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: isMobile ? '100%' : '60%',
                background: 'radial-gradient(ellipse at 80% 50%, rgba(167, 243, 208, 0.4) 0%, rgba(186, 230, 253, 0.25) 50%, transparent 80%)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            {/* Left Content */}
            <div style={{ flex: 1, minWidth: isMobile ? '100%' : '55%', zIndex: 1, marginBottom: isMobile ? 16 : 0 }}>
              {/* Badge Tag */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 10px',
                  borderRadius: 100,
                  background: 'rgba(2, 132, 199, 0.08)',
                  border: '1px solid rgba(2, 132, 199, 0.15)',
                  marginBottom: 10
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontSize: 10, fontWeight: 800, color: '#0284C7', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  FEATURED MATCH PRIORITY
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 20, color: '#0F172A', margin: '0 0 6px' }}>
                Personalized Matching
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 14, color: '#64748B', lineHeight: 1.45, margin: '0 0 16px' }}>
                We align board expertise, teaching style, and student personality parameters to ensure the best match for your child.
              </p>

              {/* Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 650,
                    color: '#1D4ED8',
                    background: '#EFF6FF',
                    border: '1px solid #DBEAFE',
                    padding: '5px 12px',
                    borderRadius: 8
                  }}
                >
                  Board Alignment
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 650,
                    color: '#7E22CE',
                    background: '#FAF5FF',
                    border: '1px solid #F3E8FF',
                    padding: '5px 12px',
                    borderRadius: 8
                  }}
                >
                  Synergy Index 98.4%
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 650,
                    color: '#15803D',
                    background: '#F0FDF4',
                    border: '1px solid #DCFCE7',
                    padding: '5px 12px',
                    borderRadius: 8
                  }}
                >
                  Pedagogical Fit
                </span>
              </div>
            </div>

            {/* Right Graphic */}
            <div
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '100%' : 180,
                height: 130,
                zIndex: 1
              }}
            >
              <motion.div animate={{ y: hoveredCard === 'matching' ? -4 : 0 }} transition={{ duration: 0.35 }}>
                {illustrations.matching}
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* CARD 4: Safe Learning (Spans 1 Column on Desktop)         */}
          {/* ========================================================= */}
          <motion.div
            onMouseEnter={() => setHoveredCard('safe')}
            onMouseLeave={() => setHoveredCard(null)}
            className="bento-card card-safe"
            style={{
              gridColumn: 'span 1',
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1.2px solid rgba(254, 205, 211, 0.8)',
              boxShadow:
                hoveredCard === 'safe'
                  ? '0 20px 35px -8px rgba(251, 113, 133, 0.2), 0 4px 12px -2px rgba(0, 0, 0, 0.03)'
                  : '0 8px 24px -4px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
              padding: isMobile ? '24px 20px' : '28px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: isMobile ? 'auto' : 240,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transform: hoveredCard === 'safe' ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Soft Peach / Coral Mesh Glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '75%',
                background: 'radial-gradient(ellipse at 85% 50%, rgba(254, 226, 226, 0.55) 0%, rgba(255, 237, 213, 0.3) 50%, transparent 80%)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            <div style={{ zIndex: 1, width: '100%' }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 20, color: '#0F172A', margin: '0 0 6px' }}>
                Safe Learning
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 14, color: '#64748B', lineHeight: 1.45, margin: '0 0 16px' }}>
                Complete transparency and peace of mind.
              </p>

              {/* Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Background Vetted', 'Lesson Log Transparency'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, fontWeight: 600, color: '#1E293B' }}>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: '#FFE4E6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#E11D48',
                        fontSize: 11,
                        fontWeight: 800,
                        flexShrink: 0
                      }}
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Illustration placement */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
                height: 110,
                marginTop: 6,
                zIndex: 1
              }}
            >
              <motion.div animate={{ y: hoveredCard === 'safe' ? -4 : 0 }} transition={{ duration: 0.35 }}>
                {illustrations.safe}
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* CARD 5: Board Flexibility (Spans 1 Column on Desktop)     */}
          {/* ========================================================= */}
          <motion.div
            onMouseEnter={() => setHoveredCard('board')}
            onMouseLeave={() => setHoveredCard(null)}
            className="bento-card card-board"
            style={{
              gridColumn: 'span 1',
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1.2px solid rgba(186, 230, 253, 0.8)',
              boxShadow:
                hoveredCard === 'board'
                  ? '0 20px 35px -8px rgba(56, 189, 248, 0.2), 0 4px 12px -2px rgba(0, 0, 0, 0.03)'
                  : '0 8px 24px -4px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
              padding: isMobile ? '24px 20px' : '28px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: isMobile ? 'auto' : 240,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transform: hoveredCard === 'board' ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Soft Sky Blue Mesh Glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '75%',
                background: 'radial-gradient(ellipse at 85% 50%, rgba(224, 242, 254, 0.6) 0%, rgba(240, 249, 255, 0.3) 50%, transparent 80%)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            <div style={{ zIndex: 1, width: '100%' }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 20, color: '#0F172A', margin: '0 0 6px' }}>
                Board Flexibility
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 14, color: '#64748B', lineHeight: 1.45, margin: '0 0 16px' }}>
                Customized curriculums matching major boards.
              </p>

              {/* Board Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['CBSE', 'ICSE', 'IGCSE', 'State Board'].map((board) => (
                  <span
                    key={board}
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#334155',
                      background: '#F1F5F9',
                      border: '1px solid #E2E8F0',
                      padding: '4px 10px',
                      borderRadius: 6
                    }}
                  >
                    {board}
                  </span>
                ))}
              </div>
            </div>

            {/* Illustration placement */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
                height: 110,
                marginTop: 6,
                zIndex: 1
              }}
            >
              <motion.div animate={{ y: hoveredCard === 'board' ? -4 : 0 }} transition={{ duration: 0.35 }}>
                {illustrations.board}
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* CARD 6: One-to-One Learning (Spans 2 Columns on Desktop)  */}
          {/* ========================================================= */}
          <motion.div
            onMouseEnter={() => setHoveredCard('onetoone')}
            onMouseLeave={() => setHoveredCard(null)}
            className="bento-card card-onetoone"
            style={{
              gridColumn: isMobile ? 'span 1' : 'span 2',
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1.2px solid rgba(233, 213, 255, 0.8)',
              boxShadow:
                hoveredCard === 'onetoone'
                  ? '0 22px 40px -8px rgba(168, 85, 247, 0.2), 0 4px 12px -2px rgba(0, 0, 0, 0.03)'
                  : '0 8px 24px -4px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
              padding: isMobile ? '24px 20px' : '28px 32px',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              minHeight: isMobile ? 'auto' : 240,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transform: hoveredCard === 'onetoone' ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Soft Violet Mesh Glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: isMobile ? '100%' : '60%',
                background: 'radial-gradient(ellipse at 80% 50%, rgba(233, 213, 255, 0.45) 0%, rgba(243, 232, 255, 0.2) 50%, transparent 80%)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            {/* Left Content */}
            <div style={{ flex: 1, minWidth: isMobile ? '100%' : '55%', zIndex: 1, marginBottom: isMobile ? 16 : 0 }}>
              {/* Badge Tag */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 10px',
                  borderRadius: 100,
                  background: 'rgba(124, 58, 237, 0.08)',
                  border: '1px solid rgba(124, 58, 237, 0.15)',
                  marginBottom: 10
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED' }} />
                <span style={{ fontSize: 10, fontWeight: 800, color: '#7C3AED', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  TRADITION NEEDS EXCELLENCE
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 20, color: '#0F172A', margin: '0 0 6px' }}>
                One-to-One Learning
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 14, color: '#64748B', lineHeight: 1.45, margin: '0 0 16px' }}>
                Designed around your child's exact learning pace. No batches.
              </p>

              {/* Stats Indicators */}
              <div style={{ display: 'flex', gap: 20 }}>
                <div style={{ borderLeft: '3px solid #7C3AED', paddingLeft: 10 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>100%</div>
                  <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, marginTop: 2 }}>Focused Attention</div>
                </div>
                <div style={{ borderLeft: '3px solid #10B981', paddingLeft: 10 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>Adaptive</div>
                  <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, marginTop: 2 }}>Personal Speed</div>
                </div>
              </div>
            </div>

            {/* Right Graphic */}
            <div
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '100%' : 180,
                height: 130,
                zIndex: 1
              }}
            >
              <motion.div animate={{ y: hoveredCard === 'onetoone' ? -4 : 0 }} transition={{ duration: 0.35 }}>
                {illustrations.onetoone}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Micro-animation Styles */}
      <style>{`
        @keyframes dashflow {
          to {
            stroke-dashoffset: -20;
          }
        }

        /* 1. Verified Teachers: Checkmark Pop */
        .card-teachers:hover .teach-badge {
          transform: scale(1.18) rotate(4deg);
        }

        /* 2. Assessment: Clipboard Lift */
        .card-assessment:hover .assess-board {
          transform: translateY(-4px);
        }

        /* 3. Matching: Connected dashed lines flow & center node scale */
        .card-matching:hover .match-line-left,
        .card-matching:hover .match-line-right {
          animation: dashflow 1.2s linear infinite;
        }
        .card-matching:hover .match-center-node {
          transform: scale(1.12);
        }
        .card-matching:hover .match-person-left {
          transform: translateX(4px);
        }
        .card-matching:hover .match-person-right {
          transform: translateX(-4px);
        }

        /* 4. Safe Learning: Shield Lock Jiggle */
        .card-safe:hover .safe-lock-icon {
          transform: scale(1.15) translateY(-2px);
        }

        /* 5. Board Flexibility: Book Stack Levitation */
        .card-board:hover .book-top {
          transform: translateY(-5px);
        }
        .card-board:hover .book-mid {
          transform: translateY(-2px);
        }

        /* 6. One-to-One: Lightbulb Pulse */
        .card-onetoone:hover .one-bulb {
          transform: scale(1.22);
          filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.85));
        }
      `}</style>
    </section>
  );
}
