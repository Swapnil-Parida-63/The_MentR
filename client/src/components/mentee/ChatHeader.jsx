import { X, Sparkles, RefreshCw } from 'lucide-react';

/**
 * ChatHeader Component
 * Top bar of the Mentee AI Chat Window.
 */
export default function ChatHeader({ onClose, onReset }) {
  return (
    <div
      style={{
        padding: '16px 20px',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)'
      }}
    >
      {/* Left: Avatar + Title Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Mentee Avatar */}
        <div
          style={{
            position: 'relative',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(79, 124, 255, 0.35)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <Sparkles size={20} />
          {/* Online Dot */}
          <span
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#10B981',
              border: '2px solid #0F172A',
              boxShadow: '0 0 6px rgba(16, 185, 129, 0.8)'
            }}
          />
        </div>

        {/* Text */}
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 15,
                fontWeight: 700,
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '-0.01em'
              }}
            >
              Mentee
            </h4>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#4F7CFF',
                background: 'rgba(79, 124, 255, 0.15)',
                padding: '2px 6px',
                borderRadius: 99,
                letterSpacing: '0.04em'
              }}
            >
              AI ADVISOR
            </span>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              color: '#94A3B8',
              margin: '2px 0 0 0'
            }}
          >
            Your Personal Learning Guide
          </p>
        </div>
      </div>

      {/* Right Actions: Reset & Close */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {onReset && (
          <button
            onClick={onReset}
            title="Reset Chat"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94A3B8',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94A3B8';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
            }}
          >
            <RefreshCw size={15} />
          </button>
        )}

        <button
          onClick={onClose}
          aria-label="Close Chat"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: 'none',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94A3B8',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#94A3B8';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
          }}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
