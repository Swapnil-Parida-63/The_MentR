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

export default function GalleryPreview({ background = 'var(--color-neutral)' }) {
  const finalBg = background === 'var(--color-neutral)'
    ? 'radial-gradient(circle at 10% 20%, rgba(116, 105, 248, 0.05) 0%, transparent 60%), radial-gradient(circle at 90% 70%, rgba(79, 124, 255, 0.04) 0%, transparent 60%), #F7F5FF'
    : background;
  return (
    <section id="gallery" className="section" style={{ background: finalBg, overflow: 'hidden' }}>
      <div className="container">
        <FadeUp><div className="eyebrow">Gallery</div></FadeUp>
        <FadeUp delay={0.1}><h2 style={{ fontSize: 'clamp(28px,3vw,44px)', marginBottom: 8 }}>The community behind TheMentR.</h2></FadeUp>
        <FadeUp delay={0.2}><p style={{ color: 'var(--color-text-secondary)', marginBottom: 48 }}>Events, team moments, student achievements.</p></FadeUp>
        <FadeUp delay={0.2}>
          <div className="w-full">
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
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
