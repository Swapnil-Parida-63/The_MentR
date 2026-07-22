import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import QuickActions from './QuickActions';
import TypingIndicator from './TypingIndicator';
import ErrorState from './ErrorState';
import ChatInput from './ChatInput';

/**
 * ChatWindow Component
 * Main modal container hosting header, message list, actions, indicator, and input area.
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
  return (
    <div
      className="mentee-chat-window"
      style={{
        position: 'fixed',
        bottom: 96,
        right: 24,
        width: 380,
        maxWidth: 'calc(100vw - 32px)',
        height: 580,
        maxHeight: 'calc(100vh - 120px)',
        background: '#FAFAFC',
        border: '1px solid rgba(79, 124, 255, 0.16)',
        borderRadius: 24,
        boxShadow: '0 20px 60px rgba(15, 23, 42, 0.2), 0 4px 16px rgba(79, 124, 255, 0.08)',
        zIndex: 99991,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'menteePopIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both'
      }}
    >
      {/* Header */}
      <ChatHeader onClose={onClose} onReset={onReset} />

      {/* Messages */}
      <MessageList messages={messages} onActionClick={onActionClick} />

      {/* Typing Indicator */}
      {isLoading && (
        <div style={{ padding: '0 16px' }}>
          <TypingIndicator />
        </div>
      )}

      {/* Error Alert */}
      {error && <ErrorState message={error} onRetry={onRetry} />}

      {/* Quick Action Chips */}
      <QuickActions onSelectAction={onActionClick} disabled={isLoading} />

      {/* Input Area */}
      <ChatInput onSend={onSend} disabled={isLoading} />

      <style>{`
        @keyframes menteePopIn {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @media (max-width: 768px) {
          .mentee-chat-window {
            bottom: 84px !important;
            right: 16px !important;
            width: calc(100vw - 32px) !important;
            height: calc(100vh - 110px) !important;
          }
        }
      `}</style>
    </div>
  );
}
