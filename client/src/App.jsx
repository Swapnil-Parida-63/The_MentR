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
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={
              <div className="section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
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
