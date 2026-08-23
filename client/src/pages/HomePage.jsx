import { useEffect } from 'react';
import SEO from '../components/common/SEO';
import { PAGE_SEO } from '../config/seo.config';
import { PAGE_SCHEMAS } from '../config/schema.config';
import HeroSection from '../components/home/HeroSection';
import PainPointsSection from '../components/home/PainPointsSection';
import WhySection from '../components/home/WhySection';
import ServicesSection from '../components/home/ServicesSection';
import AvsarSection from '../components/home/AvsarSection';
import VisionSection from '../components/home/VisionSection';
import OrganogramSection from '../components/home/OrganogramSection';
import ShowcaseSection from '../components/home/ShowcaseSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import GalleryPreview from '../components/home/GalleryPreview';
import BlogsPreview from '../components/home/BlogsPreview';
import FormsSection from '../components/home/FormsSection';
import ContactSection from '../components/home/ContactSection';
import GlobalThread from '../components/home/GlobalThread';
import DeferredSection from '../components/common/DeferredSection';

const SECTION_ORDER = [
  'vision',
  'pain',
  'why',
  'services',
  'avsar',
  'organogram',
  'showcase',
  'testimonials',
  'gallery',
  'blogs',
  'contact-forms',
  'contact-section'
];

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.__PENDING_SECTION_SCROLL__) {
      const targetId = window.__PENDING_SECTION_SCROLL__;
      const targetIndex = SECTION_ORDER.indexOf(targetId);
      if (targetIndex !== -1) {
        SECTION_ORDER.slice(0, targetIndex + 1).forEach(id => {
          window.dispatchEvent(new CustomEvent('force-mount-section', { detail: id }));
        });
      } else {
        window.dispatchEvent(new CustomEvent('force-mount-section', { detail: targetId }));
      }
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <SEO {...PAGE_SEO.home} schema={PAGE_SCHEMAS.home} />
      <GlobalThread />
      
      {/* First viewport: Rendered immediately */}
      <HeroSection />

      {/* Below-the-fold sections: Deferred until user scrolls near them */}
      <DeferredSection id="vision" minHeight="200px">
        <VisionSection />
      </DeferredSection>
      <DeferredSection id="pain" minHeight="200px">
        <PainPointsSection />
      </DeferredSection>
      <DeferredSection id="why" minHeight="200px">
        <WhySection />
      </DeferredSection>
      <DeferredSection id="services" minHeight="200px">
        <ServicesSection />
      </DeferredSection>
      <DeferredSection id="avsar" minHeight="200px">
        <AvsarSection />
      </DeferredSection>
      <DeferredSection id="organogram" minHeight="200px">
        <OrganogramSection />
      </DeferredSection>
      <DeferredSection id="showcase" minHeight="200px">
        <ShowcaseSection />
      </DeferredSection>
      <DeferredSection id="testimonials" minHeight="200px">
        <TestimonialsSection />
      </DeferredSection>
      <DeferredSection id="gallery" minHeight="200px">
        <GalleryPreview />
      </DeferredSection>
      <DeferredSection id="blogs" minHeight="200px">
        <BlogsPreview />
      </DeferredSection>
      <DeferredSection id="contact-forms" minHeight="200px">
        <FormsSection />
      </DeferredSection>
      <DeferredSection id="contact-section" minHeight="200px">
        <ContactSection />
      </DeferredSection>
    </div>
  );
}
