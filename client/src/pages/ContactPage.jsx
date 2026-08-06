import SEO from '../components/common/SEO';
import { PAGE_SEO } from '../config/seo.config';
import FormsSection from '../components/home/FormsSection';
import ContactSection from '../components/home/ContactSection';

export default function ContactPage() {
  return (
    <div className="subpage-wrapper" style={{ background: 'var(--color-white)', minHeight: '100vh' }}>
      <SEO {...PAGE_SEO.contact} />
      <ContactSection background="var(--color-white)" />
      <FormsSection background="var(--color-white)" />
    </div>
  );
}
