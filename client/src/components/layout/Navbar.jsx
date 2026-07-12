import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesHovered, setServicesHovered] = useState(false);
  const leaveTimeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigateAndScroll = (path, hashId) => {
    setMobileMenuOpen(false);
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

  const navLinks = [
    { label: 'Why TheMentR', id: 'why' },
    { label: 'Services', id: 'services' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Gallery', id: 'gallery' }
  ];

  if (isMobile) {
    return (
      <>
        {/* Sticky Mobile Header with Inline Direct Links & More Button */}
        <div style={{
          position: 'fixed', top: 16, left: 16, right: 16, height: 56,
          background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 28, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 16px', zIndex: 99999,
          boxShadow: '0 8px 32px rgba(15, 23, 42, 0.05)'
        }}>
          <img src="/mentR_Logo.png" alt="TheMentR Logo" style={{ height: 28, objectFit: 'contain', cursor: 'pointer', marginRight: 8, borderRadius: 2 }} onClick={() => navigateAndScroll('/', null)} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              onClick={() => navigateAndScroll('/', 'why')}
              style={{ background: 'none', border: 'none', color: '#1D2433', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '4px 6px' }}
            >
              Why
            </button>
            <button
              onClick={() => navigateAndScroll('/', 'services')}
              style={{ background: 'none', border: 'none', color: '#1D2433', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '4px 6px' }}
            >
              Services
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              style={{
                background: 'rgba(79, 124, 255, 0.08)',
                border: 'none',
                color: '#4F7CFF',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                padding: '6px 12px',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              More ▾
            </button>
          </div>
        </div>

        {/* Mobile Slide-Out Right Drawer Menu */}
        {mobileMenuOpen && (
          <>
            {/* Dark overlay backdrop */}
            <div 
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.25)',
                backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
                zIndex: 99998,
                animation: 'fadeIn 0.2s ease-out'
              }}
            />
            {/* Slide-out Drawer Panel */}
            <div style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: 280,
              background: 'rgba(255, 255, 255, 0.96)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '-8px 0 32px rgba(15, 23, 42, 0.08)',
              zIndex: 99999, display: 'flex', flexDirection: 'column',
              padding: '24px 28px', boxSizing: 'border-box',
              animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              {/* Header of Drawer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>NAVIGATION</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#1D2433', cursor: 'pointer', padding: 4 }}
                >
                  <X size={22} />
                </button>
              </div>

              {/* Links list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {navLinks.map(item => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateAndScroll('/', item.id);
                    }}
                    style={{
                      background: 'none', border: 'none', color: '#1D2433', fontSize: 15,
                      fontWeight: 600, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-sans)',
                      padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.03)'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateAndScroll('/', 'contact-section');
                  }}
                  style={{
                    background: 'none', border: 'none', color: '#1D2433', fontSize: 15,
                    fontWeight: 600, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-sans)',
                    padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.03)'
                  }}
                >
                  Contact
                </button>
                
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateAndScroll('/', 'contact-forms');
                  }}
                  className="btn"
                  style={{
                    fontSize: 14,
                    padding: '12px 20px',
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)',
                    color: 'white',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginTop: 24,
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(79, 124, 255, 0.2)'
                  }}
                >
                  Book Assessment
                </button>
              </div>
            </div>
            
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes slideInRight {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
              }
            `}</style>
          </>
        )}
      </>
    );
  }

  // Desktop floating premium navigation bar
  return (
    <header style={{
      position: 'fixed',
      top: scrolled ? 12 : 24,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 80px)',
      maxWidth: 1200,
      height: scrolled ? 54 : 66,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      zIndex: 9999,
      background: scrolled ? 'rgba(255, 255, 255, 0.82)' : 'rgba(255, 255, 255, 0.65)',
      backdropFilter: scrolled ? 'blur(20px)' : 'blur(12px)',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(12px)',
      borderRadius: scrolled ? 24 : 30,
      border: '1px solid rgba(79, 124, 255, 0.08)',
      boxShadow: scrolled 
        ? '0 12px 40px rgba(15, 23, 42, 0.08), 0 2px 8px rgba(15, 23, 42, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.9)'
        : '0 4px 20px rgba(15, 23, 42, 0.02), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {/* Left: Logo Container with Overflow and Entrance Animation */}
      <div style={{ width: 175, height: '100%', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <img 
          src="/mentR_Logo.png" 
          alt="TheMentR Logo" 
          className="logo-nav-emblem"
          style={{ 
            position: 'absolute',
            left: 0,
            height: scrolled ? 76 : 94, 
            objectFit: 'contain', 
            cursor: 'pointer', 
            borderRadius: 4, 
            filter: 'drop-shadow(0 6px 16px rgba(79, 124, 255, 0.12))',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 100
          }} 
          onClick={() => navigateAndScroll('/', null)} 
        />
      </div>

      {/* Center: Navigation Links */}
      <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {navLinks.map(link => {
          if (link.label === 'Services') {
            return (
              <div 
                key={link.label}
                onMouseEnter={() => {
                  if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
                  setServicesHovered(true);
                }}
                onMouseLeave={() => {
                  leaveTimeoutRef.current = setTimeout(() => {
                    setServicesHovered(false);
                  }, 300);
                }}
                style={{ position: 'relative' }}
              >
                <button
                  onClick={() => navigateAndScroll('/', link.id)}
                  className="nav-link-btn"
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    fontFamily: 'var(--font-sans)',
                    padding: '8px 0'
                  }}
                >
                  {link.label} ▾
                </button>

                {/* Dropdown panel */}
                {servicesHovered && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 580,
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(242, 247, 255, 0.98) 100%)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: 20,
                      border: '1px solid rgba(79, 124, 255, 0.16)',
                      boxShadow: '0 20px 50px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(79, 124, 255, 0.03)',
                      padding: 24,
                      zIndex: 99999,
                      display: 'grid',
                      gridTemplateColumns: '1.2fr 1.3fr',
                      gap: 20,
                      textAlign: 'left',
                      marginTop: 10,
                      animation: 'slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {/* Left Column: Product / AVSAR */}
                    <div style={{ borderRight: '1px solid rgba(79, 124, 255, 0.08)', paddingRight: 16 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#7469F8', letterSpacing: '0.08em', display: 'block', marginBottom: 12 }}>Intelligence</span>
                      <div 
                        onClick={() => { setServicesHovered(false); navigateAndScroll('/', 'avsar'); }}
                        style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                        className="mega-menu-item"
                      >
                        <h4 style={{ margin: 0, fontSize: 14.5, fontWeight: 600, color: '#1D2433', display: 'flex', alignItems: 'center', gap: 6 }}>
                          AVSAR Intelligence
                        </h4>
                        <p style={{ margin: '6px 0 0', fontSize: 12, color: '#5C667A', lineHeight: 1.45 }}>
                          AI-driven real-time syllabus tracking, progress reports, and automated diagnostic evaluation tracks.
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Platform Services */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <button
                        onClick={() => { setServicesHovered(false); navigateAndScroll('/', 'showcase'); }}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          textAlign: 'left',
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: '#4F7CFF',
                          letterSpacing: '0.08em',
                          display: 'block',
                          marginBottom: 2,
                          cursor: 'pointer'
                        }}
                      >
                        Platform & Sourcing
                      </button>
                      {[
                        { title: 'The MentR Teacher', desc: 'Verified educators with contractual agreements and social benefits.', id: 'showcase' },
                        { title: 'The MentR Parent', desc: 'Personalized KG to PG tuitions starting at ₹1,499/mo.', id: 'showcase' },
                        { title: 'The MentR Online', desc: 'Interactive live one-to-one virtual classrooms.', id: 'showcase' },
                        { title: 'The MentR Olympiad', desc: 'Expert competitive exam prep for IMO, NSO, SOF.', id: 'showcase' }
                      ].map(srv => (
                        <div 
                          key={srv.title} 
                          onClick={() => { setServicesHovered(false); navigateAndScroll('/', srv.id); }}
                          style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                          className="mega-menu-item"
                        >
                          <h5 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1D2433' }}>{srv.title}</h5>
                          <p style={{ margin: '2px 0 0', fontSize: 11, color: '#5C667A', lineHeight: 1.35 }}>{srv.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={link.label}
              onClick={() => link.path ? navigateAndScroll(link.path, null) : navigateAndScroll('/', link.id)}
              className="nav-link-btn"
              style={{
                background: 'none',
                border: 'none',
                fontSize: 13.5,
                fontWeight: 500,
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                fontFamily: 'var(--font-sans)'
              }}
            >
              {link.label}
            </button>
          );
        })}
      </nav>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <button
          onClick={() => navigateAndScroll('/', 'contact-section')}
          className="nav-link-btn"
          style={{
            background: 'none',
            border: 'none',
            fontSize: 13.5,
            fontWeight: 500,
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          Contact
        </button>
        <button
          onClick={() => navigateAndScroll('/', 'contact-forms')}
          style={{
            fontSize: 13,
            padding: '9px 20px',
            borderRadius: 16,
            background: '#FFFFFF',
            color: 'var(--color-text-primary)',
            border: '1px solid rgba(79, 124, 255, 0.15)',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="nav-secondary-btn"
        >
          Join as a Teacher
        </button>
        <button
          onClick={() => navigateAndScroll('/', 'contact-forms')}
          style={{
            fontSize: 13,
            padding: '9px 20px',
            borderRadius: 16,
            background: 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)',
            color: 'white',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(79, 124, 255, 0.2)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="nav-primary-btn"
        >
          Book a Demo
        </button>
      </div>
      
      {/* CSS Hover Transitions */}
      <style>{`
        .nav-link-btn:hover {
          color: #4F7CFF !important;
          transform: translateY(-2px) !important;
          text-shadow: 0 0 8px rgba(79, 124, 255, 0.25) !important;
        }
        .nav-secondary-btn:hover {
          background: #F6F8FD !important;
          border-color: rgba(79, 124, 255, 0.25) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 16px rgba(79, 124, 255, 0.1) !important;
        }
        .nav-primary-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(79, 124, 255, 0.35) !important;
        }
        .logo-nav-emblem {
          animation: logoEntrance 1.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes logoEntrance {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(-4deg);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.08) rotate(1deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate3d(-50%, -10px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(-50%, 0, 0);
          }
        }
        .mega-menu-item {
          padding: 8px 12px;
          border-radius: 12px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mega-menu-item:hover {
          background: rgba(79, 124, 255, 0.05);
        }
        .mega-menu-item:hover h4, .mega-menu-item:hover h5 {
          color: #4F7CFF !important;
        }
      `}</style>
    </header>
  );
}
