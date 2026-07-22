import { useState, useRef, useEffect } from 'react';
import ChatLauncher from './ChatLauncher';
import ChatWindow from './ChatWindow';
import { aiAPI } from '../../services/api';

const INITIAL_GREETING = `Hi 👋

I'm Mentee.

I'm here to help parents, students, and teachers with everything related to MentR.

How can I help you today?`;

/**
 * MenteeChat Root Component
 * State manager connecting Mentee UI to `/api/v1/ai/chat` placeholder backend service.
 */
export default function MenteeChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUserPrompt, setLastUserPrompt] = useState('');

  // Session ID maintained for current tab lifecycle
  const sessionIdRef = useRef(`session_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`);

  // Conversation state stored locally in component state
  const [messages, setMessages] = useState([
    {
      id: 'msg_welcome',
      role: 'assistant',
      content: INITIAL_GREETING,
      timestamp: new Date().toISOString()
    }
  ]);

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
      // Format conversation history for AI provider
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      // Send chat completion request to backend endpoint `/api/v1/ai/chat`
      const res = await aiAPI.chat({
        sessionId: sessionIdRef.current,
        message: text.trim(),
        history: historyPayload,
        channel: 'website'
      });

      const replyContent =
        res.data?.data?.reply ||
        res.data?.reply ||
        "Thank you for contacting Mentee! I'm here to help you navigate MentR.";

      const suggestedActions =
        res.data?.data?.suggestedActions ||
        res.data?.suggestedActions ||
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
      setError("I'm having trouble connecting right now. Please try again in a moment.");
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
    setMessages([
      {
        id: `msg_welcome_${Date.now()}`,
        role: 'assistant',
        content: INITIAL_GREETING,
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const handleRetry = () => {
    if (lastUserPrompt) {
      handleSendMessage(lastUserPrompt);
    }
  };

  return (
    <div className="mentee-chat-root">
      {/* Floating Launcher Button */}
      <ChatLauncher isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      {/* Main Chat Window */}
      {isOpen && (
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
      )}
    </div>
  );
}
