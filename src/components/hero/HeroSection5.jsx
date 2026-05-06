import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import srcasLogo from '../../assets/logo/srcas-1-logo.png';
import msLogo    from '../../assets/logo/microsoft.png';
import pcLogo    from '../../assets/logo/programming-club-2-logo.png';

// ── Icons ───────────────────────────────────────────────────────────────────────
const CodeBracket = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);
const StarIcon = ({ size = 20, color = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);
const TrophyIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>
  </svg>
);
const BrainIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);
const PinIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const BulbIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"></path>
    <path d="M9 18h6"></path>
    <path d="M10 22h4"></path>
  </svg>
);
const CalendarIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

// ── Full-screen reactive MagnetLines background ───────────────────────────────
function MagnetBg() {
  const containerRef = useRef(null);
  const ROWS = 20, COLS = 32;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = container.querySelectorAll('span');

    let rafId;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onPointerMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('pointermove', onPointerMove);

    const tick = () => {
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const b  = mouseX - cx;
        const a  = mouseY - cy;
        const c  = Math.sqrt(a * a + b * b) || 1;
        const r  = ((Math.acos(b / c) * 180) / Math.PI) * (mouseY > cy ? 1 : -1);
        item.style.setProperty('--rotate', `${r}deg`);
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} style={{
      position: 'absolute', inset: 0,
      display: 'grid',
      gridTemplateColumns: `repeat(${COLS}, 1fr)`,
      gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      placeItems: 'center',
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0,
    }}>
      {Array.from({ length: ROWS * COLS }, (_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        // Vary opacity by distance from edges (denser centre)
        const cx = col / COLS - 0.5;
        const cy = row / ROWS - 0.5;
        const dist = Math.sqrt(cx * cx + cy * cy);
        const opacity = Math.max(0.12, 0.55 - dist * 0.6);
        return (
          <span key={i} style={{
            display: 'block', transformOrigin: 'center',
            backgroundColor: '#94a3b8',
            width: '1.5px', height: '18px',
            '--rotate': '-10deg',
            transform: 'rotate(var(--rotate))',
            willChange: 'transform',
            opacity,
          }} />
        );
      })}
    </div>
  );
}

// ── Floating word that reacts to cursor ──────────────────────────────────────
function FloatingWord({ word, x, y, fontSize, color, delay }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const dx = (e.clientX / window.innerWidth  - 0.5) * 18;
      const dy = (e.clientY / window.innerHeight - 0.5) * 18;
      setPos({ x: dx, y: dy });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.07, x: pos.x, y: pos.y }}
      transition={{ opacity: { delay, duration: 0.8 }, x: { type: 'spring', stiffness: 30, damping: 15 }, y: { type: 'spring', stiffness: 30, damping: 15 } }}
      style={{
        position: 'absolute', left: x, top: y,
        fontSize, fontWeight: 900,
        color, pointerEvents: 'none',
        letterSpacing: '-0.04em', lineHeight: 1,
        userSelect: 'none', zIndex: 0,
        whiteSpace: 'nowrap',
      }}
    >
      {word}
    </motion.span>
  );
}

// ── Typewriter that cycles through words ─────────────────────────────────────
const CYCLE_WORDS = ['Innovate.', 'Collaborate.', 'Disrupt.', 'Impact.', 'Build.'];
function CycleWord() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % CYCLE_WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={idx}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'inline-block', color: '#2563EB' }}
      >
        {CYCLE_WORDS[idx]}
      </motion.span>
    </AnimatePresence>
  );
}

