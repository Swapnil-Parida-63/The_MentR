import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import ChatLauncher from './ChatLauncher';
const ChatWindow = lazy(() => import('./ChatWindow'));
import { menteeAPI } from '../../services/api';

const INITIAL_GREETING = `Hello! 👋

I am Mentee.

I'm here to help parents, students, and teachers with everything related to TheMentR.

How can I help you today?`;

/**
 * MenteeChat Root Component
 * State manager connecting Mentee UI to backend `/api/mentee/chat`.
 */
export default function MenteeChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUserPrompt, setLastUserPrompt] = useState('');

  // Session ID maintained for current tab lifecycle
  const sessionIdRef = useRef(`session_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`);

  // Conversation state stored locally in component state
  const [messages, setMessages] = useState([]);

  // Lock background body scroll completely when Mentee chat is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalOverscroll = document.body.style.overscrollBehavior;
      const originalPaddingRight = document.body.style.paddingRight;
      
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.overscrollBehavior = originalOverscroll;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  const handleSendMessage = async (text) => {
    if (!text || !text.trim() || isLoading) return;

    const userMsg = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setLastUserPrompt(text.trim());
    setIsLoading(true);
    setError(null);

    try {
      // Send chat message to Mentee backend endpoint with session continuity and history
      const historyPayload = messages.slice(-10).map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await menteeAPI.chat({
        message: text.trim(),
        sessionId: sessionIdRef.current,
        history: historyPayload
      });

      const replyContent =
        res.data?.reply ||
        res.data?.data?.reply ||
        "Thank you for contacting Mentee! I'm here to help you navigate TheMentR.";

      const suggestedActions =
        res.data?.suggestedActions ||
        res.data?.data?.suggestedActions ||
        [];

      const assistantMsg = {
        id: `msg_assistant_${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        suggestedActions,
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('[Mentee AI API Error]:', err);
      const serverMsg = err.response?.data?.message;
      setError(serverMsg || "I'm having trouble connecting right now. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (actionLabel) => {
    handleSendMessage(actionLabel);
  };

  const handleResetChat = () => {
    sessionIdRef.current = `session_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    setError(null);
    setIsLoading(false);
    setLastUserPrompt('');
    setMessages([]);
  };

  const handleRetry = () => {
    if (lastUserPrompt) {
      handleSendMessage(lastUserPrompt);
    }
  };

  // Handle ESC key to close chat window
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="mentee-chat-root">
      {/* Dimmed Backdrop for focused chat view */}
      {isOpen && (
        <div
          className="mentee-chat-backdrop"
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.28)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            zIndex: 100001,
            animation: 'menteeFadeIn 0.25s ease-out',
            overscrollBehavior: 'none'
          }}
        />
      )}

      {/* Floating Launcher Button */}
      <ChatLauncher isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      {/* Main Chat Window */}
      {isOpen && (
        <Suspense fallback={null}>
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            error={error}
            onClose={() => setIsOpen(false)}
            onReset={handleResetChat}
            onSend={handleSendMessage}
            onActionClick={handleActionClick}
            onRetry={handleRetry}
          />
        </Suspense>
      )}

      <style>{`
        @keyframes menteeFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
