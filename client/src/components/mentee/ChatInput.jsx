import { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * ChatInput Component
 * Modern neomorphic search/chat dock with smooth send button.
 */
export default function ChatInput({ onSend, disabled = false }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  // Auto-grow textarea up to max 90px
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 90)}px`;
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
      className="mentee-input-container"
      style={{
        padding: '10px 18px 18px',
        background: 'transparent',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="neomorphic-input-dock"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1.5px solid rgba(255, 255, 255, 0.98)',
          borderRadius: 99,
          padding: '8px 10px 8px 18px',
          boxShadow: '0 8px 24px rgba(163, 177, 210, 0.22), 0 2px 8px rgba(15, 23, 42, 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          transition: 'all 0.25s ease'
        }}
      >
        {/* Main Textarea / Input */}
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
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontSize: 14.5,
            fontFamily: 'var(--font-sans)',
            color: '#0F172A',
            lineHeight: 1.4,
            maxHeight: 90,
            boxSizing: 'border-box',
            padding: '4px 0',
            margin: 0
          }}
        />

        {/* Right Action Tools: Send Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <button
            onClick={handleSend}
            disabled={disabled || !text.trim()}
            aria-label="Send Message"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: disabled || !text.trim()
                ? 'linear-gradient(135deg, #A78BFA 0%, #60A5FA 100%)'
                : 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)',
              opacity: disabled ? 0.6 : 1,
              color: '#FFFFFF',
              border: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: disabled || !text.trim()
                ? '0 4px 12px rgba(124, 58, 237, 0.25)'
                : '0 4px 16px rgba(124, 58, 237, 0.45)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => {
              if (!disabled && text.trim()) {
                e.currentTarget.style.transform = 'scale(1.06)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <ArrowUp size={19} strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </div>
  );
}
