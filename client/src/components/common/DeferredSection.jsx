import { useState, useEffect, useRef } from 'react';

export default function DeferredSection({
  children,
  rootMargin = '800px 0px',
  minHeight = '400px',
  id
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleForceMount = (e) => {
      if (id && (e.detail === id || e.detail === `#${id}`)) {
        setShouldRender(true);
      }
    };
    window.addEventListener('force-mount-section', handleForceMount);
    return () => window.removeEventListener('force-mount-section', handleForceMount);
  }, [id]);

  useEffect(() => {
    if (shouldRender) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [shouldRender, rootMargin]);

  return (
    <div
      ref={ref}
      id={id}
      data-mounted={shouldRender ? 'true' : 'false'}
      style={{
        minHeight: shouldRender ? 'auto' : minHeight
      }}
    >
      {shouldRender ? children : null}
    </div>
  );
}
