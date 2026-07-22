import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

/**
 * MessageList Component
 * Scrollable list containing conversation message bubbles and auto-scrolling logic.
 */
export default function MessageList({ messages = [], onActionClick }) {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        padding: '16px 16px 8px 16px',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {messages.map((msg, index) => (
        <MessageBubble
          key={msg.id || index}
          message={msg}
          onActionClick={onActionClick}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
