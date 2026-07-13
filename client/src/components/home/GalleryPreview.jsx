import { FadeUp } from '../../hooks/useScrollReveal';
import Masonry from './Masonry';

const galleryItems = [
  {
    id: "1",
    images: [
      "https://images.unsplash.com/photo-1544535830-9dff9e02ffbc?q=80&w=500&auto=format",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=500&auto=format",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500&auto=format"
    ],
    url: "#",
    height: 600,
    title: "Teacher Onboarding Day",
    tag: "Event",
    description: "Welcoming our next cohort of verified educators across India. Comprehensive demo sessions and onboarding workshops."
  },
  {
    id: "2",
    images: [
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=500&auto=format",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=500&auto=format",
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=500&auto=format"
    ],
    url: "#",
    height: 400,
    title: "Olympiad Winners — IMO 2025",
    tag: "Achievement",
    description: "Honoring our exceptional students who secured top ranks in the International Mathematics Olympiad (IMO) 2025."
  },
  {
    id: "3",
    images: [
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=500&auto=format",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=500&auto=format",
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=500&auto=format"
    ],
    url: "#",
    height: 500,
    title: "Parent-Teacher Connect",
    tag: "Community",
    description: "Building strong bonds between parents and teachers during our city-wide interactive meetups."
  },
  {
    id: "4",
    images: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=500&auto=format",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=500&auto=format",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format"
    ],
    url: "#",
    height: 450,
    title: "Platform Launch Event",
    tag: "Product",
    description: "Unveiling our hybrid learning workspace, analytics layer, and teacher matching dashboard."
  },
  {
    id: "5",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format",
      "https://images.unsplash.com/photo-1556761175-b813d180190d?q=80&w=500&auto=format",
      "https://images.unsplash.com/photo-1531535934027-667f6787dea4?q=80&w=500&auto=format"
    ],
    url: "#",
    height: 550,
    title: "TheMentR Core Team",
    tag: "Team",
    description: "The core group working around the clock to organize the verified learning ecosystem in India."
  },
  {
    id: "6",
    images: [
      "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=500&auto=format",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500&auto=format",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=500&auto=format"
    ],
    url: "#",
    height: 400,
    title: "Study Sessions — Online",
    tag: "Learning",
    description: "Live interactive classrooms in action with digital whiteboards, real-time code execution, and high-fidelity video."
  }
];

import { useState, useEffect } from 'react';

export default function GalleryPreview({ background = 'var(--color-neutral)' }) {
  const finalBg = background === 'var(--color-neutral)' ? '#fafafc' : background;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="gallery" className="section" style={{ background: finalBg, overflow: 'hidden' }}>
      <div className="container">
        <FadeUp><div className="eyebrow">Gallery</div></FadeUp>
        <FadeUp delay={0.1}><h2 style={{ fontSize: isMobile ? '28px' : 'clamp(28px,3vw,44px)', marginBottom: 8 }}>The community behind TheMentR.</h2></FadeUp>
        <FadeUp delay={0.2}><p style={{ color: 'var(--color-text-secondary)', marginBottom: isMobile ? '24px' : '48px' }}>Events, team moments, student achievements.</p></FadeUp>
        <FadeUp delay={0.2}>
          <div className="w-full">
            {isMobile ? (
              <div className="mobile-swipe-carousel">
                {galleryItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="mobile-swipe-card"
                    style={{
                      position: 'relative',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      aspectRatio: '4 / 3',
                      background: `linear-gradient(to bottom, rgba(15,23,42,0) 40%, rgba(15,23,42,0.85) 100%), url(${item.images[0]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '20px',
                      boxShadow: '0 4px 12px rgba(10, 22, 40, 0.015)'
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      color: '#6366F1',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {item.tag}
                    </span>
                    <h4 style={{
                      fontFamily: 'var(--font-hero)',
                      fontSize: '15px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      margin: 0
                    }}>
                      {item.title}
                    </h4>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: '1.4',
                      margin: '4px 0 0',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <Masonry
                items={galleryItems}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.95}
                blurToFocus={true}
                colorShiftOnHover={false}
              />
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
