import { useState, useEffect, useRef } from 'react';
import { FadeUp } from '../../hooks/useScrollReveal';
import { ArrowLeft, ArrowRight, Play, CheckCircle } from 'lucide-react';

// ==============================================================
// 1. ORIGINAL TESTIMONIAL DATA WITH DUMMY AVATARS
// ==============================================================
const testimonialsData = [
  {
    id: 't1',
    category: 'teacher',
    type: 'text',
    name: 'Subham Kumar Dash',
    role: 'Verified Teacher',
    location: 'IRC village, N3, Nayapalli',
    verified: true,
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
    thumbnail: '',
    videoUrl: '',
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
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
    thumbnail: '',
    videoUrl: '',
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
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
    thumbnail: '',
    videoUrl: '',
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
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
    thumbnail: '',
    videoUrl: '',
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
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
    thumbnail: '',
    videoUrl: '',
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
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
    thumbnail: '',
    videoUrl: '',
    rating: 5,
    quote: "Staff are so polite and humble and my experience with this institution is remarkable.",
    fullStory: "Staff are so polite and humble and my experience with this institution is remarkable. Highly recommend for any educator.",
    createdAt: '2025-05-25'
  },
  {
    id: 't7',
    category: 'teacher',
    type: 'text',
    name: 'Nirmalya Das',
    role: 'Verified Teacher',
    location: 'Pathargadhia, KIIT, BBSR',
    verified: true,
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
    thumbnail: '',
    videoUrl: '',
    rating: 5,
    quote: "The onboarding experience was smooth, well-organised and very informative. The team was supportive. Thank you for the warm welcome. I look forward to contributing and growing with the company. Thank you.",
    fullStory: "The onboarding experience was smooth, well-organised and very informative. The team was supportive. Thank you for the warm welcome. I look forward to contributing and growing with the company. Thank you.",
    createdAt: '2025-05-20'
  }
];

