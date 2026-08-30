import { useState, useEffect } from 'react';
import { FadeUp } from '../../hooks/useScrollReveal';
import { ArrowRight, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

const hallOfFameItems = [
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=75&w=700&auto=format",
    fullImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1000&auto=format",
    title: "Olympiad Winners — IMO 2026",
    category: "Olympiad",
    year: "2026",
    subtitle: "Celebrating Excellence",
    description: "Recognizing students who challenged themselves, learned boldly, and achieved something worth celebrating.",
    featured: true
  },
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1544535830-9dff9e02ffbc?q=75&w=600&auto=format",
    fullImage: "https://images.unsplash.com/photo-1544535830-9dff9e02ffbc?q=80&w=950&auto=format",
    title: "Teacher Onboarding Cohort",
    category: "Teachers",
    year: "2026",
    subtitle: "Empowering Educators",
    description: "Welcoming our next cohort of verified educators across India with comprehensive demo sessions."
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=75&w=600&auto=format",
    fullImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=950&auto=format",
    title: "Parent-Teacher Connect",
    category: "Community",
    year: "2026",
    subtitle: "Stronger Together",
    description: "Building strong bonds between parents and teachers during our interactive city meetups."
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=75&w=600&auto=format",
    fullImage: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=950&auto=format",
    title: "Live Interactive Classrooms",
    category: "Learning",
    year: "2026",
    subtitle: "Digital Excellence",
    description: "Digital whiteboards, real-time code execution, and high-fidelity video learning in action."
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=75&w=600&auto=format",
    fullImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=950&auto=format",
    title: "TheMentR Core Team",
    category: "Team",
    year: "2026",
    subtitle: "Our Visionaries",
    description: "The core group working around the clock to organize the verified learning ecosystem in India."
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=75&w=600&auto=format",
    fullImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=950&auto=format",
    title: "Platform Launch Unveiling",
    category: "Events",
    year: "2026",
    subtitle: "New Beginnings",
    description: "Unveiling our hybrid learning workspace, analytics layer, and teacher matching dashboard."
  }
];

const categories = ['All', 'Olympiad', 'Teachers', 'Community', 'Learning', 'Team', 'Events'];

