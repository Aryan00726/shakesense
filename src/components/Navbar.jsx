import { useState, useEffect, useCallback } from 'react';
import { NAV_LINKS, BRAND } from '../data/siteConfig';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Check initial preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setIsLightMode(true);
      document.documentElement.classList.add('theme-light');
    }
  }, []);

  const toggleTheme = () => {
    if (isLightMode) {
      document.documentElement.classList.remove('theme-light');
      setIsLightMode(false);
    } else {
      document.documentElement.classList.add('theme-light');
      setIsLightMode(true);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Find active section
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar__inner">
        {/* Brand */}
        <a href="#" className="navbar__brand" aria-label="ShakeSense home">
          <svg className="navbar__logo" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
            <path d="M4 16 Q8 8, 12 16 Q16 24, 20 16 Q24 8, 28 16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M4 16 Q8 12, 12 16 Q16 20, 20 16 Q24 12, 28 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
          </svg>
          <span className="navbar__brand-text">{BRAND.name}</span>
        </a>

        {/* Desktop Links */}
        <div className="navbar__links" role="menubar">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link ${activeSection === link.href.replace('#', '') ? 'navbar__link--active' : ''}`}
              onClick={e => handleNavClick(e, link.href)}
              role="menuitem"
            >
              {link.label}
            </a>
          ))}
        </div>
        {/* Theme Toggle */}
        <button
          className="navbar__theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {isLightMode ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          )}
        </button>

        {/* Mobile toggle */}
        <button
          className={`navbar__toggle ${mobileOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`} role="menu">
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="navbar__mobile-link"
            onClick={e => handleNavClick(e, link.href)}
            role="menuitem"
          >
            {link.label}
          </a>
        ))}
        {/* Mobile CTA removed */}
      </div>
    </nav>
  );
}
