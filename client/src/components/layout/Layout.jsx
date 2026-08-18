import { lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from '../Chatbot';
import ClickSpark from './ClickSpark';

const FormModal = lazy(() => import('../home/FormModal'));

export default function Layout() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  const mainStyle = isLandingPage
    ? { flex: 1, position: 'relative', zIndex: 1 }
    : { 
        flex: 1, 
        position: 'relative', 
        zIndex: 1, 
        background: '#8f95f6',
        minHeight: '100vh'
      };

  return (
    <ClickSpark sparkColor="#4F7CFF" sparkSize={10} sparkRadius={24} sparkCount={8} duration={400}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Ambient Layout Mesh Orbs */}
        <div className="ambient-mesh-container">
          <div className="bg-mesh-orb-1" />
          <div className="bg-mesh-orb-2" />
          <div className="bg-mesh-orb-3" />
          <div className="bg-mesh-orb-4" />
          <div className="bg-mesh-orb-5" />
          <div className="bg-mesh-orb-6" />
        </div>

        <Navbar />
        <main style={mainStyle}>
          <Outlet />
        </main>
        <Footer style={{ position: 'relative', zIndex: 1 }} />
        <Chatbot />
        <Suspense fallback={null}>
          <FormModal />
        </Suspense>
      </div>
    </ClickSpark>
  );
}
