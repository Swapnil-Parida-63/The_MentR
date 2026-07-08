import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ClipboardCheck, Users, UserCheck, BookOpen, Globe, Lock, ChevronRight } from 'lucide-react';

export default function ServicesSection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const features = [
    {
      id: 'teachers',
      icon: ShieldCheck,
      title: 'Verified Teachers',
      desc: 'Every educator earns their place.',
      gridSpan: isMobile ? 'span 1' : 'span 2',
      height: '180px'
    },
    {
      id: 'assessment',
      icon: ClipboardCheck,
      title: 'Assessment',
      desc: 'Understand before teaching.',
      gridSpan: 'span 1',
      height: '180px'
    },
    {
      id: 'matching',
      icon: Users,
      title: 'Personalized Matching',
      desc: 'The right mentor. The first time.',
      gridSpan: 'span 1',
      height: '180px'
    },
    {
      id: 'safe',
      icon: Lock,
      title: 'Safe Learning',
      desc: 'Confidence for families.',
      gridSpan: 'span 1',
      height: '180px'
    },
    {
      id: 'board',
      icon: BookOpen,
      title: 'Board Flexibility',
      desc: 'Every curriculum. One ecosystem.',
      gridSpan: 'span 1',
      height: '180px'
    },
    {
      id: 'onetoone',
      icon: UserCheck,
      title: 'One-to-One Learning',
      desc: 'Designed around every learner.',
      gridSpan: isMobile ? 'span 1' : 'span 2',
      height: '180px'
    },
    {
      id: 'online',
      icon: Globe,
      title: 'Online + Offline',
      desc: 'Learn without limits.',
      gridSpan: 'span 1',
      height: '180px'
    }
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      id="services" 
      style={{ 
        background: '#FAFAFC', 
        padding: isMobile ? '80px 0' : '160px 0',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          style={{ textAlign: 'left', marginBottom: isMobile ? '48px' : '72px' }}
        >
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 12,
            color: '#6366F1',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 16
          }}>
            What We Offer
          </span>
          <h2 style={{
            fontFamily: 'var(--font-hero)',
            fontWeight: 800,
            fontSize: isMobile ? 'clamp(32px, 8vw, 44px)' : 'clamp(44px, 4vw, 56px)',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#1E293B',
            margin: '0 0 20px'
          }}>
            Every detail matters.<br />
            So we built them all in.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 16,
            color: '#64748B',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: 0
          }}>
            Every part of the learning journey has been carefully designed from assessment to measurable outcomes.
          </p>
        </motion.div>

        {/* Desktop Bento Grid / Mobile Editorial List */}
        {isMobile ? (
          /* Mobile Editorial List */
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {features.map((feature, idx) => {
              const IconComp = feature.icon;
              return (
                <div key={feature.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    padding: '24px 0',
                    gap: 16
                  }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <IconComp 
                        size={20} 
                        strokeWidth={1.8} 
                        style={{ color: '#6366F1', marginTop: 3, flexShrink: 0 }} 
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <h4 style={{
                          fontFamily: 'var(--font-section)',
                          fontWeight: 700,
                          fontSize: 16,
                          color: '#1E293B',
                          margin: 0
                        }}>
                          {feature.title}
                        </h4>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 400,
                          fontSize: 14,
                          color: '#64748B',
                          lineHeight: 1.5,
                          margin: 0
                        }}>
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight 
                      size={18} 
                      style={{ color: '#94A3B8', marginTop: 4, flexShrink: 0 }} 
                    />
                  </div>
                  {idx < features.length - 1 && (
                    <div style={{ height: 1, background: '#E8EAF2', width: '100%' }} />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Desktop Bento Grid */
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24
            }}
          >
            {features.map((feature) => {
              const IconComp = feature.icon;
              const isHovered = hoveredCard === feature.id;
              return (
                <motion.div
                  key={feature.id}
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredCard(feature.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    gridColumn: feature.gridSpan,
                    background: '#FFFFFF',
                    borderRadius: 24,
                    border: `1.5px solid ${isHovered ? '#6366F1' : 'rgba(99, 102, 241, 0.08)'}`,
                    boxShadow: isHovered 
                      ? '0 12px 24px rgba(99, 102, 241, 0.05)' 
                      : '0 4px 12px rgba(10, 22, 40, 0.02)',
                    padding: 32,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: feature.height,
                    cursor: 'pointer',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'transform 250ms ease-out, border-color 250ms ease-out, box-shadow 250ms ease-out'
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: 'rgba(99, 102, 241, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6366F1'
                  }}>
                    <IconComp size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-section)',
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#1E293B',
                      margin: '0 0 6px'
                    }}>
                      {feature.title}
                    </h4>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 400,
                      fontSize: 14,
                      color: '#64748B',
                      lineHeight: 1.5,
                      margin: 0
                    }}>
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
}
