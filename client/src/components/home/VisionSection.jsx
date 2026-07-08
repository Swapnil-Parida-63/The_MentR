import { useState, useEffect, useRef } from 'react';

export default function VisionSection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isVisible, setIsVisible] = useState(false);
  
  // Interactive Column States
  const [hoverVision, setHoverVision] = useState(false);
  const [hoverMission, setHoverMission] = useState(false);
  
  const [visionCoords, setVisionCoords] = useState({ x: 0, y: 0 });
  const [missionCoords, setMissionCoords] = useState({ x: 0, y: 0 });
  
  const domRef = useRef();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    
    // Intersection Observer to trigger scroll entrance animation
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.15 });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  const handleMouseMove = (e, column) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.04; 
    const y = (e.clientY - rect.top - rect.height / 2) * 0.04;
    if (column === 'vision') {
      setVisionCoords({ x, y });
    } else {
      setMissionCoords({ x, y });
    }
  };

  const resetCoords = (column) => {
    if (column === 'vision') {
      setHoverVision(false);
      setVisionCoords({ x: 0, y: 0 });
    } else {
      setHoverMission(false);
      setMissionCoords({ x: 0, y: 0 });
    }
  };

  const renderSpansForText = (text, startDelay = 0) => {
    return text.split('').map((char, index) => {
      const isSpace = char === ' ';
      return (
        <span
          key={index}
          style={{
            display: 'inline-block',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            filter: isVisible ? 'blur(0)' : 'blur(4px)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: `${startDelay + index * 16}ms`
          }}
        >
          {isSpace ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <section 
      id="vision" 
      ref={domRef}
      style={{ 
        background: '#FAFAFC', 
        position: 'relative', 
        overflow: 'hidden', 
        padding: isMobile ? '60px 0' : '85px 0',
        display: 'flex',
        alignItems: 'center',
        minHeight: 'auto',
        cursor: 'default'
      }}
    >
      {/* Background Animated Gradient Blobs */}
      <div className="blob blob-1" style={{
        position: 'absolute',
        top: '-15%',
        left: '-15%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.07) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      <div className="blob blob-2" style={{
        position: 'absolute',
        bottom: '-15%',
        right: '-15%',
        width: '55vw',
        height: '55vw',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
          gap: isMobile ? '80px' : '120px', 
          alignItems: 'center',
          position: 'relative'
        }}>
          
          {/* Vertical Separator Line (Desktop) */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '5%',
              width: '1px',
              height: isVisible ? '90%' : '0%',
              background: 'linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.15) 30%, rgba(139, 92, 246, 0.15) 70%, transparent)',
              transform: 'translateX(-50%)',
              transition: 'height 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              zIndex: 3
            }} />
          )}

          {/* Left Column: Vision */}
          <div 
            onMouseEnter={() => setHoverVision(true)}
            onMouseLeave={() => resetCoords('vision')}
            onMouseMove={(e) => handleMouseMove(e, 'vision')}
            onClick={() => {
              if (isMobile) {
                setHoverVision(!hoverVision);
              }
            }}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible 
                ? `translate3d(${visionCoords.x}px, ${visionCoords.y}px, 0)` 
                : 'translate3d(0, 40px, 0) scale(0.98)',
              filter: isVisible ? 'blur(0px)' : 'blur(6px)',
              transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: isMobile ? 'auto' : '360px',
              cursor: isMobile ? 'pointer' : 'default'
            }}
          >
            {/* Tiny Eyebrow */}
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#6366F1',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 20,
              display: 'block'
            }}>
              Our Vision
            </span>

            {/* Typography Heading */}
            <h2 style={{
              fontFamily: 'var(--font-hero)',
              fontSize: isMobile ? 'clamp(28px, 6.5vw, 36px)' : 'clamp(36px, 3.5vw, 48px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: hoverVision ? '#6366F1' : '#1E293B',
              margin: 0,
              transform: hoverVision ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              {renderSpansForText('EVERY STUDENT.', 0)}<br />
              {renderSpansForText('THE RIGHT MENTOR.', 200)}
            </h2>

            {/* Underline grow */}
            <div style={{
              height: '3px',
              background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)',
              width: hoverVision ? '160px' : '0px',
              marginTop: 20,
              borderRadius: '1.5px',
              transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }} />

            {/* Supporting Paragraph */}
            <div style={{
              opacity: hoverVision ? 1 : 0,
              transform: hoverVision ? 'translateY(0)' : 'translateY(20px)',
              filter: hoverVision ? 'blur(0)' : 'blur(4px)',
              maxHeight: hoverVision ? '200px' : '0px',
              marginTop: hoverVision ? '28px' : '0px',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              overflow: 'hidden'
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: isMobile ? 15 : 16,
                color: '#64748B',
                lineHeight: 1.7,
                margin: 0,
                fontWeight: 450
              }}>
                We envision a future where quality education is guided by purpose, not chance. Every learner deserves personalized mentorship, meaningful direction, and measurable progress.
              </p>
            </div>
          </div>

          {/* Right Column: Mission */}
          <div 
            onMouseEnter={() => setHoverMission(true)}
            onMouseLeave={() => resetCoords('mission')}
            onMouseMove={(e) => handleMouseMove(e, 'mission')}
            onClick={() => {
              if (isMobile) {
                setHoverMission(!hoverMission);
              }
            }}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible 
                ? `translate3d(${missionCoords.x}px, ${missionCoords.y}px, 0)` 
                : 'translate3d(0, 40px, 0) scale(0.98)',
              filter: isVisible ? 'blur(0px)' : 'blur(6px)',
              transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, filter 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: isMobile ? 'auto' : '360px',
              cursor: isMobile ? 'pointer' : 'default'
            }}
          >
            {/* Tiny Eyebrow */}
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#8B5CF6',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 20,
              display: 'block'
            }}>
              Our Mission
            </span>

            {/* Typography Heading */}
            <h2 style={{
              fontFamily: 'var(--font-hero)',
              fontSize: isMobile ? 'clamp(28px, 6.5vw, 36px)' : 'clamp(36px, 3.5vw, 48px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: hoverMission ? '#8B5CF6' : '#1E293B',
              margin: 0,
              transform: hoverMission ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              {renderSpansForText('BEYOND', 150)}<br />
              {renderSpansForText('FINDING TEACHERS.', 300)}
            </h2>

            {/* Underline grow */}
            <div style={{
              height: '3px',
              background: 'linear-gradient(90deg, #8B5CF6 0%, #A78BFA 100%)',
              width: hoverMission ? '160px' : '0px',
              marginTop: 20,
              borderRadius: '1.5px',
              transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }} />

            {/* Supporting Paragraph */}
            <div style={{
              opacity: hoverMission ? 1 : 0,
              transform: hoverMission ? 'translateY(0)' : 'translateY(20px)',
              filter: hoverMission ? 'blur(0)' : 'blur(4px)',
              maxHeight: hoverMission ? '200px' : '0px',
              marginTop: hoverMission ? '28px' : '0px',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              overflow: 'hidden'
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: isMobile ? 15 : 16,
                color: '#64748B',
                lineHeight: 1.7,
                margin: 0,
                fontWeight: 450
              }}>
                We solve the overlooked challenges in learning through assessments, verified educators, intelligent matching, and continuous accountability. Because education begins with finding the right mentor.
              </p>
            </div>
          </div>

        </div>

        {/* Horizontal Timeline at the Bottom */}
        <div style={{
          marginTop: isMobile ? '64px' : '96px',
          borderTop: '1.5px solid rgba(99, 102, 241, 0.08)',
          paddingTop: '54px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.35s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.35s',
          width: '100%',
          position: 'relative'
        }}>
          {/* Connecting Line (Desktop) */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              top: '70px', 
              left: '12.5%',
              right: '12.5%',
              height: '2px',
              background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 66%, #E2E8F0 67%, #E2E8F0 100%)',
              zIndex: 1
            }} />
          )}

          {/* Grid of Nodes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: isMobile ? '36px' : '40px',
            position: 'relative',
            zIndex: 2
          }}>
            {[
              { year: '2022 — FOUNDED', title: 'Assessment Visits', desc: 'First in India to offer structured home-based student evaluations before teacher placement.', active: true },
              { year: '2023 — EXPANDED', title: 'Online Platform', desc: 'TheMentR Online launches alongside a dedicated Olympiad preparation track.', active: true },
              { year: '2024 — AVSAR', title: 'Data Intelligence', desc: 'Proprietary analytics begin tracking selection rates, performance, and ecosystem health.', active: true },
              { year: '2025–26 — ROADMAP', title: 'National Expansion', desc: '50 cities. 10,000+ verified teachers. AI-assisted matching powered by learning outcome data.', active: false }
            ].map((node, index) => (
              <div 
                key={index} 
                className="timeline-node-item"
                style={{ 
                  display: 'flex', 
                  flexDirection: isMobile ? 'row' : 'column',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  textAlign: isMobile ? 'left' : 'center',
                  gap: isMobile ? '16px' : '20px'
                }}
              >
                {/* Node Circle */}
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: node.active ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' : '#FFFFFF',
                  border: `2px solid ${node.active ? 'transparent' : '#E2E8F0'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: node.active ? '#FFFFFF' : '#8B5CF6',
                  fontSize: 12,
                  fontWeight: 800,
                  boxShadow: node.active ? '0 4px 10px rgba(99,102,241,0.25)' : 'none',
                  flexShrink: 0,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                  {node.active ? '✓' : '→'}
                </div>

                {/* Node Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: node.active ? '#6366F1' : '#64748B',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>
                    {node.year}
                  </span>
                  <h4 style={{
                    fontFamily: 'var(--font-hero)',
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#1E293B',
                    margin: 0
                  }}>
                    {node.title}
                  </h4>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: '#64748B',
                    lineHeight: 1.5,
                    margin: 0,
                    maxWidth: isMobile ? 'none' : '240px'
                  }}>
                    {node.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .blob-1 {
          animation: drift 16s ease-in-out infinite;
        }
        .blob-2 {
          animation: drift-reverse 20s ease-in-out infinite;
        }
        
        .timeline-node-item:hover div:first-child {
          transform: scale(1.15) translateY(-2px);
          box-shadow: 0 6px 14px rgba(99,102,241,0.35);
        }
        
        @keyframes drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(40px, 30px, 0) scale(1.08); }
        }
        
        @keyframes drift-reverse {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1.08); }
          50% { transform: translate3d(-30px, -40px, 0) scale(1); }
        }
      `}</style>
    </section>
  );
}
