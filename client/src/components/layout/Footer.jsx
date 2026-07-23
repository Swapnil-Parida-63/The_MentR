import { Link, useNavigate } from 'react-router-dom';
import { FaInstagram, FaLinkedinIn, FaXTwitter, FaFacebookF, FaWhatsapp, FaEnvelope } from 'react-icons/fa6';

export default function Footer() {
  const navigate = useNavigate();

  const navigateAndScroll = (path, hashId) => {
    navigate(path);
    if (hashId) {
      setTimeout(() => {
        const el = document.getElementById(hashId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: <FaEnvelope size={15} />, label: 'Email', href: 'mailto:contact@thementr.com' },
    { icon: <FaWhatsapp size={15} />, label: 'WhatsApp', href: 'https://wa.me/919668562631' },
    { icon: <FaInstagram size={15} />, label: 'Instagram', href: 'https://www.instagram.com/thementrnetwork?igsh=MWRkOWh4eWI0ODg5dA==' },
    { icon: <FaLinkedinIn size={15} />, label: 'LinkedIn', href: 'https://www.linkedin.com/company/thementrnetwork/' },
    { icon: <FaXTwitter size={15} />, label: 'Twitter', href: 'https://x.com/TheMentRNetwork' },
    { icon: <FaFacebookF size={15} />, label: 'Facebook', href: 'https://www.facebook.com/share/1CR7mAbF8C/' }
  ];

  const footerCols = [
    {
      title: 'Platform',
      links: [
        { label: 'TheMentR Online', onClick: () => navigateAndScroll('/', 'showcase') },
        { label: 'Olympiad Prep', onClick: () => navigateAndScroll('/', 'showcase') }
      ]
    },
    {
      title: 'Get Started',
      links: [
        { label: 'Assessment Visits', onClick: () => navigateAndScroll('/', 'avsar') },
        { label: 'Become a Teacher', onClick: () => navigateAndScroll('/', 'contact-forms') }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'Our Vision', onClick: () => navigateAndScroll('/', 'vision') },
        { label: 'Team', onClick: () => navigateAndScroll('/', 'organogram') },
        { label: 'Blog', to: '/blogs' },
        { label: 'Gallery', onClick: () => navigateAndScroll('/', 'gallery') },
        { label: 'Contact', to: '/contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQ', onClick: () => navigateAndScroll('/', 'contact-section') },
        { label: 'Help Centre', to: '/contact' },
        { label: 'Privacy Policy', onClick: () => {} },
        { label: 'Terms & Conditions', onClick: () => {} },
        { label: 'Refund Policy', onClick: () => {} }
      ]
    }
  ];

  return (
    <footer style={{ background: 'var(--color-navy)', color: 'white', padding: '80px 0 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1fr', gap: 40, marginBottom: 60 }} className="footer-grid-responsive">
          {/* Brand */}
          <div>
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: 0 }}>
              <img src="/mentR_Logo.png" alt="TheMentR Logo" style={{ height: 40, objectFit: 'contain', borderRadius: '3px' }} />
            </Link>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: '16px 0 24px', maxWidth: 280 }}>
              Building the educational infrastructure India deserves — one verified teacher, one matched student, one family at a time.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {socialLinks.map(s => (
                <a 
                  key={s.label} 
                  href={s.href} 
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    width: 36, height: 36, borderRadius: 9, background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#FFFFFF', textDecoration: 'none', transition: 'all 0.3s ease',
                  }} 
                  title={s.label}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.16)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {footerCols.map(col => (
            <div key={col.title}>
              <h5 style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
                {col.title}
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, padding: 0, margin: 0 }}>
                {col.links.map(link => (
                  <li key={link.label} style={{ display: 'flex' }}>
                    {link.onClick ? (
                      <button
                        onClick={link.onClick}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          fontSize: 14,
                          color: 'rgba(255,255,255,0.65)',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-sans)',
                          transition: 'color 0.3s',
                          outline: 'none'
                        }}
                        onMouseEnter={e => e.target.style.color = 'white'}
                        onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link 
                        to={link.to || '#'} 
                        onClick={!link.to ? (e) => e.preventDefault() : undefined}
                        style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'color 0.3s' }}
                        onMouseEnter={e => e.target.style.color = 'white'}
                        onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
                      >
                        {link.label}
                      </Link>
                    )}
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
        @media (max-width: 1024px) {
          .footer-grid-responsive { grid-template-columns: 1.5fr 1fr 1fr !important; gap: 30px !important; }
        }
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
