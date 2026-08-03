import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Shield, 
  UserCheck, 
  Star, 
  Award, 
  Heart, 
  LineChart, 
  Compass, 
  Target, 
  GraduationCap, 
  Users 
} from 'lucide-react';

// Hand-drawn outline doodles matching MentR themes
const doodlesMap = {
  book: (
    <path d="M 5,20 C 15,10 25,12 35,17 C 45,12 55,10 65,20 L 65,40 C 55,30 45,32 35,37 C 25,32 15,30 5,40 Z M 35,17 L 35,37" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  cap: (
    <path d="M 10,20 L 35,10 L 60,20 L 35,30 Z M 18,23 L 18,33 C 18,38 52,38 52,33 L 52,23 M 55,20 L 55,35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  bulb: (
    <path d="M 30,10 C 20,10 15,20 15,30 C 15,38 22,42 25,46 L 25,52 L 35,52 L 35,46 C 38,42 45,38 45,30 C 45,20 40,10 30,10 Z M 22,56 L 38,56" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  connect: (
    <path d="M 15,15 C 20,25 35,15 45,35 M 15,15 A 4,4 0 1,1 14.9,15 M 45,35 A 4,4 0 1,1 44.9,35 M 25,23 A 2.5,2.5 0 1,1 24.9,23" stroke="currentColor" strokeWidth="1.8" fill="none" />
  ),
  shield: (
    <path d="M 15,10 L 35,5 L 55,10 L 55,30 C 55,42 35,52 35,52 C 35,52 15,42 15,30 Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  plus: (
    <path d="M 20,40 L 35,10 L 45,40 M 24,30 L 41,30 M 48,15 L 56,15 M 52,11 L 52,19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
  ),
  heart: (
    <path d="M 30,45 C 10,30 10,10 30,22 C 50,10 50,30 30,45 Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
  ),
  magnify: (
    <path d="M 25,25 A 10,10 0 1,1 24.9,25 M 32,32 L 45,45" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
  ),
  pencil: (
    <path d="M 15,45 L 20,50 L 50,20 L 45,15 Z M 15,45 L 18,38 L 27,47 L 20,50 Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  trophy: (
    <path d="M 20,20 L 50,20 L 50,35 C 50,42 42,48 35,48 C 28,48 20,42 20,35 Z M 35,48 L 35,55 M 25,55 L 45,55 M 25,25 L 15,25 C 10,25 10,32 15,32 L 20,32 M 50,25 L 55,25 C 60,25 60,32 55,32 L 50,32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  )
};

const doodleTypes = ['book', 'cap', 'bulb', 'connect', 'shield', 'plus', 'heart', 'magnify', 'pencil', 'trophy'];

export default function GlobalThread() {
  const [height, setHeight] = useState(12000);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setHeight(document.body.scrollHeight || 12000);
    };
    
    handleResize();
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);
    
    const interval = setInterval(handleResize, 2000);

    return () => {
      window.removeEventListener('load', handleResize);
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);



  const step = 600;
  const leftAmplitudes = [90, 130, 70, 110, 80, 120, 70, 100, 80, 130, 90, 110, 75, 115, 85, 125, 70, 105, 90, 120];
  const rightAmplitudes = [120, 80, 130, 90, 110, 70, 100, 80, 120, 70, 110, 90, 115, 75, 125, 85, 105, 70, 120, 90];

  const getXForY = (yVal, side) => {
    const amplitudes = side === 'left' ? leftAmplitudes : rightAmplitudes;
    const clampedY = Math.max(0, Math.min(height, yVal));
    const idx = Math.floor(clampedY / step);
    const targetX = amplitudes[idx % amplitudes.length] || 90;
    const t = (clampedY % step) / step;
    
    const term0 = Math.pow(1 - t, 3) * 90;
    const term1 = 3 * Math.pow(1 - t, 2) * t * targetX;
    const term2 = 3 * (1 - t) * Math.pow(t, 2) * targetX;
    const term3 = Math.pow(t, 3) * 90;
    
    return term0 + term1 + term2 + term3;
  };

  const generatePath = (side, h) => {
    const amplitudes = side === 'left' ? leftAmplitudes : rightAmplitudes;
    let d = 'M 90 0';
    let idx = 0;
    for (let y = step; y < h + step; y += step) {
      const targetX = amplitudes[idx % amplitudes.length];
      const prevY = y - step;
      d += ` C ${targetX} ${prevY + step / 3}, ${targetX} ${prevY + (2 * step) / 3}, 90 ${y}`;
      idx++;
    }
    return d;
  };

  const leftPathD = generatePath('left', height);
  const rightPathD = generatePath('right', height);

  // Left Thread Badges (Y: 400, 1600, 2800, etc.)
  const leftNodes = [
    { label: 'LEARNING', icon: Compass, color: '#4F7CFF' },
    { label: 'PEDAGOGY', icon: Shield, color: '#7C5CFF' },
    { label: 'TRUST', icon: Heart, color: '#10B981' },
    { label: 'MATCHING', icon: Target, color: '#4F7CFF' },
    { label: 'MENTORSHIP', icon: GraduationCap, color: '#7C5CFF' },
    { label: 'EXCELLENCE', icon: Star, color: '#10B981' },
    { label: 'MEASURABLE', icon: LineChart, color: '#4F7CFF' },
    { label: 'COMMUNITY', icon: Users, color: '#7C5CFF' },
    { label: 'RECOGNITION', icon: Award, color: '#10B981' },
    { label: 'PURPOSE', icon: BookOpen, color: '#4F7CFF' }
  ].map((node, i) => {
    const y = i * 1200 + 400; 
    const idx = Math.floor(y / step);
    const x = leftAmplitudes[idx % leftAmplitudes.length];
    return { ...node, x, y };
  });

  // Right Thread Badges (Y: 800, 2000, 3200, etc.)
  const rightNodes = [
    { label: 'VERIFIED', icon: UserCheck, color: '#7C5CFF' },
    { label: 'DIAGNOSTICS', icon: Target, color: '#10B981' },
    { label: 'SUPPORT', icon: GraduationCap, color: '#4F7CFF' },
    { label: 'MILESTONES', icon: LineChart, color: '#7C5CFF' },
    { label: 'GUIDANCE', icon: Compass, color: '#10B981' },
    { label: 'SAFETY', icon: Shield, color: '#4F7CFF' },
    { label: 'ACCOUNTABILITY', icon: Users, color: '#7C5CFF' },
    { label: 'OLYMPIAD', icon: Star, color: '#10B981' },
    { label: 'VETTED', icon: Award, color: '#4F7CFF' },
    { label: 'GROWTH', icon: Heart, color: '#7C5CFF' }
  ].map((node, i) => {
    const y = i * 1200 + 800; 
    const idx = Math.floor(y / step);
    const x = rightAmplitudes[idx % rightAmplitudes.length];
    return { ...node, x, y };
  });

  // High Density Doodles: spaced every 115px Y-height (Approx 7-10 doodles per 1000px page)
  const leftDoodles = [];
  const rightDoodles = [];
  const doodleInterval = 115;

  let leftIdx = 0;
  for (let y = 150; y < height; y += doodleInterval) {
    // Avoid overlaps with badges
    const isNearBadge = leftNodes.some(node => Math.abs(y - node.y) < 65);
    if (!isNearBadge) {
      const x = getXForY(y, 'left');
      const type = doodleTypes[leftIdx % doodleTypes.length];
      // Alternate left/right offset from thread line to look zipper-like
      const offset = (leftIdx % 2 === 0) ? -28 : 28;
      // Alternate colors
      const color = (leftIdx % 3 === 0) ? '#4F7CFF' : (leftIdx % 3 === 1) ? '#7C5CFF' : '#10B981';
      leftDoodles.push({ type, x: x + offset, y, color });
      leftIdx++;
    }
  }

  let rightIdx = 0;
  for (let y = 150; y < height; y += doodleInterval) {
    const isNearBadge = rightNodes.some(node => Math.abs(y - node.y) < 65);
    if (!isNearBadge) {
      const x = getXForY(y, 'right');
      const type = doodleTypes[rightIdx % doodleTypes.length];
      const offset = (rightIdx % 2 === 0) ? -28 : 28;
      const color = (rightIdx % 3 === 0) ? '#10B981' : (rightIdx % 3 === 1) ? '#7C5CFF' : '#4F7CFF';
      rightDoodles.push({ type, x: x + offset, y, color });
      rightIdx++;
    }
  }

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      
      <style>{`
        .doodle-item {
          transition: transform 0.3s ease, opacity 0.3s ease;
          cursor: pointer;
        }
        .doodle-item:hover {
          opacity: 0.85 !important;
          transform: translate(-50%, -50%) scale(1.18) !important;
          filter: drop-shadow(0 0 8px currentColor);
        }
      `}</style>

      {/* LEFT SIDE MARGIN CONTENT */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: isMobile ? 40 : 240, height: '100%' }}>
        {/* Left Side Badges */}
        {!isMobile && leftNodes.map((node, idx) => {
          const IconComp = node.icon;
          if (node.y > height) return null;

          return (
            <div key={`left-node-${idx}`} style={{ position: 'absolute', top: node.y, left: node.x, pointerEvents: 'none' }}>
              {/* Glassmorphic Badge offset right */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 11px',
                background: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1.2px solid rgba(79, 124, 255, 0.12)',
                borderRadius: 100,
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)',
                whiteSpace: 'nowrap',
                zIndex: 1
              }}>
                <div style={{ color: node.color, display: 'flex', alignItems: 'center' }}>
                  <IconComp size={11} strokeWidth={2.5} />
                </div>
                <span style={{ fontSize: 8.5, fontWeight: 750, color: '#64748B', letterSpacing: '0.04em' }}>
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}

        {/* High Density Left Side Doodles */}
        {leftDoodles.map((doodle, idx) => {
          if (doodle.y > height) return null;
          return (
            <div 
              key={`left-doodle-${idx}`} 
              className="doodle-item"
              style={{ 
                position: 'absolute', 
                top: doodle.y, 
                left: isMobile ? 12 : doodle.x, 
                transform: 'translate(-50%, -50%)',
                color: doodle.color,
                opacity: isMobile ? 0.28 : 0.45,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? 28 : 44,
                height: isMobile ? 28 : 44
              }}
            >
              <svg width={isMobile ? "28" : "44"} height={isMobile ? "28" : "44"} viewBox="0 0 70 70" style={{ pointerEvents: 'auto' }}>
                {doodlesMap[doodle.type]}
              </svg>
            </div>
          );
        })}
      </div>

      {/* RIGHT SIDE MARGIN CONTENT */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: isMobile ? 40 : 240, height: '100%' }}>
        {/* Right Side Badges */}
        {!isMobile && rightNodes.map((node, idx) => {
          const IconComp = node.icon;
          if (node.y > height) return null;

          return (
            <div key={`right-node-${idx}`} style={{ position: 'absolute', top: node.y, left: node.x, pointerEvents: 'none' }}>
              {/* Glassmorphic Badge offset left */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 11px',
                background: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1.2px solid rgba(79, 124, 255, 0.12)',
                borderRadius: 100,
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)',
                whiteSpace: 'nowrap',
                zIndex: 1
              }}>
                <div style={{ color: node.color, display: 'flex', alignItems: 'center' }}>
                  <IconComp size={11} strokeWidth={2.5} />
                </div>
                <span style={{ fontSize: 8.5, fontWeight: 750, color: '#64748B', letterSpacing: '0.04em' }}>
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}

        {/* High Density Right Side Doodles */}
        {rightDoodles.map((doodle, idx) => {
          if (doodle.y > height) return null;
          return (
            <div 
              key={`right-doodle-${idx}`} 
              className="doodle-item"
              style={{ 
                position: 'absolute', 
                top: doodle.y, 
                left: isMobile ? undefined : doodle.x,
                right: isMobile ? 12 : undefined, 
                transform: 'translate(50%, -50%)', // Shift rightward for perfect gutter alignment on mobile
                color: doodle.color,
                opacity: isMobile ? 0.28 : 0.45,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? 28 : 44,
                height: isMobile ? 28 : 44
              }}
            >
              <svg width={isMobile ? "28" : "44"} height={isMobile ? "28" : "44"} viewBox="0 0 70 70" style={{ pointerEvents: 'auto' }}>
                {doodlesMap[doodle.type]}
              </svg>
            </div>
          );
        })}
      </div>

    </div>
  );
}
