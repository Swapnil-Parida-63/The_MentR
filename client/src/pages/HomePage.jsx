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
      window.__PENDING_SECTION_SCROLL__ = null;
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <SEO {...PAGE_SEO.home} schema={PAGE_SCHEMAS.home} />
      <GlobalThread />
      
      {/* First viewport: Rendered immediately */}
      <HeroSection />

      {/* Below-the-fold sections: Deferred and code-split independently for ultra-fast initial load */}
      <DeferredSection id="vision" minHeight="650px" rootMargin="800px 0px">
        <Suspense fallback={<div style={{ minHeight: '650px' }} />}>
          <VisionSection />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="pain" minHeight="650px" rootMargin="800px 0px">
        <Suspense fallback={<div style={{ minHeight: '650px' }} />}>
          <PainPointsSection />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="why" minHeight="650px" rootMargin="800px 0px">
        <Suspense fallback={<div style={{ minHeight: '650px' }} />}>
          <WhySection />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="services" minHeight="650px" rootMargin="800px 0px">
        <Suspense fallback={<div style={{ minHeight: '650px' }} />}>
          <ServicesSection />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="avsar" minHeight="550px" rootMargin="800px 0px">
        <Suspense fallback={<div style={{ minHeight: '550px' }} />}>
          <AvsarSection />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="organogram" minHeight="550px" rootMargin="800px 0px">
        <Suspense fallback={<div style={{ minHeight: '550px' }} />}>
          <OrganogramSection />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="showcase" minHeight="650px" rootMargin="800px 0px">
        <Suspense fallback={<div style={{ minHeight: '650px' }} />}>
          <ShowcaseSection />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="testimonials" minHeight="500px" rootMargin="800px 0px">
        <Suspense fallback={<div style={{ minHeight: '500px' }} />}>
          <TestimonialsSection />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="blogs" minHeight="500px" rootMargin="800px 0px">
        <Suspense fallback={<div style={{ minHeight: '500px' }} />}>
          <BlogsPreview />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="contact-forms" minHeight="500px" rootMargin="800px 0px">
        <Suspense fallback={<div style={{ minHeight: '500px' }} />}>
          <FormsSection />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="contact-section" minHeight="500px" rootMargin="800px 0px">
        <Suspense fallback={<div style={{ minHeight: '500px' }} />}>
          <ContactSection />
        </Suspense>
      </DeferredSection>
    </div>
  );
}
