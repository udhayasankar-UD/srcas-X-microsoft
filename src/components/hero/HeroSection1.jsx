import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlobeCanvas from '../ui/GlobeCanvas';
import { theme } from '../../theme';
import srcasLogo from '../../assets/logo/srcas-1-logo.png';
import msLogo from '../../assets/logo/microsoft.png';
import pcLogo from '../../assets/logo/programming-club-2-logo.png';

const LINE1 = "What's the Next";
const LINE2 = "Big Idea!";
const CHAR_DELAY = 75;
const LINE_PAUSE = 160;
const REVEAL_DELAY = 300;

// Floating particle
function Particle({ x, y, size, duration, delay, color }) {
  return (
    <motion.div
      style={{
        position: 'absolute', left: x, top: y,
        width: size, height: size,
        borderRadius: '50%',
        background: color,
        pointerEvents: 'none',
      }}
      animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.4, 1] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

// Animated grid lines in background
function GridLines() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`v${i}`} x1={`${(i + 1) * 8.33}%`} y1="0" x2={`${(i + 1) * 8.33}%`} y2="100%"
          stroke="#111" strokeWidth="1" />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={`${(i + 1) * 12.5}%`} x2="100%" y2={`${(i + 1) * 12.5}%`}
          stroke="#111" strokeWidth="1" />
      ))}
    </svg>
  );
}

// Scramble text effect on hover
function ScrambleTag({ text }) {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const interval = useRef(null);
  const frame = useRef(0);

  const scramble = () => {
    frame.current = 0;
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      frame.current++;
      setDisplay(text.split('').map((ch, i) =>
        i < frame.current / 2 ? ch : chars[Math.floor(Math.random() * chars.length)]
      ).join(''));
      if (frame.current >= text.length * 2) {
        clearInterval(interval.current);
        setDisplay(text);
      }
    }, 30);
  };

  useEffect(() => () => clearInterval(interval.current), []);

  return (
    <span onMouseEnter={scramble} style={{ fontFamily: 'monospace', cursor: 'default', letterSpacing: '0.08em' }}>
      {display}
    </span>
  );
}