// ── Ticker tape ────────────────────────────────────────────────────────────────
const TICKER_ITEMS = ['24h Hackathon','Microsoft Partner','Igenius AI','17 UN SDGs','National Level','Open Innovation','₹5,00,000+ Prize','SRCAS 2026','Aug 14–15'];
function Ticker() {
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid #e5e7eb',
      padding: '12px 0',
      background: '#fff',
      position: 'relative', zIndex: 5,
    }}>
      <motion.div
        animate={{ x: [0, -1600] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
          <span key={i} style={{
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.18em',
            color: i % 2 === 0 ? '#111' : '#2563EB',
            textTransform: 'uppercase',
          }}>
            {t} <span style={{ color: '#d1d5db', marginLeft: '1.5rem' }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}


export default function HeroSection5() {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredStat, setHoveredStat] = useState(null);

  useEffect(() => {
    const el = document.getElementById('hero-v5');
    if (!el) return;
    const offset = el.offsetTop;
    const onScroll = () => setScrollY(Math.max(0, window.scrollY - offset));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  return (
    
    <section id="hero-v5" style={{
      position: 'relative', minHeight: '100vh',
      background: '#ffffff',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      {/* Reactive magnet lines — desktop only */}
      <div className="h5-magnetbg"><MagnetBg /></div>

      {/* Ghost words in background */}
      <FloatingWord word="HACKATHON" x="2%"   y="12%"  fontSize="clamp(3rem,7vw,6rem)"  color="#111" delay={0.3} />
      <FloatingWord word="SRCAS"       x="68%"  y="8%"   fontSize="clamp(2rem,5vw,4.5rem)" color="#2563EB" delay={0.5} />
      <FloatingWord word="2026"      x="5%"   y="68%"  fontSize="clamp(2rem,5vw,4rem)"  color="#111" delay={0.7} />
      <FloatingWord word="SDG"     x="72%"  y="75%"  fontSize="clamp(2rem,4vw,3.5rem)" color="#111" delay={0.4} />

      {/* Centre vignette so text is readable */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 55% at 50% 48%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.45) 60%, rgba(255,255,255,0.0) 100%)',
      }} />

      {/* Blue top stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4, zIndex: 10,
        background: 'linear-gradient(90deg,#1d4ed8,#2563EB,#3b82f6)',
      }} />

      {/* Header */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 40px",
        position: "relative",
        zIndex: 10
      }}>
        {/* Left: Logo */}
        {/* <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            backgroundColor: "#111",
            color: "#fff",
            padding: "6px 8px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <CodeBracket size={18} />
          </div>
          <span style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>HACKATHON</span>
        </div> */}

        {/* Center: Pills */}
        <div className="hs6-pills-mobile-hide" style={{ display: "flex", alignItems: "center" }}>
          <div style={{
            backgroundColor: "#111",
            color: "#fff",
            padding: "8px 20px",
            borderRadius: "30px 0 0 30px",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}>
            <StarIcon size={12} fill="#fff" /> NATIONAL HACKATHON 2026
          </div>
          <div style={{
            backgroundColor: "#fff",
            color: "#6b7280",
            padding: "8px 20px",
            borderRadius: "0 30px 30px 0",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            border: "1px solid #e5e7eb",
            borderLeft: "none"
          }}>
            #BUILD THE FUTURE
          </div>
        </div>

        {/* Right: Logos */}
        <div className="hs6-logos-mobile-hide" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, fontSize: "1.2rem" }}>
            SDG
            <div style={{
              width: "24px", height: "24px", borderRadius: "50%",
              background: "conic-gradient(#e5243b 0 21deg, #dda63a 21deg 42deg, #4c9f38 42deg 64deg, #c5192d 64deg 85deg, #ff3a21 85deg 107deg, #26bde2 107deg 128deg, #fcc30b 128deg 150deg, #a21942 150deg 171deg, #fd6925 171deg 193deg, #dd1367 193deg 214deg, #fd9d24 214deg 236deg, #bf8b2e 236deg 257deg, #3f7e44 257deg 279deg, #0a97d9 279deg 300deg, #56c02b 300deg 321deg, #00689d 321deg 343deg, #19486a 343deg 360deg)"
            }} />
          </div>
          <div style={{ width: "1px", height: "30px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "0.6rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600, display: "flex", flexDirection: "column" }}>
              Organized by
            </span>
            <img src={srcasLogo} alt="SRCAS" style={{ height: "32px", objectFit: "contain" }} />
          </div>
          <div style={{ width: "1px", height: "30px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "0.6rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600, display: "flex", flexDirection: "column" }}>
              Partner
            </span>
            <img src={msLogo} alt="Microsoft" style={{ height: "24px", objectFit: "contain" }} />
          </div>
        </div>
      </header>

      {/* Hero content */}
      <div style={{
        position: 'relative', zIndex: 2, flex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '48px 32px 48px',
        textAlign: 'center',
        transform: `translateY(${scrollY * 0.15}px)`,
      }} className="h5-content">

        {/* Event badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px',
            border: '1.5px solid #e5e7eb', borderRadius: 100,
            background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
            marginBottom: '1.6rem',
            flexWrap: 'wrap', justifyContent: 'center',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7eeb25ff', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', color: '#25eb3fff', textTransform: 'uppercase' }}>
            Registration Open!
          </span>
          {/* <span style={{ width: 1, height: 10, background: '#e5e7eb', display: 'inline-block' }} />
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase' }}>
            SRCAS × Microsoft
          </span> */}
        </motion.div>

        {/* Heading — bigger on mobile via .h5-h1 class */}
        {["WHAT'S THE", 'NEXT'].map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, delay: 0.18 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="h5-h1"
              style={{
                fontSize: 'clamp(2.8rem, 9vw, 8.5rem)',
                fontWeight: 900, lineHeight: 1,
                letterSpacing: '-0.04em', color: '#111', margin: 0,
              }}
            >{line}</motion.h1>
          </div>
        ))}

        {/* BIG IDEA? outline */}
        <div style={{ overflow: 'hidden', marginBottom: '1.2rem' }}>
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.8, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
            className="h5-h1"
            style={{
              fontSize: 'clamp(2.8rem, 9vw, 8.5rem)',
              fontWeight: 900, lineHeight: 1,
              letterSpacing: '-0.04em', margin: 0,
              color: 'transparent',
              WebkitTextStroke: '2.5px #2563EB',
            }}
          >BIG IDEA?</motion.h1>
        </div>

        {/* Sub line — one line on desktop, 2 lines centered on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="h5-subline"
          style={{
            fontSize: 'clamp(0.88rem, 1.5vw, 1rem)',
            color: '#6b7280', lineHeight: 1.5,
            marginBottom: '1.6rem',
            textAlign: 'center',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 6, flexWrap: 'nowrap',
          }}
        >
          <span style={{ whiteSpace: 'nowrap' }}>India's premier hackathon for the 17 UN SDGs.</span>
          <span style={{ fontWeight: 700, color: '#111', display: 'inline-flex', minWidth: 105, flexShrink: 0 }}>
            <CycleWord />
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="h5-cta-wrap"
          style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'nowrap' }}
        >
          <a href="#register" className="h5-primary">
            Register Now
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 6 }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#problem-statements" className="h5-sec">View Problem Statements</a>
        </motion.div>
        

        {/* Row 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "20px 30px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginTop: "20px",
          width: "100%",
          maxWidth: "1200px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#111" }}>
            <TrophyIcon size={18} /> 4TH HACKATHON
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#111" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
              <div style={{width: 8, height: 8, background: "#f25022"}}></div>
              <div style={{width: 8, height: 8, background: "#7fba00"}}></div>
              <div style={{width: 8, height: 8, background: "#00a4ef"}}></div>
              <div style={{width: 8, height: 8, background: "#ffb900"}}></div>
            </div> MICROSOFT PARTNER
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#111" }}>
            <BrainIcon size={18} /> GENIUS AI
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#111" }}>
            <div style={{
              width: "18px", height: "18px", borderRadius: "50%",
              background: "conic-gradient(#e5243b 0 21deg, #dda63a 21deg 42deg, #4c9f38 42deg 64deg, #c5192d 64deg 85deg, #ff3a21 85deg 107deg, #26bde2 107deg 128deg, #fcc30b 128deg 150deg, #a21942 150deg 171deg, #fd6925 171deg 193deg, #dd1367 193deg 214deg, #fd9d24 214deg 236deg, #bf8b2e 236deg 257deg, #3f7e44 257deg 279deg, #0a97d9 279deg 300deg, #56c02b 300deg 321deg, #00689d 321deg 343deg, #19486a 343deg 360deg)"
            }} /> 17 UN SDGS
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#111" }}>
            <PinIcon size={18} /> NATIONAL LEVEL
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#111" }}>
            <BulbIcon size={18} /> OPEN INNOVATION
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#111" }}>
            <StarIcon size={18} /> SRCAS 2026
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#111" }}>
            <CalendarIcon size={18} /> AUG 14–16 2026
          </div>
        </motion.div>

        {/* Scroll text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ textAlign: "center", marginTop: "24px", fontSize: "0.85rem", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          Scroll to explore <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </motion.div>

      </div>
      

      {/* Ticker tape — bottom of section */}
      {/* <Ticker /> */}

      <style>{`
        @keyframes h5pulse{0%,100%{box-shadow:0 0 0 0 rgba(37,99,235,.4)}50%{box-shadow:0 0 0 5px rgba(37,99,235,0)}}
        .h5-primary{display:inline-flex;align-items:center;justify-content:center;padding:11px 28px;height:46px;background:#111;color:#fff;font-weight:700;font-size:.92rem;border-radius:9px;text-decoration:none;border:2px solid #111;box-shadow:0 3px 12px rgba(0,0,0,.12);transition:background .2s,border-color .2s,box-shadow .2s;white-space:nowrap}
        .h5-primary:hover{background:#2563EB;border-color:#2563EB;box-shadow:0 6px 24px rgba(37,99,235,.3)}
        .h5-sec{display:inline-flex;align-items:center;justify-content:center;padding:11px 28px;height:46px;background:rgba(255,255,255,.9);backdrop-filter:blur(8px);color:#111;font-weight:700;font-size:.92rem;border-radius:9px;text-decoration:none;border:2px solid #e5e7eb;transition:border-color .2s,color .2s;white-space:nowrap}
        .h5-sec:hover{border-color:#2563EB;color:#2563EB}
        @media(max-width:1200px){
          .hs6-logos-mobile-hide{display:none!important}
        }
        @media(max-width:768px){
          .hs6-pills-mobile-hide{display:none!important}
          .h5-magnetbg{display:none!important}
          .h5-stats{display:none!important}
          .h5-logos{display:none!important}
          .h5-pc-logo{display:none!important}
          #hero-v5{min-height:100svh!important}
          .h5-content{padding:36px 20px 24px!important;gap:0}
          .h5-h1{font-size:clamp(3.2rem,13.5vw,4.8rem)!important;-webkit-text-stroke-width:2px}
          .h5-subline{flex-direction:column!important;gap:4px!important;align-items:center!important;justify-content:center!important;margin-bottom:1.2rem!important}
          .h5-subline span{white-space:normal!important;text-align:center!important}
          .h5-cta-wrap{flex-direction:column!important;align-items:center!important;width:100%!important;margin-bottom:1.2rem!important}
          .h5-primary{width:auto!important;min-width:180px;max-width:260px;height:46px!important;font-size:.88rem!important;padding:11px 22px!important}
          .h5-sec{width:auto!important;min-width:200px;max-width:280px;height:52px!important;font-size:.88rem!important;padding:12px 22px!important}
        }
      `}</style>
    </section>
  );
}
