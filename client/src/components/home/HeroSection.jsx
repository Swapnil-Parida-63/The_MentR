import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import { 
  ShieldCheck, 
  Star, 
  Clock, 
  Target, 
  LineChart, 
  BarChart3, 
  PieChart, 
  ArrowRight, 
  ChevronDown, 
  LayoutDashboard 
} from 'lucide-react';

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



/* ========================================================================== */
/* CONTINUOUS LEARNING PATH AND HAND-DRAWN DOODLES                            */
/* ========================================================================== */

function HeroJourneyDoodles({ isMobile = false }) {
  if (isMobile) {
    return null; // Do not display this image/doodles in mobile view
  }

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1920 1080" 
        preserveAspectRatio="xMidYMid slice" 
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        {/* Continuous Dotted Path */}
        <motion.path 
          d="M 120,720 C 180,480 320,250 680,180 C 800,160 920,140 980,180 C 1030,200 1050,280 1020,340 C 980,420 850,380 880,460 C 910,500 950,550 850,650 C 780,720 900,820 1050,820 C 1150,820 1220,780 1300,750"
          stroke="url(#doodleGrad)"
          strokeWidth="2"
          strokeDasharray="6,8"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
          style={{ opacity: 0.3 }}
        />

        {/* Gradients & Definitions */}
        <defs>
          <linearGradient id="doodleGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4F7CFF" />
            <stop offset="50%" stopColor="#7C5CFF" />
            <stop offset="100%" stopColor="#4F7CFF" />
          </linearGradient>
        </defs>

        {/* ==================== SVG DOODLE ICONS ==================== */}

        {/* 1. Open Book (X: 680, Y: 180) */}
        <g transform="translate(645, 140) scale(1.3)" style={{ opacity: 0.35 }}>
          <path d="M 5,20 C 15,10 25,12 35,17 C 45,12 55,10 65,20 L 65,40 C 55,30 45,32 35,37 C 25,32 15,30 5,40 Z" stroke="#4F7CFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 35,17 L 35,37" stroke="#4F7CFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M 2,10 L 4,12 M 1,12 L 3,10 M 68,10 L 70,12" stroke="#7C5CFF" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* 2. Paper Airplane (X: 980, Y: 180) */}
        <g transform="translate(960, 150) scale(1.1) rotate(-15)" style={{ opacity: 0.35 }}>
          <path d="M 0,20 L 40,0 L 28,32 L 18,24 L 0,20 Z" stroke="#7C5CFF" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 18,24 L 40,0" stroke="#7C5CFF" strokeWidth="1.5" />
        </g>

        {/* 3. Target with Arrow (X: 1020, Y: 340) */}
        <g transform="translate(995, 315) scale(1.2)" style={{ opacity: 0.35 }}>
          <circle cx="20" cy="20" r="18" stroke="#4F7CFF" strokeWidth="1.8" fill="none" />
          <circle cx="20" cy="20" r="11" stroke="#4F7CFF" strokeWidth="1.2" fill="none" />
          <circle cx="20" cy="20" r="5" stroke="#4F7CFF" strokeWidth="1" fill="#4F7CFF" />
          <line x1="42" y1="-2" x2="22" y2="18" stroke="#7C5CFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M 22,13 L 22,18 L 27,18" stroke="#7C5CFF" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        </g>

        {/* 4. Graduation Cap (X: 850, Y: 650) */}
        <g transform="translate(820, 610) scale(1.3)" style={{ opacity: 0.35 }}>
          <polygon points="25,5 45,12 25,19 5,12" stroke="#7C5CFF" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
          <path d="M 12,15.5 V 23.5 C 12,23.5 17,28.5 25,28.5 C 33,28.5 38,23.5 38,23.5 V 15.5" stroke="#7C5CFF" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 38,12 V 22" stroke="#7C5CFF" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="38" cy="23" r="2" fill="#7C5CFF" />
        </g>

        {/* 5. Stack of Books (X: 1050, Y: 820) */}
        <g transform="translate(1015, 785) scale(1.2)" style={{ opacity: 0.35 }}>
          <path d="M 5,25 H 55 V 35 H 5 Z" stroke="#4F7CFF" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 50,25 V 35 M 46,25 V 35" stroke="#4F7CFF" strokeWidth="1.2" />
          <g transform="rotate(-5, 30, 20)">
            <path d="M 8,13 H 58 V 23 H 8 Z" stroke="#7C5CFF" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 12,13 V 23" stroke="#7C5CFF" strokeWidth="1.5" />
          </g>
        </g>

        {/* 6. Pencil Holder (X: 120, Y: 720) */}
        <g transform="translate(95, 680) scale(1.3)" style={{ opacity: 0.35 }}>
          <path d="M 10,25 L 14,55 H 36 L 40,25 Z" stroke="#4F7CFF" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
          <line x1="18" y1="25" x2="10" y2="2" stroke="#7C5CFF" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 10,2 L 7,5 L 12,7 Z" stroke="#7C5CFF" strokeWidth="1.2" fill="none" />
          <line x1="25" y1="25" x2="25" y2="0" stroke="#4F7CFF" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 25,0 L 22,4 H 28 Z" stroke="#4F7CFF" strokeWidth="1.2" fill="none" />
          <line x1="32" y1="25" x2="42" y2="4" stroke="#7C5CFF" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 42,4 L 39,7 L 44,9 Z" stroke="#7C5CFF" strokeWidth="1.2" fill="none" />
        </g>

        {/* 7. Lightbulb (Ideas) (X: 1350, Y: 300) */}
        <g transform="translate(1335, 275) scale(1.1)" style={{ opacity: 0.3 }}>
          <path d="M 20,5 C 10,5 5,13 5,22 C 5,28 10,32 12,35 V 40 H 28 V 35 C 30,32 35,28 35,22 C 35,13 30,5 20,5 Z" stroke="#7C5CFF" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="15" y1="43" x2="25" y2="43" stroke="#7C5CFF" strokeWidth="1.8" />
          <path d="M 15,22 H 25 M 20,17 V 27" stroke="#7C5CFF" strokeWidth="1.2" />
        </g>

        {/* 8. Compass (Guidance) (X: 1250, Y: 220) */}
        <g transform="translate(1230, 200) scale(1.1)" style={{ opacity: 0.25 }}>
          <circle cx="20" cy="20" r="16" stroke="#4F7CFF" strokeWidth="1.8" fill="none" />
          <polygon points="20,10 24,20 20,30 16,20" stroke="#7C5CFF" strokeWidth="1.5" fill="none" />
          <line x1="20" y1="5" x2="20" y2="10" stroke="#4F7CFF" strokeWidth="1.2" />
          <line x1="20" y1="30" x2="20" y2="35" stroke="#4F7CFF" strokeWidth="1.2" />
          <line x1="5" y1="20" x2="10" y2="20" stroke="#4F7CFF" strokeWidth="1.2" />
          <line x1="30" y1="20" x2="35" y2="20" stroke="#4F7CFF" strokeWidth="1.2" />
        </g>

        {/* 9. Rocket (Growth) (X: 1720, Y: 220) */}
        <g transform="translate(1700, 190) scale(1.1) rotate(15)" style={{ opacity: 0.28 }}>
          <path d="M 15,5 C 22,12 25,25 22,35 H 8 C 5,25 8,12 15,5 Z" stroke="#4F7CFF" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 8,30 L 2,36 L 5,35" stroke="#4F7CFF" strokeWidth="1.2" fill="none" />
          <path d="M 22,30 L 28,36 L 25,35" stroke="#4F7CFF" strokeWidth="1.2" fill="none" />
          <path d="M 11,35 L 15,45 L 19,35" stroke="#7C5CFF" strokeWidth="1.5" fill="none" />
        </g>

        {/* 10. Star Constellations / Sparkles */}
        <g style={{ opacity: 0.25 }}>
          <line x1="100" y1="120" x2="180" y2="90" stroke="#4F7CFF" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="180" y1="90" x2="240" y2="150" stroke="#4F7CFF" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="120" r="3" fill="#4F7CFF" />
          <circle cx="180" cy="90" r="3" fill="#4F7CFF" />
          <circle cx="240" cy="150" r="3" fill="#4F7CFF" />

          <path d="M 625,120 L 625,126 M 622,123 H 628" stroke="#7C5CFF" strokeWidth="1.2" />
          <path d="M 755,130 L 755,136 M 752,133 H 758" stroke="#7C5CFF" strokeWidth="1.2" />
          <path d="M 1060,290 L 1060,296 M 1057,293 H 1063" stroke="#4F7CFF" strokeWidth="1.2" />
        </g>

        {/* 11. Chess Knight (Strategy) (X: 1100, Y: 530) */}
        <g transform="translate(1085, 510) scale(1.0)" style={{ opacity: 0.25 }}>
          <path d="M 10,30 C 10,20 15,10 25,10 C 28,10 32,15 30,22 C 32,20 36,22 35,28 C 30,30 28,25 28,35 H 10" stroke="#7C5CFF" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <rect x="8" y="35" width="24" height="6" rx="1" stroke="#7C5CFF" strokeWidth="1.8" fill="none" />
        </g>

        {/* 12. Clock (Consistency) (X: 720, Y: 850) */}
        <g transform="translate(700, 830) scale(1.1)" style={{ opacity: 0.26 }}>
          <circle cx="15" cy="15" r="13" stroke="#4F7CFF" strokeWidth="1.8" fill="none" />
          <line x1="15" y1="15" x2="15" y2="8" stroke="#4F7CFF" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="15" y1="15" x2="20" y2="18" stroke="#4F7CFF" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* 13. Brain (X: 900, Y: 270) */}
        <g transform="translate(885, 250) scale(1.0)" style={{ opacity: 0.25 }}>
          <path d="M 15,15 C 8,15 5,25 15,25 C 10,32 20,35 25,30 C 30,35 40,32 35,25 C 45,25 42,15 35,15 Z" stroke="#7C5CFF" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
          <path d="M 25,15 V 30" stroke="#7C5CFF" strokeWidth="1.2" />
        </g>

        {/* 14. DNA Strand (X: 520, Y: 860) */}
        <g transform="translate(500, 840) scale(1.0)" style={{ opacity: 0.25 }}>
          <path d="M 5,5 Q 15,15 25,5 M 5,20 Q 15,10 25,20" stroke="#4F7CFF" strokeWidth="1.8" fill="none" />
          <line x1="10" y1="9" x2="10" y2="16" stroke="#7C5CFF" strokeWidth="1.2" />
          <line x1="15" y1="10" x2="15" y2="15" stroke="#7C5CFF" strokeWidth="1.2" />
          <line x1="20" y1="9" x2="20" y2="16" stroke="#7C5CFF" strokeWidth="1.2" />
          <circle cx="5" cy="5" r="2" fill="#4F7CFF" />
          <circle cx="25" cy="5" r="2" fill="#4F7CFF" />
          <circle cx="5" cy="20" r="2" fill="#7C5CFF" />
          <circle cx="25" cy="20" r="2" fill="#7C5CFF" />
        </g>

        {/* 15. A+ Stamp (X: 1800, Y: 220) */}
        <g transform="translate(1780, 200) scale(1.1)" style={{ opacity: 0.3 }}>
          <circle cx="18" cy="18" r="16" stroke="#7C5CFF" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          <text x="9" y="24" fontFamily="'Architects Daughter', cursive" fontSize="16" fontWeight="bold" fill="#7C5CFF">A+</text>
        </g>

        {/* ==================== HANDWRITTEN LABELS ==================== */}

        {/* "Learn / Explore / Achieve" */}
        <g transform="translate(1080, 110)" style={{ opacity: 0.45 }}>
          <text x="0" y="0" fontFamily="'Caveat', cursive" fontSize="24" fontWeight="bold" fill="#4F7CFF" transform="rotate(-6)">Learn</text>
          <text x="15" y="24" fontFamily="'Caveat', cursive" fontSize="24" fontWeight="bold" fill="#7C5CFF" transform="rotate(-4)">Explore</text>
          <text x="30" y="48" fontFamily="'Caveat', cursive" fontSize="24" fontWeight="bold" fill="#4F7CFF" transform="rotate(-2)">Achieve</text>
        </g>

        {/* "Goals" */}
        <text 
          x="1080" 
          y="370" 
          fontFamily="'Caveat', cursive" 
          fontSize="22" 
          fontWeight="bold" 
          fill="#7C5CFF" 
          style={{ opacity: 0.45 }}
          transform="rotate(5 1080 370)"
        >
          Goals
        </text>

        {/* "Personalized Learning" */}
        <text 
          x="880" 
          y="460" 
          textAnchor="middle"
          fontFamily="'Caveat', cursive" 
          fontSize="28" 
          fontWeight="bold" 
          fill="#7C5CFF" 
          style={{ opacity: 0.5 }}
          transform="rotate(-5 880 460)"
        >
          Personalized Learning
        </text>

        {/* "Better Tomorrow" */}
        <text 
          x="850" 
          y="695" 
          textAnchor="middle"
          fontFamily="'Caveat', cursive" 
          fontSize="24" 
          fontWeight="bold" 
          fill="#4F7CFF" 
          style={{ opacity: 0.5 }}
          transform="rotate(3 850 695)"
        >
          Better Tomorrow
        </text>
      </svg>
    </div>
  );
}

