import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModalContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogsPage from './pages/BlogsPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import PricingPage from './pages/PricingPage';
import { lazy, Suspense } from 'react';
const TeacherTermsPage = lazy(() => import('./pages/TeacherTermsPage'));

import SEO from './components/common/SEO';
import { PAGE_SEO } from './config/seo.config';

// ScrollToTop scroll restoration component for seamless routing
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Standalone Legal Pages (Loaded only when clicked, no Layout/Navbar/Footer wrapper) */}
          <Route path="/terms" element={<Suspense fallback={<div style={{ padding: 40, textAlign: 'center', minHeight: '60vh' }}>Loading Legal Center...</div>}><TeacherTermsPage /></Suspense>} />
          <Route path="/terms-teachers" element={<Suspense fallback={<div style={{ padding: 40, textAlign: 'center', minHeight: '60vh' }}>Loading Legal Center...</div>}><TeacherTermsPage /></Suspense>} />
          <Route path="/terms/teachers" element={<Suspense fallback={<div style={{ padding: 40, textAlign: 'center', minHeight: '60vh' }}>Loading Legal Center...</div>}><TeacherTermsPage /></Suspense>} />
          <Route path="/terms-parents" element={<Suspense fallback={<div style={{ padding: 40, textAlign: 'center', minHeight: '60vh' }}>Loading Legal Center...</div>}><TeacherTermsPage /></Suspense>} />
          <Route path="/privacy" element={<Suspense fallback={<div style={{ padding: 40, textAlign: 'center', minHeight: '60vh' }}>Loading Legal Center...</div>}><TeacherTermsPage /></Suspense>} />
          <Route path="/privacy-policy" element={<Suspense fallback={<div style={{ padding: 40, textAlign: 'center', minHeight: '60vh' }}>Loading Legal Center...</div>}><TeacherTermsPage /></Suspense>} />

          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<PricingPage />} />
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
      </ModalProvider>
    </AuthProvider>
  );
}
