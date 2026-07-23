import React, { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const {
    threshold = 0.45, // Trigger threshold for desktop
    y = 24,
    easing = 'cubic-bezier(0.16, 1, 0.3, 1)' // Premium Stripe/Apple easeOutExpo
  } = options;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const rawDuration = options.duration !== undefined ? options.duration : 0.7;
  const rawDelay = options.delay !== undefined ? options.delay : 0;

  // On mobile: remove delay completely (0s delay), trigger as soon as it enters viewport (threshold 0)
  const duration = isMobile ? 0.15 : rawDuration * 0.84;
  const delay = isMobile ? 0 : rawDelay * 0.84;

  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isMobile) {
      // Mobile: Immediate reveal as soon as element enters field of view (0 delay, 0 threshold, all loaded at once)
      el.style.opacity = '0';
      el.style.transform = `translate3d(0, ${y > 10 ? 10 : y}px, 0)`;
      el.style.transition = 'none';
      el.style.transitionDelay = '0s';

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.transitionDelay = '0s';
            el.style.transition = `opacity ${duration}s ease-out, transform ${duration}s ease-out`;
            el.style.opacity = '1';
            el.style.transform = 'translate3d(0, 0, 0)';
          }
        },
        { threshold: 0 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      // Desktop: Keep existing desktop scroll reveal behavior exactly as is
      el.style.opacity = '0';
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      el.style.transition = 'none';
      el.style.transitionDelay = `${delay}s`;

      const observer = new IntersectionObserver(
        ([entry]) => {
          const rect = entry.boundingClientRect;
          const isBelow = rect.top > (window.innerHeight * 0.3);

          if (entry.isIntersecting) {
            if (isBelow) {
              el.style.transition = `opacity ${duration}s ${easing}, transform ${duration}s ${easing}`;
              el.style.opacity = '1';
              el.style.transform = 'translate3d(0, 0, 0)';
            } else {
              el.style.transition = 'none';
              el.style.opacity = '1';
              el.style.transform = 'translate3d(0, 0, 0)';
            }
          } else {
            if (isBelow) {
              el.style.transition = 'none';
              el.style.opacity = '0';
              el.style.transform = `translate3d(0, ${y}px, 0)`;
            } else {
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
    }
  }, [threshold, y, duration, easing, delay, isMobile]);

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
