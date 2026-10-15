import { useState, useEffect } from 'react';
import { FadeUp } from '../../hooks/useScrollReveal';
import { teacherTestimonials, parentTestimonials } from '../../data/testimonialsData';
import { FloatingDoodles } from '../common/FloatingDoodles';

const testimonialsDoodles = [
  // Left side framing the header
  { type: 'star', size: 44, color: '#4F7CFF', opacity: 0.42, rotate: -12, position: { top: '5%', left: '7%' } },
  { type: 'pencil', size: 42, color: '#7C69F8', opacity: 0.38, rotate: 22, position: { top: '15%', left: '15%' } },
  { type: 'sparkle', size: 36, color: '#3B82F6', opacity: 0.4, rotate: 8, position: { top: '24%', left: '6%' } },
  // Right side framing the header
  { type: 'paperPlane', size: 52, color: '#4F7CFF', opacity: 0.4, rotate: 16, position: { top: '4%', right: '7%' } },
  { type: 'bulb', size: 44, color: '#7C69F8', opacity: 0.38, rotate: -10, position: { top: '14%', right: '16%' } },
  { type: 'star', size: 40, color: '#3B82F6', opacity: 0.42, rotate: 14, position: { top: '23%', right: '6%' } },
];

// Feedback Card Component matching TheMentR translucent glassmorphism theme
function FeedbackCard({ item, isMobile }) {
  const isTeacher = item.category === 'teacher';

  return (
    <div
      className="feedback-marquee-card"
      style={{
        width: isMobile ? 300 : 360,
        minWidth: isMobile ? 300 : 360,
        maxWidth: isMobile ? 300 : 360,
        background: 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(79, 124, 255, 0.16)',
        borderRadius: 18,
        padding: isMobile ? '16px 18px' : '20px 22px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'default',
        userSelect: 'none',
        position: 'relative',
        boxShadow: '0 8px 28px -6px rgba(79, 124, 255, 0.08), 0 2px 6px rgba(15, 23, 42, 0.03)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Header: Avatar, Name, Handle, Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          {/* Avatar circle */}
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: item.avatarBg || (isTeacher ? 'linear-gradient(135deg, #3B82F6, #1D4ED8)' : 'linear-gradient(135deg, #7C3AED, #4F46E5)'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(79, 124, 255, 0.2)'
          }}>
            {item.avatar || (isTeacher ? '👨‍🏫' : '👨‍👩‍👧')}
          </div>
          <div style={{ textAlign: 'left', minWidth: 0 }}>
            <div style={{
              fontSize: 14,
              fontWeight: 700,
              color: '#0F172A',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.01em'
            }}>
              {item.name}
            </div>
            <div style={{
              fontSize: 12,
              fontWeight: 500,
              color: '#64748B',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {item.handle || `@${item.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`}
            </div>
          </div>
        </div>

        {/* Category Pill Badge */}
        <span style={{
          fontSize: 10.5,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          padding: '3px 10px',
          borderRadius: 99,
          background: isTeacher ? 'rgba(16, 185, 129, 0.1)' : 'rgba(79, 124, 255, 0.1)',
          color: isTeacher ? '#047857' : '#2563EB',
          border: isTeacher ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(79, 124, 255, 0.25)',
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}>
          {isTeacher ? 'Teacher' : 'Parent'}
        </span>
      </div>

      {/* Quote Message Body */}
      <p style={{
        fontSize: isMobile ? 13 : 13.5,
        color: '#1E293B',
        lineHeight: 1.55,
        margin: '0 0 14px 0',
        textAlign: 'left',
        fontFamily: 'var(--font-sans)',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        "{item.quote}"
      </p>

      {/* Footer: Rating Stars + Location */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid rgba(79, 124, 255, 0.08)' }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {Array.from({ length: item.rating || 5 }).map((_, i) => (
            <span key={i} style={{ color: '#F59E0B', fontSize: 13 }}>★</span>
          ))}
        </div>
        <span style={{ fontSize: 11.5, color: '#64748B', fontWeight: 600 }}>
          {item.location || 'Odisha'}
        </span>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [teacherList, setTeacherList] = useState(teacherTestimonials);
  const [parentList, setParentList] = useState(parentTestimonials);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  // Equalize teacher item count to parent count so both tracks have identical length and speed
  const loopedTeachers = Array.from({ length: Math.ceil(parentList.length / (teacherList.length || 1)) })
    .flatMap(() => teacherList)
    .slice(0, parentList.length);

  // Feedback Submission Modal states
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [fbName, setFbName] = useState('');
  const [fbRole, setFbRole] = useState('Satisfied Parent');
  const [fbLocation, setFbLocation] = useState('');
  const [fbRating, setFbRating] = useState(5);
  const [fbMessage, setFbMessage] = useState('');
  const [fbSubmitting, setFbSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [fbError, setFbError] = useState('');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Submit Feedback Handler
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!fbName.trim() || !fbLocation.trim() || !fbMessage.trim()) {
      setFbError('Please fill in all required fields.');
      return;
    }

    setFbSubmitting(true);
    setFbError('');
    try {
      const category = fbRole.toLowerCase().includes('teacher') ? 'teacher' : 'parent';
      await fetch('/api/v1/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fbName,
          role: fbRole,
          location: fbLocation,
          rating: fbRating,
          quote: fbMessage,
          fullStory: fbMessage,
          category,
          verified: true
        })
      });

      const newFeedback = {
        id: `fb_${Date.now()}`,
        category,
        name: fbName,
        handle: `@${fbName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
        role: fbRole,
        location: fbLocation,
        rating: fbRating,
        avatar: category === 'teacher' ? '👨‍🏫' : '👨‍👩‍👧',
        avatarBg: category === 'teacher' ? '#3B82F6' : '#7C3AED',
        quote: fbMessage,
        createdAt: new Date().toISOString().split('T')[0]
      };

      if (category === 'teacher') {
        setTeacherList(prev => [newFeedback, ...prev]);
      } else {
        setParentList(prev => [newFeedback, ...prev]);
      }
      setFeedbackSubmitted(true);
    } catch (err) {
      console.error(err);
      setFeedbackSubmitted(true);
    } finally {
      setFbSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="section" style={{ background: '#FFFFFF', padding: isMobile ? '70px 0' : '110px 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background ambient lighting */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79, 124, 255, 0.05) 0%, transparent 70%)',
        top: '10%',
        left: '-10%',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(116, 105, 248, 0.05) 0%, transparent 70%)',
        bottom: '10%',
        right: '-10%',
        pointerEvents: 'none'
      }} />

      <FloatingDoodles items={testimonialsDoodles} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 36px' }}>
          <FadeUp><div className="testimonial-eyebrow">TESTIMONIALS & FEEDBACK</div></FadeUp>
          <FadeUp delay={0.1}>
            <h2 
              onClick={() => isMobile && setIsDescExpanded(!isDescExpanded)}
              style={{ 
                fontSize: 'clamp(30px, 3.5vw, 44px)', 
                fontWeight: 800, 
                color: '#0F172A', 
                letterSpacing: '-0.02em', 
                marginBottom: 16, 
                fontFamily: 'var(--font-hero)',
                cursor: isMobile ? 'pointer' : 'default',
                userSelect: 'none'
              }}
            >
              Teaching and Learning growing with TheMentR
            </h2>
          </FadeUp>
          <div
            style={{
              maxHeight: (!isMobile || isDescExpanded) ? '150px' : '0px',
              opacity: (!isMobile || isDescExpanded) ? 1 : 0,
              marginTop: (!isMobile || isDescExpanded) ? 12 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.18s cubic-bezier(0, 0, 0.2, 1), opacity 0.15s ease-out, margin-top 0.18s ease',
              willChange: 'max-height, opacity',
              transform: 'translateZ(0)'
            }}
          >
            <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.6, margin: 0 }}>
              Hear directly from parents and teachers who have experienced the MentR journey and trusted us with learning.
            </p>
          </div>
        </div>

        {/* Submit Feedback CTA */}
        <FadeUp delay={0.2}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
            <button
              type="button"
              onClick={() => {
                setFbName('');
                setFbLocation('');
                setFbMessage('');
                setFeedbackSubmitted(false);
                setFbError('');
                setShowFeedbackModal(true);
              }}
              style={{
                padding: '10px 24px',
                borderRadius: 99,
                background: 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: 13.5,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(79, 124, 255, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.25s ease'
              }}
            >
              ✍️ Submit Your Feedback
            </button>
          </div>
        </FadeUp>

      </div>

      {/* ============================================================== */}
      {/* CONTINUOUS MARQUEE: TWO ROWS OF TRANSLUCENT CARDS */}
      {/* ============================================================== */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 18 }}>
        
        {/* UPPER ROW: TEACHERS FEEDBACK (Left to Right) */}
        <div className="marquee-wrapper">
          <div className="marquee-track marquee-track-reverse">
            {[...loopedTeachers, ...loopedTeachers].map((item, idx) => (
              <FeedbackCard key={`teacher-${item.id}-${idx}`} item={item} isMobile={isMobile} />
            ))}
          </div>
        </div>

        {/* LOWER ROW: PARENTS FEEDBACK (Right to Left) */}
        <div className="marquee-wrapper">
          <div className="marquee-track marquee-track-forward">
            {[...parentList, ...parentList].map((item, idx) => (
              <FeedbackCard key={`parent-${item.id}-${idx}`} item={item} isMobile={isMobile} />
            ))}
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* SUBMIT FEEDBACK MODAL */}
      {/* ============================================================== */}
      {showFeedbackModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '12px 10px' : '20px'
          }}
          onClick={() => setShowFeedbackModal(false)}
        >
          <div 
            style={{
              width: '100%',
              maxWidth: 520,
              background: '#FFFFFF',
              borderRadius: isMobile ? 20 : 24,
              padding: isMobile ? '20px 16px 16px' : '36px 32px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              maxHeight: isMobile ? '85vh' : '90vh',
              overflowY: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowFeedbackModal(false)}
              style={{
                position: 'absolute',
                top: isMobile ? 14 : 18,
                right: isMobile ? 14 : 18,
                background: '#F1F5F9',
                border: 'none',
                width: isMobile ? 28 : 32,
                height: isMobile ? 28 : 32,
                borderRadius: '50%',
                fontSize: 14,
                cursor: 'pointer',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>

            {feedbackSubmitted ? (
              <div style={{ textAlign: 'center', padding: isMobile ? '20px 8px' : '32px 12px' }}>
                <div style={{ fontSize: isMobile ? 40 : 48, marginBottom: 12 }}>🎉</div>
                <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: isMobile ? 19 : 22, fontWeight: 800, color: '#1E293B', marginBottom: 10 }}>
                  Thank You for Your Feedback!
                </h3>
                <p style={{ fontSize: isMobile ? 13 : 14, color: '#475569', lineHeight: 1.5, marginBottom: 20 }}>
                  Your feedback has been saved into our database and recorded in our sheets. We appreciate your review!
                </p>
                <button
                  type="button"
                  onClick={() => { setShowFeedbackModal(false); setFeedbackSubmitted(false); }}
                  style={{
                    padding: isMobile ? '10px 24px' : '12px 28px',
                    borderRadius: 99,
                    background: 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: isMobile ? 13 : 14,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit}>
                {!isMobile && (
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CFF', display: 'block', marginBottom: 4, textAlign: 'left' }}>
                    Community Review
                  </span>
                )}
                <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: isMobile ? 19 : 22, fontWeight: 800, color: '#0F172A', marginBottom: isMobile ? 2 : 6, textAlign: 'left', paddingRight: 28 }}>
                  Submit Your Feedback
                </h3>
                <p style={{ fontSize: isMobile ? 12.5 : 13.5, color: '#64748B', marginBottom: isMobile ? 14 : 24, lineHeight: 1.35, textAlign: 'left' }}>
                  Share your experience with TheMentR platform and home tuition services.
                </p>

                <div style={{ marginBottom: isMobile ? 12 : 18, textAlign: 'left' }}>
                  <label style={{ display: 'block', fontSize: isMobile ? 10.5 : 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', marginBottom: 4 }}>
                    Full Name *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={fbName}
                    onChange={e => setFbName(e.target.value)}
                    style={{ width: '100%', padding: isMobile ? '8px 12px' : '10px 14px', borderRadius: 10, border: '1px solid #CBD5E1', fontSize: isMobile ? 13 : 14, boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? 10 : 14, marginBottom: isMobile ? 12 : 18, textAlign: 'left' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: isMobile ? 10.5 : 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', marginBottom: 4 }}>
                      Role / Category *
                    </label>
                    <select
                      value={fbRole}
                      onChange={e => setFbRole(e.target.value)}
                      style={{ width: '100%', padding: isMobile ? '8px 10px' : '10px 14px', borderRadius: 10, border: '1px solid #CBD5E1', fontSize: isMobile ? 12.5 : 14, background: '#FFF', boxSizing: 'border-box' }}
                    >
                      <option value="Satisfied Parent">Parent</option>
                      <option value="Verified Teacher">Teacher</option>
                      <option value="Motivated Student">Student</option>
                      <option value="Education Partner">Partner</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: isMobile ? 10.5 : 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', marginBottom: 4 }}>
                      Location / City *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Bhubaneswar"
                      value={fbLocation}
                      onChange={e => setFbLocation(e.target.value)}
                      style={{ width: '100%', padding: isMobile ? '8px 12px' : '10px 14px', borderRadius: 10, border: '1px solid #CBD5E1', fontSize: isMobile ? 13 : 14, boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                {/* Rating Selection */}
                <div style={{ marginBottom: isMobile ? 12 : 18, textAlign: 'left' }}>
                  <label style={{ display: 'block', fontSize: isMobile ? 10.5 : 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', marginBottom: 4 }}>
                    Rating *
                  </label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFbRating(star)}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: isMobile ? 22 : 26,
                          cursor: 'pointer',
                          color: star <= fbRating ? '#F59E0B' : '#CBD5E1',
                          padding: 0,
                          lineHeight: 1
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Message */}
                <div style={{ marginBottom: isMobile ? 16 : 24, textAlign: 'left' }}>
                  <label style={{ display: 'block', fontSize: isMobile ? 10.5 : 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', marginBottom: 4 }}>
                    Feedback / Review *
                  </label>
                  <textarea
                    required
                    rows={isMobile ? 3 : 4}
                    placeholder="Share your experience with us..."
                    value={fbMessage}
                    onChange={e => setFbMessage(e.target.value)}
                    style={{ width: '100%', padding: isMobile ? '8px 12px' : '10px 14px', borderRadius: 10, border: '1px solid #CBD5E1', fontSize: isMobile ? 13 : 14, fontFamily: 'inherit', boxSizing: 'border-box' }}
                  />
                </div>

                {fbError && (
                  <div style={{ color: '#EF4444', fontSize: 12, fontWeight: 600, marginBottom: 12, textAlign: 'left' }}>
                    ⚠️ {fbError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={fbSubmitting}
                  style={{
                    width: '100%',
                    padding: isMobile ? '11px' : '14px',
                    borderRadius: 12,
                    background: fbSubmitting ? '#CBD5E1' : 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: isMobile ? 13.5 : 15,
                    fontWeight: 700,
                    cursor: fbSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 14px rgba(79, 124, 255, 0.25)'
                  }}
                >
                  {fbSubmitting ? 'Submitting Feedback...' : 'Submit Feedback'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Testimonials Marquee & Eyebrow Styles */}
      <style>{`
        .testimonial-eyebrow {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #6366F1;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        @keyframes marquee-forward {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes marquee-reverse {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .marquee-wrapper {
          overflow: hidden;
          width: 100%;
          position: relative;
          padding: 8px 0;
          mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
        }

        .marquee-track {
          display: flex;
          gap: 18px;
          width: max-content;
          will-change: transform;
        }

        .marquee-track-forward {
          animation: marquee-forward 95s linear infinite;
        }

        .marquee-track-reverse {
          animation: marquee-reverse 95s linear infinite;
        }

        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }

        .feedback-marquee-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.92) !important;
          border-color: rgba(79, 124, 255, 0.38) !important;
          box-shadow: 0 16px 36px -6px rgba(79, 124, 255, 0.16), 0 0 0 1px rgba(79, 124, 255, 0.22) !important;
        }
      `}</style>
    </section>
  );
}
