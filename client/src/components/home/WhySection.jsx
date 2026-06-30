import { FadeUp } from '../../hooks/useScrollReveal';
import BorderGlow from './BorderGlow';

export default function WhySection() {
  return (
    <section id="why" className="section" style={{ background: 'radial-gradient(circle at 20% 30%, rgba(79, 124, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 40%, rgba(116, 105, 248, 0.05) 0%, transparent 50%), #F6F8FD' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'start' }} className="why-grid-responsive">
          <div>
            <FadeUp>
              <div className="eyebrow">Why TheMentR</div>
            </FadeUp>
            <FadeUp delay={0.1} duration={0.8} y={24}>
              <h2 style={{ fontSize: 'clamp(28px, 3vw, 42px)', marginBottom: 16 }}>We didn't build another marketplace.</h2>
            </FadeUp>
            <FadeUp delay={0.2} duration={0.7} y={12}>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: 16 }}>TheMentR is an <strong>educational ecosystem</strong> — not a listing site.</p>
            </FadeUp>
          </div>
          <FadeUp delay={0.15} duration={0.7} y={12}>
            <div>
              <p style={{ fontSize: 17, color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 24 }}>
                We use structured assessment to understand students deeply, then apply a deliberate matching process to connect them with verified educators who are the right fit — in subject, style, and board.
              </p>
              <p style={{ fontSize: 17, color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 24 }}>
                Every teacher on TheMentR is <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>background-checked, curriculum-assessed, and onboarded</strong> through a rigorous process. Every student is evaluated before being matched. This isn't trial-and-error. It's data-informed, human-centered education.
              </p>
              <p style={{ fontSize: 17, color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                Our platform then provides the infrastructure — scheduling, tracking, reporting, and online learning — so that both parents and teachers can focus on what matters: <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>actual learning outcomes.</strong>
              </p>
            </div>
          </FadeUp>
        </div>

        <div style={{ marginTop: 80 }}>
          <FadeUp duration={0.8} y={24}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, textAlign: 'center', marginBottom: 40 }}>If Not TheMentR, Then Who?</h3>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="comp-grid-responsive">
            {[
              { badge: "Market Gap", badgeBg: "#FEE2E2", badgeColor: "#991B1B", title: "Random Tutors Online", desc: "No verification, no matching logic, no progress tracking. You pay and you hope. High turnover, inconsistent quality, and zero accountability." },
              { featured: true, badge: "The MentR", badgeBg: "rgba(5,150,105,0.2)", badgeColor: "#065F46", title: "Structured. Verified. Matched.", desc: "Assessment-first approach. Verified educators. Personalized matching. Full infrastructure for parents, students, and teachers — in one ecosystem." },
              { badge: "The Alternative", badgeBg: "var(--color-neutral)", badgeColor: "var(--color-text-muted)", title: "Large Coaching Centres", desc: "One-to-many classrooms, rigid schedules, and no personalization. Students get lost in the crowd. Results depend on which batch you fall into." }
            ].map((card, idx) => (
              <FadeUp key={card.title} delay={0.1 + idx * 0.08} y={16}>
                <CompCard {...card} />
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){.why-grid-responsive,.comp-grid-responsive{grid-template-columns:1fr!important;gap:24px!important;}}
      `}</style>
    </section>
  );
}

function CompCard({ badge, badgeBg, badgeColor, title, desc, featured }) {
  return (
    <BorderGlow
      borderRadius={20}
      backgroundColor={featured ? 'var(--color-navy)' : '#edece7'}
    >
      <div style={{
        padding: 28,
        cursor: 'default',
        color: featured ? 'white' : 'inherit',
      }}>
        <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 10px', borderRadius: 6, marginBottom: 16, background: badgeBg, color: badgeColor }}>{badge}</span>
        <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, marginBottom: 8, color: featured ? 'white' : 'inherit' }}>{title}</h4>
        <p style={{ fontSize: 14, color: featured ? 'rgba(255,255,255,0.7)' : 'var(--color-text-secondary)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
      </div>
    </BorderGlow>
  );
}
