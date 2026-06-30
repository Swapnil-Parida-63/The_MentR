import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async urls => {
  await Promise.all(
    urls.map(
      src =>
        new Promise(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

const Masonry = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const [activeCardId, setActiveCardId] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const activeItem = useMemo(() => items.find(i => i.id === activeCardId), [activeCardId, items]);

  const getInitialPosition = item => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)];
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    const allImages = items.flatMap(i => i.images || [i.img]).filter(Boolean);
    preloadImages(allImages).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' })
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  // Handle auto-playing carousel inside the active modal
  useEffect(() => {
    if (!activeCardId || !activeItem?.images || activeItem.images.length <= 1) return;

    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % activeItem.images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [activeCardId, activeItem]);

  // Close active card showcase when cursor moves far away from screen center
  useEffect(() => {
    if (!activeCardId) return;

    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      // Close if mouse is moved out of active card zone
      if (dist > 420) {
        setActiveCardId(null);
        setCarouselIndex(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeCardId]);

  const handleMouseEnter = (id, element) => {
    if (scaleOnHover && activeCardId !== id) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = (id, element) => {
    if (scaleOnHover && activeCardId !== id) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: (grid.length ? Math.max(...grid.map(i => i.y + i.h)) : 400) + 'px' }}>
      {grid.map(item => {
        const coverImg = item.images?.[0] || item.img;
        return (
          <div
            key={item.id}
            data-key={item.id}
            className="absolute box-content cursor-pointer"
            style={{ willChange: 'transform, width, height, opacity' }}
            onClick={() => {
              setActiveCardId(item.id);
              setCarouselIndex(0);
            }}
            onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
            onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
          >
            <div
              className="relative w-full h-full bg-cover bg-center rounded-[16px] shadow-[0px_10px_30px_-10px_rgba(10,22,40,0.15)] overflow-hidden transition-shadow duration-300 hover:shadow-[0px_20px_40px_-10px_rgba(10,22,40,0.25)]"
              style={{ backgroundImage: `url(${coverImg})` }}
            >
              {colorShiftOnHover && (
                <div className="color-overlay absolute inset-0 rounded-[16px] bg-gradient-to-tr from-pink-500/30 to-sky-500/30 opacity-0 pointer-events-none" />
              )}
              
              {/* Subtle Overlay Label */}
              {item.title && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-white flex flex-col justify-end pointer-events-none" style={{ height: '55%' }}>
                  <span className="text-[10px] uppercase tracking-wider font-semibold opacity-75 mb-0.5">{item.tag || 'Gallery'}</span>
                  <span className="text-[13px] font-medium leading-tight">{item.title}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Expanded Center Showcase Modal */}
      {activeCardId && activeItem && (
        <div
          onClick={() => { setActiveCardId(null); setCarouselIndex(0); }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 22, 40, 0.7)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.3s ease forwards'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="relative rounded-[28px] overflow-hidden shadow-2xl border border-white/10"
            style={{
              width: '90%',
              maxWidth: 620,
              height: 440,
              background: '#120F17',
              animation: 'scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {/* Sliding Carousel of Photos */}
            {activeItem.images && activeItem.images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-[800ms] ease-in-out"
                style={{
                  backgroundImage: `url(${imgUrl})`,
                  opacity: idx === carouselIndex ? 1 : 0,
                  zIndex: idx === carouselIndex ? 1 : 0
                }}
              />
            ))}

            {/* Info Overlay (Label, Title, Carousel Indicators) */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-8 text-white flex flex-col z-[5]" style={{ height: '60%' }}>
              <span className="text-xs uppercase tracking-widest font-semibold text-blue-400 mb-1">{activeItem.tag}</span>
              <h4 className="text-xl font-semibold mb-2 leading-snug">{activeItem.title}</h4>
              <p className="text-sm text-neutral-300/90 leading-relaxed mb-6">{activeItem.description || 'Interactive showcase of TheMentR community moments.'}</p>
              
              {/* Carousel Indicator Dots */}
              <div className="flex items-center gap-1.5 mt-auto">
                {activeItem.images && activeItem.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
                    style={{
                      background: idx === carouselIndex ? '#3b82f6' : 'rgba(255, 255, 255, 0.3)',
                      transform: idx === carouselIndex ? 'scale(1.2)' : 'none'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => { setActiveCardId(null); setCarouselIndex(0); }}
              className="absolute top-4 right-4 z-[10] w-9 h-9 rounded-full bg-black/50 border border-white/10 text-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-black/70"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Embedded Animations Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Masonry;
