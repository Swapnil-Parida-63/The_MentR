import { FadeUp } from '../../hooks/useScrollReveal';
import BorderGlow from './BorderGlow';

const items = [
  { icon: '✅', title: 'Verified Teachers Only', desc: "Every educator on TheMentR passes a rigorous background check, subject-matter assessment, and curriculum evaluation.", num: '01', span: 2, featured: true },
  { icon: '🎯', title: 'One-to-One Learning', desc: "Fully personalized sessions — no batches, no crowds. Every class is built around your child's pace and needs.", num: '02' },
  { icon: '📋', title: 'Assessment Visits', desc: "We start with a structured home assessment to understand learning style, gaps, and goals before any matching happens.", num: '03' },
  { icon: '🤝', title: 'Personalized Matching', desc: "Our matching system considers subject expertise, board alignment, teaching style, and personality.", num: '04' },
  { icon: '💻', title: 'Online + Offline Learning', desc: "Seamlessly switch between online sessions and in-person teaching. The same quality, the same teacher.", num: '05', emerald: true },
  { icon: '📚', title: 'Board Flexibility', desc: "CBSE, ICSE, IB, State Board — our teachers are verified across all major curriculum boards in India.", num: '06' },
  { icon: '🛡️', title: 'Safe Learning Environment', desc: "Background-checked educators, monitored sessions, and a transparent platform parents can trust.", num: '07' },
];

export default function BentoSection() {
  return (
    <section id="benefits" className="section" style={{ background: 'radial-gradient(circle at 10% 20%, rgba(116, 105, 248, 0.05) 0%, transparent 60%), radial-gradient(circle at 90% 70%, rgba(79, 124, 255, 0.04) 0%, transparent 60%), #F7F5FF' }}>
      <div className="container">
        <FadeUp><div className="eyebrow">What We Offer</div></FadeUp>
        <FadeUp delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', marginBottom: 48 }}>Every advantage, built in.</h2></FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'auto auto', gap: 16 }} className="bento-grid-responsive">
          {items.map((item, i) => (
            <FadeUp key={item.num} delay={i * 0.1}>
              <BorderGlow
                borderRadius={20}
                backgroundColor="#FFFFFF"
                style={{
                  gridColumn: item.span ? 'span 2' : 'span 1',
                  height: '100%',
                }}
              >
                <div style={{
                  color: 'var(--color-text-primary)',
                  padding: 28,
                  position: 'relative',
                  height: '100%',
                  cursor: 'default',
                }}>
                  <span style={{ fontSize: 28, marginBottom: 16, display: 'block' }}>{item.icon}</span>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 700, marginBottom: 8, color: 'var(--color-text-primary)' }}>{item.title}</h4>
                  <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 64, fontWeight: 300, color: 'rgba(79, 124, 255, 0.08)', position: 'absolute', bottom: 16, right: 20, lineHeight: 1 }}>{item.num}</div>
                </div>
              </BorderGlow>
            </FadeUp>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:1024px){.bento-grid-responsive{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:768px){.bento-grid-responsive{grid-template-columns:1fr!important;} .bento-grid-responsive > div > div{grid-column:span 1!important;}}
      `}</style>
    </section>
  );
}
