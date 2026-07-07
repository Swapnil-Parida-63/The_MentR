import { useState, useEffect } from 'react';
import { FadeUp } from '../../hooks/useScrollReveal';
import BorderGlow from './BorderGlow';
import { useModal } from '../../context/ModalContext';
import SideRays from '../layout/SideRays';

export default function HeroSection() {
  const { openModal } = useModal();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [headerHovered, setHeaderHovered] = useState(false);
  const [liveTime, setLiveTime] = useState(new Date());

  // Interactive UI States
  const [activeMonth, setActiveMonth] = useState(null); // Line chart hover (0 to 3 for MAR, MAY, JUN)
  const [selectedBar, setSelectedBar] = useState(6); // Bar chart index (0-6, default Sunday)
  const [activeTestimonial, setActiveTestimonial] = useState(0); // Testimonial card selection (0-2)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    
    // Live ticking clock (updates state every second)
    const interval = setInterval(() => {
      setLiveTime(new Date());
    }, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  const getTeacherCount = () => {
    const baseDate = new Date('2026-07-01T00:00:00');
    const currentDate = new Date();
    const diffTime = Math.max(0, currentDate - baseDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return 500 + diffDays * 3;
  };

  const getTeachingHours = () => {
    const baseDate = new Date('2026-07-01T00:00:00');
    const currentDate = new Date();
    const diffTime = Math.max(0, currentDate - baseDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    // Base 128 hours, increasing by 2.5 hours per day
    return Math.floor(128 + diffDays * 2.5);
  };

  const formatLocalDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
  };

  const formatLocalTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

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
              Welcome to <span style={{ background: 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>TheMentR</span>
            </h1>
          </FadeUp>

          {/* Subtitle */}
          <FadeUp delay={0.2}>
            <p style={{
              fontSize: 17,
              color: 'var(--color-text-secondary)',
              marginBottom: 0,
              maxWidth: 720,
              lineHeight: 1.75,
              fontWeight: 400
            }}>
              We don't just connect you with verified teachers, we create a personalized learning journey designed around every student's unique potential. From assessment to measurable outcomes, every step is guided with purpose.
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
              Book a Demo
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
              Join as a Teacher
            </button>
          </div>
        </FadeUp>

        {/* Three Cards Layout (with unequal offset rhythm for premium editorial feel) */}
        <div className="hero-cards-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 40,
          width: '100%',
          marginBottom: 72,
          paddingTop: isMobile ? 0 : 24
        }}>
          {/* Card 1: Teacher Community (Offset: +20px) */}
          <FadeUp delay={0.4} y={20} style={{ height: '100%' }}>
            <div style={{
              transform: isMobile ? 'none' : 'translateY(20px)',
              transition: 'transform 0.4s ease',
              height: '100%'
            }}>
              <div className="premium-dashboard-card card-purple-accent">
                {/* Badge */}
                <div className="premium-badge" style={{ background: 'rgba(99, 102, 241, 0.08)', color: '#6366F1' }}>
                  👥 Teacher Community
                </div>

                {/* Typography */}
                <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: 28, fontWeight: 700, color: '#1E293B', marginBottom: 10, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                  <span style={{ fontSize: 32, fontFamily: 'var(--font-stat)', fontWeight: 800, color: '#6366F1', display: 'block', marginBottom: 2 }}>
                    {activeMonth ? (activeMonth === 'JAN' ? '400' : activeMonth === 'MAR' ? '445' : activeMonth === 'MAY' ? '485' : getTeacherCount()) : getTeacherCount()}+
                  </span>
                  {activeMonth ? `${activeMonth} '26` : 'Verified Teachers'}
                </h3>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, marginBottom: 28 }}>
                  Everyday expanding — our teacher family is growing along with us.
                </p>

                {/* Dashboard Widget Part: Avatars & Plus Pulse Badge */}
                <div style={{ 
                  background: 'rgba(99, 102, 241, 0.03)', 
                  border: '1px solid rgba(99, 102, 241, 0.08)',
                  borderRadius: 20, 
                  padding: '16px 20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: 24
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span className="pulse-counter" style={{ fontSize: 20, fontWeight: 800, color: '#6366F1', fontFamily: 'var(--font-stat)' }}>+3</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#64748B' }}>New Teachers<br/>Every Day</span>
                  </div>
                  
                  {/* Overlapping Avatar Stack */}
                  <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces" 
                      alt="Teacher" 
                      style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid white', objectFit: 'cover' }} 
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces" 
                      alt="Teacher" 
                      style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid white', marginLeft: -12, objectFit: 'cover' }} 
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" 
                      alt="Teacher" 
                      style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid white', marginLeft: -12, objectFit: 'cover' }} 
                    />
                    <div style={{ 
                      width: 28, height: 28, borderRadius: '50%', 
                      background: '#6366F1', color: 'white', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      fontSize: 12, fontWeight: 700, border: '2px solid white', marginLeft: -8 
                    }}>
                      +
                    </div>
                  </div>
                </div>

                {/* Monthly Growth Line Graph */}
                <div style={{ marginTop: 'auto', position: 'relative' }}>
                  {/* Floating Tooltip Indicator */}
                  {activeMonth && (
                    <div style={{
                      position: 'absolute',
                      left: activeMonth === 'JAN' ? 10 : activeMonth === 'MAR' ? 106 : activeMonth === 'MAY' ? 202 : 250,
                      top: activeMonth === 'JAN' ? 45 : activeMonth === 'MAR' ? 20 : activeMonth === 'MAY' ? 5 : -12,
                      transform: 'translateX(-50%)',
                      background: '#1E293B',
                      color: 'white',
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '4px 8px',
                      borderRadius: 6,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      zIndex: 10,
                      pointerEvents: 'none',
                      whiteSpace: 'nowrap'
                    }}>
                      {activeMonth === 'JAN' ? '400' : activeMonth === 'MAR' ? '445' : activeMonth === 'MAY' ? '485' : getTeacherCount()} Teachers
                    </div>
                  )}
                  
                  <svg viewBox="0 0 260 90" style={{ width: '100%', height: 90, overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(99, 102, 241, 0.25)" />
                        <stop offset="100%" stopColor="rgba(99, 102, 241, 0.0)" />
                      </linearGradient>
                    </defs>
                    <path d="M 10 75 Q 34 68 58 60 Q 82 55 106 50 Q 130 47 154 44 Q 178 38 202 32 Q 226 24 250 15 L 250 85 L 10 85 Z" fill="url(#chartGrad)" />
                    <path d="M 10 75 Q 34 68 58 60 Q 82 55 106 50 Q 130 47 154 44 Q 178 38 202 32 Q 226 24 250 15" fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
                    
                    {/* Visual Points */}
                    <circle cx="10" cy="75" r={activeMonth === 'JAN' ? 5.5 : 3.5} fill="#6366F1" stroke="#FFFFFF" strokeWidth="1.5" style={{ transition: 'all 0.2s ease' }} />
                    <circle cx="106" cy="50" r={activeMonth === 'MAR' ? 5.5 : 3.5} fill="#6366F1" stroke="#FFFFFF" strokeWidth="1.5" style={{ transition: 'all 0.2s ease' }} />
                    <circle cx="202" cy="32" r={activeMonth === 'MAY' ? 5.5 : 3.5} fill="#6366F1" stroke="#FFFFFF" strokeWidth="1.5" style={{ transition: 'all 0.2s ease' }} />
                    <circle cx="250" cy="15" r={activeMonth === 'JUN' ? 6.5 : 4.5} fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="2" style={{ transition: 'all 0.2s ease' }} />
                    
                    {/* Interactive Invisible Hover Areas */}
                    <circle cx="10" cy="75" r="16" fill="transparent" style={{ cursor: 'pointer' }} onMouseEnter={() => setActiveMonth('JAN')} onMouseLeave={() => setActiveMonth(null)} />
                    <circle cx="106" cy="50" r="16" fill="transparent" style={{ cursor: 'pointer' }} onMouseEnter={() => setActiveMonth('MAR')} onMouseLeave={() => setActiveMonth(null)} />
                    <circle cx="202" cy="32" r="16" fill="transparent" style={{ cursor: 'pointer' }} onMouseEnter={() => setActiveMonth('MAY')} onMouseLeave={() => setActiveMonth(null)} />
                    <circle cx="250" cy="15" r="16" fill="transparent" style={{ cursor: 'pointer' }} onMouseEnter={() => setActiveMonth('JUN')} onMouseLeave={() => setActiveMonth(null)} />

                    <text x="10" y="86" fontSize="8" fill="#64748B" textAnchor="middle" fontFamily="var(--font-body)">JAN</text>
                    <text x="106" y="86" fontSize="8" fill="#64748B" textAnchor="middle" fontFamily="var(--font-body)">MAR</text>
                    <text x="202" y="86" fontSize="8" fill="#64748B" textAnchor="middle" fontFamily="var(--font-body)">MAY</text>
                    <text x="250" y="86" fontSize="8" fill="#64748B" textAnchor="middle" fontFamily="var(--font-body)">JUN</text>
                  </svg>
                </div>

                {/* Bottom caption */}
                <div style={{ borderTop: '1px solid #F1F5F9', marginTop: 18, paddingTop: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366F1' }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#6366F1' }}>Our community keeps growing</span>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Card 2: Teaching Hours (Offset: -20px) */}
          <FadeUp delay={0.5} y={20} style={{ height: '100%' }}>
            <div style={{
              transform: isMobile ? 'none' : 'translateY(-20px)',
              transition: 'transform 0.4s ease',
              height: '100%'
            }}>
              <div className="premium-dashboard-card card-orange-accent">
                {/* Badge */}
                <div className="premium-badge" style={{ background: 'rgba(245, 158, 11, 0.08)', color: '#F59E0B' }}>
                  ⏱ Teaching Hours
                </div>

                {/* Typography */}
                <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: 26, fontWeight: 700, color: '#1E293B', marginBottom: 10, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                  Teaching Hours Added Every Day
                </h3>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, marginBottom: 28 }}>
                  Working hard for the new pace and revolution.
                </p>

                {/* Dashboard Widget Part: Hours & Progress Ring */}
                <div style={{ 
                  background: 'rgba(245, 158, 11, 0.03)', 
                  border: '1px solid rgba(245, 158, 11, 0.08)',
                  borderRadius: 20, 
                  padding: '20px 24px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: 24
                }}>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][selectedBar]}'s Added Hours
                    </span>
                    <span style={{ fontSize: 32, fontFamily: 'var(--font-stat)', fontWeight: 800, color: '#1E293B' }}>
                      {Math.floor(getTeachingHours() * [0.35, 0.48, 0.58, 0.42, 0.72, 0.85, 1.0][selectedBar])}+
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B', display: 'block', marginTop: 2 }}>Teaching Hours</span>
                  </div>

                  {/* Circular Progress with Clock Inside */}
                  <div style={{ position: 'relative', width: 72, height: 72 }}>
                    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(245, 158, 11, 0.08)" strokeWidth="8" />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="42" 
                        fill="none" 
                        stroke="#F59E0B" 
                        strokeWidth="8" 
                        strokeDasharray="263.8" 
                        strokeDashoffset={263.8 * (1 - [0.35, 0.48, 0.58, 0.42, 0.72, 0.85, 1.0][selectedBar])} 
                        strokeLinecap="round" 
                        style={{ transition: 'stroke-dashoffset 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                      />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                      🕒
                    </div>
                  </div>
                </div>

                {/* Bar Graph Mon-Sun */}
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 80, padding: '0 8px' }}>
                    {[
                      { day: 'M', val: 25 },
                      { day: 'T', val: 35 },
                      { day: 'W', val: 42 },
                      { day: 'T', val: 30 },
                      { day: 'F', val: 55 },
                      { day: 'S', val: 60 },
                      { day: 'S', val: 80 }
                    ].map((bar, i) => (
                      <div 
                        key={i} 
                        onMouseEnter={() => setSelectedBar(i)}
                        onClick={() => setSelectedBar(i)}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: 6, position: 'relative', cursor: 'pointer' }}
                      >
                        {selectedBar === i && (
                          <div style={{
                            position: 'absolute',
                            top: -24,
                            background: '#F59E0B',
                            color: 'white',
                            fontSize: 9,
                            fontWeight: 700,
                            padding: '2px 4px',
                            borderRadius: 4,
                            boxShadow: '0 2px 4px rgba(245,158,11,0.2)',
                            zIndex: 2,
                            whiteSpace: 'nowrap'
                          }}>
                            {Math.floor(getTeachingHours() * [0.35, 0.48, 0.58, 0.42, 0.72, 0.85, 1.0][i])}+
                          </div>
                        )}
                        <div style={{
                          width: 12,
                          height: bar.val,
                          background: selectedBar === i ? 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)' : 'rgba(245, 158, 11, 0.15)',
                          borderRadius: 6,
                          transform: selectedBar === i ? 'scaleX(1.2)' : 'none',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                        }} />
                        <span style={{ fontSize: 9, fontWeight: 700, color: selectedBar === i ? '#F59E0B' : '#64748B' }}>{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Caption */}
                <div style={{ borderTop: '1px solid #F1F5F9', marginTop: 18, paddingTop: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#F59E0B', fontSize: 13 }}>⭐</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>More hours. More learning. More impact.</span>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Card 3: Parent Satisfaction (Offset: +20px) */}
          <FadeUp delay={0.6} y={20} style={{ height: '100%' }}>
            <div style={{
              transform: isMobile ? 'none' : 'translateY(20px)',
              transition: 'transform 0.4s ease',
              height: '100%'
            }}>
              <div className="premium-dashboard-card card-green-accent">
                {/* Badge */}
                <div className="premium-badge" style={{ background: 'rgba(16, 185, 129, 0.08)', color: '#10B981' }}>
                  ❤️ Parent Satisfaction
                </div>

                {/* Typography */}
                <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: 28, fontWeight: 700, color: '#1E293B', marginBottom: 10, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                  Satisfied Parents On-Board
                </h3>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, marginBottom: 24 }}>
                  Trusted by thousands of families who see real progress.
                </p>

                {/* Rating & Doughnut row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{ 
                    flex: 1.2, 
                    background: 'rgba(16, 185, 129, 0.03)', 
                    border: '1px solid rgba(16, 185, 129, 0.08)',
                    borderRadius: 18, 
                    padding: '16px 20px',
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: 26, fontFamily: 'var(--font-stat)', fontWeight: 800, color: '#1E293B', display: 'block' }}>4.9<span style={{ fontSize: 16, color: '#64748B', fontWeight: 500 }}>/5</span></span>
                    <span style={{ color: '#F59E0B', fontSize: 13, display: 'block', margin: '4px 0' }}>⭐⭐⭐⭐⭐</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#64748B' }}>Parent Satisfaction</span>
                  </div>

                  <div style={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{ position: 'relative', width: 64, height: 64 }}>
                      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="10" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#10B981" strokeWidth="10" strokeDasharray="263.8" strokeDashoffset="5.3" strokeLinecap="round" />
                      </svg>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, fontFamily: 'var(--font-stat)', color: '#1E293B' }}>
                        98%
                      </div>
                    </div>
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#64748B', marginTop: 6, textAlign: 'center' }}>Would recommend<br/>TheMentR</span>
                  </div>
                </div>

                {/* 3 mini stats boxes */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
                  {[
                    { val: '2,500+', lbl: 'Parents On-board', icon: '👥' },
                    { val: '95%', lbl: 'Happy Families', icon: '🛡️' },
                    { val: '90%', lbl: 'See Improved Performance', icon: '📈' }
                  ].map((mini, idx) => (
                    <div 
                      key={idx} 
                      onMouseEnter={() => setActiveTestimonial(idx)}
                      onClick={() => setActiveTestimonial(idx)}
                      style={{ 
                        background: activeTestimonial === idx ? 'rgba(16, 185, 129, 0.04)' : '#F8FAFC', 
                        border: activeTestimonial === idx ? '1.5px solid #10B981' : '1px solid #E2E8F0', 
                        borderRadius: 12, 
                        padding: '10px 6px', 
                        textAlign: 'center',
                        cursor: 'pointer',
                        transform: activeTestimonial === idx ? 'translateY(-2px)' : 'none',
                        boxShadow: activeTestimonial === idx ? '0 4px 10px rgba(16,185,129,0.1)' : 'none',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      <span style={{ fontSize: 12, display: 'block', marginBottom: 2 }}>{mini.icon}</span>
                      <span style={{ fontSize: 11, fontFamily: 'var(--font-stat)', fontWeight: 800, color: '#1E293B', display: 'block' }}>{mini.val}</span>
                      <span style={{ fontSize: 8, fontWeight: 600, color: '#64748B', display: 'block', marginTop: 2, lineHeight: 1.1 }}>{mini.lbl}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Testimonial (Static) */}
                <div style={{ 
                  borderTop: '1px solid #F1F5F9', 
                  marginTop: 'auto', 
                  paddingTop: 14, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 4,
                  minHeight: 52
                }}>
                  <p style={{ fontSize: 12, fontStyle: 'italic', color: '#64748B', lineHeight: 1.4, margin: 0 }}>
                    "TheMentR gave our child confidence, direction and measurable progress."
                  </p>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#10B981', textAlign: 'right' }}>
                    — Parent
                  </span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Aligned bottom status indicators */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 24,
          width: '100%',
          marginTop: 20,
          borderTop: '1px solid #E2E8F0',
          paddingTop: 36,
          textAlign: 'left'
        }}>
          {/* Status 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(99, 102, 241, 0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: '#6366F1', flexShrink: 0
            }}>
              👥
            </div>
            <div>
              <h5 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1E293B' }}>Growing Together</h5>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748B' }}>A stronger community every day.</p>
            </div>
          </div>

          {/* Status 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(245, 158, 11, 0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: '#F59E0B', flexShrink: 0
            }}>
              🕒
            </div>
            <div>
              <h5 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1E293B' }}>Creating Impact</h5>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748B' }}>More teaching. More transformation.</p>
            </div>
          </div>

          {/* Status 3 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(16, 185, 129, 0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: '#10B981', flexShrink: 0
            }}>
              💚
            </div>
            <div>
              <h5 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1E293B' }}>Building Trust</h5>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748B' }}>Happy parents. Confident learners.</p>
            </div>
          </div>
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
        
        /* Premium Dashboard Card Styles */
        .premium-dashboard-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 32px;
          padding: 36px 32px;
          box-shadow: 0 4px 20px rgba(10, 22, 40, 0.02), inset 0 1px 2px rgba(255, 255, 255, 0.9);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          cursor: default;
          position: relative;
          overflow: hidden;
          height: 100%;
        }
        .card-purple-accent:hover {
          transform: translateY(-8px) scale(1.02) !important;
          border-color: rgba(99, 102, 241, 0.3) !important;
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.08), 0 4px 12px rgba(99, 102, 241, 0.03) !important;
        }
        .card-orange-accent:hover {
          transform: translateY(-8px) scale(1.02) !important;
          border-color: rgba(245, 158, 11, 0.3) !important;
          box-shadow: 0 20px 40px rgba(245, 158, 11, 0.08), 0 4px 12px rgba(245, 158, 11, 0.03) !important;
        }
        .card-green-accent:hover {
          transform: translateY(-8px) scale(1.02) !important;
          border-color: rgba(16, 185, 129, 0.3) !important;
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.08), 0 4px 12px rgba(16, 185, 129, 0.03) !important;
        }
        
        .premium-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 20px;
          width: fit-content;
        }

        @media (max-width: 1024px) {
          .hero-section {
            padding: 110px 0 80px !important;
          }
          .hero-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            width: 90% !important;
            max-width: 380px !important;
            margin: 0 auto !important;
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
