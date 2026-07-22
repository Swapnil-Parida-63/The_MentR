import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * ErrorState Component
 * Displays user-friendly error notifications when network connectivity fails.
 */
export default function ErrorState({ message, onRetry }) {
  return (
    <div
      style={{
        margin: '8px 16px 12px 16px',
        padding: '12px 16px',
        borderRadius: 14,
        background: '#FEF2F2',
        border: '1px solid #FCA5A5',
        color: '#991B1B',
        fontSize: 12.5,
        fontFamily: 'var(--font-sans)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        boxShadow: '0 2px 8px rgba(239, 68, 68, 0.08)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left' }}>
        <AlertCircle size={16} style={{ color: '#EF4444', flexShrink: 0 }} />
        <span>{message || "I'm having trouble connecting right now. Please try again in a moment."}</span>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: '#FFFFFF',
            border: '1px solid #FCA5A5',
            color: '#991B1B',
            borderRadius: 8,
            padding: '4px 8px',
            fontSize: 11,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            flexShrink: 0
          }}
        >
          <RefreshCw size={11} /> Retry
        </button>
      )}
    </div>
  );
}
