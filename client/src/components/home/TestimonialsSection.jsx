import { useState, useEffect } from 'react';
import { FadeUp } from '../../hooks/useScrollReveal';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// ==============================================================
// 1. TESTIMONIAL DATA (CLEAN WITHOUT IMAGE PLACEHOLDERS)
// ==============================================================
const initialTestimonialsData = [
  {
    id: 't1',
    category: 'teacher',
    type: 'text',
    name: 'Subham Kumar Dash',
    role: 'Verified Teacher',
    location: 'IRC village, N3, Nayapalli',
    verified: true,
    rating: 5,
    quote: "Friendly environment, very polite and hospitality is great.",
    fullStory: "Friendly environment, very polite and hospitality is great. Onboarding and matching with student requests are fully transparent.",
    createdAt: '2025-06-10'
  },
  {
    id: 't2',
    category: 'teacher',
    type: 'text',
    name: 'Akash Kumar Sahoo',
    role: 'Verified Teacher',
    location: 'Nayapalli, Beherasahi',
    verified: true,
    rating: 5,
    quote: "Thank you, I felt very happy with all the respected staff & MD sir. This Environment is very friendly.",
    fullStory: "Thank you, I felt very happy with all the respected staff & MD sir. This Environment is very friendly and supportive for tutors.",
    createdAt: '2025-06-08'
  },
  {
    id: 't3',
    category: 'teacher',
    type: 'text',
    name: 'Sangram Rout',
    role: 'Verified Teacher',
    location: 'Jayadev Vihar, Bhubaneswar',
    verified: true,
    rating: 5,
    quote: "Thank you everyone. Great opportunity. Friendly & polite behaviour. Good Initiative.",
    fullStory: "Thank you everyone. Great opportunity. Friendly & polite behaviour. Good Initiative to match verified tutors with motivated families.",
    createdAt: '2025-06-05'
  },
  {
    id: 't4',
    category: 'teacher',
    type: 'text',
    name: 'Vikas Ranjan Senapati',
    role: 'Verified Teacher',
    location: 'Bhubaneswar, Odisha',
    verified: true,
    rating: 5,
    quote: "I would like to convey my thanks for such a wonderful initialization to bring a revolution in the education field.",
    fullStory: "I would like to convey my thanks for such a wonderful initialization to bring a revolution in the education field, providing job security and transparency.",
    createdAt: '2025-06-01'
  },
  {
    id: 't5',
    category: 'teacher',
    type: 'text',
    name: 'Pratismita Sahoo',
    role: 'Verified Teacher',
    location: 'Bajapur, Puri',
    verified: true,
    rating: 5,
    quote: "Very friendly atmosphere, friendly and supportive staff. It's my first experience as a tutor and very excited for the journey. Thank you.",
    fullStory: "Very friendly atmosphere, friendly and supportive staff. It's my first experience as a tutor and very excited for the journey. The onboarding guides were extremely helpful. Thank you.",
    createdAt: '2025-05-28'
  },
  {
    id: 't6',
    category: 'teacher',
    type: 'text',
    name: 'Priyabrata Pradhan',
    role: 'Verified Teacher',
    location: 'Banamalipur, Balipatna, Khorda',
    verified: true,
    rating: 5,
    quote: "Thank you whole team of MentR to guiding me for teaching sector. Very friendly and polite behavior of each staff.",
    fullStory: "Thank you whole team of MentR to guiding me for teaching sector. Very friendly and polite behavior of each staff.",
    createdAt: '2025-05-20'
  }
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(initialTestimonialsData);
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'text', 'video'
  const [activeIndex, setActiveIndex] = useState(0);
  const [readMore, setReadMore] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

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

  // Filter testimonials based on selected controls
  const filteredTestimonials = testimonials.filter(item => {
    const matchesType = typeFilter === 'all' ? true : item.type === typeFilter;
    return matchesType;
  });

  // Reset indices when filters change
  useEffect(() => {
    setActiveIndex(0);
    setReadMore(false);
  }, [typeFilter, testimonials]);

  const activeItem = filteredTestimonials[activeIndex];

  // Auto-slide test intervals
  useEffect(() => {
    const interval = setInterval(() => {
      if (filteredTestimonials.length > 1) {
        setActiveIndex(prev => (prev + 1) % filteredTestimonials.length);
        setReadMore(false);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [filteredTestimonials]);

  const handlePrev = () => {
    if (filteredTestimonials.length === 0) return;
    setReadMore(false);
    setActiveIndex(prev => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const handleNext = () => {
    if (filteredTestimonials.length === 0) return;
    setReadMore(false);
    setActiveIndex(prev => (prev + 1) % filteredTestimonials.length);
  };

  // Swiping support for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

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
        type: 'text',
        name: fbName,
        role: fbRole,
        location: fbLocation,
        verified: true,
        rating: fbRating,
        quote: fbMessage,
        fullStory: fbMessage,
        createdAt: new Date().toISOString().split('T')[0]
      };

      setTestimonials(prev => [newFeedback, ...prev]);
      setActiveIndex(0);
      setFeedbackSubmitted(true);
    } catch (err) {
      console.error(err);
      setFeedbackSubmitted(true);
    } finally {
      setFbSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="section" style={{ background: 'linear-gradient(180deg, rgba(143, 149, 246, 0.42) 0%, #E3E8FF 50%, #FFFFFF 100%)', padding: isMobile ? '70px 0' : '120px 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background layer */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(116, 105, 248, 0.015) 0%, transparent 70%)',
        bottom: '5%',
        left: '-10%',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 40px' }}>
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
              Teaching and Learning growing with The MentR
            </h2>
          </FadeUp>
          <div
            style={{
              display: 'grid',
              gridTemplateRows: (!isMobile || isDescExpanded) ? '1fr' : '0fr',
              opacity: (!isMobile || isDescExpanded) ? 1 : 0,
              marginTop: (!isMobile || isDescExpanded) ? 12 : 0,
              transition: 'grid-template-rows 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease-out, margin-top 0.28s ease',
              willChange: 'grid-template-rows, opacity',
              transform: 'translateZ(0)'
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                Hear directly from parents and teachers who have experienced the MentR journey and trusted us with learning.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial Filter Bar & Submit Feedback CTA */}
        <FadeUp delay={0.2}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginBottom: 44, flexWrap: 'wrap' }}>
            <div className="segmented-control">
              <button onClick={() => setTypeFilter('all')} className={`filter-btn ${typeFilter === 'all' ? 'active' : ''}`}>All</button>
              <button onClick={() => setTypeFilter('text')} className={`filter-btn ${typeFilter === 'text' ? 'active' : ''}`}>Text</button>
              <button onClick={() => setTypeFilter('video')} className={`filter-btn ${typeFilter === 'video' ? 'active' : ''}`}>Video</button>
            </div>

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
                padding: '10px 22px',
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

        {/* Main Testimonial Card (Clean without images) */}
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {filteredTestimonials.length > 0 && activeItem ? (
            <FadeUp delay={0.25}>
              <div 
                className="testimonial-card-surface"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(79, 124, 255, 0.12)',
                  borderRadius: 28,
                  padding: isMobile ? '32px 20px 24px' : '40px 48px',
                  boxShadow: '0 20px 40px -12px rgba(79, 124, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  height: isMobile ? 380 : 400,
                  boxSizing: 'border-box',
                  justifyContent: 'space-between'
                }}
              >
                {/* Top Rating & Badge Group */}
                <div>
                  {/* Rating Stars */}
                  <div style={{ display: 'flex', gap: 4, marginBottom: 12, justifyContent: 'center' }}>
                    {Array.from({ length: activeItem.rating || 5 }).map((_, i) => (
                      <span key={i} style={{ color: '#F59E0B', fontSize: 18 }}>★</span>
                    ))}
                  </div>

                  {/* Verified Badge */}
                  <div>
                    <span className="verified-badge-pill" style={{
                      background: activeItem.category === 'teacher' ? '#ECFDF5' : '#EFF6FF',
                      color: activeItem.category === 'teacher' ? '#047857' : '#1D4ED8',
                      borderColor: activeItem.category === 'teacher' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(59, 130, 246, 0.12)',
                      fontSize: 11.5,
                      fontWeight: 700,
                      padding: '5px 13px',
                      borderRadius: 99,
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}>
                      <CheckCircle size={11} 
                        color={activeItem.category === 'teacher' ? '#059669' : '#2563EB'} 
                        fill={activeItem.category === 'teacher' ? '#D1FAE5' : '#DBEAFE'} 
                        style={{ marginRight: 5 }} 
                      />
                      {activeItem.category === 'teacher' ? 'Verified Teacher' : activeItem.category === 'parent' ? 'Satisfied Parent' : 'Verified User'}
                    </span>
                  </div>
                </div>

                {/* Middle Fixed Scrollable Text Box */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  maxWidth: 640,
                  width: '100%',
                  overflowY: 'auto',
                  margin: '12px 0',
                  padding: '0 4px'
                }}>
                  <blockquote style={{
                    fontSize: isMobile ? 16 : 19,
                    fontWeight: 700,
                    color: '#0F172A',
                    lineHeight: 1.45,
                    margin: 0,
                    fontFamily: 'var(--font-hero)'
                  }}>
                    "{activeItem.quote}"
                  </blockquote>

                  {readMore && activeItem.fullStory && activeItem.fullStory !== activeItem.quote && (
                    <p style={{ fontSize: 13.5, color: '#475569', marginTop: 10, lineHeight: 1.5 }}>
                      {activeItem.fullStory}
                    </p>
                  )}

                  {activeItem.fullStory && activeItem.fullStory !== activeItem.quote && (
                    <div style={{ marginTop: 8 }}>
                      <button onClick={() => setReadMore(!readMore)} className="read-story-btn">
                        {readMore ? 'Read Less' : 'Read Full Story'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Reviewer Meta details */}
                <div style={{ flexShrink: 0 }}>
                  <h4 style={{ fontSize: 16.5, fontWeight: 800, color: '#1E293B', margin: '0 0 3px', fontFamily: 'var(--font-hero)' }}>
                    {activeItem.name}
                  </h4>
                  <p style={{ fontSize: 13, color: '#64748B', margin: 0, fontWeight: 500 }}>
                    {activeItem.role} {activeItem.location ? `· ${activeItem.location}` : ''}
                  </p>
                </div>

              </div>
            </FadeUp>
          ) : (
            <FadeUp delay={0.25}>
              <div style={{ background: '#FFFFFF', borderRadius: 28, textAlign: 'center', padding: '60px 24px', color: '#64748B' }}>
                <span style={{ fontSize: 36, display: 'block', marginBottom: 12 }}>✨</span>
                <h4 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Reviews Coming Soon</h4>
                <p style={{ fontSize: 14, color: '#64748B', maxWidth: 440, margin: '0 auto', lineHeight: 1.6 }}>
                  Be the first to share your experience with The MentR!
                </p>
              </div>
            </FadeUp>
          )}

          {/* Navigation Controls */}
          {filteredTestimonials.length > 1 && (
            <FadeUp delay={0.3}>
              <div className="carousel-navigation-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 32 }}>
                <button onClick={handlePrev} className="nav-arrow-btn" aria-label="Previous Testimonial">
                  <ArrowLeft size={16} />
                </button>
                <div className="nav-dots-container" style={{ display: 'flex', gap: 6 }}>
                  {filteredTestimonials.map((_, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => { setActiveIndex(idx); setReadMore(false); }} 
                      className={`carousel-dot ${activeIndex === idx ? 'active' : ''}`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
                <button onClick={handleNext} className="nav-arrow-btn" aria-label="Next Testimonial">
                  <ArrowRight size={16} />
                </button>
              </div>
            </FadeUp>
          )}

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
                  Share your experience with The MentR platform and home tuition services.
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

      {/* Testimonials Premium Stylesheet */}
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

        .segmented-control {
          background: rgba(15, 23, 42, 0.04);
          border: 1px solid rgba(15, 23, 42, 0.05);
          padding: 4px;
          border-radius: 99px;
          display: flex;
          gap: 2px;
        }
        .filter-btn {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 600;
          color: #64748B;
          padding: 8px 18px;
          border-radius: 99px;
          border: none;
          cursor: pointer;
          background: transparent;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .filter-btn.active {
          background: #FFFFFF;
          color: #0F172A;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
        }

        .read-story-btn {
          background: none;
          border: none;
          color: #4F7CFF;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
        }

        .carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #CBD5E1;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.25s ease;
        }
        .carousel-dot.active {
          background: #4F7CFF;
          width: 24px;
          border-radius: 99px;
        }

        .nav-arrow-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid rgba(79, 124, 255, 0.15);
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .nav-arrow-btn:hover {
          background: #4F7CFF;
          color: #FFFFFF;
        }
      `}</style>
    </section>
  );
}
