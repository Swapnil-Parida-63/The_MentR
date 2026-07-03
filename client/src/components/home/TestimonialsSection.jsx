import { useState, useEffect, useRef } from 'react';
import { FadeUp } from '../../hooks/useScrollReveal';

const testimonials = [
  {
    stars: 5,
    quote: "The assessment visit changed everything. For the first time, someone actually sat down and explained where my daughter was struggling — before charging us a rupee.",
    name: "Sunita Mehta",
    role: "Parent",
    classInfo: "Class 9 CBSE",
    location: "Pune",
    badge: "Verified Parent",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    initials: "SM",
    color: "#4F7CFF"
  },
  {
    stars: 5,
    quote: "I've been teaching for 11 years. TheMentR is the first platform where I feel like a professional, not a freelancer. The infrastructure helps me focus purely on outcomes.",
    name: "Rohan Kapoor",
    role: "Math Teacher",
    classInfo: "Olympiad & Senior Secondary",
    location: "Mumbai",
    badge: "Verified Teacher",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    initials: "RK",
    color: "#7469F8"
  },
  {
    stars: 5,
    quote: "My son qualified for IMO Stage 2 after 4 months on the Olympiad programme. The structured approach and verified study material made all the difference.",
    name: "Arvind Patel",
    role: "Parent",
    classInfo: "IMO Olympiad Class 6",
    location: "Bengaluru",
    badge: "Verified Parent",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    initials: "AP",
    color: "#059669"
  },
  {
    stars: 5,
    quote: "The monthly reports are genuinely useful. I know which chapters Aisha needs help with before her school exam, giving us ample time to revise.",
    name: "Nandita Rao",
    role: "Parent",
    classInfo: "Class 7 ICSE",
    location: "Hyderabad",
    badge: "Verified Parent",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    initials: "NR",
    color: "#D97706"
  },
  {
    stars: 5,
    quote: "Having a teacher matched to how I actually learn made me want to study. My Physics grade went from a C to an A in one term.",
    name: "Vikram S.",
    role: "Student",
    classInfo: "Class 11 CBSE",
    location: "Delhi",
    badge: "Verified Student",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
    initials: "VS",
    color: "#2563EB"
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto switch every 7.5 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % testimonials.length;
      handleIndexChange(nextIndex);
    }, 7500);
    return () => clearInterval(interval);
  }, [activeIndex, isHovered]);

  const handleIndexChange = (newIndex) => {
    if (newIndex === activeIndex || isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(newIndex);
    setTimeout(() => {
      setDisplayIndex(newIndex);
      setIsTransitioning(false);
    }, 220); // Sync midpoint of the fade transition
  };

  const active = testimonials[displayIndex];

  // Dynamic vertical offset for macOS Dock playlist shift effect
  const listTranslateY = (1.8 - activeIndex) * 58;

  // Coordinate math for the morphing SVG connector line
  // The line starts at the active reviewer's center Y height
  // Item Height is 76px, Gap is 12px. Center of active item is offset dynamically.
  const yStart = 40 + activeIndex * 88 + 38 + (1.8 - activeIndex) * 58;
  const yEnd = 240; // Center of floating text right panel

  return (
    <section 
      id="testimonials" 
      className="section" 
      style={{ background: '#fef9ef', overflow: 'hidden', position: 'relative', padding: '120px 0' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={containerRef}
    >
      {/* Premium ambient glows (opacity < 5%) */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, rgba(79, 124, 255, 0.035) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: 450,
        height: 450,
        background: 'radial-gradient(circle, rgba(116, 105, 248, 0.03) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      <div className="container">
        <FadeUp><div className="eyebrow">Testimonials</div></FadeUp>
        <FadeUp delay={0.1} duration={0.8} y={24}>
          <h2 style={{ 
            fontSize: 'clamp(32px, 3.5vw, 44px)', 
            marginBottom: 72, 
            fontFamily: 'var(--font-display)', 
            fontWeight: 500, 
            color: '#1D2433',
            textAlign: 'left'
          }}>
            Families growing with MentR
          </h2>
        </FadeUp>

        <div className="editorial-testimonials-layout" style={{ position: 'relative' }}>
          
          {/* Left Panel: Reviewer list & progress track */}
          <div className="reviewer-panel-wrapper" style={{ position: 'relative' }}>
            
            {/* Vertical timeline progress track */}
            <div className="vertical-progress-track">
              <div 
                className="vertical-progress-bar"
                style={{
                  top: activeIndex * 88 + 16,
                  height: 44,
                  transform: 'translate3d(0, 0, 0)'
                }}
              />
            </div>

            {/* Shiftable reviewer container */}
            <div 
              className="reviewer-scroll-container"
              style={{
                transform: `translate3d(0, ${listTranslateY}px, 0)`
              }}
            >
              {testimonials.map((t, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={t.name}
                    onClick={() => handleIndexChange(idx)}
                    className={`reviewer-editorial-item ${isActive ? 'active' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      height: 76,
                      margin: '6px 0',
                      cursor: 'pointer',
                      opacity: isActive ? 1 : 0.45,
                      transform: isMobile ? 'none' : (isActive ? 'scale(1.04) translate3d(8px, 0, 0)' : 'scale(0.96) translate3d(0, 0, 0)'),
                      transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                      position: 'relative'
                    }}
                  >
                    {/* Active vertical accent bar */}
                    <div style={{
                      position: 'absolute',
                      left: -20,
                      width: 3,
                      height: 24,
                      borderRadius: 99,
                      background: 'linear-gradient(180deg, #4F7CFF, #7469F8)',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
                      transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
                    }} />

                    {/* Image */}
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: t.color,
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: 14,
                      flexShrink: 0,
                      position: 'relative',
                      boxShadow: isActive ? '0 4px 12px rgba(79, 124, 255, 0.15)' : 'none',
                      transition: 'all 0.35s'
                    }}>
                      <img 
                        src={t.avatar} 
                        alt={t.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {/* Active green verification dot */}
                      {isActive && (
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#10B981',
                          border: '1.5px solid #FAFBFF'
                        }} />
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ 
                        fontSize: 15, 
                        fontWeight: 700, 
                        color: '#1D2433',
                        letterSpacing: '-0.01em'
                      }}>
                        {t.name}
                      </span>
                      <span style={{ 
                        fontSize: 11, 
                        color: '#5C667A', 
                        fontWeight: 500,
                        marginTop: 2
                      }}>
                        {t.role} &bull; {t.classInfo.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Morphing SVG relationship line (desktop only) */}
          <div className="svg-connector-wrapper">
            <svg style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F7CFF" />
                  <stop offset="100%" stopColor="#7469F8" />
                </linearGradient>
                <filter id="svg-blur" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d={`M 15,${yStart} C 70,${yStart} 50,${yEnd} 105,${yEnd}`}
                fill="none"
                stroke="url(#glow-grad)"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#svg-blur)"
                style={{
                  transition: 'd 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </svg>
          </div>

          {/* Right Panel: Large floating editorial quote */}
          <div className="testimonial-editorial-detail">
            {/* Background large quotation mark */}
            <div className="backdrop-quote-mark">“</div>

            <div 
              style={{
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning ? 'translate3d(0, 12px, 0)' : 'translate3d(0, 0, 0)',
                transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                zIndex: 2
              }}
            >
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 2.4vw, 28px)',
                lineHeight: 1.6,
                color: '#1D2433',
                fontWeight: 400,
                marginBottom: 36,
                maxWidth: '60ch',
                fontStyle: 'normal'
              }}>
                {active.quote}
              </p>

              {/* Reviewer Meta Information */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#1D2433' }}>{active.name}</span>
                    <span style={{ 
                      background: 'rgba(5, 150, 105, 0.08)', 
                      color: '#059669', 
                      fontSize: 10, 
                      fontWeight: 700, 
                      padding: '2px 8px', 
                      borderRadius: 6,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {active.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: '#5C667A', fontWeight: 500 }}>
                    {active.role} &bull; {active.classInfo} &bull; {active.location}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ color: '#F59E0B', fontSize: 15, letterSpacing: 2, marginBottom: 2 }}>
                    {'★'.repeat(active.stars)}
                  </div>
                  <span style={{ fontSize: 11, color: '#5C667A', fontWeight: 500 }}>100% matched</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Line indicator (only on mobile) */}
        <div className="mobile-progress-line-container">
          <div 
            className="mobile-progress-line"
            style={{
              left: `${activeIndex * 20}%`
            }}
          />
        </div>
      </div>

      <style>{`
        .editorial-testimonials-layout {
          display: grid;
          grid-template-columns: 35% 120px 1fr;
          align-items: center;
          min-height: 420px;
        }
        .reviewer-panel-wrapper {
          padding-left: 20px;
          border-left: 1px solid rgba(79, 124, 255, 0.06);
        }
        .vertical-progress-track {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(79, 124, 255, 0.06);
        }
        .vertical-progress-bar {
          position: absolute;
          left: -1px;
          width: 3px;
          background: linear-gradient(180deg, #4F7CFF, #7469F8);
          border-radius: 99px;
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reviewer-scroll-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (hover: hover) {
          .reviewer-editorial-item:hover {
            opacity: 0.8 !important;
            transform: scale(0.98) translate3d(4px, 0, 0) !important;
          }
          .reviewer-editorial-item.active:hover {
            opacity: 1 !important;
            transform: scale(1.04) translate3d(8px, 0, 0) !important;
          }
        }
        .svg-connector-wrapper {
          width: 120px;
          height: 100%;
          position: relative;
        }
        .testimonial-editorial-detail {
          position: relative;
          padding-left: 20px;
        }
        .backdrop-quote-mark {
          font-family: var(--font-display);
          font-size: 150px;
          line-height: 0.1;
          color: rgba(79, 124, 255, 0.04);
          position: absolute;
          top: 60px;
          left: -10px;
          pointer-events: none;
          user-select: none;
          z-index: 1;
        }
        .mobile-progress-line-container {
          display: none;
        }
        @media (max-width: 1024px) {
          .editorial-testimonials-layout {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .reviewer-panel-wrapper {
            padding-left: 0;
            border-left: none;
            overflow: hidden;
            margin-bottom: 16px;
          }
          .vertical-progress-track, .svg-connector-wrapper {
            display: none;
          }
          .reviewer-scroll-container {
            flex-direction: row;
            overflow-x: auto;
            transform: none !important;
            padding: 10px 4px 16px;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .reviewer-scroll-container::-webkit-scrollbar {
            display: none;
          }
          .reviewer-editorial-item {
            min-width: 250px;
            scroll-snap-align: start;
            margin: 0 !important;
            transform: none !important;
            opacity: 0.6 !important;
            transition: opacity 0.3s;
          }
          .reviewer-editorial-item.active {
            opacity: 1 !important;
          }
          .mobile-progress-line-container {
            display: block;
            position: relative;
            width: 100%;
            height: 2px;
            background: rgba(79, 124, 255, 0.08);
            margin-bottom: 40px;
            border-radius: 99px;
          }
          .mobile-progress-line {
            position: absolute;
            width: 20%;
            height: 100%;
            background: linear-gradient(90deg, #4F7CFF, #7469F8);
            border-radius: 99px;
            transition: left 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .testimonial-editorial-detail {
            padding-left: 0;
          }
          .backdrop-quote-mark {
            font-size: 110px;
            top: 40px;
            left: -15px;
          }
        }
      `}</style>
    </section>
  );
}
