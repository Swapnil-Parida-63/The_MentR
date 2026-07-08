import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function WhySection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCol, setHoveredCol] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const featureRows = [
    {
      id: 1,
      title: 'Assessment First',
      desc: 'Every learning journey begins by understanding the student.'
    },
    {
      id: 2,
      title: 'Verified Educators',
      desc: 'Every mentor is carefully screened, evaluated and continuously supported.'
    },
    {
      id: 3,
      title: 'Intelligent Matching',
      desc: 'Students are matched based on learning needs, goals and teaching style.'
    },
    {
      id: 4,
      title: 'Built-in Accountability',
      desc: 'Track progress, receive insights and focus on measurable outcomes.'
    }
  ];

  return (
    <div style={{ background: '#FAFAFC', padding: isMobile ? '80px 0' : '160px 0', overflow: 'hidden' }}>
      
      {/* SECTION 1: TWO COLUMN MANIFESTO */}
      <div className="container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '0.4fr 0.6fr', 
            gap: isMobile ? '60px' : '100px',
            alignItems: 'start'
          }}
        >
          {/* Left Column (40%) */}
          <div style={{ textAlign: 'left' }}>
            <span style={{ 
              fontFamily: 'var(--font-section)', 
              fontWeight: 600, 
              fontSize: 12, 
              color: '#6366F1', 
              letterSpacing: '0.15em', 
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 16
            }}>
              Why TheMentR
            </span>
            <h2 style={{
              fontFamily: 'var(--font-hero)',
              fontWeight: 800,
              fontSize: isMobile ? 'clamp(32px, 8vw, 44px)' : 'clamp(44px, 4vw, 56px)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#1E293B',
              margin: 0
            }}>
              We didn't<br />
              build another<br />
              marketplace.
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 450,
              fontSize: 16,
              color: '#64748B',
              lineHeight: 1.6,
              marginTop: 24,
              marginRight: isMobile ? 0 : 20
            }}>
              We built a learning ecosystem not another listing platform.
            </p>
          </div>

          {/* Right Column (60%) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {featureRows.map((row, idx) => {
              const isHovered = hoveredRow === row.id;
              return (
                <div 
                  key={row.id}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer'
                  }}
                >
                  {/* Row Content */}
                  <div style={{
                    padding: '24px 0',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16
                  }}>
                    {/* Circle Indicator */}
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      border: `1.5px solid ${isHovered ? '#6366F1' : '#64748B'}`,
                      background: isHovered ? '#6366F1' : 'transparent',
                      marginTop: 8,
                      flexShrink: 0,
                      transition: 'all 0.3s ease'
                    }} />

                    {/* Text block */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <h4 style={{
                        fontFamily: 'var(--font-hero)',
                        fontWeight: 700,
                        fontSize: 18,
                        color: isHovered ? '#6366F1' : '#1E293B',
                        margin: 0,
                        position: 'relative',
                        display: 'inline-block',
                        transition: 'color 0.3s ease'
                      }}>
                        {row.title}
                        {/* Title Underline grow */}
                        <div style={{
                          position: 'absolute',
                          bottom: -2,
                          left: 0,
                          height: 1.5,
                          background: '#6366F1',
                          width: isHovered ? '100%' : '0%',
                          transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                        }} />
                      </h4>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 450,
                        fontSize: 14,
                        color: '#64748B',
                        lineHeight: 1.55,
                        margin: 0
                      }}>
                        {row.desc}
                      </p>
                    </div>
                  </div>

                  {/* Elegant Thin Divider */}
                  {idx < featureRows.length - 1 && (
                    <div style={{ height: 1, background: '#E8EAF2', width: '100%' }} />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* SECTION 2: THE PERSONAL HOOK */}
      <div className="container" style={{ marginTop: isMobile ? '100px' : '180px' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          style={{ textAlign: 'center', marginBottom: isMobile ? '60px' : '100px' }}
        >
          <h2 style={{
            fontFamily: 'var(--font-hero)',
            fontWeight: 800,
            fontSize: isMobile ? 'clamp(36px, 8vw, 48px)' : 'clamp(56px, 4.5vw, 72px)',
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            color: '#1E293B',
            margin: '0 auto',
            maxWidth: '900px'
          }}>
            Never before<br />
            has learning<br />
            been this personal.
          </h2>
        </motion.div>

        {/* THREE CORE PRINCIPLES */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '48px' : '64px',
            position: 'relative'
          }}
        >
          {[
            {
              id: '01',
              title: 'Assessment',
              desc: 'Every student is understood before learning begins.'
            },
            {
              id: '02',
              title: 'Matching',
              desc: 'Every learner is paired with the educator who fits them best.'
            },
            {
              id: '03',
              title: 'Progress',
              desc: 'Every milestone is measured to ensure continuous growth.'
            }
          ].map((col, idx) => {
            const isHovered = hoveredCol === col.id;
            return (
              <div 
                key={col.id}
                onMouseEnter={() => setHoveredCol(col.id)}
                onMouseLeave={() => setHoveredCol(null)}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  textAlign: 'left',
                  position: 'relative',
                  paddingLeft: isMobile ? 0 : '16px',
                  cursor: 'pointer'
                }}
              >
                {/* Desktop Vertical Divider Lines */}
                {!isMobile && idx > 0 && (
                  <div style={{
                    position: 'absolute',
                    left: -32,
                    top: 0,
                    bottom: 0,
                    width: 1,
                    background: '#E8EAF2'
                  }} />
                )}

                {/* Number */}
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: 40,
                  color: isHovered ? '#6366F1' : '#A78BFA',
                  transition: 'color 0.3s ease',
                  lineHeight: 1
                }}>
                  {col.id}
                </div>

                {/* Title */}
                <h4 style={{
                  fontFamily: 'var(--font-hero)',
                  fontWeight: 800,
                  fontSize: 22,
                  color: isHovered ? '#6366F1' : '#1E293B',
                  margin: '12px 0 10px',
                  position: 'relative',
                  display: 'inline-block',
                  transition: 'color 0.3s ease',
                  alignSelf: 'flex-start'
                }}>
                  {col.title}
                  {/* Underline grow */}
                  <div style={{
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    height: 2,
                    background: '#6366F1',
                    width: isHovered ? '100%' : '0%',
                    transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                  }} />
                </h4>

                {/* Description */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 450,
                  fontSize: 15,
                  color: '#64748B',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {col.desc}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>

    </div>
  );
}
