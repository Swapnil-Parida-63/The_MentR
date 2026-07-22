import { User, Sparkles, ExternalLink } from 'lucide-react';

/**
 * Helper to render lightweight markdown/formatted text cleanly.
 * Converts bold **text**, bullet lists, inline code, and markdown links into styled JSX elements.
 */
function renderFormattedContent(content) {
  if (!content) return null;

  const lines = content.split('\n');
  return lines.map((line, lineIdx) => {
    // Bullet items
    if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
      const cleanLine = line.trim().substring(2);
      return (
        <li key={lineIdx} style={{ marginLeft: 16, marginBottom: 4, listStyleType: 'disc' }}>
          {parseInlineFormat(cleanLine)}
        </li>
      );
    }

    return (
      <p key={lineIdx} style={{ margin: '0 0 6px 0', lineHeight: 1.55 }}>
        {parseInlineFormat(line)}
      </p>
    );
  });
}

function parseInlineFormat(text) {
  // Simple regex parser for bold text **word** and [link text](url)
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} style={{ fontWeight: 700, color: 'inherit' }}>{part.slice(2, -2)}</strong>;
    }
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={idx}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#4F7CFF', textDecoration: 'underline', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 2 }}
        >
          {linkMatch[1]} <ExternalLink size={11} />
        </a>
      );
    }
    return part;
  });
}

/**
 * MessageBubble Component
 * Renders individual user or assistant messages.
 */
export default function MessageBubble({ message, onActionClick }) {
  const isUser = message.role === 'user';
  const timeString = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 14,
        width: '100%'
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 8,
          maxWidth: '85%',
          flexDirection: isUser ? 'row-reverse' : 'row'
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: isUser ? '#E2E8F0' : 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)',
            color: isUser ? '#475569' : '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: 12,
            marginTop: 2,
            boxShadow: isUser ? 'none' : '0 2px 8px rgba(79, 124, 255, 0.25)'
          }}
        >
          {isUser ? <User size={15} /> : <Sparkles size={14} />}
        </div>

        {/* Bubble */}
        <div>
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 18,
              borderTopLeftRadius: !isUser ? 4 : 18,
              borderTopRightRadius: isUser ? 4 : 18,
              fontSize: 13.5,
              fontFamily: 'var(--font-sans)',
              background: isUser ? 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)' : '#FFFFFF',
              color: isUser ? '#FFFFFF' : '#0F172A',
              border: isUser ? 'none' : '1px solid rgba(15, 23, 42, 0.08)',
              boxShadow: isUser
                ? '0 4px 14px rgba(79, 124, 255, 0.22)'
                : '0 2px 10px rgba(15, 23, 42, 0.03)',
              textAlign: 'left',
              wordBreak: 'break-word'
            }}
          >
            {renderFormattedContent(message.content)}
          </div>

          {/* Suggested Actions attached to message */}
          {message.suggestedActions && message.suggestedActions.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              {message.suggestedActions.map((act) => (
                <button
                  key={act}
                  onClick={() => onActionClick && onActionClick(act)}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(79, 124, 255, 0.25)',
                    color: '#4F7CFF',
                    borderRadius: 99,
                    padding: '4px 12px',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(79, 124, 255, 0.06)'
                  }}
                >
                  {act}
                </button>
              ))}
            </div>
          )}

          {/* Timestamp */}
          <span
            style={{
              fontSize: 10,
              color: '#94A3B8',
              marginTop: 4,
              display: 'block',
              textAlign: isUser ? 'right' : 'left',
              paddingLeft: isUser ? 0 : 4,
              paddingRight: isUser ? 4 : 0
            }}
          >
            {timeString}
          </span>
        </div>
      </div>
    </div>
  );
}
