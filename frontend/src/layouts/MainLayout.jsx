
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

/**
 * Main Layout component wrapping client viewports with Navbar and Footer components.
 */
export default function MainLayout({ children }) {
  return (
    <div className="d-flex flex-column min-h-screen">
      <Navbar />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
