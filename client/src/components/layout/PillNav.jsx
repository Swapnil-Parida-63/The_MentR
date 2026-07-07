import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useModal } from '../../context/ModalContext';

const PillNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#120F17',
  hoveredPillTextColor = '#120F17',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true
}) => {
  const { openModal } = useModal();
  const location = useLocation();
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  // Set active link based on current location
  const currentActiveHref = activeHref ?? (location.pathname + location.hash);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
    }

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, {
          scale: 1,
          duration: 0.6,
          ease
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, {
          width: 'auto',
          duration: 0.6,
          ease
        });
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }

    onMobileMenuClick?.();
  };

  const isExternalLink = href =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = href => href && !isExternalLink(href);

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
    ['--nav-h']: '44px',
    ['--logo']: '36px',
    ['--pill-pad-x']: '18px',
    ['--pill-gap']: '3px'
  };

  return (
    <div className="fixed top-[1.2em] z-[1000] w-[95%] max-w-[1200px] left-1/2 -translate-x-1/2 pointer-events-none">
      <nav
        className={`w-full flex items-center justify-between pointer-events-auto rounded-full p-1.5 shadow-lg border border-neutral-200/50 backdrop-blur-md ${className}`}
        aria-label="Primary"
        style={{
          ...cssVars,
          backgroundColor: baseColor === '#fff' ? 'rgba(255, 255, 255, 0.85)' : baseColor
        }}
      >
        <div className="flex items-center">
          {isRouterLink(items?.[0]?.href) ? (
            <Link
              to={items[0].href}
              aria-label="Home"
              onMouseEnter={handleLogoEnter}
              role="menuitem"
              ref={el => {
                logoRef.current = el;
              }}
              className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105"
              style={{
                width: 'var(--nav-h)',
                height: 'var(--nav-h)',
                background: 'var(--pill-bg, #000)'
              }}
            >
              <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-contain block" style={{ filter: 'brightness(0) invert(1)' }} />
            </Link>
          ) : (
            <a
              href={items?.[0]?.href || '#'}
              aria-label="Home"
              onMouseEnter={handleLogoEnter}
              ref={el => {
                logoRef.current = el;
              }}
              className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105"
              style={{
                width: 'var(--nav-h)',
                height: 'var(--nav-h)',
                background: 'var(--pill-bg, #000)'
              }}
            >
              <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-contain block" style={{ filter: 'brightness(0) invert(1)' }} />
            </a>
          )}

          <div
            ref={navItemsRef}
            className="relative items-center rounded-full hidden md:flex ml-2"
            style={{
              height: 'var(--nav-h)',
              background: 'transparent'
            }}
          >
            <ul
              role="menubar"
              className="list-none flex items-stretch m-0 p-0 h-full"
              style={{ gap: 'var(--pill-gap)' }}
            >
              {items.map((item, i) => {
                const isActive = currentActiveHref === item.href;

                const pillStyle = {
                  background: isActive ? 'var(--pill-bg, #120F17)' : 'transparent',
                  color: isActive ? 'var(--hover-text, #fff)' : 'var(--pill-bg, #120F17)',
                  paddingLeft: 'var(--pill-pad-x)',
                  paddingRight: 'var(--pill-pad-x)'
                };

                const PillContent = (
                  <>
                    <span
                      className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                      style={{
                        background: 'var(--pill-bg, #120F17)',
                        willChange: 'transform'
                      }}
                      aria-hidden="true"
                      ref={el => {
                        circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack relative inline-block leading-[1] z-[2]">
                      <span
                        className="pill-label relative z-[2] inline-block leading-[1]"
                        style={{ willChange: 'transform' }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                        style={{
                          color: 'var(--hover-text, #fff)',
                          willChange: 'transform, opacity'
                        }}
                        aria-hidden="true"
                      >
                        {item.label}
                      </span>
                    </span>
                    {isActive && (
                      <span
                        className="absolute left-1/2 -bottom-[4px] -translate-x-1/2 w-1.5 h-1.5 rounded-full z-[4]"
                        style={{ background: 'var(--pill-bg, #120F17)' }}
                        aria-hidden="true"
                      />
                    )}
                  </>
                );

                const basePillClasses =
                  'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-medium text-[14px] leading-[0] transition-colors duration-200 whitespace-nowrap cursor-pointer px-0';

                return (
                  <li key={item.href} role="none" className="flex h-full">
                    {isRouterLink(item.href) ? (
                      <Link
                        role="menuitem"
                        to={item.href}
                        className={basePillClasses}
                        style={pillStyle}
                        aria-label={item.ariaLabel || item.label}
                        onMouseEnter={() => handleEnter(i)}
                        onMouseLeave={() => handleLeave(i)}
                      >
                        {PillContent}
                      </Link>
                    ) : (
                      <a
                        role="menuitem"
                        href={item.href}
                        className={basePillClasses}
                        style={pillStyle}
                        aria-label={item.ariaLabel || item.label}
                        onMouseEnter={() => handleEnter(i)}
                        onMouseLeave={() => handleLeave(i)}
                      >
                        {PillContent}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right CTA buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-2 pr-1">
          <button 
            onClick={() => openModal('teacher')} 
            className="btn btn-secondary" 
            style={{ padding: '8px 16px', fontSize: 13, borderRadius: 9999, cursor: 'pointer', height: 'var(--nav-h)', display: 'flex', alignItems: 'center' }}
          >
            Join as a Teacher
          </button>
          <button 
            onClick={() => openModal('parent')} 
            className="btn btn-primary" 
            style={{ padding: '8px 16px', fontSize: 13, borderRadius: 9999, cursor: 'pointer', height: 'var(--nav-h)', display: 'flex', alignItems: 'center', border: 'none' }}
          >
            Book a Demo
          </button>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative mr-1"
          style={{
            width: 'var(--nav-h)',
            height: 'var(--nav-h)',
            background: 'var(--pill-bg, #120F17)'
          }}
        >
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms]"
            style={{ background: 'var(--base, #fff)' }}
          />
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms]"
            style={{ background: 'var(--base, #fff)' }}
          />
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[4em] left-4 right-4 rounded-[24px] shadow-lg border border-neutral-200/50 backdrop-blur-md z-[998] origin-top"
        style={{
          ...cssVars,
          background: 'rgba(255, 255, 255, 0.95)'
        }}
      >
        <ul className="list-none m-0 p-1.5 flex flex-col gap-1">
          {items.map(item => {
            const isActive = currentActiveHref === item.href;
            const defaultStyle = {
              background: isActive ? 'var(--pill-bg, #120F17)' : 'transparent',
              color: isActive ? 'var(--hover-text, #fff)' : 'var(--pill-bg, #120F17)'
            };

            const linkClasses =
              'block py-2.5 px-4 text-[15px] font-medium rounded-full transition-all duration-200';

            return (
              <li key={item.href}>
                {isRouterLink(item.href) ? (
                  <Link
                    to={item.href}
                    className={linkClasses}
                    style={defaultStyle}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={linkClasses}
                    style={defaultStyle}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '4px 0' }} />
          <li className="flex flex-col gap-2 p-1">
            <button 
              onClick={() => { setIsMobileMenuOpen(false); openModal('teacher'); }} 
              className="btn btn-secondary" 
              style={{ width: '100%', py: 2.5, borderRadius: 9999, fontSize: 14, cursor: 'pointer' }}
            >
              Join as a Teacher
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); openModal('parent'); }} 
              className="btn btn-primary" 
              style={{ width: '100%', py: 2.5, borderRadius: 9999, fontSize: 14, cursor: 'pointer', border: 'none' }}
            >
              Book a Demo
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
