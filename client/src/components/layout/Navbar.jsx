import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronDown } from 'lucide-react';
import Logo from '../common/Logo';
import { useModal } from '../../context/ModalContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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

    // Extract route and hash if provided e.g. '/#parent' or '/#teacher'
    let targetPath = path || '/';
    let targetHash = null;
    if (targetPath.includes('#')) {
      const parts = targetPath.split('#');
      targetPath = parts[0] || '/';
      targetHash = '#' + parts[1];
    }

    // Handle distinct non-home page routes (e.g. /pricing, /teacher-terms)
    if (targetPath !== '/' && targetPath !== '') {
      navigate(targetPath + (targetHash || ''));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Homepage section scrolling & hash synchronization
    if (window.location.pathname !== '/') {
      navigate('/' + (targetHash || ''));
    } else if (targetHash) {
      window.history.pushState(null, '', targetHash);
      window.dispatchEvent(new Event('hashchange'));
    }

    const performScroll = () => {
      const targetId = hashId || (targetHash ? targetHash.replace('#', '') : null);
      if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      let attempts = 0;
      const scrollInterval = setInterval(() => {
        const el = document.getElementById(targetId);
        if (el) {
          clearInterval(scrollInterval);
          const yOffset = -75;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        } else {
          attempts++;
          if (attempts > 20) {
            clearInterval(scrollInterval);
          }
        }
      }, 50);
    };

    performScroll();
  };

  const desktopNavLinks = [
    { label: 'Why TheMentR', id: 'why' },
    { label: 'Services', isAccordion: true, id: 'services' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Hall of Fame', id: 'gallery' },
    { label: 'Journal', id: 'blogs' }
  ];

  const mobileNavLinks = [
    { label: 'Why TheMentR', id: 'why' },
    { label: 'Services', isAccordion: true, id: 'services' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Hall of Fame', id: 'gallery' },
    { label: 'Journal', id: 'blogs' },
    { label: 'Contact', id: 'contact-section' }
  ];

  if (isMobile) {
    return (
      <>
        {/* Sticky Mobile Header with Inline Direct Links & More Button */}
        <div style={{
          position: 'fixed', top: 16, left: 16, right: 16, height: 56,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(239, 246, 255, 0.72) 50%, rgba(224, 231, 255, 0.6) 100%)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(191, 219, 254, 0.75)', borderRadius: 28, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 12px 0 8px', zIndex: 99999,
          boxShadow: '0 10px 32px rgba(37, 99, 235, 0.12), inset 0 1.5px 2px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(59, 130, 246, 0.12)'
        }}>
          <Logo scrolled={true} onClick={() => navigateAndScroll('/', null)} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button
              onClick={() => navigateAndScroll('/', 'why')}
              style={{
                background: 'none', border: 'none', color: '#1D2433', fontSize: 13.5, fontWeight: 650,
                cursor: 'pointer', padding: '8px 10px', minHeight: 38, display: 'inline-flex', alignItems: 'center',
                justifyContent: 'center', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation'
              }}
            >
              Why
            </button>
            <button
              onClick={() => navigateAndScroll('/', 'services')}
              style={{
                background: 'none', border: 'none', color: '#1D2433', fontSize: 13.5, fontWeight: 650,
                cursor: 'pointer', padding: '8px 10px', minHeight: 38, display: 'inline-flex', alignItems: 'center',
                justifyContent: 'center', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation'
              }}
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
                gap: 2,
                touchAction: 'manipulation'
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
                position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
                zIndex: 99998,
                animation: 'fadeIn 0.2s ease-out'
              }}
            />
            {/* Floating Glassmorphic Compact Drawer Panel */}
            <div style={{
              position: 'fixed', top: 16, right: 16, width: 310, maxWidth: 'calc(100vw - 32px)',
              maxHeight: 'calc(100vh - 32px)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 246, 255, 0.96) 50%, rgba(225, 235, 255, 0.94) 100%)',
              backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              border: '1.5px solid rgba(191, 219, 254, 0.85)',
              borderRadius: 24,
              boxShadow: '0 20px 50px -10px rgba(37, 99, 235, 0.25), 0 4px 16px rgba(15, 23, 42, 0.08)',
              zIndex: 99999, display: 'flex', flexDirection: 'column',
              padding: '20px', boxSizing: 'border-box', overflowY: 'auto',
              animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              {/* Header of Drawer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(191, 219, 254, 0.5)' }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: 6 }}>
                  The MentR <span style={{ fontSize: 9, padding: '1px 5px', border: '1.2px solid #2563EB', color: '#2563EB', borderRadius: 99, fontWeight: 800 }}>TM</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    background: '#F1F5F9', border: 'none', color: '#64748B', cursor: 'pointer',
                    width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Links list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {mobileNavLinks.map(item => {
                  if (item.isAccordion) {
                    return (
                      <div key={item.label} style={{ borderBottom: '1px solid rgba(191, 219, 254, 0.35)' }}>
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          style={{
                            background: 'none', border: 'none', color: '#1E293B', fontSize: 14.5,
                            fontWeight: 650, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-sans)',
                            padding: '10px 8px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            borderRadius: 10, transition: 'background 0.2s ease'
                          }}
                        >
                          <span>{item.label}</span>
                          <ChevronDown size={15} style={{ color: '#2563EB', transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }} />
                        </button>

                        {/* Expanded Services Accordion */}
                        {mobileServicesOpen && (
                          <div style={{
                            background: 'rgba(255, 255, 255, 0.7)',
                            border: '1px solid rgba(191, 219, 254, 0.6)',
                            borderRadius: 14,
                            padding: '10px 12px',
                            marginBottom: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10
                          }}>
                            {/* Section: Platform & Intelligence */}
                            <div>
                              <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#2563EB', letterSpacing: '0.06em', display: 'block', marginBottom: 4 }}>
                                Platform & Intelligence
                              </span>
                              <button
                                onClick={() => navigateAndScroll('/', 'avsar')}
                                style={{
                                  background: 'none', border: 'none', color: '#0F172A', fontSize: 13,
                                  fontWeight: 650, cursor: 'pointer', textAlign: 'left', width: '100%',
                                  padding: '4px 0', display: 'flex', flexDirection: 'column'
                                }}
                              >
                                <span>AVSAR (Student Assessment)</span>
                                <span style={{ fontSize: 11, fontWeight: 400, color: '#64748B', marginTop: 2, lineHeight: 1.35 }}>Personalized home evaluation visits.</span>
                              </button>
                            </div>

                            {/* Section: Platform Apps */}
                            <div>
                              <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#6366F1', letterSpacing: '0.06em', display: 'block', marginBottom: 4 }}>
                                Apps & Ecosystem
                              </span>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {[
                                  { title: 'The MentR parent app', path: '/#parent', id: 'showcase' },
                                  { title: 'The MentR teacher app', path: '/#teacher', id: 'showcase' },
                                  { title: 'The MentR online app', path: '/#online', id: 'showcase' },
                                  { title: 'The MentR Olympiad', path: '/#olympiad', id: 'showcase' }
                                ].map(subItem => (
                                  <button
                                    key={subItem.title}
                                    onClick={() => navigateAndScroll(subItem.path, subItem.id)}
                                    style={{
                                      background: 'none', border: 'none', color: '#334155', fontSize: 13,
                                      fontWeight: 600, cursor: 'pointer', textAlign: 'left', padding: '3px 0'
                                    }}
                                  >
                                    {subItem.title}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.label}
                      onClick={() => item.path ? navigateAndScroll(item.path, null) : navigateAndScroll('/', item.id)}
                      style={{
                        background: 'none', border: 'none', color: '#1E293B', fontSize: 14.5,
                        fontWeight: 650, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-sans)',
                        padding: '10px 8px', borderBottom: '1px solid rgba(191, 219, 254, 0.35)', borderRadius: 8
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}

                {/* Action Buttons inside Compact Mobile Drawer */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
                  <button
                    onClick={() => { setMobileMenuOpen(false); openModal('teacher'); }}
                    style={{
                      fontSize: 13,
                      padding: '10px 16px',
                      borderRadius: 99,
                      background: '#FFFFFF',
                      color: '#1E293B',
                      border: '1.5px solid rgba(59, 130, 246, 0.3)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(37, 99, 235, 0.08)',
                      width: '100%'
                    }}
                  >
                    Join as a Teacher
                  </button>

                  <button
                    onClick={() => { setMobileMenuOpen(false); openModal('demo'); }}
                    style={{
                      fontSize: 13,
                      padding: '10px 16px',
                      borderRadius: 99,
                      background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                      color: 'white',
                      border: 'none',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'center',
                      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.28)',
                      width: '100%'
                    }}
                  >
                    Book a demo
                  </button>
                </div>
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
    <header className="desktop-header-nav" style={{
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
      background: scrolled 
        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(239, 246, 255, 0.78) 50%, rgba(224, 231, 255, 0.68) 100%)' 
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(239, 246, 255, 0.6) 50%, rgba(224, 231, 255, 0.48) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: scrolled ? 24 : 30,
      border: '1px solid rgba(191, 219, 254, 0.75)',
      boxShadow: scrolled 
        ? '0 16px 48px rgba(37, 99, 235, 0.12), 0 2px 10px rgba(15, 23, 42, 0.04), inset 0 1.5px 2px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(59, 130, 246, 0.15)'
        : '0 8px 32px rgba(37, 99, 235, 0.08), inset 0 1.5px 2px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(59, 130, 246, 0.12)',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {/* Left: Logo Container with Glassmorphic Gradient & TM Badge */}
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 100 }}>
        <Logo 
          scrolled={scrolled} 
          onClick={() => navigateAndScroll('/', null)} 
        />
      </div>

      {/* Center: Navigation Links */}
      <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {desktopNavLinks.map(link => {
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
                        <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1D2433', lineHeight: 1.3 }}>
                          AVSAR (Assessment Visits & Student Assessment Reports)
                        </h4>
                        <p style={{ margin: '8px 0 0', fontSize: 11.5, color: '#5C667A', lineHeight: 1.45 }}>
                          Education must start with an assessment. We evaluate the students, understand the requirements and personalize the approach with AVSAR.
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Platform Services */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <button
                        onClick={() => { setServicesHovered(false); navigateAndScroll('/#parent', 'showcase'); }}
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
                        { title: 'The MentR parent app', desc: "Education doesn't feel like a burden, only when the parents stay informed.", path: '/#parent', id: 'showcase' },
                        { title: 'The MentR teacher app', desc: 'Search for the verified home tutor ends here.', path: '/#teacher', id: 'showcase' },
                        { title: 'The MentR online app', desc: 'Connecting with you, no matter the location.', path: '/#online', id: 'showcase' },
                        { title: 'The MentR Olympiad', desc: 'Growth can be felt only when evaluated', path: '/#olympiad', id: 'showcase' }
                      ].map(srv => (
                        <div 
                          key={srv.title} 
                          onClick={() => { setServicesHovered(false); navigateAndScroll(srv.path, srv.id); }}
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => navigateAndScroll('/', 'contact-section')}
          className="nav-link-btn"
          style={{
            background: 'none',
            border: 'none',
            fontSize: 13,
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
            fontSize: 12,
            padding: '7px 14px',
            borderRadius: 14,
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
            fontSize: 12,
            padding: '7px 14px',
            borderRadius: 14,
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

        /* Desktop-Only Hover Effects for Navbar & Logo */
        @media (min-width: 1024px) and (hover: hover) {
          .desktop-header-nav {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                        box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                        border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                        background 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .desktop-header-nav:hover {
            transform: translateX(-50%) translateY(-2px) !important;
            border-color: rgba(147, 197, 253, 0.9) !important;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(239, 246, 255, 0.85) 50%, rgba(224, 231, 255, 0.75) 100%) !important;
            box-shadow: 0 20px 60px rgba(37, 99, 235, 0.18), 
                        0 4px 16px rgba(124, 58, 237, 0.12), 
                        inset 0 2px 3px rgba(255, 255, 255, 1), 
                        inset 0 -1.5px 2.5px rgba(59, 130, 246, 0.25) !important;
          }

          .glass-logo-badge {
            transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                        box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                        border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                        background 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .glass-logo-badge:hover {
            transform: translateY(-2px) scale(1.05) !important;
            border-color: rgba(147, 197, 253, 0.95) !important;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(239, 246, 255, 0.9) 50%, rgba(224, 231, 255, 0.8) 100%) !important;
            box-shadow: 0 12px 32px rgba(37, 99, 235, 0.22), 
                        0 2px 8px rgba(124, 58, 237, 0.12), 
                        inset 0 2px 3px rgba(255, 255, 255, 1), 
                        inset 0 -1.5px 2px rgba(59, 130, 246, 0.25) !important;
          }
          .glass-logo-badge:hover .logo-emblem-fill {
            filter: drop-shadow(0 4px 12px rgba(37, 99, 235, 0.4)) !important;
          }
          .glass-logo-badge:hover .tm-badge-circle {
            transform: scale(1.15) rotate(6deg) !important;
            border-color: #2563EB !important;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35) !important;
          }
        }
      `}</style>
    </header>
  );
}
