import { Sparkles } from 'lucide-react';

/**
 * TypingIndicator Component
 * Animated indicator displaying "Mentee is thinking..." when waiting for backend responses.
 */
export default function TypingIndicator() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 14,
        alignSelf: 'flex-start'
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(79, 124, 255, 0.25)'
        }}
      >
        <Sparkles size={14} />
      </div>

      {/* Bubble */}
      <div
        style={{
          padding: '10px 16px',
          borderRadius: 18,
          borderTopLeftRadius: 4,
          background: '#FFFFFF',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)',
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}
      >
        <span style={{ fontSize: 12.5, fontWeight: 600, color: '#64748B', fontFamily: 'var(--font-sans)' }}>
          Mentee is thinking
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span className="dot dot-1" />
          <span className="dot dot-2" />
          <span className="dot dot-3" />
        </div>
      </div>

      <style>{`
        .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #7469F8;
          display: inline-block;
          animation: menteeBounce 1.4s infinite ease-in-out both;
        }
        .dot-1 {
          animation-delay: -0.32s;
        }
        .dot-2 {
          animation-delay: -0.16s;
        }
        .dot-3 {
          animation-delay: 0s;
        }
        @keyframes menteeBounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.4;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
