import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Heart, 
  Star, 
  Award, 
  FileText, 
  Search, 
  MessageSquare, 
  Video, 
  UserCheck, 
  GraduationCap, 
  CheckCircle, 
  BookOpen, 
  Quote, 
  ArrowRight 
} from 'lucide-react';

function Counter({ target, suffix, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1200, 1);
          const current = (1 - Math.pow(1 - p, 3)) * target;
          setCount(current);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals]);
  
  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const HeroIllustration = () => (
  <svg width="100%" height="340" viewBox="0 0 400 340" fill="none" style={{ overflow: 'visible' }}>
    {/* Background Soft Glows */}
    <circle cx="200" cy="170" r="100" fill="rgba(99, 102, 241, 0.04)" filter="blur(40px)" />
    
    {/* Central Mentor Representation */}
    <g className="hover-mentor" style={{ transformOrigin: '200px 170px' }}>
      <rect x="130" y="100" width="140" height="140" rx="24" fill="#FFFFFF" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 15px 30px rgba(99, 102, 241, 0.04))' }} />
      {/* Avatar Outline */}
      <circle cx="200" cy="150" r="28" stroke="#6366F1" strokeWidth="1.8" fill="#FFFFFF" />
      <path d="M 180 195 C 180 184, 185 180, 200 180 C 215 180, 220 184, 220 195" stroke="#6366F1" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Verified Badge */}
      <rect x="175" y="210" width="50" height="16" rx="8" fill="rgba(16, 185, 129, 0.08)" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" />
      <text x="200" y="221" fill="#10B981" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="var(--font-sans)">Verified</text>
    </g>

    {/* Floating Verification Badge (Top Left) */}
    <g className="illust-float-badge" style={{ transformOrigin: '80px 90px' }}>
      <g className="hover-badge" style={{ transformOrigin: '80px 90px' }}>
        <circle cx="80" cy="90" r="26" fill="#FFFFFF" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 10px 20px rgba(16, 185, 129, 0.03))' }} />
        <path d="M 74 90 L 78 94 L 86 86" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>

    {/* Floating Mini Chart Report (Top Right) */}
    <g className="illust-float-chart" style={{ transformOrigin: '320px 100px' }}>
      <g className="hover-chart" style={{ transformOrigin: '320px 100px' }}>
        <rect x="290" y="70" width="60" height="60" rx="14" fill="#FFFFFF" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 10px 20px rgba(99, 102, 241, 0.03))' }} />
        <line x1="302" y1="110" x2="338" y2="110" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="305" y="92" width="6" height="14" rx="2" fill="#6366F1" />
        <rect x="317" y="82" width="6" height="24" rx="2" fill="rgba(99, 102, 241, 0.4)" />
        <rect x="329" y="87" width="6" height="19" rx="2" fill="#10B981" />
      </g>
    </g>

    {/* Floating Learning Icons */}
    <g className="illust-float-book" style={{ transformOrigin: '90px 250px' }}>
      <g className="hover-book" style={{ transformOrigin: '90px 250px' }}>
        <circle cx="90" cy="250" r="22" fill="#FFFFFF" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="1" style={{ filter: 'drop-shadow(0 8px 16px rgba(10, 22, 40, 0.02))' }} />
        <path d="M 82 245 H 98 V 257 H 82 Z" stroke="#64748B" strokeWidth="1.2" fill="none" />
        <line x1="86" y1="249" x2="94" y2="249" stroke="#64748B" strokeWidth="1.2" />
        <line x1="86" y1="253" x2="94" y2="253" stroke="#64748B" strokeWidth="1.2" />
      </g>
    </g>
    
    <g className="illust-float-light" style={{ transformOrigin: '310px 240px' }}>
      <g className="hover-light" style={{ transformOrigin: '310px 240px' }}>
        <circle cx="310" cy="240" r="22" fill="#FFFFFF" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="1" style={{ filter: 'drop-shadow(0 8px 16px rgba(10, 22, 40, 0.02))' }} />
        <circle cx="310" cy="236" r="6" stroke="#6366F1" strokeWidth="1.2" fill="none" />
        <path d="M 307 242 H 313 L 311 247 H 309 Z" stroke="#6366F1" strokeWidth="1.2" fill="none" />
      </g>
    </g>

    {/* Orbit lines */}
    <circle cx="200" cy="170" r="130" stroke="rgba(99, 102, 241, 0.03)" strokeWidth="1" strokeDasharray="3 3" />
    <circle cx="200" cy="170" r="110" stroke="rgba(16, 185, 129, 0.02)" strokeWidth="1" strokeDasharray="3 3" />
  </svg>
);

