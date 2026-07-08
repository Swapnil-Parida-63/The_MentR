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

function TypingText({ text, delay = 0.02, startDelay = 0.4 }) {
  const characters = text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
        delayChildren: startDelay
      }
    }
  };

  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      style={{ display: 'inline' }}
    >
      {characters.map((char, i) => (
        <motion.span key={i} variants={charVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

const NETWORK_DATA = {
  desktop: {
    nodes: [
      { id: 1, cx: 180, cy: 150, color: '#6366F1' },
      { id: 2, cx: 380, cy: 360, color: '#8B5CF6' },
      { id: 3, cx: 280, cy: 620, color: '#6366F1' },
      { id: 4, cx: 620, cy: 460, color: '#8B5CF6' },
      { id: 5, cx: 760, cy: 200, color: '#A78BFA' },
      { id: 6, cx: 900, cy: 690, color: '#6366F1' },
      { id: 7, cx: 1080, cy: 320, color: '#8B5CF6' },
      { id: 8, cx: 1280, cy: 160, color: '#A78BFA' },
      { id: 9, cx: 1220, cy: 570, color: '#6366F1' },
      { id: 10, cx: 1360, cy: 440, color: '#8B5CF6' },
      { id: 11, cx: 1390, cy: 720, color: '#A78BFA' },
      { id: 12, cx: 1140, cy: 800, color: '#6366F1' }
    ],
    lines: [
      { x1: 180, y1: 150, x2: 380, y2: 360 },
      { x1: 380, y1: 360, x2: 280, y2: 620 },
      { x1: 380, y1: 360, x2: 620, y2: 460 },
      { x1: 620, y1: 460, x2: 760, y2: 200 },
      { x1: 620, y1: 460, x2: 900, y2: 690 },
      { x1: 760, y1: 200, x2: 1080, y2: 320 },
      { x1: 1080, y1: 320, x2: 1280, y2: 160 },
      { x1: 1080, y1: 320, x2: 1220, y2: 570 },
      { x1: 1280, y1: 160, x2: 1360, y2: 440 },
      { x1: 1360, y1: 440, x2: 1220, y2: 570 },
      { x1: 1220, y1: 570, x2: 1390, y2: 720 },
      { x1: 1220, y1: 570, x2: 1140, y2: 800 },
      { x1: 900, y1: 690, x2: 1140, y2: 800 }
    ],
    paths: [
      'M 80,300 C 350,150 700,500 1000,420',
      'M 150,650 C 450,750 800,300 1100,500',
      'M 50,150 Q 500,100 850,350'
    ]
  },
  tablet: {
    nodes: [
      { id: 2, cx: 380, cy: 360, color: '#8B5CF6' },
      { id: 4, cx: 620, cy: 460, color: '#8B5CF6' },
      { id: 5, cx: 760, cy: 200, color: '#A78BFA' },
      { id: 7, cx: 1080, cy: 320, color: '#8B5CF6' },
      { id: 9, cx: 1220, cy: 570, color: '#6366F1' },
      { id: 8, cx: 1280, cy: 160, color: '#A78BFA' },
      { id: 12, cx: 1140, cy: 800, color: '#6366F1' }
    ],
    lines: [
      { x1: 380, y1: 360, x2: 620, y2: 460 },
      { x1: 620, y1: 460, x2: 760, y2: 200 },
      { x1: 760, y1: 200, x2: 1080, y2: 320 },
      { x1: 1080, y1: 320, x2: 1280, y2: 160 },
      { x1: 1080, y1: 320, x2: 1220, y2: 570 },
      { x1: 1220, y1: 570, x2: 1140, y2: 800 }
    ],
    paths: [
      'M 80,300 C 350,150 700,500 1000,420',
      'M 150,650 C 450,750 800,300 1100,500'
    ]
  },
  mobile: {
    nodes: [
      { id: 2, cx: 380, cy: 360, color: '#8B5CF6' },
      { id: 4, cx: 620, cy: 460, color: '#8B5CF6' },
      { id: 7, cx: 1080, cy: 320, color: '#8B5CF6' },
      { id: 9, cx: 1220, cy: 570, color: '#6366F1' }
    ],
    lines: [
      { x1: 380, y1: 360, x2: 620, y2: 460 },
      { x1: 620, y1: 460, x2: 1080, y2: 320 },
      { x1: 1080, y1: 320, x2: 1220, y2: 570 }
    ],
    paths: []
  }
};
function TrustMetrics({ isMobile = false, teacherCount = 524, teachingHours = 1200 }) {
  return (
    <div style={{ 
      display: 'flex', 
      gap: isMobile ? '16px 24px' : '16px 24px', 
      alignItems: 'center',
      borderTop: '1px solid #E8EAF2',
      paddingTop: 32,
      width: '100%',
      flexWrap: isMobile ? 'wrap' : 'nowrap',
      marginTop: isMobile ? 48 : 0
    }}>
      <div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: isMobile ? 22 : 25, fontWeight: 700, color: '#1E293B', lineHeight: 1.1 }}>
          <CountUp end={teacherCount} suffix="+" />
        </div>
        <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500, marginTop: 4 }}>
          Verified Teachers
        </div>
      </div>
      <div style={{ width: 1, height: 32, background: '#E8EAF2' }} />
      <div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: isMobile ? 22 : 25, fontWeight: 700, color: '#1E293B', lineHeight: 1.1 }}>
          <CountUp end={4.9} decimals={1} suffix="★" />
        </div>
        <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500, marginTop: 4 }}>
          Parent Satisfaction
        </div>
      </div>
      <div style={{ width: 1, height: 32, background: '#E8EAF2' }} />
      <div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: isMobile ? 22 : 25, fontWeight: 700, color: '#1E293B', lineHeight: 1.1 }}>
          <CountUp end={teachingHours} decimals={1} suffix="+ Hrs" />
        </div>
        <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500, marginTop: 4 }}>
          Teaching Hours
        </div>
      </div>
      <div style={{ width: 1, height: 32, background: '#E8EAF2' }} />
      <div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: isMobile ? 22 : 25, fontWeight: 700, color: '#1E293B', lineHeight: 1.1 }}>
          Assessment First
        </div>
        <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500, marginTop: 4 }}>
          Diagnostic Framework
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { openModal } = useModal();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [device, setDevice] = useState(
    window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop'
  );

  // Accordion active element state (for mobile taps & initial state on desktop)
  const [activeModule, setActiveModule] = useState('understand');
  const [hoveredModule, setHoveredModule] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);
      if (width < 768) {
        setDevice('mobile');
      } else if (width < 1024) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getTeacherCount = () => {
    const baseDate = new Date('2026-07-01T00:00:00');
    const currentDate = new Date();
    const diffTime = Math.max(0, currentDate - baseDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return 500 + diffDays * 3;
  };

  const getTeachingHours = () => {
    const baseDate = new Date('2026-07-01T00:00:00');
    const currentDate = new Date();
    const diffTime = Math.max(0, currentDate - baseDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return 1200 + diffDays * 3.5;
  };

  const journeyModules = [
    {
      id: 'understand',
      title: 'Understand',
      desc: 'Understand every learner.',
      icon: ClipboardCheck,
      offsetX: -40,
      bullets: [
        'Home Assessment',
        'Learning Style Analysis',
        'Parent Consultation'
      ]
    },
    {
      id: 'match',
      title: 'Match',
      desc: 'Find the right mentor.',
      icon: Users,
      offsetX: 40,
      bullets: [
        `${getTeacherCount()}+ Verified Teachers`,
        'Subject Matching',
        'Board Matching',
        'Teaching Style Matching'
      ]
    },
    {
      id: 'learn',
      title: 'Learn',
      desc: 'Personalized one-to-one teaching.',
      icon: UserCheck,
      offsetX: -15,
      bullets: [
        'One-to-One Sessions',
        'Online + Offline',
        'Flexible Scheduling'
      ]
    },
    {
      id: 'measure',
      title: 'Measure',
      desc: 'Track every milestone.',
      icon: LineChart,
      offsetX: 35,
      bullets: [
        'Weekly Reports',
        'Parent Dashboard',
        'Progress Tracking'
      ]
    },
    {
      id: 'achieve',
      title: 'Achieve',
      desc: 'Real academic outcomes.',
      icon: ShieldCheck,
      offsetX: 0,
      bullets: [
        '4.9★ Parent Rating',
        '98% Recommendation',
        'Real Academic Progress'
      ]
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
        minHeight: 'auto', 
        display: 'flex', 
        alignItems: 'center', 
        background: '#FAFAFC', 
        position: 'relative', 
        overflow: 'hidden', 
        padding: isMobile ? '100px 0 60px' : '135px 0 45px' 
      }}
    >
      {/* Background Layer 1: Ambient light glows */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '-10%',
        width: '45vw',
        height: '45vw',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.015) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 1,
        pointerEvents: 'none',
        animation: 'breatheGlow 18s ease-in-out infinite'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        width: '55vw',
        height: '55vw',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.02) 0%, transparent 70%)',
        filter: 'blur(90px)',
        zIndex: 1,
        pointerEvents: 'none',
        animation: 'breatheGlow 14s ease-in-out infinite'
      }} />

      {/* Background Layer 2: Soft radial gradient behind learning journey */}
      <div style={{
        position: 'absolute',
        top: isMobile ? '35%' : '5%',
        right: isMobile ? '-10%' : '-5%',
        width: isMobile ? '80vw' : '55vw',
        height: isMobile ? '80vw' : '55vw',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.035) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* Background Layer 2 (Network) & Layer 3 (Flowing Paths): Sparse responsive network */}
      <svg 
        viewBox="0 0 1440 900" 
        preserveAspectRatio="none"
        style={{ 
          position: 'absolute', 
          inset: 0, 
          width: '100%', 
          height: '100%', 
          pointerEvents: 'none', 
          zIndex: 1,
          animation: 'breatheNetwork 16s ease-in-out infinite'
        }}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.02" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.01" />
            <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Layer 3: Flowing Paths (Desktop and Tablet only) */}
        {(device === 'desktop' || device === 'tablet') && NETWORK_DATA[device].paths.map((p, idx) => (
          <g key={`path-group-${idx}`}>
            {/* Base static path */}
            <path
              d={p}
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="1.5"
            />
            {/* Traveling glowing pulse path */}
            <path
              d={p}
              fill="none"
              stroke="url(#pulseGradient)"
              strokeWidth="2.5"
              strokeDasharray="80, 240"
              style={{
                animation: `flowPath ${6 + idx * 2.5}s linear infinite`,
                animationDelay: `-${idx * 2.2}s`
              }}
            />
          </g>
        ))}

        {/* Layer 2: Educational Network Lines */}
        {NETWORK_DATA[device].lines.map((line, idx) => (
          <g key={`line-group-${idx}`}>
            {/* Base static network connection line */}
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgba(99, 102, 241, 0.12)"
              strokeWidth="1"
              opacity={isMobile ? 0.12 : 0.22}
            />
            {/* Traveling line pulse */}
            {!isMobile && (
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#8B5CF6"
                strokeWidth="1.5"
                opacity="0.45"
                strokeDasharray="25, 120"
                style={{
                  animation: `flowLine ${4 + (idx % 3) * 1.5}s linear infinite`,
                  animationDelay: `-${idx * 0.3}s`
                }}
              />
            )}
          </g>
        ))}

        {/* Layer 2: Educational Network Nodes */}
        {NETWORK_DATA[device].nodes.map((node) => (
          <g key={`node-group-${node.id}`}>
            {/* Pulsing overlay circle */}
            <circle
              cx={node.cx}
              cy={node.cy}
              fill={node.color}
              className="pulse-overlay-node"
              style={{
                animationDelay: `-${node.id * 0.4}s`
              }}
            />
            {/* Core static node circle */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r={isMobile ? 2.5 : 3.5}
              fill={node.color}
              opacity={isMobile ? 0.35 : 0.55}
            />
          </g>
        ))}
      </svg>

      {/* Background Layer 4: Procedural SVG Noise Grain Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity: isMobile ? 0.008 : 0.015,
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '0.45fr 0.55fr', 
            gap: isMobile ? '48px' : '80px',
            alignItems: 'center'
          }}
        >
          {/* ============================================================== */}
          {/* LEFT COLUMN (45%): Label, Headline, Text, CTA Buttons */}
          {/* ============================================================== */}
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            {/* Section Label */}
            <span style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
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

            {/* Supporting Copy */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 16,
              color: '#64748B',
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: '0 0 36px'
            }}>
              <TypingText text="Finding the right teacher shouldn't be guesswork." delay={0.015} startDelay={0.3} /><br />
              <TypingText text="Assessment-first learning. Verified educators." delay={0.015} startDelay={0.9} /><br />
              <TypingText text="Personalized guidance. Measurable outcomes." delay={0.015} startDelay={1.5} />
            </p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row', 
                gap: 16, 
                marginBottom: isMobile ? 0 : 48,
                width: isMobile ? '100%' : 'auto'
              }}
            >
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
            </motion.div>

            {/* Desktop-only Trust Metrics */}
            {!isMobile && (
              <TrustMetrics 
                isMobile={isMobile} 
                teacherCount={getTeacherCount()} 
                teachingHours={getTeachingHours()} 
              />
            )}

          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN (55%): signature learning journey timeline */}
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
            
            {/* Connection Line behind cards */}
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

            {/* Journey Modules */}
            {journeyModules.map((module, index) => {
              const IconComp = module.icon;
              const isHovered = hoveredModule === module.id;
              const isMobileExpanded = activeModule === module.id;
              
              const isExpanded = isMobile ? isMobileExpanded : isHovered;

              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: isExpanded ? -4 : 0 }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.35 + index * 0.12 },
                    y: isExpanded 
                      ? { duration: 0.2, ease: 'easeOut' }
                      : { duration: 0.6, delay: 0.35 + index * 0.12, ease: [0.16, 1, 0.3, 1] }
                  }}
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
                    marginLeft: isMobile ? '0px' : `${module.offsetX * 2.5}px`,
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

                  {/* Expanded description bullet points list */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{
                          overflow: 'hidden'
                        }}
                      >
                        <div style={{
                          marginTop: 10,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 6,
                          paddingLeft: 50
                        }}>
                          {module.bullets.map((bullet, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#64748B' }}>
                              <span style={{ color: '#6366F1', fontSize: 10 }}>✦</span>
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}

          </div>

          {/* Mobile-only Trust Metrics */}
          {isMobile && (
            <TrustMetrics 
              isMobile={isMobile} 
              teacherCount={getTeacherCount()} 
              teachingHours={getTeachingHours()} 
            />
          )}

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
        @keyframes breatheGlow {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.8; }
          50% { transform: scale(1.05) translate(15px, -15px); opacity: 1; }
        }
        @keyframes breatheNetwork {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        .pulse-overlay-node {
          animation: pulseOverlay 4s ease-in-out infinite;
        }
        @keyframes pulseOverlay {
          0%, 100% {
            r: 3.5px;
            opacity: 0.05;
          }
          50% {
            r: 9px;
            opacity: 0.35;
          }
        }
        @keyframes flowPath {
          from {
            stroke-dashoffset: 320;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes flowLine {
          from {
            stroke-dashoffset: 145;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}
