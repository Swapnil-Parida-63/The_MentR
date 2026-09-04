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
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/avsar" element={<AvsarPage />} />
              <Route path="/ecosystem" element={<EcosystemPage />} />
              <Route path="/verify" element={<VerifyTeachersPage />} />
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route path="*" element={
                <div className="section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <SEO {...PAGE_SEO.notFound} />
                  <h1 style={{ fontSize: 64, marginBottom: 16 }}>404</h1>
                  <p style={{ color: 'var(--color-text-secondary)' }}>Page not found</p>
                  <a href="/" className="btn btn-primary" style={{ marginTop: 24 }}>Go Home</a>
                </div>
              } />
            </Route>
          </Routes>
        </Suspense>
      </ModalProvider>
    </AuthProvider>
  );
}