/* ========================================================================== */
/* SEAMLESS HERO ECOSYSTEM IMAGE WITH BLENDED BORDERS                         */
/* ========================================================================== */

function HeroEcosystemImage() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0px',
      overflow: 'visible'
    }}>
      <img
        src={`${import.meta.env.BASE_URL}Gemini_Generated_Image_lmg5iglmg5iglmg5.png`}
        alt="MentR Educational Ecosystem"
        style={{
          width: '100%',
          maxWidth: '1570px',
          height: 'auto',
          objectFit: 'contain',
          mixBlendMode: 'multiply',
          WebkitMaskImage: 'radial-gradient(ellipse at 60% 50%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 90%)',
          maskImage: 'radial-gradient(ellipse at 60% 50%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 90%)',
        }}
      />
    </div>
  );
}

/* ========================================================================== */
/* LEFT SIDE STATISTICS COMPONENT                                             */
/* ========================================================================== */

function TrustMetrics({ isMobile = false, teacherCount = 639, teachingHours = 1961.5 }) {
  return (
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
      gap: isMobile ? '16px 12px' : '16px',
      alignItems: 'center',
      borderTop: '1px solid #E2E8F0',
      paddingTop: 20,
      width: '100%',
      marginTop: isMobile ? 20 : 0
    }}>
      {/* 639+ Verified Teachers */}
      <motion.div whileHover={{ y: -2 }} style={{ cursor: 'pointer', display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(37, 99, 235, 0.08)', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ShieldCheck size={18} />
        </div>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, var(--font-hero)', fontSize: isMobile ? 15 : 17, fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
            <CountUp end={teacherCount} suffix="+" />
          </div>
          <div style={{ fontSize: 11, color: '#64748B', fontWeight: 500, marginTop: 1 }}>
            Verified Teachers
          </div>
        </div>
      </motion.div>

      {/* 4.9★ Parent Satisfaction */}
      <motion.div whileHover={{ y: -2 }} style={{ cursor: 'pointer', display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(245, 158, 11, 0.1)', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Star size={18} fill="#F59E0B" color="#F59E0B" />
        </div>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, var(--font-hero)', fontSize: isMobile ? 15 : 17, fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
            <CountUp end={4.9} decimals={1} suffix="★" />
          </div>
          <div style={{ fontSize: 11, color: '#64748B', fontWeight: 500, marginTop: 1 }}>
            Parent Satisfaction
          </div>
        </div>
      </motion.div>

      {/* 1961.5+ Teaching Hours */}
      <motion.div whileHover={{ y: -2 }} style={{ cursor: 'pointer', display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(124, 58, 237, 0.08)', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Clock size={18} />
        </div>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, var(--font-hero)', fontSize: isMobile ? 15 : 17, fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
            <CountUp end={teachingHours} decimals={1} suffix="+" />
          </div>
          <div style={{ fontSize: 11, color: '#64748B', fontWeight: 500, marginTop: 1 }}>
            Teaching Hours
          </div>
        </div>
      </motion.div>

      {/* Assessment First Diagnostic Framework */}
      <motion.div whileHover={{ y: -2 }} style={{ cursor: 'pointer', display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(16, 185, 129, 0.08)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Target size={18} />
        </div>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, var(--font-hero)', fontSize: isMobile ? 13 : 14, fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
            Assessment First
          </div>
          <div style={{ fontSize: 11, color: '#64748B', fontWeight: 500, marginTop: 1 }}>
            Diagnostic Framework
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ========================================================================== */
/* MAIN HERO SECTION COMPONENT                                                */
/* ========================================================================== */

export default function HeroSection() {
  const { openModal } = useModal();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isMobileContentExpanded, setIsMobileContentExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
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

  const getTeachingHours = () => {
    const baseDate = new Date('2026-07-22T00:00:00');
    const currentDate = new Date();
    const diffTime = Math.max(0, currentDate - baseDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return 1961.5 + diffDays * 31.5;
  };

  return (
    <section 
      id="hero" 
      style={{ 
        minHeight: 'auto', 
        display: 'flex', 
        alignItems: 'center', 
        background: '#FFFFFF', 
        position: 'relative', 
        overflow: 'hidden', 
        padding: isMobile ? '160px 0 40px' : '125px 0 50px' 
      }}
    >
      {/* Background Layer 1: Ambient light glows */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '-5%',
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
        filter: 'blur(90px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '5%',
        right: '-5%',
        width: '45vw',
        height: '45vw',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)',
        filter: 'blur(100px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* Mobile Top Right Background Graphic */}
      {isMobile && (
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '320px',
          height: '320px',
          zIndex: 1,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}>
          <img 
            src="/ChatGPT Image Jul 31, 2026, 01_55_40 AM.png" 
            alt="Ecosystem graphic" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transform: 'translate(0%, -10%)',
              opacity: 0.9,
              imageRendering: 'auto',
              WebkitBackfaceVisibility: 'hidden',
              maskImage: 'radial-gradient(circle at top right, black 35%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(circle at top right, black 35%, transparent 75%)'
            }} 
          />
        </div>
      )}



      {/* Continuous Learning Journey Doodles Layer */}
      <HeroJourneyDoodles isMobile={isMobile} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        
        {/* DESKTOP COMPOSITION */}
        {!isMobile && (
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '46% 54%', 
              gap: '36px',
              alignItems: 'center'
            }}
          >
            {/* LEFT COLUMN */}
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              
              {/* Section Label */}
              <span style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 11,
                color: '#2563EB',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 16
              }}>
                <span style={{ color: '#2563EB', fontSize: 8 }}>●</span> EDUCATIONAL ECOSYSTEM
              </span>

              {/* Main Heading */}
              <h1 style={{
                fontFamily: 'var(--font-hero)',
                fontWeight: 800,
                fontSize: 'clamp(42px, 3.8vw, 62px)',
                lineHeight: 1.1,
                letterSpacing: '-0.035em',
                color: '#0F172A',
                margin: '0 0 20px'
              }}>
                Every child<br />
                deserves the<br />
                <span style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  right mentor.
                </span>
              </h1>

              {/* Supporting Paragraph */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 450,
                fontSize: 15.5,
                color: '#64748B',
                lineHeight: 1.6,
                maxWidth: '460px',
                margin: '0 0 30px'
              }}>
                Finding the right teacher shouldn't be guesswork.<br />
                Assessment-first learning. Verified educators.<br />
                Personalized guidance. Measurable outcomes.
              </p>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: 14, marginBottom: 36 }}>
                <button
                  onClick={() => openModal('parent')}
                  className="btn btn-hero-primary"
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #4F7CFF 100%)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 14.5,
                    padding: '13px 26px',
                    borderRadius: 9999,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.35)',
                    transition: 'all 0.25s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  Book a Demo <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => openModal('teacher')}
                  className="btn btn-hero-secondary"
                  style={{
                    background: '#FFFFFF',
                    color: '#0F172A',
                    fontWeight: 700,
                    fontSize: 14.5,
                    padding: '13px 26px',
                    borderRadius: 9999,
                    border: '1.5px solid #E2E8F0',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  Join as a Teacher
                </button>
              </div>

              {/* Statistics Row */}
              <TrustMetrics 
                isMobile={false} 
                teacherCount={getTeacherCount()} 
                teachingHours={getTeachingHours()} 
              />
            </div>

            {/* RIGHT COLUMN: Desktop Single Integrated Illustration */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}>
              
              <HeroEcosystemImage />

            </div>

          </div>
        )}

        {/* MOBILE COMPOSITION */}
        {isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, textAlign: 'left', position: 'relative', zIndex: 2 }}>
            
            {/* 1. Heading */}
            <div style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => setIsMobileContentExpanded(!isMobileContentExpanded)}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 11,
                color: '#2563EB',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 10
              }}>
                <span style={{ color: '#2563EB', fontSize: 8 }}>●</span> EDUCATIONAL ECOSYSTEM
              </span>
              <h1 style={{
                fontFamily: 'var(--font-hero)',
                fontWeight: 800,
                fontSize: 32,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: '#0F172A',
                margin: '0 0 10px'
              }}>
                Every child deserves the{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  right mentor.
                </span>
              </h1>
            </div>

            <AnimatePresence>
              {isMobileContentExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: '#64748B',
                    lineHeight: 1.55,
                    margin: '0 0 10px'
                  }}>
                    Finding the right teacher shouldn't be guesswork. Assessment-first learning. Verified educators. Personalized guidance. Measurable outcomes.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2. CTA Buttons (Always Visible) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
              <button
                onClick={() => openModal('parent')}
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #4F7CFF 100%)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 14.5,
                  padding: '13px 22px',
                  borderRadius: 9999,
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'center',
                  boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8
                }}
              >
                Book a Demo <ArrowRight size={15} />
              </button>
              <button
                onClick={() => openModal('teacher')}
                style={{
                  background: '#FFFFFF',
                  color: '#0F172A',
                  fontWeight: 700,
                  fontSize: 14.5,
                  padding: '13px 22px',
                  borderRadius: 9999,
                  border: '1.5px solid #E2E8F0',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                Join as a Teacher
              </button>
            </div>

            {/* 3. Statistics Grid (Always Visible) */}
            <TrustMetrics 
              isMobile={true} 
              teacherCount={getTeacherCount()} 
              teachingHours={getTeachingHours()} 
            />

          </div>
        )}

      </div>

      <style>{`
        .btn-hero-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(37, 99, 235, 0.4) !important;
        }
        .btn-hero-secondary:hover {
          transform: translateY(-2px);
          border-color: #2563EB !important;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08) !important;
        }
        @keyframes pulseScale {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.04); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
