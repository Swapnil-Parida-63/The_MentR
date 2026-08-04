import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, Hourglass, Shield, Eye, Calendar, Target, Award } from 'lucide-react';

export default function PainPointsSection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [activeParentId, setActiveParentId] = useState(null);
  const [activeTeacherId, setActiveTeacherId] = useState(null);
  const [hoveredPanel, setHoveredPanel] = useState(null);

  // Mobile progressive disclosure states
  const [isParentIntroExpanded, setIsParentIntroExpanded] = useState(false);
  const [isTeacherIntroExpanded, setIsTeacherIntroExpanded] = useState(false);
  const [expandedParentPoint, setExpandedParentPoint] = useState(null);
  const [expandedTeacherPoint, setExpandedTeacherPoint] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const parentPoints = [
    {
      id: 'fam-1',
      title: 'Finding trusted teachers',
      description: 'Finding a qualified, vetted teacher often feels overwhelming and uncertain.',
      icon: Search
    },
    {
      id: 'fam-2',
      title: 'Learning feels invisible',
      description: 'Without structured tracking, understanding your child\'s real progress is a guessing game.',
      icon: Compass
    },
    {
      id: 'fam-3',
      title: 'Every wrong tutor costs',
      description: 'Switching tutors repeatedly drains both time and valuable family resources.',
      icon: Hourglass
    },
    {
      id: 'fam-4',
      title: 'Safety matters',
      description: 'Trust and background safety should be the foundation, never a gamble.',
      icon: Shield
    }
  ];

  const educatorPoints = [
    {
      id: 'edu-1',
      title: 'Great teachers stay invisible',
      description: 'Exceptional credentials and teaching skills often get lost in noisy marketplaces.',
      icon: Eye
    },
    {
      id: 'edu-2',
      title: 'Too much administration',
      description: 'Managing schedules, payments, and admin work consumes active teaching time.',
      icon: Calendar
    },
    {
      id: 'edu-3',
      title: 'Wrong student matching',
      description: 'An incompatible student fit prevents effective mentorship and wastes time.',
      icon: Target
    },
    {
      id: 'edu-4',
      title: 'No professional recognition',
      description: 'True pedagogical achievements deserve structured visibility and career growth.',
      icon: Award
    }
  ];

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const doodlesMap = {
    book: <path d="M 5,20 C 15,10 25,12 35,17 C 45,12 55,10 65,20 L 65,40 C 55,30 45,32 35,37 C 25,32 15,30 5,40 Z M 35,17 L 35,37" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
    cap: <path d="M 10,20 L 35,10 L 60,20 L 35,30 Z M 18,23 L 18,33 C 18,38 52,38 52,33 L 52,23 M 55,20 L 55,35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
    bulb: <path d="M 30,10 C 20,10 15,20 15,30 C 15,38 22,42 25,46 L 25,52 L 35,52 L 35,46 C 38,42 45,38 45,30 C 45,20 40,10 30,10 Z M 22,56 L 38,56" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
    star: <path d="M 35,10 L 40,25 L 55,30 L 40,35 L 35,50 L 30,35 L 15,30 L 30,25 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />,
    heart: <path d="M 30,45 C 10,30 10,10 30,22 C 50,10 50,30 30,45 Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />,
    magnify: <>
      <circle cx="30" cy="30" r="16" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M 42,42 L 58,58" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </>
  };

  const _painPointsDoodles = [
    { type: 'magnify', size: 44, rotate: -10, factor: -25, color: '#4F7CFF', position: { top: '3%', left: '5%' } },
    { type: 'book', size: 44, rotate: 12, factor: -15, color: '#10B981', position: { top: '8%', right: '6%' } },
    { type: 'heart', size: 36, rotate: -8, factor: -20, color: '#EF4444', position: { top: '13%', left: '8%' } },
    { type: 'cap', size: 48, rotate: 15, factor: -30, color: '#7B61FF', position: { top: '18%', right: '7%' } },
    { type: 'bulb', size: 44, rotate: -15, factor: -25, color: '#4F7CFF', position: { top: '23%', left: '6%' } },
    { type: 'star', size: 24, rotate: 0, factor: -10, color: '#F59E0B', position: { top: '28%', right: '8%' } },
    { type: 'book', size: 44, rotate: 10, factor: -15, color: '#10B981', position: { top: '33%', left: '7%' } },
    { type: 'magnify', size: 44, rotate: -12, factor: -25, color: '#4F7CFF', position: { top: '38%', right: '5%' } },
    { type: 'heart', size: 36, rotate: 8, factor: -20, color: '#EF4444', position: { top: '43%', left: '9%' } },
    { type: 'cap', size: 48, rotate: -15, factor: -30, color: '#7B61FF', position: { top: '48%', right: '8%' } },
    { type: 'bulb', size: 44, rotate: 15, factor: -25, color: '#4F7CFF', position: { top: '53%', left: '5%' } },
    { type: 'star', size: 24, rotate: 0, factor: -10, color: '#F59E0B', position: { top: '58%', right: '6%' } },
    { type: 'book', size: 44, rotate: 10, factor: -15, color: '#10B981', position: { top: '63%', left: '8%' } },
    { type: 'magnify', size: 44, rotate: -12, factor: -25, color: '#4F7CFF', position: { top: '68%', right: '7%' } },
    { type: 'heart', size: 36, rotate: -8, factor: -20, color: '#EF4444', position: { top: '73%', left: '6%' } },
    { type: 'cap', size: 48, rotate: 15, factor: -30, color: '#7B61FF', position: { top: '78%', right: '9%' } },
    { type: 'bulb', size: 44, rotate: 15, factor: -25, color: '#4F7CFF', position: { top: '83%', left: '7%' } },
    { type: 'star', size: 24, rotate: 0, factor: -10, color: '#F59E0B', position: { top: '88%', right: '5%' } },
    { type: 'book', size: 44, rotate: -10, factor: -15, color: '#10B981', position: { top: '93%', left: '9%' } },
    { type: 'heart', size: 36, rotate: 8, factor: -20, color: '#EF4444', position: { top: '97%', right: '8%' } }
  ];

  return (
    <section 
      id="pain" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 50%, #E2E8F0 100%)', 
        padding: isMobile ? '80px 0 100px' : '140px 0 160px', 
        position: 'relative', 
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)'
      }}
    >
      {/* Decorative ambient subtle glows */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '-10%',
        width: '45vw',
        height: '45vw',
        background: 'radial-gradient(circle, rgba(79, 124, 255, 0.04) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '-10%',
        width: '45vw',
        height: '45vw',
        background: 'radial-gradient(circle, rgba(123, 97, 255, 0.04) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Parallax Scattered Background Doodles */}
      {!isMobile && _painPointsDoodles.map((doodle, idx) => (
        <motion.div
          key={`pain-doodle-${idx}`}
          animate={{ 
            x: mousePos.x * doodle.factor, 
            y: mousePos.y * doodle.factor,
            rotate: [doodle.rotate, doodle.rotate + 3, doodle.rotate] 
          }}
          transition={{
            rotate: { duration: 5 + (idx % 4), repeat: Infinity, ease: "easeInOut" },
            x: { type: 'spring', stiffness: 70, damping: 22 },
            y: { type: 'spring', stiffness: 70, damping: 22 }
          }}
          style={{ 
            position: 'absolute', 
            pointerEvents: 'none', 
            zIndex: 0, 
            opacity: 0.35, 
            color: doodle.color,
            ...doodle.position 
          }}
        >
          <svg viewBox="0 0 70 70" width={doodle.size} height={doodle.size}>
            {doodlesMap[doodle.type]}
          </svg>
        </motion.div>
      ))}

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* ============================================================== */}
        {/* SECTION 1 — PARENTS (Families)                                  */}
        {/* ============================================================== */}
        <div 
          onMouseEnter={() => setHoveredPanel('parents')}
          onMouseLeave={() => setHoveredPanel(null)}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1.1fr',
            gap: isMobile ? '32px' : '80px',
            alignItems: 'center',
            marginBottom: isMobile ? '100px' : '160px',
            position: 'relative'
          }}
        >
          {/* Animated Connecting Dotted Path */}
          {!isMobile && (
            <svg viewBox="0 0 1000 500" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
              <motion.path
                d="M 420,240 Q 500,100 580,240"
                stroke="url(#gradient-parent-path)"
                strokeWidth="2"
                strokeDasharray="5 7"
                fill="none"
                animate={{ strokeDashoffset: [0, -24] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <defs>
                <linearGradient id="gradient-parent-path" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F7CFF" stopOpacity="0.08" />
                  <stop offset="50%" stopColor="#7B61FF" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#4F7CFF" stopOpacity="0.08" />
                </linearGradient>
              </defs>
            </svg>
          )}
          
          {/* Content Block */}
          <div style={{ textAlign: 'left', maxWidth: 480 }}>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              onClick={() => isMobile && setIsParentIntroExpanded(!isParentIntroExpanded)}
              style={{
                fontFamily: 'var(--font-hero)',
                fontWeight: 800,
                fontSize: isMobile ? '38px' : 'clamp(32px, 3vw, 44px)',
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                color: '#1E293B',
                margin: 0,
                cursor: isMobile ? 'pointer' : 'default',
                userSelect: 'none'
              }}
            >
              Finding the right mentor shouldn't feel like luck.
            </motion.h3>

            {/* Collapsible paragraph - revealed on hover */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={isMobile 
                ? (isParentIntroExpanded ? { opacity: 1, height: 'auto', marginTop: 16, marginBottom: 24 } : { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 })
                : (hoveredPanel === 'parents' ? { opacity: 1, height: 'auto', marginTop: 16, marginBottom: 24 } : { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 })
              }
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <p
                style={{
                  fontSize: '15px',
                  color: '#64748B',
                  lineHeight: 1.7,
                  margin: 0,
                  fontWeight: 400
                }}
              >
                Searching through endless profiles shouldn't be the path to understanding your child's needs. The current process is filled with uncertainty.
              </p>
            </motion.div>

            {/* Parent Hotspots / Mobile list */}
            {isMobile ? (
              /* Mobile Zig-zag list (Left aligned) */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginTop: '48px' }}>
                {parentPoints.map(point => (
                  <div key={point.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', textAlign: 'left' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: '#FFFFFF', border: '1px solid rgba(79, 124, 255, 0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#4F7CFF', flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(79, 124, 255, 0.05)'
                    }}>
                      <point.icon size={20} strokeWidth={2.2} />
                    </div>
                    <div 
                      onClick={() => setExpandedParentPoint(expandedParentPoint === point.id ? null : point.id)}
                      style={{ cursor: 'pointer', userSelect: 'none', flex: 1 }}
                    >
                      <h4 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700, color: '#1E293B' }}>{point.title}</h4>
                      <AnimatePresence>
                        {expandedParentPoint === point.id && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: '#64748B', overflow: 'hidden' }}
                          >
                            {point.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Desktop Hotspots Row - always visible */
              <div style={{ display: 'flex', gap: '24px', position: 'relative', marginTop: hoveredPanel === 'parents' ? 0 : 24, transition: 'margin-top 0.4s ease' }}>
                {parentPoints.map(point => {
                  const IconComponent = point.icon;
                  return (
                    <div 
                      key={point.id}
                      style={{ position: 'relative', display: 'inline-block', width: 64, height: 64 }}
                      onMouseEnter={() => setActiveParentId(point.id)}
                      onMouseLeave={() => setActiveParentId(null)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 450, damping: 20 }}
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.85)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          border: '1px solid rgba(79, 124, 255, 0.1)',
                          boxShadow: activeParentId === point.id 
                            ? '0 12px 30px rgba(79, 124, 255, 0.15), 0 0 0 2px rgba(79, 124, 255, 0.2)' 
                            : '0 8px 24px rgba(15, 23, 42, 0.03)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#4F7CFF',
                          cursor: 'pointer',
                          position: 'relative',
                          zIndex: 2,
                          transition: 'box-shadow 0.2s'
                        }}
                      >
                        <IconComponent size={24} strokeWidth={2} />
                      </motion.div>

                      {/* Tooltip Overlay */}
                      <AnimatePresence>
                        {activeParentId === point.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, x: '-50%', scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
                            exit={{ opacity: 0, y: 8, x: '-50%', scale: 0.96 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            style={{
                              position: 'absolute',
                              bottom: 'calc(100% + 14px)',
                              left: '50%',
                              width: 260,
                              padding: '16px',
                              background: 'rgba(255, 255, 255, 0.98)',
                              backdropFilter: 'blur(12px)',
                              WebkitBackdropFilter: 'blur(12px)',
                              border: '1px solid rgba(79, 124, 255, 0.12)',
                              borderRadius: 14,
                              boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
                              zIndex: 100,
                              pointerEvents: 'none',
                              textAlign: 'left'
                            }}
                          >
                            <div style={{
                              position: 'absolute',
                              top: '100%',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: 0,
                              height: 0,
                              borderLeft: '7px solid transparent',
                              borderRight: '7px solid transparent',
                              borderTop: '7px solid rgba(255, 255, 255, 0.98)',
                            }} />
                            <h5 style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, color: '#1E293B' }}>{point.title}</h5>
                            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.55, color: '#64748B', fontWeight: 400 }}>{point.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Illustration Side */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 24px',
                position: 'relative'
              }}
            >
              <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <motion.img 
                  src={`${import.meta.env.BASE_URL}ChatGPT Image Jul 31, 2026, 01_55_40 AM.png`}
                  alt="Families searching and lost in educational choices"
                  whileHover={{ 
                    scale: 1.02,
                    y: -5
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 440,
                    objectFit: 'contain',
                    mixBlendMode: 'multiply',
                    cursor: 'pointer',
                    zIndex: 2
                  }}
                />

                {/* Boundary-Breaking Highlights (Section 1 overlays) */}
                {/* 1. Vetted Profile (fam-1) */}
                <motion.div
                  animate={{
                    scale: activeParentId === 'fam-1' ? 1.08 : 1,
                    opacity: activeParentId ? (activeParentId === 'fam-1' ? 1 : 0.35) : 0.85,
                    y: activeParentId === 'fam-1' ? -8 : 0,
                    boxShadow: activeParentId === 'fam-1' ? '0 12px 36px rgba(79,124,255,0.2)' : '0 6px 16px rgba(15,23,42,0.05)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    position: 'absolute', top: '15%', left: '-30px',
                    background: 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: '1.5px solid rgba(79, 124, 255, 0.16)',
                    borderRadius: 14, padding: '10px 14px', zIndex: 10,
                    display: 'flex', alignItems: 'center', gap: 10,
                    pointerEvents: 'none'
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F7CFF', fontWeight: 700, fontSize: 13 }}>AV</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#1E293B' }}></div>
                    <div style={{ fontSize: 10, color: '#64748B' }}>Maths Olympiad</div>
                  </div>
                </motion.div>

                {/* 2. Progress Tracker (fam-2) */}
                <motion.div
                  animate={{
                    scale: activeParentId === 'fam-2' ? 1.08 : 1,
                    opacity: activeParentId ? (activeParentId === 'fam-2' ? 1 : 0.35) : 0.85,
                    y: activeParentId === 'fam-2' ? -8 : 0,
                    boxShadow: activeParentId === 'fam-2' ? '0 12px 36px rgba(16,185,129,0.2)' : '0 6px 16px rgba(15,23,42,0.05)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    position: 'absolute', bottom: '15%', right: '-25px',
                    background: 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: '1.5px solid rgba(16, 185, 129, 0.16)',
                    borderRadius: 14, padding: '10px 14px', zIndex: 10,
                    display: 'flex', alignItems: 'center', gap: 8,
                    pointerEvents: 'none'
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#1E293B' }}>Progress: +84%</div>
                    <div style={{ fontSize: 9, color: '#64748B' }}>AVSAR Analytics</div>
                  </div>
                </motion.div>

                {/* 3. Saved Time Calendar (fam-3) */}
                <motion.div
                  animate={{
                    scale: activeParentId === 'fam-3' ? 1.08 : 1,
                    opacity: activeParentId ? (activeParentId === 'fam-3' ? 1 : 0.35) : 0.85,
                    y: activeParentId === 'fam-3' ? -8 : 0,
                    boxShadow: activeParentId === 'fam-3' ? '0 12px 36px rgba(245,158,11,0.2)' : '0 6px 16px rgba(15,23,42,0.05)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    position: 'absolute', top: '50%', left: '-40px',
                    background: 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: '1.5px solid rgba(245, 158, 11, 0.16)',
                    borderRadius: 14, padding: '10px 14px', zIndex: 10,
                    display: 'flex', alignItems: 'center', gap: 8,
                    pointerEvents: 'none'
                  }}
                >
                  <Calendar size={16} style={{ color: '#F59E0B' }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#1E293B' }}>16 Hours Saved</div>
                    <div style={{ fontSize: 9, color: '#64748B' }}>Logistics Automated</div>
                  </div>
                </motion.div>

                {/* 4. Verified Safety (fam-4) */}
                <motion.div
                  animate={{
                    scale: activeParentId === 'fam-4' ? 1.08 : 1,
                    opacity: activeParentId ? (activeParentId === 'fam-4' ? 1 : 0.35) : 0.85,
                    y: activeParentId === 'fam-4' ? -8 : 0,
                    boxShadow: activeParentId === 'fam-4' ? '0 12px 36px rgba(79,124,255,0.2)' : '0 6px 16px rgba(15,23,42,0.05)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    position: 'absolute', top: '-15px', right: '30px',
                    background: 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: '1.5px solid rgba(79, 124, 255, 0.16)',
                    borderRadius: 100, padding: '8px 16px', zIndex: 10,
                    display: 'flex', alignItems: 'center', gap: 6,
                    pointerEvents: 'none'
                  }}
                >
                  <Shield size={14} style={{ color: '#10B981' }} />
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: '#1E293B', letterSpacing: '0.02em' }}>✓ VETTED & SAFETY CLEARED</span>
                </motion.div>
              </div>
            </motion.div>
          )}

        </div>

        {/* ============================================================== */}
        {/* SEAMLESS TRANSITION DIVIDER WITH VERTICAL JOURNEY PATH         */}
        {/* ============================================================== */}
        <div style={{ position: 'relative', width: '100%', height: isMobile ? 60 : 100, zIndex: 2 }}>
          {!isMobile && (
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', height: 100, width: 40, pointerEvents: 'none' }}>
              <svg height="100" width="40" viewBox="0 0 40 100" style={{ overflow: 'visible' }}>
                <motion.path
                  d="M 20 0 Q 40 50, 20 100"
                  stroke="url(#pain-vertical-glow)"
                  strokeWidth="2"
                  strokeDasharray="4 5"
                  fill="none"
                  animate={{ strokeDashoffset: [0, -18] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />
                <defs>
                  <linearGradient id="pain-vertical-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4F7CFF" />
                    <stop offset="100%" stopColor="#7B61FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* SECTION 2 — TEACHERS (Educators)                                */}
        {/* ============================================================== */}
        <div 
          onMouseEnter={() => setHoveredPanel('educators')}
          onMouseLeave={() => setHoveredPanel(null)}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr',
            gap: isMobile ? '32px' : '80px',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {/* Animated Connecting Dotted Path */}
          {!isMobile && (
            <svg viewBox="0 0 1000 500" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
              <motion.path
                d="M 420,260 Q 500,140 580,220"
                stroke="url(#gradient-teacher-path)"
                strokeWidth="2"
                strokeDasharray="5 7"
                fill="none"
                animate={{ strokeDashoffset: [0, -24] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <defs>
                <linearGradient id="gradient-teacher-path" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7B61FF" stopOpacity="0.08" />
                  <stop offset="50%" stopColor="#4F7CFF" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#7B61FF" stopOpacity="0.08" />
                </linearGradient>
              </defs>
            </svg>
          )}
          
          {/* Illustration Side (Left on Desktop) */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 24px',
                position: 'relative'
              }}
            >
              <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <motion.img 
                  src={`${import.meta.env.BASE_URL}ChatGPT Image Jul 31, 2026, 01_57_32 AM.png`}
                  alt="Brilliant educators waiting to be discovered"
                  whileHover={{ 
                    scale: 1.02,
                    y: -5
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 440,
                    objectFit: 'contain',
                    mixBlendMode: 'multiply',
                    cursor: 'pointer',
                    zIndex: 2
                  }}
                />

                {/* Boundary-Breaking Highlights (Section 2 overlays) */}
                {/* 1. Elite Rank Badge (edu-1) */}
                <motion.div
                  animate={{
                    scale: activeTeacherId === 'edu-1' ? 1.08 : 1,
                    opacity: activeTeacherId ? (activeTeacherId === 'edu-1' ? 1 : 0.35) : 0.85,
                    y: activeTeacherId === 'edu-1' ? -8 : 0,
                    boxShadow: activeTeacherId === 'edu-1' ? '0 12px 36px rgba(123,97,255,0.2)' : '0 6px 16px rgba(15,23,42,0.05)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    position: 'absolute', top: '15%', left: '-30px',
                    background: 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: '1.5px solid rgba(123, 97, 255, 0.16)',
                    borderRadius: 14, padding: '10px 14px', zIndex: 10,
                    display: 'flex', alignItems: 'center', gap: 8,
                    pointerEvents: 'none'
                  }}
                >
                  <Award size={16} style={{ color: '#7B61FF' }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#1E293B' }}>Elite Educator Rank</div>
                    <div style={{ fontSize: 9, color: '#64748B' }}>Top 2% Vetted Talents</div>
                  </div>
                </motion.div>

                {/* 2. Automated Bookings Card (edu-2) */}
                <motion.div
                  animate={{
                    scale: activeTeacherId === 'edu-2' ? 1.08 : 1,
                    opacity: activeTeacherId ? (activeTeacherId === 'edu-2' ? 1 : 0.35) : 0.85,
                    y: activeTeacherId === 'edu-2' ? -8 : 0,
                    boxShadow: activeTeacherId === 'edu-2' ? '0 12px 36px rgba(123,97,255,0.2)' : '0 6px 16px rgba(15,23,42,0.05)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    position: 'absolute', top: '50%', right: '-30px',
                    background: 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: '1.5px solid rgba(123, 97, 255, 0.16)',
                    borderRadius: 14, padding: '10px 14px', zIndex: 10,
                    display: 'flex', alignItems: 'center', gap: 8,
                    pointerEvents: 'none'
                  }}
                >
                  <Calendar size={16} style={{ color: '#7B61FF' }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#1E293B' }}>Automated Bookings</div>
                    <div style={{ fontSize: 9, color: '#64748B' }}>0 Admin Hours Lost</div>
                  </div>
                </motion.div>

                {/* 3. Match Score Badge (edu-3) */}
                <motion.div
                  animate={{
                    scale: activeTeacherId === 'edu-3' ? 1.08 : 1,
                    opacity: activeTeacherId ? (activeTeacherId === 'edu-3' ? 1 : 0.35) : 0.85,
                    y: activeTeacherId === 'edu-3' ? -8 : 0,
                    boxShadow: activeTeacherId === 'edu-3' ? '0 12px 36px rgba(16,185,129,0.2)' : '0 6px 16px rgba(15,23,42,0.05)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    position: 'absolute', bottom: '15%', left: '-25px',
                    background: 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: '1.5px solid rgba(16, 185, 129, 0.16)',
                    borderRadius: 14, padding: '10px 14px', zIndex: 10,
                    display: 'flex', alignItems: 'center', gap: 8,
                    pointerEvents: 'none'
                  }}
                >
                  <Target size={16} style={{ color: '#10B981' }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#1E293B' }}>Match Score: 98%</div>
                    <div style={{ fontSize: 9, color: '#64748B' }}>Pedagogical Fit</div>
                  </div>
                </motion.div>

                {/* 4. Star Pedagogy Badge (edu-4) */}
                <motion.div
                  animate={{
                    scale: activeTeacherId === 'edu-4' ? 1.08 : 1,
                    opacity: activeTeacherId ? (activeTeacherId === 'edu-4' ? 1 : 0.35) : 0.85,
                    y: activeTeacherId === 'edu-4' ? -8 : 0,
                    boxShadow: activeTeacherId === 'edu-4' ? '0 12px 36px rgba(245,158,11,0.2)' : '0 6px 16px rgba(15,23,42,0.05)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    position: 'absolute', top: '-15px', right: '35px',
                    background: 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: '1.5px solid rgba(245, 158, 11, 0.16)',
                    borderRadius: 100, padding: '8px 16px', zIndex: 10,
                    display: 'flex', alignItems: 'center', gap: 6,
                    pointerEvents: 'none',
                    minWidth: 80, minHeight: 30
                  }}
                >
                  {/* Empty per user request */}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Content Block */}
          <div style={{ textAlign: isMobile ? 'right' : 'left', maxWidth: 480, justifySelf: isMobile ? 'stretch' : 'end' }}>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              onClick={() => isMobile && setIsTeacherIntroExpanded(!isTeacherIntroExpanded)}
              style={{
                fontFamily: 'var(--font-hero)',
                fontWeight: 800,
                fontSize: isMobile ? '38px' : 'clamp(32px, 3vw, 44px)',
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                color: '#1E293B',
                margin: 0,
                cursor: isMobile ? 'pointer' : 'default',
                userSelect: 'none'
              }}
            >
              Great educators deserve to be discovered.
            </motion.h3>

            {/* Collapsible paragraph - revealed on hover */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={isMobile 
                ? (isTeacherIntroExpanded ? { opacity: 1, height: 'auto', marginTop: 16, marginBottom: 24 } : { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 })
                : (hoveredPanel === 'educators' ? { opacity: 1, height: 'auto', marginTop: 16, marginBottom: 24 } : { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 })
              }
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <p
                style={{
                  fontSize: '15px',
                  color: '#64748B',
                  lineHeight: 1.7,
                  margin: 0,
                  fontWeight: 400
                }}
              >
                Brilliant teachers shouldn't have to compete for visibility or spend hours managing logistics. They deserve to focus on what they do best: teaching.
              </p>
            </motion.div>

            {/* Educator Hotspots / Mobile list */}
            {isMobile ? (
              /* Mobile Zig-zag list (Right aligned) */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginTop: '48px' }}>
                {educatorPoints.map(point => (
                  <div key={point.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexDirection: 'row-reverse', textAlign: 'right' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: '#FFFFFF', border: '1px solid rgba(123, 97, 255, 0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#7B61FF', flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(123, 97, 255, 0.05)'
                    }}>
                      <point.icon size={20} strokeWidth={2.2} />
                    </div>
                    <div 
                      onClick={() => setExpandedTeacherPoint(expandedTeacherPoint === point.id ? null : point.id)}
                      style={{ cursor: 'pointer', userSelect: 'none', flex: 1 }}
                    >
                      <h4 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700, color: '#1E293B' }}>{point.title}</h4>
                      <AnimatePresence>
                        {expandedTeacherPoint === point.id && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: '#64748B', overflow: 'hidden' }}
                          >
                            {point.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Desktop Hotspots Row - always visible */
              <div style={{ display: 'flex', gap: '24px', position: 'relative', marginTop: hoveredPanel === 'educators' ? 0 : 24, transition: 'margin-top 0.4s ease' }}>
                {educatorPoints.map(point => {
                  const IconComponent = point.icon;
                  return (
                    <div 
                      key={point.id}
                      style={{ position: 'relative', display: 'inline-block', width: 64, height: 64 }}
                      onMouseEnter={() => setActiveTeacherId(point.id)}
                      onMouseLeave={() => setActiveTeacherId(null)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 450, damping: 20 }}
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.85)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          border: '1px solid rgba(123, 97, 255, 0.1)',
                          boxShadow: activeTeacherId === point.id 
                            ? '0 12px 30px rgba(123, 97, 255, 0.15), 0 0 0 2px rgba(123, 97, 255, 0.2)' 
                            : '0 8px 24px rgba(15, 23, 42, 0.03)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#7B61FF',
                          cursor: 'pointer',
                          position: 'relative',
                          zIndex: 2,
                          transition: 'box-shadow 0.2s'
                        }}
                      >
                        <IconComponent size={24} strokeWidth={2} />
                      </motion.div>

                      {/* Tooltip Overlay */}
                      <AnimatePresence>
                        {activeTeacherId === point.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, x: '-50%', scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
                            exit={{ opacity: 0, y: 8, x: '-50%', scale: 0.96 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            style={{
                              position: 'absolute',
                              bottom: 'calc(100% + 14px)',
                              left: '50%',
                              width: 260,
                              padding: '16px',
                              background: 'rgba(255, 255, 255, 0.98)',
                              backdropFilter: 'blur(12px)',
                              WebkitBackdropFilter: 'blur(12px)',
                              border: '1px solid rgba(123, 97, 255, 0.12)',
                              borderRadius: 14,
                              boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
                              zIndex: 100,
                              pointerEvents: 'none',
                              textAlign: 'left'
                            }}
                          >
                            <div style={{
                              position: 'absolute',
                              top: '100%',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: 0,
                              height: 0,
                              borderLeft: '7px solid transparent',
                              borderRight: '7px solid transparent',
                              borderTop: '7px solid rgba(255, 255, 255, 0.98)',
                            }} />
                            <h5 style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, color: '#1E293B' }}>{point.title}</h5>
                            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.55, color: '#64748B', fontWeight: 400 }}>{point.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
