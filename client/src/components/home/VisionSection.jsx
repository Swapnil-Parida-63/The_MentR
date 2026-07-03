import { FadeUp } from '../../hooks/useScrollReveal';

const timeline = [
  { year: '2022 — Founded', title: 'TheMentR launches with Assessment Visits', desc: 'First in India to offer structured home-based student evaluations before teacher placement.', active: true },
  { year: '2023 — Expanded', title: 'Online platform and Olympiad division', desc: 'TheMentR Online launches alongside a dedicated Olympiad preparation track.', active: true },
  { year: '2024 — AVSAR', title: 'Data intelligence layer introduced', desc: 'Proprietary analytics begin tracking selection rates, performance, and ecosystem health.', active: true },
  { year: '2025–26 — Roadmap', title: 'National expansion & AI-assisted matching', desc: '50 cities. 10,000+ verified teachers. Intelligent matching powered by learning outcome data.', active: false },
];

export default function VisionSection() {
  return (
    <section id="vision" className="section" style={{ background: 'radial-gradient(circle at 10% 20%, rgba(116, 105, 248, 0.05) 0%, transparent 60%), radial-gradient(circle at 90% 70%, rgba(79, 124, 255, 0.04) 0%, transparent 60%), #fef9ef' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="vision-grid-responsive">
          <FadeUp>
            <div>
              <div className="eyebrow">Vision & Mission</div>
              <h2 style={{ fontSize: 'clamp(28px,3vw,44px)', marginBottom: 24 }}>Building educational <em style={{ fontStyle: 'italic', color: 'var(--color-blue)' }}>infrastructure</em> for India.</h2>
              <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>TheMentR is building the foundational layer for personalized, accountable, and safe education — accessible to every family.</p>
              <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 32 }}>Our vision is a future where every student in India has access to a verified, matched educator.</p>
              <div style={{ display: 'flex', gap: 24 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--color-blue)', fontWeight: 300 }}>12K+</div>
                  <div style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>Students reached</div>
                </div>
                <div style={{ width: 1, background: 'var(--color-border)' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--color-emerald)', fontWeight: 300 }}>₹0</div>
                  <div style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>Compromise on quality</div>
                </div>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {timeline.map((t, i) => (
                <div key={t.year} style={{ display: 'flex', gap: 20, position: 'relative' }}>
                  {i < timeline.length - 1 && <div style={{ position: 'absolute', left: 15, top: 40, bottom: -20, width: 1, background: 'var(--color-border-mid)' }} />}
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', border: `2px solid ${t.active ? 'var(--color-blue)' : 'var(--color-border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    background: t.active ? 'var(--color-blue)' : 'white', fontSize: 12, fontWeight: 700,
                    color: t.active ? 'white' : 'var(--color-blue)', marginTop: 2,
                  }}>{t.active ? '✓' : '→'}</div>
                  <div style={{ paddingBottom: 32 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{t.year}</div>
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{t.title}</h4>
                    <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0 }}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
      <style>{`@media(max-width:768px){.vision-grid-responsive{grid-template-columns:1fr!important;gap:40px!important;}}`}</style>
    </section>
  );
}
