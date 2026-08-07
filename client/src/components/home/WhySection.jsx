import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ShieldCheck, Target, TrendingUp, Award, Plus, Sparkles, Cpu } from 'lucide-react';
import Logo from '../common/Logo';

export default function WhySection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [hoveredModuleId, setHoveredModuleId] = useState(null);
  const [expandedMobileId, setExpandedMobileId] = useState(1);

  // Orbiting decorative icons
  const decorativeIcons = [
    { icon: Award, r: 165, angle: 0, speed: 45, size: 15 },
    { icon: Sparkles, r: 205, angle: Math.PI * 2 / 3, speed: 55, size: 14 },
    { icon: Cpu, r: 185, angle: Math.PI * 4 / 3, speed: 50, size: 15 },
    { icon: Target, r: 225, angle: Math.PI / 3, speed: 65, size: 15 }
  ];

  // Constellation network points in the background
  const constellationNodes = [
    { cx: 160, cy: 180, r: 1.5, delay: 0 },
    { cx: 330, cy: 120, r: 2, delay: 1 },
    { cx: 340, cy: 300, r: 1.5, delay: 2 },
    { cx: 170, cy: 320, r: 2, delay: 0.5 },
    { cx: 210, cy: 130, r: 1.5, delay: 1.5 },
    { cx: 290, cy: 370, r: 2, delay: 2.5 }
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const modules = [
    {
      id: 1,
      title: 'Assessment First',
      description: 'Every learning journey begins by understanding the requirements.',
      icon: FileText,
      emoji: '📝',
      x: 90,
      y: 110,
      curve: 'M 250,250 Q 120,200 90,110',
      pathData: 'M 250,250 Q 120,200 90,110'
    },
    {
      id: 2,
      title: 'Verified Educators',
      description: 'Every teacher is carefully screened, evaluated and continuously supported.',
      icon: ShieldCheck,
      emoji: '✅',
      x: 410,
      y: 130,
      curve: 'M 250,250 Q 380,180 410,130',
      pathData: 'M 250,250 Q 380,180 410,130'
    },
    {
      id: 3,
      title: 'Intelligent Matching',
      description: 'Students are supported based on their learning needs, goals and with flexibility.',
      icon: Target,
      emoji: '🎯',
      x: 390,
      y: 390,
      curve: 'M 250,250 Q 320,380 390,390',
      pathData: 'M 250,250 Q 320,380 390,390'
    },
    {
      id: 4,
      title: 'Built-in Accountability',
      description: 'From progress to outcome, we take every accountability, which no one else dares to.',
      icon: TrendingUp,
      emoji: '📈',
      x: 110,
      y: 370,
      curve: 'M 250,250 Q 130,300 110,370',
      pathData: 'M 250,250 Q 130,300 110,370'
    }
  ];

  // Secondary decorative nodes to increase density without clutter
  const secondaryNodes = [
    { id: 's1', label: 'Learning Style', size: 6, x: 50, y: 220, color: '#4F7CFF', curve: 'M 250,250 Q 150,230 50,220' },
    { id: 's2', label: 'Weekly Reports', size: 6, x: 340, y: 50, color: '#7C5CFF', curve: 'M 250,250 Q 300,150 340,50' },
    { id: 's3', label: 'Parent Insights', size: 7, x: 480, y: 210, color: '#4F7CFF', curve: 'M 250,250 Q 380,230 480,210', extendsOffscreen: true },
    { id: 's4', label: 'Goal Tracking', size: 6, x: 475, y: 300, color: '#7C5CFF', curve: 'M 250,250 Q 370,290 475,300', extendsOffscreen: true },
    { id: 's5', label: 'AI Assistance', size: 6, x: 190, y: 440, color: '#10B981', curve: 'M 250,250 Q 220,350 190,440' },
    { id: 's6', label: 'Homework Support', size: 6, x: 40, y: 450, color: '#4F7CFF', curve: 'M 250,250 Q 140,360 40,450' },
    { id: 's7', label: 'Olympiad', size: 6, x: 430, y: 460, color: '#7C5CFF', curve: 'M 250,250 Q 350,380 430,460' },
    { id: 's8', label: 'Feedback', size: 6, x: 210, y: 70, color: '#4F7CFF', curve: 'M 250,250 Q 230,150 210,70' },
    { id: 's9', label: 'Attendance', size: 6, x: 520, y: 380, color: '#10B981', curve: 'M 250,250 Q 420,330 520,380', extendsOffscreen: true }
  ];

  // A highly irregular, winding, hand-drawn curve (random waves wrapping text and returning to core)
  const backgroundPaths = [
    { 
      id: 'single-loop', 
      d: 'M 250,250 C 180,350 -20,480 -120,380 C -220,280 -450,450 -450,260 C -450,70 -350,10 -150,120 C 20,230 120,80 250,250', 
      color: '#7C5CFF', 
      duration: 20
    }
  ];

  return (
    <section 
      id="why" 
      style={{ 
        background: 'transparent', 
        padding: isMobile ? '140px 0 100px' : '150px 0', 
        position: 'relative', 
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)',
        borderBottom: '1px solid rgba(79, 124, 255, 0.05)'
      }}
    >
      {/* Ambient gradient circles behind network to create depth */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '320px',
        height: '320px',
        background: 'radial-gradient(circle, rgba(79, 124, 255, 0.045) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '5%',
        width: '380px',
        height: '380px',
        background: 'radial-gradient(circle, rgba(124, 92, 255, 0.035) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      {/* Left side ambient glow */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '5%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(79, 124, 255, 0.02) 0%, rgba(124, 92, 255, 0.008) 50%, transparent 80%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      {/* Faint center mesh glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '650px',
        height: '650px',
        background: 'radial-gradient(circle, rgba(124, 92, 255, 0.02) 0%, rgba(79, 124, 255, 0.008) 60%, transparent 80%)',
        filter: 'blur(90px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '0.42fr 0.58fr',
          gap: isMobile ? '64px' : '80px',
          alignItems: 'center'
        }}>
          
          {/* ============================================================== */}
          {/* LEFT SIDE: Heading block (Exactly Unchanged)                   */}
          {/* ============================================================== */}
          <div style={{ textAlign: 'left', maxWidth: 480 }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: 12, 
              color: '#4F7CFF', 
              letterSpacing: '0.15em', 
              display: 'block',
              marginBottom: 16
            }}>
              We are The MentR
            </span>
            
            <h2 style={{
              fontFamily: 'var(--font-hero)',
              fontWeight: 800,
              fontSize: isMobile ? 'clamp(32px, 8vw, 44px)' : 'clamp(44px, 3.8vw, 56px)',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: '#1E293B',
              margin: 0
            }}>
              We didn't just<br />
              build another<br />
              marketplace.
            </h2>
            
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 16,
              color: '#64748B',
              lineHeight: 1.7,
              marginTop: 24,
              maxWidth: 420
            }}>
              We built a coordinated learning ecosystem. Every component works in unison to guide, verify, match, and sustain accountability for a personal learning journey.
            </p>
          </div>

          {/* ============================================================== */}
          {/* RIGHT SIDE: Interactive Ecosystem Visualization                */}
          {/* ============================================================== */}
          <div>
            {isMobile ? (
              /* MOBILE LAYOUT: Glassmorphic Expandable Timeline Accordion Cards */
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px', 
                position: 'relative',
              }}>
                {/* Connecting Neon Vertical Line */}
                <div style={{
                  position: 'absolute',
                  left: 42,
                  top: 30,
                  bottom: 30,
                  width: 3,
                  background: 'linear-gradient(180deg, #4F7CFF 0%, #7C5CFF 50%, #10B981 100%)',
                  boxShadow: '0 0 10px rgba(124, 92, 255, 0.5)',
                  zIndex: 0,
                  opacity: 0.75
                }} />

                {modules.map((mod) => {
                  const isExpanded = expandedMobileId === mod.id;
                  const IconComp = mod.icon;
                  return (
                    <div 
                      key={mod.id} 
                      onClick={() => setExpandedMobileId(isExpanded ? null : mod.id)}
                      style={{ 
                        display: 'flex', 
                        gap: '18px', 
                        alignItems: 'center', 
                        position: 'relative', 
                        zIndex: 1,
                        background: isExpanded 
                          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.99) 0%, rgba(124, 92, 255, 0.04) 100%)' 
                          : 'rgba(255, 255, 255, 0.65)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: isExpanded 
                          ? '1.5px solid rgba(124, 92, 255, 0.3)' 
                          : '1px solid rgba(79, 124, 255, 0.06)',
                        borderLeft: isExpanded 
                          ? '4px solid #7C5CFF' 
                          : '1.5px solid rgba(79, 124, 255, 0.06)',
                        borderRadius: 20,
                        padding: '18px 22px',
                        boxShadow: isExpanded 
                          ? '0 16px 36px rgba(124, 92, 255, 0.12), 0 0 12px rgba(124, 92, 255, 0.04)' 
                          : '0 4px 16px rgba(15, 23, 42, 0.01)',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      {/* Enclosed Icon Circle with pulsing active state rings */}
                      <div style={{
                        position: 'relative',
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        border: isExpanded 
                          ? '1.5px solid rgba(124, 92, 255, 0.45)' 
                          : '1px solid rgba(79, 124, 255, 0.1)',
                        color: isExpanded ? '#7C5CFF' : '#4F7CFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: isExpanded 
                          ? '0 0 12px rgba(124, 92, 255, 0.25)' 
                          : '0 2px 6px rgba(0,0,0,0.02)',
                        transition: 'all 0.3s'
                      }}>
                        {isExpanded && (
                          <motion.div
                            animate={{ scale: [1, 1.35, 1], opacity: [0.65, 0, 0.65] }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                            style={{
                              position: 'absolute',
                              inset: -5,
                              borderRadius: '50%',
                              border: '1.5px solid #7C5CFF',
                              pointerEvents: 'none'
                            }}
                          />
                        )}
                        <IconComp size={22} strokeWidth={2.2} />
                      </div>

                      {/* Header and Collapsible Body */}
                      <div style={{ textAlign: 'left', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <h4 style={{ 
                            margin: 0, 
                            fontSize: '15.5px', 
                            fontWeight: 750, 
                            color: isExpanded ? '#7C5CFF' : '#1E293B',
                            transition: 'color 0.3s'
                          }}>
                            {mod.title}
                          </h4>
                          <motion.div
                            animate={{ rotate: isExpanded ? 45 : 0 }}
                            transition={{ duration: 0.25 }}
                            style={{
                              color: isExpanded ? '#7C5CFF' : '#64748B',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Plus size={18} strokeWidth={2.5} />
                          </motion.div>
                        </div>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              transition={{ duration: 0.28, ease: "easeInOut" }}
                              style={{ overflow: 'hidden' }}
                            >
                              <p style={{ 
                                margin: 0, 
                                fontSize: '13px', 
                                lineHeight: 1.6, 
                                color: '#64748B',
                                fontWeight: 400
                              }}>
                                {mod.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* DESKTOP LAYOUT: Interactive Spheres that morph to Cards on Hover */
              <div style={{
                position: 'relative',
                width: 500,
                height: 500,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                
                {/* Dotted Background Grid for software design depth */}
                <div style={{
                  position: 'absolute',
                  inset: -20,
                  backgroundImage: 'radial-gradient(rgba(79, 124, 255, 0.08) 1.2px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  pointerEvents: 'none',
                  zIndex: 0
                }} />

                {/* Ghost UI Panels in background */}
                <div style={{
                  position: 'absolute',
                  top: 50,
                  right: 210,
                  width: 120,
                  height: 70,
                  borderRadius: 8,
                  background: 'rgba(255, 255, 255, 0.25)',
                  border: '1px solid rgba(79, 124, 255, 0.06)',
                  boxShadow: '0 4px 12px rgba(10, 22, 40, 0.01)',
                  opacity: 0.08,
                  transform: 'rotate(-4deg)',
                  pointerEvents: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  padding: 8,
                  zIndex: 0
                }}>
                  <div style={{ width: 30, height: 4, background: 'rgba(29,36,51,0.2)', borderRadius: 2 }} />
                  <div style={{ width: 80, height: 3, background: 'rgba(29,36,51,0.1)', borderRadius: 2.5 }} />
                  <div style={{ width: 65, height: 3, background: 'rgba(29,36,51,0.1)', borderRadius: 2.5 }} />
                </div>

                {/* SVG Connections, Guides & Orbit Rings */}
                <svg 
                  width="500" 
                  height="500" 
                  viewBox="0 0 500 500" 
                  style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none', zIndex: 1 }}
                >
                  <defs>
                    <linearGradient id="whyLineGradRefined" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#4F7CFF" />
                      <stop offset="100%" stopColor="#7C5CFF" />
                    </linearGradient>
                  </defs>

                  {/* Concentric orbit rings in background (2-5% opacity) */}
                  <circle cx="250" cy="250" r="70" stroke="rgba(124, 92, 255, 0.03)" strokeWidth="1" fill="none" />
                  <circle cx="250" cy="250" r="100" stroke="rgba(79, 124, 255, 0.05)" strokeWidth="1.2" fill="none" />
                  <circle cx="250" cy="250" r="130" stroke="rgba(124, 92, 255, 0.02)" strokeWidth="1" strokeDasharray="2 4" fill="none" />
                  <circle cx="250" cy="250" r="155" stroke="rgba(124, 92, 255, 0.04)" strokeWidth="1" strokeDasharray="3 6" fill="none" />
                  <circle cx="250" cy="250" r="180" stroke="rgba(79, 124, 255, 0.025)" strokeWidth="1.2" fill="none" />
                  <circle cx="250" cy="250" r="210" stroke="rgba(79, 124, 255, 0.03)" strokeWidth="1.2" fill="none" />
                  <circle cx="250" cy="250" r="230" stroke="rgba(124, 92, 255, 0.015)" strokeWidth="1" strokeDasharray="4 8" fill="none" />
                  <ellipse cx="250" cy="250" rx="270" ry="150" stroke="rgba(124, 92, 255, 0.04)" strokeWidth="1" transform="rotate(-30 250 250)" fill="none" />

                  {/* Constellation Nodes inside background network */}
                  {constellationNodes.map((n, i) => (
                    <g key={`const-${i}`}>
                      <motion.circle
                        cx={n.cx}
                        cy={n.cy}
                        r={n.r}
                        fill="rgba(124, 92, 255, 0.35)"
                        animate={{ opacity: [0.15, 0.55, 0.15], scale: [1, 1.35, 1] }}
                        transition={{ repeat: Infinity, duration: 4, delay: n.delay }}
                      />
                      {i < constellationNodes.length - 1 && (
                        <line
                          x1={n.cx}
                          y1={n.cy}
                          x2={constellationNodes[i + 1].cx}
                          y2={constellationNodes[i + 1].cy}
                          stroke="rgba(124, 92, 255, 0.04)"
                          strokeWidth="0.8"
                        />
                      )}
                    </g>
                  ))}

                  {/* Text-to-Ecosystem Visual Bridge Line */}
                  <g style={{ opacity: hoveredModuleId !== null ? 0.3 : 1, transition: 'opacity 0.35s' }}>
                    <path
                      d="M -220,100 Q -100,50 -40,160 T 250,250"
                      stroke="rgba(124, 92, 255, 0.08)"
                      strokeWidth="3.5"
                      fill="none"
                      style={{ filter: 'blur(2px)' }}
                    />
                    <path
                      d="M -220,100 Q -100,50 -40,160 T 250,250"
                      stroke="rgba(124, 92, 255, 0.18)"
                      strokeWidth="1.2"
                      strokeDasharray="3 6"
                      fill="none"
                    />
                    <motion.circle
                      r="2.5"
                      fill="#7C5CFF"
                      style={{
                        offsetPath: 'path("M -220,100 Q -100,50 -40,160 T 250,250")',
                        filter: 'drop-shadow(0 0 3px #7C5CFF)',
                      }}
                      animate={{ offsetDistance: ["0%", "100%"] }}
                      transition={{
                        repeat: Infinity,
                        duration: 10,
                        ease: "linear"
                      }}
                    />
                  </g>

                  {/* Swooping glowing background lines wrapping around left-side text (Solid Winding Waves with Sliding Laser Glow) */}
                  {backgroundPaths.map(path => (
                    <g key={path.id}>
                      {/* Blurred backing glow */}
                      <path
                        d={path.d}
                        stroke={path.color}
                        strokeWidth="5"
                        fill="none"
                        style={{
                          opacity: 0.12,
                          filter: 'blur(3.5px)'
                        }}
                      />
                      {/* Solid sharp base line */}
                      <path
                        d={path.d}
                        stroke={path.color === '#4F7CFF' ? 'rgba(79, 124, 255, 0.28)' : 'rgba(124, 92, 255, 0.22)'}
                        strokeWidth="1.5"
                        fill="none"
                      />
                      {/* Sliding glowing energy pulse segment */}
                      <motion.path
                        d={path.d}
                        stroke={path.color}
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0.12, pathOffset: 0 }}
                        animate={{ pathOffset: [0, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: path.duration,
                          ease: "linear",
                          delay: Math.random() * 2
                        }}
                        style={{
                          filter: `drop-shadow(0 0 6px ${path.color})`,
                          opacity: 0.85
                        }}
                      />
                    </g>
                  ))}

                  {/* Connectors mapping for main interactive modules — Vibrant Neon Purple Glow */}
                  {modules.map(mod => {
                    const isSelected = hoveredModuleId === mod.id;
                    const isAnySelected = hoveredModuleId !== null;
                    return (
                      <g key={`connector-${mod.id}`}>
                        {/* Underlying connection line */}
                        <path
                          d={mod.curve}
                          stroke="rgba(124, 92, 255, 0.08)"
                          strokeWidth="2"
                          fill="none"
                        />
                        {/* Interactive flow path with custom gradients and dash offset */}
                        <motion.path
                          d={mod.curve}
                          stroke="url(#whyLineGradRefined)"
                          strokeWidth={isSelected ? 3.0 : 1.8}
                          strokeDasharray="6 20"
                          fill="none"
                          animate={{ strokeDashoffset: [0, -52] }}
                          transition={{
                            repeat: Infinity,
                            duration: isSelected ? 3 : 6,
                            ease: "linear"
                          }}
                          style={{
                            opacity: isAnySelected ? (isSelected ? 1 : 0.25) : 0.6,
                            filter: isSelected ? 'drop-shadow(0 0 4px rgba(124, 92, 255, 0.6))' : 'none',
                            transition: 'all 0.35s ease'
                          }}
                        />
                      </g>
                    );
                  })}

                  {/* Slow, subtle glowing data flow particles traveling along connectors */}
                  {modules.map((mod, index) => {
                    const isSelected = hoveredModuleId === mod.id;
                    const duration = [14, 18, 13, 16][index];
                    return (
                      <g key={`flow-particle-grp-${mod.id}`}>
                        {/* Standard flowing particle */}
                        <motion.circle
                          r="3"
                          fill="#D8B4FE"
                          style={{ 
                            offsetPath: `path("${mod.pathData}")`,
                            filter: 'drop-shadow(0 0 5px #7C5CFF)',
                            opacity: hoveredModuleId === null || hoveredModuleId === mod.id ? 0.95 : 0.2,
                            transition: 'opacity 0.35s'
                          }}
                          animate={{ offsetDistance: ["0%", "100%"] }} // flow from the Core to the outer nodes
                          transition={{
                            repeat: Infinity,
                            duration: duration,
                            ease: "linear",
                            delay: index * 1.5
                          }}
                        />
                        {/* High-speed pulse on hover */}
                        {isSelected && (
                          <motion.circle
                            r="4.5"
                            fill="#FFFFFF"
                            style={{
                              offsetPath: `path("${mod.pathData}")`,
                              filter: 'drop-shadow(0 0 8px #7C5CFF) drop-shadow(0 0 4px #7C5CFF)',
                              opacity: 1
                            }}
                            animate={{ offsetDistance: ["0%", "100%"] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.8,
                              ease: "easeOut"
                            }}
                          />
                        )}
                      </g>
                    );
                  })}

                  {/* Secondary Nodes Connection Lines */}
                  {secondaryNodes.map(node => (
                    <path
                      key={`sec-line-${node.id}`}
                      d={node.curve}
                      stroke="rgba(226, 232, 240, 0.35)"
                      strokeWidth="0.8"
                      fill="none"
                      style={{
                        opacity: hoveredModuleId !== null ? 0.15 : 0.6,
                        transition: 'opacity 0.35s ease'
                      }}
                    />
                  ))}
                </svg>
                {/* Orbiting Decorative Icons (Desktop only, Orbiting MentR Core at very low opacity) */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  zIndex: 2
                }}>
                  {decorativeIcons.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={`orbit-icon-${idx}`}
                        style={{
                          position: 'absolute',
                          color: '#7C5CFF',
                          opacity: hoveredModuleId !== null ? 0.05 : 0.15,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'opacity 0.35s ease'
                        }}
                        animate={{
                          x: [
                            item.r * Math.cos(item.angle),
                            item.r * Math.cos(item.angle + Math.PI * 2)
                          ],
                          y: [
                            item.r * Math.sin(item.angle),
                            item.r * Math.sin(item.angle + Math.PI * 2)
                          ],
                          rotate: [0, 360]
                        }}
                        transition={{
                          x: { repeat: Infinity, duration: item.speed, ease: "linear" },
                          y: { repeat: Infinity, duration: item.speed, ease: "linear" },
                          rotate: { repeat: Infinity, duration: item.speed, ease: "linear" }
                        }}
                      >
                        <Icon size={item.size} />
                      </motion.div>
                    );
                  })}
                </div>

                           {/* Central "MentR Core" Live Engine Node */}
                <motion.div 
                  whileHover={{ 
                    scale: 1.1, 
                    boxShadow: '0 25px 60px rgba(124, 92, 255, 0.3), 0 0 20px rgba(79, 124, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.6)',
                    borderColor: 'rgba(124, 92, 255, 0.65)'
                  }}
                  animate={{
                    scale: hoveredModuleId ? 1.05 : [1, 1.02, 1],
                    borderColor: hoveredModuleId ? 'rgba(124, 92, 255, 0.45)' : 'rgba(124, 92, 255, 0.35)'
                  }}
                  transition={{
                    scale: hoveredModuleId ? { type: 'spring', stiffness: 300, damping: 20 } : { repeat: Infinity, duration: 6, ease: "easeInOut" }
                  }}
                  style={{
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                    position: 'absolute',
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #BAE6FD 0%, #C7D2FE 55%, #DDD6FE 100%)',
                    border: '1.5px solid rgba(124, 92, 255, 0.35)',
                    boxShadow: '0 20px 50px rgba(124, 92, 255, 0.18), 0 4px 16px rgba(15, 23, 42, 0.04), inset 0 0 20px rgba(255, 255, 255, 0.45)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 5,
                    userSelect: 'none'
                  }}
                >
                  {/* Outer Pulsing ambient glows (Multiple layered delays) */}
                  <motion.div
                    animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    style={{
                      position: 'absolute',
                      inset: -12,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(124, 92, 255, 0.12) 0%, transparent 70%)',
                      filter: 'blur(6px)',
                      pointerEvents: 'none',
                      zIndex: -1
                    }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.55, 1], opacity: [0.25, 0, 0.25] }}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                    style={{
                      position: 'absolute',
                      inset: -24,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(79, 124, 255, 0.08) 0%, transparent 70%)',
                      filter: 'blur(8px)',
                      pointerEvents: 'none',
                      zIndex: -1
                    }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.15, 0, 0.15] }}
                    transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 2 }}
                    style={{
                      position: 'absolute',
                      inset: -36,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(124, 92, 255, 0.05) 0%, transparent 70%)',
                      filter: 'blur(10px)',
                      pointerEvents: 'none',
                      zIndex: -1
                    }}
                  />
                  
                  {/* Layered opposite rotating guide circles */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                    style={{
                      position: 'absolute',
                      inset: -20,
                      borderRadius: '50%',
                      border: '1.2px dashed rgba(124, 92, 255, 0.08)',
                      pointerEvents: 'none'
                    }}
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                    style={{
                      position: 'absolute',
                      inset: -40,
                      borderRadius: '50%',
                      border: '1px dashed rgba(79, 124, 255, 0.06)',
                      pointerEvents: 'none'
                    }}
                  />
                  
                  {/* Core micro-particles */}
                  {[
                    { id: 1, top: -10, left: 20, delay: 0 },
                    { id: 2, top: 40, left: 120, delay: 1.5 },
                    { id: 3, top: 110, left: 50, delay: 3 },
                    { id: 4, top: 80, left: -20, delay: 0.5 },
                  ].map(pt => (
                    <motion.div
                      key={`core-pt-${pt.id}`}
                      animate={{
                        x: [0, 8, -4, 0],
                        y: [0, -10, 6, 0]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 8,
                        ease: "easeInOut",
                        delay: pt.delay
                      }}
                      style={{
                        position: 'absolute',
                        top: pt.top,
                        left: pt.left,
                        width: 3.5,
                        height: 3.5,
                        borderRadius: '50%',
                        background: '#7C5CFF',
                        opacity: 0.5,
                        boxShadow: '0 0 6px #7C5CFF',
                        pointerEvents: 'none'
                      }}
                    />
                  ))}
                  
                  <Logo height={52} showTm={true} style={{ pointerEvents: 'none' }} />
                </motion.div>

                {/* Secondary Decorative Nodes (Pill badges, low opacity, connected off-screen) */}
                {secondaryNodes.map(node => {
                  return (
                    <div
                      key={node.id}
                      style={{
                        position: 'absolute',
                        left: node.x - (node.size / 2),
                        top: node.y - (node.size / 2),
                        zIndex: 4,
                        display: 'flex',
                        alignItems: 'center',
                        pointerEvents: 'none'
                      }}
                    >
                      {/* Node Dot */}
                      <div style={{
                        width: node.size,
                        height: node.size,
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.4)',
                        border: '1px solid rgba(79, 124, 255, 0.08)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
                        opacity: 0.35
                      }} />
                      {/* Delicate software text label */}
                      <span style={{
                        marginLeft: 8,
                        fontSize: 7.5,
                        fontWeight: 650,
                        color: '#64748B',
                        opacity: 0.28,
                        letterSpacing: '0.05em',
                        whiteSpace: 'nowrap'
                      }}>
                        {node.label.toUpperCase()}
                      </span>
                    </div>
                  );
                })}

                {/* Spheres that morph into cards upon hovering (Floating, Breathing & Highly Clickable 3D Glass spheres) */}
                {modules.map(mod => {
                  const isSelected = hoveredModuleId === mod.id;
                  const isAnySelected = hoveredModuleId !== null;
                  const IconComp = mod.icon;

                  return (
                    <div
                      key={mod.id}
                      onMouseEnter={() => setHoveredModuleId(mod.id)}
                      onMouseLeave={() => setHoveredModuleId(null)}
                      style={{
                        position: 'absolute',
                        left: mod.x, 
                        top: mod.y,
                        zIndex: 6,
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <motion.div
                        layout // morph shapes smoothly
                        animate={{
                          width: isSelected ? 240 : 68, // slightly larger spheres
                          height: isSelected ? 120 : 68,
                          borderRadius: isSelected ? 16 : 34,
                          y: isSelected ? 0 : [0, -6, 0] // floating breathing loop
                        }}
                        transition={{
                          width: { type: "spring", stiffness: 350, damping: 26 },
                          height: { type: "spring", stiffness: 350, damping: 26 },
                          borderRadius: { type: "spring", stiffness: 350, damping: 26 },
                          y: isSelected ? { duration: 0.2 } : { repeat: Infinity, duration: 4 + mod.id, ease: "easeInOut" }
                        }}
                        style={{
                          background: isSelected 
                            ? 'rgba(255, 255, 255, 0.98)' 
                            : 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.96) 0%, rgba(248, 250, 252, 0.94) 65%, rgba(238, 242, 255, 0.8) 100%)', // premium 3D glass sphere gradient
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: isSelected 
                            ? '1.8px solid rgba(124, 92, 255, 0.55)' 
                            : '2px solid rgba(79, 124, 255, 0.16)', // thicker border for visibility
                          boxShadow: isSelected 
                            ? '0 20px 40px rgba(124, 92, 255, 0.18), inset 0 0 12px rgba(124, 92, 255, 0.05)' 
                            : '0 8px 24px rgba(79, 124, 255, 0.1), inset 0 0 8px rgba(255, 255, 255, 0.8)', // inviting soft glow shadow
                          display: 'flex',
                          alignItems: isSelected ? 'flex-start' : 'center',
                          justifyContent: isSelected ? 'flex-start' : 'center',
                          padding: isSelected ? '14px' : '0px',
                          boxSizing: 'border-box',
                          cursor: 'pointer',
                          opacity: isAnySelected ? (isSelected ? 1.0 : 0.28) : 1.0,
                          transition: 'opacity 0.35s ease, border 0.35s ease',
                          overflow: 'hidden',
                          position: 'relative'
                        }}
                      >
                        {/* Subtle violet active indicator dot */}
                        {!isSelected && (
                          <motion.div 
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            style={{
                              position: 'absolute',
                              top: 6,
                              right: 6,
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              background: '#7C5CFF', // brand violet
                              boxShadow: '0 0 6px #7C5CFF',
                              zIndex: 10
                            }} 
                          />
                        )}

                        {/* Inviting breathing halo ring */}
                        {!isSelected && (
                          <motion.div
                            animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0, 0.25] }}
                            transition={{ repeat: Infinity, duration: 3.5 + mod.id, ease: "easeInOut" }}
                            style={{
                              position: 'absolute',
                              inset: -6,
                              borderRadius: '50%',
                              border: '1.2px solid rgba(124, 92, 255, 0.22)',
                              pointerEvents: 'none'
                            }}
                          />
                        )}

                        {isSelected ? (
                          // Hover State Card Layout
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.08 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'left', width: '100%' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <div style={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                background: 'rgba(124, 92, 255, 0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#7C5CFF'
                              }}>
                                <IconComp size={15} strokeWidth={2.2} />
                              </div>
                              <span style={{ fontSize: 13, fontWeight: 750, color: '#1E293B' }}>{mod.title}</span>
                            </div>
                            
                            <p style={{ 
                              margin: 0, 
                              fontSize: 11.5, 
                              lineHeight: 1.45, 
                              color: '#64748B', 
                              fontWeight: 400 
                            }}>
                              {mod.description}
                            </p>
                          </motion.div>
                        ) : (
                          // Default State Sphere Layout
                          <div style={{ color: '#4F7CFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconComp size={26} strokeWidth={2.2} />
                          </div>
                        )}
                      </motion.div>

                      {/* Visible title labels below default spheres */}
                      {!isSelected && (
                        <span style={{
                          position: 'absolute',
                          top: 76,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: 11,
                          fontWeight: 750,
                          color: '#1E293B',
                          letterSpacing: '0.01em',
                          whiteSpace: 'nowrap',
                          opacity: 0.9,
                          textAlign: 'center',
                          pointerEvents: 'none'
                        }}>
                          {mod.title}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
