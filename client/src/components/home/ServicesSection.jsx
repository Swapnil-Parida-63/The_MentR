import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  ArrowRight,
  Monitor,
  Home,
  GraduationCap,
  Lightbulb,
  Laptop,
  BookMarked,
  Shield,
  Star,
  Zap
} from 'lucide-react';

// Premium monochrome vector SVGs with interactive classes
const illustrations = {
  teachers: (
    <svg width="110" height="110" viewBox="0 0 120 120" fill="none" style={{ overflow: 'visible' }}>
      <circle cx="60" cy="50" r="32" stroke="rgba(79, 124, 255, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="60" cy="50" r="42" stroke="rgba(79, 124, 255, 0.05)" strokeWidth="1" />
      
      {/* User outline */}
      <path d="M 60 26 C 68.28 26 75 32.72 75 41 C 75 49.28 68.28 56 60 56 C 51.72 56 45 49.28 45 41 C 45 32.72 51.72 26 60 26 Z" stroke="#4F7CFF" strokeWidth="1.8" strokeLinecap="round" fill="#FFFFFF" />
      <path d="M 33 82 C 33 69.85 42.85 60 55 60 L 65 60 C 77.15 60 87 69.85 87 82 L 87 88 L 33 88 Z" stroke="#4F7CFF" strokeWidth="1.8" strokeLinejoin="round" fill="#FFFFFF" />
      
      {/* Interactive Shield checkmark badge */}
      <g className="teach-badge" style={{ transformOrigin: '82px 54px', transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
        <circle cx="82" cy="54" r="13" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.8" />
        <path d="M 78 54 L 81 57 L 86 51" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  ),
  assessment: (
    <svg width="105" height="105" viewBox="0 0 120 120" fill="none" style={{ overflow: 'visible' }}>
      <rect x="35" y="25" width="50" height="70" rx="8" stroke="#7C5CFF" strokeWidth="1.8" fill="#FFFFFF" />
      
      {/* Clipboard clip */}
      <path className="assess-clip" d="M 50 25 L 50 20 C 50 18.5 51.5 17 53 17 L 67 17 C 68.5 17 70 18.5 70 20 L 70 25" stroke="#7C5CFF" strokeWidth="1.8" strokeLinecap="round" fill="#FFFFFF" style={{ transition: 'transform 0.3s ease' }} />
      
      {/* Lines inside clipboard */}
      <path d="M 45 42 L 68 42" stroke="rgba(124, 92, 255, 0.4)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 45 54 L 75 54" stroke="#7C5CFF" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 45 66 L 62 66" stroke="rgba(124, 92, 255, 0.4)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 45 78 L 70 78" stroke="#7C5CFF" strokeWidth="1.8" strokeLinecap="round" />
      
      {/* Tiny check indicators */}
      <circle className="assess-dot-1" cx="43" cy="54" r="2.5" fill="#7C5CFF" style={{ transition: 'transform 0.3s ease', transformOrigin: '43px 54px' }} />
      <circle className="assess-dot-2" cx="43" cy="78" r="2.5" fill="#7C5CFF" style={{ transition: 'transform 0.3s ease', transformOrigin: '43px 78px' }} />
    </svg>
  ),
  matching: (
    <svg width="145" height="145" viewBox="0 0 160 160" fill="none" style={{ overflow: 'visible' }}>
      {/* Central mentR Logo Node */}
      <g className="match-center" style={{ transformOrigin: '80px 80px', transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.4s ease' }}>
        <circle cx="80" cy="80" r="20" stroke="#10B981" strokeWidth="2" fill="#FFFFFF" />
        <circle cx="80" cy="80" r="16" fill="rgba(16, 185, 129, 0.04)" />
        {/* Stylized M logo for mentR */}
        <path d="M 70 87 L 70 74 L 80 81 L 90 74 L 90 87" stroke="#4F7CFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Left Node: Teacher */}
      <g className="match-teacher" style={{ transformOrigin: '32px 80px', transition: 'transform 0.4s ease' }}>
        {/* Teacher outline */}
        <circle cx="32" cy="68" r="7.5" stroke="#4F7CFF" strokeWidth="1.8" fill="#FFFFFF" />
        <path d="M 18 94 C 18 84, 24 80, 32 80 C 40 80, 46 84, 46 94 Z" stroke="#4F7CFF" strokeWidth="1.8" fill="#FFFFFF" />
        {/* Tiny graduation cap */}
        <path d="M 25 61 L 32 58 L 39 61 L 32 64 Z" stroke="#4F7CFF" strokeWidth="1.5" fill="#FFFFFF" />
        <path d="M 32 64 L 32 68" stroke="#4F7CFF" strokeWidth="1.2" />
      </g>

      {/* Right Node: Parent & Child */}
      <g className="match-parent" style={{ transformOrigin: '128px 80px', transition: 'transform 0.4s ease' }}>
        {/* Parent outline */}
        <circle cx="124" cy="68" r="7.5" stroke="#7C5CFF" strokeWidth="1.8" fill="#FFFFFF" />
        <path d="M 110 94 C 110 84, 116 80, 124 80 C 132 80, 132 94, 132 94" stroke="#7C5CFF" strokeWidth="1.8" fill="#FFFFFF" />
        {/* Child outline */}
        <circle cx="136" cy="74" r="5" stroke="#7C5CFF" strokeWidth="1.5" fill="#FFFFFF" />
        <path d="M 128 94 C 128 86, 131 83, 136 83 C 141 83, 144 86, 144 94" stroke="#7C5CFF" strokeWidth="1.5" fill="#FFFFFF" />
      </g>

      {/* Interactive connection lines */}
      <path className="match-line-left" d="M 46 80 C 52 76, 54 76, 60 80" stroke="#4F7CFF" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />
      <path className="match-line-right" d="M 100 80 C 104 84, 108 84, 112 80" stroke="#7C5CFF" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />

      {/* Background Radar Rings */}
      <circle className="radar-circle" cx="80" cy="80" r="28" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="1" style={{ transition: 'transform 0.4s ease', transformOrigin: '80px 80px' }} />
    </svg>
  ),
  safe: (
    <svg width="105" height="105" viewBox="0 0 120 120" fill="none" style={{ overflow: 'visible' }}>
      {/* Shield Outline */}
      <path d="M 60 20 L 92 30 C 92 64, 76 86, 60 96 C 44 86, 28 64, 28 30 Z" stroke="#10B981" strokeWidth="1.8" fill="#FFFFFF" strokeLinejoin="round" />
      
      {/* Locked Emblem */}
      <g className="safe-lock" style={{ transformOrigin: '60px 60px', transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
        <rect x="50" y="52" width="20" height="16" rx="3" stroke="#10B981" strokeWidth="1.8" fill="#FFFFFF" />
        <path d="M 54 52 L 54 44 C 54 40.5, 57 38, 60 38 C 63 38, 66 40.5, 66 44 L 66 52" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      
      <circle cx="60" cy="60" r="45" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  ),
  board: (
    <svg width="105" height="105" viewBox="0 0 120 120" fill="none" style={{ overflow: 'visible' }}>
      <g transform="translate(10, -5)">
        {/* Book 3 (Bottom) */}
        <path d="M 30 75 L 70 85 L 90 70 L 50 60 Z" stroke="#4F7CFF" strokeWidth="1.8" fill="#FFFFFF" />
        <path d="M 30 75 L 30 83 L 70 93 L 70 85" stroke="#4F7CFF" strokeWidth="1.8" fill="#FFFFFF" strokeLinejoin="round" />
        <path d="M 70 85 L 70 93 L 90 78 L 90 70" stroke="#4F7CFF" strokeWidth="1.8" fill="#FFFFFF" strokeLinejoin="round" opacity="0.6" />
        
        {/* Book 2 (Middle) */}
        <path className="book-mid" d="M 30 55 L 70 65 L 90 50 L 50 40 Z" stroke="#7C5CFF" strokeWidth="1.8" fill="#FFFFFF" style={{ transition: 'transform 0.3s ease' }} />
        <path className="book-mid" d="M 30 55 L 30 63 L 70 73 L 70 65" stroke="#7C5CFF" strokeWidth="1.8" fill="#FFFFFF" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease' }} />
        <path className="book-mid" d="M 70 65 L 70 73 L 90 58 L 90 50" stroke="#7C5CFF" strokeWidth="1.8" fill="#FFFFFF" strokeLinejoin="round" opacity="0.6" style={{ transition: 'transform 0.3s ease' }} />

        {/* Book 1 (Top) */}
        <path className="book-top" d="M 30 35 L 70 45 L 90 30 L 50 20 Z" stroke="#10B981" strokeWidth="1.8" fill="#FFFFFF" style={{ transition: 'transform 0.3s ease' }} />
        <path className="book-top" d="M 30 35 L 30 43 L 70 53 L 70 45" stroke="#10B981" strokeWidth="1.8" fill="#FFFFFF" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease' }} />
        <path className="book-top" d="M 70 45 L 70 53 L 90 38 L 90 30" stroke="#10B981" strokeWidth="1.8" fill="#FFFFFF" strokeLinejoin="round" opacity="0.6" style={{ transition: 'transform 0.3s ease' }} />
      </g>
    </svg>
  ),
  onetoone: (
    <svg width="140" height="140" viewBox="0 0 160 160" fill="none" style={{ overflow: 'visible' }}>
      <path d="M 30 110 L 130 110" stroke="#7C5CFF" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 45 110 L 45 130" stroke="#7C5CFF" strokeWidth="1.5" />
      <path d="M 115 110 L 115 130" stroke="#7C5CFF" strokeWidth="1.5" />

      {/* Mentor (Left) */}
      <circle cx="55" cy="65" r="10" stroke="#7C5CFF" strokeWidth="1.8" fill="#FFFFFF" />
      <path d="M 38 110 C 38 90, 45 80, 55 80 C 65 80, 72 90, 72 110" stroke="#7C5CFF" strokeWidth="1.8" fill="#FFFFFF" />

      {/* Student (Right) */}
      <circle cx="105" cy="72" r="8" stroke="#7C5CFF" strokeWidth="1.8" fill="#FFFFFF" />
      <path d="M 92 110 C 92 94, 98 86, 105 86 C 112 86, 118 94, 118 110" stroke="#7C5CFF" strokeWidth="1.8" fill="#FFFFFF" />

      {/* Glowing light bulb / Inspiration line in center */}
      <g className="one-bulb" transform="translate(80, 32)" style={{ transition: 'transform 0.3s ease, filter 0.3s ease', transformOrigin: '0px 18px' }}>
        <line x1="0" y1="0" x2="0" y2="12" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="0" cy="18" r="4" fill="#10B981" />
        <line x1="-8" y1="18" x2="-14" y2="18" stroke="#10B981" strokeWidth="1.2" opacity="0.6" />
        <line x1="8" y1="18" x2="14" y2="18" stroke="#10B981" strokeWidth="1.2" opacity="0.6" />
        <line x1="-5" y1="11" x2="-10" y2="6" stroke="#10B981" strokeWidth="1.2" opacity="0.6" />
        <line x1="5" y1="11" x2="10" y2="6" stroke="#10B981" strokeWidth="1.2" opacity="0.6" />
      </g>
    </svg>
  ),
  online: (
    <svg width="180" height="120" viewBox="0 0 200 140" fill="none" style={{ overflow: 'visible' }}>
      <rect x="65" y="45" width="70" height="46" rx="4" stroke="#4F7CFF" strokeWidth="1.8" fill="#FFFFFF" />
      <path d="M 50 91 L 150 91" stroke="#4F7CFF" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Left House */}
      <g transform="translate(15, 35)">
        <rect x="0" y="15" width="28" height="24" rx="2" stroke="rgba(79, 124, 255, 0.4)" strokeWidth="1.5" fill="#FFFFFF" />
        <path d="M -4 16 L 14 2 L 32 16" stroke="rgba(79, 124, 255, 0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="27" r="3" stroke="rgba(79, 124, 255, 0.4)" strokeWidth="1.5" />
      </g>

      {/* Right Classroom */}
      <g transform="translate(155, 35)">
        <rect x="0" y="10" width="30" height="28" rx="2" stroke="rgba(79, 124, 255, 0.4)" strokeWidth="1.5" fill="#FFFFFF" />
        <path d="M -2 10 L 15 -2 L 32 10" stroke="rgba(79, 124, 255, 0.4)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Connection curves */}
      <path className="online-curve-1" d="M 43 55 C 55 45, 60 45, 68 52" stroke="#4F7CFF" strokeWidth="1.5" strokeDasharray="3 3" />
      <path className="online-curve-2" d="M 132 52 C 140 45, 145 45, 157 55" stroke="#4F7CFF" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  )
};

export default function ServicesSection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const cardWidth = container.clientWidth * 0.85 + 16;
      const index = Math.round(container.scrollLeft / cardWidth);
      setCarouselIndex(index);
    }
  };

  const scrollToCarouselIndex = (idx) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const cardWidth = container.clientWidth * 0.85 + 16;
      container.scrollTo({
        left: idx * cardWidth,
        behavior: 'smooth'
      });
      setCarouselIndex(idx);
    }
  };

  return (
    <section 
      id="services" 
      style={{ 
        background: '#FAFAFC', 
        padding: isMobile ? '60px 0' : '110px 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      
      {/* FLOATING DECORATIVE BACKGROUND ICONS */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '15%', left: '4%', opacity: 0.05, color: '#4F7CFF', pointerEvents: 'none' }}
      >
        <Shield size={44} strokeWidth={1.5} />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '22%', right: '6%', opacity: 0.04, color: '#7C5CFF', pointerEvents: 'none' }}
      >
        <GraduationCap size={48} strokeWidth={1.5} />
      </motion.div>

      <motion.div 
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '55%', left: '3%', opacity: 0.05, color: '#10B981', pointerEvents: 'none' }}
      >
        <Lightbulb size={46} strokeWidth={1.5} />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '65%', right: '4%', opacity: 0.04, color: '#7C5CFF', pointerEvents: 'none' }}
      >
        <BookMarked size={42} strokeWidth={1.5} />
      </motion.div>

      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        style={{ position: 'absolute', bottom: '12%', left: '7%', opacity: 0.04, color: '#4F7CFF', pointerEvents: 'none' }}
      >
        <Laptop size={44} strokeWidth={1.5} />
      </motion.div>

      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: isMobile ? '32px' : '52px' }}>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 650,
            fontSize: 12,
            color: '#4F7CFF',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 10
          }}>
            What We Offer
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: isMobile ? 'clamp(28px, 7vw, 36px)' : 'clamp(38px, 3vw, 46px)',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#1E293B',
            margin: '0 0 12px'
          }}>
            Every advantage, built in.<br />
            So we don't leave matching to guesswork.
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            fontSize: 14.5,
            color: '#64748B',
            lineHeight: 1.55,
            maxWidth: '560px',
            margin: 0
          }}>
            Every component of our learning ecosystem works in unison to guide, verify, match, and sustain accountability for a complete learning journey.
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MOBILE LAYOUT: SNAP CAROUSEL WITH SWIPE INDICATORS           */}
        {/* ------------------------------------------------------------- */}
        {isMobile ? (
          <div>
            <div 
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              className="mobile-swipe-carousel"
              style={{
                display: 'flex',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                gap: 16,
                paddingBottom: 20,
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {/* Card 1: Verified Teachers */}
              <div className="mobile-swipe-card" style={{ flex: '0 0 85%', scrollSnapAlign: 'center' }}>
                <div className="card-hover" style={{
                  background: '#FFFFFF',
                  borderRadius: 20,
                  border: '1.2px solid rgba(79, 124, 255, 0.14)',
                  padding: 20,
                  height: 330,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(15, 23, 42, 0.02)'
                }}>
                  {/* SaaS Dot Grid Fill */}
                  <div className="saas-grid-fill" />
                  
                  <div style={{ zIndex: 1 }}>
                    <h4 style={{ fontSize: 17, fontWeight: 750, color: '#1E293B', margin: '0 0 4px' }}>Verified Teachers</h4>
                    <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 16px', lineHeight: 1.4 }}>Every educator passes our screening process.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {['Identity Verification', 'Demo Class & Subject Test', 'Continuous Reviews'].map(check => (
                        <div key={check} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: '#1E293B' }}>
                          <Check size={13} style={{ color: '#10B981' }} />
                          <span>{check}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', height: 110, position: 'relative', zIndex: 1 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(79, 124, 255, 0.08) 0%, transparent 70%)', filter: 'blur(6px)' }} />
                    {illustrations.teachers}
                  </div>
                </div>
              </div>

              {/* Card 2: Assessment */}
              <div className="mobile-swipe-card" style={{ flex: '0 0 85%', scrollSnapAlign: 'center' }}>
                <div className="card-hover" style={{
                  background: '#FFFFFF',
                  borderRadius: 20,
                  border: '1.2px solid rgba(124, 92, 255, 0.14)',
                  padding: 20,
                  height: 330,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(15, 23, 42, 0.02)'
                }}>
                  {/* SaaS Dot Grid Fill */}
                  <div className="saas-grid-fill" />
                  
                  <div style={{ zIndex: 1 }}>
                    <h4 style={{ fontSize: 17, fontWeight: 750, color: '#1E293B', margin: '0 0 4px' }}>Assessment First</h4>
                    <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 16px', lineHeight: 1.4 }}>We analyze learning gaps before matching starts.</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 8, top: 4, bottom: 4, width: 1.2, background: 'rgba(124, 92, 255, 0.15)' }} />
                      {[
                        { step: '1', text: 'Home evaluation visit' },
                        { step: '2', text: 'Diagnostic analysis report' }
                      ].map(item => (
                        <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, fontWeight: 650, color: '#1E293B', zIndex: 1 }}>
                          <span style={{ width: 17, height: 17, borderRadius: '50%', background: '#7C5CFF', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>{item.step}</span>
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', height: 105, position: 'relative', zIndex: 1 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(124, 92, 255, 0.08) 0%, transparent 70%)', filter: 'blur(6px)' }} />
                    {illustrations.assessment}
                  </div>
                </div>
              </div>

              {/* Card 3: Intelligent Matching (Featured) */}
              <div className="mobile-swipe-card" style={{ flex: '0 0 85%', scrollSnapAlign: 'center' }}>
                <div className="card-hover" style={{
                  background: '#FFFFFF',
                  borderRadius: 20,
                  border: '1.2px solid rgba(79, 124, 255, 0.16)',
                  padding: 20,
                  height: 330,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(15, 23, 42, 0.03)'
                }}>
                  {/* SaaS Dot Grid Fill */}
                  <div className="saas-grid-fill" />
                  
                  <div style={{ zIndex: 1 }}>
                    <span style={{ fontSize: 9, fontWeight: 750, color: '#4F7CFF', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>Featured Priority</span>
                    <h4 style={{ fontSize: 17, fontWeight: 750, color: '#1E293B', margin: '0 0 4px' }}>Intelligent Matching</h4>
                    <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 12px', lineHeight: 1.4 }}>Aligned by syllabus board, personality, and pace.</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {['Board Alignment', 'Synergy Index 98%'].map(tag => (
                        <span key={tag} style={{ fontSize: 10.5, fontWeight: 650, color: '#4F7CFF', background: 'rgba(79, 124, 255, 0.06)', padding: '3px 8px', borderRadius: 6 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', height: 110, position: 'relative', zIndex: 1 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(79, 124, 255, 0.1) 0%, transparent 70%)', filter: 'blur(6px)' }} />
                    {illustrations.matching}
                  </div>
                </div>
              </div>

              {/* Card 4: Safe Learning */}
              <div className="mobile-swipe-card" style={{ flex: '0 0 85%', scrollSnapAlign: 'center' }}>
                <div className="card-hover" style={{
                  background: '#FFFFFF',
                  borderRadius: 20,
                  border: '1.2px solid rgba(16, 185, 129, 0.14)',
                  padding: 20,
                  height: 330,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(15, 23, 42, 0.02)'
                }}>
                  {/* SaaS Dot Grid Fill */}
                  <div className="saas-grid-fill" />
                  
                  <div style={{ zIndex: 1 }}>
                    <h4 style={{ fontSize: 17, fontWeight: 750, color: '#1E293B', margin: '0 0 4px' }}>Safe Learning</h4>
                    <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 16px', lineHeight: 1.4 }}>Complete transparency and peace of mind.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {['Background Vetted', 'Lesson Log Transparency'].map(item => (
                        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: '#1E293B' }}>
                          <Check size={13} style={{ color: '#10B981' }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', height: 105, position: 'relative', zIndex: 1 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)', filter: 'blur(6px)' }} />
                    {illustrations.safe}
                  </div>
                </div>
              </div>

              {/* Card 5: Board Flexibility */}
              <div className="mobile-swipe-card" style={{ flex: '0 0 85%', scrollSnapAlign: 'center' }}>
                <div className="card-hover" style={{
                  background: '#FFFFFF',
                  borderRadius: 20,
                  border: '1.2px solid rgba(79, 124, 255, 0.14)',
                  padding: 20,
                  height: 330,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(15, 23, 42, 0.02)'
                }}>
                  {/* SaaS Dot Grid Fill */}
                  <div className="saas-grid-fill" />
                  
                  <div style={{ zIndex: 1 }}>
                    <h4 style={{ fontSize: 17, fontWeight: 750, color: '#1E293B', margin: '0 0 4px' }}>Board Flexibility</h4>
                    <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 16px', lineHeight: 1.4 }}>Curriculums matching major Indian school boards.</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {['CBSE', 'ICSE', 'IB', 'State Board'].map(board => (
                        <span key={board} style={{ fontSize: 11, fontWeight: 650, color: '#334155', background: '#F1F5F9', padding: '3px 8px', borderRadius: 6 }}>
                          {board}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', height: 105, position: 'relative', zIndex: 1 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(79, 124, 255, 0.08) 0%, transparent 70%)', filter: 'blur(6px)' }} />
                    {illustrations.board}
                  </div>
                </div>
              </div>

              {/* Card 6: One-to-One Learning (Featured) */}
              <div className="mobile-swipe-card" style={{ flex: '0 0 85%', scrollSnapAlign: 'center' }}>
                <div className="card-hover" style={{
                  background: '#FFFFFF',
                  borderRadius: 20,
                  border: '1.2px solid rgba(124, 92, 255, 0.16)',
                  padding: 20,
                  height: 330,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(15, 23, 42, 0.03)'
                }}>
                  {/* SaaS Dot Grid Fill */}
                  <div className="saas-grid-fill" />
                  
                  <div style={{ zIndex: 1 }}>
                    <span style={{ fontSize: 9, fontWeight: 750, color: '#7C5CFF', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>Featured Priority</span>
                    <h4 style={{ fontSize: 17, fontWeight: 750, color: '#1E293B', margin: '0 0 4px' }}>One-to-One Learning</h4>
                    <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 12px', lineHeight: 1.4 }}>Designed around your child's exact learning pace.</p>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <div style={{ borderLeft: '2.5px solid #7C5CFF', paddingLeft: 6 }}>
                        <div style={{ fontSize: 16, fontWeight: 800, color: '#1E293B' }}>100%</div>
                        <div style={{ fontSize: 10, color: '#64748B', fontWeight: 650 }}>Student Focus</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', height: 110, position: 'relative', zIndex: 1 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(124, 92, 255, 0.1) 0%, transparent 70%)', filter: 'blur(6px)' }} />
                    {illustrations.onetoone}
                  </div>
                </div>
              </div>

              {/* Card 7: Online + Offline */}
              <div className="mobile-swipe-card" style={{ flex: '0 0 85%', scrollSnapAlign: 'center' }}>
                <div className="card-hover" style={{
                  background: '#FFFFFF',
                  borderRadius: 20,
                  border: '1.2px solid rgba(79, 124, 255, 0.14)',
                  padding: 20,
                  height: 330,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(15, 23, 42, 0.02)'
                }}>
                  {/* SaaS Dot Grid Fill */}
                  <div className="saas-grid-fill" />
                  
                  <div style={{ zIndex: 1 }}>
                    <h4 style={{ fontSize: 17, fontWeight: 750, color: '#1E293B', margin: '0 0 4px' }}>Online + Offline</h4>
                    <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 16px', lineHeight: 1.4 }}>Seamlessly switch modes under the same mentor.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, fontWeight: 600 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1E293B' }}>
                        <Home size={13} style={{ color: '#4F7CFF' }} />
                        <span>In-person home visits</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', height: 105, position: 'relative', zIndex: 1 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(79, 124, 255, 0.08) 0%, transparent 70%)', filter: 'blur(6px)' }} />
                    {illustrations.online}
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle Carousel Pagination Indicators */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 8 }}>
              {[0, 1, 2, 3, 4, 5, 6].map(idx => (
                <button
                  key={idx}
                  onClick={() => scrollToCarouselIndex(idx)}
                  style={{
                    width: carouselIndex === idx ? 16 : 5,
                    height: 5,
                    borderRadius: 2.5,
                    background: carouselIndex === idx ? '#4F7CFF' : 'rgba(79, 124, 255, 0.2)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          /* ------------------------------------------------------------- */
          /* DESKTOP LAYOUT: PREMIUM ASYMMETRIC BENTO GRID MASONRY         */
          /* ------------------------------------------------------------- */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px'
          }}>
            
            {/* ROW 1 CARD 1: Verified Teachers (Spans 2 Columns) */}
            <motion.div
              onMouseEnter={() => setHoveredCard('teachers')}
              onMouseLeave={() => setHoveredCard(null)}
              className="card-hover"
              style={{
                gridColumn: 'span 2',
                background: '#FFFFFF',
                borderRadius: 20,
                border: '1.2px solid rgba(79, 124, 255, 0.14)',
                boxShadow: hoveredCard === 'teachers' 
                  ? '0 15px 30px rgba(79, 124, 255, 0.06)' 
                  : '0 4px 10px rgba(10, 22, 40, 0.01)',
                padding: '24px 28px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 220,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                y: hoveredCard === 'teachers' ? -3 : 0,
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* SaaS Dot Grid Fill */}
              <div className="saas-grid-fill" />

              {/* Left Content */}
              <div style={{ maxWidth: '65%', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', zIndex: 1 }}>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 18, color: '#1E293B', margin: '0 0 4px' }}>Verified Teachers</h4>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 13.5, color: '#64748B', lineHeight: 1.45, margin: '0 0 14px' }}>
                    Every educator passes our strict screening process.
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {['Identity Verification', 'Demo Class & Subject Test', 'Continuous Reviews'].map((check) => (
                      <div key={check} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, fontWeight: 600, color: '#1E293B' }}>
                        <Check size={14} style={{ color: '#10B981' }} />
                        <span>{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Illustration container */}
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 110,
                height: '100%',
                zIndex: 1
              }}>
                <div style={{
                  position: 'absolute',
                  width: 100,
                  height: 100,
                  background: 'radial-gradient(circle, rgba(79, 124, 255, 0.1) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                  opacity: hoveredCard === 'teachers' ? 1 : 0.6,
                  transition: 'opacity 0.35s ease'
                }} />
                
                {/* Secondary visible doodles (Math symbols and sparkles) */}
                <div style={{ position: 'absolute', top: 5, left: -25, opacity: 0.35, color: '#4F7CFF', fontSize: 11, fontWeight: 800 }}>A+</div>
                <div style={{ position: 'absolute', bottom: 15, left: -10, opacity: 0.3, color: '#10B981', fontSize: 13, fontWeight: 800 }}>✓</div>
                <div style={{ position: 'absolute', bottom: 25, right: -15, opacity: 0.25, color: '#4F7CFF' }}><Star size={8} fill="#4F7CFF" /></div>

                <motion.div
                  animate={{ y: hoveredCard === 'teachers' ? -4 : 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {illustrations.teachers}
                </motion.div>
              </div>
            </motion.div>

            {/* ROW 1 CARD 2: Assessment (Spans 1 Column) */}
            <motion.div
              onMouseEnter={() => setHoveredCard('assessment')}
              onMouseLeave={() => setHoveredCard(null)}
              className="card-hover"
              style={{
                gridColumn: 'span 1',
                background: '#FFFFFF',
                borderRadius: 20,
                border: '1.2px solid rgba(124, 92, 255, 0.14)',
                boxShadow: hoveredCard === 'assessment' 
                  ? '0 15px 30px rgba(124, 92, 255, 0.06)' 
                  : '0 4px 10px rgba(10, 22, 40, 0.01)',
                padding: '24px 26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 220,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                y: hoveredCard === 'assessment' ? -3 : 0,
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* SaaS Dot Grid Fill */}
              <div className="saas-grid-fill" />

              <div style={{ zIndex: 1 }}>
                <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 18, color: '#1E293B', margin: '0 0 4px' }}>Assessment First</h4>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 13.5, color: '#64748B', lineHeight: 1.45, margin: '0 0 12px' }}>
                  We analyze learning gaps before match starts.
                </p>
                
                {/* Horizontal Step timeline widget */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  {[
                    { step: '1', label: 'Evaluate' },
                    { step: '2', label: 'Map' }
                  ].map((item, i) => (
                    <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ 
                        width: 17, 
                        height: 17, 
                        borderRadius: '50%', 
                        background: '#7C5CFF', 
                        color: 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: 10,
                        fontWeight: 700
                      }}>
                        {item.step}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 650, color: '#475569' }}>{item.label}</span>
                      {i < 1 && <ArrowRight size={8} style={{ color: 'rgba(124, 92, 255, 0.3)' }} />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Illustration placement */}
              <div style={{
                position: 'absolute',
                right: -8,
                bottom: -12,
                width: 105,
                height: 105,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1
              }}>
                <div style={{
                  position: 'absolute',
                  width: 90,
                  height: 90,
                  background: 'radial-gradient(circle, rgba(124, 92, 255, 0.1) 0%, transparent 70%)',
                  filter: 'blur(7px)',
                  opacity: hoveredCard === 'assessment' ? 1 : 0.6
                }} />
                
                {/* Secondary visible doodles */}
                <div style={{ position: 'absolute', top: -10, left: 10, opacity: 0.35, color: '#7C5CFF' }}><Star size={8} fill="#7C5CFF" /></div>
                <div style={{ position: 'absolute', top: 5, left: -25, opacity: 0.3, color: '#7C5CFF', fontSize: 13, fontWeight: 800 }}>%</div>

                <motion.div
                  animate={{ y: hoveredCard === 'assessment' ? -4 : 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {illustrations.assessment}
                </motion.div>
              </div>
            </motion.div>

            {/* ROW 2 CARD 1: Personalized Matching (Featured priority - Spans 2 Columns) */}
            <motion.div
              onMouseEnter={() => setHoveredCard('matching')}
              onMouseLeave={() => setHoveredCard(null)}
              className="card-hover"
              style={{
                gridColumn: 'span 2',
                background: '#FFFFFF',
                borderRadius: 20,
                border: hoveredCard === 'matching' 
                  ? '1.5px solid #4F7CFF' 
                  : '1.2px solid rgba(79, 124, 255, 0.18)',
                boxShadow: hoveredCard === 'matching' 
                  ? '0 20px 40px rgba(79, 124, 255, 0.08)' 
                  : '0 4px 10px rgba(10, 22, 40, 0.015)',
                padding: '28px 36px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 250,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                y: hoveredCard === 'matching' ? -4 : 0,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* SaaS Dot Grid Fill */}
              <div className="saas-grid-fill" />

              {/* Left Content */}
              <div style={{ maxWidth: '65%', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', zIndex: 1 }}>
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '3px 10px',
                    borderRadius: 100,
                    background: 'rgba(79, 124, 255, 0.06)',
                    border: '1px solid rgba(79, 124, 255, 0.1)',
                    marginBottom: 8
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4F7CFF' }} />
                    <span style={{ fontSize: 9.5, fontWeight: 750, color: '#4F7CFF', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Featured Match Priority</span>
                  </div>
                  
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 20, color: '#1E293B', margin: '0 0 6px' }}>Personalized Matching</h4>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 14, color: '#64748B', lineHeight: 1.5, margin: '0 0 16px' }}>
                    We align board expertise, teaching style, and student personality parameters to ensure compatibility.
                  </p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {['Board Alignment', 'Synergy Index 98.4%', 'Pedagogical Fit'].map((tag) => (
                      <span key={tag} style={{
                        fontSize: 11,
                        fontWeight: 650,
                        color: '#4F7CFF',
                        background: 'rgba(79, 124, 255, 0.05)',
                        padding: '5px 10px',
                        borderRadius: 8,
                        border: '1px solid rgba(79, 124, 255, 0.06)'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Illustration container */}
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 145,
                height: '100%',
                marginRight: -10,
                zIndex: 1
              }}>
                <div style={{
                  position: 'absolute',
                  width: 130,
                  height: 130,
                  background: 'radial-gradient(circle, rgba(79, 124, 255, 0.12) 0%, transparent 70%)',
                  filter: 'blur(10px)',
                  opacity: hoveredCard === 'matching' ? 1 : 0.6,
                  transition: 'opacity 0.35s ease'
                }} />
                
                {/* Secondary visible doodles (Venn diagram arcs and target stars) */}
                <div style={{ position: 'absolute', top: 5, left: -25, opacity: 0.35, color: '#4F7CFF' }}><Star size={8} fill="#4F7CFF" /></div>
                <div style={{ position: 'absolute', bottom: 10, left: -10, opacity: 0.3, color: '#7C5CFF' }}><Star size={6} fill="#7C5CFF" /></div>
                <div style={{ position: 'absolute', top: 15, right: -15, opacity: 0.25, color: '#10B981', fontSize: 14, fontWeight: 700 }}>+</div>

                <motion.div
                  animate={{ y: hoveredCard === 'matching' ? -6 : 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {illustrations.matching}
                </motion.div>
              </div>
            </motion.div>

            {/* ROW 2 CARD 2: Safe Learning (Spans 1 Column) */}
            <motion.div
              onMouseEnter={() => setHoveredCard('safe')}
              onMouseLeave={() => setHoveredCard(null)}
              className="card-hover"
              style={{
                gridColumn: 'span 1',
                background: '#FFFFFF',
                borderRadius: 20,
                border: '1.2px solid rgba(16, 185, 129, 0.14)',
                boxShadow: hoveredCard === 'safe' 
                  ? '0 15px 30px rgba(16, 185, 129, 0.06)' 
                  : '0 4px 10px rgba(10, 22, 40, 0.01)',
                padding: '28px 26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 250,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                y: hoveredCard === 'safe' ? -3 : 0,
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* SaaS Dot Grid Fill */}
              <div className="saas-grid-fill" />

              <div style={{ zIndex: 1 }}>
                <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 18, color: '#1E293B', margin: '0 0 4px' }}>Safe Learning</h4>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 13.5, color: '#64748B', lineHeight: 1.45, margin: '0 0 14px' }}>
                  Complete transparency and peace of mind.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['Background Vetted', 'Lesson Log Transparency'].map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 650, color: '#1E293B' }}>
                      <Check size={14} style={{ color: '#10B981' }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Illustration */}
              <div style={{
                position: 'absolute',
                right: -10,
                bottom: -12,
                width: 105,
                height: 105,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1
              }}>
                <div style={{
                  position: 'absolute',
                  width: 90,
                  height: 90,
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
                  filter: 'blur(7px)',
                  opacity: hoveredCard === 'safe' ? 1 : 0.6
                }} />
                
                {/* Secondary visible doodles */}
                <div style={{ position: 'absolute', top: -5, left: 10, opacity: 0.35, color: '#10B981' }}><Star size={8} fill="#10B981" /></div>
                <div style={{ position: 'absolute', bottom: 35, left: -20, opacity: 0.3, color: '#10B981', fontSize: 13, fontWeight: 800 }}>★</div>

                <motion.div
                  animate={{ y: hoveredCard === 'safe' ? -4 : 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {illustrations.safe}
                </motion.div>
              </div>
            </motion.div>

            {/* ROW 3 CARD 1: Board Flexibility (Spans 1 Column) */}
            <motion.div
              onMouseEnter={() => setHoveredCard('board')}
              onMouseLeave={() => setHoveredCard(null)}
              className="card-hover"
              style={{
                gridColumn: 'span 1',
                background: '#FFFFFF',
                borderRadius: 20,
                border: '1.2px solid rgba(79, 124, 255, 0.14)',
                boxShadow: hoveredCard === 'board' 
                  ? '0 15px 30px rgba(79, 124, 255, 0.06)' 
                  : '0 4px 10px rgba(10, 22, 40, 0.01)',
                padding: '26px 26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 230,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                y: hoveredCard === 'board' ? -3 : 0,
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* SaaS Dot Grid Fill */}
              <div className="saas-grid-fill" />

              <div style={{ zIndex: 1 }}>
                <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 18, color: '#1E293B', margin: '0 0 4px' }}>Board Flexibility</h4>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 13.5, color: '#64748B', lineHeight: 1.45, margin: '0 0 12px' }}>
                  Customized curriculums matching major boards.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {['CBSE', 'ICSE', 'IB', 'State Board'].map(board => (
                    <span key={board} style={{ fontSize: 11, fontWeight: 650, color: '#334155', background: '#F1F5F9', padding: '3px 8px', borderRadius: 6 }}>
                      {board}
                    </span>
                  ))}
                </div>
              </div>

              {/* Illustration */}
              <div style={{
                position: 'absolute',
                right: -8,
                bottom: -12,
                width: 105,
                height: 105,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1
              }}>
                <div style={{
                  position: 'absolute',
                  width: 90,
                  height: 90,
                  background: 'radial-gradient(circle, rgba(79, 124, 255, 0.1) 0%, transparent 70%)',
                  filter: 'blur(7px)',
                  opacity: hoveredCard === 'board' ? 1 : 0.6
                }} />
                
                {/* Secondary visible doodles */}
                <div style={{ position: 'absolute', top: -5, left: 10, opacity: 0.35, color: '#4F7CFF' }}><Star size={8} fill="#4F7CFF" /></div>
                <div style={{ position: 'absolute', bottom: 35, left: -20, opacity: 0.3, color: '#7C5CFF', fontSize: 13, fontWeight: 800 }}>📖</div>

                <motion.div
                  animate={{ y: hoveredCard === 'board' ? -4 : 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {illustrations.board}
                </motion.div>
              </div>
            </motion.div>

            {/* ROW 3 CARD 2: One-to-One Learning (Featured priority - Spans 2 Columns) */}
            <motion.div
              onMouseEnter={() => setHoveredCard('onetoone')}
              onMouseLeave={() => setHoveredCard(null)}
              className="card-hover"
              style={{
                gridColumn: 'span 2',
                background: '#FFFFFF',
                borderRadius: 20,
                border: hoveredCard === 'onetoone' 
                  ? '1.5px solid #7C5CFF' 
                  : '1.2px solid rgba(124, 92, 255, 0.18)',
                boxShadow: hoveredCard === 'onetoone' 
                  ? '0 20px 40px rgba(124, 92, 255, 0.08)' 
                  : '0 4px 10px rgba(10, 22, 40, 0.015)',
                padding: '26px 36px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 230,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                y: hoveredCard === 'onetoone' ? -4 : 0,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* SaaS Dot Grid Fill */}
              <div className="saas-grid-fill" />

              {/* Left Content */}
              <div style={{ maxWidth: '65%', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', zIndex: 1 }}>
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '3px 10px',
                    borderRadius: 100,
                    background: 'rgba(124, 92, 255, 0.06)',
                    border: '1px solid rgba(124, 92, 255, 0.1)',
                    marginBottom: 8
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#7C5CFF' }} />
                    <span style={{ fontSize: 9.5, fontWeight: 750, color: '#7C5CFF', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Featured Match Priority</span>
                  </div>
                  
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 20, color: '#1E293B', margin: '0 0 6px' }}>One-to-One Learning</h4>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 14, color: '#64748B', lineHeight: 1.5, margin: '0 0 14px' }}>
                    Designed around your child's exact learning pace. No batches.
                  </p>
                  
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{ borderLeft: '2.5px solid #7C5CFF', paddingLeft: 8 }}>
                      <div style={{ fontSize: 17, fontWeight: 855, color: '#1E293B', lineHeight: 1.1 }}>100%</div>
                      <div style={{ fontSize: 10.5, color: '#64748B', fontWeight: 650, marginTop: 1 }}>Focused Attention</div>
                    </div>
                    <div style={{ borderLeft: '2.5px solid #10B981', paddingLeft: 8 }}>
                      <div style={{ fontSize: 17, fontWeight: 855, color: '#1E293B', lineHeight: 1.1 }}>Adaptive</div>
                      <div style={{ fontSize: 10.5, color: '#64748B', fontWeight: 650, marginTop: 1 }}>Personal Speed</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Illustration container */}
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 140,
                height: '100%',
                marginRight: -10,
                zIndex: 1
              }}>
                <div style={{
                  position: 'absolute',
                  width: 130,
                  height: 130,
                  background: 'radial-gradient(circle, rgba(124, 92, 255, 0.14) 0%, transparent 70%)',
                  filter: 'blur(10px)',
                  opacity: hoveredCard === 'onetoone' ? 1 : 0.6,
                  transition: 'opacity 0.35s ease'
                }} />
                
                {/* Secondary visible doodles */}
                <div style={{ position: 'absolute', top: 5, left: -20, opacity: 0.35, color: '#7C5CFF' }}><Star size={8} fill="#7C5CFF" /></div>
                <div style={{ position: 'absolute', bottom: 10, left: -10, opacity: 0.3, color: '#10B981' }}><Star size={6} fill="#10B981" /></div>
                <div style={{ position: 'absolute', top: 25, right: -15, opacity: 0.25, color: '#10B981', fontSize: 14, fontWeight: 700 }}>💡</div>

                <motion.div
                  animate={{ y: hoveredCard === 'onetoone' ? -6 : 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {illustrations.onetoone}
                </motion.div>
              </div>
            </motion.div>

            {/* ROW 4 CARD: Online + Offline (Spans full 3 columns) */}
            <motion.div
              onMouseEnter={() => setHoveredCard('online')}
              onMouseLeave={() => setHoveredCard(null)}
              className="card-hover"
              style={{
                gridColumn: 'span 3',
                background: '#FFFFFF',
                borderRadius: 20,
                border: '1.2px solid rgba(79, 124, 255, 0.14)',
                boxShadow: hoveredCard === 'online' 
                  ? '0 15px 32px rgba(79, 124, 255, 0.06)' 
                  : '0 4px 10px rgba(10, 22, 40, 0.01)',
                padding: '28px 36px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 200,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                y: hoveredCard === 'online' ? -3 : 0,
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* SaaS Dot Grid Fill */}
              <div className="saas-grid-fill" />

              {/* Left Content */}
              <div style={{ maxWidth: '65%', zIndex: 1 }}>
                <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 20, color: '#1E293B', margin: '0 0 4px' }}>Online + Offline Learning</h4>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 14, color: '#64748B', lineHeight: 1.5, margin: '0 0 16px', maxWidth: '480px' }}>
                  Seamlessly switch modes under the same verified mentor. Learn at home or virtually.
                </p>
                <div style={{ display: 'flex', gap: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 650, color: '#1E293B' }}>
                    <Home size={16} style={{ color: '#4F7CFF' }} />
                    <span>In-person home visits</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 650, color: '#1E293B' }}>
                    <Monitor size={16} style={{ color: '#4F7CFF' }} />
                    <span>Interactive virtual classes</span>
                  </div>
                </div>
              </div>

              {/* Right Illustration */}
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 180,
                height: '100%',
                marginRight: 20,
                zIndex: 1
              }}>
                <div style={{
                  position: 'absolute',
                  width: 160,
                  height: 120,
                  background: 'radial-gradient(circle, rgba(79, 124, 255, 0.1) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                  opacity: hoveredCard === 'online' ? 1 : 0.6
                }} />
                
                {/* Secondary visible doodles */}
                <div style={{ position: 'absolute', top: 5, left: -10, opacity: 0.35, color: '#4F7CFF' }}><Star size={8} fill="#4F7CFF" /></div>
                <div style={{ position: 'absolute', bottom: 15, right: -15, opacity: 0.3, color: '#4F7CFF' }}><Star size={6} fill="#4F7CFF" /></div>
                <div style={{ position: 'absolute', top: 25, right: -25, opacity: 0.2, color: '#10B981', fontSize: 13, fontWeight: 800 }}>WiFi</div>

                <motion.div
                  animate={{ y: hoveredCard === 'online' ? -4 : 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {illustrations.online}
                </motion.div>
              </div>
            </motion.div>

          </div>
        )}

      </div>
      
      {/* Dynamic Global Hover and Animation Styles */}
      <style>{`
        .mobile-swipe-carousel::-webkit-scrollbar {
          display: none;
        }
        
        /* SaaS Dot Grid Background decoration pattern */
        .saas-grid-fill {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(79, 124, 255, 0.09) 1px, transparent 1.2px);
          background-size: 14px 14px;
          opacity: 0.85;
          pointer-events: none;
          z-index: 0;
        }

        /* Dash animation for connectors */
        @keyframes dashflow {
          to {
            stroke-dashoffset: -20;
          }
        }

        /* 1. Verified Teachers - Badge pop animation on hover */
        .card-hover:hover .teach-badge {
          transform: scale(1.2) rotate(3deg);
        }

        /* 2. Assessment - Clip lift and checkmark scale */
        .card-hover:hover .assess-clip {
          transform: translateY(-3px);
        }
        .card-hover:hover .assess-dot-1 {
          transform: scale(1.35);
          fill: #10B981;
        }
        .card-hover:hover .assess-dot-2 {
          transform: scale(1.35);
          fill: #10B981;
        }

        /* 3. Matching - Dashed connector flow and node attraction */
        .card-hover:hover .match-line-left {
          animation: dashflow 1.2s linear infinite;
        }
        .card-hover:hover .match-line-right {
          animation: dashflow 1.2s linear infinite;
        }
        .card-hover:hover .match-teacher {
          transform: translateX(3px);
        }
        .card-hover:hover .match-parent {
          transform: translateX(-3px);
        }
        .card-hover:hover .match-center {
          transform: scale(1.12);
          filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.5));
        }
        .card-hover:hover .radar-circle {
          transform: scale(1.15);
        }

        /* 4. Safe Learning - Lock loop rotation check */
        .card-hover:hover .safe-lock {
          transform: translateY(-4px) scale(1.05);
        }

        /* 5. Board Flexibility - Book stack displacement */
        .card-hover:hover .book-top {
          transform: translateY(-6px);
        }
        .card-hover:hover .book-mid {
          transform: translateY(-3px);
        }

        /* 6. One-to-One - Lightbulb scale & pulse glow */
        .card-hover:hover .one-bulb {
          transform: scale(1.22);
          filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.85));
        }

        /* 7. Online + Offline - Connector wave animation */
        .card-hover:hover .online-curve-1 {
          animation: dashflow 1s linear infinite;
        }
        .card-hover:hover .online-curve-2 {
          animation: dashflow 1s linear infinite;
        }
      `}</style>
    </section>
  );
}
