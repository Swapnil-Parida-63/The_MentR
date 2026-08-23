import { useState } from 'react';
import { MessageSquare, X, Sparkles } from 'lucide-react';

/**
 * ChatLauncher Component
 * Floating action button for toggling the Mentee AI chat window with dismissible floating speech cloud.
 */
export default function ChatLauncher({ isOpen, onClick, unreadCount = 0 }) {
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const isMobileView = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      {/* Floating Speech Cloud Prompt */}
      {!isOpen && !bubbleDismissed && (
        <div
          onClick={onClick}
          className="mentee-cloud-bubble"
          style={{
            position: 'fixed',
            bottom: isMobileView ? 100 : 120,
            right: isMobileView ? 16 : 24,
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(79, 124, 255, 0.22)',
            borderRadius: '20px 20px 4px 20px',
            padding: isMobileView ? '10px 22px 10px 14px' : '12px 28px 12px 18px',
            boxShadow: '0 12px 32px rgba(37, 99, 235, 0.18), 0 2px 8px rgba(15, 23, 42, 0.06)',
            zIndex: 100003,
            cursor: 'pointer',
            maxWidth: isMobileView ? 180 : 220,
            animation: 'bubbleFloat 3s ease-in-out infinite alternate',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            userSelect: 'none'
          }}
        >
          {/* Close button (Cross) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setBubbleDismissed(true);
            }}
            aria-label="Dismiss message"
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: 'rgba(148, 163, 184, 0.14)',
              border: 'none',
              borderRadius: '50%',
              width: 18,
              height: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              padding: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)';
              e.currentTarget.style.color = '#EF4444';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(148, 163, 184, 0.14)';
              e.currentTarget.style.color = '#64748B';
            }}
          >
            <X size={12} />
          </button>

          <div style={{ fontSize: 13, fontWeight: 750, color: '#1E293B', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
            Hi 👋
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', lineHeight: 1.4 }}>
            I'm Mentee, how can I help you?
          </div>
          {/* Speech bubble pointer tail */}
          <div
            style={{
              position: 'absolute',
              bottom: -8,
              right: 18,
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid rgba(255, 255, 255, 0.96)'
            }}
          />
        </div>
      )}

      {/* Floating Launcher Action Button */}
      <button
        onClick={onClick}
        aria-label={isOpen ? 'Close Mentee AI Assistant' : 'Open Mentee AI Assistant'}
        className="mentee-launcher-btn"
        style={{
          position: 'fixed',
          bottom: isMobileView ? 46 : 50,
          right: isMobileView ? 16 : 24,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 30px rgba(79, 124, 255, 0.38), 0 2px 8px rgba(15, 23, 42, 0.08)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100004,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          outline: 'none',
          padding: 0
        }}
      >
        {/* Icon */}
        {isOpen ? (
          <X size={26} style={{ transition: 'transform 0.2s ease' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={`${import.meta.env.BASE_URL}ChatGPT_Logo.webp`} 
              alt="Mentee AI" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
              onError={(e) => {
                e.target.style.display = 'none';
                const fallback = document.getElementById('launcher-fallback');
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div 
              id="launcher-fallback"
              style={{ 
                display: 'none', 
                width: '100%', 
                height: '100%', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'absolute',
                inset: 0
              }}
            >
              <MessageSquare size={26} />
              <Sparkles
                size={14}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  color: '#FFD700',
                  filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.8))'
                }}
              />
            </div>
          </div>
        )}

        {/* Unread / New Feature Pulse Badge */}
        {!isOpen && unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#10B981',
              color: '#FFFFFF',
              fontSize: 11,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #FFFFFF',
              boxShadow: '0 2px 6px rgba(16, 185, 129, 0.4)'
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      <style>{`
        @keyframes bubbleFloat {
          0% { transform: translateY(0); }
          100% { transform: translateY(-6px); }
        }
        .mentee-cloud-bubble:hover {
          transform: translateY(-4px) scale(1.02) !important;
          box-shadow: 0 16px 40px rgba(37, 99, 235, 0.22) !important;
          border-color: rgba(79, 124, 255, 0.45) !important;
        }
        .mentee-launcher-btn:hover {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 12px 36px rgba(79, 124, 255, 0.5), 0 4px 12px rgba(15, 23, 42, 0.12) !important;
        }
        .mentee-launcher-btn:active {
          transform: scale(0.96);
        }
        @media (max-width: 768px) {
          .mentee-launcher-btn {
            bottom: 46px !important;
            right: 16px !important;
            width: 52px !important;
            height: 52px !important;
          }
          .mentee-cloud-bubble {
            bottom: 108px !important;
            right: 16px !important;
            max-width: 200px !important;
            padding: 10px 24px 10px 14px !important;
          }
        }
      `}</style>
    </>
  );
}
