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

      {/* Below-the-fold sections: Code-split independently for smooth background streaming and stable scroll height */}
      <div id="vision">
        <Suspense fallback={<div style={{ minHeight: '600px' }} />}>
          <VisionSection />
        </Suspense>
      </div>

      <div id="pain">
        <Suspense fallback={<div style={{ minHeight: '600px' }} />}>
          <PainPointsSection />
        </Suspense>
      </div>

      <div id="why">
        <Suspense fallback={<div style={{ minHeight: '600px' }} />}>
          <WhySection />
        </Suspense>
      </div>

      <div id="services">
        <Suspense fallback={<div style={{ minHeight: '600px' }} />}>
          <ServicesSection />
        </Suspense>
      </div>

      <div id="avsar">
        <Suspense fallback={<div style={{ minHeight: '500px' }} />}>
          <AvsarSection />
        </Suspense>
      </div>

      <div id="organogram">
        <Suspense fallback={<div style={{ minHeight: '500px' }} />}>
          <OrganogramSection />
        </Suspense>
      </div>

      <div id="showcase">
        <Suspense fallback={<div style={{ minHeight: '600px' }} />}>
          <ShowcaseSection />
        </Suspense>
      </div>

      <div id="testimonials">
        <Suspense fallback={<div style={{ minHeight: '500px' }} />}>
          <TestimonialsSection />
        </Suspense>
      </div>

      <div id="blogs">
        <Suspense fallback={<div style={{ minHeight: '500px' }} />}>
          <BlogsPreview />
        </Suspense>
      </div>

      <div id="contact-forms">
        <Suspense fallback={<div style={{ minHeight: '500px' }} />}>
          <FormsSection />
        </Suspense>
      </div>

      <div id="contact-section">
        <Suspense fallback={<div style={{ minHeight: '500px' }} />}>
          <ContactSection />
        </Suspense>
      </div>
    </div>
  );
}
