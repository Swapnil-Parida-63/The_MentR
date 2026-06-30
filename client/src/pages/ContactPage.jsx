import FormsSection from '../components/home/FormsSection';
import ContactSection from '../components/home/ContactSection';

export default function ContactPage() {
  return (
    <div className="subpage-wrapper" style={{ background: 'var(--color-white)', minHeight: '100vh' }}>
      <ContactSection background="var(--color-white)" />
      <FormsSection background="var(--color-white)" />
    </div>
  );
}
