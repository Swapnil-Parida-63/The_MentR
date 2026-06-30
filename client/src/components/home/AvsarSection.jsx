import { useEffect, useRef, useState } from 'react';
import { FadeUp } from '../../hooks/useScrollReveal';
import BorderGlow from './BorderGlow';

const stats = [
  { target: 2400, suffix: '+', label: 'Verified Teachers' },
  { target: 96, suffix: '%', label: 'Parent Satisfaction Rate' },
  { target: 18, suffix: '+', label: 'Cities Covered' },
  { target: 4, suffix: '.8★', label: 'Average Teacher Rating' },
];
const bars = [
  { label: 'CBSE', width: 0.82, pct: '82%' },
  { label: 'ICSE', width: 0.71, pct: '71%' },
  { label: 'IB', width: 0.58, pct: '58%' },
  { label: 'State Board', width: 0.64, pct: '64%' },
  { label: 'IGCSE', width: 0.45, pct: '45%' },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1200, 1); // 1.2s duration
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    }, { threshold: 0.25 });
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target]);
  return <div ref={ref} style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 300, color: 'var(--color-text-primary)', lineHeight: 1, marginBottom: 8 }}>{count}<span style={{ color: 'var(--color-emerald-mid)' }}>{suffix}</span></div>;
}

export default function AvsarSection() {
  const [barsAnimated, setBarsAnimated] = useState(false);
  const chartRef = useRef(null);
  useEffect(() => {
    const el = chartRef.current;
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setBarsAnimated(true); observer.unobserve(el); } }, { threshold: 0.25 });
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="avsar" className="section" style={{ background: 'radial-gradient(circle at 10% 25%, rgba(79, 124, 255, 0.05) 0%, transparent 60%), radial-gradient(circle at 90% 75%, rgba(116, 105, 248, 0.05) 0%, transparent 60%), #F6F8FD', color: 'var(--color-text-primary)' }}>
      <div className="container">
        <FadeUp><div className="eyebrow">AVSAR</div></FadeUp>
        <FadeUp delay={0.1} duration={0.8}><h2 style={{ fontSize: 'clamp(28px,3vw,44px)', marginBottom: 16 }}>Data-driven educational intelligence.</h2></FadeUp>
        <FadeUp delay={0.2} duration={0.7} y={12}><p style={{ maxWidth: 560, fontSize: 17, color: 'var(--color-text-secondary)', marginBottom: 60, lineHeight: 1.8 }}>AVSAR is TheMentR's proprietary data layer — tracking selection rates, teacher performance, and ecosystem metrics.</p></FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, marginBottom: 60 }} className="avsar-stats-responsive">
          {stats.map((s, idx) => (
            <FadeUp key={s.label} delay={0.3 + idx * 0.08} y={16}>
              <BorderGlow
                borderRadius={20}
                backgroundColor="#FFFFFF"
              >
                <div style={{ padding: '28px 24px', textAlign: 'center', cursor: 'default' }}>
                  <Counter target={s.target} suffix={s.suffix} />
                  <div style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{s.label}</div>
                </div>
              </BorderGlow>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4} y={16}>
          <BorderGlow
            borderRadius={32}
            backgroundColor="#FFFFFF"
          >
            <div ref={chartRef} style={{ padding: 40, cursor: 'default' }}>
              <h4 style={{ fontSize: 18, fontWeight: 600, marginBottom: 32, color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>Teacher Selection Rate by Board</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {bars.map(b => (
                  <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontSize: 14, color: 'var(--color-text-secondary)', width: 100, flexShrink: 0, textAlign: 'right' }}>{b.label}</span>
                    <div style={{ flex: 1, height: 8, background: 'var(--color-border)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, var(--color-blue), var(--color-emerald-mid))', transformOrigin: 'left', transform: barsAnimated ? `scaleX(${b.width})` : 'scaleX(0)', transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', width: 36 }}>{b.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </BorderGlow>
        </FadeUp>
      </div>
      <style>{`@media(max-width:768px){.avsar-stats-responsive{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
    </section>
  );
}
