import { useState } from 'react';
import { FadeUp } from '../../hooks/useScrollReveal';
import BorderGlow from './BorderGlow';

const depts = [
  { 
    x: 50, w: 140, center: 120, 
    title: 'Academics', 
    sub: 'Curriculum & Quality', 
    bg: '#EEF2FF', stroke: '#C7D2FE', tc: '#3730A3', sc: '#6366F1',
    details: 'Develops standardized diagnostic assessments, aligns teaching materials to boards (CBSE, ICSE, IB, State), and ensures pedagogy matches student learning styles.'
  },
  { 
    x: 225, w: 150, center: 300, 
    title: 'Teacher Relations', 
    sub: 'Verification & Support', 
    bg: '#ECFDF5', stroke: '#A7F3D0', tc: '#065F46', sc: '#059669',
    details: 'Manages the 5-step teacher vetting process (qualification checks, demos, subject reviews, background screening). Only top 20% of applicants are onboarded.'
  },
  { 
    x: 375, w: 150, center: 450, 
    title: 'Product & Tech', 
    sub: 'Platform & AVSAR', 
    bg: '#F0F4FF', stroke: '#BFDBFE', tc: '#1E40AF', sc: '#3B82F6',
    details: 'Powers the core platforms for scheduling, progress tracking, and parents reporting. Drives AVSAR—our proprietary educational intelligence data layer.'
  },
  { 
    x: 525, w: 150, center: 600, 
    title: 'Operations', 
    sub: 'Logistics & Visits', 
    bg: '#FFF7ED', stroke: '#FDE68A', tc: '#92400E', sc: '#D97706',
    details: 'Coordinates physical assessment visits to homes, manages teacher match logistics, and maintains customer service operations for daily feedback loops.'
  },
  { 
    x: 710, w: 150, center: 785, 
    title: 'Growth', 
    sub: 'Marketing & SEO', 
    bg: '#FDF4FF', stroke: '#E9D5FF', tc: '#6D28D9', sc: '#7C3AED',
    details: 'Drives localized outreach campaigns, parent onboarding content, SEO optimizations, and helps spread MentR\'s outcomes-based philosophy to new cities.'
  }
];

