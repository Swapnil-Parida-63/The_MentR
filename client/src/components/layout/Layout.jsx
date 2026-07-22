import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from '../Chatbot';
import FormModal from '../home/FormModal';
import ClickSpark from './ClickSpark';

export default function Layout() {
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
        <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
          <Outlet />
        </main>
        <Footer style={{ position: 'relative', zIndex: 1 }} />
        <Chatbot />
        <FormModal />
      </div>
    </ClickSpark>
  );
}
