import { useState, useEffect } from 'react';
import { FadeUp } from '../../hooks/useScrollReveal';
import BorderGlow from './BorderGlow';

const slides = [
  { tag: 'Parent Experience', tagClass: '', title: 'Complete visibility into your child\'s learning.', desc: 'Track session attendance, view progress reports, communicate with teachers, and manage scheduling.', features: ['Real-time session tracking', 'Monthly learning reports', 'Direct teacher messaging', 'Upcoming session calendar'], phone: [{ title: '📅 Today\'s Session', body: 'Math — Class 9 CBSE\n4:00 PM with Priya Ma\'am' }, { title: '📊 This Month', body: '12 sessions · 94% attendance' }, { title: '✅ Last Report', body: 'Algebra: Strong\nGeometry: Improving' }], barColor: 'rgba(30,79,216,0.3)' },
  { tag: 'Teacher Experience', tagClass: 'emerald', title: 'Run your teaching practice like a professional.', desc: 'Manage students, schedule sessions, submit progress notes, and track earnings.', features: ['Student roster management', 'Earnings & payout dashboard', 'Session feedback tools', 'Profile & reputation building'], phone: [{ title: '👩‍🏫 My Students', body: '8 active · 2 new match' }, { title: '💰 This Month', body: '₹28,400 earned\n24 sessions completed' }, { title: '⭐ Rating', body: '4.9 / 5.0 · 47 reviews' }], barColor: 'rgba(5,150,105,0.4)' },
  { tag: 'Olympiad Interface', tagClass: 'purple', title: 'Competitive exam prep, structured and measurable.', desc: 'Practice tests, performance analytics, and stage-wise preparation guides.', features: ['Chapter-wise mock tests', 'National rank simulator', 'Performance heat maps', 'Expert video explanations'], phone: [{ title: '🏆 IMO Prep', body: 'Stage 1 · 38 days left' }, { title: '📝 Last Mock Test', body: 'Score: 87/100\nRank: Top 12%' }, { title: '📌 Weak Areas', body: 'Number Theory\n2 practice sets pending' }], barColor: 'rgba(124,58,237,0.4)' },
];

export default function ShowcaseSection() {
  const [current, setCurrent] = useState(0);
  useEffect(() => { const t = setInterval(() => setCurrent(p => (p + 1) % 3), 5000); return () => clearInterval(t); }, []);

  return (
    <section id="showcase" className="section" style={{ background: 'radial-gradient(circle at 20% 30%, rgba(79, 124, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 40%, rgba(116, 105, 248, 0.08) 0%, transparent 50%), #0F172A', color: 'white' }}>
      <div className="container">
        <FadeUp><div className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>The Platform</div></FadeUp>
        <FadeUp delay={0.1}><h2 style={{ fontSize: 'clamp(28px,3vw,44px)', marginBottom: 16, color: 'white' }}>Built for everyone in the ecosystem.</h2></FadeUp>
        <FadeUp delay={0.2}><p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', marginBottom: 56, maxWidth: 560, lineHeight: 1.7 }}>One platform. Three experiences.</p></FadeUp>
        <FadeUp delay={0.2}>
          <div style={{ overflow: 'hidden', borderRadius: 32 }}>
            <div style={{ display: 'flex', transform: `translateX(-${current * 100}%)`, transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' }}>
              {slides.map(s => (
                <div key={s.tag} style={{ minWidth: '100%', padding: '0 16px' }}>
                  <BorderGlow
                    borderRadius={32}
                    backgroundColor="rgba(255,255,255,0.05)"
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'center', padding: '56px 48px', cursor: 'default' }} className="showcase-content-responsive">
                      <div>
                        <span className={`tag ${s.tagClass}`} style={{ marginBottom: 16 }}>{s.tag}</span>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'white', marginBottom: 16 }}>{s.title}</h3>
                        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: 24 }}>{s.desc}</p>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                          {s.features.map(f => <li key={f} style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ color: 'var(--color-emerald-mid)' }}>→</span> {f}</li>)}
                        </ul>
                      </div>
                      <div style={{ width: 220, margin: '0 auto' }} className="phone-mock-responsive">
                        <BorderGlow
                          borderRadius={32}
                          backgroundColor="rgba(255,255,255,0.07)"
                        >
                          <div style={{ padding: 16, minHeight: 400, display: 'flex', flexDirection: 'column', cursor: 'default' }}>
                            <div style={{ width: 60, height: 20, background: 'rgba(255,255,255,0.1)', borderRadius: 10, margin: '0 auto 16px' }} />
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                              <div style={{ height: 8, borderRadius: 4, background: s.barColor, width: '60%' }} />
                              {s.phone.map(p => (
                                <div key={p.title} style={{ borderRadius: 8, padding: 12, background: 'rgba(255,255,255,0.08)', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
                                  <strong style={{ display: 'block', color: 'white', fontSize: 12, marginBottom: 4 }}>{p.title}</strong>
                                  {p.body.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
                                </div>
                              ))}
                            </div>
                          </div>
                        </BorderGlow>
                      </div>
                    </div>
                  </BorderGlow>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 32 }}>
            <button onClick={() => setCurrent((current - 1 + 3) % 3)} style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
            {[0, 1, 2].map(i => <button key={i} onClick={() => setCurrent(i)} style={{ width: current === i ? 24 : 8, height: 8, borderRadius: current === i ? 4 : '50%', background: current === i ? 'white' : 'rgba(255,255,255,0.25)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} />)}
            <button onClick={() => setCurrent((current + 1) % 3)} style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
          </div>
        </FadeUp>
      </div>
      <style>{`
        @media(max-width:768px){.showcase-content-responsive{grid-template-columns:1fr!important;}.phone-mock-responsive{display:none!important;}}
      `}</style>
    </section>
  );
}
