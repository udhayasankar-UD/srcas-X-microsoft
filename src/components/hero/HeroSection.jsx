import { useState, useEffect, useRef } from 'react';
import GlobeCanvas from '../ui/GlobeCanvas';
import { theme } from '../../theme';

import srcasLogo from '../../assets/logo/srcas-1-logo.png';
import msLogo from '../../assets/logo/microsoft.png';
import pcLogo from '../../assets/logo/programming-club-2-logo.png';

// ── Typewriter config ──────────────────────────────────────────────────────────
// Line 1 types in Plus Jakarta Sans (heading font), dark color
// Line 2 types in Press Start 2P (pixel font), Microsoft Blue
const LINE1 = "What's the Next";
const LINE2 = "Big Idea!";
const CHAR_DELAY = 90;    // ms per character — slower, more deliberate
const CURSOR_BLINK = 530; // ms blink interval
const LINE_PAUSE = 180;   // pause between line 1 done and line 2 starting
const REVEAL_DELAY = 380; // pause after all typing before revealing rest

export default function HeroSection() {
  // typed1 = chars of LINE1 typed so far, typed2 = chars of LINE2
  const [typed1, setTyped1]         = useState('');
  const [typed2, setTyped2]         = useState('');
  const [line1Done, setLine1Done]   = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [revealed, setRevealed]     = useState(false);

  const t1Ref     = useRef(null);
  const t2Ref     = useRef(null);
  const cursorRef = useRef(null);
  const revealRef = useRef(null);

  // ── Type line 1 ─────────────────────────────────────────────────────────────
  useEffect(() => {
    let i = 0;
    t1Ref.current = setInterval(() => {
      i++;
      setTyped1(LINE1.slice(0, i));
      if (i >= LINE1.length) {
        clearInterval(t1Ref.current);
        setLine1Done(true);
      }
    }, CHAR_DELAY);
    return () => clearInterval(t1Ref.current);
  }, []);

  // ── Type line 2 after line 1 finishes ───────────────────────────────────────
  useEffect(() => {
    if (!line1Done) return;
    let j = 0;
    const start = setTimeout(() => {
      t2Ref.current = setInterval(() => {
        j++;
        setTyped2(LINE2.slice(0, j));
        if (j >= LINE2.length) {
          clearInterval(t2Ref.current);
          setTypingDone(true);
        }
      }, CHAR_DELAY);
    }, LINE_PAUSE);
    return () => { clearTimeout(start); clearInterval(t2Ref.current); };
  }, [line1Done]);

  // ── Cursor blink ─────────────────────────────────────────────────────────────
  useEffect(() => {
    cursorRef.current = setInterval(() => setShowCursor(v => !v), CURSOR_BLINK);
    return () => clearInterval(cursorRef.current);
  }, []);

  // ── Reveal rest after typing done ────────────────────────────────────────────
  useEffect(() => {
    if (!typingDone) return;
    revealRef.current = setTimeout(() => {
      setRevealed(true);
      clearInterval(cursorRef.current);
      setShowCursor(false);
    }, REVEAL_DELAY);
    return () => clearTimeout(revealRef.current);
  }, [typingDone]);

  // ── Styles ──────────────────────────────────────────────────────────────────
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
      transform: 'translateY(-40px)',
    },
    heading: {
      fontFamily: theme.fonts.heading,
      fontSize: 'clamp(2.5rem, 7.5vw, 5.5rem)',
      fontWeight: 800,
      lineHeight: 1.15,
      color: theme.colors.textPrimary,
      marginBottom: '0.15rem',
      letterSpacing: '0.02em',
      minHeight: '3em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    bigIdea: {
      fontFamily: theme.fonts.pixel,
      color: theme.colors.microsoftBlue,
      fontSize: 'clamp(2rem, 5vw, 4.5rem)',
      display: 'block',
      marginTop: '0.4rem',
      lineHeight: 1.2,
    },
    // Reveal wrapper — shared transition for subtext, button, globe
    reveal: (delay = 0) => ({
      opacity: revealed ? 1 : 0,
      transform: revealed ? 'translateY(0)' : 'translateY(22px)',
      transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      pointerEvents: revealed ? 'auto' : 'none',
    }),
    subtext: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#555555',
      lineHeight: 1.6,
      maxWidth: '520px',
      marginBottom: '2rem',
      letterSpacing: '0.01em',
    },
    globeWrap: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '60%',
      zIndex: 5,
      pointerEvents: 'none',
      // Globe fades in slightly later
      opacity: revealed ? 1 : 0,
      transform: revealed ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) 200ms, transform 1s cubic-bezier(0.16,1,0.3,1) 200ms`,
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
    },
  };

  // ── Cursor element ───────────────────────────────────────────────────────────
  const Cursor = () => (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: '3px',
        height: '0.82em',
        background: theme.colors.textPrimary,
        marginLeft: '4px',
        verticalAlign: 'middle',
        borderRadius: '1px',
        opacity: showCursor ? 1 : 0,
        transition: 'opacity 0.08s',
      }}
    />
  );

  // ── Render heading ───────────────────────────────────────────────────────────
  const renderHeading = () => (
    <>
      {/* Line 1 — Plus Jakarta Sans, dark */}
      <span style={{ display: 'block' }}>
        {typed1}
        {!line1Done && <Cursor />}
      </span>

      {/* Line 2 — Press Start 2P, Microsoft Blue */}
      {line1Done && (
        <span style={styles.bigIdea}>
          {typed2}
          {!typingDone && <Cursor />}
        </span>
      )}
    </>
  );

  return (
    <section style={styles.hero} id="hero" aria-labelledby="hero-heading">
      <div style={styles.bg} aria-hidden="true" />

      {/* Partner logos — reveal with rest */}
      <div
        style={{
          ...styles.partners,
          ...styles.reveal(100),
        }}
        className="hero-partners-hide-mobile"
      >
        <img src={srcasLogo} alt="SRCAS" style={styles.partnerLogo} />
        <div style={styles.partnerDivider} />
        <img src={msLogo} alt="Microsoft" style={styles.partnerLogo} />
        <div style={styles.partnerDivider} />
        <img src={pcLogo} alt="Programming Club" style={styles.partnerLogo} />
      </div>

      <div style={styles.content}>
        {/* Heading — always visible, types in */}
        <h1 style={styles.heading} id="hero-heading">
            {renderHeading()}
        </h1>

        {/* Subtext — revealed after typing */}
        <div style={styles.reveal(0)}>
          <p style={styles.subtext}>
            The world is changing faster than ever, and everyone can{' '}
            <br />
            see it through the rise of AI.
          </p>
        </div>

        {/* CTA button — revealed slightly after subtext */}
        <div style={styles.reveal(120)}>
          <a href="#about" id="hero-learn-more-btn" style={{ textDecoration: 'none' }}>
            <span className="hero-btn-learn-more">
              <span className="hero-btn-circle">
                <span className="hero-btn-icon hero-btn-arrow" />
              </span>
              <span className="hero-btn-text">Register Now</span>
            </span>
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

        /* ── Uiverse learn-more button ── */
        .hero-btn-learn-more {
          position: relative;
          display: inline-block;
          cursor: pointer;
          outline: none;
          border: 0;
          vertical-align: middle;
          text-decoration: none;
          background: transparent;
          padding: 0;
          font-size: inherit;
          font-family: inherit;
          width: 13rem;
          height: auto;
        }
        .hero-btn-circle {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          position: relative;
          display: block;
          margin: 0;
          width: 3rem;
          height: 3rem;
          background: #111111;
          border-radius: 1.625rem;
        }
        .hero-btn-icon {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          background: #fff;
        }
        .hero-btn-arrow {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          left: 0.625rem;
          width: 1.125rem;
          height: 0.125rem;
          background: none;
        }
        .hero-btn-arrow::before {
          position: absolute;
          content: "";
          top: -0.29rem;
          right: 0.0625rem;
          width: 0.625rem;
          height: 0.625rem;
          border-top: 0.125rem solid #fff;
          border-right: 0.125rem solid #fff;
          transform: rotate(45deg);
        }
        .hero-btn-text {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 0.75rem 0;
          margin: 0 0 0 1.85rem;
          color: #111111;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          line-height: 1.6;
          text-align: center;
          text-transform: uppercase;
          font-family: inherit;
          white-space: nowrap;
        }
        .hero-btn-learn-more:hover .hero-btn-circle {
          width: 100%;
        }
        .hero-btn-learn-more:hover .hero-btn-arrow {
          background: #fff;
          transform: translate(1rem, 0);
        }
        .hero-btn-learn-more:hover .hero-btn-text {
          color: #fff;
        }
      `}</style>
    </section>
  );
}