export default function HeroSection1() {
  const [typed1, setTyped1] = useState('');
  const [typed2, setTyped2] = useState('');
  const [line1Done, setLine1Done] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef(null);

  // Type line 1
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped1(LINE1.slice(0, i));
      if (i >= LINE1.length) { clearInterval(t); setLine1Done(true); }
    }, CHAR_DELAY);
    return () => clearInterval(t);
  }, []);

  // Type line 2
  useEffect(() => {
    if (!line1Done) return;
    let j = 0;
    const start = setTimeout(() => {
      const t = setInterval(() => {
        j++;
        setTyped2(LINE2.slice(0, j));
        if (j >= LINE2.length) { clearInterval(t); setTypingDone(true); }
      }, CHAR_DELAY);
      return () => clearInterval(t);
    }, LINE_PAUSE);
    return () => clearTimeout(start);
  }, [line1Done]);

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  // Reveal
  useEffect(() => {
    if (!typingDone) return;
    const t = setTimeout(() => setRevealed(true), REVEAL_DELAY);
    return () => clearTimeout(t);
  }, [typingDone]);

  // Mouse parallax
  const onMouseMove = (e) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    setMousePos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  const reveal = (delay = 0) => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  const PARTICLES = [
    { x: '8%',  y: '18%', size: 6,  duration: 4.5, delay: 0,    color: '#2563EB33' },
    { x: '88%', y: '12%', size: 4,  duration: 3.8, delay: 0.8,  color: '#2563EB55' },
    { x: '5%',  y: '72%', size: 8,  duration: 5.2, delay: 1.2,  color: '#11111122' },
    { x: '92%', y: '65%', size: 5,  duration: 4.0, delay: 0.4,  color: '#2563EB44' },
    { x: '50%', y: '8%',  size: 4,  duration: 6.0, delay: 2.0,  color: '#2563EB22' },
    { x: '75%', y: '80%', size: 6,  duration: 4.8, delay: 1.6,  color: '#11111133' },
    { x: '20%', y: '85%', size: 5,  duration: 5.5, delay: 0.6,  color: '#2563EB33' },
    { x: '60%', y: '22%', size: 3,  duration: 3.5, delay: 1.8,  color: '#2563EB66' },
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      id="hero"
      style={{
        position: 'relative', width: '100%', height: '100vh',
        background: '#ffffff', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        fontFamily: theme.fonts.body,
      }}
    >
      <GridLines />

      {/* Parallax ambient blobs */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #2563EB0a 0%, transparent 70%)',
          left: `${mousePos.x * 40}%`,
          top: `${mousePos.y * 30}%`,
          transform: 'translate(-50%,-50%)',
          transition: 'left 0.8s ease, top 0.8s ease',
        }} />
        <div style={{
          position: 'absolute',
          width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #11111106 0%, transparent 70%)',
          right: `${(1 - mousePos.x) * 40}%`,
          bottom: `${(1 - mousePos.y) * 30}%`,
          transform: 'translate(50%,50%)',
          transition: 'right 0.8s ease, bottom 0.8s ease',
        }} />
      </div>

      {/* Floating particles */}
      {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}

      {/* Partner logos */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : -16 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          position: 'absolute', top: '1.5rem', right: '2.5rem',
          zIndex: 50, display: 'flex', alignItems: 'center', gap: '1.2rem',
        }}
        className="h1-partners"
      >
        {[
          { src: srcasLogo, alt: 'SRCAS' },
          { src: msLogo,    alt: 'Microsoft' },
          { src: pcLogo,    alt: 'Programming Club' },
        ].map(({ src, alt }, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            {i > 0 && <div style={{ width: 1, height: 18, background: '#e5e7eb' }} />}
            <motion.img
              src={src} alt={alt}
              whileHover={{ scale: 1.08, filter: 'grayscale(0)' }}
              style={{ height: 30, width: 'auto', filter: 'grayscale(0.4)', transition: 'filter 0.3s' }}
            />
          </span>
        ))}
      </motion.div>

      {/* Live badge top left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : -20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: 'absolute', top: '1.6rem', left: '2.5rem',
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 14px',
          border: '1px solid #e5e7eb', borderRadius: 100,
          fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em',
          color: '#111', textTransform: 'uppercase',
          background: '#fff',
          zIndex: 50,
        }}
        className="h1-partners"
      >
        <span style={{
          width: 6, height: 6, borderRadius: '50%', background: '#2563EB',
          boxShadow: '0 0 0 3px #dbeafe',
          animation: 'h1pulse 1.8s infinite',
          display: 'inline-block',
        }} />
        <ScrambleTag text="Registrations Open" />
      </motion.div>

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center', display: 'flex',
        flexDirection: 'column', alignItems: 'center',
        paddingBottom: '5vh',
        transform: 'translateY(-40px)',
      }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.26em',
            color: '#9ca3af', textTransform: 'uppercase', marginBottom: '1.2rem',
          }}
        >
          National Hackathon 2026 · SRCAS × Microsoft × Igenius AI
        </motion.p>

        {/* Heading */}
        <h1 style={{
          fontFamily: theme.fonts.heading,
          fontSize: 'clamp(2.5rem, 7.5vw, 5.5rem)',
          fontWeight: 800, lineHeight: 1.15,
          color: theme.colors.textPrimary,
          marginBottom: '0.15rem',
          letterSpacing: '-0.02em',
          minHeight: '2.8em',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <span style={{ display: 'block' }}>
            {typed1}
            {!line1Done && (
              <span style={{
                display: 'inline-block', width: 3, height: '0.8em',
                background: '#111', marginLeft: 4, verticalAlign: 'middle',
                borderRadius: 1, opacity: showCursor ? 1 : 0, transition: 'opacity 0.08s',
              }} />
            )}
          </span>
          <AnimatePresence>
            {line1Done && (
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  fontFamily: theme.fonts.pixel,
                  color: theme.colors.microsoftBlue,
                  fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                  display: 'block', marginTop: '0.4rem', lineHeight: 1.2,
                }}
              >
                {typed2}
                {!typingDone && (
                  <span style={{
                    display: 'inline-block', width: 3, height: '0.8em',
                    background: theme.colors.microsoftBlue, marginLeft: 4,
                    verticalAlign: 'middle', borderRadius: 1,
                    opacity: showCursor ? 1 : 0, transition: 'opacity 0.08s',
                  }} />
                )}
              </motion.span>
            )}
          </AnimatePresence>
        </h1>

        {/* Subtext */}
        <div style={reveal(0)}>
          <p style={{
            fontSize: '1rem', color: '#6b7280',
            lineHeight: 1.7, maxWidth: '480px',
            marginBottom: '2rem', marginTop: '0.5rem',
          }}>
            India's premier national-level hackathon. Build tech-driven solutions
            for the 17 UN Sustainable Development Goals.
          </p>
        </div>

        {/* CTA */}
        <div style={{ ...reveal(120), display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#about" style={{ textDecoration: 'none' }}>
            <span className="hero-btn-learn-more">
              <span className="hero-btn-circle"><span className="hero-btn-icon hero-btn-arrow" /></span>
              <span className="hero-btn-text">Register Now</span>
            </span>
          </a>
          <motion.a
            href="#problem-statements"
            whileHover={{ borderColor: '#2563EB', color: '#2563EB' }}
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '0 22px', height: '3rem',
              border: '1.5px solid #e5e7eb', borderRadius: '1.625rem',
              fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.06em',
              color: '#111', textDecoration: 'none', textTransform: 'uppercase',
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            View SDGs
          </motion.a>
        </div>

        {/* Stats strip */}
        <motion.div
          style={{
            ...reveal(240),
            display: 'flex', gap: 32, marginTop: '2.5rem',
            borderTop: '1px solid #f3f4f6', paddingTop: '1.5rem',
          }}
          className="h1-stats"
        >
          {[
            { val: '24h', label: 'Hacking' },
            { val: '17',  label: 'UN SDGs' },
            { val: '₹5L+', label: 'Prizes' },
            { val: 'Aug 14', label: '2026' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 900, color: '#111', letterSpacing: '-0.02em' }}>{s.val}</p>
              <p style={{ fontSize: '10px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Globe */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: '100%', height: '58%',
        zIndex: 5, pointerEvents: 'none',
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 1s 0.2s, transform 1s 0.2s',
      }}>
        <GlobeCanvas />
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: '100%', height: '15vh',
        background: 'linear-gradient(to top,#fff 0%,transparent 100%)',
        zIndex: 6, pointerEvents: 'none',
      }} />

      <style>{`
        @keyframes h1pulse {
          0%,100%{box-shadow:0 0 0 3px #dbeafe}
          50%{box-shadow:0 0 0 6px #bfdbfe}
        }
        @media(max-width:768px){
          .h1-partners{display:none!important}
          .h1-stats{gap:16px!important}
        }
        .hero-btn-learn-more{position:relative;display:inline-block;cursor:pointer;outline:none;border:0;vertical-align:middle;text-decoration:none;background:transparent;padding:0;font-size:inherit;font-family:inherit;width:13rem;height:auto}
        .hero-btn-circle{transition:all .45s cubic-bezier(.65,0,.076,1);position:relative;display:block;margin:0;width:3rem;height:3rem;background:#111;border-radius:1.625rem}
        .hero-btn-icon{transition:all .45s cubic-bezier(.65,0,.076,1);position:absolute;top:0;bottom:0;margin:auto;background:#fff}
        .hero-btn-arrow{transition:all .45s cubic-bezier(.65,0,.076,1);left:.625rem;width:1.125rem;height:.125rem;background:none}
        .hero-btn-arrow::before{position:absolute;content:"";top:-.29rem;right:.0625rem;width:.625rem;height:.625rem;border-top:.125rem solid #fff;border-right:.125rem solid #fff;transform:rotate(45deg)}
        .hero-btn-text{transition:all .45s cubic-bezier(.65,0,.076,1);position:absolute;top:0;left:0;right:0;bottom:0;padding:.75rem 0;margin:0 0 0 1.85rem;color:#111;font-weight:700;font-size:.78rem;letter-spacing:.06em;line-height:1.6;text-align:center;text-transform:uppercase;font-family:inherit;white-space:nowrap}
        .hero-btn-learn-more:hover .hero-btn-circle{width:100%;background:#2563EB}
        .hero-btn-learn-more:hover .hero-btn-arrow{background:#fff;transform:translate(1rem,0)}
        .hero-btn-learn-more:hover .hero-btn-text{color:#fff}
      `}</style>
    </section>
  );
}
