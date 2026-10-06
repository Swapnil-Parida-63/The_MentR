import MessageBubble from './MessageBubble';

/**
 * MessageList Component
 * Renders conversation message bubbles seamlessly within the parent scrollable container.
 */
export default function MessageList({ messages = [], onActionClick }) {
  return (
    <div
      className="mentee-messages-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: '12px 14px 4px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {messages.map((msg, index) => (
        <MessageBubble
          key={msg.id || index}
          message={msg}
          onActionClick={onActionClick}
        />
      ))}
    </div>
  );
}
