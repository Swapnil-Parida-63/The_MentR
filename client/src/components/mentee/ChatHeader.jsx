import { X, Sparkles, RefreshCw, ArrowLeft } from 'lucide-react';

/**
 * ChatHeader Component
 * Clean, modern neomorphic top bar for Mentee AI Window.
 */
export default function ChatHeader({ onClose, onReset, isChatActive = false, onBackToWelcome = null }) {
  return (
    <div
      style={{
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(99, 102, 241, 0.08)',
        background: 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
        zIndex: 10
      }}
    >
      {/* Left: Back Button + Model / Branding Pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Back Button (Prominent for Mobile & Desktop) */}
        <button
          onClick={onBackToWelcome || onClose}
          aria-label="Back / Close"
          title="Back"
          className="mentee-header-back-btn"
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '1.2px solid rgba(226, 232, 240, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#334155',
            cursor: 'pointer',
            boxShadow: '2px 2px 8px rgba(163, 177, 210, 0.18), -2px -2px 8px rgba(255, 255, 255, 0.9)',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#4338CA';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#334155';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.9)';
          }}
        >
          <ArrowLeft size={18} strokeWidth={2.2} />
        </button>

        {/* Model Tag Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '5px 14px 5px 6px',
            borderRadius: 99,
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.16) 100%)',
            border: '1.5px solid rgba(99, 102, 241, 0.22)',
            boxShadow: '2px 2px 6px rgba(163, 177, 210, 0.16), -2px -2px 6px rgba(255, 255, 255, 0.9)',
            cursor: 'default'
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(99, 102, 241, 0.2)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              flexShrink: 0
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}Icon sized mascot.webp`}
              alt="Mentee Icon"
              style={{ width: '88%', height: '88%', objectFit: 'contain', display: 'block' }}
            />
          </div>
          <span style={{ fontSize: 14.5, fontWeight: 800, color: '#3730A3', letterSpacing: '-0.015em' }}>
            Mentee AI
          </span>
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 800,
              color: '#059669',
              background: 'rgba(16, 185, 129, 0.15)',
              padding: '2px 6px',
              borderRadius: 6,
              marginLeft: 1
            }}
          >
            v2.0
          </span>
        </div>
      </div>

      {/* Right Actions: Reset & Close / Back */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {onReset && isChatActive && (
          <button
            onClick={onReset}
            title="New Chat / Reset"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 14px',
              borderRadius: 99,
              background: '#FFFFFF',
              border: '1.2px solid rgba(226, 232, 240, 0.9)',
              color: '#64748B',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '3px 3px 8px rgba(163, 177, 210, 0.18), -3px -3px 8px rgba(255, 255, 255, 0.9)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#4338CA';
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#64748B';
              e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.9)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <RefreshCw size={12} />
            <span>New Chat</span>
          </button>
        )}

        {/* Close Button (Cross / Back) */}
        <button
          onClick={onClose}
          aria-label="Close Assistant"
          title="Close (Esc)"
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '1.2px solid rgba(226, 232, 240, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
            cursor: 'pointer',
            boxShadow: '3px 3px 8px rgba(163, 177, 210, 0.18), -3px -3px 8px rgba(255, 255, 255, 0.9)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#EF4444';
            e.currentTarget.style.background = '#FEF2F2';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
            e.currentTarget.style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#64748B';
            e.currentTarget.style.background = '#FFFFFF';
            e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.9)';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <X size={18} />
        </button>
      </div>

      <style>{`
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
