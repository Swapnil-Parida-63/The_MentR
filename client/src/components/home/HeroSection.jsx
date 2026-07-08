import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import { ShieldCheck, ClipboardCheck, Users, UserCheck, LineChart, ChevronRight } from 'lucide-react';
import BlurText from './BlurText';

function CountUp({ end, duration = 1500, decimals = 0, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasStarted(true);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentVal = progress * end;
      setCount(currentVal);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}

export default function HeroSection() {
  const { openModal } = useModal();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [liveTime, setLiveTime] = useState(new Date());

  // Accordion active element state (mostly for mobile/tablet, but works as initial hover state on desktop)
  const [activeModule, setActiveModule] = useState('understand');
  const [hoveredModule, setHoveredModule] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    
    // Simple ticking timer just in case we need it, though no active clock is in the prompt requirements
    const timer = setInterval(() => setLiveTime(new Date()), 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(timer);
    };
  }, []);

  const getTeacherCount = () => {
    const baseDate = new Date('2026-07-01T00:00:00');
    const currentDate = new Date();
    const diffTime = Math.max(0, currentDate - baseDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return 500 + diffDays * 3;
  };

  const journeyModules = [
    {
      id: 'understand',
      title: 'Understand',
      desc: 'Understand every learner',
      longDesc: 'We start with a structured evaluation of academic level, learning style, and targets.',
      icon: ClipboardCheck,
      offsetX: -40
    },
    {
      id: 'match',
      title: 'Match',
      desc: 'Find the right mentor',
      longDesc: 'Our matchmaking logic pairs the student with the perfect verified CBSE/ICSE educator.',
      icon: Users,
      offsetX: 40
    },
    {
      id: 'learn',
      title: 'Learn',
      desc: 'Personalized teaching',
      longDesc: 'Focused one-to-one home or online sessions structured entirely around the child’s pace.',
      icon: UserCheck,
      offsetX: -15
    },
    {
      id: 'measure',
      title: 'Measure',
      desc: 'Track every milestone',
      longDesc: 'Continuous tracking via the AVSAR index with instant diagnostic feedback reports.',
      icon: LineChart,
      offsetX: 35
    },
    {
      id: 'succeed',
      title: 'Succeed',
      desc: 'Real academic outcomes',
      longDesc: 'Confidence, higher conceptual clarity, and visible growth in school results.',
      icon: ShieldCheck,
      offsetX: 0
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      id="hero" 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        background: '#FAFAFC', 
        position: 'relative', 
        overflow: 'hidden', 
        padding: isMobile ? '120px 0 80px' : '160px 0 100px' 
      }}
    >
      {/* Subtle radial brand background blobs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '0.45fr 0.55fr', 
            gap: isMobile ? '64px' : '80px',
            alignItems: 'center'
          }}
        >
          {/* ============================================================== */}
          {/* LEFT COLUMN (45%): manifesto & ctas */}
          {/* ============================================================== */}
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            {/* Small Label */}
            <span style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 11,
              color: '#6366F1',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 20
            }}>
              <span style={{ color: '#6366F1', fontSize: 8 }}>●</span> EDUCATIONAL ECOSYSTEM
            </span>

            {/* Main Title Heading */}
            <div style={{
              fontFamily: 'var(--font-hero)',
              fontWeight: 800,
              fontSize: isMobile ? 'clamp(38px, 8.5vw, 48px)' : 'clamp(54px, 4.5vw, 76px)',
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              color: '#1E293B',
              margin: '0 0 24px'
            }}>
              <BlurText text="Every child" delay={80} animateBy="words" direction="bottom" />
              <BlurText text="deserves the" delay={80} animateBy="words" direction="bottom" />
              <BlurText text="right mentor." delay={80} animateBy="words" direction="bottom" />
            </div>

            {/* Sub-text supporting paragraph */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 16,
              color: '#64748B',
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: '0 0 36px'
            }}>
              Finding the right teacher shouldn't be guesswork.<br />
              Assessment-first learning. Verified educators.<br />
              Personalized guidance. Measurable outcomes.
            </p>

            {/* CTA Buttons */}
            <div style={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row', 
              gap: 16, 
              marginBottom: 48,
              width: isMobile ? '100%' : 'auto'
            }}>
              <button
                onClick={() => openModal('parent')}
                className="btn btn-hero-primary"
                style={{
                  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: 15,
                  padding: '14px 28px',
                  borderRadius: 9999,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)',
                  transition: 'all 0.2s ease',
                  width: isMobile ? '100%' : 'auto',
                  textAlign: 'center'
                }}
              >
                Book a Demo
              </button>
              <button
                onClick={() => openModal('teacher')}
                className="btn btn-hero-secondary"
                style={{
                  background: '#FFFFFF',
                  color: '#1E293B',
                  fontWeight: 600,
                  fontSize: 15,
                  padding: '14px 28px',
                  borderRadius: 9999,
                  border: '1px solid rgba(99, 102, 241, 0.15)',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(10, 22, 40, 0.02)',
                  transition: 'all 0.2s ease',
                  width: isMobile ? '100%' : 'auto',
                  textAlign: 'center'
                }}
              >
                Join as a Teacher
              </button>
            </div>

            {/* Trust Metrics Section */}
            <div style={{ 
              display: 'flex', 
              gap: isMobile ? 24 : 40, 
              alignItems: 'center',
              borderTop: '1px solid #E8EAF2',
              paddingTop: 32,
              width: '100%',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: isMobile ? 24 : 32, fontWeight: 700, color: '#1E293B', lineHeight: 1.1 }}>
                  <CountUp end={getTeacherCount()} suffix="+" />
                </div>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500, marginTop: 4 }}>
                  Verified Teachers
                </div>
              </div>
              <div style={{ width: 1, height: 32, background: '#E8EAF2' }} />
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: isMobile ? 24 : 32, fontWeight: 700, color: '#1E293B', lineHeight: 1.1 }}>
                  <CountUp end={4.9} decimals={1} suffix="★" />
                </div>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500, marginTop: 4 }}>
                  Parent Satisfaction
                </div>
              </div>
              <div style={{ width: 1, height: 32, background: '#E8EAF2' }} />
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: isMobile ? 24 : 32, fontWeight: 700, color: '#1E293B', lineHeight: 1.1 }}>
                  Assessment First
                </div>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500, marginTop: 4 }}>
                  Diagnostic Framework
                </div>
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN (55%): signature learning journey widget */}
          {/* ============================================================== */}
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            minHeight: isMobile ? 'auto' : '580px',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? 12 : 20,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            
            {/* Elegant connection line behind cards (Desktop) */}
            {!isMobile && (
              <div style={{
                position: 'absolute',
                top: 40,
                bottom: 40,
                left: '50%',
                width: 1.5,
                background: 'linear-gradient(to bottom, #6366F1 0%, #8B5CF6 50%, #A78BFA 100%)',
                zIndex: 1,
                opacity: 0.15
              }} />
            )}

            {/* Journey Modules */}
            {journeyModules.map((module) => {
              const IconComp = module.icon;
              const isHovered = hoveredModule === module.id;
              const isMobileExpanded = activeModule === module.id;
              
              const isExpanded = isMobile ? isMobileExpanded : isHovered;

              return (
                <div
                  key={module.id}
                  onMouseEnter={() => !isMobile && setHoveredModule(module.id)}
                  onMouseLeave={() => !isMobile && setHoveredModule(null)}
                  onClick={() => isMobile && setActiveModule(activeModule === module.id ? null : module.id)}
                  style={{
                    width: isMobile ? '100%' : '360px',
                    background: '#FFFFFF',
                    borderRadius: 20,
                    border: `1.5px solid ${isExpanded ? '#6366F1' : 'rgba(99, 102, 241, 0.08)'}`,
                    boxShadow: isExpanded 
                      ? '0 12px 24px rgba(99, 102, 241, 0.06)' 
                      : '0 4px 12px rgba(10, 22, 40, 0.01)',
                    padding: '16px 20px',
                    zIndex: 2,
                    cursor: 'pointer',
                    transform: isMobile 
                      ? 'none' 
                      : `translate3d(${module.offsetX}px, ${isExpanded ? '-4px' : '0px'}, 0)`,
                    transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms ease, box-shadow 300ms ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    textAlign: 'left'
                  }}
                >
                  {/* Top Row: Icon + Title & Short text */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: isExpanded ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isExpanded ? '#6366F1' : '#64748B',
                      flexShrink: 0,
                      transition: 'all 300ms ease'
                    }}>
                      <IconComp size={18} strokeWidth={2} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontFamily: 'var(--font-section)',
                        fontWeight: 700,
                        fontSize: 15,
                        color: '#1E293B',
                        margin: 0
                      }}>
                        {module.title}
                      </h4>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 12,
                        color: '#64748B',
                        margin: 0,
                        lineHeight: 1.3
                      }}>
                        {module.desc}
                      </p>
                    </div>
                    {isMobile && (
                      <ChevronRight 
                        size={16} 
                        style={{ 
                          color: '#94A3B8',
                          transform: isExpanded ? 'rotate(90deg)' : 'none',
                          transition: 'transform 200ms ease'
                        }} 
                      />
                    )}
                  </div>

                  {/* Expanded description area */}
                  <div style={{
                    maxHeight: isExpanded ? '80px' : '0px',
                    opacity: isExpanded ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease'
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                      color: '#64748B',
                      lineHeight: 1.5,
                      margin: '4px 0 0 50px'
                    }}>
                      {module.longDesc}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>

        </motion.div>
      </div>

      <style>{`
        .btn-hero-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35) !important;
        }
        .btn-hero-secondary:hover {
          transform: translateY(-2px);
          border-color: #6366F1 !important;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.08) !important;
        }
      `}</style>
    </section>
  );
}
