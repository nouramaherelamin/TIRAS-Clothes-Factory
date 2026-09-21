import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useScrollReveal
 * Adds IntersectionObserver to all elements with reveal classes and adds
 * .is-visible when they enter the viewport.
 * NOTE: CSS already shows all content by default — this is progressive enhancement only.
 */
const useScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    // Small delay ensures DOM is fully rendered after route change
    const timer = setTimeout(() => {
      const selectors = [
        '.reveal-up',
        '.reveal-left',
        '.reveal-right',
        '.reveal-scale',
        '.reveal-clip',
      ];

      const elements = document.querySelectorAll(selectors.join(','));
      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Re-run on route change to pick up new elements
};

export default useScrollReveal;
