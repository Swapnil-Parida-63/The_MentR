import GalleryPreview from '../components/home/GalleryPreview';

export default function GalleryPage() {
  return (
    <div className="subpage-wrapper" style={{ background: 'var(--color-white)', minHeight: '100vh' }}>
      <GalleryPreview background="var(--color-white)" />
    </div>
  );
}
