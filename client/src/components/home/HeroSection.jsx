import { useState, useEffect } from 'react';
import { FadeUp } from '../../hooks/useScrollReveal';
import BorderGlow from './BorderGlow';
import { useModal } from '../../context/ModalContext';
import SideRays from '../layout/SideRays';

export default function HeroSection() {
  const { openModal } = useModal();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [headerHovered, setHeaderHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="hero" className="hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#FAFBFF', position: 'relative', overflow: 'hidden', padding: '160px 0 120px' }}>
      {/* SideRays ambient background animation */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity: 0.15 }}>
        <SideRays
          speed={1.2}
          rayColor1="#7469F8"
          rayColor2="#4F7CFF"
          intensity={1.5}
          spread={2.5}
          origin="top-right"
          tilt={-10}
          saturation={1.2}
          blend={0.5}
          falloff={1.5}
          opacity={0.8}
        />
      </div>

      {/* Blended background artwork (non-cropped, radial faded, animated) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.45,
        overflow: 'hidden'
      }}>
        <img 
          src="/BBSR_MAP.png" 
          alt="TheMentR BBSR Map Backdrop" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 98% at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
            maskImage: 'radial-gradient(ellipse 90% 98% at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
            animation: 'slowFloat 12s ease-in-out infinite'
          }}
        />
      </div>

      {/* Background radial gradients (cool white ambient theme, opacity < 8%) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '60vw',
        height: '60vh',
        background: 'radial-gradient(circle at 0% 0%, rgba(79, 124, 255, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '60vw',
        height: '60vh',
        background: 'radial-gradient(circle at 100% 100%, rgba(116, 105, 248, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {/* Glassmorphic header card for text readability over map */}
        <div 
          onMouseEnter={() => setHeaderHovered(true)}
          onMouseLeave={() => setHeaderHovered(false)}
          style={{
            background: headerHovered ? 'rgba(255, 255, 255, 0.62)' : 'rgba(255, 255, 255, 0.56)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: 24,
            padding: isMobile ? '16px 20px' : '24px 36px',
            border: headerHovered ? '1px solid rgba(79, 124, 255, 0.25)' : '1px solid rgba(255, 255, 255, 0.45)',
            boxShadow: headerHovered ? '0 12px 40px rgba(15, 23, 42, 0.07)' : '0 8px 32px rgba(15, 23, 42, 0.03)',
            transform: headerHovered ? 'translateY(-2px)' : 'none',
            maxWidth: 900,
            width: '100%',
            marginBottom: 48,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Eyebrow */}
          <FadeUp>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-emerald)', animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Educational Ecosystem</span>
            </div>
          </FadeUp>

          {/* Editorial Serif Heading */}
          <FadeUp delay={0.1}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4.4vw, 54px)',
              lineHeight: 1.15,
              marginBottom: 16,
              color: '#1D2433',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              maxWidth: 820
            }}>
              It's a <span style={{ background: 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>solution</span>, not a service.
            </h1>
          </FadeUp>

          {/* Subtitle */}
          <FadeUp delay={0.2}>
            <p style={{
              fontSize: 17,
              color: 'var(--color-text-secondary)',
              marginBottom: 0,
              maxWidth: 680,
              lineHeight: 1.75,
              fontWeight: 400
            }}>
              TheMentR connects parents, students and verified teachers through structured personalized learning — from assessment to outcome.
            </p>
          </FadeUp>
        </div>

        {/* Buttons Row (CTA) */}
        <FadeUp delay={0.3}>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
            <button
              onClick={() => openModal('parent')}
              className="btn btn-hero-primary"
              style={{
                fontSize: 15,
                padding: '12px 28px',
                cursor: 'pointer',
                border: 'none',
                outline: 'none'
              }}
            >
              📋 Book Assessment Visit
            </button>
            <button
              onClick={() => openModal('teacher')}
              className="btn btn-hero-secondary"
              style={{
                fontSize: 15,
                padding: '12px 28px',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              Become a Teacher
            </button>
          </div>
        </FadeUp>

        {/* Three Cards Layout (with 20-30px offset rhythm) */}
        <div className="hero-cards-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 28,
          width: '100%',
          marginBottom: 72,
          paddingTop: isMobile ? 0 : 24
        }}>
          {/* Card 1: Scheduler (Offset: +20px) */}
          <FadeUp delay={0.4} y={16} style={{ height: '100%' }}>
            <div style={{
              position: 'relative',
              transform: isMobile ? 'none' : 'translateY(20px)',
              transition: 'transform 0.4s ease',
              height: '100%'
            }}>
              {/* Huge blurred radial background glow (5% opacity) */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 320,
                height: 320,
                background: 'radial-gradient(circle, rgba(79, 124, 255, 0.05) 0%, transparent 70%)',
                filter: 'blur(30px)',
                pointerEvents: 'none',
                zIndex: -1
              }} />
              
              <BorderGlow borderRadius={28} backgroundColor="#FFFFFF">
                <div style={{ padding: isMobile ? '24px 20px' : '44px 36px', display: 'flex', flexDirection: 'column', height: '100%', cursor: 'default' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#4F7CFF', letterSpacing: '0.05em', marginBottom: 14, textTransform: 'uppercase' }}>01</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, color: '#1D2433', marginBottom: 10 }}>160+ verified teachers</h3>
                  <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 36 }}>Schedule at 2k+ locations or live online sessions.</p>
                  
                  {/* Scheduler Mock Widget */}
                  <div style={{ marginTop: 'auto', background: '#FAFBFD', borderRadius: 16, padding: 18, border: '1px solid rgba(79, 124, 255, 0.08)' }}>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 14 }}>
                      {[
                        { day: 'TUE', num: 5 },
                        { day: 'WED', num: 6 },
                        { day: 'THU', num: 7, active: true },
                        { day: 'FRI', num: 8 },
                        { day: 'SAT', num: 9 },
                      ].map(d => (
                        <div key={d.num} style={{
                          padding: '6px 8px',
                          borderRadius: 8,
                          background: d.active ? 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)' : 'white',
                          border: `1px solid ${d.active ? '#4F7CFF' : 'rgba(79, 124, 255, 0.12)'}`,
                          textAlign: 'center',
                          minWidth: 38,
                          color: d.active ? 'white' : 'var(--color-text-primary)',
                          boxShadow: d.active ? '0 2px 8px rgba(79, 124, 255, 0.25)' : '0 1px 2px rgba(0,0,0,0.02)'
                        }}>
                          <div style={{ fontSize: 8, opacity: d.active ? 0.9 : 0.5, fontWeight: 600 }}>{d.day}</div>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>{d.num}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'center', opacity: 0.85 }}>
                      {[
                        { time: '8:50' },
                        { time: '9:00', active: true },
                        { time: '9:10' },
                        { time: '9:20' }
                      ].map(t => (
                        <div key={t.time} style={{
                          padding: '4px 6px',
                          borderRadius: 6,
                          background: t.active ? 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)' : 'white',
                          border: `1px solid ${t.active ? '#4F7CFF' : 'rgba(79, 124, 255, 0.12)'}`,
                          fontSize: 10,
                          color: t.active ? 'white' : 'var(--color-text-secondary)',
                          fontWeight: t.active ? 600 : 400
                        }}>
                          {t.time}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </div>
          </FadeUp>

          {/* Card 2: Progress Tracker (Offset: -20px) */}
          <FadeUp delay={0.5} y={16} style={{ height: '100%' }}>
            <div style={{
              position: 'relative',
              transform: isMobile ? 'none' : 'translateY(-20px)',
              transition: 'transform 0.4s ease',
              height: '100%'
            }}>
              {/* Huge blurred radial background glow (5% opacity) */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 320,
                height: 320,
                background: 'radial-gradient(circle, rgba(116, 105, 248, 0.05) 0%, transparent 70%)',
                filter: 'blur(30px)',
                pointerEvents: 'none',
                zIndex: -1
              }} />
              
              <BorderGlow borderRadius={28} backgroundColor="#FFFFFF">
                <div style={{ padding: isMobile ? '24px 20px' : '44px 36px', display: 'flex', flexDirection: 'column', height: '100%', cursor: 'default' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#7469F8', letterSpacing: '0.05em', marginBottom: 14, textTransform: 'uppercase' }}>02</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, color: '#1D2433', marginBottom: 10 }}>Results explained</h3>
                  <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 36 }}>By top educators and subject-matter alignment.</p>
                  
                  {/* SVG Progression Widget */}
                  <div style={{ marginTop: 'auto', background: '#FAFBFD', borderRadius: 16, padding: '18px 20px', border: '1px solid rgba(79, 124, 255, 0.08)', position: 'relative', height: 94 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', position: 'absolute', left: 16, right: 16, opacity: 0.35, pointerEvents: 'none' }}>
                      <div style={{ borderBottom: '1px dashed rgba(79, 124, 255, 0.12)', fontSize: 8, color: 'var(--color-text-muted)', paddingBottom: 2 }}>ABOVE RANGE</div>
                      <div style={{ borderBottom: '1px dashed rgba(79, 124, 255, 0.12)', fontSize: 8, color: 'var(--color-text-muted)', paddingBottom: 2 }}>IN RANGE</div>
                      <div style={{ fontSize: 8, color: 'var(--color-text-muted)' }}>BELOW RANGE</div>
                    </div>
                    <svg viewBox="0 0 200 60" style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
                      <path d="M 20 40 Q 60 10 90 25 T 180 15" fill="none" stroke="#7469F8" strokeWidth="2.5" />
                      <circle cx="20" cy="40" r="4" fill="#7469F8" />
                      <circle cx="85" cy="18" r="4" fill="#7469F8" />
                      <circle cx="145" cy="21" r="4" fill="#7469F8" />
                      <text x="20" y="32" fontSize="7" fontWeight="700" textAnchor="middle" fill="var(--color-text-primary)">8.2</text>
                      <text x="85" y="10" fontSize="7" fontWeight="700" textAnchor="middle" fill="var(--color-text-primary)">16.7</text>
                      <text x="145" y="13" fontSize="7" fontWeight="700" textAnchor="middle" fill="var(--color-text-primary)">12.5</text>
                    </svg>
                  </div>
                </div>
              </BorderGlow>
            </div>
          </FadeUp>

          {/* Card 3: Action Plan (Offset: +20px) */}
          <FadeUp delay={0.6} y={16} style={{ height: '100%' }}>
            <div style={{
              position: 'relative',
              transform: isMobile ? 'none' : 'translateY(20px)',
              transition: 'transform 0.4s ease',
              height: '100%'
            }}>
              {/* Huge blurred radial background glow (5% opacity) */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 320,
                height: 320,
                background: 'radial-gradient(circle, rgba(79, 124, 255, 0.05) 0%, transparent 70%)',
                filter: 'blur(30px)',
                pointerEvents: 'none',
                zIndex: -1
              }} />
              
              <BorderGlow borderRadius={28} backgroundColor="#FFFFFF">
                <div style={{ padding: isMobile ? '24px 20px' : '44px 36px', display: 'flex', flexDirection: 'column', height: '100%', cursor: 'default' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#4F7CFF', letterSpacing: '0.05em', marginBottom: 14, textTransform: 'uppercase' }}>03</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, color: '#1D2433', marginBottom: 10 }}>Follow your plan</h3>
                  <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 36 }}>Take action. Match and learn again.</p>
                  
                  {/* Outcome Plan Mock Widget */}
                  <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      { icon: '🎯', title: 'Personalized Match', desc: 'Verified CBSE & ICSE teachers' },
                      { icon: '📈', title: 'Track Gaps', desc: 'Algebra & Geometry feedback' },
                      { icon: '📅', title: 'Structured Plan', desc: '12 classes per month' }
                    ].map((item, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '8px 12px',
                        borderRadius: 12,
                        background: '#FAFBFD',
                        border: '1px solid rgba(79, 124, 255, 0.08)'
                      }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: 6,
                          background: 'linear-gradient(135deg, rgba(79, 124, 255, 0.1) 0%, rgba(116, 105, 248, 0.1) 100%)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 12, flexShrink: 0,
                          boxShadow: '0 1px 3px rgba(79,124,255,0.06), inset 0 1px 1px rgba(255,255,255,0.9)'
                        }}>
                          {item.icon}
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>{item.title}</div>
                          <div style={{ fontSize: 9, color: 'var(--color-text-secondary)', marginTop: 2 }}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </BorderGlow>
            </div>
          </FadeUp>
        </div>
      </div>

      <style>{`
        .btn-hero-primary {
          background: linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%) !important;
          border-radius: 16px !important;
          color: white !important;
          font-weight: 600 !important;
          box-shadow: 0 4px 14px rgba(79, 124, 255, 0.25) !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .btn-hero-primary:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(79, 124, 255, 0.35) !important;
          background: linear-gradient(135deg, #5b87ff 0%, #7e74f8 100%) !important;
        }
        .btn-hero-secondary {
          background: #FFFFFF !important;
          border: 1px solid rgba(79, 124, 255, 0.15) !important;
          border-radius: 16px !important;
          color: var(--color-text-primary) !important;
          font-weight: 600 !important;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04) !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .btn-hero-secondary:hover {
          transform: translateY(-2px) !important;
          background: #F6F8FD !important;
          border-color: rgba(79, 124, 255, 0.25) !important;
          box-shadow: 0 4px 12px rgba(79, 124, 255, 0.08) !important;
        }
        @media (max-width: 1024px) {
          .hero-section {
            padding: 110px 0 80px !important;
          }
          .hero-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            width: 90% !important;
            max-width: 360px !important;
            margin: 0 auto !important;
          }
          .hero-cards-grid h3 {
            font-size: 20px !important;
          }
          .hero-cards-grid p {
            margin-bottom: 24px !important;
          }
        }
        @keyframes slowFloat {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-15px, 10px, 0) scale(1.03); }
        }
      `}</style>
    </section>
  );
}
