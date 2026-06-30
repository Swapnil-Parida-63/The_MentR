import { FadeUp } from '../hooks/useScrollReveal';

export default function BlogsPage() {
  return (
    <div className="section subpage-wrapper" style={{ background: 'var(--color-white)', minHeight: '100vh' }}>
      <div className="container">
        <FadeUp><div className="eyebrow">Blog</div></FadeUp>
        <FadeUp delay={0.1}><h1 style={{ fontSize: 'clamp(32px,4vw,52px)', marginBottom: 48 }}>Education, examined.</h1></FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="blogs-page-grid">
          {[
            { tag: 'Featured', title: 'Why the teacher–student match matters more than qualifications', desc: 'We analysed 3,200 feedback reports...', time: '8 min', bg: 'linear-gradient(135deg,#1E4FD8,#7C3AED)', emoji: '📖' },
            { tag: 'Olympiad', title: 'How to prepare for IMO Stage 1 in 60 days', desc: 'A structured week-by-week plan.', time: '5 min', bg: 'linear-gradient(135deg,#059669,#10B981)', emoji: '🏆' },
            { tag: 'Parents', title: 'The assessment visit: what to expect', desc: 'Before we match any student, we listen.', time: '4 min', bg: 'linear-gradient(135deg,#7C3AED,#A78BFA)', emoji: '📋' },
            { tag: 'Teachers', title: 'Building a teaching practice: top educator advice', desc: 'Our highest-rated teachers share insights.', time: '6 min', bg: 'linear-gradient(135deg,#0A1628,#1a2d4a)', emoji: '👩‍🏫' },
            { tag: 'AVSAR', title: 'Data-driven insights into student performance', desc: 'How analytics are changing education.', time: '7 min', bg: 'linear-gradient(135deg,#1E4FD8,#3B6BEF)', emoji: '📊' },
            { tag: 'Community', title: 'Building trust in the education ecosystem', desc: 'Why verification matters more than ever.', time: '5 min', bg: 'linear-gradient(135deg,#059669,#34D399)', emoji: '🤝' },
          ].map((b, i) => (
            <FadeUp key={b.title} delay={i * 0.05}>
              <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,22,40,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ background: b.bg, padding: '48px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>{b.emoji}</div>
                <div style={{ padding: 24 }}>
                  <span className="tag" style={{ marginBottom: 10 }}>{b.tag}</span>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{b.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: 12 }}>{b.desc}</p>
                  <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{b.time} read</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.blogs-page-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
