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

  return (
    <section 
      id="pain" 
      style={{ 
        background: 'linear-gradient(180deg, #F4F6F9 0%, #E9ECF1 100%)', 
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
        background: 'radial-gradient(circle, rgba(79, 124, 255, 0.02) 0%, transparent 70%)',
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
        background: 'radial-gradient(circle, rgba(123, 97, 255, 0.02) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

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
            marginBottom: isMobile ? '100px' : '160px'
          }}
        >
          
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginTop: '32px' }}>
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
              }}
            >
              <motion.img 
                src={`${import.meta.env.BASE_URL}ChatGPT Image Jul 31, 2026, 01_55_40 AM.png`}
                alt="Families searching and lost in educational choices"
                whileHover={{ 
                  scale: 1.03,
                  y: -8,
                  filter: "drop-shadow(0 20px 35px rgba(79, 124, 255, 0.12))"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 440,
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',
                  cursor: 'pointer'
                }}
              />
            </motion.div>
          )}

        </div>

        {/* ============================================================== */}
        {/* SEAMLESS TRANSITION DIVIDER (Spacing only)                      */}
        {/* ============================================================== */}
        <div style={{ height: isMobile ? 60 : 100 }} />

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
            alignItems: 'center'
          }}
        >
          
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
              }}
            >
              <motion.img 
                src={`${import.meta.env.BASE_URL}ChatGPT Image Jul 31, 2026, 01_57_32 AM.png`}
                alt="Brilliant educators waiting to be discovered"
                whileHover={{ 
                  scale: 1.03,
                  y: -8,
                  filter: "drop-shadow(0 20px 35px rgba(123, 97, 255, 0.12))"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 440,
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',
                  cursor: 'pointer'
                }}
              />
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginTop: '32px' }}>
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
