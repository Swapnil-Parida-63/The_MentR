import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, UserCheck, Award, Compass, MessageSquare, BookOpen, HelpCircle, ArrowLeft } from 'lucide-react';

/**
 * EmptyState / Hero & Discovery Component
 * Supports both Desktop Neomorphic Hero and Mobile Multi-Step App Flow (Welcome -> Discovery).
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

  // 2x2 Grid Categories matching Screenshot 2
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
      desc: '1-on-1 verified home and online tutors for CBSE & ICSE',
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
      desc: 'Match with 1-on-1 home or online tutors for CBSE, ICSE & State Boards',
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
  // MOBILE VIEW 1: WELCOME SCREEN (Screenshot 1)
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
          {/* Animated 3D Standing Mascot */}
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
              alt="Mentee Mascot"
              style={{
                position: 'relative',
                zIndex: 1,
                height: 240,
                maxHeight: '34vh',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 20px 40px rgba(99, 102, 241, 0.28))',
                animation: 'mascotFloat 3.5s ease-in-out infinite alternate'
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
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
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
  // MOBILE VIEW 2: INTERACTIVE DISCOVERY SCREEN (Screenshot 2)
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
            Hi, I'm Mentee.
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
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = 'scale(0.97)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
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
        animation: 'heroFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both'
      }}
    >
      {/* 3D Animated Mascot Character */}
      <div
        className="mascot-orb-wrapper"
        style={{
          position: 'relative',
          marginBottom: 16,
          cursor: 'pointer',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Pulsing Soft Aura Layers */}
        <div
          className="mascot-orb-aura"
          style={{
            position: 'absolute',
            inset: -40,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.42) 0%, rgba(99, 102, 241, 0.22) 50%, transparent 70%)',
            filter: 'blur(42px)',
            animation: 'auraPulse 3.5s ease-in-out infinite alternate',
            zIndex: 0,
            transition: 'all 0.4s ease'
          }}
        />

        {/* Full Sized Mascot Graphic */}
        <div
          className="mascot-graphic-container"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'mascotFloat 4s ease-in-out infinite alternate',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}Full Sized mascot.webp`}
            alt="Mentee AI Mascot"
            className="mascot-main-img"
            style={{
              height: 290,
              width: 'auto',
              maxHeight: 310,
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 26px 52px rgba(139, 92, 246, 0.36))',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
        </div>
      </div>

      {/* Greeting Typography */}
      <div style={{ marginBottom: 20 }}>
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
          Hello, I am Mentee.
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
          marginTop: 4
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
                background: 'rgba(255, 255, 255, 0.85)',
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
        @keyframes mascotFloat {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-8px) scale(1.02); }
        }
        @keyframes auraPulse {
          0% { opacity: 0.6; transform: scale(0.96); }
          100% { opacity: 1; transform: scale(1.08); }
        }
        .mascot-orb-wrapper:hover .mascot-main-img {
          transform: scale(1.06) translateY(-6px) rotate(1.5deg);
          filter: drop-shadow(0 34px 68px rgba(139, 92, 246, 0.45)) !important;
        }
        .mascot-orb-wrapper:hover .mascot-orb-aura {
          opacity: 1 !important;
          transform: scale(1.2) !important;
          filter: blur(50px) !important;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.55) 0%, rgba(99, 102, 241, 0.3) 50%, transparent 70%) !important;
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
