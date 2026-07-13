import { useEffect, useRef, useState } from 'react';
import { FadeUp } from '../../hooks/useScrollReveal';
import { Shield, Heart, MapPin, Star, Award } from 'lucide-react';

function Counter({ target, suffix, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1200, 1);
          const current = (1 - Math.pow(1 - p, 3)) * target;
          setCount(current);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals]);
  
  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function AvsarSection({ teacherCount = 500 }) {
  const [barsAnimated, setBarsAnimated] = useState(false);
  const [hoveredMetric, setHoveredMetric] = useState(null);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    const el = chartRef.current;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setBarsAnimated(true);
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const proofRows = [
    { icon: Shield, metric: null, target: teacherCount, suffix: '+', decimals: 0, label: 'Verified Teachers', desc: 'Every educator completes background verification and onboarding before joining.' },
    { icon: Heart, metric: null, target: 96, suffix: '%', decimals: 0, label: 'Parent Satisfaction Rate', desc: 'Measured continuously through real feedback and progress.' },
    { icon: MapPin, metric: null, target: 18, suffix: '+', decimals: 0, label: 'Cities Covered', desc: 'Bringing quality education to student homes across multiple locations.' },
    { icon: Star, metric: null, target: 4.8, suffix: '★', decimals: 1, label: 'Average Teacher Rating', desc: 'Maintained through ongoing reviews and quality monitoring.' },
  ];

  return (
    <section id="avsar" className="relative overflow-hidden pt-24 pb-64 sm:pt-32 sm:pb-80" style={{ background: '#fafafc' }}>
      {/* CSS Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@800&family=Space+Grotesk:wght@700&family=Inter:wght@400;500;600&display=swap');
        
        .font-sora { font-family: 'Sora', sans-serif; }
        .font-space { font-family: 'Space Grotesk', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }

        .dot-grid {
          background-image: radial-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 0);
          background-size: 24px 24px;
        }
      `}</style>

      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none dot-grid opacity-40" />

      <div className="container relative z-10 max-w-6xl mx-auto px-6 font-inter">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column (50%) */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 flex flex-col justify-start">
            <FadeUp>
              <div 
                className="flex flex-col justify-start"
                onMouseEnter={() => setIsHeaderHovered(true)}
                onMouseLeave={() => setIsHeaderHovered(false)}
              >
                <div className="text-[11px] font-semibold tracking-[0.15em] text-[#6366F1] uppercase mb-4 font-inter">
                  AVSAR
                </div>
                <div className="relative inline-block w-fit">
                  <h2 
                    className="text-4xl sm:text-5xl font-sora font-extrabold tracking-tight leading-[1.12] mb-0 max-w-[480px] cursor-pointer transition-colors duration-300"
                    style={{ color: isHeaderHovered ? '#6366F1' : '#1E293B' }}
                  >
                    We perform, you evaluate.
                  </h2>
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      height: 2.5,
                      background: '#6366F1',
                      width: isHeaderHovered ? '100%' : '0%',
                      transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </div>
                
                <div 
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    opacity: isHeaderHovered ? 1 : 0,
                    maxHeight: isHeaderHovered ? '120px' : '0px',
                    marginTop: isHeaderHovered ? '24px' : '0px'
                  }}
                >
                  <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-[480px] font-inter">
                    AVSAR is TheMentR's proprietary data layer — tracking selection rates, teacher performance, and ecosystem metrics.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Teacher Selection Rate Grid directly below texts */}
            <FadeUp delay={0.3}>
              <div ref={chartRef} className="w-full max-w-[480px] border-t border-slate-200" style={{ marginTop: '90px', paddingTop: '50px' }}>
                <h4 className="font-sora font-extrabold text-2xl sm:text-3xl text-[#1E293B] tracking-tight mb-6">
                  Teacher Selection Rate by Board
                </h4>
                
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {[
                    { label: 'CBSE', pct: 82, suffix: '%' },
                    { label: 'ICSE', pct: 71, suffix: '%' },
                    { label: 'IB', pct: 58, suffix: '%' },
                    { label: 'State Board', pct: 64, suffix: '%' },
                  ].map((b) => (
                    <div key={b.label} className="flex flex-col gap-1.5">
                      <span className="font-space text-3xl sm:text-4xl font-bold text-[#1E293B] tracking-tight leading-none">
                        <Counter target={b.pct} suffix={b.suffix} decimals={0} />
                      </span>
                      <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider font-inter">
                        {b.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column (50%) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full py-2">
            {proofRows.map((row, idx) => {
              const isHovered = hoveredMetric === idx;
              return (
                <FadeUp key={idx} delay={0.1 + idx * 0.06}>
                  <div 
                    className="flex flex-col py-6 border-b border-slate-200/40 last:border-b-0 first:pt-0 cursor-pointer"
                    onMouseEnter={() => setHoveredMetric(idx)}
                    onMouseLeave={() => setHoveredMetric(null)}
                    style={{
                      transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
                      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <div className="flex gap-4 items-start">
                      {/* Circle Indicator */}
                      <div 
                        className="mt-4 flex-shrink-0"
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          border: `1.5px solid ${isHovered ? '#6366F1' : '#64748B'}`,
                          background: isHovered ? '#6366F1' : 'transparent',
                          transition: 'all 0.3s ease'
                        }}
                      />
                      
                      <div className="flex flex-col gap-1.5 w-full">
                        <span 
                          className="font-space text-4xl sm:text-5xl font-bold tracking-tight leading-none transition-colors duration-300"
                          style={{ color: isHovered ? '#6366F1' : '#1E293B' }}
                        >
                          <Counter target={row.target} suffix={row.suffix} decimals={row.decimals} />
                        </span>
                        
                        <div className="relative inline-block w-fit">
                          <span 
                            className="text-xs sm:text-sm font-semibold uppercase tracking-wider font-inter transition-colors duration-300"
                            style={{ color: isHovered ? '#6366F1' : '#64748B' }}
                          >
                            {row.label}
                          </span>
                          <div 
                            style={{
                              position: 'absolute',
                              bottom: -2,
                              left: 0,
                              height: 1.5,
                              background: '#6366F1',
                              width: isHovered ? '100%' : '0%',
                              transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                          />
                        </div>
                        
                        <div 
                          className="overflow-hidden transition-all duration-500 ease-in-out"
                          style={{
                            opacity: isHovered ? 1 : 0,
                            maxHeight: isHovered ? '80px' : '0px',
                            marginTop: isHovered ? '12px' : '0px'
                          }}
                        >
                          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-md">
                            {row.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
