import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from '../Chatbot';
import FormModal from '../home/FormModal';
import ClickSpark from './ClickSpark';

export default function Layout() {
  return (
    <ClickSpark sparkColor="#4F7CFF" sparkSize={10} sparkRadius={24} sparkCount={8} duration={400}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
        <Footer />
        <Chatbot />
        <FormModal />
      </div>
    </ClickSpark>
  );
}
