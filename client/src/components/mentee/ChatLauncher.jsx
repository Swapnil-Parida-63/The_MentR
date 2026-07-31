import { MessageSquare, X, Sparkles } from 'lucide-react';

/**
 * ChatLauncher Component
 * Floating action button for toggling the Mentee AI chat window.
 */
export default function ChatLauncher({ isOpen, onClick, unreadCount = 0 }) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Close Mentee AI Assistant' : 'Open Mentee AI Assistant'}
      className="mentee-launcher-btn"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
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
        zIndex: 99990,
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
            src={`${import.meta.env.BASE_URL}ChatGPT_Logo.png`} 
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

      <style>{`
        .mentee-launcher-btn:hover {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 12px 36px rgba(79, 124, 255, 0.5), 0 4px 12px rgba(15, 23, 42, 0.12) !important;
        }
        .mentee-launcher-btn:active {
          transform: scale(0.96);
        }
        @media (max-width: 768px) {
          .mentee-launcher-btn {
            bottom: 20px !important;
            right: 18px !important;
            width: 54px !important;
            height: 54px !important;
          }
        }
      `}</style>
    </button>
  );
}
