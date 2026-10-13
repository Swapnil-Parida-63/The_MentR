import { useState, useEffect } from 'react';
import { UserCheck, Award, Compass, MessageSquare, HelpCircle, ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * EmptyState / Hero & Discovery Component
 * Supports both Desktop Neomorphic Hero with charming educational doodles and Mobile Multi-Step App Flow.
 */
export default function EmptyState({ onSelectPrompt, onClose, mobileStep = 'welcome', setMobileStep }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2x2 Grid Categories for mobile
  const mobileCategories = [
    {
      id: 'doubts',
      title: 'Doubt Solving',
      desc: 'Instant step-by-step help for Maths, Science & all subjects',
      color: '#7C3AED',
      badgeBg: 'rgba(124, 58, 237, 0.12)',
      dotColor: '#C084FC',
      icon: HelpCircle,
      prompt: 'Help me solve an academic doubt step-by-step'
    },
    {
      id: 'teachers',
      title: 'Find a Teacher',
      desc: '1-on-1 verified home and online teachers for CBSE & ICSE',
      color: '#2563EB',
      badgeBg: 'rgba(37, 99, 235, 0.12)',
      dotColor: '#93C5FD',
      icon: UserCheck,
      prompt: 'Help me find a verified 1-on-1 teacher for my child'
    },
    {
      id: 'avsar',
      title: 'AVSAR Intelligence',
      desc: 'Diagnostic assessment and Olympiad preparation',
      color: '#0D9488',
      badgeBg: 'rgba(13, 148, 136, 0.12)',
      dotColor: '#99F6E4',
      icon: Compass,
      prompt: 'How does AVSAR diagnostic assessment and Olympiad work?'
    },
    {
      id: 'mentorship',
      title: 'Need to talk',
      desc: 'Personalized study advice, exam tips & mentor guidance',
      color: '#9333EA',
      badgeBg: 'rgba(147, 51, 234, 0.12)',
      dotColor: '#E9D5FF',
      icon: MessageSquare,
      prompt: 'I need personalized study advice and mentor guidance'
    }
  ];

  // Desktop prompt cards
  const desktopPromptCards = [
    {
      icon: UserCheck,
      color: '#4F7CFF',
      bg: 'rgba(79, 124, 255, 0.08)',
      title: 'Find Verified Teachers',
      desc: 'Match with 1-on-1 home or online teachers for CBSE, ICSE & State Boards',
      prompt: 'Help me find a verified teacher for my child'
    },
    {
      icon: Award,
      color: '#8B5CF6',
      bg: 'rgba(139, 92, 246, 0.08)',
      title: 'TheMentR Olympiad',
      desc: 'Explore upcoming contests, syllabus guidelines & sample papers',
      prompt: 'Tell me about TheMentR Olympiad and how to register'
    },
    {
      icon: Compass,
      color: '#10B981',
      bg: 'rgba(16, 185, 129, 0.08)',
      title: 'AVSAR Intelligence',
      desc: 'Understand student academic strengths and diagnostic reports',
      prompt: 'How does AVSAR diagnostic assessment work?'
    }
  ];

  // ----------------------------------------------------
  // MOBILE VIEW 1: WELCOME SCREEN
  // ----------------------------------------------------
  if (isMobile && mobileStep === 'welcome') {
    return (
      <div
        className="mobile-welcome-screen"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          minHeight: '100%',
          padding: '20px 24px 32px',
          boxSizing: 'border-box',
          textAlign: 'center',
          animation: 'mobileFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both'
        }}
      >
        {/* Top Back/Close Button Header */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close Assistant"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.92)',
              border: '1px solid rgba(255, 255, 255, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#334155',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={20} strokeWidth={2.2} />
          </button>
        </div>

        {/* Center Character Area */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto 0 16px' }}>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 18
            }}
          >
            {/* Glowing ambient aura */}
            <div
              style={{
                position: 'absolute',
                inset: -24,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)',
                filter: 'blur(36px)',
                animation: 'auraPulse 3.5s ease-in-out infinite alternate',
                zIndex: 0
              }}
            />

            <img
              src={`${import.meta.env.BASE_URL}Full Sized mascot.webp`}
              alt="Mantee Mascot"
              style={{
                position: 'relative',
                zIndex: 1,
                height: 240,
                maxHeight: '34vh',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 20px 40px rgba(99, 102, 241, 0.28))'
              }}
            />
          </div>

          {/* 3 Mini circular badges below mascot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.85)',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.12)',
                border: '1.5px solid rgba(255, 255, 255, 0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}Icon sized mascot.webp`}
                alt="Badge 1"
                style={{ width: '80%', height: '80%', objectFit: 'contain' }}
              />
            </div>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#FFFFFF',
                boxShadow: '0 6px 18px rgba(99, 102, 241, 0.22)',
                border: '2px solid rgba(124, 92, 255, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transform: 'scale(1.08)'
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}Icon sized mascot.webp`}
                alt="Badge 2"
                style={{ width: '82%', height: '82%', objectFit: 'contain' }}
              />
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.85)',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.12)',
                border: '1.5px solid rgba(255, 255, 255, 0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}Icon sized mascot.webp`}
                alt="Badge 3"
                style={{ width: '80%', height: '80%', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Heading & Subtitle */}
          <h1
            style={{
              fontFamily: 'var(--font-hero)',
              fontSize: 27,
              fontWeight: 850,
              color: '#0F172A',
              margin: '0 0 10px',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
          >
            Meet your AI Assistant
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              color: '#64748B',
              lineHeight: 1.5,
              margin: '0 auto',
              maxWidth: 290
            }}
          >
            Smart bot guides you, personalizing lessons and tracking progress
          </p>
        </div>

        {/* Bottom CTA Pill Dock */}
        <div style={{ width: '100%', maxWidth: 340, paddingBottom: 6 }}>
          <button
            onClick={() => setMobileStep && setMobileStep('discovery')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 10px 10px 24px',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(255, 255, 255, 0.95)',
              borderRadius: 99,
              boxShadow: '0 12px 32px rgba(99, 102, 241, 0.16), 0 2px 8px rgba(15, 23, 42, 0.04)',
              cursor: 'pointer',
              outline: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#1E293B',
                letterSpacing: '-0.01em'
              }}
            >
              Get Started
            </span>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(139, 92, 246, 0.45)',
                flexShrink: 0
              }}
            >
              <ArrowRight size={20} strokeWidth={2.5} />
            </div>
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // MOBILE VIEW 2: INTERACTIVE DISCOVERY SCREEN
  // ----------------------------------------------------
  if (isMobile && mobileStep === 'discovery') {
    return (
      <div
        className="mobile-discovery-screen"
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 20px 20px',
          height: '100%',
          boxSizing: 'border-box',
          animation: 'mobileFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both'
        }}
      >
        {/* Greeting Headline Section */}
        <div style={{ marginBottom: 24, textAlign: 'left', marginTop: 4 }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              color: '#64748B',
              margin: '0 0 6px',
              fontWeight: 600
            }}
          >
            Hi, I'm Mantee.
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-hero)',
              fontSize: 32,
              fontWeight: 850,
              color: '#0F172A',
              margin: '0 0 10px',
              letterSpacing: '-0.025em',
              lineHeight: 1.15
            }}
          >
            I can help you.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: '#64748B',
              lineHeight: 1.45,
              margin: 0,
              maxWidth: 320
            }}
          >
            Take a deep breath. I'm ready. Choose what you'd like to work on:
          </p>
        </div>

        {/* 2x2 Glass Neomorphic Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 12,
            marginBottom: 'auto'
          }}
        >
          {mobileCategories.map((cat) => {
            const IconComp = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectPrompt(cat.prompt)}
                style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  border: '1.2px solid rgba(255, 255, 255, 0.95)',
                  borderRadius: 20,
                  padding: '16px 14px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 110,
                  textAlign: 'left',
                  boxShadow: '0 8px 24px rgba(163, 177, 210, 0.14), 0 2px 6px rgba(15, 23, 42, 0.02)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  outline: 'none',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Top Row: Soft Pastel Accent Orb + Icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginBottom: 12
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: cat.badgeBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: cat.color
                    }}
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: cat.dotColor
                      }}
                    />
                  </div>
                  <IconComp size={20} color={cat.color} strokeWidth={1.8} style={{ opacity: 0.6 }} />
                </div>

                {/* Bottom Row: Title */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 15,
                      fontWeight: 750,
                      color: cat.color,
                      margin: 0,
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {cat.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // DESKTOP VIEW: HERO GREETING & NEOMORPHIC PROMPTS
  // ----------------------------------------------------
  return (
    <div
      className="mentee-hero-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px 24px 16px',
        maxWidth: 780,
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        animation: 'heroFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both'
      }}
    >
      {/* ═══════════════════════════════════════════════════════ */}
      {/* PLAYFUL EDUCATIONAL BACKGROUND DOODLES                  */}
      {/* ═══════════════════════════════════════════════════════ */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'visible'
        }}
      >
        {/* 1. Paper Airplane Top-Right with curved dashed loop */}
        <g transform="translate(620, 25) scale(0.9)" style={{ opacity: 0.35 }}>
          <path
            d="M -180 80 C -120 40, -60 110, -10 30"
            stroke="#818CF8"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
          />
          {/* Paper airplane body */}
          <path
            d="M -10 30 L 25 10 L 10 42 L 5 28 Z"
            fill="rgba(99, 102, 241, 0.15)"
            stroke="#6366F1"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M 5 28 L 25 10" stroke="#6366F1" strokeWidth="1.2" />
        </g>

        {/* 2. Top-Left Sparkle Clusters & "Dream Big" Doodle */}
        <g transform="translate(90, 40)" style={{ opacity: 0.35 }}>
          {/* 4-point Sparkle */}
          <path d="M 15 0 Q 15 10 25 10 Q 15 10 15 20 Q 15 10 5 10 Q 15 10 15 0 Z" fill="#818CF8" />
          <path d="M 45 25 Q 45 30 50 30 Q 45 30 45 35 Q 45 30 40 30 Q 45 30 45 25 Z" fill="#38BDF8" />
          {/* Hand-drawn swirl */}
          <path d="M -10 35 C 5 25, 20 45, 35 30" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" fill="none" />
        </g>

        {/* 3. Upper Left "A+" Stamp Doodle */}
        <g transform="translate(130, 95) scale(0.85)" style={{ opacity: 0.3 }}>
          <circle cx="18" cy="18" r="16" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          <text x="10" y="24" fontFamily="'Space Grotesk', system-ui, sans-serif" fontSize="16" fontWeight="bold" fill="#6366F1">A+</text>
        </g>

        {/* 4. Upper Right Lightbulb Idea Doodle */}
        <g transform="translate(635, 110) scale(0.9)" style={{ opacity: 0.35 }}>
          <circle cx="15" cy="15" r="8" stroke="#F59E0B" strokeWidth="1.8" fill="rgba(245, 158, 11, 0.1)" />
          <path d="M 12 23 H 18" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
          {/* Rays */}
          <line x1="15" y1="3" x2="15" y2="0" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="24" y1="6" x2="27" y2="3" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="6" y1="6" x2="3" y2="3" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="27" y1="15" x2="30" y2="15" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* 5. Mid-Left Math Symbols: ∑ & π */}
        <g transform="translate(75, 180)" style={{ opacity: 0.3 }}>
          <text x="0" y="0" fontFamily="'Space Grotesk', system-ui, sans-serif" fontSize="20" fontWeight="bold" fill="#3B82F6">∑</text>
          <text x="25" y="30" fontFamily="'Space Grotesk', system-ui, sans-serif" fontSize="18" fontWeight="bold" fill="#8B5CF6">π</text>
        </g>

        {/* 6. Mid-Right Science Atom Orbit Doodle */}
        <g transform="translate(650, 195) scale(0.85)" style={{ opacity: 0.3 }}>
          <ellipse cx="18" cy="18" rx="18" ry="7" stroke="#10B981" strokeWidth="1.4" fill="none" transform="rotate(30 18 18)" />
          <ellipse cx="18" cy="18" rx="18" ry="7" stroke="#3B82F6" strokeWidth="1.4" fill="none" transform="rotate(-30 18 18)" />
          <circle cx="18" cy="18" r="3" fill="#10B981" />
        </g>

        {/* 7. Lower Left Little Book Doodle */}
        <g transform="translate(110, 240) scale(0.85)" style={{ opacity: 0.28 }}>
          <path d="M 0 10 Q 12 5 24 10 Q 36 5 48 10 L 48 26 Q 36 21 24 26 Q 12 21 0 26 Z" stroke="#6366F1" strokeWidth="1.6" fill="rgba(99, 102, 241, 0.08)" />
          <line x1="24" y1="10" x2="24" y2="26" stroke="#6366F1" strokeWidth="1.4" />
        </g>

        {/* 8. Sparkle Accents near cards */}
        <g transform="translate(620, 275)" style={{ opacity: 0.35 }}>
          <path d="M 10 0 Q 10 6 16 6 Q 10 6 10 12 Q 10 6 4 6 Q 10 6 10 0 Z" fill="#EC4899" />
          <circle cx="28" cy="14" r="2" fill="#F59E0B" />
        </g>
      </svg>

      {/* 3D Mascot Character (No hover jump/zoom) */}
      <div
        className="mascot-orb-wrapper"
        style={{
          position: 'relative',
          marginBottom: 16,
          cursor: 'default',
          zIndex: 1
        }}
      >
        {/* Soft Ambient Aura */}
        <div
          className="mascot-orb-aura"
          style={{
            position: 'absolute',
            inset: -40,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.38) 0%, rgba(99, 102, 241, 0.18) 50%, transparent 70%)',
            filter: 'blur(42px)',
            animation: 'auraPulse 3.5s ease-in-out infinite alternate',
            zIndex: 0
          }}
        />

        {/* Mascot Graphic */}
        <div
          className="mascot-graphic-container"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}Full Sized mascot.webp`}
            alt="Mantee AI Mascot"
            className="mascot-main-img"
            style={{
              height: 290,
              width: 'auto',
              maxHeight: 310,
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 26px 52px rgba(139, 92, 246, 0.36))'
            }}
          />
        </div>
      </div>

      {/* Greeting Typography */}
      <div style={{ marginBottom: 20, position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 700,
            color: '#6366F1',
            margin: '0 0 4px',
            letterSpacing: '-0.01em'
          }}
        >
          Hello, I am Mantee.
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-hero)',
            fontSize: 'clamp(22px, 2.8vw, 30px)',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            background: 'linear-gradient(135deg, #0F172A 0%, #334155 50%, #4338CA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}
        >
          How can I help you today?
        </h2>
      </div>

      {/* Compact Neomorphic Prompt Starter Cards */}
      <div
        className="prompt-cards-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: 10,
          width: '100%',
          marginTop: 4,
          position: 'relative',
          zIndex: 1
        }}
      >
        {desktopPromptCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <button
              key={idx}
              onClick={() => onSelectPrompt(card.prompt)}
              className="neomorphic-prompt-card"
              style={{
                background: 'rgba(255, 255, 255, 0.88)',
                border: '1.2px solid rgba(255, 255, 255, 0.95)',
                borderRadius: 15,
                padding: '10px 14px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                cursor: 'pointer',
                boxShadow: '4px 4px 14px rgba(163, 177, 210, 0.14), -4px -4px 14px rgba(255, 255, 255, 0.95)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                outline: 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 7,
                    background: card.bg,
                    color: card.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={13} />
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#0F172A',
                    margin: 0
                  }}
                >
                  {card.title}
                </h4>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 10.5,
                  color: '#64748B',
                  lineHeight: 1.35,
                  margin: 0
                }}
              >
                {card.desc}
              </p>
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes mobileFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes auraPulse {
          0% { opacity: 0.6; transform: scale(0.96); }
          100% { opacity: 0.9; transform: scale(1.04); }
        }
        .neomorphic-prompt-card:hover {
          transform: translateY(-3px);
          box-shadow: 6px 6px 20px rgba(99, 102, 241, 0.18), -6px -6px 20px #FFFFFF !important;
          border-color: rgba(99, 102, 241, 0.35) !important;
        }
        .neomorphic-prompt-card:active {
          transform: translateY(0);
          box-shadow: inset 2px 2px 6px rgba(163, 177, 210, 0.2), inset -2px -2px 6px rgba(255, 255, 255, 0.9) !important;
        }
      `}</style>
    </div>
  );
}
