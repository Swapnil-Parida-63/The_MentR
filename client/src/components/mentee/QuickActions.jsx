/**
 * QuickActions Component
 * Renders quick prompt action chips for one-click chat interactions.
 */
export default function QuickActions({ onSelectAction, disabled = false }) {
  const actions = [
    { label: 'Find a Tutor', icon: '🔍' },
    { label: 'Book Assessment', icon: '📋' },
    { label: 'Fees & Pricing', icon: '💳' },
    { label: 'Become a Teacher', icon: '👩‍🏫' },
    { label: 'Homework Help', icon: '📚' },
    { label: 'Career Guidance', icon: '🎯' },
    { label: 'Teaching Methodology', icon: '💡' },
    { label: 'Contact Support', icon: '📞' }
  ];

  return (
    <div
      style={{
        padding: '8px 16px 12px 16px',
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        borderTop: '1px solid rgba(15, 23, 42, 0.04)'
      }}
    >
      {actions.map((act) => (
        <button
          key={act.label}
          disabled={disabled}
          onClick={() => onSelectAction(act.label)}
          className="mentee-chip"
          style={{
            flexShrink: 0,
            background: 'rgba(241, 245, 249, 0.8)',
            border: '1px solid rgba(79, 124, 255, 0.12)',
            borderRadius: 99,
            padding: '6px 14px',
            fontSize: 12,
            fontWeight: 600,
            color: '#334155',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            fontFamily: 'var(--font-sans)',
            opacity: disabled ? 0.6 : 1
          }}
        >
          <span>{act.icon}</span>
          <span>{act.label}</span>
        </button>
      ))}

      <style>{`
        .mentee-chip:hover:not(:disabled) {
          background: #FFFFFF !important;
          border-color: rgba(79, 124, 255, 0.4) !important;
          color: #4F7CFF !important;
          box-shadow: 0 4px 12px rgba(79, 124, 255, 0.1) !important;
          transform: translateY(-1px) !important;
        }
      `}</style>
    </div>
  );
}
