import { useEffect, lazy, Suspense } from 'react';
import SEO from '../components/common/SEO';
import { PAGE_SEO } from '../config/seo.config';
import { PAGE_SCHEMAS } from '../config/schema.config';
import HeroSection from '../components/home/HeroSection';
import GlobalThread from '../components/home/GlobalThread';
import DeferredSection from '../components/common/DeferredSection';

// Code-split below-the-fold sections so the initial viewport bundle stays ultra-lightweight
const VisionSection = lazy(() => import('../components/home/VisionSection'));
const PainPointsSection = lazy(() => import('../components/home/PainPointsSection'));
const WhySection = lazy(() => import('../components/home/WhySection'));
const ServicesSection = lazy(() => import('../components/home/ServicesSection'));
const AvsarSection = lazy(() => import('../components/home/AvsarSection'));
const OrganogramSection = lazy(() => import('../components/home/OrganogramSection'));
const ShowcaseSection = lazy(() => import('../components/home/ShowcaseSection'));
const TestimonialsSection = lazy(() => import('../components/home/TestimonialsSection'));
const BlogsPreview = lazy(() => import('../components/home/BlogsPreview'));
const FormsSection = lazy(() => import('../components/home/FormsSection'));
const ContactSection = lazy(() => import('../components/home/ContactSection'));

const SECTION_ORDER = [
  'vision',
  'pain',
  'why',
  'services',
  'avsar',
  'organogram',
  'showcase',
  'testimonials',
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

      {/* Below-the-fold sections: Deferred and code-split until scrolled near */}
      <Suspense fallback={<div style={{ minHeight: '200px' }} />}>
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
        <DeferredSection id="blogs" minHeight="200px">
          <BlogsPreview />
        </DeferredSection>
        <DeferredSection id="contact-forms" minHeight="200px">
          <FormsSection />
        </DeferredSection>
        <DeferredSection id="contact-section" minHeight="200px">
          <ContactSection />
        </DeferredSection>
      </Suspense>
    </div>
  );
}
