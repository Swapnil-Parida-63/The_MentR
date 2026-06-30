import { useState } from 'react';
import { FadeUp } from '../../hooks/useScrollReveal';
import BorderGlow from './BorderGlow';

const faqs = [
  { q: 'What is an Assessment Visit?', a: "A trained TheMentR educator visits your home for a structured evaluation — typically 60–90 minutes. We assess current level, learning style, subject gaps, and goals before any teacher is matched." },
  { q: 'How are teachers verified?', a: "Every teacher undergoes identity check, academic qualification review, subject-matter assessment, demo teaching session, and background check. Only about 1 in 5 applicants make it through." },
  { q: 'Which boards and classes do you cover?', a: "We cover CBSE, ICSE, IB, IGCSE, and all major State Boards, from Class 1 through Class 12." },
  { q: 'Is TheMentR available in my city?', a: "We currently serve 18+ cities across India. Online sessions are available nationwide." },
  { q: 'What if the matched teacher isn\'t the right fit?', a: "We have a free re-match guarantee. If within the first two sessions you feel the fit isn't right, we'll rematch you at no additional charge." },
  { q: 'How do I apply to teach on TheMentR?', a: "Fill in the teacher application form. Our onboarding team reviews within 5–7 business days." },
];

export default function ContactSection({ background = 'white' }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section id="contact-section" className="section" style={{ background: 'radial-gradient(circle at 10% 25%, rgba(79, 124, 255, 0.04) 0%, transparent 60%), radial-gradient(circle at 90% 75%, rgba(116, 105, 248, 0.04) 0%, transparent 60%), #FFFFFF' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }} className="contact-grid-responsive">
          <FadeUp>
            <div>
              <div className="eyebrow">Contact</div>
              <h2 style={{ fontSize: 36, marginBottom: 16 }}>We're here to help.</h2>
              <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 40 }}>Whether you have a question about our services — our team responds within one business day.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { icon: '📧', label: 'Email', value: 'hello@thementr.in' },
                  { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
                  { icon: '📍', label: 'Headquartered in', value: 'Mumbai, Maharashtra · Serving 18+ cities' },
                  { icon: '🕐', label: 'Response Time', value: 'Within 1 business day' },
                ].map(c => (
                  <div key={c.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: 'linear-gradient(135deg, var(--color-blue-light) 0%, rgba(220,232,255,0.7) 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(79,124,255,0.08), inset 0 1px 1px rgba(255,255,255,0.8)',
                      border: '1px solid rgba(79,124,255,0.12)'
                    }}>{c.icon}</div>
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginBottom: 2 }}>{c.label}</h5>
                      <p style={{ fontSize: 15, color: 'var(--color-text-primary)', margin: 0 }}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <BorderGlow
                borderRadius={20}
                backgroundColor="#FFFFFF"
                style={{ marginTop: 32 }}
              >
                <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, cursor: 'default' }}>
                  <span style={{ fontSize: 32 }}>🗺️</span>
                  <span style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>Interactive map — coming soon</span>
                </div>
              </BorderGlow>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div>
              <h3 style={{ fontSize: 24, marginBottom: 24 }}>Frequently Asked Questions</h3>
              {faqs.map((f, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <div onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', cursor: 'pointer', fontSize: 15, fontWeight: 600, color: openFaq === i ? 'var(--color-blue)' : 'var(--color-text-primary)', transition: 'color 0.3s' }}>
                    {f.q}
                    <span style={{
                      width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0, transition: 'all 0.3s',
                      background: openFaq === i ? 'var(--color-blue)' : '#F6F8FD',
                      border: `1px solid ${openFaq === i ? 'var(--color-blue)' : 'var(--color-border)'}`,
                      color: openFaq === i ? 'white' : 'inherit',
                      transform: openFaq === i ? 'rotate(45deg)' : 'none',
                    }}>+</span>
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.75, maxHeight: openFaq === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease, padding 0.3s ease', paddingBottom: openFaq === i ? 16 : 0 }}>
                    {f.a}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
      <style>{`@media(max-width:768px){.contact-grid-responsive{grid-template-columns:1fr!important;gap:40px!important;}}`}</style>
    </section>
  );
}
