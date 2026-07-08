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

  return (
    <section 
      id="vision" 
      ref={domRef}
      style={{ 
        background: '#FAFAFC', 
        position: 'relative', 
        overflow: 'hidden', 
        padding: isMobile ? '100px 0' : '180px 0',
        display: 'flex',
        alignItems: 'center',
        minHeight: isMobile ? 'auto' : '90vh',
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
              minHeight: isMobile ? 'auto' : '360px'
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
              fontSize: isMobile ? 'clamp(36px, 8vw, 48px)' : 'clamp(48px, 4.5vw, 68px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: hoverVision ? '#6366F1' : '#1E293B',
              margin: 0,
              transform: hoverVision ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              EVERY STUDENT.<br />
              THE RIGHT MENTOR.
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
              opacity: hoverVision || isMobile ? 1 : 0,
              transform: hoverVision || isMobile ? 'translateY(0)' : 'translateY(20px)',
              filter: hoverVision || isMobile ? 'blur(0)' : 'blur(4px)',
              maxHeight: hoverVision || isMobile ? '200px' : '0px',
              marginTop: hoverVision || isMobile ? '28px' : '0px',
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
              minHeight: isMobile ? 'auto' : '360px'
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
              fontSize: isMobile ? 'clamp(36px, 8vw, 48px)' : 'clamp(48px, 4.5vw, 68px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: hoverMission ? '#8B5CF6' : '#1E293B',
              margin: 0,
              transform: hoverMission ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              BEYOND<br />
              FINDING TEACHERS.
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
              opacity: hoverMission || isMobile ? 1 : 0,
              transform: hoverMission || isMobile ? 'translateY(0)' : 'translateY(20px)',
              filter: hoverMission || isMobile ? 'blur(0)' : 'blur(4px)',
              maxHeight: hoverMission || isMobile ? '200px' : '0px',
              marginTop: hoverMission || isMobile ? '28px' : '0px',
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
      </div>

      <style>{`
        .blob-1 {
          animation: drift 16s ease-in-out infinite;
        }
        .blob-2 {
          animation: drift-reverse 20s ease-in-out infinite;
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
