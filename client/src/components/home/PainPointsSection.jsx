import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, EyeOff, DollarSign, ShieldCheck, UserMinus, ClipboardList, UserX, Award } from 'lucide-react';

export default function PainPointsSection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [activeFamily, setActiveFamily] = useState('fam-1');
  const [activeEducator, setActiveEducator] = useState('edu-1');
  const [hoveredFamily, setHoveredFamily] = useState(null);
  const [hoveredEducator, setHoveredEducator] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const familyPoints = [
    {
      id: 'fam-1',
      title: 'Finding trusted teachers',
      quote: '"I don\'t know if this teacher is actually qualified."',
      icon: Search
    },
    {
      id: 'fam-2',
      title: 'Learning feels invisible',
      quote: '"How do I know my child is improving?"',
      icon: EyeOff
    },
    {
      id: 'fam-3',
      title: 'Every wrong tutor costs',
      quote: '"We\'ve already changed tutors twice."',
      icon: DollarSign
    },
    {
      id: 'fam-4',
      title: 'Safety matters',
      quote: '"Trust should never be a question."',
      icon: ShieldCheck
    }
  ];

  const educatorPoints = [
    {
      id: 'edu-1',
      title: 'Great teachers stay invisible',
      quote: '"My experience shouldn\'t compete on price."',
      icon: UserMinus
    },
    {
      id: 'edu-2',
      title: 'Too much administration',
      quote: '"I spend more time managing than teaching."',
      icon: ClipboardList
    },
    {
      id: 'edu-3',
      title: 'Wrong student matching',
      quote: '"The wrong fit wastes everyone\'s time."',
      icon: UserX
    },
    {
      id: 'edu-4',
      title: 'No professional recognition',
      quote: '"Good teaching deserves visibility."',
      icon: Award
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

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section 
      id="pain" 
      style={{ 
        background: '#FAFAFC', 
        padding: isMobile ? '80px 0' : '140px 0', 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      {/* Background Layer 2: Soft ambient gradients meeting near center */}
      {/* Blue Glow on the Left (Families) */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-10%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.035) 0%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Green Glow on the Right (Educators) */}
      <div style={{
        position: 'absolute',
        top: '25%',
        right: '-10%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.03) 0%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Background Layer 3: Faint Grain Texture */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.012,
          pointerEvents: 'none',
          zIndex: 1
        }} />
      )}

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* ============================================================== */}
        {/* PART 1: The Shared Problem */}
        {/* ============================================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          style={{ textAlign: 'center', marginBottom: isMobile ? '56px' : '96px' }}
        >

          
          <h2 style={{
            fontFamily: 'var(--font-hero)',
            fontWeight: 800,
            fontSize: isMobile ? 'clamp(34px, 7vw, 44px)' : 'clamp(44px, 3.5vw, 60px)',
            lineHeight: 1.15,
            letterSpacing: '-0.04em',
            color: '#1E293B',
            margin: '0 0 20px'
          }}>
            Education isn't broken.<br />
            The journey is.
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 16,
            color: '#64748B',
            lineHeight: 1.6,
            maxWidth: '520px',
            margin: '0 auto'
          }}>
            Parents struggle to find the right educators. Teachers struggle to reach the right students.<br />
            <span style={{ fontWeight: 600, color: '#475569', marginTop: 8, display: 'inline-block' }}>The problem exists on both sides.</span>
          </p>
        </motion.div>

        {/* ============================================================== */}
        {/* PART 2: Two Perspectives */}
        {/* ============================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '48px' : '64px',
          alignItems: 'start',
          marginBottom: isMobile ? '80px' : '120px'
        }}>
          
          {/* LEFT SIDE: For Families */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-hero)',
              fontWeight: 700,
              fontSize: 14,
              color: '#6366F1',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 32,
              textAlign: 'left'
            }}>
              FOR FAMILIES
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {familyPoints.map((item, idx) => {
                const Icon = item.icon;
                const isExpanded = isMobile ? (activeFamily === item.id) : (hoveredFamily === item.id);
                return (
                  <motion.div
                    key={item.id}
                    custom={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    onMouseEnter={() => !isMobile && setHoveredFamily(item.id)}
                    onMouseLeave={() => !isMobile && setHoveredFamily(null)}
                    onClick={() => isMobile && setActiveFamily(activeFamily === item.id ? null : item.id)}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 20,
                      border: `1.5px solid ${isExpanded ? '#6366F1' : 'rgba(99, 102, 241, 0.08)'}`,
                      boxShadow: isExpanded 
                        ? '0 12px 24px rgba(99, 102, 241, 0.06)' 
                        : '0 4px 12px rgba(10, 22, 40, 0.01)',
                      padding: '20px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      textAlign: 'left',
                      transform: isExpanded ? 'translateY(-4px)' : 'translateY(0)',
                      transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms ease, box-shadow 300ms ease',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: isExpanded ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isExpanded ? '#6366F1' : '#64748B',
                        flexShrink: 0,
                        transition: 'all 300ms ease'
                      }}>
                        <Icon size={20} strokeWidth={2} />
                      </div>

                      <h4 style={{
                        fontFamily: 'var(--font-section)',
                        fontWeight: 700,
                        fontSize: 15,
                        color: '#1E293B',
                        margin: 0
                      }}>
                        {item.title}
                      </h4>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 14,
                            color: '#64748B',
                            margin: '4px 0 0 56px',
                            lineHeight: 1.5,
                            fontStyle: 'italic'
                          }}>
                            {item.quote}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: For Educators */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-hero)',
              fontWeight: 700,
              fontSize: 14,
              color: '#10B981',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 32,
              textAlign: 'left'
            }}>
              FOR EDUCATORS
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {educatorPoints.map((item, idx) => {
                const Icon = item.icon;
                const isExpanded = isMobile ? (activeEducator === item.id) : (hoveredEducator === item.id);
                return (
                  <motion.div
                    key={item.id}
                    custom={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    onMouseEnter={() => !isMobile && setHoveredEducator(item.id)}
                    onMouseLeave={() => !isMobile && setHoveredEducator(null)}
                    onClick={() => isMobile && setActiveEducator(activeEducator === item.id ? null : item.id)}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 20,
                      border: `1.5px solid ${isExpanded ? '#10B981' : 'rgba(99, 102, 241, 0.08)'}`,
                      boxShadow: isExpanded 
                        ? '0 12px 24px rgba(16, 185, 129, 0.04)' 
                        : '0 4px 12px rgba(10, 22, 40, 0.01)',
                      padding: '20px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      textAlign: 'left',
                      transform: isExpanded ? 'translateY(-4px)' : 'translateY(0)',
                      transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms ease, box-shadow 300ms ease',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: isExpanded ? 'rgba(16, 185, 129, 0.08)' : 'rgba(99, 102, 241, 0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isExpanded ? '#10B981' : '#64748B',
                        flexShrink: 0,
                        transition: 'all 300ms ease'
                      }}>
                        <Icon size={20} strokeWidth={2} />
                      </div>

                      <h4 style={{
                        fontFamily: 'var(--font-section)',
                        fontWeight: 700,
                        fontSize: 15,
                        color: '#1E293B',
                        margin: 0
                      }}>
                        {item.title}
                      </h4>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 14,
                            color: '#64748B',
                            margin: '4px 0 0 56px',
                            lineHeight: 1.5,
                            fontStyle: 'italic'
                          }}>
                            {item.quote}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* PART 3: The Real Problem Statement */}
        {/* ============================================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          style={{ textAlign: 'center', padding: isMobile ? '20px 0' : '40px 0' }}
        >
          <h2 style={{
            fontFamily: 'var(--font-hero)',
            fontWeight: 800,
            fontSize: isMobile ? 'clamp(36px, 8vw, 48px)' : 'clamp(54px, 4vw, 68px)',
            lineHeight: 1.15,
            letterSpacing: '-0.04em',
            color: '#1E293B',
            margin: '0 auto 24px',
            maxWidth: '900px'
          }}>
            Education doesn't have<br />
            a teacher shortage.<br />
            It has a{' '}
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              style={{ color: '#6366F1', display: 'inline-block' }}
            >
              matching problem.
            </motion.span>
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: 16,
            color: '#64748B',
            lineHeight: 1.6,
            margin: 0
          }}>
            That's exactly what TheMentR was built to solve.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
