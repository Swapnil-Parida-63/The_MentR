import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ========================================================================== */
/* HOOK: Intersection Observer for scroll-in animations                       */
/* ========================================================================== */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

/* ========================================================================== */
/* VISION SECTION — Premium Editorial Brand Manifesto                         */
/* ========================================================================== */
export default function VisionSection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [visionRef, visionInView] = useInView(0.1);
  const [missionRef, missionInView] = useInView(0.1);
  const [timelineRef, timelineInView] = useInView(0.1);

  const [visionMouse, setVisionMouse] = useState({ x: 0, y: 0 });
  const [missionMouse, setMissionMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleVisionMouseMove = (e) => {
    if (isMobile) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setVisionMouse({ x, y });
  };

  const handleVisionMouseLeave = () => {
    setVisionMouse({ x: 0, y: 0 });
  };

  const handleMissionMouseMove = (e) => {
    if (isMobile) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMissionMouse({ x, y });
  };

  const handleMissionMouseLeave = () => {
    setMissionMouse({ x: 0, y: 0 });
  };

  const sectionBase = {
    position: 'relative',
    overflow: 'hidden',
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

  const _visionDoodles = [
    { type: 'bulb', size: 44, rotate: -15, factor: -25, color: '#6366F1', position: { top: '5%', left: '4%' } },
    { type: 'book', size: 44, rotate: 10, factor: -15, color: '#10B981', position: { top: '12%', right: '5%' } },
    { type: 'cap', size: 48, rotate: 12, factor: -30, color: '#8B5CF6', position: { top: '18%', left: '8%' } },
    { type: 'star', size: 24, rotate: 0, factor: -10, color: '#F59E0B', position: { top: '25%', left: '45%' } },
    { type: 'heart', size: 36, rotate: -12, factor: -20, color: '#EF4444', position: { top: '32%', right: '12%' } },
    { type: 'magnify', size: 44, rotate: 15, factor: -25, color: '#3B82F6', position: { top: '42%', left: '7%' } },
    { type: 'book', size: 44, rotate: -10, factor: -15, color: '#10B981', position: { top: '52%', right: '6%' } },
    { type: 'bulb', size: 44, rotate: 12, factor: -20, color: '#6366F1', position: { top: '64%', left: '9%' } },
    { type: 'cap', size: 48, rotate: -15, factor: -30, color: '#8B5CF6', position: { top: '75%', right: '8%' } },
    { type: 'star', size: 24, rotate: 0, factor: -10, color: '#F59E0B', position: { bottom: '10%', left: '5%' } },
    { type: 'heart', size: 36, rotate: 8, factor: -20, color: '#EF4444', position: { bottom: '8%', right: '4%' } },
  ];

  const _missionDoodles = [
    { type: 'heart', size: 36, rotate: -8, factor: -20, color: '#EF4444', position: { top: '6%', left: '5%' } },
    { type: 'bulb', size: 44, rotate: 12, factor: -25, color: '#6366F1', position: { top: '10%', right: '6%' } },
    { type: 'magnify', size: 44, rotate: 15, factor: -15, color: '#3B82F6', position: { top: '20%', left: '7%' } },
    { type: 'cap', size: 48, rotate: -15, factor: -30, color: '#8B5CF6', position: { top: '26%', right: '9%' } },
    { type: 'star', size: 24, rotate: 0, factor: -10, color: '#F59E0B', position: { top: '35%', left: '48%' } },
    { type: 'book', size: 44, rotate: -10, factor: -20, color: '#10B981', position: { top: '42%', left: '6%' } },
    { type: 'heart', size: 36, rotate: 8, factor: -15, color: '#EF4444', position: { top: '50%', right: '5%' } },
    { type: 'bulb', size: 44, rotate: -12, factor: -25, color: '#6366F1', position: { top: '62%', left: '8%' } },
    { type: 'book', size: 44, rotate: 10, factor: -20, color: '#10B981', position: { top: '75%', right: '7%' } },
    { type: 'cap', size: 48, rotate: 15, factor: -30, color: '#8B5CF6', position: { bottom: '12%', left: '9%' } },
    { type: 'star', size: 24, rotate: 0, factor: -10, color: '#F59E0B', position: { bottom: '8%', right: '5%' } },
  ];

  const visionFloatingItems = [
    { 
      svgPath: <path d="M 5,20 C 15,10 25,12 35,17 C 45,12 55,10 65,20 L 65,40 C 55,30 45,32 35,37 C 25,32 15,30 5,40 Z M 35,17 L 35,37" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
      color: '#10B981', size: 44, rotate: -15,
      position: { bottom: '-20px', left: '-20px' }
    },
    { 
      svgPath: <path d="M 10,20 L 35,10 L 60,20 L 35,30 Z M 18,23 L 18,33 C 18,38 52,38 52,33 L 52,23 M 55,20 L 55,35" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
      color: '#8B5CF6', size: 48, rotate: 12,
      position: { top: '-35px', right: '-15px' }
    },
    {
      svgPath: <path d="M 35,10 L 40,25 L 55,30 L 40,35 L 35,50 L 30,35 L 15,30 L 30,25 Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" fill="none" />,
      color: '#F59E0B', size: 24, rotate: 5,
      position: { top: '35%', right: '-35px' }
    }
  ];

  const missionFloatingItems = [
    { 
      svgPath: <path d="M 10,20 L 35,10 L 60,20 L 35,30 Z M 18,23 L 18,33 C 18,38 52,38 52,33 L 52,23 M 55,20 L 55,35" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
      color: '#8B5CF6', size: 44, rotate: -10,
      position: { top: '-25px', left: '-20px' }
    },
    { 
      svgPath: <>
        <circle cx="35" cy="35" r="15" stroke="currentColor" strokeWidth="2.2" fill="none" />
        <circle cx="35" cy="35" r="7" stroke="currentColor" strokeWidth="2.2" fill="none" />
      </>,
      color: '#6366F1', size: 40, rotate: 8,
      position: { bottom: '-25px', right: '-20px' }
    },
    {
      svgPath: <path d="M 35,10 L 40,25 L 55,30 L 40,35 L 35,50 L 30,35 L 15,30 L 30,25 Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" fill="none" />,
      color: '#F59E0B', size: 24, rotate: -5,
      position: { top: '40%', left: '-30px' }
    }
  ];

  return (
    <section id="vision" style={{ background: '#FFFFFF' }}>

      {/* ================================================================== */}
      {/* BLOCK 1 — VISION                                                    */}
      {/* Text LEFT · Illustration RIGHT                                      */}
      {/* ================================================================== */}
      <div
        ref={visionRef}
        onMouseMove={handleVisionMouseMove}
        onMouseLeave={handleVisionMouseLeave}
        style={{
          ...sectionBase,
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FD 50%, #F5F7FF 100%)',
          padding: isMobile ? '80px 0 60px' : '120px 0 100px',
        }}
      >
        {/* Ambient glows */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '55%', height: '100%',
          background: 'radial-gradient(ellipse at 10% 50%, rgba(99,102,241,0.06) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: '45%', height: '100%',
          background: 'radial-gradient(ellipse at 90% 90%, rgba(139,92,246,0.03) 0%, transparent 60%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Parallax Scattered Background Doodles */}
        {!isMobile && _visionDoodles.map((doodle, idx) => (
          <motion.div
            key={`vis-doodle-${idx}`}
            animate={{ 
              x: visionMouse.x * doodle.factor, 
              y: visionMouse.y * doodle.factor,
              rotate: [doodle.rotate, doodle.rotate + 3, doodle.rotate] 
            }}
            transition={{
              rotate: { duration: 5 + idx, repeat: Infinity, ease: "easeInOut" },
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
          {isMobile ? (
            /* ---- MOBILE: Stack ---- */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
              <EditorialTextBlock
                eyebrow="Our Vision"
                eyebrowColor="#6366F1"
                chipText="Future of Mentorship"
                heading={<>Every student.<br />The right mentor.</>}
                headingGradient="linear-gradient(135deg, #1E293B 0%, #3730A3 100%)"
                body="We envision a future where quality education is guided by purpose, not chance. Every learner deserves personalized mentorship, meaningful direction, and measurable progress regardless of where they start."
                pullQuote="Quality education is a right, not a privilege."
                inView={visionInView}
                delay={0}
                metadata={['1-on-1 Dedicated Guidance', 'Custom Diagnostics']}
              />
              <EditorialImage
                src={`${import.meta.env.BASE_URL}ChatGPT Image Jul 30, 2026, 11_28_11 PM.png`}
                alt="A luminous architectural portal representing boundless opportunity in education"
                inView={visionInView}
                delay={200}
                isMobile={isMobile}
              />
            </div>
          ) : (
            /* ---- DESKTOP: Text LEFT · Image RIGHT ---- */
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'center',
              minHeight: 520,
              position: 'relative'
             }}>
              {/* Animated Learning Path */}
              <svg viewBox="0 0 1000 500" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
                <motion.path
                  d="M 420,240 Q 500,100 580,240"
                  stroke="url(#gradient-vision-path)"
                  strokeWidth="2"
                  strokeDasharray="5 7"
                  fill="none"
                  animate={{ strokeDashoffset: [0, -24] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <defs>
                  <linearGradient id="gradient-vision-path" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.08" />
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.08" />
                  </linearGradient>
                </defs>
              </svg>

              <EditorialTextBlock
                eyebrow="Our Vision"
                eyebrowColor="#6366F1"
                chipText="✦ Future of Mentorship"
                heading={<>Every student.<br />The right mentor.</>}
                headingGradient="linear-gradient(135deg, #1E293B 0%, #3730A3 100%)"
                body="We envision a future where quality education is guided by purpose, not chance. Every learner deserves personalized mentorship, meaningful direction, and measurable progress regardless of where they start."
                pullQuote="Quality education is a right, not a privilege."
                inView={visionInView}
                delay={0}
                metadata={['1-on-1 Dedicated Guidance', 'Custom Diagnostics']}
              />
              <EditorialImage
                src={`${import.meta.env.BASE_URL}ChatGPT Image Jul 30, 2026, 11_28_11 PM.png`}
                alt="A luminous architectural portal representing boundless opportunity in education"
                inView={visionInView}
                delay={200}
                isMobile={isMobile}
                floatingItems={visionFloatingItems}
              />
            </div>
          )}
        </div>
      </div>

      {/* Thin divider with animated vertical journey connector */}
      <div style={{ position: 'relative', width: '100%', height: '1px', margin: '0 auto', maxWidth: '90%', zIndex: 2 }}>
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.12) 30%, rgba(139,92,246,0.12) 70%, transparent 100%)',
        }} />
        
        {!isMobile && (
          <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', height: 80, width: 40, pointerEvents: 'none' }}>
            <svg height="80" width="40" viewBox="0 0 40 80" style={{ overflow: 'visible' }}>
              <motion.path
                d="M 20 0 Q 0 40, 20 80"
                stroke="url(#vision-to-mission-grad)"
                strokeWidth="2"
                strokeDasharray="4 5"
                fill="none"
                animate={{ strokeDashoffset: [0, -18] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              <defs>
                <linearGradient id="vision-to-mission-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
      </div>

      {/* ================================================================== */}
      {/* BLOCK 2 — MISSION                                                   */}
      {/* Illustration LEFT · Text RIGHT                                      */}
      {/* ================================================================== */}
      <div
        ref={missionRef}
        onMouseMove={handleMissionMouseMove}
        onMouseLeave={handleMissionMouseLeave}
        style={{
          ...sectionBase,
          background: 'linear-gradient(180deg, #FAFAFC 0%, #F6F4FB 50%, #F3F1F9 100%)',
          padding: isMobile ? '60px 0 80px' : '100px 0 120px',
        }}
      >
        {/* Ambient glows */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '55%', height: '100%',
          background: 'radial-gradient(ellipse at 90% 50%, rgba(139,92,246,0.06) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: '45%', height: '100%',
          background: 'radial-gradient(ellipse at 10% 90%, rgba(99,102,241,0.03) 0%, transparent 60%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Parallax Scattered Background Doodles */}
        {!isMobile && _missionDoodles.map((doodle, idx) => (
          <motion.div
            key={`miss-doodle-${idx}`}
            animate={{ 
              x: missionMouse.x * doodle.factor, 
              y: missionMouse.y * doodle.factor,
              rotate: [doodle.rotate, doodle.rotate + 3, doodle.rotate] 
            }}
            transition={{
              rotate: { duration: 5 + idx, repeat: Infinity, ease: "easeInOut" },
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
          {isMobile ? (
            /* ---- MOBILE: Stack ---- */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
              <EditorialTextBlock
                eyebrow="Our Mission"
                eyebrowColor="#8B5CF6"
                chipText="Life-Changing Matches"
                heading={<>Beyond finding<br />teachers.</>}
                headingGradient="linear-gradient(135deg, #1E293B 0%, #6D28D9 100%)"
                body="We solve the overlooked challenges in learning: understanding the child, matching with the right educator, and sustaining accountability over time. Because a great mentor changes the entire trajectory of a life."
                pullQuote="The right match changes everything."
                inView={missionInView}
                delay={0}
                metadata={['Verified Educators', 'Sustained Accountability']}
              />
              <EditorialImage
                src={`${import.meta.env.BASE_URL}ChatGPT Image Jul 30, 2026, 11_34_55 PM.png`}
                alt="An elegant winding pathway representing purposeful guidance in education"
                inView={missionInView}
                delay={200}
                isMobile={isMobile}
                accent="#8B5CF6"
              />
            </div>
          ) : (
            /* ---- DESKTOP: Image LEFT · Text RIGHT ---- */
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'center',
              minHeight: 520,
              position: 'relative'
            }}>
              {/* Animated Learning Path */}
              <svg viewBox="0 0 1000 500" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
                <motion.path
                  d="M 420,260 Q 500,140 580,220"
                  stroke="url(#gradient-mission-path)"
                  strokeWidth="2"
                  strokeDasharray="5 7"
                  fill="none"
                  animate={{ strokeDashoffset: [0, -24] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <defs>
                  <linearGradient id="gradient-mission-path" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.08" />
                    <stop offset="50%" stopColor="#6366F1" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.08" />
                  </linearGradient>
                </defs>
              </svg>

              <EditorialImage
                src={`${import.meta.env.BASE_URL}ChatGPT Image Jul 30, 2026, 11_34_55 PM.png`}
                alt="An elegant winding pathway representing purposeful guidance in education"
                inView={missionInView}
                delay={0}
                isMobile={isMobile}
                accent="#8B5CF6"
                floatingItems={missionFloatingItems}
              />
              <EditorialTextBlock
                eyebrow="Our Mission"
                eyebrowColor="#8B5CF6"
                chipText="✧ Life-Changing Matches"
                heading={<>Beyond finding<br />teachers.</>}
                headingGradient="linear-gradient(135deg, #1E293B 0%, #6D28D9 100%)"
                body="We solve the overlooked challenges in learning: understanding the child, matching with the right educator, and sustaining accountability over time. Because a great mentor changes the entire trajectory of a life."
                pullQuote="The right match changes everything."
                inView={missionInView}
                delay={200}
                metadata={['Verified Educators', 'Sustained Accountability']}
              />
            </div>
          )}
        </div>
      </div>

      {/* Thin full-width divider */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.12) 30%, rgba(139,92,246,0.12) 70%, transparent 100%)',
        margin: '0 auto',
        maxWidth: '90%',
      }} />

      {/* ================================================================== */}
      {/* BLOCK 3 — MILESTONES TIMELINE                                       */}
      {/* ================================================================== */}
      <div
        ref={timelineRef}
        style={{
          background: '#FFFFFF',
          padding: isMobile ? '60px 0 70px' : '80px 0 100px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Blob glow */}
        <div className="blob blob-1" style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none',
        }} />
        <div className="blob blob-2" style={{
          position: 'absolute', bottom: '-20%', right: '-10%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Section label */}
          <div style={{
            textAlign: 'center',
            marginBottom: isMobile ? 40 : 64,
            opacity: timelineInView ? 1 : 0,
            transform: timelineInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s',
          }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#6366F1',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ display: 'inline-block', width: 24, height: 1, background: '#6366F1', verticalAlign: 'middle' }} />
              Our Journey So Far
              <span style={{ display: 'inline-block', width: 24, height: 1, background: '#6366F1', verticalAlign: 'middle' }} />
            </span>
          </div>

          {/* Timeline Grid */}
          <div style={{ position: 'relative' }}>
            {/* Connecting line (desktop) */}
            {!isMobile && (
              <div style={{
                position: 'absolute',
                top: 20,
                left: '12.5%',
                right: '12.5%',
                height: '2px',
                background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 66%, #E2E8F0 67%, #E2E8F0 100%)',
                zIndex: 1,
                opacity: timelineInView ? 1 : 0,
                transition: 'opacity 1s ease 0.4s',
              }} />
            )}

            <div
              className={isMobile ? 'mobile-swipe-carousel' : ''}
              style={{
                display: isMobile ? 'flex' : 'grid',
                gridTemplateColumns: isMobile ? 'none' : 'repeat(4, 1fr)',
                gap: isMobile ? '0' : '40px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {[
                { year: '2022 — Founded', title: 'Assessment Visits', desc: 'First in India to offer structured home-based student evaluations before teacher placement.', active: true, delay: 0 },
                { year: '2023 — Expanded', title: 'Online Platform', desc: 'TheMentR Online launches alongside a dedicated Olympiad preparation track.', active: true, delay: 100 },
                { year: '2024 — AVSAR', title: 'Data Intelligence', desc: 'Proprietary analytics begin tracking selection rates, performance, and ecosystem health.', active: true, delay: 200 },
                { year: '2025–26 — Roadmap', title: 'National Expansion', desc: '50 cities. 10,000+ verified teachers. AI-assisted matching powered by learning outcome data.', active: false, delay: 300 },
              ].map((node, i) => (
                <div
                  key={i}
                  className={`timeline-node-item ${isMobile ? 'mobile-swipe-card' : ''}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    textAlign: isMobile ? 'left' : 'center',
                    gap: 20,
                    background: isMobile ? '#FFFFFF' : 'transparent',
                    border: isMobile ? '1px solid rgba(15,23,42,0.05)' : 'none',
                    borderRadius: isMobile ? 20 : 0,
                    padding: isMobile ? 24 : 0,
                    boxShadow: isMobile ? '0 4px 12px rgba(10,22,40,0.01)' : 'none',
                    opacity: timelineInView ? 1 : 0,
                    transform: timelineInView ? 'translateY(0)' : 'translateY(24px)',
                    transition: `opacity 0.8s ease ${0.3 + node.delay * 0.001}s, transform 0.8s ease ${0.3 + node.delay * 0.001}s`,
                  }}
                >
                  {/* Node dot */}
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: node.active ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' : '#FFFFFF',
                    border: `2px solid ${node.active ? 'transparent' : '#E2E8F0'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: node.active ? '#FFFFFF' : '#8B5CF6',
                    fontSize: 12, fontWeight: 800,
                    boxShadow: node.active ? '0 4px 12px rgba(99,102,241,0.28)' : 'none',
                    transition: 'transform 0.4s ease',
                  }}>
                    {node.active ? '✓' : '→'}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: node.active ? '#6366F1' : '#94A3B8',
                    }}>
                      {node.year}
                    </span>
                    <h4 style={{
                      fontFamily: 'var(--font-hero)', fontSize: 15, fontWeight: 700,
                      color: '#1E293B', margin: 0,
                    }}>
                      {node.title}
                    </h4>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: 12.5,
                      color: '#64748B', lineHeight: 1.55, margin: 0,
                      maxWidth: isMobile ? 'none' : 220,
                    }}>
                      {node.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .blob-1 { animation: blobDrift 16s ease-in-out infinite; }
        .blob-2 { animation: blobDriftReverse 20s ease-in-out infinite; }
        .timeline-node-item:hover > div:first-child {
          transform: scale(1.14) translateY(-2px);
          box-shadow: 0 8px 18px rgba(99,102,241,0.3) !important;
        }
        @keyframes blobDrift {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(36px,28px,0) scale(1.07); }
        }
        @keyframes blobDriftReverse {
          0%, 100% { transform: translate3d(0,0,0) scale(1.07); }
          50% { transform: translate3d(-28px,-36px,0) scale(1); }
        }
      `}</style>
    </section>
  );
}

/* ========================================================================== */
/* EDITORIAL TEXT BLOCK COMPONENT                                             */
/* ========================================================================== */
function EditorialTextBlock({ eyebrow, eyebrowColor, heading, headingGradient, body, pullQuote, inView, delay = 0, chipText, metadata = [] }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showContent = isMobile ? isMobileExpanded : isHovered;
  const baseTransition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;

  const handleBlockClick = () => {
    if (isMobile) {
      setIsMobileExpanded(!isMobileExpanded);
    }
  };

  return (
    <div 
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleBlockClick}
      style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: baseTransition,
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      {/* Premium metadata chip */}
      {chipText && (
        <div style={{
          alignSelf: 'flex-start',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 12px',
          borderRadius: '100px',
          border: `1.2px solid ${eyebrowColor}24`,
          background: `${eyebrowColor}0c`,
          color: eyebrowColor,
          fontSize: '10.5px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 18,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(8px)',
          transition: `opacity 0.7s ease ${delay + 40}ms, transform 0.7s ease ${delay + 40}ms`
        }}>
          {chipText}
        </div>
      )}

      {/* Eyebrow */}
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: eyebrowColor,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        marginBottom: 22,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.8s ease ${delay + 80}ms, transform 0.8s ease ${delay + 80}ms`,
      }}>
        <span style={{
          display: 'inline-block', width: 20, height: 1.5,
          background: eyebrowColor, verticalAlign: 'middle', borderRadius: 1,
        }} />
        {eyebrow}
      </span>

      {/* Heading */}
      <h2 style={{
        fontFamily: 'var(--font-hero)',
        fontSize: 'clamp(36px, 3.6vw, 54px)',
        fontWeight: 800,
        lineHeight: 1.12,
        letterSpacing: '-0.035em',
        background: headingGradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        margin: '0 0 28px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.9s ease ${delay + 160}ms, transform 0.9s ease ${delay + 160}ms`,
      }}>
        {heading}
      </h2>

      {/* Collapsible Content */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={showContent ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden' }}
      >
        {/* Pull Quote */}
        <div style={{
          borderLeft: `3px solid ${eyebrowColor}`,
          paddingLeft: 18,
          marginBottom: 24,
        }}>
          <p style={{
            fontFamily: 'var(--font-hero)',
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            fontWeight: 600,
            color: '#334155',
            lineHeight: 1.5,
            margin: 0,
            fontStyle: 'italic',
          }}>
            "{pullQuote}"
          </p>
        </div>

        {/* Body */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(14px, 1.1vw, 16px)',
          fontWeight: 400,
          color: '#64748B',
          lineHeight: 1.75,
          margin: 0,
          maxWidth: 480,
        }}>
          {body}
        </p>

        {/* Support checklist metadata indicators */}
        {metadata && metadata.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px 24px',
            marginTop: 28,
            borderTop: '1px solid rgba(15, 23, 42, 0.06)',
            paddingTop: 20
          }}>
            {metadata.map((item, idx) => (
              <span key={idx} style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}>
                <span style={{ color: eyebrowColor, fontWeight: 800 }}>✓</span>
                {item}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ========================================================================== */
/* EDITORIAL IMAGE COMPONENT                                                  */
/* ========================================================================== */
function EditorialImage({ src, alt, inView, delay = 0, isMobile, accent = '#6366F1', floatingItems = [] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.97, y: 20 }}
      whileHover={isMobile ? {} : { 
        scale: 1.04, 
        y: -10, 
        rotate: src.includes("mission") ? 1.2 : -1.2 
      }}
      transition={{ 
        opacity: { duration: 0.8, ease: "easeOut", delay: delay / 1000 },
        scale: { type: "spring", stiffness: 450, damping: 20 },
        y: { type: "spring", stiffness: 450, damping: 20 },
        rotate: { type: "spring", stiffness: 450, damping: 20 }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5
      }}
    >
      {/* Dynamic ambient glow — appears behind illustration */}
      <div style={{
        position: 'absolute',
        inset: isMobile ? '-30px' : '-60px',
        background: `radial-gradient(circle at 50% 50%, ${accent}33 0%, ${accent}0e 45%, transparent 70%)`,
        filter: 'blur(16px)',
        pointerEvents: 'none',
        zIndex: 0,
        transform: hovered ? 'scale(1.28)' : 'scale(1)',
        opacity: hovered ? 1 : 0.55,
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }} />

      {/* Boundary-Breaking Floating Doodles (Desktop only) */}
      {!isMobile && floatingItems.map((item, idx) => (
        <motion.div
          key={`float-item-${idx}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { 
            opacity: 0.65, 
            scale: 1,
            y: [0, -6, 0],
            rotate: [item.rotate, item.rotate + 3, item.rotate]
          } : { opacity: 0, scale: 0.8 }}
          transition={inView ? {
            opacity: { duration: 0.6, delay: (delay + (idx * 150)) / 1000 },
            scale: { duration: 0.6, delay: (delay + (idx * 150)) / 1000 },
            y: { duration: 5 + (idx * 1.5), repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 6 + (idx * 2), repeat: Infinity, ease: "easeInOut" }
          } : {}}
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            zIndex: 10,
            color: item.color || accent,
            ...item.position
          }}
        >
          <svg viewBox="0 0 70 70" width={item.size} height={item.size}>
            {item.svgPath}
          </svg>
        </motion.div>
      ))}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: 'auto',
          display: 'block',
          mixBlendMode: 'multiply',
          transition: 'all 0.3s ease'
        }}
      />
    </motion.div>
  );
}
