import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModalContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';

// Code-split non-homepage route components so initial bundle stays lightweight
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const BlogsPage = lazy(() => import('./pages/BlogsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const AvsarPage = lazy(() => import('./pages/AvsarPage'));
const EcosystemPage = lazy(() => import('./pages/EcosystemPage'));
const TeacherTermsPage = lazy(() => import('./pages/TeacherTermsPage'));
const SitemapPage = lazy(() => import('./pages/SitemapPage'));
const VerifyTeachersPage = lazy(() => import('./pages/VerifyTeachersPage'));

import SEO from './components/common/SEO';
import { PAGE_SEO } from './config/seo.config';
import { FloatingDoodles } from './components/common/FloatingDoodles';

const notFoundDoodles = [
  { type: 'compass', size: 54, color: '#4F7CFF', opacity: 0.42, rotate: -15, position: { top: '15%', left: '12%' } },
  { type: 'magnify', size: 48, color: '#7C69F8', opacity: 0.38, rotate: 20, position: { top: '25%', right: '15%' } },
  { type: 'paperPlane', size: 56, color: '#3B82F6', opacity: 0.4, rotate: 15, position: { top: '65%', left: '16%' } },
  { type: 'sparkle', size: 40, color: '#7C69F8', opacity: 0.45, rotate: -10, position: { top: '70%', right: '18%' } },
  { type: 'bulb', size: 46, color: '#4F7CFF', opacity: 0.35, rotate: -12, position: { top: '45%', left: '8%' } },
  { type: 'star', size: 38, color: '#7C69F8', opacity: 0.38, rotate: 14, position: { top: '48%', right: '9%' } },
];

const NotFoundPage = () => (
  <div className="section" style={{ 
    textAlign: 'center', 
    minHeight: '75vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    padding: '80px 20px'
  }}>
    <SEO {...PAGE_SEO.notFound} />
    <FloatingDoodles items={notFoundDoodles} />
    <div style={{ position: 'relative', zIndex: 2, maxWidth: 500 }}>
      <div style={{ 
        display: 'inline-block',
        fontSize: 'clamp(72px, 12vw, 110px)', 
        fontWeight: 900, 
        lineHeight: 1,
        marginBottom: 12,
        background: 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.04em'
      }}>
        404
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', marginBottom: 10, letterSpacing: '-0.01em' }}>
        Page Not Found
      </h2>
      <p style={{ color: '#64748B', fontSize: 16, lineHeight: 1.6, marginBottom: 28 }}>
        Looks like this learning destination has moved or doesn't exist yet. Let's get you back on track!
      </p>
      <a href="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 99 }}>
        Return to Home →
      </a>
    </div>
  </div>
);

// ScrollToTop scroll restoration component for seamless routing
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!window.__PENDING_SECTION_SCROLL__) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

const PageFallback = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
    Loading...
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <ScrollToTop />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Standalone Legal Pages */}
            <Route path="/terms" element={<TeacherTermsPage />} />
            <Route path="/terms-teachers" element={<TeacherTermsPage />} />
            <Route path="/terms/teachers" element={<TeacherTermsPage />} />
            <Route path="/terms-parents" element={<TeacherTermsPage />} />
            <Route path="/privacy" element={<TeacherTermsPage />} />
            <Route path="/privacy-policy" element={<TeacherTermsPage />} />

            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blogs/:slug" element={<BlogsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/avsar" element={<AvsarPage />} />
              <Route path="/ecosystem" element={<EcosystemPage />} />
              <Route path="/verify" element={<VerifyTeachersPage />} />
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </ModalProvider>
    </AuthProvider>
  );
}
