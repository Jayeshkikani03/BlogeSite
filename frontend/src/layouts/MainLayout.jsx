
import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ChatWidget from '../components/common/ChatWidget';

/**
 * Main Layout component wrapping client viewports with Navbar and Footer components.
 */
export default function MainLayout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <div className="d-flex flex-column min-h-screen">
        <main className="flex-grow-1">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-h-screen">
      <Navbar />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
