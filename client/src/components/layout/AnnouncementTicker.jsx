import React, { useState } from 'react';
import { Sparkles, Megaphone, X, ChevronRight, Bell, ArrowRight } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

export default function AnnouncementTicker() {
  const [tickerDismissed, setTickerDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { openModal } = useModal();

  if (tickerDismissed) return null;

  const tickerItems = [
    "Live Updates ★ Updates coming soon stay tuned",
    "Live Updates ★ Updates coming soon stay tuned",
    "Live Updates ★ Updates coming soon stay tuned",
    "Live Updates ★ Updates coming soon stay tuned",
    "Live Updates ★ Updates coming soon stay tuned",
    "Live Updates ★ Updates coming soon stay tuned"
  ];

  return (
    <>
      {/* Bottom Ticker Bar Styled to Match TheMentR Light Blue Theme */}
      <div
        className="announcement-ticker-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 38,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(239, 246, 255, 0.88) 50%, rgba(224, 231, 255, 0.82) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(191, 219, 254, 0.85)',
          boxShadow: '0 -4px 20px rgba(37, 99, 235, 0.1)',
          zIndex: 99990,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          overflow: 'hidden',
          userSelect: 'none',
          contain: 'content'
        }}
      >
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
          title="Click to view live updates & announcements"
        >
          <div className="ticker-scroll-track">
            {tickerItems.map((text, idx) => (
              <span 
                key={idx} 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  marginRight: 40, 
                  fontSize: 13, 
                  fontWeight: 650, 
                  color: '#1E293B',
                  letterSpacing: '0.01em'
                }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Right Arrow Button & Dismiss Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, zIndex: 2 }}>
          {/* Arrow Only Button */}
          <button
            onClick={() => setModalOpen(true)}
            aria-label="View Updates"
            title="View Live Updates"
            style={{
              background: '#FFFFFF',
              border: '1.2px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '50%',
              width: 26,
              height: 26,
              fontSize: 11,
              fontWeight: 700,
              color: '#2563EB',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              boxShadow: '0 2px 6px rgba(37, 99, 235, 0.12)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#2563EB';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#2563EB';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.color = '#2563EB';
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
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
              color: '#64748B',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
            onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
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
                  Live Updates & Policy
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
            <div style={{ padding: '32px 28px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Icon Orb */}
              <div style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(99, 102, 241, 0.12) 100%)',
                border: '1.5px solid rgba(59, 130, 246, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2563EB',
                marginBottom: 20,
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.12)'
              }}>
                <Bell size={30} />
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.25)', padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 800, color: '#D97706', marginBottom: 12 }}>
                <Sparkles size={12} /> STAY TUNED
              </div>

              <h4 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: '0 0 10px', fontFamily: 'var(--font-sans)' }}>
                Updates coming soon stay tuned
              </h4>

              <p style={{ fontSize: 13.5, color: '#64748B', lineHeight: 1.6, maxWidth: 360, margin: '0 0 24px' }}>
                We are actively preparing new features, live announcements and official platform updates for parents, students and teachers.
              </p>

              <button
                onClick={() => {
                  setModalOpen(false);
                  openModal('demo');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '11px 24px',
                  borderRadius: 99,
                  fontSize: 13.5,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(37, 99, 235, 0.28)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Book a Demo <ArrowRight size={15} />
              </button>
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
