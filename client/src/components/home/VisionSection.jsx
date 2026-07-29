import { useState, useEffect, useRef } from 'react';

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

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const sectionBase = {
    background: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <section id="vision" style={{ background: '#FFFFFF' }}>

      {/* ================================================================== */}
      {/* BLOCK 1 — VISION                                                    */}
      {/* Text LEFT · Illustration RIGHT                                      */}
      {/* ================================================================== */}
      <div
        ref={visionRef}
        style={{
          ...sectionBase,
          padding: isMobile ? '80px 0 60px' : '120px 0 80px',
        }}
      >
        {/* Subtle ambient glow */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '55%', height: '100%',
          background: 'radial-gradient(ellipse at 10% 50%, rgba(99,102,241,0.045) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {isMobile ? (
            /* ---- MOBILE: Stack ---- */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
              <EditorialTextBlock
                eyebrow="Our Vision"
                eyebrowColor="#6366F1"
                heading={<>Every student.<br />The right mentor.</>}
                headingGradient="linear-gradient(135deg, #1E293B 0%, #3730A3 100%)"
                body="We envision a future where quality education is guided by purpose, not chance. Every learner deserves personalized mentorship, meaningful direction, and measurable progress — regardless of where they start."
                pullQuote="Quality education is a right, not a privilege."
                inView={visionInView}
                delay={0}
              />
              <EditorialImage
                src="/mentr_vision_illustration.png"
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
            }}>
              <EditorialTextBlock
                eyebrow="Our Vision"
                eyebrowColor="#6366F1"
                heading={<>Every student.<br />The right mentor.</>}
                headingGradient="linear-gradient(135deg, #1E293B 0%, #3730A3 100%)"
                body="We envision a future where quality education is guided by purpose, not chance. Every learner deserves personalized mentorship, meaningful direction, and measurable progress — regardless of where they start."
                pullQuote="Quality education is a right, not a privilege."
                inView={visionInView}
                delay={0}
              />
              <EditorialImage
                src="/mentr_vision_illustration.png"
                alt="A luminous architectural portal representing boundless opportunity in education"
                inView={visionInView}
                delay={200}
                isMobile={isMobile}
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
      {/* BLOCK 2 — MISSION                                                   */}
      {/* Illustration LEFT · Text RIGHT                                      */}
      {/* ================================================================== */}
      <div
        ref={missionRef}
        style={{
          ...sectionBase,
          background: '#FAFAFC',
          padding: isMobile ? '60px 0 80px' : '80px 0 120px',
        }}
      >
        {/* Ambient glow right side */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '55%', height: '100%',
          background: 'radial-gradient(ellipse at 90% 50%, rgba(139,92,246,0.045) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {isMobile ? (
            /* ---- MOBILE: Stack ---- */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
              <EditorialTextBlock
                eyebrow="Our Mission"
                eyebrowColor="#8B5CF6"
                heading={<>Beyond finding<br />teachers.</>}
                headingGradient="linear-gradient(135deg, #1E293B 0%, #6D28D9 100%)"
                body="We solve the overlooked challenges in learning: understanding the child, matching with the right educator, and sustaining accountability over time. Because a great mentor changes the entire trajectory of a life."
                pullQuote="The right match changes everything."
                inView={missionInView}
                delay={0}
              />
              <EditorialImage
                src="/mentr_mission_illustration.png"
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
            }}>
              <EditorialImage
                src="/mentr_mission_illustration.png"
                alt="An elegant winding pathway representing purposeful guidance in education"
                inView={missionInView}
                delay={0}
                isMobile={isMobile}
                accent="#8B5CF6"
              />
              <EditorialTextBlock
                eyebrow="Our Mission"
                eyebrowColor="#8B5CF6"
                heading={<>Beyond finding<br />teachers.</>}
                headingGradient="linear-gradient(135deg, #1E293B 0%, #6D28D9 100%)"
                body="We solve the overlooked challenges in learning: understanding the child, matching with the right educator, and sustaining accountability over time. Because a great mentor changes the entire trajectory of a life."
                pullQuote="The right match changes everything."
                inView={missionInView}
                delay={200}
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
function EditorialTextBlock({ eyebrow, eyebrowColor, heading, headingGradient, body, pullQuote, inView, delay = 0 }) {
  const baseTransition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(32px)',
      transition: baseTransition,
    }}>
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

      {/* Pull Quote */}
      <div style={{
        borderLeft: `3px solid ${eyebrowColor}`,
        paddingLeft: 18,
        marginBottom: 24,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-12px)',
        transition: `opacity 0.8s ease ${delay + 240}ms, transform 0.8s ease ${delay + 240}ms`,
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
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.8s ease ${delay + 320}ms, transform 0.8s ease ${delay + 320}ms`,
      }}>
        {body}
      </p>
    </div>
  );
}

/* ========================================================================== */
/* EDITORIAL IMAGE COMPONENT                                                  */
/* ========================================================================== */
function EditorialImage({ src, alt, inView, delay = 0, isMobile, accent = '#6366F1' }) {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: inView ? 1 : 0,
      transform: inView ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(20px)',
      transition: `opacity 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {/* Soft ambient glow — appears behind illustration, not around it */}
      <div style={{
        position: 'absolute',
        inset: isMobile ? '-20px' : '-48px',
        background: `radial-gradient(ellipse at 50% 60%, ${accent}18 0%, transparent 68%)`,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* 
        NO card, NO border, NO box-shadow, NO rounded container.
        The image renders directly on the page.
        mix-blend-mode: multiply dissolves any white PNG background into the page.
      */}
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
          /* No border, no shadow, no border-radius — drawn on the page */
        }}
      />
    </div>
  );
}
