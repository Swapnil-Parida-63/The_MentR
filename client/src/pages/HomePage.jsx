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

export default function HomePage() {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <SEO {...PAGE_SEO.home} schema={PAGE_SCHEMAS.home} />
      <GlobalThread />
      
      {/* First viewport: Rendered immediately */}
      <HeroSection />

      {/* Below-the-fold sections: Deferred until user scrolls near them */}
      <DeferredSection id="vision" minHeight="600px">
        <VisionSection />
      </DeferredSection>
      <DeferredSection id="pain" minHeight="600px">
        <PainPointsSection />
      </DeferredSection>
      <DeferredSection id="why" minHeight="600px">
        <WhySection />
      </DeferredSection>
      <DeferredSection id="services" minHeight="600px">
        <ServicesSection />
      </DeferredSection>
      <DeferredSection id="avsar" minHeight="500px">
        <AvsarSection />
      </DeferredSection>
      <DeferredSection id="organogram" minHeight="500px">
        <OrganogramSection />
      </DeferredSection>
      <DeferredSection id="showcase" minHeight="600px">
        <ShowcaseSection />
      </DeferredSection>
      <DeferredSection id="testimonials" minHeight="500px">
        <TestimonialsSection />
      </DeferredSection>
      <DeferredSection id="gallery" minHeight="500px">
        <GalleryPreview />
      </DeferredSection>
      <DeferredSection id="blogs" minHeight="500px">
        <BlogsPreview />
      </DeferredSection>
      <DeferredSection id="contact-forms" minHeight="500px">
        <FormsSection />
      </DeferredSection>
      <DeferredSection id="contact-section" minHeight="500px">
        <ContactSection />
      </DeferredSection>
    </div>
  );
}
