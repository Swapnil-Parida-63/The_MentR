import { FadeUp } from '../../hooks/useScrollReveal';
import BorderGlow from './BorderGlow';

const parentPains = [
  { icon: '🔍', bg: '#FEE2E2', title: 'Finding trusted teachers is hard', desc: "There's no structured way to verify qualifications, track records, or teaching styles before committing your child." },
  { icon: '📊', bg: '#FEF3C7', title: 'No visibility into learning progress', desc: 'Parents are left guessing. No reports, no milestones, no structured feedback on where their child actually stands.' },
  { icon: '💸', bg: '#FEE2E2', title: 'Paying for the wrong fit', desc: 'Trial-and-error tutor selection costs money and time — and still often results in a mismatch of style or subject expertise.' },
  { icon: '🛡️', bg: '#FEF3C7', title: 'Safety concerns with unknown tutors', desc: "Online platforms provide no background checks. Parents worry about who is entering their child's learning space." },
];
const teacherPains = [
  { icon: '🏷️', bg: '#FEE2E2', title: 'Undervalued and underpaid', desc: 'Skilled educators often get reduced to commodity listings on platforms that race to the bottom on pricing.' },
  { icon: '📱', bg: '#FEF3C7', title: 'No tools to manage students', desc: 'Scattered WhatsApp messages, manual scheduling, and no professional infrastructure to run a teaching practice.' },
  { icon: '🔗', bg: '#FEE2E2', title: 'No structured student matching', desc: "Teachers waste time on students who aren't the right fit — wrong level, wrong subject, wrong expectations." },
  { icon: '📈', bg: '#FEF3C7', title: 'No visibility or career growth', desc: 'Teaching remains invisible work. No ecosystem that tracks educator performance, builds reputation, or opens doors.' },
];

function PainCard({ icon, bg, title, desc }) {
  return (
    <BorderGlow
      borderRadius={12}
      backgroundColor="#edece7"
    >
      <div style={{
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
        cursor: 'default',
      }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, background: bg }}>{icon}</div>
        <div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{title}</h4>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
        </div>
      </div>
    </BorderGlow>
  );
}

export default function PainPointsSection() {
  return (
    <section id="pain" className="section" style={{ background: 'var(--color-neutral)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }} className="pain-grid-responsive">
          <FadeUp>
            <div>
              <span className="tag" style={{ marginBottom: 16 }}>For Parents</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 24, color: 'var(--color-navy)' }}>The struggles parents face</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {parentPains.map(p => <PainCard key={p.title} {...p} />)}
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div>
              <span className="tag emerald" style={{ marginBottom: 16 }}>For Teachers</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 24, color: 'var(--color-navy)' }}>The challenges educators carry</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {teacherPains.map(p => <PainCard key={p.title} {...p} />)}
              </div>
            </div>
          </FadeUp>
        </div>
        <FadeUp>
          <div style={{ textAlign: 'center', paddingTop: 64 }}>
            <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 400, fontStyle: 'italic', color: 'var(--color-navy)', maxWidth: 640, margin: '0 auto', lineHeight: 1.35 }}>
              "Education doesn't have a teacher shortage.<br />It has a <strong style={{ fontStyle: 'normal', color: 'var(--color-blue)' }}>matching problem.</strong>"
            </blockquote>
          </div>
        </FadeUp>
      </div>
      <style>{`@media(max-width:768px){.pain-grid-responsive{grid-template-columns:1fr!important;gap:40px!important;}}`}</style>
    </section>
  );
}
