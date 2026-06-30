import React, { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const {
    threshold = 0.45, // Trigger when nearly halfway (45%) into viewport
    y = 24,
    easing = 'cubic-bezier(0.16, 1, 0.3, 1)' // Premium Stripe/Apple easeOutExpo
  } = options;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const rawDuration = options.duration !== undefined ? options.duration : 0.7;
  const rawDelay = options.delay !== undefined ? options.delay : 0;

  // Speeds adjusted to be 20% slower than the previous configure (0.7 * 1.2 = 0.84 desktop, 0.5 * 1.2 = 0.60 mobile)
  const duration = isMobile ? rawDuration * 0.60 : rawDuration * 0.84;
  const delay = isMobile ? rawDelay * 0.60 : rawDelay * 0.84;

  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    // Set initial GPU-accelerated state
    el.style.opacity = '0';
    el.style.transform = `translate3d(0, ${y}px, 0)`;
    el.style.transition = 'none';
    el.style.transitionDelay = `${delay}s`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        // Check if element is below the viewport center/bottom (scrolling down entry point)
        const isBelow = rect.top > (window.innerHeight * 0.3);

        if (entry.isIntersecting) {
          if (isBelow) {
            // Animate only when entering from the bottom (scrolling down)
            el.style.transition = `opacity ${duration}s ${easing}, transform ${duration}s ${easing}`;
            el.style.opacity = '1';
            el.style.transform = 'translate3d(0, 0, 0)';
          } else {
            // Instant visibility when entering from the top (scrolling up)
            el.style.transition = 'none';
            el.style.opacity = '1';
            el.style.transform = 'translate3d(0, 0, 0)';
          }
        } else {
          if (isBelow) {
            // Reset when scrolled past bottom so it can animate on next scroll down
            el.style.transition = 'none';
            el.style.opacity = '0';
            el.style.transform = `translate3d(0, ${y}px, 0)`;
          } else {
            // Keep visible when scrolled past top so scrolling back up does not animate
            el.style.transition = 'none';
            el.style.opacity = '1';
            el.style.transform = 'translate3d(0, 0, 0)';
          }
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, y, duration, easing, delay]);

  return ref;
}

export function FadeUp({ children, delay = 0, y = 24, duration = 0.7, threshold = 0.45, className = '', style = {} }) {
  const ref = useScrollReveal({ y, duration, delay, threshold });
  return React.createElement('div', {
    ref,
    className,
    style
  }, children);
}
