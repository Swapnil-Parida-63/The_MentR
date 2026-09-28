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
      title: 'Finding verified Teachers',
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
      title: 'Every wrong teacher costs',
      description: 'Switching teachers repeatedly drains both time and valuable family resources.',
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
        position: 'relative', 
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)',
        background: 'transparent'
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
      {_painPointsDoodles.map((doodle, idx) => (
        <motion.div
          key={`pain-doodle-${idx}`}
          animate={isMobile ? { rotate: [doodle.rotate, doodle.rotate + 3, doodle.rotate] } : { 
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
            opacity: 0.75, 
            color: doodle.color,
            ...doodle.position 
          }}
        >
          <svg viewBox="0 0 70 70" width={isMobile ? doodle.size * 0.65 : doodle.size} height={isMobile ? doodle.size * 0.65 : doodle.size}>
            {doodlesMap[doodle.type]}
          </svg>
        </motion.div>
      ))}

      {/* ============================================================== */}
      {/* SECTION 1 — PARENTS (Families)                                  */}
      {/* ============================================================== */}
      <div style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #E3E8FF 60%, #FFFFFF 100%)',
        padding: isMobile ? '40px 0 30px' : '50px 0 40px',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container">
          <div 
            onMouseEnter={() => setHoveredPanel('parents')}
            onMouseLeave={() => setHoveredPanel(null)}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1.1fr',
              gap: isMobile ? '32px' : '80px',
              alignItems: 'center',
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
          <div style={{
            textAlign: 'left',
            maxWidth: 480,
            position: 'relative',
            ...(isMobile ? {
              background: '#FFFFFF',
              borderRadius: '28px',
              padding: '0 20px 24px 20px',
              border: '1.2px solid rgba(79, 124, 255, 0.12)',
              boxShadow: '0 8px 30px rgba(79, 124, 255, 0.06)',
              overflow: 'hidden'
            } : {})
          }}>
            {/* Mobile Top Illustration Banner */}
            {isMobile && (
              <div
                style={{
                  margin: '0 -20px 20px -20px',
                  background: 'linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 100%)',
                  padding: '20px 20px 10px',
                  borderBottom: '1px solid rgba(79, 124, 255, 0.08)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}Parents-Pain-Point-mobile.webp`}
                  alt="Parents challenges in finding verified teachers for students"
                  loading="lazy"
                  decoding="async"
                  width="720"
                  height="480"
                  style={{
                    width: '100%',
                    maxHeight: '200px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            )}

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 14px',
                borderRadius: 100,
                background: 'rgba(79, 124, 255, 0.08)',
                border: '1px solid rgba(79, 124, 255, 0.18)',
                marginBottom: 14
              }}>
                <span style={{ fontSize: 12, fontWeight: 750, color: '#4F7CFF', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  For Parents
                </span>
              </div>

              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                onClick={() => isMobile && setIsParentIntroExpanded(!isParentIntroExpanded)}
                style={{
                  fontFamily: 'var(--font-hero)',
                  fontWeight: 800,
                  fontSize: isMobile ? '34px' : 'clamp(30px, 2.8vw, 42px)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.03em',
                  color: '#1E293B',
                  margin: 0,
                  cursor: isMobile ? 'pointer' : 'default',
                  userSelect: 'none'
                }}
              >
                Finding the right teacher should not feel like luck.
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
                    fontSize: '15.5px',
                    color: '#334155',
                    lineHeight: 1.7,
                    margin: 0,
                    fontWeight: 500
                  }}
                >
                  Searching through endless profiles shouldn't be the path to understanding your child's needs. The current process is filled with uncertainty.
                </p>
              </motion.div>

              {/* Parent Hotspots / Mobile list */}
              {isMobile ? (
                /* Mobile Zig-zag list (Left aligned) */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '28px' }}>
                  {parentPoints.map(point => {
                    const isExpanded = expandedParentPoint === point.id;
                    return (
                      <div 
                        key={point.id} 
                        onClick={() => setExpandedParentPoint(isExpanded ? null : point.id)}
                        style={{ 
                          display: 'flex', 
                          gap: '14px', 
                          alignItems: 'flex-start', 
                          textAlign: 'left',
                          background: isExpanded ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.90)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          border: isExpanded ? '1.5px solid rgba(79, 124, 255, 0.28)' : '1px solid rgba(79, 124, 255, 0.12)',
                          borderRadius: '16px',
                          padding: '12px 14px',
                          boxShadow: isExpanded ? '0 6px 20px rgba(79, 124, 255, 0.08)' : '0 2px 8px rgba(15, 23, 42, 0.03)',
                          cursor: 'pointer',
                          userSelect: 'none',
                          touchAction: 'manipulation',
                          WebkitTapHighlightColor: 'transparent',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{
                          width: 40, height: 40, borderRadius: '50%',
                          background: isExpanded ? '#EFF6FF' : '#F8FAFC', 
                          border: '1px solid rgba(79, 124, 255, 0.15)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#4F7CFF', flexShrink: 0,
                          boxShadow: '0 2px 6px rgba(79, 124, 255, 0.08)'
                        }}>
                          <point.icon size={18} strokeWidth={2.2} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                            <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>{point.title}</h4>
                            <span style={{ 
                              fontSize: 16, 
                              fontWeight: 'bold', 
                              color: isExpanded ? '#4F7CFF' : '#64748B',
                              transition: 'transform 0.18s cubic-bezier(0.2, 0, 0, 1), color 0.15s ease',
                              transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
                              display: 'inline-block',
                              lineHeight: 1
                            }}>+</span>
                          </div>
                          <div 
                            style={{ 
                              maxHeight: isExpanded ? '160px' : '0px',
                              opacity: isExpanded ? 1 : 0,
                              overflow: 'hidden',
                              transition: 'max-height 0.2s cubic-bezier(0, 0, 0.2, 1), opacity 0.18s ease-out',
                              willChange: 'max-height, opacity',
                              transform: 'translateZ(0)'
                            }}
                          >
                            <p style={{ margin: '8px 0 2px', fontSize: 13.5, lineHeight: 1.55, color: '#1E293B', fontWeight: 500 }}>
                              {point.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                  src={`${import.meta.env.BASE_URL}Parents Pain Point.webp`}
                  alt="Parents searching and finding verified home teachers with TheMentR"
                  loading="lazy"
                  decoding="async"
                  width="1536"
                  height="1024"
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
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>

    {/* ============================================================== */}
    {/* SECTION 2 — TEACHERS (Educators)                                */}
    {/* ============================================================== */}
    <div style={{
      background: 'linear-gradient(180deg, #FFFFFF 0%, #E3E8FF 40%, #FFFFFF 100%)',
      padding: isMobile ? '40px 0 50px' : '50px 0 60px',
      position: 'relative',
      zIndex: 1
    }}>
      <div className="container">
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
                  src={`${import.meta.env.BASE_URL}Teachers Pain Point.webp`}
                  alt="Exceptional teachers gaining professional recognition and matched students with TheMentR"
                  loading="lazy"
                  decoding="async"
                  width="1536"
                  height="1024"
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
              </div>
            </motion.div>
          )}

          <div style={{
            textAlign: 'left',
            maxWidth: 480,
            justifySelf: isMobile ? 'stretch' : 'end',
            position: 'relative',
            ...(isMobile ? {
              background: '#FFFFFF',
              borderRadius: '28px',
              padding: '0 20px 24px 20px',
              border: '1.2px solid rgba(123, 97, 255, 0.12)',
              boxShadow: '0 8px 30px rgba(123, 97, 255, 0.06)',
              overflow: 'hidden'
            } : {})
          }}>
            {/* Mobile Top Illustration Banner */}
            {isMobile && (
              <div
                style={{
                  margin: '0 -20px 20px -20px',
                  background: 'linear-gradient(180deg, #F5F2FF 0%, #FFFFFF 100%)',
                  padding: '20px 20px 10px',
                  borderBottom: '1px solid rgba(123, 97, 255, 0.08)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}Teachers-Pain-Point-mobile.webp`}
                  alt="Great teachers deserved to be discovered and valued"
                  loading="lazy"
                  decoding="async"
                  width="720"
                  height="480"
                  style={{
                    width: '100%',
                    maxHeight: '200px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            )}

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 14px',
                borderRadius: 100,
                background: 'rgba(123, 97, 255, 0.08)',
                border: '1px solid rgba(123, 97, 255, 0.18)',
                marginBottom: 14
              }}>
                <span style={{ fontSize: 12, fontWeight: 750, color: '#7B61FF', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  For Teachers
                </span>
              </div>

              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                onClick={() => isMobile && setIsTeacherIntroExpanded(!isTeacherIntroExpanded)}
                style={{
                  fontFamily: 'var(--font-hero)',
                  fontWeight: 800,
                  fontSize: isMobile ? '34px' : 'clamp(30px, 2.8vw, 42px)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.03em',
                  color: '#1E293B',
                  margin: 0,
                  cursor: isMobile ? 'pointer' : 'default',
                  userSelect: 'none'
                }}
              >
                Great teachers deserve to be discovered and valued.
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
                    fontSize: '15.5px',
                    color: '#334155',
                    lineHeight: 1.7,
                    margin: 0,
                    fontWeight: 500
                  }}
                >
                  Brilliant teachers shouldn't have to compete for visibility or spend hours managing logistics. They deserve to focus on what they do best: teaching.
                </p>
              </motion.div>

              {/* Educator Hotspots / Mobile list */}
              {isMobile ? (
                /* Mobile list */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '28px' }}>
                  {educatorPoints.map(point => {
                    const isExpanded = expandedTeacherPoint === point.id;
                    return (
                      <div 
                        key={point.id} 
                        onClick={() => setExpandedTeacherPoint(isExpanded ? null : point.id)}
                        style={{ 
                          display: 'flex', 
                          gap: '14px', 
                          alignItems: 'flex-start', 
                          textAlign: 'left',
                          background: isExpanded ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.90)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          border: isExpanded ? '1.5px solid rgba(123, 97, 255, 0.28)' : '1px solid rgba(123, 97, 255, 0.12)',
                          borderRadius: '16px',
                          padding: '12px 14px',
                          boxShadow: isExpanded ? '0 6px 20px rgba(123, 97, 255, 0.08)' : '0 2px 8px rgba(15, 23, 42, 0.03)',
                          cursor: 'pointer',
                          userSelect: 'none',
                          touchAction: 'manipulation',
                          WebkitTapHighlightColor: 'transparent',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{
                          width: 40, height: 40, borderRadius: '50%',
                          background: isExpanded ? '#F5F3FF' : '#F8FAFC', 
                          border: '1px solid rgba(123, 97, 255, 0.15)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#7B61FF', flexShrink: 0,
                          boxShadow: '0 2px 6px rgba(123, 97, 255, 0.08)'
                        }}>
                          <point.icon size={18} strokeWidth={2.2} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                            <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>{point.title}</h4>
                            <span style={{ 
                              fontSize: 16, 
                              fontWeight: 'bold', 
                              color: isExpanded ? '#7B61FF' : '#64748B',
                              transition: 'transform 0.18s cubic-bezier(0.2, 0, 0, 1), color 0.15s ease',
                              transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
                              display: 'inline-block',
                              lineHeight: 1
                            }}>+</span>
                          </div>
                          <div 
                            style={{ 
                              maxHeight: isExpanded ? '160px' : '0px',
                              opacity: isExpanded ? 1 : 0,
                              overflow: 'hidden',
                              transition: 'max-height 0.2s cubic-bezier(0, 0, 0.2, 1), opacity 0.18s ease-out',
                              willChange: 'max-height, opacity',
                              transform: 'translateZ(0)'
                            }}
                          >
                            <p style={{ margin: '8px 0 2px', fontSize: 13.5, lineHeight: 1.55, color: '#1E293B', fontWeight: 500 }}>
                              {point.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
      </div>
    </div>
</section>
);
}
