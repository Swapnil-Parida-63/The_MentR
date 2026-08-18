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
      style={{
        minHeight: shouldRender ? 'auto' : minHeight
      }}
    >
      {shouldRender ? children : null}
    </div>
  );
}
