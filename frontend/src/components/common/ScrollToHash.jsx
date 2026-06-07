import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Monitors route transitions and handles smooth scrolling to anchor elements 
 * or scrolling to the top if no hash is present.
 */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        // Delay scroll slightly to ensure page assets are mounted
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
