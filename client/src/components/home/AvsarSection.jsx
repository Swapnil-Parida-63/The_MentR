import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  MessageSquare, 
  Video, 
  User, 
  GraduationCap, 
  Check, 
  Star, 
  ArrowRight 
} from 'lucide-react';

function Counter({ target, suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals]);
  
  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// Vector graphics for the Bento cards
const illustrations = {
  profileStack: (
    <svg width="150" height="135" viewBox="0 0 160 140" fill="none" style={{ overflow: 'visible', maxWidth: '100%' }}>
      <defs>
        <radialGradient id="teacher-card-glow" cx="60%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#818CF8" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#C7D2FE" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="95" cy="70" r="60" fill="url(#teacher-card-glow)" />

      {/* Background Secondary Cards in Stack */}
      <rect x="22" y="32" width="70" height="84" rx="12" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1.5" transform="rotate(-8 22 32)" opacity="0.6" />
      <rect x="90" y="24" width="70" height="84" rx="12" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1.5" transform="rotate(8 90 24)" opacity="0.6" />

      {/* Main Front Profile Card */}
      <g className="front-profile-card" style={{ transition: 'transform 0.35s ease' }}>
        <rect x="52" y="16" width="80" height="102" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.6" filter="drop-shadow(0 10px 24px rgba(99, 102, 241, 0.12))" />
        
        {/* Avatar Circle */}
        <circle cx="92" cy="46" r="17" fill="#E0F2FE" />
        <circle cx="92" cy="42" r="6.5" fill="#0284C7" />
        <path d="M 80 56 C 80 50, 85 48, 92 48 C 99 48, 104 50, 104 56" fill="#0284C7" />

        {/* Lines */}
        <rect x="66" y="72" width="52" height="4" rx="2" fill="#CBD5E1" />
        <rect x="66" y="81" width="38" height="3.5" rx="1.75" fill="#E2E8F0" />
        <rect x="66" y="89" width="46" height="3.5" rx="1.75" fill="#E2E8F0" />

        {/* Verified Badge */}
        <g className="id-check-badge" style={{ transformOrigin: '124px 74px', transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
          <circle cx="124" cy="74" r="12" fill="#2563EB" />
          <path d="M 119 74 L 123 78 L 130 70" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* Sparkles */}
      <path d="M 38 18 Q 38 23 43 23 Q 38 23 38 28 Q 38 23 33 23 Q 38 23 38 18 Z" fill="#38BDF8" />
      <path d="M 148 42 Q 148 45 151 45 Q 148 45 148 48 Q 148 45 145 45 Q 148 45 148 42 Z" fill="#818CF8" />
    </svg>
  ),

  parentChild: (
    <svg width="120" height="95" viewBox="0 0 130 100" fill="none" style={{ overflow: 'visible', maxWidth: '100%' }}>
      <defs>
        <radialGradient id="mint-glow" cx="60%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#A7F3D0" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="75" cy="55" r="45" fill="url(#mint-glow)" />

      {/* Parent Silhouette (Mint green) */}
      <g className="parent-figure" style={{ transition: 'transform 0.35s ease' }}>
        <circle cx="52" cy="40" r="14" fill="#6EE7B7" />
        <path d="M 30 84 C 30 64, 40 56, 52 56 C 64 56, 74 64, 74 84 Z" fill="#6EE7B7" />
      </g>

      {/* Child Silhouette (Emerald) */}
      <g className="child-figure" style={{ transition: 'transform 0.35s ease' }}>
        <circle cx="86" cy="54" r="10.5" fill="#10B981" />
        <path d="M 70 84 C 70 70, 77 64, 86 64 C 95 64, 102 70, 102 84 Z" fill="#10B981" />
      </g>

      {/* Speech Bubble with Heart */}
      <g className="heart-bubble" style={{ transformOrigin: '82px 22px', transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
        <rect x="70" y="10" width="24" height="20" rx="7" fill="#E6FFFA" stroke="#10B981" strokeWidth="1.4" />
        <path d="M 77 24 L 74 29 L 81 24 Z" fill="#E6FFFA" stroke="#10B981" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M 82 17 C 82 14.5, 78 13.5, 78 16.5 C 78 19, 82 21, 82 21 C 82 21, 86 19, 86 16.5 C 86 13.5, 82 14.5, 82 17 Z" fill="#10B981" />
      </g>
    </svg>
  ),

  barChart: (
    <svg width="100" height="90" viewBox="0 0 110 100" fill="none" style={{ overflow: 'visible', maxWidth: '100%' }}>
      <defs>
        <radialGradient id="amber-glow" cx="60%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#FEF3C7" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="55" r="45" fill="url(#amber-glow)" />

      {/* Ascending Warm Amber Bars */}
      <g className="bar-chart-bars" style={{ transition: 'transform 0.35s ease' }}>
        <rect x="22" y="60" width="12" height="28" rx="4" fill="#FDE68A" />
        <rect x="39" y="44" width="12" height="44" rx="4" fill="#FCD34D" />
        <rect x="56" y="28" width="12" height="60" rx="4" fill="#FBBF24" />
        <rect x="73" y="14" width="12" height="74" rx="4" fill="#F59E0B" />
      </g>

      {/* Sparkles around top bar */}
      <line x1="78" y1="4" x2="78" y2="0" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="88" y1="8" x2="93" y2="4" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
};

export default function AvsarSection({ isStandalonePage = false }) {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 960);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const verificationStages = [
    {
      num: 1,
      title: 'Application',
      desc: 'Initial vetting',
      icon: FileText,
      color: '#0284C7',
      bg: '#E0F2FE',
      isActive: false
    },
    {
      num: 2,
      title: 'Profile Review',
      desc: 'Credentials check',
      icon: Search,
      color: '#10B981',
      bg: '#DCFCE7',
      isActive: false
    },
    {
      num: 3,
      title: 'Interview',
      desc: 'Pedagogical fit',
      icon: MessageSquare,
      color: '#F97316',
      bg: '#FFEDD5',
      isActive: false
    },
    {
      num: 4,
      title: 'Demo Session',
      desc: 'Live teaching',
      icon: Video,
      color: '#8B5CF6',
      bg: '#F3E8FF',
      isActive: false
    },
    {
      num: 5,
      title: 'Identity Check',
      desc: 'Security review',
      icon: User,
      color: '#FFFFFF',
      bg: '#2563EB',
      isActive: true
    },
    {
      num: 6,
      title: 'Training',
      desc: 'Playbook alignment',
      icon: GraduationCap,
      color: '#7C3AED',
      bg: '#EDE9FE',
      isActive: false
    },
    {
      num: 7,
      title: 'Approved',
      desc: 'Ready to teach',
      icon: Check,
      color: '#10B981',
      bg: '#ECFDF5',
      isActive: false
    }
  ];

  const boardRates = [
    { name: 'CBSE', rate: 79, color: '#2563EB', barBg: '#DBEAFE' },
    { name: 'ICSE', rate: 68, color: '#7C3AED', barBg: '#EDE9FE' },
    { name: 'State Board', rate: 82, color: '#334155', barBg: '#E2E8F0' },
    { name: 'IGCSE', rate: 59, color: '#10B981', barBg: '#D1FAE5' }
  ];

  return (
    <section
      id="avsar"
      style={{
        background: 'linear-gradient(180deg, #F8FAFF 0%, #FFFFFF 50%, #F8FAFF 100%)',
        padding: isMobile ? '40px 0 60px' : isStandalonePage ? '10px 0 80px' : '70px 0 90px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)'
      }}
    >
      {/* Background Soft Glows */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 124, 255, 0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(116, 105, 248, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: isMobile ? '28px' : '40px' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 13,
              color: '#4F46E5',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: 10,
              background: 'rgba(99, 102, 241, 0.08)',
              padding: '4px 12px',
              borderRadius: 100
            }}
          >
            AVSAR (Trust Through Quality)
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-hero, var(--font-sans))',
              fontWeight: 800,
              fontSize: isMobile ? 'clamp(28px, 6vw, 36px)' : 'clamp(36px, 3.2vw, 46px)',
              lineHeight: 1.18,
              letterSpacing: '-0.025em',
              color: '#0F172A',
              margin: '0 0 10px'
            }}
          >
            Quality isn't claimed. It's measured.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 400,
              fontSize: 15,
              color: '#64748B',
              lineHeight: 1.6,
              maxWidth: '580px',
              margin: 0
            }}
          >
            Every teacher joins through our rigorous 7-stage verification process, and every learning journey is continuously monitored through real parent outcomes.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '18px' : '22px'
          }}
        >
          {/* ========================================================= */}
          {/* ROW 1 CARD 1: Teacher Verification Process (Spans 2 Col) */}
          {/* ========================================================= */}
          <motion.div
            onMouseEnter={() => setHoveredCard('verification')}
            onMouseLeave={() => setHoveredCard(null)}
            className="bento-card avsar-verification-card"
            style={{
              gridColumn: isMobile ? 'span 1' : 'span 2',
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1.2px solid rgba(199, 210, 254, 0.8)',
              boxShadow:
                hoveredCard === 'verification'
                  ? '0 20px 35px -8px rgba(99, 102, 241, 0.18), 0 4px 12px -2px rgba(0, 0, 0, 0.03)'
                  : '0 8px 24px -4px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
              padding: isMobile ? '24px 18px' : '30px 34px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: isMobile ? 'auto' : 240,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transform: hoveredCard === 'verification' ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Soft Cyan/Indigo Mesh Glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '60%',
                background: 'radial-gradient(ellipse at 85% 20%, rgba(244, 240, 255, 0.75) 0%, rgba(241, 247, 255, 0.4) 50%, transparent 80%)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            {/* Top Header Row */}
            <div
              style={{
                display: 'flex',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'space-between',
                flexDirection: isMobile ? 'column' : 'row',
                gap: 12,
                marginBottom: 24,
                zIndex: 1
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 800,
                    fontSize: 21,
                    color: '#0F172A',
                    margin: '0 0 4px',
                    letterSpacing: '-0.015em'
                  }}
                >
                  Teacher Verification Process
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 400,
                    fontSize: 13.5,
                    color: '#64748B',
                    margin: 0
                  }}
                >
                  A 7-stage rigorous evaluation to ensure the best learning experience.
                </p>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '5px 14px',
                  borderRadius: 100,
                  background: 'rgba(99, 102, 241, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.16)',
                  color: '#4F46E5',
                  fontSize: 11.5,
                  fontWeight: 700,
                  whiteSpace: 'nowrap'
                }}
              >
                <span>7-Stage Rigorous Evaluation</span>
                <ArrowRight size={13} strokeWidth={2.4} />
              </div>
            </div>

            {/* 7-Stage Horizontal Stepper */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                position: 'relative',
                width: '100%',
                padding: '10px 4px 0',
                zIndex: 1,
                overflowX: isMobile ? 'auto' : 'visible',
                gap: isMobile ? 16 : 0
              }}
            >
              {/* Connecting Line */}
              {!isMobile && (
                <div
                  style={{
                    position: 'absolute',
                    top: 30,
                    left: '6%',
                    right: '6%',
                    height: 2,
                    borderTop: '2px dashed rgba(99, 102, 241, 0.18)',
                    zIndex: 0
                  }}
                />
              )}

              {verificationStages.map((stage, idx) => {
                const IconComp = stage.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                      zIndex: 1,
                      minWidth: isMobile ? 80 : 'auto',
                      width: isMobile ? 'auto' : `${100 / 7}%`
                    }}
                  >
                    {/* Circle Icon Badge */}
                    <div
                      style={{
                        width: stage.isActive ? 46 : 42,
                        height: stage.isActive ? 46 : 42,
                        borderRadius: '50%',
                        background: stage.bg,
                        color: stage.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: stage.isActive ? '2.5px solid #2563EB' : '1.5px solid rgba(255, 255, 255, 0.9)',
                        boxShadow: stage.isActive
                          ? '0 6px 18px rgba(37, 99, 235, 0.35)'
                          : '0 4px 10px rgba(15, 23, 42, 0.04)',
                        marginBottom: 10,
                        transition: 'transform 0.3s ease',
                        flexShrink: 0
                      }}
                    >
                      <IconComp size={stage.isActive ? 20 : 18} strokeWidth={2.4} />
                    </div>

                    {/* Stage Title */}
                    <span
                      style={{
                        fontSize: 12.5,
                        fontWeight: 800,
                        color: '#0F172A',
                        textAlign: 'center',
                        lineHeight: 1.25,
                        marginBottom: 3,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {stage.title}
                    </span>

                    {/* Stage Subtitle */}
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 500,
                        color: '#64748B',
                        textAlign: 'center',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {stage.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* ROW 1 CARD 2: 756+ Verified Teachers (Spans 1 Col)        */}
          {/* ========================================================= */}
          <motion.div
            onMouseEnter={() => setHoveredCard('verifiedCount')}
            onMouseLeave={() => setHoveredCard(null)}
            className="bento-card avsar-teachers-card"
            style={{
              gridColumn: 'span 1',
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1.2px solid rgba(186, 230, 253, 0.8)',
              boxShadow:
                hoveredCard === 'verifiedCount'
                  ? '0 20px 35px -8px rgba(56, 189, 248, 0.2), 0 4px 12px -2px rgba(0, 0, 0, 0.03)'
                  : '0 8px 24px -4px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
              padding: isMobile ? '24px 20px' : '30px 28px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              minHeight: isMobile ? 'auto' : 240,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transform: hoveredCard === 'verifiedCount' ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Soft Blue Mesh Glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '70%',
                background: 'radial-gradient(ellipse at 85% 50%, rgba(186, 230, 253, 0.45) 0%, rgba(224, 242, 254, 0.2) 50%, transparent 80%)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            {/* Left Content */}
            <div style={{ zIndex: 1, maxWidth: '58%' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display, var(--font-sans))',
                  fontWeight: 900,
                  fontSize: 'clamp(38px, 3.2vw, 44px)',
                  color: '#1D4ED8',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  marginBottom: 6
                }}
              >
                <Counter target={756} suffix="+" />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 800,
                  fontSize: 18,
                  color: '#0F172A',
                  margin: '0 0 6px',
                  letterSpacing: '-0.01em'
                }}
              >
                Verified Teachers
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 400,
                  fontSize: 13,
                  color: '#64748B',
                  lineHeight: 1.45,
                  margin: 0
                }}
              >
                Highly qualified, background vetted and continuously reviewed.
              </p>
            </div>

            {/* Right Graphic */}
            <div
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 140,
                height: 125,
                zIndex: 1
              }}
            >
              <motion.div animate={{ y: hoveredCard === 'verifiedCount' ? -4 : 0 }} transition={{ duration: 0.35 }}>
                {illustrations.profileStack}
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* ROW 2 CARD 1: Parent Recommendation (Spans 1 Col)        */}
          {/* ========================================================= */}
          <motion.div
            onMouseEnter={() => setHoveredCard('parentRec')}
            onMouseLeave={() => setHoveredCard(null)}
            className="bento-card avsar-parent-card"
            style={{
              gridColumn: 'span 1',
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1.2px solid rgba(116, 105, 248, 0.22)',
              boxShadow:
                hoveredCard === 'parentRec'
                  ? '0 20px 35px -8px rgba(116, 105, 248, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.03)'
                  : '0 8px 24px -4px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
              padding: isMobile ? '24px 20px' : '26px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: isMobile ? 'auto' : 210,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transform: hoveredCard === 'parentRec' ? 'translateY(-3px)' : 'translateY(0)',
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
                width: '75%',
                background: 'radial-gradient(ellipse at 85% 85%, rgba(116, 105, 248, 0.09) 0%, rgba(244, 240, 255, 0.35) 50%, transparent 80%)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            {/* Top Row: Circular Ring Progress + Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, zIndex: 1 }}>
              <div style={{ position: 'relative', width: 54, height: 54, flexShrink: 0 }}>
                <svg width="54" height="54" viewBox="0 0 40 40" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="20" cy="20" r="16" stroke="rgba(79, 124, 255, 0.12)" strokeWidth="3.6" fill="none" />
                  <motion.circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke="#4F7CFF"
                    strokeWidth="3.6"
                    strokeDasharray="100.5"
                    initial={{ strokeDashoffset: 100.5 }}
                    whileInView={{ strokeDashoffset: 100.5 * (1 - 0.96) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 900,
                    color: '#0F172A',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  96%
                </span>
              </div>

              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 800,
                    fontSize: 16.5,
                    color: '#0F172A',
                    margin: '0 0 2px'
                  }}
                >
                  Parent Recommendation
                </h4>
                <span style={{ fontSize: 11.5, color: '#64748B', fontWeight: 500 }}>
                  Confidence & Trust
                </span>
              </div>
            </div>

            {/* Bottom Content Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginTop: 14,
                zIndex: 1
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 400,
                  fontSize: 12.5,
                  color: '#64748B',
                  lineHeight: 1.45,
                  margin: 0,
                  maxWidth: '60%'
                }}
              >
                96% of parents would recommend our verified teachers to other families.
              </p>

              <div style={{ flexShrink: 0, marginRight: -8, marginBottom: -6 }}>
                <motion.div animate={{ y: hoveredCard === 'parentRec' ? -3 : 0 }} transition={{ duration: 0.35 }}>
                  {illustrations.parentChild}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* ROW 2 CARD 2: 4.9 Avg Rating (Spans 1 Col)                */}
          {/* ========================================================= */}
          <motion.div
            onMouseEnter={() => setHoveredCard('avgRating')}
            onMouseLeave={() => setHoveredCard(null)}
            className="bento-card avsar-rating-card"
            style={{
              gridColumn: 'span 1',
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1.2px solid rgba(254, 243, 199, 0.9)',
              boxShadow:
                hoveredCard === 'avgRating'
                  ? '0 20px 35px -8px rgba(245, 158, 11, 0.18), 0 4px 12px -2px rgba(0, 0, 0, 0.03)'
                  : '0 8px 24px -4px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
              padding: isMobile ? '24px 20px' : '26px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: isMobile ? 'auto' : 210,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transform: hoveredCard === 'avgRating' ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Soft Warm Yellow Mesh Glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '75%',
                background: 'radial-gradient(ellipse at 85% 85%, rgba(254, 243, 199, 0.55) 0%, rgba(255, 251, 235, 0.2) 50%, transparent 80%)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            {/* Top Row: Star Badge + Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, zIndex: 1 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#FEF3C7',
                  color: '#F59E0B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Star size={24} fill="#F59E0B" />
              </div>

              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 800,
                    fontSize: 17.5,
                    color: '#0F172A',
                    margin: '0 0 2px'
                  }}
                >
                  4.9★ Avg Rating
                </h4>
                <span style={{ fontSize: 11.5, color: '#64748B', fontWeight: 500 }}>
                  Measured outcomes
                </span>
              </div>
            </div>

            {/* Bottom Content Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginTop: 14,
                zIndex: 1
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 400,
                  fontSize: 12.5,
                  color: '#64748B',
                  lineHeight: 1.45,
                  margin: 0,
                  maxWidth: '65%'
                }}
              >
                Maintained through continuous parent reviews and quality monitoring of learning journeys.
              </p>

              <div style={{ flexShrink: 0, marginRight: -4, marginBottom: -6 }}>
                <motion.div animate={{ y: hoveredCard === 'avgRating' ? -3 : 0 }} transition={{ duration: 0.35 }}>
                  {illustrations.barChart}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* ROW 2 CARD 3: Teacher Review Quote (Spans 1 Col)          */}
          {/* ========================================================= */}
          <motion.div
            onMouseEnter={() => setHoveredCard('teacherQuote')}
            onMouseLeave={() => setHoveredCard(null)}
            className="bento-card avsar-quote-card"
            style={{
              gridColumn: 'span 1',
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1.2px solid rgba(233, 213, 255, 0.8)',
              boxShadow:
                hoveredCard === 'teacherQuote'
                  ? '0 20px 35px -8px rgba(168, 85, 247, 0.18), 0 4px 12px -2px rgba(0, 0, 0, 0.03)'
                  : '0 8px 24px -4px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
              padding: isMobile ? '24px 20px' : '26px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: isMobile ? 'auto' : 210,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transform: hoveredCard === 'teacherQuote' ? 'translateY(-3px)' : 'translateY(0)',
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
                background: 'radial-gradient(ellipse at 85% 85%, rgba(237, 233, 254, 0.5) 0%, rgba(245, 243, 255, 0.2) 50%, transparent 80%)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            {/* Decorative Huge Quote Mark at Bottom Right */}
            <div
              style={{
                position: 'absolute',
                bottom: 4,
                right: 14,
                fontSize: 68,
                fontFamily: 'Georgia, serif',
                fontWeight: 900,
                color: '#DDD6FE',
                lineHeight: 1,
                opacity: 0.6,
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 0
              }}
            >
              ”
            </div>

            {/* Top Stars & Teacher Name */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 8,
                zIndex: 1
              }}
            >
              <div style={{ display: 'flex', gap: 3 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#6366F1" color="#6366F1" />
                ))}
              </div>

              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 800,
                  color: '#4338CA'
                }}
              >
                Pratisimita Sahoo <span style={{ fontWeight: 500, color: '#6366F1' }}>(Verified Teacher)</span>
              </span>
            </div>

            {/* Quote Body */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 13,
                color: '#334155',
                lineHeight: 1.55,
                margin: '14px 0 0',
                position: 'relative',
                zIndex: 1
              }}
            >
              "Very friendly atmosphere, friendly and supportive staff. It's my first experience as a teacher and very excited for the journey. Thank you."
            </p>
          </motion.div>

          {/* ========================================================= */}
          {/* ROW 3 CARD: Teacher Selection Rate by Board (Full Span)   */}
          {/* ========================================================= */}
          <motion.div
            onMouseEnter={() => setHoveredCard('selectionRate')}
            onMouseLeave={() => setHoveredCard(null)}
            className="bento-card avsar-board-card"
            style={{
              gridColumn: isMobile ? 'span 1' : 'span 3',
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1.2px solid rgba(226, 232, 240, 0.9)',
              boxShadow:
                hoveredCard === 'selectionRate'
                  ? '0 20px 35px -8px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)'
                  : '0 8px 24px -4px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
              padding: isMobile ? '24px 20px' : '28px 34px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transform: hoveredCard === 'selectionRate' ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Header Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 8,
                marginBottom: 24
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 800,
                  fontSize: 19,
                  color: '#0F172A',
                  margin: 0,
                  letterSpacing: '-0.015em'
                }}
              >
                Teacher Selection Rate by Board
              </h3>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#64748B'
                }}
              >
                Rigorous selection standard mapping
              </span>
            </div>

            {/* 4 Board Columns */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                gap: isMobile ? '18px' : '32px'
              }}
            >
              {boardRates.map((b) => (
                <div key={b.name} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13.5, fontWeight: 800, color: '#0F172A' }}>
                      {b.name}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: b.color }}>
                      {b.rate}% Selection
                    </span>
                  </div>

                  {/* Colored Progress Bar */}
                  <div
                    style={{
                      height: 6,
                      borderRadius: 99,
                      background: 'rgba(15, 23, 42, 0.05)',
                      overflow: 'hidden'
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${b.rate}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        borderRadius: 99,
                        background: b.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .avsar-verification-card:hover .id-check-badge {
          transform: scale(1.18) rotate(6deg);
        }
        .avsar-parent-card:hover .heart-bubble {
          transform: scale(1.18) translateY(-2px);
        }
        .avsar-rating-card:hover .bar-chart-bars {
          transform: translateY(-3px);
        }
      `}</style>
    </section>
  );
}
