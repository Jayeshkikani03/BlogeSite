import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import authService from '../../services/authService';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * Sticky Navigation Bar with background blur, React Router navigation hooks, and scroll transitions.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const isHome = location.pathname === '/';

  return (
    <nav 
      className={`navbar navbar-expand-lg fixed-top ${
        scrolled ? 'bg-black bg-opacity-80 border-bottom' : 'bg-transparent'
      }`}
      style={{
        transition: 'var(--transition-cubic)',
        borderBottomColor: scrolled ? 'var(--border-muted)' : 'transparent',
        backdropFilter: scrolled || isOpen ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled || isOpen ? 'blur(16px)' : 'none',
        zIndex: 1040
      }}
    >
      <div className="container py-2">
        <Link 
          className="navbar-brand d-flex align-items-center" 
          to="/"
          aria-label="TechFlow Homepage"
        >
          <div 
            className="d-flex align-items-center justify-content-center me-2"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'var(--primary-glow)',
              color: '#000',
              fontWeight: '800',
              fontSize: '1.1rem'
            }}
          >
            TF
          </div>
          <span className="fw-extrabold text-white tracking-wider" style={{ fontSize: '1.2rem', letterSpacing: '-0.5px' }}>
            Tech<span className="text-gradient">Flow</span>
          </span>
        </Link>

        <button 
          className="navbar-toggler border-0 text-white" 
          type="button" 
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-list'}`} style={{ fontSize: '1.5rem', color: 'var(--text-white)' }}></i>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              {isHome ? (
                <a className="nav-link px-3 py-2 text-white" href="#home" onClick={() => setIsOpen(false)}>
                  Home
                </a>
              ) : (
                <Link className="nav-link px-3 py-2 text-white" to="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 text-white ${location.pathname === '/features' ? 'active text-gradient' : ''}`} 
                to="/features" 
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
            </li>
            <li className="nav-item">
              {isHome ? (
                <a className="nav-link px-3 py-2 text-white" href="#about" onClick={() => setIsOpen(false)}>
                  About
                </a>
              ) : (
                <Link className="nav-link px-3 py-2 text-white" to="/#about" onClick={() => setIsOpen(false)}>
                  About
                </Link>
              )}
            </li>
            <li className="nav-item">
              {isHome ? (
                <a className="nav-link px-3 py-2 text-white" href="#pricing" onClick={() => setIsOpen(false)}>
                  Pricing
                </a>
              ) : (
                <Link className="nav-link px-3 py-2 text-white" to="/#pricing" onClick={() => setIsOpen(false)}>
                  Pricing
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link px-3 py-2 text-white ${location.pathname === '/blog' ? 'active text-gradient' : ''}`}
                to="/blog"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
            </li>
            {authService.isAuthenticated() && (
              <>
                <li className="nav-item">
                  <Link 
                    className={`nav-link px-3 py-2 text-white ${location.pathname === '/system-status' ? 'active text-gradient-cyan' : ''}`} 
                    to="/system-status" 
                    onClick={() => setIsOpen(false)}
                  >
                    System Status
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className={`nav-link px-3 py-2 text-white ${location.pathname.startsWith('/admin') ? 'active text-gradient-cyan' : ''}`} 
                    to="/admin" 
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Panel
                  </Link>
                </li>
              </>
            )}
          </ul>
          
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            <button
              className="btn btn-saas-secondary px-3 py-2"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <i className={`bi ${theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill'}`}></i>
            </button>
            {isHome ? (
              <a 
                href="#contact" 
                className="btn btn-saas-primary" 
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </a>
            ) : (
              <Link 
                to="/#contact" 
                className="btn btn-saas-primary" 
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
