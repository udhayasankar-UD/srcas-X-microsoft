import GlobeCanvas from './GlobeCanvas';
import { theme } from '../theme';

import srcasLogo from '../assets/logo/srcas-1-logo.png';
import msLogo from '../assets/logo/microsoft.png';
import pcLogo from '../assets/logo/programming-club-2-logo.png';

export default function HeroSection() {
  const styles = {
    hero: {
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundColor: theme.colors.bg,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '50%',
      background: 'linear-gradient(to bottom, #f0f0f0 0%, #ffffff 100%)',
      pointerEvents: 'none',
      zIndex: 1,
    },
    partners: {
      position: 'absolute',
      top: '1.5rem',
      right: '2.5rem',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      padding: '0.5rem 1rem',
    },
    partnerLogo: {
      height: '32px',
      width: 'auto',
      objectFit: 'contain',
      opacity: 0.8,
      transition: 'opacity 0.3s ease, transform 0.3s ease',
    },
    partnerDivider: {
      width: '1px',
      height: '20px',
      backgroundColor: theme.colors.border,
    },
    content: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: '5vh',
    },
    heading: {
      fontFamily: theme.fonts.heading,
      fontSize: 'clamp(2.5rem, 7.5vw, 5.5rem)',
      fontWeight: 800,
      lineHeight: 1.1,
      color: theme.colors.textPrimary,
      marginBottom: '1.5rem',
      letterSpacing: '-0.04em',
    },
    wordSpaced: {
      fontFamily: theme.fonts.pixel,
      fontWeight: 60,
      color: theme.colors.microsoftBlue,
      fontSize: 'clamp(4rem, 8vw, 7rem)',
    },
    subtext: {
      fontSize: '1.125rem',
      fontWeight: 500,
      color: '#333333',
      lineHeight: 1.6,
      maxWidth: '600px',
      marginBottom: '2.5rem',
    },
    btnWrap: {
      position: 'relative',
      padding: '10px',
      display: 'inline-block',
    },
    cta: {
      display: 'inline-block',
      backgroundColor: theme.colors.microsoftBlue,
      color: 'white',
      padding: '1rem 2.5rem',
      fontSize: '0.875rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      transition: 'background 0.3s ease, transform 0.2s ease',
    },
    bracket: {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: `1.5px solid ${theme.colors.microsoftBlue}`,
      pointerEvents: 'none',
    },
    globeWrap: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '60%',
      zIndex: 5,
      pointerEvents: 'none',
    },
    bottomFade: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '15vh',
      background: 'linear-gradient(to top, #ffffff 0%, transparent 100%)',
      zIndex: 6,
      pointerEvents: 'none',
    }
  };

  return (
    <section style={styles.hero} id="hero" aria-labelledby="hero-heading">
      <div style={styles.bg} aria-hidden="true" />

      <div style={styles.partners} className="hero-partners-hide-mobile">
        <img src={srcasLogo} alt="SRCAS" style={styles.partnerLogo} />
        <div style={styles.partnerDivider} />
        <img src={msLogo} alt="Microsoft" style={styles.partnerLogo} />
        <div style={styles.partnerDivider} />
        <img src={pcLogo} alt="Programming Club" style={styles.partnerLogo} />
      </div>

      <div style={styles.content}>
        <h1 style={styles.heading} id="hero-heading">
          What's the Next 
          <span style={styles.wordSpaced}> Big Idea</span>
           !
        </h1>

        <p style={styles.subtext}>
          The world is changing faster than ever, and everyone can <br/> see it through the rise of AI.
        </p>

        <div style={styles.btnWrap}>
          <span style={{ ...styles.bracket, top: 0, left: 0, borderRight: 'none', borderBottom: 'none' }}></span>
          <span style={{ ...styles.bracket, top: 0, right: 0, borderLeft: 'none', borderBottom: 'none' }}></span>
          <span style={{ ...styles.bracket, bottom: 0, left: 0, borderRight: 'none', borderTop: 'none' }}></span>
          <span style={{ ...styles.bracket, bottom: 0, right: 0, borderLeft: 'none', borderTop: 'none' }}></span>
          
          <a 
            href="#about" 
            style={styles.cta} 
            id="hero-learn-more-btn"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.colors.microsoftBlueHover;
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = theme.colors.microsoftBlue;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Register Now
          </a>
        </div>
      </div>

      <div style={styles.globeWrap} aria-hidden="true">
        <GlobeCanvas />
      </div>

      <div style={styles.bottomFade} aria-hidden="true" />
      
      <style>{`
        @media (max-width: 768px) {
          .hero-partners-hide-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
}
