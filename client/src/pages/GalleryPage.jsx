import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GalleryPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
    setTimeout(() => {
      const el = document.getElementById('gallery');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }, [navigate]);

  return null;
}
