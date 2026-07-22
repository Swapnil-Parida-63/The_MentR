import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

/**
 * ChatInput Component
 * Auto-growing text area input with keyboard shortcuts and send action.
 */
export default function ChatInput({ onSend, disabled = false }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  // Auto-grow textarea up to max 110px
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 110)}px`;
    }
  }, [text]);

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        padding: '12px 16px',
        background: '#FFFFFF',
        borderTop: '1px solid rgba(15, 23, 42, 0.06)',
        display: 'flex',
        alignItems: 'flex-end',
        gap: 10,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
      }}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? 'Mentee is thinking...' : 'Ask Mentee anything...'}
        style={{
          flex: 1,
          padding: '10px 14px',
          borderRadius: 16,
          border: '1px solid rgba(15, 23, 42, 0.12)',
          background: disabled ? '#F8FAFC' : '#FFFFFF',
          fontSize: 13.5,
          fontFamily: 'var(--font-sans)',
          color: '#0F172A',
          outline: 'none',
          resize: 'none',
          maxHeight: 110,
          lineHeight: 1.45,
          boxShadow: 'inset 0 1px 2px rgba(15, 23, 42, 0.03)',
          transition: 'all 0.2s ease'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'rgba(79, 124, 255, 0.4)';
          e.target.style.boxShadow = '0 0 0 3px rgba(79, 124, 255, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(15, 23, 42, 0.12)';
          e.target.style.boxShadow = 'inset 0 1px 2px rgba(15, 23, 42, 0.03)';
        }}
      />

      <button
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        aria-label="Send Message"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: disabled || !text.trim()
            ? '#E2E8F0'
            : 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)',
          color: disabled || !text.trim() ? '#94A3B8' : '#FFFFFF',
          border: 'none',
          cursor: disabled || !text.trim() ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: disabled || !text.trim() ? 'none' : '0 4px 12px rgba(79, 124, 255, 0.3)',
          transition: 'all 0.25s ease'
        }}
      >
        <Send size={18} style={{ transform: 'translateX(1px)' }} />
      </button>
    </div>
  );
}