export default function OrganogramSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const activeDept = hoveredIndex !== null ? depts[hoveredIndex] : null;

  return (
    <section id="organogram" className="section" style={{ background: '#FAFBFF', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background ambient radial glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '-10%',
        width: 350,
        height: 350,
        background: 'radial-gradient(circle, rgba(79, 124, 255, 0.03) 0%, transparent 70%)',
        filter: 'blur(30px)',
        pointerEvents: 'none'
      }} />

      <div className="container">
        <FadeUp><div className="eyebrow">Organisation</div></FadeUp>
        <FadeUp delay={0.1} duration={0.8} y={24}>
          <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 44px)', marginBottom: 20, fontFamily: 'var(--font-display)', fontWeight: 500, color: '#1D2433' }}>
            How TheMentR is structured
          </h2>
        </FadeUp>
        <FadeUp delay={0.2} duration={0.7} y={12}>
          <p style={{ maxWidth: 580, color: 'var(--color-text-secondary)', marginBottom: 60, fontSize: 16, lineHeight: 1.8 }}>
            Interactive blueprint of our operations. Hover over any department to trace how data and pedagogy flow through our ecosystem.
          </p>
        </FadeUp>

        <FadeUp delay={0.3} y={16}>
          <BorderGlow borderRadius={24} backgroundColor="#FFFFFF">
            <div style={{ padding: '48px 40px', overflowX: 'auto', cursor: 'default' }}>
              <svg viewBox="0 0 900 380" fill="none" style={{ width: '100%', minWidth: 720 }}>
                {/* Default Connection Lines */}
                <line x1="450" y1="76" x2="450" y2="110" stroke="#E2E8F0" strokeWidth="1.5" />
                <line x1="120" y1="110" x2="785" y2="110" stroke="#E2E8F0" strokeWidth="1.5" />
                {[120, 300, 450, 600, 785].map(x => (
                  <line key={x} x1={x} y1="110" x2={x} y2="136" stroke="#E2E8F0" strokeWidth="1.5" />
                ))}

                {/* Bottom default connections */}
                <path d="M 450,186 Q 450,240 350,295" fill="none" stroke="#E2E8F0" strokeWidth="1.2" strokeDasharray="3 3" />
                <path d="M 450,186 Q 450,240 550,295" fill="none" stroke="#E2E8F0" strokeWidth="1.2" strokeDasharray="3 3" />

                {/* Interactive Flowing Glowing Lines (Overlay when department is hovered) */}
                {activeDept && (
                  <>
                    <path
                      d={`M 450,76 L 450,110 L ${activeDept.center},110 L ${activeDept.center},136`}
                      fill="none"
                      stroke="url(#flow-grad-main)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="svg-flowing-stroke"
                    />
                    <path
                      d={`M ${activeDept.center},186 Q ${activeDept.center},240 350,295`}
                      fill="none"
                      stroke="url(#flow-grad-main)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="svg-flowing-stroke"
                    />
                    <path
                      d={`M ${activeDept.center},186 Q ${activeDept.center},240 550,295`}
                      fill="none"
                      stroke="url(#flow-grad-main)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="svg-flowing-stroke"
                    />
                  </>
                )}

                {/* SVG Gradients definitions */}
                <defs>
                  <linearGradient id="flow-grad-main" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F7CFF" />
                    <stop offset="100%" stopColor="#7469F8" />
                  </linearGradient>
                </defs>

                {/* Founders & Leadership Node */}
                <g style={{ cursor: 'pointer' }}>
                  <rect x="360" y="20" width="180" height="56" rx="12" fill="#0F172A" />
                  <text x="450" y="44" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="13" fontWeight="700" fill="white">TheMentR</text>
                  <text x="450" y="62" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10.5" fill="rgba(255,255,255,0.65)">Founders & Leadership</text>
                </g>

                {/* Departments Nodes */}
                {depts.map((d, idx) => {
                  const isHovered = idx === hoveredIndex;
                  return (
                    <g 
                      key={d.title} 
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={{ 
                        cursor: 'pointer',
                        transform: isHovered ? 'translateY(-3px)' : 'none',
                        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        transformOrigin: `${d.x + d.w / 2}px 161px`
                      }}
                    >
                      <rect 
                        x={d.x} 
                        y="136" 
                        width={d.w} 
                        height="50" 
                        rx="10" 
                        fill={d.bg} 
                        stroke={isHovered ? '#4F7CFF' : d.stroke} 
                        strokeWidth={isHovered ? 1.5 : 1}
                        style={{ transition: 'stroke 0.3s' }}
                      />
                      <text x={d.x + d.w / 2} y="157" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="12" fontWeight="700" fill={d.tc}>{d.title}</text>
                      <text x={d.x + d.w / 2} y="173" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill={d.sc}>{d.sub}</text>
                    </g>
                  );
                })}

                {/* Bottom layer Nodes (Students & Parents) */}
                <g>
                  <rect x="270" y="295" width="160" height="48" rx="10" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
                  <text x="350" y="316" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="12" fontWeight="700" fill="#15803D">Students</text>
                  <text x="350" y="332" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill="#16A34A">12,000+ active</text>
                </g>
                <g>
                  <rect x="470" y="295" width="160" height="48" rx="10" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1.5" />
                  <text x="550" y="316" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="12" fontWeight="700" fill="#1D4ED8">Parents</text>
                  <text x="550" y="332" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill="#3B82F6">Trusted guardians</text>
                </g>
              </svg>

              {/* Dynamic Info Panel below the SVG */}
              <div 
                style={{
                  marginTop: 36,
                  padding: '20px 24px',
                  borderRadius: 16,
                  background: 'rgba(248, 250, 252, 0.65)',
                  border: '1px solid rgba(79, 124, 255, 0.05)',
                  minHeight: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  transition: 'all 0.3s'
                }}
              >
                {activeDept ? (
                  <div style={{ animation: 'fadeInDept 0.35s ease forwards' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: activeDept.tc, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
                      {activeDept.title} Role
                    </span>
                    <p style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0, maxWidth: 680 }}>
                      {activeDept.details}
                    </p>
                  </div>
                ) : (
                  <span style={{ fontSize: 13, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                    Hover over any department node to trace flows and reveal operations info.
                  </span>
                )}
              </div>
            </div>
          </BorderGlow>
        </FadeUp>
      </div>

      <style>{`
        .svg-flowing-stroke {
          stroke-dasharray: 6 4;
          animation: svgFlowDashes 0.8s linear infinite;
        }
        @keyframes svgFlowDashes {
          to {
            stroke-dashoffset: -10;
          }
        }
        @keyframes fadeInDept {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
