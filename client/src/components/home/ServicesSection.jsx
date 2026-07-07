import { FadeUp } from '../../hooks/useScrollReveal';
import BorderGlow from './BorderGlow';
import { useModal } from '../../context/ModalContext';

const services = [
  { 
    icon: '📊', 
    title: 'AVSAR Intelligence', 
    desc: 'AI-driven real-time syllabus tracking, diagnostic grading, progress reporting, and adaptive learning gap identification.', 
    bg: 'linear-gradient(135deg, #7469F8, #8B5CF6)', 
    benefits: ['Real-time curriculum tracking', 'Weekly academic gap analysis', 'Adaptive test recommendations', 'AI learning style profiling', 'Direct parent dashboard alerts'], 
    btnClass: 'btn-primary', 
    btnText: 'Explore AVSAR →',
    action: 'avsar'
  },
  { 
    icon: '👨‍🏫', 
    title: 'The MentR Teacher', 
    desc: 'India\'s premier community of verified educators. Contractual agreements (LoA), professional payslips, ESI/EPF, and continuous quality growth.', 
    bg: 'linear-gradient(135deg, #E11D48, #F43F5E)', 
    benefits: ['Multi-layered ID & qualifications check', 'Demo lesson & live interview checks', 'Fixed monthly structured payouts', 'EPF & ESI social security benefits', 'No income caps - earn per class'], 
    btnClass: 'btn-secondary', 
    btnText: 'Join as a Teacher →',
    action: 'teacher'
  },
  { 
    icon: '🏡', 
    title: 'The MentR Parent', 
    desc: 'KG to PG personalized private in-home mentorship and tuition. Initial diagnostic assessment visits, transparent fee structures, and structured feedback.', 
    bg: 'linear-gradient(135deg, #059669, #10B981)', 
    benefits: ['KG to PG personalized matching', 'Initial in-home assessment visit', 'Fees starting at ₹1,499/mo', 'Free re-match guarantee', 'No cash transactions - all digital'], 
    btnClass: 'btn-emerald', 
    btnText: 'Book a Demo →',
    action: 'parent'
  },
  { 
    icon: '💻', 
    title: 'The MentR Online', 
    desc: 'Live interactive one-to-one or small group online classes with top verified teachers nationwide. HD video, recordings, and interactive whiteboard.', 
    bg: 'linear-gradient(135deg, #1E4FD8, #3B6BEF)', 
    benefits: ['One-to-one live virtual classes', 'Interactive digital whiteboard', 'Access to recorded sessions', 'Regular online test series', 'Nationwide teacher selection pool'], 
    btnClass: 'btn-primary', 
    btnText: 'Get Started →',
    action: 'parent'
  },
  { 
    icon: '🏆', 
    title: 'The MentR Olympiad', 
    desc: 'Dedicated preparatory tracks for IMO, NSO, SOF and other major competitive exams. Topic-wise mock assessments and performance tracking.', 
    bg: 'linear-gradient(135deg, #0A1628, #1a2d4a)', 
    benefits: ['IMO, NSO, SOF preparations', 'Dedicated Olympiad faculty pool', 'Topic-wise mock assessments', 'Progress reports & analysis', 'Rank-based achievement paths'], 
    btnClass: 'btn-secondary', 
    btnText: 'Enroll Now →',
    action: 'parent'
  }
];

export default function ServicesSection() {
  const { openModal } = useModal();
  
  return (
    <section id="services" className="section" style={{ background: 'radial-gradient(circle at 15% 25%, rgba(79, 124, 255, 0.04) 0%, transparent 60%), radial-gradient(circle at 85% 65%, rgba(116, 105, 248, 0.04) 0%, transparent 60%), #fef9ef' }}>
      <div className="container">
        <FadeUp><div className="eyebrow">Our Services</div></FadeUp>
        <FadeUp delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', maxWidth: 640 }}>Five pillars of the TheMentR ecosystem.</h2></FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28, marginTop: 56 }} className="services-grid-responsive">
          {services.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.1}>
              <BorderGlow
                borderRadius={24}
                backgroundColor="#FFFFFF"
                style={{ height: '100%' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'default' }}>
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
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 23, marginBottom: 12, color: 'var(--color-text-primary)' }}>{s.title}</h3>
                    <p style={{ fontSize: 14.5, color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                  </div>
                  <div style={{ padding: '20px 36px 40px', background: 'transparent' }}>
                    <ul style={{ listStyle: 'none', marginBottom: 24 }}>
                      {s.benefits.map(b => (
                        <li key={b} style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', padding: '8px 0', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ color: 'var(--color-emerald)', fontWeight: 700 }}>✓</span> {b}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => {
                        if (s.action === 'teacher') {
                          openModal('teacher');
                        } else if (s.action === 'avsar') {
                          const el = document.getElementById('avsar');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          openModal('parent');
                        }
                      }}
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
