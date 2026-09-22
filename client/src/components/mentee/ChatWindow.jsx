import { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import EmptyState from './EmptyState';
import TypingIndicator from './TypingIndicator';
import ErrorState from './ErrorState';
import ChatInput from './ChatInput';

/**
 * ChatWindow Component
 * Seamlessly delivers Full-Screen Mobile Takeover (matching reference UI) and
 * Sleek Neomorphic Pop-up Card on Desktop.
 */
export default function ChatWindow({
  messages,
  isLoading,
  error,
  onClose,
  onReset,
  onSend,
  onActionClick,
  onRetry
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileStep, setMobileStep] = useState('welcome'); // 'welcome' | 'discovery'

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if conversation has any user message
  const hasUserMessages = messages.some((m) => m.role === 'user');

  // Handle back button on mobile
  const handleBack = () => {
    if (isMobile && mobileStep === 'discovery' && !hasUserMessages) {
      setMobileStep('welcome');
    } else {
      onClose();
    }
  };

  const handleSendWrapper = (text) => {
    if (isMobile && mobileStep === 'welcome') {
      setMobileStep('discovery');
    }
    onSend(text);
  };

  // Determine if top header should be shown (hidden on mobile welcome screen per reference)
  const showHeader = !isMobile || mobileStep !== 'welcome' || hasUserMessages;

  // Determine if bottom input dock should be shown (hidden on mobile welcome screen)
  const showInput = !isMobile || mobileStep !== 'welcome' || hasUserMessages;

  return (
    <div
      className="mentee-neomorphic-window"
      style={{
        position: 'fixed',
        top: isMobile ? 0 : 24,
        bottom: isMobile ? 0 : 24,
        right: isMobile ? 0 : 24,
        left: isMobile ? 0 : 'auto',
        width: isMobile ? '100vw' : 'min(920px, 68vw)',
        height: isMobile ? '100dvh' : 'calc(100vh - 48px)',
        maxHeight: isMobile ? 'none' : 'calc(100vh - 48px)',
        background: isMobile
          ? 'linear-gradient(180deg, #E0F2FE 0%, #E8F0FE 30%, #F3E8FF 70%, #FAF5FF 100%)'
          : 'linear-gradient(165deg, rgba(255, 255, 255, 0.95) 0%, rgba(246, 248, 255, 0.92) 40%, rgba(238, 242, 255, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isMobile ? 'none' : '1.5px solid rgba(255, 255, 255, 0.9)',
        borderRadius: isMobile ? 0 : 28,
        boxShadow: isMobile
          ? 'none'
          : '0 24px 70px rgba(15, 23, 42, 0.22), 0 0 0 1px rgba(99, 102, 241, 0.12), -8px -8px 30px rgba(255, 255, 255, 0.95)',
        zIndex: 100005,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: isMobile
          ? 'menteeMobileSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both'
          : 'menteeSlideInCard 0.35s cubic-bezier(0.16, 1, 0.3, 1) both'
      }}
    >
      {/* Top Bar Header */}
      {showHeader && (
        <ChatHeader
          onClose={onClose}
          onReset={onReset}
          isChatActive={hasUserMessages}
          onBackToWelcome={handleBack}
        />
      )}

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          position: 'relative',
          padding: isMobile ? '0' : '8px 0',
          scrollbarWidth: 'thin'
        }}
      >
        {!hasUserMessages ? (
          <div
            key="hero-view"
            className="mentee-view-hero"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              animation: 'menteeHeroEnter 0.45s cubic-bezier(0.16, 1, 0.3, 1) both'
            }}
          >
            <EmptyState
              onSelectPrompt={handleSendWrapper}
              onClose={onClose}
              mobileStep={mobileStep}
              setMobileStep={setMobileStep}
            />
          </div>
        ) : (
          <div
            key="chat-view"
            className="mentee-view-chat"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: isMobile ? '12px 14px 6px' : '0 12px',
              animation: 'menteeChatEnter 0.45s cubic-bezier(0.16, 1, 0.3, 1) both'
            }}
          >
            <MessageList messages={messages} onActionClick={onActionClick} />

            {/* Typing Indicator */}
            {isLoading && (
              <div style={{ padding: '0 24px 8px' }}>
                <TypingIndicator />
              </div>
            )}

            {/* Error Alert */}
            {error && <ErrorState message={error} onRetry={onRetry} />}
          </div>
        )}
      </div>

      {/* Neomorphic Search & Input Dock */}
      {showInput && (
        <ChatInput onSend={handleSendWrapper} disabled={isLoading} />
      )}

      <style>{`
        @keyframes menteeSlideInCard {
          from {
            opacity: 0;
            transform: translateX(40px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes menteeMobileSlideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes menteeHeroEnter {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes menteeChatEnter {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 1024px) and (min-width: 769px) {
          .mentee-neomorphic-window {
            width: min(720px, 85vw) !important;
          }
        }
      `}</style>
    </div>
  );
}
