import { useState, useEffect } from 'react';
import { theme } from '../theme';

const NAV_LINKS = [
  { label: 'About', href: '#' },
  { label: 'PS', href: '#' },
  { label: 'timeline', href: '#' },
  { label: 'prizes', href: '#' },
  { label: 'contact', href: '#' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const styles = {
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '0 2.5rem',
      height: scrolled ? '70px' : '80px',
      display: 'flex',
      alignItems: 'center',
      transition: `background ${theme.transitions.standard}, backdrop-filter ${theme.transitions.standard}, box-shadow ${theme.transitions.standard}, height ${theme.transitions.standard}`,
      background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.03)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
    },
    inner: {
      width: '100%',
      maxWidth: '1440px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontWeight: 700,
      fontSize: '1.25rem',
      letterSpacing: '-0.02em',
      color: theme.colors.textPrimary,
    },
    logoText: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontSize: '0.9rem',
    },
    links: {
      listStyle: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '2.5rem',
      opacity: scrolled ? 1 : 0,
      pointerEvents: scrolled ? 'auto' : 'none',
      transition: `opacity ${theme.transitions.standard}`,
    },
    link: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.05em',
      color: theme.colors.textSecondary,
      transition: `color ${theme.transitions.fast}`,
    },
    cta: {
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.05em',
      padding: '0.75rem 1.5rem',
      background: theme.colors.btnBg,
      color: theme.colors.btnText,
      borderRadius: '4px',
      opacity: scrolled ? 1 : 0,
      pointerEvents: scrolled ? 'auto' : 'none',
      transition: `opacity ${theme.transitions.standard}, transform ${theme.transitions.fast}, background ${theme.transitions.fast}`,
    }
  };

  return (
    <nav style={styles.navbar} role="navigation" aria-label="Main navigation">
      <div style={styles.inner}>
        <a href="#" style={styles.logo} aria-label="SRCAS Home">
          <span style={{ display: 'flex', alignItems: 'center' }} aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="9" stroke="#111" strokeWidth="1.6" fill="none"/>
              <circle cx="11" cy="11" r="3.5" fill="#111"/>
              <line x1="2" y1="11" x2="20" y2="11" stroke="#111" strokeWidth="1.2"/>
              <line x1="11" y1="2" x2="11" y2="20" stroke="#111" strokeWidth="1.2"/>
            </svg>
          </span>
          <span style={styles.logoText}>SRCAS</span>
        </a>

        <ul style={styles.links} role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a 
                href={link.href} 
                style={styles.link}
                onMouseEnter={(e) => e.target.style.color = theme.colors.textPrimary}
                onMouseLeave={(e) => e.target.style.color = theme.colors.textSecondary}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a 
          href="#contact" 
          style={styles.cta} 
          id="nav-contact-btn"
          onMouseEnter={(e) => {
            e.target.style.background = '#333';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = theme.colors.btnBg;
            e.target.style.transform = 'translateY(0)';
          }}
        >
          CONTACT US
        </a>
      </div>
    </nav>
  );
}