export default function TestimonialsSection() {
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'text', 'video'
  const [activeIndex, setActiveIndex] = useState(0);
  const [readMore, setReadMore] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Filter testimonials based on selected controls
  const filteredTestimonials = testimonialsData.filter(item => {
    const matchesType = typeFilter === 'all' ? true : item.type === typeFilter;
    return matchesType;
  });

  // Reset indices when filters change
  useEffect(() => {
    setActiveIndex(0);
    setReadMore(false);
  }, [typeFilter]);

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

  return (
    <section id="testimonials" className="section" style={{ background: '#fafafc', padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      
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
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}>
          <FadeUp><div className="testimonial-eyebrow">TESTIMONIALS</div></FadeUp>
          <FadeUp delay={0.1}>
            <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 44px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: 16, fontFamily: 'var(--font-hero)' }}>
              Families Growing with MentR
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.6, margin: 0 }}>
              Hear directly from parents and teachers who have experienced the MentR journey and trusted us with learning.
            </p>
          </FadeUp>
        </div>

        {/* Testimonial Segmented Controls Filter Bar */}
        <FadeUp delay={0.2}>
          <div className="testimonial-filters-container">
            {/* Type Filter */}
            <div className="segmented-control">
              <button onClick={() => setTypeFilter('all')} className={`filter-btn ${typeFilter === 'all' ? 'active' : ''}`}>All</button>
              <button onClick={() => setTypeFilter('text')} className={`filter-btn ${typeFilter === 'text' ? 'active' : ''}`}>Text</button>
              <button onClick={() => setTypeFilter('video')} className={`filter-btn ${typeFilter === 'video' ? 'active' : ''}`}>Video</button>
            </div>
          </div>
        </FadeUp>

        {/* Main Testimonial Surface */}
        <div style={{ maxWidth: 940, margin: '0 auto' }}>
          {filteredTestimonials.length > 0 ? (
            <FadeUp delay={0.25}>
              <div 
                className="testimonial-card-surface"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div className="testimonial-split-layout">
                  
                  {/* Left Column: Image placeholder */}
                  <div className="testimonial-media-col">
                    <div className="profile-image-viewport">
                      <img 
                        src={activeItem.profileImage} 
                        alt={activeItem.name} 
                        className="profile-static-img"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Right Column: Info & Storytelling */}
                  <div className="testimonial-info-col">
                    
                    {/* Rating Stars */}
                    <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                      {Array.from({ length: activeItem.rating }).map((_, i) => (
                        <span key={i} style={{ color: '#F59E0B', fontSize: 16 }}>★</span>
                      ))}
                    </div>

                    {/* Verified Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                      <span className="verified-badge-pill" style={{
                        background: activeItem.category === 'teacher' ? '#ECFDF5' : '#EFF6FF',
                        color: activeItem.category === 'teacher' ? '#047857' : '#1D4ED8',
                        borderColor: activeItem.category === 'teacher' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(59, 130, 246, 0.12)'
                      }}>
                        <CheckCircle size={10} 
                          color={activeItem.category === 'teacher' ? '#059669' : '#2563EB'} 
                          fill={activeItem.category === 'teacher' ? '#D1FAE5' : '#DBEAFE'} 
                          style={{ marginRight: 5 }} 
                        />
                        {activeItem.category === 'teacher' ? 'Verified Teacher' : 'Satisfied Parent'}
                      </span>
                    </div>

                    {/* Text Container with fixed height for scrollability to keep card size identical */}
                    <div className="testimonial-text-container">
                      {/* Quote */}
                      <blockquote className="testimonial-quote">
                        "{activeItem.quote}"
                      </blockquote>

                      {/* Expandable story (inline) */}
                      {readMore && (
                        <p className="testimonial-fullstory animate-expand">
                          {activeItem.fullStory}
                        </p>
                      )}
                    </div>

                    <div style={{ marginBottom: 28 }}>
                      <button onClick={() => setReadMore(!readMore)} className="read-story-btn">
                        {readMore ? 'Read Less' : 'Read Full Story'}
                      </button>
                    </div>

                    {/* Reviewer Meta details */}
                    <div className="reviewer-meta-box">
                      <h4 className="reviewer-name">{activeItem.name}</h4>
                      <p className="reviewer-role-location">
                        {activeItem.role} &middot; {activeItem.location}
                      </p>
                    </div>

                  </div>

                </div>
              </div>
            </FadeUp>
          ) : (
            <FadeUp delay={0.25}>
              <div className="testimonial-card-surface" style={{ textAlign: 'center', padding: '80px 48px', color: '#64748B' }}>
                <span style={{ fontSize: 32, display: 'block', marginBottom: 16 }}>✨</span>
                <h4 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Reviews Coming Soon</h4>
                <p style={{ fontSize: 14, color: '#64748B', maxWidth: 440, margin: '0 auto', lineHeight: 1.6 }}>
                  Testimonial reviews are being compiled and processed. They will be published shortly.
                </p>
              </div>
            </FadeUp>
          )}

          {/* Navigation Controls */}
          {filteredTestimonials.length > 1 && (
            <FadeUp delay={0.3}>
              <div className="carousel-navigation-wrapper">
                <button onClick={handlePrev} className="nav-arrow-btn" aria-label="Previous Testimonial">
                  <ArrowLeft size={16} />
                </button>
                <div className="nav-dots-container">
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

        /* Segmented filter bars */
        .testimonial-filters-container {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 56px;
          flex-wrap: wrap;
        }
        .segmented-control {
          background: rgba(15, 23, 42, 0.04);
          border: 1px solid rgba(15, 23, 42, 0.05);
          padding: 4px;
          border-radius: 99px;
          display: flex;
          gap: 2px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
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

        /* Card surface */
        .testimonial-card-surface {
          background: #FFFFFF;
          border: 1px solid rgba(79, 124, 255, 0.08);
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(79, 124, 255, 0.04), 
                      0 4px 20px rgba(79, 124, 255, 0.02);
          overflow: hidden;
          padding: 48px;
          transition: border-color 0.3s ease;
          height: 480px;
          display: flex;
          align-items: center;
        }

        .testimonial-split-layout {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 56px;
          align-items: center;
        }

        /* Media Column */
        .testimonial-media-col {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .profile-image-viewport {
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          background: #F1F5F9;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.03);
          border: 1px solid rgba(15, 23, 42, 0.03);
        }
        .profile-static-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Info Column */
        .testimonial-info-col {
          text-align: left;
        }
        .verified-badge-pill {
          display: inline-flex;
          align-items: center;
          background: #ECFDF5;
          color: #047857;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 99px;
          border: 1px solid rgba(16, 185, 129, 0.12);
        }
        .testimonial-text-container {
          max-height: 180px;
          overflow-y: auto;
          padding-right: 8px;
          margin-bottom: 20px;
        }
        .testimonial-text-container::-webkit-scrollbar {
          width: 4px;
        }
        .testimonial-text-container::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.02);
        }
        .testimonial-text-container::-webkit-scrollbar-thumb {
          background: rgba(15, 23, 42, 0.1);
          border-radius: 4px;
        }
        .testimonial-quote {
          font-family: var(--font-hero);
          font-size: clamp(18px, 1.8vw, 24px);
          font-weight: 700;
          color: #0F172A;
          line-height: 1.45;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .testimonial-fullstory {
          font-family: var(--font-sans);
          font-size: 14.5px;
          color: #475569;
          line-height: 1.7;
          margin: 0 0 16px;
        }
        .read-story-btn {
          background: none;
          border: none;
          color: #6366F1;
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }
        .read-story-btn:hover {
          color: #4F7CFF;
          text-decoration: underline;
        }

        /* Reviewer Meta */
        .reviewer-meta-box {
          border-top: 1px solid rgba(15, 23, 42, 0.06);
          padding-top: 20px;
        }
        .reviewer-name {
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
        }
        .reviewer-role-location {
          font-family: var(--font-sans);
          font-size: 12.5px;
          color: #64748B;
          margin: 4px 0 0;
        }

        /* Carousel Nav dots */
        .carousel-navigation-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 36px;
        }
        .nav-arrow-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid rgba(15, 23, 42, 0.08);
          color: #64748B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }
        .nav-arrow-btn:hover {
          color: #0F172A;
          border-color: rgba(15, 23, 42, 0.15);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
        }
        .nav-dots-container {
          display: flex;
          gap: 8px;
        }
        .carousel-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #E2E8F0;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }
        .carousel-dot.active {
          background: #6366F1;
          width: 18px;
          border-radius: 3px;
        }

        /* Animations */
        .animate-expand {
          animation: slideDownFade 0.3s ease forwards;
        }
        @keyframes slideDownFade {
          from { opacity: 0; transform: translateY(-4px); max-height: 0; }
          to { opacity: 1; transform: translateY(0); max-height: 500px; }
        }

        /* RESPONSIVE LAYOUTS */
        @media (max-width: 1024px) {
          .testimonial-card-surface {
            padding: 32px;
          }
          .testimonial-split-layout {
            gap: 36px;
          }
        }

        @media (max-width: 768px) {
          .testimonial-card-surface {
            height: auto !important;
            min-height: auto !important;
          }
          .testimonial-split-layout {
            grid-template-columns: 1fr !important;
            gap: 28px;
          }
          .testimonial-media-col {
            max-width: 440px;
            margin: 0 auto;
          }
          .testimonial-info-col {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .testimonial-quote {
            text-align: center;
          }
          .reviewer-meta-box {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
