import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-navy)', color: 'white', padding: '80px 0 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr', gap: 60, marginBottom: 60 }} className="footer-grid-responsive">
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: 0 }}>
              <img src="/logo.png" alt="TheMentR Logo" style={{ height: 40, objectFit: 'contain' }} />
            </Link>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: '16px 0 24px', maxWidth: 280 }}>
              Building the educational infrastructure India deserves — one verified teacher, one matched student, one family at a time.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['📸', '💼', '🐦', '▶️', '💬'].map((icon, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: 9, background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 15, textDecoration: 'none', transition: 'all 0.3s ease',
                }} title={['Instagram', 'LinkedIn', 'Twitter', 'YouTube', 'WhatsApp'][i]}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {[
            { title: 'Platform', links: [['TheMentR Online', '/'], ['Olympiad Prep', '/'], ['Assessment Visits', '/'], ['AVSAR Intelligence', '/'], ['Become a Teacher', '/contact']] },
            { title: 'Company', links: [['Our Vision', '/'], ['Team', '/'], ['Blog', '/blogs'], ['Gallery', '/gallery'], ['Contact', '/contact']] },
            { title: 'Support', links: [['FAQ', '/contact'], ['Help Centre', '#'], ['Privacy Policy', '#'], ['Terms & Conditions', '#'], ['Refund Policy', '#']] },
          ].map(col => (
            <div key={col.title}>
              <h5 style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
                {col.title}
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'color 0.3s' }}
                      onMouseEnter={e => e.target.style.color = 'white'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>© 2025 TheMentR Education Pvt. Ltd. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Cookies'].map(t => (
              <a key={t} href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>{t}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid-responsive { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
