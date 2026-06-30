import { FadeUp } from '../../hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import BorderGlow from './BorderGlow';

export default function BlogsPreview() {
  return (
    <section id="blogs" className="section" style={{ background: 'radial-gradient(circle at 10% 25%, rgba(79, 124, 255, 0.04) 0%, transparent 60%), radial-gradient(circle at 90% 75%, rgba(116, 105, 248, 0.04) 0%, transparent 60%), #FFFFFF' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <FadeUp><div className="eyebrow">Insights</div></FadeUp>
            <FadeUp delay={0.1}><h2 style={{ fontSize: 'clamp(28px,3vw,44px)' }}>Education, examined.</h2></FadeUp>
          </div>
          <FadeUp><Link to="/blogs" className="btn btn-secondary" style={{ marginBottom: 8 }}>View All →</Link></FadeUp>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40 }} className="blogs-layout-responsive">
          <FadeUp>
            <BorderGlow
              borderRadius={32}
              backgroundColor="#FFFFFF"
            >
              <div style={{ cursor: 'default' }}>
                <div style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-purple))', padding: '60px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>📖</div>
                <div style={{ padding: 32 }}>
                  <span className="tag" style={{ marginBottom: 16 }}>Featured</span>
                  <h3 style={{ fontSize: 24, marginBottom: 12 }}>Why the teacher–student match matters more than the teacher's qualification</h3>
                  <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>We analysed 3,200 parent feedback reports. The single strongest predictor of learning outcomes wasn't the teacher's degree.</p>
                  <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>By TheMentR Research · 8 min read · June 2025</div>
                </div>
              </div>
            </BorderGlow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { tag: 'emerald', tagText: 'Olympiad', title: 'How to prepare for IMO Stage 1 in 60 days', desc: 'A structured week-by-week plan for Math Olympiad prep.', time: '5 min read' },
                { tag: 'purple', tagText: 'Parents', title: 'The assessment visit: what to expect', desc: 'Before we match any student, we listen.', time: '4 min read' },
                { tag: '', tagText: 'Teachers', title: 'Building a teaching practice: advice from top educators', desc: 'Our highest-rated teachers share how they build student trust.', time: '6 min read' },
              ].map(b => (
                <BorderGlow
                  key={b.title}
                  borderRadius={20}
                  backgroundColor="#FFFFFF"
                >
                  <div style={{ padding: '20px 24px', cursor: 'pointer' }}>
                    <span className={`tag ${b.tag}`} style={{ marginBottom: 10 }}>{b.tagText}</span>
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{b.title}</h4>
                    <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: 10 }}>{b.desc}</p>
                    <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{b.time}</div>
                  </div>
                </BorderGlow>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
      <style>{`@media(max-width:768px){.blogs-layout-responsive{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
