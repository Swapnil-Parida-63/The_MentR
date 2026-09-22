import React, { useState } from 'react';
import { Sparkles, Megaphone, X, ChevronRight, Bell, ArrowRight, Phone } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

export default function AnnouncementTicker() {
  const [tickerDismissed, setTickerDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { openModal } = useModal();

  if (tickerDismissed) return null;

  const tickerItems = [
    "Live Updates ★ Updates coming soon stay tuned",
    "Toll Free Helpline: 1800 889 2388 (All Days)",
    "Live Updates ★ Updates coming soon stay tuned",
    "Toll Free: 1800 889 2388 (9:30 AM - 5:30 PM)",
    "Live Updates ★ Updates coming soon stay tuned",
    "Toll Free Helpline: 1800 889 2388 (All Days)",
    "Live Updates ★ Updates coming soon stay tuned",
    "Toll Free: 1800 889 2388"
  ];

  return (
    <>
      {/* Bottom Ticker Bar Styled with High-Contrast Dark Obsidian Indigo Gradient */}
      <div
        className="announcement-ticker-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 38,
          background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(129, 140, 248, 0.35)',
          boxShadow: '0 -6px 24px rgba(15, 23, 42, 0.4)',
          zIndex: 99990,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          overflow: 'hidden',
          userSelect: 'none',
          contain: 'content'
        }}
      >
        {/* Left Live Updates Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#FCA5A5',
            padding: '2px 8px',
            borderRadius: 99,
            fontSize: 10.5,
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginRight: 10,
            flexShrink: 0
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#EF4444',
              boxShadow: '0 0 6px #EF4444'
            }}
          />
          Live
        </div>

        {/* Middle Marquee Scroll Area */}
        <div
          onClick={() => setModalOpen(true)}
          style={{
            flex: 1,
            overflow: 'hidden',
            marginRight: 12,
            cursor: 'pointer',
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Click to view live updates & toll free helpline"
        >
          <div className="ticker-scroll-track">
            {tickerItems.map((text, idx) => {
              const isTollFree = text.includes('1800 889 2388');
              return (
                <span 
                  key={idx} 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    marginRight: 40, 
                    fontSize: 12.5, 
                    fontWeight: 650, 
                    color: isTollFree ? '#67E8F9' : '#F8FAFC',
                    letterSpacing: '0.01em'
                  }}
                >
                  <span style={{ color: isTollFree ? '#38BDF8' : '#FCD34D', marginRight: 6 }}>
                    {isTollFree ? '📞' : '★'}
                  </span>
                  {text.replace('Live Updates ★ ', '')}
                </span>
              );
            })}
          </div>
        </div>

        {/* Right Action Tools: Toll Free Call Pill & Arrow Button & Dismiss */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, zIndex: 2 }}>
          {/* Direct Toll Free Quick Call Link */}
          <a
            href="tel:18008892388"
            className="ticker-call-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              background: 'rgba(56, 189, 248, 0.16)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38BDF8',
              padding: '3px 10px',
              borderRadius: 99,
              fontSize: 11.5,
              fontWeight: 750,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            title="Call Toll Free: 1800 889 2388"
          >
            <span>📞 1800 889 2388</span>
          </a>

          {/* Arrow View Details Button */}
          <button
            onClick={() => setModalOpen(true)}
            aria-label="View Updates"
            title="View Live Updates"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '50%',
              width: 26,
              height: 26,
              fontSize: 11,
              fontWeight: 700,
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#4F7CFF';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#4F7CFF';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            }}
          >
            <ChevronRight size={15} />
          </button>

          {/* Dismiss Cross */}
          <button
            onClick={() => setTickerDismissed(true)}
            aria-label="Close Ticker"
            title="Close Ticker"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#F87171'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Announcements Modal Popup */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            zIndex: 100010,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 480,
              background: '#FFFFFF',
              borderRadius: 24,
              boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              position: 'relative',
              animation: 'modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '24px 28px 16px 28px',
              borderBottom: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 750, color: '#2563EB', marginBottom: 6 }}>
                  <Megaphone size={12} /> ANNOUNCEMENTS
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: 0, fontFamily: 'var(--font-sans)', letterSpacing: '-0.01em' }}>
                  Live Updates & Helpline
                </h3>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                style={{
                  background: '#F1F5F9',
                  border: 'none',
                  color: '#64748B',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)';
                  e.currentTarget.style.color = '#EF4444';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#F1F5F9';
                  e.currentTarget.style.color = '#64748B';
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '28px 28px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Icon Orb */}
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(99, 102, 241, 0.12) 100%)',
                border: '1.5px solid rgba(59, 130, 246, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2563EB',
                marginBottom: 16,
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.12)'
              }}>
                <Bell size={28} />
              </div>

              {/* Toll Free Helpline Card */}
              <div style={{
                width: '100%',
                background: 'linear-gradient(135deg, #F0F9FF 0%, #EEF2FF 100%)',
                border: '1.5px solid rgba(59, 130, 246, 0.25)',
                borderRadius: 16,
                padding: '14px 18px',
                marginBottom: 18,
                boxSizing: 'border-box'
              }}>
                <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 700, color: '#0284C7', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  📞 Toll Free Helpline (All Days)
                </p>
                <a
                  href="tel:18008892388"
                  style={{
                    fontSize: 22,
                    fontWeight: 850,
                    color: '#1E293B',
                    textDecoration: 'none',
                    letterSpacing: '-0.02em',
                    display: 'block'
                  }}
                >
                  1800 889 2388
                </a>
                <span style={{ fontSize: 11.5, color: '#64748B', fontWeight: 500 }}>
                  9:30 AM to 5:30 PM (All days) • Free of Cost
                </span>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.25)', padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 800, color: '#D97706', marginBottom: 10 }}>
                <Sparkles size={12} /> STAY TUNED
              </div>

              <h4 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', margin: '0 0 8px', fontFamily: 'var(--font-sans)' }}>
                Updates coming soon stay tuned
              </h4>

              <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.55, maxWidth: 360, margin: '0 0 20px' }}>
                We are actively preparing new features, live announcements and official platform updates for parents, students and teachers.
              </p>

              <div style={{ display: 'flex', gap: 10, width: '100%', justifyContent: 'center' }}>
                <a
                  href="tel:18008892388"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    background: '#0284C7',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 99,
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Call Toll Free
                </a>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    openModal('demo');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 99,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.28)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Book a Demo <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Marquee Animation CSS */}
      <style>{`
        .ticker-scroll-track {
          display: inline-flex;
          white-space: nowrap;
          animation: tickerMarquee 26s linear infinite;
          will-change: transform;
          transform: translateZ(0);
        }
        .ticker-scroll-track:hover {
          animation-play-state: paused;
        }
        @keyframes tickerMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