export default function AvsarSection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isAvsarDescExpanded, setIsAvsarDescExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getTeacherCount = () => {
    const baseDate = new Date('2026-07-01T00:00:00');
    const currentDate = new Date();
    const diffTime = Math.max(0, currentDate - baseDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(639 + Math.floor(diffDays * 1.5), 5000);
  };

  const finalTeacherCount = getTeacherCount();

  const steps = [
    { label: 'Application', icon: FileText, desc: 'Initial vetting' },
    { label: 'Profile Review', icon: Search, desc: 'Credentials check' },
    { label: 'Interview', icon: MessageSquare, desc: 'Pedagogical fit' },
    { label: 'Demo Session', icon: Video, desc: 'Live teaching' },
    { label: 'Background Check', icon: UserCheck, desc: 'Security review' },
    { label: 'Training', icon: GraduationCap, desc: 'Playbook alignment' },
    { label: 'Approved', icon: CheckCircle, desc: 'Ready to teach' }
  ];

  return (
    <section 
      id="avsar" 
      style={{ 
        background: 'linear-gradient(180deg, #FFFFFF 0%, #E3E8FF 50%, rgba(143, 149, 246, 0.42) 100%)', 
        padding: isMobile ? '80px 0 100px' : '140px 0 160px', 
        position: 'relative', 
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)'
      }}
    >
      {/* CSS Animations & Utilities */}
      <style>{`
        @keyframes float-badge {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes float-chart {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-3deg); }
        }
        @keyframes float-book {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes float-light {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes float-decor {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(5deg); }
        }
        .illust-float-badge { animation: float-badge 6s ease-in-out infinite; }
        .illust-float-chart { animation: float-chart 8s ease-in-out infinite; }
        .illust-float-book { animation: float-book 7s ease-in-out infinite; }
        .illust-float-light { animation: float-light 9s ease-in-out infinite; }

        /* Hero Illustration Hover effects */
        .hover-mentor {
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .hover-mentor:hover {
          transform: scale(1.04) translateY(-3px);
        }

        .hover-badge {
          cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s;
        }
        .hover-badge:hover {
          transform: scale(1.22) rotate(10deg);
          filter: drop-shadow(0 10px 20px rgba(16, 185, 129, 0.3));
        }

        .hover-chart {
          cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s;
        }
        .hover-chart:hover {
          transform: scale(1.22) rotate(-10deg);
          filter: drop-shadow(0 10px 20px rgba(99, 102, 241, 0.28));
        }

        .hover-book {
          cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s;
        }
        .hover-book:hover {
          transform: scale(1.2) translateY(-4px);
          filter: drop-shadow(0 10px 20px rgba(100, 116, 139, 0.25));
        }

        .hover-light {
          cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s;
        }
        .hover-light:hover {
          transform: scale(1.25);
          filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.65));
        }

        .mobile-snap-carousel {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 8px 4px 24px;
        }
        .mobile-snap-carousel::-webkit-scrollbar {
          display: none;
        }
        .mobile-snap-card {
          flex: 0 0 88%;
          scroll-snap-align: start;
        }
      `}</style>

      {/* Decorative floating elements in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30" style={{ zIndex: 0 }}>
        <div className="absolute" style={{ top: '10%', left: '5%', opacity: 0.05, animation: 'float-decor 12s ease-in-out infinite' }}>
          <GraduationCap size={44} strokeWidth={1.2} color="#6366F1" />
        </div>
        <div className="absolute" style={{ top: '45%', right: '4%', opacity: 0.04, animation: 'float-decor 16s ease-in-out infinite 2s' }}>
          <Shield size={40} strokeWidth={1.2} color="#10B981" />
        </div>
        <div className="absolute" style={{ bottom: '15%', left: '8%', opacity: 0.05, animation: 'float-decor 14s ease-in-out infinite 1s' }}>
          <Award size={42} strokeWidth={1.2} color="#6366F1" />
        </div>
        <div className="absolute" style={{ bottom: '25%', right: '8%', opacity: 0.04, animation: 'float-decor 18s ease-in-out infinite 3s' }}>
          <BookOpen size={36} strokeWidth={1.2} color="#6366F1" />
        </div>
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto px-6">
        
        {/* ============================================================== */}
        {/* HERO HEADER AREA                                               */}
        {/* ============================================================== */}
        <div 
          onMouseEnter={() => setHoveredCard('hero')}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr',
            gap: isMobile ? '32px' : '80px',
            alignItems: 'center',
            marginBottom: isMobile ? '48px' : '90px'
          }}
        >
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#6366F1', textTransform: 'uppercase', marginBottom: 12 }}>
              AVSAR (TRUST THROUGH QUALITY)
            </div>
            <h2 
              onClick={() => isMobile && setIsAvsarDescExpanded(!isAvsarDescExpanded)}
              style={{
                fontFamily: 'var(--font-hero)',
                fontWeight: 800,
                fontSize: 'clamp(36px, 4vw, 52px)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#1E293B',
                margin: '0 0 4px',
                cursor: isMobile ? 'pointer' : 'default',
                userSelect: 'none'
              }}
            >
              Quality isn't claimed.<br />It's measured.
            </h2>
            
            {/* Collapsible Hero Description */}
            <motion.div
              initial={isMobile ? { opacity: 0, height: 0, marginTop: 0 } : { opacity: 0, height: 0, marginTop: 0 }}
              animate={isMobile 
                ? (isAvsarDescExpanded ? { opacity: 1, height: 'auto', marginTop: 20 } : { opacity: 0, height: 0, marginTop: 0 })
                : (hoveredCard === 'hero' ? { opacity: 1, height: 'auto', marginTop: 20 } : { opacity: 0, height: 0, marginTop: 0 })
              }
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <p style={{
                fontSize: '16px',
                color: '#64748B',
                lineHeight: 1.7,
                margin: 0,
                maxWidth: 520,
                fontWeight: 400
              }}>
                Every mentor joins through a rigorous evaluation process, and every learning journey is continuously reviewed using real parent feedback and measurable outcomes.
              </p>
            </motion.div>
          </div>

          {!isMobile && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <HeroIllustration />
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* LAYOUT SWAP FOR MOBILE VS DESKTOP                              */}
        {/* ============================================================== */}
        {isMobile ? (
          /* ========================================== */
          /* MOBILE LAYOUT                              */
          /* ========================================== */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* 1. Interactive Verification Timeline with Mobile Background Image */}
            <div style={{
              position: 'relative',
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px 18px',
              border: '1.2px solid rgba(99, 102, 241, 0.12)',
              boxShadow: '0 8px 30px rgba(99, 102, 241, 0.06)',
              overflow: 'hidden'
            }}>
              {/* Mobile Background Image */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  zIndex: 0,
                  borderRadius: '24px',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}ChatGPT Image Aug 10, 2026, 05_09_40 AM.webp`}
                  alt=""
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.65,
                    mixBlendMode: 'multiply',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0.2) 100%)',
                    maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0.2) 100%)'
                  }}
                />
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1E293B', margin: '0 0 24px', paddingLeft: 4 }}>
                  Teacher Verification Process
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '0 4px' }}>
                  {steps.map((s, idx) => {
                    const isActive = activeStep === idx;
                    const StepIcon = s.icon;
                    return (
                      <div key={idx} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                        {/* Left Column: Number Node & Connector Line */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '28px' }}>
                          {/* Circle node with number */}
                          <div 
                            onClick={() => setActiveStep(isActive ? null : idx)}
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              background: isActive ? '#6366F1' : '#FFFFFF',
                              border: `2px solid ${isActive ? '#6366F1' : 'rgba(99, 102, 241, 0.22)'}`,
                              color: isActive ? '#FFFFFF' : '#6366F1',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '11px',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              zIndex: 2,
                              boxShadow: isActive ? '0 4px 10px rgba(99, 102, 241, 0.2)' : 'none',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            {idx + 1}
                          </div>
                          {/* Line */}
                          {idx < steps.length - 1 && (
                            <div style={{
                              width: '2px',
                              flex: 1,
                              background: activeStep > idx ? '#6366F1' : 'rgba(99, 102, 241, 0.15)',
                              margin: '4px 0',
                              minHeight: '28px',
                              zIndex: 1,
                              transition: 'background 0.3s ease'
                            }} />
                          )}
                        </div>

                        {/* Right Column: Title & Description */}
                        <div style={{ flex: 1, paddingBottom: idx < steps.length - 1 ? '24px' : '0' }}>
                          <div 
                            onClick={() => setActiveStep(isActive ? null : idx)}
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '8px', 
                              cursor: 'pointer',
                              userSelect: 'none'
                            }}
                          >
                            <span style={{ 
                              fontSize: '15px', 
                              fontWeight: 800, 
                              color: isActive ? '#6366F1' : '#1E293B',
                              transition: 'color 0.3s ease'
                            }}>
                              {s.label}
                            </span>
                            <span style={{ 
                              fontSize: '11px', 
                              color: isActive ? '#6366F1' : 'rgba(99, 102, 241, 0.4)',
                              transition: 'color 0.3s ease'
                            }}>
                              {isActive ? '−' : '+'}
                            </span>
                          </div>

                          {/* Collapsible content */}
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                style={{ overflow: 'hidden' }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6366F1', marginBottom: 6 }}>
                                  <StepIcon size={14} />
                                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verification Stage</span>
                                </div>
                                <p style={{ 
                                  fontSize: '13px', 
                                  color: '#64748B', 
                                  lineHeight: '1.5', 
                                  margin: 0 
                                }}>
                                  {s.desc}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. Supporting Metrics - 2-Column Editorial Grid Layout */}
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1E293B', margin: '0 0 24px', paddingLeft: 4 }}>
                Supporting Metrics
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '32px 16px', 
                padding: '0 4px'
              }}>
                
                {/* Metric 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ fontSize: '42px', fontWeight: 900, color: '#6366F1', lineHeight: '1', marginBottom: '8px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                    96%
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#1E293B', marginBottom: '4px', lineHeight: '1.2' }}>
                    Parent Recommendation
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', lineHeight: '1.4' }}>
                    Real outcomes from onboarding
                  </div>
                </div>

                {/* Metric 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ fontSize: '42px', fontWeight: 900, color: '#6366F1', lineHeight: '1', marginBottom: '8px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                    4.9★
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#1E293B', marginBottom: '4px', lineHeight: '1.2' }}>
                    Parent Satisfaction
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', lineHeight: '1.4' }}>
                    Continuous review score
                  </div>
                </div>

                {/* Metric 3 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ fontSize: '42px', fontWeight: 900, color: '#6366F1', lineHeight: '1', marginBottom: '8px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                    <Counter target={finalTeacherCount} suffix="+" />
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#1E293B', marginBottom: '4px', lineHeight: '1.2' }}>
                    Verified Teachers
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', lineHeight: '1.4' }}>
                    Rigorous 7-stage vetting
                  </div>
                </div>

                {/* Metric 4 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ fontSize: '42px', fontWeight: 900, color: '#6366F1', lineHeight: '1', marginBottom: '8px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                    2,465+
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#1E293B', marginBottom: '4px', lineHeight: '1.2' }}>
                    Teaching Hours
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', lineHeight: '1.4' }}>
                    Structured progress mapped
                  </div>
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* ========================================== */
          /* DESKTOP LAYOUT                             */
          /* ========================================== */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            
            {/* Row 2: Timeline card + 565+ verified teachers */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '8fr 4fr',
              gap: '30px'
            }}>
              {/* Timeline Horizontal Stepper */}
              <div 
                onMouseEnter={() => setHoveredCard('timeline')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '36px',
                  border: '1.2px solid rgba(99, 102, 241, 0.1)',
                  boxShadow: hoveredCard === 'timeline' 
                    ? '0 20px 40px rgba(99, 102, 241, 0.05)' 
                    : '0 4px 15px rgba(10, 22, 40, 0.01)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '36px',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: 16, fontWeight: 800, color: '#1E293B', margin: 0 }}>
                    Teacher Verification Process
                  </h4>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#6366F1', display: 'flex', alignItems: 'center', gap: 6 }}>
                    7-Stage Rigorous Evaluation <ArrowRight size={14} />
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', width: '100%', padding: '0 10px' }}>
                  {/* Dashed connecting line */}
                  <div style={{ position: 'absolute', top: 25, left: '6%', right: '6%', height: 2, borderTop: '2px dashed rgba(99, 102, 241, 0.14)', zIndex: 0 }} />
                  
                  {steps.map((s, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1, width: '13%' }}
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1, backgroundColor: '#6366F1', color: '#FFFFFF' }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: '50%',
                          background: '#FFFFFF',
                          border: '1.5px solid rgba(99, 102, 241, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#6366F1',
                          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.03)',
                          cursor: 'default',
                          transition: 'border-color 0.3s'
                        }}
                      >
                        <s.icon size={20} strokeWidth={1.8} />
                      </motion.div>
                      <div style={{ 
                        fontSize: 13, 
                        fontWeight: 750, 
                        color: '#1E293B', 
                        marginTop: 14, 
                        textAlign: 'center', 
                        lineHeight: 1.25,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 34
                      }}>
                        {s.label.split(' ').map((word, i) => (
                          <div key={i} style={{ whiteSpace: 'nowrap' }}>{word}</div>
                        ))}
                      </div>

                      {/* Collapsible Step Description */}
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={hoveredCard === 'timeline'
                          ? { opacity: 0.85, height: 'auto', marginTop: 6 }
                          : { opacity: 0, height: 0, marginTop: 0 }
                        }
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center' }}
                      >
                        <span style={{ fontSize: 10, color: '#64748B', textAlign: 'center', lineHeight: 1.3 }}>{s.desc}</span>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Number summary count card */}
              <div 
                onMouseEnter={() => setHoveredCard('total')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: 'radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.015) 0%, rgba(255, 255, 255, 0.98) 100%)',
                  borderRadius: '24px',
                  padding: '36px',
                  border: '1.2px solid rgba(99, 102, 241, 0.1)',
                  boxShadow: hoveredCard === 'total' 
                    ? '0 20px 40px rgba(99, 102, 241, 0.05)' 
                    : '0 4px 15px rgba(10, 22, 40, 0.01)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div style={{ fontSize: 44, fontWeight: 900, color: '#6366F1', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  <Counter target={finalTeacherCount} suffix="+" />
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: '#1E293B', margin: '8px 0 0' }}>
                  Verified Teachers
                </h4>

                {/* Collapsible Verified Teachers Description */}
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={hoveredCard === 'total'
                    ? { opacity: 1, height: 'auto', marginTop: 12 }
                    : { opacity: 0, height: 0, marginTop: 0 }
                  }
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                    Actively teaching across multiple boards and learning formats. Every educator earns their place through our 7-stage rigorous evaluation.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Row 3: 3 Column Grid (Satisfaction, Ratings, Testimonial) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '30px'
            }}>
              
              {/* Card 1: 96% Ring chart */}
              <div 
                onMouseEnter={() => setHoveredCard('satisfaction')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '36px 30px',
                  border: '1.2px solid rgba(99, 102, 241, 0.1)',
                  boxShadow: hoveredCard === 'satisfaction' 
                    ? '0 20px 40px rgba(99, 102, 241, 0.05)' 
                    : '0 4px 15px rgba(10, 22, 40, 0.01)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  justifyContent: 'center',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {/* SVG radial ring progress */}
                  <svg width="56" height="56" viewBox="0 0 36 36" style={{ overflow: 'visible' }}>
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(16, 185, 129, 0.06)" strokeWidth="3.2" />
                    <motion.circle 
                      initial={{ strokeDasharray: "0 100" }}
                      whileInView={{ strokeDasharray: "96 4" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      cx="18" cy="18" r="15.915" fill="none" stroke="#10B981" strokeWidth="3.4" strokeDashoffset="25" strokeLinecap="round" 
                    />
                    <text x="18" y="21.5" fill="#1E293B" fontSize="9.5" fontWeight="bold" textAnchor="middle">96%</text>
                  </svg>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 800, color: '#1E293B', margin: 0 }}>Parent Recommendation</h4>
                    <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>Confidence & Trust</span>
                  </div>
                </div>

                {/* Collapsible Satisfaction Description */}
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={hoveredCard === 'satisfaction'
                    ? { opacity: 1, height: 'auto', marginTop: 12 }
                    : { opacity: 0, height: 0, marginTop: 0 }
                  }
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{ fontSize: 13.5, color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                    96% of parents say they would confidently recommend TheMentR to another family.
                  </p>
                </motion.div>
              </div>

              {/* Card 2: 4.9 Rating Infographic */}
              <div 
                onMouseEnter={() => setHoveredCard('rating')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '36px 30px',
                  border: '1.2px solid rgba(99, 102, 241, 0.1)',
                  boxShadow: hoveredCard === 'rating' 
                    ? '0 20px 40px rgba(99, 102, 241, 0.05)' 
                    : '0 4px 15px rgba(10, 22, 40, 0.01)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  justifyContent: 'center',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(251, 191, 36, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FBBF24'
                  }}>
                    <Star size={26} fill="#FBBF24" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 800, color: '#1E293B', margin: 0 }}>4.9★ Avg Rating</h4>
                    <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>Measured outcomes</span>
                  </div>
                </div>

                {/* Collapsible Rating Description */}
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={hoveredCard === 'rating'
                    ? { opacity: 1, height: 'auto', marginTop: 12 }
                    : { opacity: 0, height: 0, marginTop: 0 }
                  }
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{ fontSize: 13.5, color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                    Maintained through continuous parent reviews and quality monitoring of learning journeys.
                  </p>
                </motion.div>
              </div>

              {/* Card 3: Featured Testimonial Quote */}
              <div 
                onMouseEnter={() => setHoveredCard('quote')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: 'radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.02) 0%, rgba(255, 255, 255, 0.98) 100%)',
                  borderRadius: '24px',
                  padding: '36px 30px',
                  border: '1.2px solid rgba(99, 102, 241, 0.12)',
                  boxShadow: hoveredCard === 'quote' 
                    ? '0 20px 40px rgba(99, 102, 241, 0.06)' 
                    : '0 4px 15px rgba(10, 22, 40, 0.01)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#FBBF24" color="#FBBF24" />)}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#6366F1' }}>— Parent, Class VIII</span>
                </div>

                {/* Collapsible Testimonial Quote Description */}
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={hoveredCard === 'quote'
                    ? { opacity: 1, height: 'auto', marginTop: 12 }
                    : { opacity: 0, height: 0, marginTop: 0 }
                  }
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{ fontSize: 13.5, fontStyle: 'italic', color: '#1E293B', lineHeight: 1.6, margin: 0 }}>
                    "Our daughter found the perfect mentor within days. The structured onboarding gave us complete confidence."
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Row 4: Teacher Expertise Progress Bars */}
            <div 
              onMouseEnter={() => setHoveredCard('expertise')}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '36px',
                border: '1.2px solid rgba(99, 102, 241, 0.1)',
                boxShadow: hoveredCard === 'expertise' 
                  ? '0 20px 40px rgba(99, 102, 241, 0.05)' 
                  : '0 4px 15px rgba(10, 22, 40, 0.01)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: '#1E293B', margin: 0 }}>
                  Teacher Selection Rate by Board
                </h4>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>
                  Rigorous selection standard mapping
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px' }}>
                {[
                  { label: 'CBSE', val: 95, desc: 'Highly selective CBSE curriculum vetting standards.', color: '#6366F1' },
                  { label: 'ICSE', val: 83, desc: 'Advanced ICSE curriculum alignment evaluation.', color: '#7C5CFF' },
                  { label: 'State Board', val: 96, desc: 'Regional syllabus evaluation checks.', color: '#64748B' },
                  { label: 'IGCSE', val: 80, desc: 'International General Certificate of Secondary Education alignment.', color: '#10B981' }
                ].map(b => (
                  <div key={b.label} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 800 }}>
                      <span style={{ color: '#1E293B' }}>{b.label}</span>
                      <span style={{ color: b.color }}>{b.val}% Selection</span>
                    </div>
                    {/* Progress bar line */}
                    <div style={{ height: 6, borderRadius: 3, background: 'rgba(15, 23, 42, 0.04)', overflow: 'hidden' }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${b.val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{ height: '100%', borderRadius: 3, background: b.color }} 
                      />
                    </div>

                    {/* Collapsible Board Description */}
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={hoveredCard === 'expertise'
                        ? { opacity: 0.85, height: 'auto', marginTop: 4 }
                        : { opacity: 0, height: 0, marginTop: 0 }
                      }
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ fontSize: 11, color: '#64748B', lineHeight: 1.45, margin: 0 }}>
                        {b.desc}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
