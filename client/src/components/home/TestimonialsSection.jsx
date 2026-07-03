import { useState, useEffect, useRef } from 'react';
import { FadeUp } from '../../hooks/useScrollReveal';

const testimonials = [
  {
    stars: 5,
    quote: "Friendly environment, very polite and hospitality is great.",
    name: "Subham Kumar Dash",
    role: "Teacher",
    location: "IRC village, N3, Nayapalli",
    badge: "Verified Teacher",
    initials: "SD",
    color: "#4F7CFF"
  },
  {
    stars: 5,
    quote: "Thank you, I felt very happy with all the respected staff & MD sir. This Environment is very friendly.",
    name: "Akash Kumar Sahoo",
    role: "Teacher",
    location: "Nayapalli, Beherasahi",
    badge: "Verified Teacher",
    initials: "AS",
    color: "#7469F8"
  },
  {
    stars: 5,
    quote: "Thank you everyone. Great opportunity. Friendly & polite behaviour. Good Initiative.",
    name: "Sangram Rout",
    role: "Teacher",
    location: "Jayadev Vihar, Bhubaneswar",
    badge: "Verified Teacher",
    initials: "SR",
    color: "#059669"
  },
  {
    stars: 5,
    quote: "I would like to convey my thanks for such a wonderful initialization to bring a revolution in the education field.",
    name: "Vikas Ranjan Senapati",
    role: "Teacher",
    location: "Bhubaneswar, Odisha",
    badge: "Verified Teacher",
    initials: "VS",
    color: "#D97706"
  },
  {
    stars: 5,
    quote: "Very friendly atmosphere, friendly and supportive staff. It's my first experience as a tutor and very excited for the journey. Thank you.",
    name: "Pratismita Sahoo",
    role: "Teacher",
    location: "Bajapur, Puri",
    badge: "Verified Teacher",
    initials: "PS",
    color: "#2563EB"
  },
  {
    stars: 5,
    quote: "Staff are so polite and humble and my experience with this institution is remarkable.",
    name: "Priyabrata Pradhan",
    role: "Teacher",
    location: "Banamalipur, Balipatna, Khorda",
    badge: "Verified Teacher",
    initials: "PP",
    color: "#EC4899"
  },
  {
    stars: 5,
    quote: "The onboarding experience was smooth, well-organised and very informative. The team was supportive. Thank you for the warm welcome. I look forward to contributing and growing with the company. Thank you.",
    name: "Nirmalya Das",
    role: "Teacher",
    location: "Pathargadhia, KIIT, BBSR",
    badge: "Verified Teacher",
    initials: "ND",
    color: "#8B5CF6"
  }
];

const additionalTestimonials = [];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showAll, setShowAll] = useState(false);
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

                    {/* Initials Avatar */}
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
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
                      {t.initials}
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
                        {t.role}
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
                fontSize: 'clamp(20px, 2.2vw, 26px)',
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
                    {active.role} &bull; {active.location}
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
              left: `${activeIndex * (100 / testimonials.length)}%`,
              width: `${100 / testimonials.length}%`
            }}
          />
        </div>

        {/* View More Feedbacks Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 56 }}>
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(79, 124, 255, 0.3)',
              borderRadius: 99,
              color: '#4F7CFF',
              fontSize: 14,
              fontWeight: 600,
              padding: '12px 32px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-sans)'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79, 124, 255, 0.05)'; e.currentTarget.style.borderColor = '#4F7CFF'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(79, 124, 255, 0.3)'; }}
          >
            {showAll ? 'Show Less Feedbacks' : 'View More Feedbacks →'}
          </button>
        </div>

        {/* Expanded Feedbacks Grid */}
        {showAll && (
          <div style={{ marginTop: 44, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }} className="additional-testimonials-grid">
            {additionalTestimonials.map((t, idx) => (
              <div key={idx} style={{
                background: '#FFFFFF',
                borderRadius: 20,
                padding: 24,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.015)',
                border: '1px solid rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}>
                <div>
                  <div style={{ display: 'flex', color: '#F59E0B', fontSize: 13, letterSpacing: 2, marginBottom: 16 }}>
                    {'★'.repeat(t.stars)}
                  </div>
                  <p style={{ fontSize: 14.5, color: '#1D2433', lineHeight: 1.6, marginBottom: 24, fontStyle: 'italic' }}>
                    “{t.quote}”
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid rgba(0,0,0,0.03)', paddingTop: 16 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: t.color, color: '#FFFFFF', fontWeight: 700, fontSize: 12, flexShrink: 0
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <h5 style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: '#1D2433' }}>{t.name}</h5>
                    <span style={{ fontSize: 11, color: '#5C667A', fontWeight: 500 }}>
                      {t.role} &bull; {t.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
