import { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import SEO from '../components/common/SEO';
import { verifiedTeachers } from '../data/verifiedTeachers';
import { getTeacherMilestone, PROGRESS_NODES, filterVerifiedTeachers } from '../utils/milestone.utils';
import { Search, CheckCircle, ShieldCheck, Award, ArrowLeft, X, Sparkles, BookOpen, Calendar, Clock, Star, PartyPopper } from 'lucide-react';

// Helper to check if current time is within 24-hour Teachers' Day window (Sept 5th 00:00:00 to Sept 6th 00:00:00)
const isTeachersDayWindow = () => {
  const now = new Date();
  const year = now.getFullYear();
  // Month index 8 = September in JS Date
  const startTime = new Date(year, 8, 5, 0, 0, 0).getTime();
  const endTime = new Date(year, 8, 6, 0, 0, 0).getTime();
  const currentTime = now.getTime();

  return currentTime >= startTime && currentTime < endTime;
};

export default function VerifyTeachersPage() {
  const eligibleTeachers = useMemo(() => filterVerifiedTeachers(verifiedTeachers), []);
  const [selectedTeacherId, setSelectedTeacherId] = useState(eligibleTeachers[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(() => isTeachersDayWindow());
  const [hoveredNodeHours, setHoveredNodeHours] = useState(null);

  // Trigger party poppers from left and right sides
  const triggerConfetti = () => {
    // Left side party popper
    confetti({
      particleCount: 95,
      angle: 60,
      spread: 75,
      origin: { x: 0, y: 0.75 },
      colors: ['#4F7CFF', '#7C69F8', '#10B981', '#F59E0B', '#EC4899', '#38BDF8']
    });

    // Right side party popper
    confetti({
      particleCount: 95,
      angle: 120,
      spread: 75,
      origin: { x: 1, y: 0.75 },
      colors: ['#4F7CFF', '#7C69F8', '#10B981', '#F59E0B', '#EC4899', '#38BDF8']
    });

    // Follow-up celebratory burst after 350ms
    setTimeout(() => {
      confetti({
        particleCount: 65,
        angle: 60,
        spread: 60,
        origin: { x: 0.12, y: 0.65 },
        colors: ['#F43F5E', '#FBBF24', '#818CF8', '#34D399']
      });
      confetti({
        particleCount: 65,
        angle: 120,
        spread: 60,
        origin: { x: 0.88, y: 0.65 },
        colors: ['#F43F5E', '#FBBF24', '#818CF8', '#34D399']
      });
    }, 350);
  };

  // Auto-fire confetti upon page mount only during Teachers' Day window
  useEffect(() => {
    if (isTeachersDayWindow()) {
      triggerConfetti();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock background scroll & toggle data-modal-open for compact mobile Navbar
  useEffect(() => {
    if (isMobile && mobileModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-modal-open', 'true');
    } else {
      document.body.style.overflow = 'unset';
      document.body.removeAttribute('data-modal-open');
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.removeAttribute('data-modal-open');
    };
  }, [isMobile, mobileModalOpen]);

  // Filter teachers by search query (Name, MentR ID, Subject, Class)
  const filteredTeachers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return eligibleTeachers;
    return eligibleTeachers.filter(t => 
      t.name.toLowerCase().includes(q) ||
      t.mentrId.toLowerCase().includes(q) ||
      t.subjects.some(s => s.toLowerCase().includes(q)) ||
      t.classes.some(c => c.toLowerCase().includes(q))
    );
  }, [eligibleTeachers, searchQuery]);

  // Selected teacher object
  const selectedTeacher = useMemo(() => {
    return eligibleTeachers.find(t => t.id === selectedTeacherId) || eligibleTeachers[0];
  }, [eligibleTeachers, selectedTeacherId]);

  // Calculated milestone for active selected teacher
  const milestoneData = useMemo(() => {
    if (!selectedTeacher) return null;
    return getTeacherMilestone(selectedTeacher.teachingHours);
  }, [selectedTeacher]);

  // Active node data being inspected via hover/click on the progress bar
  const activeNodeData = useMemo(() => {
    if (!milestoneData) return null;
    if (!hoveredNodeHours) return milestoneData.current;
    const foundNode = PROGRESS_NODES.find(n => n.hours === hoveredNodeHours);
    if (!foundNode) return milestoneData.current;
    return {
      crown: foundNode.crown,
      level: foundNode.name,
      title: foundNode.title,
      desc: foundNode.desc,
      hours: foundNode.hours,
      color: milestoneData.current.color,
      bgColor: milestoneData.current.bgColor,
      borderColor: milestoneData.current.borderColor
    };
  }, [hoveredNodeHours, milestoneData]);

  const handleSelectTeacher = (id) => {
    setSelectedTeacherId(id);
    if (isMobile) {
      setMobileModalOpen(true);
    }
  };

  const totalImpactHours = useMemo(() => {
    return eligibleTeachers.reduce((acc, t) => acc + (t.teachingHours || 0), 0);
  }, [eligibleTeachers]);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 50%, #E0E7FF 100%)', paddingBottom: 80 }}>
      <SEO 
        title="Verified Teachers | TheMentR"
        description="Celebrating the verified mentors of TheMentR who have completed 100+ teaching hours. Happy Teachers' Day!"
        robots="noindex, nofollow"
      />

      {/* ==================================================================== */}
      {/* HAPPY TEACHERS' DAY CELEBRATION POPUP BANNER                        */}
      {/* ==================================================================== */}
      {showCelebration && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(15, 23, 42, 0.78)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowCelebration(false)}
        >
          <div 
            style={{
              position: 'relative',
              maxWidth: 520,
              width: '100%',
              background: 'linear-gradient(145deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)',
              border: '2px solid rgba(129, 140, 248, 0.4)',
              borderRadius: 28,
              padding: isMobile ? '32px 20px 28px' : '40px 36px 32px',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(79, 124, 255, 0.4), 0 0 60px rgba(124, 105, 248, 0.3)',
              color: '#FFFFFF',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glow */}
            <div style={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)', width: 240, height: 240, background: 'radial-gradient(circle, rgba(124, 105, 248, 0.35) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />

            {/* Close button */}
            <button 
              onClick={() => setShowCelebration(false)}
              style={{
                position: 'absolute',
                right: 16,
                top: 16,
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: 34,
                height: 34,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94A3B8',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'; e.currentTarget.style.color = '#FFF'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = '#94A3B8'; }}
            >
              <X size={18} />
            </button>

            {/* Top Popper Emojis */}
            <div style={{ fontSize: isMobile ? 38 : 46, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
              <span>🎉</span>
              <span>🎓</span>
              <span>✨</span>
              <span>💐</span>
            </div>

            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(252, 211, 77, 0.12)',
              border: '1px solid rgba(252, 211, 77, 0.3)',
              padding: '4px 14px',
              borderRadius: 99,
              fontSize: 12,
              fontWeight: 800,
              color: '#FCD34D',
              letterSpacing: '0.05em',
              marginBottom: 16
            }}>
              <Sparkles size={14} color="#FCD34D" /> SPECIAL RECOGNITION
            </div>

            {/* Main Center Title */}
            <h2 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              margin: '0 0 12px',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 50%, #818CF8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              Happy Teachers’ Day! 🎉
            </h2>

            {/* Subtext */}
            <p style={{
              fontSize: isMobile ? 14 : 15.5,
              color: '#CBD5E1',
              lineHeight: 1.6,
              maxWidth: 440,
              margin: '0 auto 24px',
              fontWeight: 450
            }}>
              Dedicated to the extraordinary Teachers of <strong>TheMentR</strong> who ignite curiosity, inspire confidence and guide students toward excellence every single day.
            </p>

            {/* Impact Callout */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 16,
              padding: '12px 18px',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12
            }}>
              <Award size={22} color="#F59E0B" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#FFF' }}>13+ Verified Teachers • 1,300+ Impact Hours</div>
                <div style={{ fontSize: 11.5, color: '#94A3B8' }}>Bronze Crown Educators Recognition</div>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => {
                setShowCelebration(false);
                triggerConfetti();
              }}
              style={{
                width: '100%',
                padding: '14px 24px',
                borderRadius: 16,
                background: 'linear-gradient(135deg, #4F7CFF 0%, #7C69F8 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: 15,
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(79, 124, 255, 0.4)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Explore Verified Directory 💙
            </button>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* HERO SECTION / TEACHERS' DAY RECOGNITION HEADER                      */}
      {/* ==================================================================== */}
      <section style={{ paddingTop: isMobile ? 36 : 48, paddingBottom: isMobile ? 24 : 40, textAlign: 'center', paddingLeft: 16, paddingRight: 16 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div 
            onClick={() => {
              triggerConfetti();
              setShowCelebration(true);
            }}
            title="Click to re-fire celebration!"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'linear-gradient(135deg, rgba(79, 124, 255, 0.12) 0%, rgba(124, 105, 248, 0.12) 100%)',
              border: '1px solid rgba(79, 124, 255, 0.25)',
              padding: '6px 16px',
              borderRadius: 99,
              color: '#4F7CFF',
              fontSize: isMobile ? 12 : 13,
              fontWeight: 750,
              letterSpacing: '0.04em',
              marginBottom: 16,
              boxShadow: '0 4px 14px rgba(79, 124, 255, 0.08)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <PartyPopper size={16} color="#4F7CFF" /> REWARDS AND RECOGNITION 🎉
          </div>

          <h1 style={{
            fontSize: isMobile ? '28px' : 'clamp(36px, 4vw, 52px)',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            color: '#0F172A',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: 14
          }}>
            Celebrating the Teachers Behind Every Milestone
          </h1>

          <p style={{
            fontSize: isMobile ? 14 : 16.5,
            color: '#475569',
            maxWidth: 680,
            margin: '0 auto 28px',
            lineHeight: 1.6,
            fontFamily: 'var(--font-sans)'
          }}>
            Every hour spent teaching represents a student helped, lots of questions answered, and a little more confidence built. TheMentR celebrates every teacher who continues to make learning meaningful.
          </p>

          {/* Quick Highlight Stats */}
          <div style={{
            display: isMobile ? 'grid' : 'flex',
            gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'none',
            justifyContent: 'center',
            gap: isMobile ? 8 : 24,
            maxWidth: isMobile ? 440 : 'none',
            margin: '0 auto 10px',
            padding: isMobile ? '0 4px' : '0'
          }}>
            <div style={{ 
              background: '#FFFFFF', 
              padding: isMobile ? '8px 6px' : '10px 20px', 
              borderRadius: isMobile ? 12 : 16, 
              border: '1px solid rgba(148, 163, 184, 0.2)', 
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)', 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: isMobile ? 15 : 22, fontWeight: 800, color: '#4F7CFF', lineHeight: 1.2 }}>{eligibleTeachers.length}+</div>
              <div style={{ fontSize: isMobile ? 10.5 : 12, fontWeight: 650, color: '#64748B', lineHeight: 1.3 }}>Bronze Crown Achievers</div>
            </div>
            <div style={{ 
              background: '#FFFFFF', 
              padding: isMobile ? '8px 6px' : '10px 20px', 
              borderRadius: isMobile ? 12 : 16, 
              border: '1px solid rgba(148, 163, 184, 0.2)', 
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)', 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: isMobile ? 15 : 22, fontWeight: 800, color: '#EAB308', lineHeight: 1.2 }}>100+</div>
              <div style={{ fontSize: isMobile ? 10.5 : 12, fontWeight: 650, color: '#64748B', lineHeight: 1.3 }}>Milestone Threshold</div>
            </div>
            <div style={{ 
              background: '#FFFFFF', 
              padding: isMobile ? '8px 6px' : '10px 20px', 
              borderRadius: isMobile ? 12 : 16, 
              border: '1px solid rgba(148, 163, 184, 0.2)', 
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)', 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: isMobile ? 15 : 22, fontWeight: 800, color: '#10B981', lineHeight: 1.2 }}>{totalImpactHours.toLocaleString()}+</div>
              <div style={{ fontSize: isMobile ? 10.5 : 12, fontWeight: 650, color: '#64748B', lineHeight: 1.3 }}>Total Impact Hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* MAIN TEACHER DIRECTORY CONTAINER                                    */}
      {/* ==================================================================== */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: isMobile ? '0 12px' : '0 24px' }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: 24,
          boxShadow: '0 20px 50px rgba(15, 23, 42, 0.08)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          minHeight: isMobile ? 'auto' : 680
        }}>
          
          {/* ================================================================ */}
          {/* LEFT PANEL: TEACHER LIST DIRECTORY (WhatsApp Desktop Inspired)  */}
          {/* ================================================================ */}
          <div style={{
            width: isMobile ? '100%' : 380,
            borderRight: isMobile ? 'none' : '1px solid rgba(226, 232, 240, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            background: '#F8FAFC'
          }}>
            {/* Directory Header & Search Box */}
            <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(226, 232, 240, 0.8)', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ShieldCheck size={18} color="#4F7CFF" /> TheMentR Directory
                </h2>
                <span style={{ fontSize: 12, fontWeight: 700, background: 'rgba(79, 124, 255, 0.1)', color: '#4F7CFF', padding: '2px 8px', borderRadius: 99 }}>
                  {filteredTeachers.length} Verified
                </span>
              </div>

              {/* Search Bar */}
              <div style={{ position: 'relative' }}>
                <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="Search by name, ID, subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    fontSize: 13,
                    borderRadius: 12,
                    border: '1.5px solid rgba(203, 213, 225, 0.6)',
                    background: '#F8FAFC',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                    color: '#1E293B',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4F7CFF'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(203, 213, 225, 0.6)'}
                />
              </div>
            </div>

            {/* Vertically Scrollable Teacher List */}
            <div 
              className="hide-scrollbar"
              style={{
                flex: 1,
                maxHeight: isMobile ? 440 : 610,
                overflowY: 'auto',
                padding: '8px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {filteredTeachers.length === 0 ? (
                <div style={{ padding: '32px 16px', textAlign: 'center', color: '#64748B', fontSize: 13.5 }}>
                  No verified teachers matched your search filter.
                </div>
              ) : (
                filteredTeachers.map(teacher => {
                  const m = getTeacherMilestone(teacher.teachingHours);
                  const isSelected = selectedTeacherId === teacher.id;

                  return (
                    <div
                      key={teacher.id}
                      onClick={() => handleSelectTeacher(teacher.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '12px 14px',
                        borderRadius: 14,
                        marginBottom: 6,
                        cursor: 'pointer',
                        background: isSelected ? '#FFFFFF' : 'transparent',
                        border: isSelected ? '1.5px solid #4F7CFF' : '1.5px solid transparent',
                        boxShadow: isSelected ? '0 4px 16px rgba(79, 124, 255, 0.12)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.background = '#FFFFFF';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      {/* Avatar DP Thumbnail */}
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <img 
                          src={teacher.thumbnail || teacher.image} 
                          alt={teacher.name}
                          loading="lazy"
                          width="48"
                          height="48"
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: `2px solid ${m.current.color}`
                          }}
                        />
                        <span style={{
                          position: 'absolute',
                          bottom: -2,
                          right: -2,
                          fontSize: 12,
                          background: '#FFFFFF',
                          borderRadius: '50%',
                          width: 18,
                          height: 18,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                        }}>
                          {m.current.crown}
                        </span>
                      </div>

                      {/* Info preview */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {teacher.name}
                          </span>
                          <CheckCircle size={14} color="#10B981" fill="#10B981" style={{ flexShrink: 0 }} />
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: m.current.color, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span>{teacher.teachingHours}+ Hours</span>
                          <span>•</span>
                          <span>{m.current.badgeName}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ================================================================ */}
          {/* RIGHT PANEL: DESKTOP TEACHER PROFILE CARD & MILESTONE JOURNEY      */}
          {/* ================================================================ */}
          {!isMobile && selectedTeacher && milestoneData && (
            <div style={{ flex: 1, padding: '32px 36px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              
              {/* Profile Top Banner */}
              <div style={{
                background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
                padding: '24px 28px',
                borderRadius: 20,
                border: '1px solid rgba(79, 124, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                marginBottom: 28
              }}>
                <img 
                  src={selectedTeacher.image} 
                  alt={selectedTeacher.name}
                  loading="lazy"
                  width="100"
                  height="100"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: `3px solid ${milestoneData.current.color}`,
                    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
                    flexShrink: 0
                  }}
                />

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#10B981', color: '#FFFFFF', padding: '3px 10px', borderRadius: 99, fontSize: 11.5, fontWeight: 750, marginBottom: 8 }}>
                    <CheckCircle size={13} color="#FFF" /> Verified TheMentR Teacher
                  </div>

                  <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', margin: '0 0 6px', fontFamily: 'var(--font-display)' }}>
                    {selectedTeacher.name}
                  </h2>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: milestoneData.current.color, display: 'inline-flex', alignItems: 'center', gap: 5, background: milestoneData.current.bgColor, padding: '4px 12px', borderRadius: 99, border: `1px solid ${milestoneData.current.borderColor}` }}>
                      <span style={{ fontSize: 16 }}>{milestoneData.current.crown}</span> {milestoneData.current.level}
                    </span>

                    <span style={{ fontSize: 14, fontWeight: 750, color: '#1E293B', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <Clock size={16} color="#4F7CFF" /> {selectedTeacher.teachingHours}+ Teaching Hours
                    </span>
                  </div>
                </div>
              </div>

              {/* ============================================================ */}
              {/* TEACHING JOURNEY & MILESTONE PROGRESS BAR                    */}
              {/* ============================================================ */}
              <div style={{ marginBottom: 28, background: '#FFFFFF', padding: '20px 24px', borderRadius: 18, border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Award size={18} color="#4F7CFF" /> Teaching Journey & MentR Milestones
                  </h3>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: '#64748B' }}>
                    {selectedTeacher.teachingHours} hrs completed
                  </span>
                </div>

                {/* Progress Bar Track */}
                <div style={{ position: 'relative', margin: '28px 12px 16px 12px' }}>
                  {/* Connecting Line Track */}
                  <div style={{ position: 'absolute', top: 14, left: 0, right: 0, height: 4, background: '#E2E8F0', borderRadius: 99, zIndex: 1 }}>
                    <div style={{ height: '100%', width: `${milestoneData.timelineFillPercent}%`, background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)', borderRadius: 99, transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                  </div>

                  {/* Milestone Nodes */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
                    {PROGRESS_NODES.map((node, idx) => {
                      const isAchieved = selectedTeacher.teachingHours >= node.hours;
                      const isCurrent = milestoneData.current.minHours === node.hours || (node.hours === 100 && selectedTeacher.teachingHours < 250);
                      const isHovered = hoveredNodeHours === node.hours;

                      // Smart edge-aware alignment to prevent cut-off on screen edges
                      const isLeftEdge = idx === 0;
                      const isRightEdge = idx === PROGRESS_NODES.length - 1;

                      return (
                        <div 
                          key={node.hours} 
                          style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: 60, cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredNodeHours(node.hours)}
                          onMouseLeave={() => setHoveredNodeHours(null)}
                          onClick={(e) => {
                            e.stopPropagation();
                            setHoveredNodeHours(hoveredNodeHours === node.hours ? null : node.hours);
                          }}
                        >
                          {/* Hover / Click Floating Popover Card */}
                          {isHovered && (
                            <div style={{
                              position: 'absolute',
                              bottom: '100%',
                              marginBottom: 10,
                              left: isLeftEdge ? '-10px' : isRightEdge ? 'auto' : '50%',
                              right: isRightEdge ? '-10px' : 'auto',
                              transform: isLeftEdge || isRightEdge ? 'none' : 'translateX(-50%)',
                              width: 210,
                              maxWidth: '85vw',
                              background: '#0F172A',
                              color: '#FFFFFF',
                              padding: '12px 14px',
                              borderRadius: 14,
                              boxShadow: '0 12px 28px rgba(15, 23, 42, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                              zIndex: 100,
                              textAlign: 'left',
                              pointerEvents: 'none'
                            }}>
                              {/* Popover Arrow Pointer */}
                              <div style={{
                                position: 'absolute',
                                bottom: -5,
                                left: isLeftEdge ? '24px' : isRightEdge ? 'auto' : '50%',
                                right: isRightEdge ? '24px' : 'auto',
                                transform: isLeftEdge || isRightEdge ? 'rotate(45deg)' : 'translateX(-50%) rotate(45deg)',
                                width: 10,
                                height: 10,
                                background: '#0F172A',
                                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                              }} />

                              {/* Card Header: Crown & Milestone Name */}
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ fontSize: 13, fontWeight: 800, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <span style={{ fontSize: 15 }}>{node.crown}</span> {node.name}
                                </span>
                                <span style={{
                                  fontSize: 10,
                                  fontWeight: 800,
                                  padding: '2px 6px',
                                  borderRadius: 99,
                                  background: isAchieved ? 'rgba(16, 185, 129, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                                  color: isAchieved ? '#34D399' : '#94A3B8'
                                }}>
                                  {isAchieved ? '✓ Achieved' : '🔒 Milestone'}
                                </span>
                              </div>

                              {/* Honor Title */}
                              <div style={{ fontSize: 12, fontWeight: 800, color: '#FCD34D', marginBottom: 4 }}>
                                Honor: {node.title}
                              </div>

                              {/* Hours Required */}
                              <div style={{ fontSize: 11, fontWeight: 700, color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Clock size={12} color="#818CF8" /> {node.hours}+ Hours Required
                              </div>
                            </div>
                          )}

                          {/* Circle Icon Badge */}
                          <div style={{
                            width: isCurrent ? 32 : 28,
                            height: isCurrent ? 32 : 28,
                            borderRadius: '50%',
                            background: isAchieved ? '#FFFFFF' : '#F1F5F9',
                            border: isCurrent ? '3px solid #8B5CF6' : isAchieved ? '2.5px solid #3B82F6' : '2px solid #CBD5E1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: isCurrent ? 15 : 13,
                            boxShadow: isCurrent ? '0 0 0 4px rgba(139, 92, 246, 0.2)' : isHovered ? '0 0 0 4px rgba(79, 124, 255, 0.25)' : 'none',
                            transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}>
                            {node.crown}
                          </div>

                          <span style={{ fontSize: 11, fontWeight: isAchieved ? 800 : 500, color: isAchieved ? '#0F172A' : '#94A3B8', marginTop: 6, textAlign: 'center' }}>
                            {node.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Milestone Detail Callout Box */}
                <div style={{
                  background: activeNodeData?.bgColor || milestoneData.current.bgColor,
                  border: `1px solid ${activeNodeData?.borderColor || milestoneData.current.borderColor}`,
                  borderRadius: 14,
                  padding: '14px 18px',
                  marginTop: 16,
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 20 }}>{activeNodeData?.crown || milestoneData.current.crown}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: activeNodeData?.color || milestoneData.current.color }}>
                        {activeNodeData?.name || activeNodeData?.level || milestoneData.current.level}: {activeNodeData?.title || milestoneData.current.title} ({activeNodeData?.hours || milestoneData.current.minHours}+ Hours)
                      </div>
                      <div style={{ fontSize: 12.5, color: '#334155', lineHeight: 1.4 }}>
                        {activeNodeData?.desc || milestoneData.current.desc}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
                <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: 14, border: '1px solid rgba(226, 232, 240, 0.8)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ShieldCheck size={14} color="#4F7CFF" /> MentR ID
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', fontFamily: 'monospace' }}>
                    {selectedTeacher.mentrId}
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: 14, border: '1px solid rgba(226, 232, 240, 0.8)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <BookOpen size={14} color="#4F7CFF" /> Classes Taught
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0F172A' }}>
                    {selectedTeacher.classes.join(', ')}
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: 14, border: '1px solid rgba(226, 232, 240, 0.8)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Star size={14} color="#EAB308" /> Subjects Taught
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0F172A' }}>
                    {selectedTeacher.subjects.join(', ')}
                  </div>
                </div>
              </div>

              {/* Personal Educator Tagline / Quote */}
              {selectedTeacher.bio && (
                <div style={{ background: '#EFF6FF', border: '1px solid rgba(79, 124, 255, 0.2)', padding: '14px 18px', borderRadius: 14, fontSize: 13.5, color: '#1E3A8A', fontStyle: 'italic', lineHeight: 1.5 }}>
                  "{selectedTeacher.bio}"
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      {/* ==================================================================== */}
      {/* MOBILE OVERLAY / PROFILE MODAL (WhatsApp Mobile Inspired)           */}
      {/* ==================================================================== */}
      {isMobile && mobileModalOpen && selectedTeacher && milestoneData && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 99999999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingTop: 48
        }}
        onClick={() => setMobileModalOpen(false)}
        >
          <div 
            className="hide-scrollbar"
            style={{
              width: '100%',
              maxHeight: 'calc(100vh - 48px)',
              background: '#FFFFFF',
              borderRadius: '24px 24px 0 0',
              overflowY: 'auto',
              padding: '16px 18px 60px 18px',
              position: 'relative',
              boxShadow: '0 -10px 40px rgba(15, 23, 42, 0.3)',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar - Sticky at top of drawer */}
            <div style={{ 
              position: 'sticky',
              top: -16,
              background: '#FFFFFF',
              zIndex: 50,
              paddingTop: 12,
              paddingBottom: 12,
              marginBottom: 16,
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <button 
                onClick={() => setMobileModalOpen(false)}
                style={{ background: '#F1F5F9', border: 'none', borderRadius: 99, padding: '6px 14px', fontSize: 13, fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
              >
                <ArrowLeft size={16} /> Back to Directory
              </button>
              <button 
                onClick={() => setMobileModalOpen(false)}
                style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Profile Content */}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <img 
                src={selectedTeacher.image} 
                alt={selectedTeacher.name}
                loading="lazy"
                width="88"
                height="88"
                style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${milestoneData.current.color}`, margin: '0 auto 10px' }}
              />
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#10B981', color: '#FFFFFF', padding: '2px 10px', borderRadius: 99, fontSize: 11, fontWeight: 750, marginBottom: 6 }}>
                <CheckCircle size={12} color="#FFF" /> Verified Teacher
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>
                {selectedTeacher.name}
              </h2>
              <div style={{ fontSize: 13, fontWeight: 700, color: milestoneData.current.color }}>
                {milestoneData.current.crown} {milestoneData.current.level} • {selectedTeacher.teachingHours}+ Hours
              </div>
            </div>

            {/* Milestone progress nodes for mobile (Click to inspect) */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Milestone Journey (Tap to inspect)</span>
                <span style={{ color: '#4F7CFF', fontWeight: 800 }}>{selectedTeacher.teachingHours}h</span>
              </div>

              {/* Mobile Nodes Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC', padding: '10px 8px', borderRadius: 14, border: '1px solid #E2E8F0', marginBottom: 12, position: 'relative' }}>
                {PROGRESS_NODES.map((node, idx) => {
                  const isAchieved = selectedTeacher.teachingHours >= node.hours;
                  const isCurrent = milestoneData.current.minHours === node.hours || (node.hours === 100 && selectedTeacher.teachingHours < 250);
                  const isHovered = hoveredNodeHours === node.hours;

                  // Smart edge-aware alignment for mobile popovers
                  const isLeftEdge = idx === 0;
                  const isRightEdge = idx === PROGRESS_NODES.length - 1;

                  return (
                    <div 
                      key={node.hours} 
                      style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setHoveredNodeHours(hoveredNodeHours === node.hours ? null : node.hours);
                      }}
                    >
                      {/* Mobile Click Popover Card */}
                      {isHovered && (
                        <div style={{
                          position: 'absolute',
                          bottom: '100%',
                          marginBottom: 8,
                          left: isLeftEdge ? '-6px' : isRightEdge ? 'auto' : '50%',
                          right: isRightEdge ? '-6px' : 'auto',
                          transform: isLeftEdge || isRightEdge ? 'none' : 'translateX(-50%)',
                          width: 180,
                          maxWidth: '72vw',
                          background: '#0F172A',
                          color: '#FFFFFF',
                          padding: '10px 12px',
                          borderRadius: 12,
                          boxShadow: '0 10px 24px rgba(15, 23, 42, 0.45)',
                          zIndex: 1000,
                          textAlign: 'left'
                        }}>
                          {/* Arrow Pointer */}
                          <div style={{
                            position: 'absolute',
                            bottom: -5,
                            left: isLeftEdge ? '16px' : isRightEdge ? 'auto' : '50%',
                            right: isRightEdge ? '16px' : 'auto',
                            transform: isLeftEdge || isRightEdge ? 'rotate(45deg)' : 'translateX(-50%) rotate(45deg)',
                            width: 10,
                            height: 10,
                            background: '#0F172A',
                            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                          }} />
                          <div style={{ fontSize: 12, fontWeight: 800, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                            <span>{node.crown}</span> {node.name}
                          </div>
                          <div style={{ fontSize: 11, fontWeight: 800, color: '#FCD34D', marginBottom: 2 }}>
                            Honor: {node.title}
                          </div>
                          <div style={{ fontSize: 10.5, color: '#CBD5E1' }}>
                            ⏱ {node.hours}+ Hours Required
                          </div>
                        </div>
                      )}

                      <div style={{
                        width: isCurrent ? 28 : 24,
                        height: isCurrent ? 28 : 24,
                        borderRadius: '50%',
                        background: isAchieved ? '#FFFFFF' : '#F1F5F9',
                        border: isCurrent ? '2.5px solid #8B5CF6' : isAchieved ? '2px solid #3B82F6' : '1.5px solid #CBD5E1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: isCurrent ? 13 : 11,
                        boxShadow: isCurrent ? '0 0 0 3px rgba(139, 92, 246, 0.2)' : isHovered ? '0 0 0 3px rgba(79, 124, 255, 0.25)' : 'none'
                      }}>
                        {node.crown}
                      </div>
                      <span style={{ fontSize: 9.5, fontWeight: isAchieved ? 800 : 500, color: isAchieved ? '#0F172A' : '#94A3B8', marginTop: 4 }}>
                        {node.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Milestone detail callout box for mobile */}
              <div style={{ background: activeNodeData?.bgColor || milestoneData.current.bgColor, border: `1px solid ${activeNodeData?.borderColor || milestoneData.current.borderColor}`, borderRadius: 14, padding: '12px 14px' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: activeNodeData?.color || milestoneData.current.color, marginBottom: 2 }}>
                  {activeNodeData?.crown || milestoneData.current.crown} {activeNodeData?.name || milestoneData.current.level}: {activeNodeData?.title || milestoneData.current.title} ({activeNodeData?.hours || milestoneData.current.minHours}+ Hours)
                </div>
                <div style={{ fontSize: 12, color: '#334155', lineHeight: 1.4 }}>
                  {activeNodeData?.desc || milestoneData.current.desc}
                </div>
              </div>
            </div>

            {/* Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 24 }}>
              <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: 12, fontSize: 13, lineHeight: 1.5 }}>
                <span style={{ color: '#64748B', fontWeight: 600 }}>MentR ID: </span>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>{selectedTeacher.mentrId}</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: 12, fontSize: 13, lineHeight: 1.5 }}>
                <span style={{ color: '#64748B', fontWeight: 600 }}>Classes: </span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>{selectedTeacher.classes.join(', ')}</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: 12, fontSize: 13, lineHeight: 1.5, wordBreak: 'break-word' }}>
                <span style={{ color: '#64748B', fontWeight: 600 }}>Subjects: </span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>{selectedTeacher.subjects.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TEACHERS' DAY APPRECIATION FOOTER BANNER                              */}
      {/* ==================================================================== */}
      <section style={{ maxWidth: 1140, margin: '40px auto 0', padding: isMobile ? '0 12px' : '0 24px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          borderRadius: 24,
          padding: isMobile ? '24px 20px' : '36px 44px',
          color: '#FFFFFF',
          textAlign: 'center',
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.15)'
        }}>
          <h3 style={{ fontSize: isMobile ? 20 : 26, fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-display)', color: '#FFFFFF' }}>
            Verified TheMentR Teachers
          </h3>
          <p style={{ fontSize: isMobile ? 13.5 : 15, color: 'rgba(255, 255, 255, 0.8)', maxWidth: 740, margin: '0 auto 20px', lineHeight: 1.6 }}>
            Celebrating the teachers who go above and beyond. We recognize the Teachers who have dedicated 100+ hours to helping students learn, grow, and succeed.
          </p>

          <div style={{ margin: '0 auto 24px', padding: '16px 24px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: 16, border: '1px solid rgba(255, 255, 255, 0.1)', maxWidth: 640 }}>
            <p style={{ fontSize: isMobile ? 14.5 : 16, fontStyle: 'italic', color: '#F1F5F9', margin: '0 0 6px', lineHeight: 1.5, fontFamily: 'var(--font-display)' }}>
              "Education is the manifestation of the perfection already in man."
            </p>
            <div style={{ fontSize: isMobile ? 12.5 : 13.5, fontWeight: 700, color: '#94A3B8' }}>
              Swami Vivekananda
            </div>
          </div>

          <div style={{ fontSize: isMobile ? 15 : 18, fontWeight: 750, color: '#818CF8' }}>
            Thank you. 💙
          </div>
        </div>
      </section>
    </div>
  );
}
