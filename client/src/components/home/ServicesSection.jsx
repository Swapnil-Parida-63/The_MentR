import { Link } from 'react-router-dom';
import { FadeUp } from '../../hooks/useScrollReveal';
import BorderGlow from './BorderGlow';
import { useModal } from '../../context/ModalContext';

const services = [
  { icon: '💻', title: 'TheMentR Online', desc: 'Live one-to-one online classes with verified teachers — structured sessions, progress tracking, and full curriculum coverage.', bg: 'linear-gradient(135deg, #1E4FD8, #3B6BEF)', benefits: ['Live HD video sessions', 'Interactive whiteboard & resources', 'Session recordings available', 'Monthly progress reports', 'Parent dashboard access'], btnClass: 'btn-primary', btnText: 'Get Started →' },
  { icon: '🏆', title: 'TheMentR Olympiad', desc: 'Structured competitive exam preparation — from Math to Science Olympiads.', bg: 'linear-gradient(135deg, #0A1628, #1a2d4a)', benefits: ['IMO, NSO, SOF preparation', 'Expert Olympiad faculty', 'Mock tests & analysis', 'Rank-based performance tracking', 'Certificate & medal pathways'], btnClass: 'btn-secondary', btnText: 'Enroll Now →', id: 'olympiad' },
  { icon: '🏠', title: 'Assessment Visits', desc: "A trained TheMentR educator visits your home for a structured evaluation.", bg: 'linear-gradient(135deg, #059669, #10B981)', benefits: ['In-home learning style evaluation', 'Subject gap analysis', 'Board and syllabus mapping', 'Teacher match recommendation', 'Goal-setting session with parents'], btnClass: 'btn-emerald', btnText: 'Book a Visit →' },
];

export default function ServicesSection() {
  const { openModal } = useModal();
  return (
    <section id="services" className="section" style={{ background: 'radial-gradient(circle at 15% 25%, rgba(79, 124, 255, 0.04) 0%, transparent 60%), radial-gradient(circle at 85% 65%, rgba(116, 105, 248, 0.04) 0%, transparent 60%), #fef9ef' }}>
      <div className="container">
        <FadeUp><div className="eyebrow">Our Services</div></FadeUp>
        <FadeUp delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', maxWidth: 540 }}>Three pillars of the TheMentR ecosystem.</h2></FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28, marginTop: 56 }} className="services-grid-responsive">
          {services.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.1}>
              <BorderGlow
                borderRadius={24}
                backgroundColor="#FFFFFF"
                style={{ height: '100%' }}
              >
                <div id={s.id} style={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'default' }}>
                  <div style={{ padding: '40px 36px 20px', flex: 1, color: 'var(--color-text-primary)' }}>
                    <div style={{
                      width: 60, height: 60, borderRadius: 16,
                      background: s.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 28, color: 'white', marginBottom: 24,
                      boxShadow: '0 4px 12px rgba(15,23,42,0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      {s.icon}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 12, color: 'var(--color-text-primary)' }}>{s.title}</h3>
                    <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                  </div>
                  <div style={{ padding: '20px 36px 40px', background: 'transparent' }}>
                    <ul style={{ listStyle: 'none', marginBottom: 24 }}>
                      {s.benefits.map(b => (
                        <li key={b} style={{ fontSize: 14, color: 'var(--color-text-secondary)', padding: '8px 0', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ color: 'var(--color-emerald)', fontWeight: 700 }}>✓</span> {b}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => openModal('parent')} 
                      className={`btn ${s.btnClass}`} 
                      style={{ width: '100%', textAlign: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none' }}
                    >
                      {s.btnText}
                    </button>
                  </div>
                </div>
              </BorderGlow>
            </FadeUp>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.services-grid-responsive{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
