import { Sparkles, Compass } from 'lucide-react';

/**
 * EmptyState Component
 * Displays welcome hero card when initiating a conversation session.
 */
export default function EmptyState() {
  return (
    <div
      style={{
        padding: '24px 16px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#64748B'
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(79, 124, 255, 0.12) 0%, rgba(116, 105, 248, 0.12) 100%)',
          border: '1px solid rgba(79, 124, 255, 0.2)',
          color: '#4F7CFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12
        }}
      >
        <Sparkles size={24} />
      </div>

      <h5
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 15,
          fontWeight: 700,
          color: '#0F172A',
          margin: '0 0 6px 0'
        }}
      >
        Mentee AI Guidance
      </h5>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 12.5,
          color: '#64748B',
          lineHeight: 1.5,
          maxWidth: 260,
          margin: 0
        }}
      >
        Ask anything about teachers, assessment visits, tuitions, or Olympiad prep.
      </p>
    </div>
  );
}
