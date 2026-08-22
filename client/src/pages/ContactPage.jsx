import SEO from '../components/common/SEO';
import { PAGE_SEO } from '../config/seo.config';
import { PAGE_SCHEMAS } from '../config/schema.config';
import Breadcrumbs from '../components/common/Breadcrumbs';
import FormsSection from '../components/home/FormsSection';
import ContactSection from '../components/home/ContactSection';

export default function ContactPage() {
  return (
    <div className="subpage-wrapper" style={{ background: 'transparent', minHeight: '100vh' }}>
      <SEO {...PAGE_SEO.contact} schema={PAGE_SCHEMAS.contact} />
      <div className="container" style={{ paddingTop: '120px', marginBottom: '-80px', position: 'relative', zIndex: 10 }}>
        <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }]} />
      </div>
      <ContactSection isStandalonePage={true} />
      <FormsSection />
    </div>
  );
}
