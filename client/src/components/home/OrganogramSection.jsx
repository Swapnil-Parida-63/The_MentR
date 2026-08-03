import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeUp } from '../../hooks/useScrollReveal';
import { 
  Award, 
  BookOpen, 
  Search, 
  Cpu, 
  Settings, 
  Megaphone, 
  Headphones, 
  UserCheck, 
  AppWindow, 
  Heart, 
  ArrowDown, 
  CheckCircle2, 
  X 
} from 'lucide-react';

const nodeDetails = {
  leadership: {
    title: 'Founders & Leadership',
    subtitle: 'Vision • Strategy • Growth',
    desc: 'Steering the continuous expansion, overall direction, and long-term vision of TheMentR.',
    icon: Award,
    iconColor: '#3B82F6',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    sections: [
      { title: 'Focus Areas', chips: ['Vision & Strategy', 'Product Roadmap', 'National Expansion'] },
      { title: 'Capabilities', chips: ['Growth Operations', 'Ecosystem Health', 'Strategic Partnerships'] }
    ]
  },
  academic: {
    title: 'Academic Team',
    subtitle: 'Curriculum & Quality',
    desc: 'Designing board-aligned curriculum and training methodologies for classroom excellence.',
    icon: BookOpen,
    iconColor: '#6366F1',
    bgColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    sections: [
      { title: 'Focus Areas', chips: ['Curriculum Development', 'Lesson Plans', 'Assessments'] },
      { title: 'Methodology', chips: ['Quality Audit', 'Teacher Guides', 'Board Mapping'] }
    ]
  },
  research: {
    title: 'Research & Development',
    subtitle: 'Data & Cognitive R&D',
    desc: 'Researching learning behavioral patterns and designing structured diagnostic question banks.',
    icon: Search,
    iconColor: '#10B981',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    sections: [
      { title: 'R&D Focus', chips: ['Question Bank', 'Content Lab', 'Diagnostic Vetting'] },
      { title: 'Technology', chips: ['AI & Analytics Research', 'Learning Insights'] }
    ]
  },
  product: {
    title: 'Product & Tech Team',
    subtitle: 'Next-Gen Platform',
    desc: 'Architecting cross-platform apps and AVSAR data engines for parent-teacher coordination.',
    icon: Cpu,
    iconColor: '#3B82F6',
    bgColor: '#F0F4FF',
    borderColor: '#BFDBFE',
    sections: [
      { title: 'Applications', chips: ['Parent App', 'Teacher App', 'Admin Dashboard'] },
      { title: 'Capabilities', chips: ['CRM', 'Analytics', 'Security', 'Automation'] }
    ]
  },
  operations: {
    title: 'Operations Team',
    subtitle: 'Logistics & Hub Onboarding',
    desc: 'Managing logistics, teacher onboarding vetting, and matching operations.',
    icon: Settings,
    iconColor: '#F59E0B',
    bgColor: '#FFF7ED',
    borderColor: '#FDE68A',
    sections: [
      { title: 'Onboarding', chips: ['Teacher Onboarding', 'Student Onboarding', 'AVSAR Visits'] },
      { title: 'Logistics', chips: ['Class Allocation', 'Scheduling', 'Payments & Payouts'] }
    ]
  },
  sales: {
    title: 'Sales & Marketing',
    subtitle: 'Brand & Growth Outreach',
    desc: 'Connecting with parents and schools to scale localized outcomes-based learning.',
    icon: Megaphone,
    iconColor: '#8B5CF6',
    bgColor: '#FDF4FF',
    borderColor: '#E9D5FF',
    sections: [
      { title: 'Outreach', chips: ['Lead Generation', 'School Partnerships', 'Parent Acquisition'] },
      { title: 'Branding', chips: ['SEO', 'Meta Ads', 'Social Media', 'Outcomes Campaign'] }
    ]
  },
  support: {
    title: 'Support & Success',
    subtitle: 'Parent-Teacher Care',
    desc: 'Resolving questions, supporting tutors, and ensuring maximum program satisfaction.',
    icon: Headphones,
    iconColor: '#06B6D4',
    bgColor: '#ECFEFF',
    borderColor: '#A5F3FC',
    sections: [
      { title: 'Channels', chips: ['Parent Support', 'Teacher Support', 'Help Desk'] },
      { title: 'Success Metrics', chips: ['CRM & Ticketing', 'Feedback Resolution', 'Retention'] }
    ]
  },
  teachers: {
    title: 'Verified Teachers',
    subtitle: 'Service Providers',
    desc: 'Educators vetted through background checks, demos, and subject-matter evaluations.',
    icon: UserCheck,
    iconColor: '#10B981',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    sections: [
      { title: 'Verification', chips: ['Academic Vetted', 'Aadhaar Verified', 'Background Screened'] },
      { title: 'Benefits', chips: ['Subject Experts', 'Flexible Schedule', 'Timely Payouts'] }
    ]
  },
  platform: {
    title: 'TheMentR Platform',
    subtitle: 'Technology Core',
    desc: 'The central software backbone connecting scheduling, payments, and progress metrics.',
    icon: AppWindow,
    iconColor: '#3B82F6',
    bgColor: '#F0F4FF',
    borderColor: '#BFDBFE',
    sections: [
      { title: 'Core Engines', chips: ['AI Matching Engine', 'Smart Scheduling', 'Performance Tracking'] },
      { title: 'Services', chips: ['Secure Payments', 'Communication Hub', 'Cross-Platform Sync'] }
    ]
  },
  parents: {
    title: 'Parents (Clients)',
    subtitle: 'Trusted Guardians',
    desc: 'Enabling real-time monitoring of class schedules, milestones, and diagnostic outcomes.',
    icon: Heart,
    iconColor: '#EF4444',
    bgColor: '#FEF2F2',
    borderColor: '#FEE2E2',
    sections: [
      { title: 'Registration', chips: ['Easy Onboarding', 'Perfect Match', 'Transparent Pricing'] },
      { title: 'Monitoring', chips: ['Live Class Tracking', 'Progress Reports', '24x7 Support'] }
    ]
  }
};