export default function GalleryPreview({ background = 'var(--color-neutral)' }) {
  const finalBg = background === 'var(--color-neutral)' ? 'transparent' : background;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock scroll when overlay or focused lightbox is open
  useEffect(() => {
    if (archiveOpen || focusedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [archiveOpen, focusedIndex]);

  const featuredItem = hallOfFameItems.find(item => item.featured) || hallOfFameItems[0];
  const supportingItems = hallOfFameItems.filter(item => item.id !== featuredItem.id).slice(0, 3);

  const filteredArchiveItems = selectedCategory === 'All'
    ? hallOfFameItems
    : hallOfFameItems.filter(item => item.category === selectedCategory);

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    if (focusedIndex === null) return;
    const items = archiveOpen ? filteredArchiveItems : hallOfFameItems;
    setFocusedIndex((focusedIndex - 1 + items.length) % items.length);
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    if (focusedIndex === null) return;
    const items = archiveOpen ? filteredArchiveItems : hallOfFameItems;
    setFocusedIndex((focusedIndex + 1) % items.length);
  };

  const activeFocusedList = archiveOpen ? filteredArchiveItems : hallOfFameItems;
  const currentFocusedItem = focusedIndex !== null ? activeFocusedList[focusedIndex] : null;

  return (
    <section id="gallery" className="section" style={{ background: finalBg === 'transparent' ? 'linear-gradient(180deg, #FFFFFF 0%, #E3E8FF 50%, rgba(143, 149, 246, 0.42) 100%)' : finalBg, overflow: 'hidden', padding: isMobile ? '50px 0' : '90px 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* EDITORIAL SECTION HEADER */}
        <div style={{ textAlign: 'left', marginBottom: isMobile ? '28px' : '40px', maxWidth: '680px' }}>
          <FadeUp>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#6366F1',
              display: 'block',
              marginBottom: '8px'
            }}>
              THE MENTR HALL OF FAME
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              onClick={() => isMobile && setIsDescExpanded(!isDescExpanded)}
              style={{
                fontFamily: 'var(--font-hero)',
                fontSize: isMobile ? '28px' : 'clamp(32px, 3.5vw, 44px)',
                fontWeight: 800,
                color: '#0F172A',
                lineHeight: 1.15,
                margin: '0 0 12px',
                letterSpacing: '-0.02em',
                cursor: isMobile ? 'pointer' : 'default',
                userSelect: 'none'
              }}
            >
              Moments worth celebrating.
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
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: isMobile ? '14px' : '16px',
              color: '#64748B',
              lineHeight: 1.6,
              margin: 0
            }}>
              From student achievements and Olympiad milestones to mentor moments and community events, explore the people and moments that make The MentR special.
            </p>
          </div>
        </div>

        {/* CURATED PHOTOGRAPH COMPOSITION */}
      <FadeUp delay={0.25}>
        {isMobile ? (
          /* Mobile Vertical Composition */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Featured Mobile Photo */}
            <div
              onClick={() => setFocusedIndex(hallOfFameItems.findIndex(i => i.id === featuredItem.id))}
              style={{ cursor: 'pointer' }}
            >
              <div style={{
                width: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '16 / 10'
              }}>
                <img
                  src={featuredItem.image}
                  alt={featuredItem.title}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
              <div style={{ marginTop: '12px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#6366F1', textTransform: 'uppercase' }}>
                  {featuredItem.category} · {featuredItem.year}
                </span>
                <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: '19px', fontWeight: 800, color: '#0F172A', margin: '4px 0 6px' }}>
                  {featuredItem.subtitle || featuredItem.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  {featuredItem.description}
                </p>
              </div>
            </div>

            {/* Supporting Mobile Photos */}
            {supportingItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setFocusedIndex(hallOfFameItems.findIndex(i => i.id === item.id))}
                style={{ cursor: 'pointer' }}
              >
                <div style={{
                  width: '100%',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  aspectRatio: '16 / 10',
                  position: 'relative'
                }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: '#6366F1', textTransform: 'uppercase' }}>
                    {item.category}
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-hero)', fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: '2px 0 0' }}>
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop Asymmetric Editorial Composition */
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '36px',
            alignItems: 'start'
          }}>
            {/* Featured Main Photo Column */}
            <div
              onClick={() => setFocusedIndex(hallOfFameItems.findIndex(i => i.id === featuredItem.id))}
              className="hall-of-fame-featured-group"
              style={{ cursor: 'pointer' }}
            >
              <div style={{
                borderRadius: '20px',
                overflow: 'hidden',
                aspectRatio: '16 / 10',
                position: 'relative',
                background: '#F1F5F9'
              }}>
                <img
                  src={featuredItem.image}
                  alt={featuredItem.title}
                  loading="lazy"
                  decoding="async"
                  width="700"
                  height="437"
                  className="hall-of-fame-img-zoom"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: 'rgba(15, 23, 42, 0.5)',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}>
                  <Maximize2 size={15} />
                </div>
              </div>

              <div style={{ marginTop: '18px', paddingRight: '20px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#6366F1',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '6px'
                }}>
                  {featuredItem.category} · {featuredItem.year}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-hero)',
                  fontSize: '23px',
                  fontWeight: 800,
                  color: '#0F172A',
                  margin: '0 0 8px',
                  lineHeight: 1.2
                }}>
                  {featuredItem.subtitle || featuredItem.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: '#64748B',
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: '520px'
                }}>
                  {featuredItem.description}
                </p>
              </div>
            </div>

            {/* Supporting Secondary Photos Column */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {supportingItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setFocusedIndex(hallOfFameItems.findIndex(i => i.id === item.id))}
                  className="hall-of-fame-featured-group"
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    aspectRatio: '4 / 3',
                    position: 'relative',
                    background: '#F1F5F9'
                  }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="hall-of-fame-img-zoom"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#6366F1', textTransform: 'uppercase', display: 'block' }}>
                      {item.category}
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-hero)', fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: '3px 0 0', lineHeight: 1.3 }}>
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </FadeUp>

      {/* MINIMAL EXPLORATION CTA BUTTON */}
      <FadeUp delay={0.3}>
        <div style={{ marginTop: isMobile ? '32px' : '44px', textAlign: 'left' }}>
          <button
            onClick={() => setArchiveOpen(true)}
            className="hall-of-fame-cta-btn"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: '15px',
              fontWeight: 700,
              color: '#4F7CFF',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>View More Moments</span>
            <ArrowRight size={17} className="cta-arrow" style={{ transition: 'transform 0.2s ease' }} />
          </button>
        </div>
      </FadeUp>

    </div>

      {/* =================================================================== */ }
  {/* STATE 2 — FULLSCREEN ARCHIVE OVERLAY (LIGHTWEIGHT RENDERING)       */ }
  {/* =================================================================== */ }
  {
    archiveOpen && (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        zIndex: 99998,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Archive Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '14px 18px' : '20px 36px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          flexShrink: 0
        }}>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', color: '#818CF8', textTransform: 'uppercase', display: 'block' }}>
              ARCHIVE
            </span>
            <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: isMobile ? '17px' : '20px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              THE MENTR HALL OF FAME
            </h3>
          </div>

          <button
            onClick={() => setArchiveOpen(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Minimal Category Filter Tabs */}
        <div style={{
          padding: isMobile ? '10px 18px' : '14px 36px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          flexShrink: 0
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat ? '#4F7CFF' : 'rgba(255, 255, 255, 0.08)',
                color: selectedCategory === cat ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                border: 'none',
                borderRadius: '99px',
                padding: '5px 14px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Archive Photo Grid Container */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: isMobile ? '16px' : '32px',
          scrollbarWidth: 'thin'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: isMobile ? '12px' : '24px',
            maxWidth: '1280px',
            margin: '0 auto'
          }}>
            {filteredArchiveItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setFocusedIndex(idx)}
                className="archive-photo-card"
                style={{
                  cursor: 'pointer',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '4 / 3',
                  background: '#1E293B'
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <div className="archive-photo-overlay" style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0) 60%)',
                  opacity: isMobile ? 1 : 0,
                  transition: 'opacity 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: isMobile ? '10px' : '16px'
                }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#818CF8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {item.category}
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-hero)', fontSize: isMobile ? '12.5px' : '15px', fontWeight: 700, color: '#FFFFFF', margin: '2px 0 0' }}>
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  {/* =================================================================== */ }
  {/* FOCUSED SINGLE IMAGE VIEWER LIGHTBOX                                */ }
  {/* =================================================================== */ }
  {
    focusedIndex !== null && currentFocusedItem && (
      <div
        onClick={() => setFocusedIndex(null)}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.94)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '16px' : '36px'
        }}
      >
        {/* Close button */}
        <button
          onClick={(e) => { e.stopPropagation(); setFocusedIndex(null); }}
          style={{
            position: 'absolute',
            top: isMobile ? 16 : 24,
            right: isMobile ? 16 : 24,
            background: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        {/* Left / Right Nav Arrows */}
        <button
          onClick={handlePrevPhoto}
          style={{
            position: 'absolute',
            left: isMobile ? 10 : 28,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={handleNextPhoto}
          style={{
            position: 'absolute',
            right: isMobile ? 10 : 28,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <ChevronRight size={22} />
        </button>

        {/* Focused Item Layout Container */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '900px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Dominant Image View */}
          <div style={{
            width: '100%',
            maxHeight: isMobile ? '55vh' : '65vh',
            borderRadius: '14px',
            overflow: 'hidden',
            background: '#020617'
          }}>
            <img
              src={currentFocusedItem.fullImage || currentFocusedItem.image}
              alt={currentFocusedItem.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                maxHeight: isMobile ? '55vh' : '65vh',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </div>

          {/* Editorial Caption Details */}
          <div style={{ textAlign: 'center', marginTop: '20px', maxWidth: '580px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: '#818CF8', textTransform: 'uppercase' }}>
              {currentFocusedItem.category} · {currentFocusedItem.year}
            </span>
            <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: isMobile ? '19px' : '24px', fontWeight: 800, color: '#FFFFFF', margin: '4px 0 8px' }}>
              {currentFocusedItem.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '13px' : '14.5px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5, margin: 0 }}>
              {currentFocusedItem.description}
            </p>
          </div>
        </div>
      </div>
    )
  }

  {/* Custom Scoped Styles for Hover Transitions */ }
  <style>{`
        .hall-of-fame-featured-group:hover .hall-of-fame-img-zoom {
          transform: scale(1.025);
        }
        .hall-of-fame-cta-btn:hover .cta-arrow {
          transform: translateX(4px);
        }
        .archive-photo-card:hover img {
          transform: scale(1.03);
        }
        .archive-photo-card:hover .archive-photo-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section >
  );
}