const teams = ['academic', 'research', 'product', 'operations', 'sales', 'support'];

export default function OrganogramSection() {
  const [hoveredKey, setHoveredKey] = useState('leadership');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [activeMobileModalKey, setActiveMobileModalKey] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeDetails = nodeDetails[hoveredKey] || nodeDetails.leadership;
  const ActiveIcon = activeDetails.icon;

  // Active path index for line animation
  const teamIndex = teams.indexOf(hoveredKey);

  // Get active modal node details (for Card 2 tapping)
  const modalDetails = activeMobileModalKey ? nodeDetails[activeMobileModalKey] : null;
  const ModalIconComp = modalDetails ? modalDetails.icon : null;

  return (
    <section id="organogram" className="section" style={{ background: 'transparent', padding: isMobile ? '60px 0' : '40px 0', minHeight: isMobile ? 'auto' : 'calc(100vh - 90px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background ambient radial glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: 450,
        height: 450,
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        
        {isMobile ? (
          /* ============================================================ */
          /* MOBILE STORYTELLING EXPERIENCE                               */
          /* ============================================================ */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, width: '100%' }}>
            
            {/* Mobile Header */}
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <FadeUp><div className="eyebrow" style={{ display: 'inline-block', marginBottom: 4 }}>BEHIND EVERY SUCCESSFUL LEARNING JOURNEY</div></FadeUp>
              <FadeUp delay={0.1} duration={0.8}>
                <h2 style={{ fontSize: '26px', lineHeight: 1.25, marginBottom: 12, fontFamily: 'var(--font-display)', fontWeight: 750, color: '#0F172A', letterSpacing: '-0.02em' }}>
                  Behind Every Successful Learning Journey
                </h2>
              </FadeUp>
              <FadeUp delay={0.2} duration={0.7}>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
                  See how MentR brings together leadership, expert teams, technology and educators to create a seamless learning experience.
                </p>
              </FadeUp>
            </div>

            {/* CARD 1: Leadership */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '24px',
                border: '1px solid rgba(15, 23, 42, 0.05)',
                boxShadow: '0 8px 30px rgba(15, 23, 42, 0.02)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>👑</div>
              <h4 style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', margin: '0 0 8px' }}>Leadership</h4>
              <p style={{ fontSize: 14, color: '#475569', fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>
                &ldquo;We define the vision, strategy and direction for every learning experience.&rdquo;
              </p>
            </motion.div>

            {/* CARD 2: Our Expert Teams */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '24px 20px',
                border: '1px solid rgba(15, 23, 42, 0.05)',
                boxShadow: '0 8px 30px rgba(15, 23, 42, 0.02)',
                textAlign: 'center'
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', margin: '0 0 12px' }}>Our Expert Teams</h4>
              
              {/* 2x3 Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                marginBottom: 16
              }}>
                {[
                  { key: 'academic', label: 'Academic', icon: BookOpen, color: '#6366F1', bg: '#EEF2FF' },
                  { key: 'research', label: 'Research', icon: Search, color: '#10B981', bg: '#ECFDF5' },
                  { key: 'product', label: 'Product', icon: Cpu, color: '#3B82F6', bg: '#F0F4FF' },
                  { key: 'operations', label: 'Operations', icon: Settings, color: '#F59E0B', bg: '#FFF7ED' },
                  { key: 'sales', label: 'Sales', icon: Megaphone, color: '#8B5CF6', bg: '#FDF4FF' },
                  { key: 'support', label: 'Support', icon: Headphones, color: '#06B6D4', bg: '#ECFEFF' }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.key}
                      onClick={() => setActiveMobileModalKey(item.key)}
                      style={{
                        padding: '12px 6px',
                        background: '#FAFAFC',
                        borderRadius: '14px',
                        border: '1px solid rgba(15, 23, 42, 0.03)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ color: item.color, background: item.bg, padding: 6, borderRadius: '50%', display: 'flex' }}>
                        <Icon size={16} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#1E293B' }}>{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                Every team works together to deliver a seamless experience for parents and teachers. <span style={{ color: '#3B82F6', fontWeight: 600 }}>Tap to see roles.</span>
              </p>
            </motion.div>

            {/* CARD 3: The MentR Platform */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFC 100%)',
                borderRadius: '24px',
                padding: '24px',
                border: '1px solid rgba(59, 130, 246, 0.08)',
                boxShadow: '0 8px 30px rgba(59, 130, 246, 0.02)',
                textAlign: 'center'
              }}
            >
              <div style={{ display: 'inline-flex', padding: 8, borderRadius: 10, background: '#F0F4FF', color: '#3B82F6', marginBottom: 12 }}>
                <AppWindow size={20} />
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', margin: '0 0 6px' }}>TheMentR Platform</h4>
              <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.5, margin: '0 0 16px' }}>
                &ldquo;Our technology connects every part of the ecosystem.&rdquo;
              </p>
              
              {/* Capability Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                {['AI Matching', 'Scheduling', 'Analytics', 'Payments', 'Communication'].map(chip => (
                  <span
                    key={chip}
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#2563EB',
                      background: 'rgba(59, 130, 246, 0.05)',
                      padding: '4px 10px',
                      borderRadius: '99px',
                      border: '1px solid rgba(59, 130, 246, 0.08)'
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CARD 4: Connecting Everyone */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '24px',
                border: '1px solid rgba(15, 23, 42, 0.05)',
                boxShadow: '0 8px 30px rgba(15, 23, 42, 0.02)',
                textAlign: 'center'
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', margin: '0 0 16px' }}>Connecting Everyone</h4>
              
              {/* Flow Visualization */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                marginBottom: 16
              }}>
                <div style={{ padding: '8px 16px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', color: '#047857', fontSize: 12.5, fontWeight: 700, width: 140 }}>
                  Teacher
                </div>
                <div style={{ height: 20, width: 1.5, background: '#E2E8F0' }} />
                <div style={{ padding: '8px 16px', background: '#F0F4FF', border: '1px solid #BFDBFE', borderRadius: '12px', color: '#1D4ED8', fontSize: 12.5, fontWeight: 800, width: 160 }}>
                  MentR Platform
                </div>
                <div style={{ height: 20, width: 1.5, background: '#E2E8F0' }} />
                <div style={{ padding: '8px 16px', background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: '12px', color: '#B91C1C', fontSize: 12.5, fontWeight: 700, width: 140 }}>
                  Parent
                </div>
              </div>

              <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.5, margin: 0 }}>
                &ldquo;The platform connects verified teachers with families while every internal team works behind the scenes.&rdquo;
              </p>
            </motion.div>

            {/* CARD 5: Why It Matters */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '24px',
                border: '1px solid rgba(15, 23, 42, 0.05)',
                boxShadow: '0 8px 30px rgba(15, 23, 42, 0.02)',
                textAlign: 'center'
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', margin: '0 0 16px' }}>Why It Matters</h4>
              
              {/* Vertical Chips */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                maxWidth: 240,
                margin: '0 auto'
              }}>
                {[
                  'Verified Teachers',
                  'Personalized Learning',
                  'Progress Tracking',
                  'Secure Payments',
                  'Dedicated Support'
                ].map(chip => (
                  <div
                    key={chip}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 14px',
                      background: 'rgba(59, 130, 246, 0.04)',
                      borderRadius: '12px',
                      border: '1px solid rgba(59, 130, 246, 0.06)',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#1E293B',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ color: '#10B981', display: 'flex' }}>✓</span>
                    <span>{chip}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        ) : (
          /* ============================================================ */
          /* DESKTOP INTERACTIVE ECOSYSTEM (Side-by-Side)                */
          /* ============================================================ */
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.4fr 1.05fr', 
            gap: '32px',
            alignItems: 'center',
            maxWidth: 1200,
            margin: '0 auto'
          }}>
            
            {/* COLUMN 1: ECOSYSTEM DIAGRAM */}
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              maxWidth: 620, 
              aspectRatio: '600 / 380', 
              margin: '0 auto'
            }}>
              
              {/* SVG CONNECTION BACKDROP */}
              <svg 
                viewBox="0 0 600 380" 
                fill="none" 
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  pointerEvents: 'none',
                  zIndex: 0
                }}
              >
                {/* STATIC BASE CONNECTIONS */}
                {/* Leadership to Top branching point */}
                <line x1="300" y1="58" x2="300" y2="100" stroke="#F1F5F9" strokeWidth="2.5" />
                <line x1="50" y1="100" x2="550" y2="100" stroke="#F1F5F9" strokeWidth="2.5" />
                
                {/* Branch drops to team cards */}
                {[50, 150, 250, 350, 450, 550].map((x) => (
                  <line key={x} x1={x} y1="100" x2={x} y2="135" stroke="#F1F5F9" strokeWidth="2.5" />
                ))}

                {/* Team cards to platform convergence */}
                {[50, 150, 250, 350, 450, 550].map((x) => (
                  <line key={x} x1={x} y1="210" x2={x} y2="245" stroke="#F1F5F9" strokeWidth="2.5" />
                ))}
                <line x1="50" y1="245" x2="550" y2="245" stroke="#F1F5F9" strokeWidth="2.5" />
                
                {/* Vertical drops to Teachers, Platform, Parents */}
                <line x1="100" y1="245" x2="100" y2="290" stroke="#F1F5F9" strokeWidth="2.5" />
                <line x1="300" y1="245" x2="300" y2="280" stroke="#F1F5F9" strokeWidth="2.5" />
                <line x1="500" y1="245" x2="500" y2="290" stroke="#F1F5F9" strokeWidth="2.5" />

                {/* Horizontal Bidirectional arrow base lines */}
                <line x1="180" y1="320" x2="215" y2="320" stroke="#F1F5F9" strokeWidth="3" />
                <line x1="385" y1="320" x2="420" y2="320" stroke="#F1F5F9" strokeWidth="3" />

                {/* DYNAMIC ANIMATED HIGHLIGHT PATHS */}
                {/* Path 1: Leadership -> Branch -> Card */}
                {teamIndex !== -1 && (
                  <path 
                    d={`M 300,58 L 300,100 L ${50 + teamIndex * 100},100 L ${50 + teamIndex * 100},135`}
                    stroke={activeDetails.iconColor}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="flowing-path"
                  />
                )}

                {/* Path 2: Card -> Platform */}
                {teamIndex !== -1 && (
                  <path 
                    d={`M ${50 + teamIndex * 100},210 L ${50 + teamIndex * 100},245 L 300,245 L 300,280`}
                    stroke={activeDetails.iconColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="flowing-path"
                  />
                )}

                {/* Path 3: Bottom Nodes connection highlights */}
                {hoveredKey === 'teachers' && (
                  <>
                    <path d="M 100,245 L 100,290" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" className="flowing-path" />
                    <path d="M 180,320 L 215,320" stroke="#10B981" strokeWidth="4" strokeLinecap="round" className="flowing-path" />
                  </>
                )}
                {hoveredKey === 'parents' && (
                  <>
                    <path d="M 500,245 L 500,290" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" className="flowing-path" />
                    <path d="M 385,320 L 420,320" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" className="flowing-path" />
                  </>
                )}
                {hoveredKey === 'platform' && (
                  <>
                    <path d="M 300,245 L 300,280" stroke="#3B82F6" strokeWidth="3.5" strokeLinecap="round" className="flowing-path" />
                    <path d="M 180,320 L 215,320" stroke="#10B981" strokeWidth="4" strokeLinecap="round" className="flowing-path" />
                    <path d="M 385,320 L 420,320" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" className="flowing-path" />
                  </>
                )}
              </svg>

              {/* HTML NODES OVERLAY */}
              {/* 1. Founders & Leadership (Top Center) */}
              <div
                onMouseEnter={() => setHoveredKey('leadership')}
                style={{
                  position: 'absolute',
                  top: '10.5%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '10px 24px',
                  width: '42%',
                  textAlign: 'center',
                  border: hoveredKey === 'leadership' ? '1.5px solid #3B82F6' : '1px solid rgba(15, 23, 42, 0.06)',
                  boxShadow: hoveredKey === 'leadership' 
                    ? '0 12px 30px rgba(59, 130, 246, 0.08), 0 0 0 3px rgba(59, 130, 246, 0.1)' 
                    : '0 4px 15px rgba(10, 22, 40, 0.02)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: hoveredKey !== 'leadership' && hoveredKey !== null ? 0.5 : 1,
                  zIndex: 2
                }}
              >
                <div style={{ display: 'inline-flex', padding: 5, borderRadius: 6, background: 'rgba(59, 130, 246, 0.06)', color: '#3B82F6', marginRight: 8, verticalAlign: 'middle' }}>
                  <Award size={14} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', verticalAlign: 'middle' }}>Leadership</span>
              </div>

              {/* 2. Middle Row: 6 Team Cards */}
              {teams.map((key, idx) => {
                const t = nodeDetails[key];
                const IconComp = t.icon;
                const isHovered = hoveredKey === key;
                const isAnyHovered = hoveredKey !== null;
                const opacityVal = isHovered ? 1 : (isAnyHovered ? 0.45 : 1);

                return (
                  <div
                    key={key}
                    onMouseEnter={() => setHoveredKey(key)}
                    style={{
                      position: 'absolute',
                      top: '47.3%',
                      left: `${8.33 + idx * 16.66}%`,
                      transform: 'translate(-50%, -50%)',
                      background: '#FFFFFF',
                      borderRadius: '14px',
                      border: isHovered ? `1.5px solid ${t.iconColor}` : '1px solid rgba(15, 23, 42, 0.05)',
                      padding: '12px 6px',
                      width: '14.5%',
                      height: 76,
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: isHovered 
                        ? `0 12px 24px rgba(15, 23, 42, 0.04), 0 0 12px ${t.iconColor}22` 
                        : '0 4px 12px rgba(10, 22, 40, 0.01)',
                      opacity: opacityVal,
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      zIndex: 2
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      width: 30, 
                      height: 30, 
                      borderRadius: '50%', 
                      background: t.bgColor, 
                      color: t.iconColor, 
                      marginBottom: 4
                    }}>
                      <IconComp size={16} />
                    </div>
                    <h4 style={{ fontSize: 11.5, fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.01em' }}>
                      {t.title.split(' ')[0]}
                    </h4>
                  </div>
                );
              })}

              {/* 3. Bottom Layer: Teachers, Platform, Parents */}
              {/* Teachers */}
              <div
                onMouseEnter={() => setHoveredKey('teachers')}
                style={{
                  position: 'absolute',
                  top: '84.2%',
                  left: '16.6%',
                  transform: 'translate(-50%, -50%)',
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '10px 14px',
                  width: '25%',
                  height: 60,
                  border: hoveredKey === 'teachers' ? '1.5px solid #10B981' : '1px solid rgba(15, 23, 42, 0.05)',
                  boxShadow: hoveredKey === 'teachers' 
                    ? '0 12px 24px rgba(16, 185, 129, 0.08), 0 0 10px rgba(16, 185, 129, 0.15)' 
                    : '0 4px 12px rgba(10, 22, 40, 0.01)',
                  cursor: 'pointer',
                  opacity: hoveredKey !== 'teachers' && hoveredKey !== null ? 0.5 : 1,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  textAlign: 'center',
                  zIndex: 2
                }}
              >
                <div style={{ display: 'inline-flex', padding: 5, borderRadius: 8, background: '#ECFDF5', color: '#10B981', marginRight: 6, verticalAlign: 'middle' }}>
                  <UserCheck size={14} />
                </div>
                <span style={{ fontSize: 12.5, fontWeight: 800, color: '#0F172A', verticalAlign: 'middle' }}>Teachers</span>
              </div>

              {/* MentR Platform (Center) */}
              <div
                onMouseEnter={() => setHoveredKey('platform')}
                style={{
                  position: 'absolute',
                  top: '84.2%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle at top left, #FFFFFF 0%, #FAFAFC 100%)',
                  borderRadius: '18px',
                  padding: '12px 18px',
                  width: '32%',
                  height: 70,
                  border: hoveredKey === 'platform' ? '1.5px solid #3B82F6' : '1px solid rgba(15, 23, 42, 0.06)',
                  boxShadow: hoveredKey === 'platform' 
                    ? '0 12px 24px rgba(59, 130, 246, 0.08), 0 0 10px rgba(59, 130, 246, 0.15)' 
                    : '0 4px 12px rgba(10, 22, 40, 0.02)',
                  cursor: 'pointer',
                  opacity: hoveredKey !== 'platform' && hoveredKey !== null ? 0.5 : 1,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  textAlign: 'center',
                  zIndex: 2
                }}
              >
                <div style={{ display: 'inline-flex', padding: 6, borderRadius: 8, background: '#F0F4FF', color: '#3B82F6', marginRight: 6, verticalAlign: 'middle' }}>
                  <AppWindow size={16} />
                </div>
                <span style={{ fontSize: 13.5, fontWeight: 900, color: '#0F172A', verticalAlign: 'middle', letterSpacing: '-0.01em' }}>Platform</span>
              </div>

              {/* Parents */}
              <div
                onMouseEnter={() => setHoveredKey('parents')}
                style={{
                  position: 'absolute',
                  top: '84.2%',
                  left: '83.3%',
                  transform: 'translate(-50%, -50%)',
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '10px 14px',
                  width: '25%',
                  height: 60,
                  border: hoveredKey === 'parents' ? '1.5px solid #EF4444' : '1px solid rgba(15, 23, 42, 0.05)',
                  boxShadow: hoveredKey === 'parents' 
                    ? '0 12px 24px rgba(239, 68, 68, 0.08), 0 0 10px rgba(239, 68, 68, 0.15)' 
                    : '0 4px 12px rgba(10, 22, 40, 0.01)',
                  cursor: 'pointer',
                  opacity: hoveredKey !== 'parents' && hoveredKey !== null ? 0.5 : 1,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  textAlign: 'center',
                  zIndex: 2
                }}
              >
                <div style={{ display: 'inline-flex', padding: 5, borderRadius: 8, background: '#FEF2F2', color: '#EF4444', marginRight: 6, verticalAlign: 'middle' }}>
                  <Heart size={14} />
                </div>
                <span style={{ fontSize: 12.5, fontWeight: 800, color: '#0F172A', verticalAlign: 'middle' }}>Parents</span>
              </div>

            </div>

            {/* COLUMN 2: DESKTOP FLOATING INFO PANEL */}
            <div style={{ 
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.82)',
              border: '1px solid rgba(59, 130, 246, 0.08)',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.02)',
              backdropFilter: 'blur(16px)',
              padding: '24px 28px',
              minHeight: 330,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredKey}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  style={{ height: '100%' }}
                >
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: 14 }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: '12px',
                      background: activeDetails.bgColor,
                      color: activeDetails.iconColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 6px 14px ${activeDetails.bgColor}`
                    }}>
                      <ActiveIcon size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 16.5, fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                        {activeDetails.title}
                      </h3>
                      <span style={{ fontSize: 11, fontWeight: 700, color: activeDetails.iconColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {activeDetails.subtitle}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.5, margin: '0 0 18px' }}>
                    {activeDetails.desc}
                  </p>

                  {/* Subsections with Chips */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {activeDetails.sections && activeDetails.sections.map((sect, sIdx) => (
                      <div key={sIdx}>
                        <h5 style={{ fontSize: 11.5, fontWeight: 800, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                          {sect.title}
                        </h5>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {sect.chips.map(chip => (
                            <span 
                              key={chip}
                              style={{
                                fontSize: 11,
                                fontWeight: 650,
                                color: '#2563EB',
                                background: 'rgba(59, 130, 246, 0.05)',
                                border: '1px solid rgba(59, 130, 246, 0.1)',
                                padding: '4px 10px',
                                borderRadius: '99px',
                                display: 'inline-block'
                              }}
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        )}

      </div>

      {/* MOBILE TEAM DETAILS LIGHTWEIGHT MODAL */}
      <AnimatePresence>
        {isMobile && activeMobileModalKey && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMobileModalKey(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(15, 23, 42, 0.45)',
              backdropFilter: 'blur(5px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: 360,
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                position: 'relative'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveMobileModalKey(null)}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#F1F5F9',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748B',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>

              {/* Modal Header */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                {modalDetails && ModalIconComp && (
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: '10px',
                    background: modalDetails.bgColor,
                    color: modalDetails.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <ModalIconComp size={18} />
                  </div>
                )}
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', margin: 0 }}>
                    {modalDetails?.title}
                  </h3>
                  <span style={{ fontSize: 11, fontWeight: 700, color: modalDetails?.iconColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {modalDetails?.subtitle}
                  </span>
                </div>
              </div>

              {/* Modal Description */}
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, margin: '0 0 16px' }}>
                {modalDetails?.desc}
              </p>

              {/* Modal Sections with Chips */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {modalDetails?.sections?.map((sect, sIdx) => (
                  <div key={sIdx}>
                    <h5 style={{ fontSize: 10.5, fontWeight: 800, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                      {sect.title}
                    </h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {sect.chips.map(chip => (
                        <span 
                          key={chip}
                          style={{
                            fontSize: 10,
                            fontWeight: 650,
                            color: '#2563EB',
                            background: 'rgba(59, 130, 246, 0.05)',
                            border: '1px solid rgba(59, 130, 246, 0.1)',
                            padding: '3px 8px',
                            borderRadius: '99px',
                            display: 'inline-block'
                          }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .flowing-path {
          stroke-dasharray: 6 4;
          animation: flowDash 0.8s linear infinite;
        }
        @keyframes flowDash {
          to {
            stroke-dashoffset: -10;
          }
        }
      `}</style>

    </section>
  );
}
