import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import srcasLogo from '../../assets/logo/srcas-1-logo.png';
import msLogo from '../../assets/logo/microsoft.png';
import pcLogo from '../../assets/logo/programming-club-2-logo.png';

// ── Custom cursor dot ──────────────────────────────────────────────────────────
function CursorDot() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 140, damping: 18 });
  const sy = useSpring(y, { stiffness: 140, damping: 18 });
  useEffect(() => {
    const move = (e) => { x.set(e.clientX - 6); y.set(e.clientY - 6); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);
  return (
    <motion.div className="h4-cursor-dot" style={{
      position: 'fixed', top: 0, left: 0,
      width: 12, height: 12,
      background: '#2563EB', borderRadius: '50%',
      pointerEvents: 'none', zIndex: 9999,
      translateX: sx, translateY: sy,
      mixBlendMode: 'multiply',
    }} />
  );
}

// ── Animated count-up ──────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let n = 0;
        const step = Math.ceil(to / 60);
        const t = setInterval(() => {
          n += step;
          if (n >= to) { setVal(to); clearInterval(t); } else setVal(n);
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ── Ticker tape ────────────────────────────────────────────────────────────────
const TICKER_ITEMS = ['24h Hackathon', 'Microsoft Partner', 'Igenius AI', '17 UN SDGs', 'National Level', 'Open Innovation', '₹60,000+ Prize', 'SRCAS 2026', 'Aug 14–15'];
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

// ── Tilt stat card ─────────────────────────────────────────────────────────────
function StatCard({ num, suffix, label, sub, delay, icon }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const tx = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const ty = ((e.clientY - r.top) / r.height - 0.5) * -10;
    setTilt({ x: tx, y: ty });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        display: 'flex', alignItems: 'center', gap: 18,
        padding: '20px 24px',
        border: `1px solid ${hovered ? '#bfdbfe' : '#f3f4f6'}`,
        borderRadius: 16,
        background: hovered ? '#f0f9ff' : '#fafafa',
        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
        boxShadow: hovered ? '0 8px 32px rgba(37,99,235,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
        cursor: 'default',
        transform: `perspective(600px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        willChange: 'transform',
      }}
    >
      {/* Icon box */}
      <motion.div
        animate={{ scale: hovered ? 1.08 : 1, background: hovered ? '#eff6ff' : '#f3f4f6' }}
        transition={{ duration: 0.2 }}
        style={{
          width: 44, height: 44, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, fontSize: '1.2rem',
        }}
      >
        {icon}
      </motion.div>

      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111', marginBottom: 2 }}>{label}</p>
        <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{sub}</p>
      </div>

      <div style={{
        fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
        fontWeight: 900, color: '#2563EB',
        letterSpacing: '-0.03em', lineHeight: 1, flexShrink: 0,
      }}>
        <Counter to={num} suffix={suffix} />
      </div>
    </motion.div>
  );
}

// ── Floating grid dots background ──────────────────────────────────────────────
function GridDots() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.35 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="h4-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#d1d5db" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#h4-dots)" />
    </svg>
  );
}

// ── Countdown badge ────────────────────────────────────────────────────────────
function CountdownBadge() {
  const target = new Date('2026-08-14T09:00:00').getTime();
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setT({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 12,
        padding: '10px 18px',
        background: '#f9fafb', border: '1px solid #e5e7eb',
        borderRadius: 12, marginTop: '1.4rem',
      }}
    >
      <span style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Starts in</span>
      {[{ v: t.d, l: 'days' }, { v: t.h, l: 'hrs' }, { v: t.m, l: 'min' }, { v: t.s, l: 'sec' }].map(({ v, l }) => (
        <div key={l} style={{ textAlign: 'center' }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={v}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ fontSize: '1rem', fontWeight: 900, color: '#111', lineHeight: 1 }}
            >
              {String(v).padStart(2, '0')}
            </motion.div>
          </AnimatePresence>
          <div style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.06em', marginTop: 2 }}>{l}</div>
        </div>
      ))}
    </motion.div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function HeroSection4() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeLine, setActiveLine] = useState(null);
  const sectionRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - r.left) / r.width - 0.5) * 30,
      y: ((e.clientY - r.top) / r.height - 0.5) * 30,
    });
  }, []);

  const headLines = ["WHAT'S THE", 'NEXT BIG', 'IDEA?'];

  return (
    <section
      ref={sectionRef}
      id="hero-v4"
      onMouseMove={onMouseMove}
      style={{
        background: '#fff',
        minHeight: '100vh',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CursorDot />
      <GridDots />

      {/* ── Top nav strip ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 40px',
        borderBottom: '1px solid #f3f4f6',
        position: 'relative', zIndex: 10,
        flexWrap: 'wrap', gap: 12,
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={srcasLogo} alt="SRCAS" style={{ height: 30, width: 'auto', filter: 'grayscale(1)' }} />
          <div style={{ width: 1, height: 18, background: '#e5e7eb' }} />
          <img src={msLogo} alt="Microsoft" style={{ height: 18, width: 'auto', filter: 'grayscale(1)', opacity: 0.6 }} />
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 16px', border: '1px solid #bfdbfe',
          borderRadius: 100,
          fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em',
          color: '#2563EB', textTransform: 'uppercase',
          background: '#eff6ff',
        }}>
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#2563EB',
              display: 'inline-block',
            }}
          />
          Registrations Open
        </div>

        <img src={pcLogo} alt="Programming Club" style={{ height: 30, width: 'auto', opacity: 0.45 }} />
      </div>

      {/* ── Body ── */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* Blue left bar */}
        <div className="h4-bluebar" style={{
          width: 56,
          background: '#2563EB',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontSize: '9px', fontWeight: 700,
              letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            SRCAS × Microsoft × Igenius AI
          </motion.div>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute', width: 1, height: '130%',
              background: 'rgba(255,255,255,0.07)',
              left: `${(i + 1) * 12}px`,
              transform: 'rotate(18deg)', transformOrigin: 'top',
            }} />
          ))}
        </div>

        {/* 2-col grid */}
        <div className="h4-grid" style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          position: 'relative',
        }}>

          {/* Ghost number — parallax */}
          <motion.div
            style={{
              position: 'absolute', right: -20, top: '2%',
              fontSize: 'clamp(160px, 24vw, 400px)',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '1.5px #f3f4f6',
              lineHeight: 1,
              userSelect: 'none', pointerEvents: 'none',
              letterSpacing: '-0.05em', zIndex: 0,
            }}
            animate={{ x: mousePos.x * 0.4, y: mousePos.y * 0.4 }}
            transition={{ type: 'spring', stiffness: 50, damping: 18 }}
          >
            26
          </motion.div>

          {/* LEFT — heading */}
          <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: 'clamp(32px, 5vw, 72px)',
            paddingRight: 40,
            borderRight: '1px solid #f3f4f6',
            position: 'relative', zIndex: 1,
          }}>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.24em', color: '#9ca3af',
                textTransform: 'uppercase', marginBottom: '1.8rem',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <span style={{
                display: 'inline-block', width: 24, height: 1,
                background: '#2563EB',
              }} />
              National Hackathon 2026
            </motion.p>

            {/* Word-by-word heading with hover highlight */}
            <div>
              {headLines.map((line, li) => (
                <div key={li} style={{ overflow: 'hidden', lineHeight: 1.05 }}>
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, delay: 0.2 + li * 0.14, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h1
                      onMouseEnter={() => setActiveLine(li)}
                      onMouseLeave={() => setActiveLine(null)}
                      style={{
                        fontSize: 'clamp(2rem, 4.8vw, 4.5rem)',
                        fontWeight: 900, lineHeight: 1.05,
                        letterSpacing: '-0.04em', margin: 0,
                        color: li === 2 ? '#2563EB' : activeLine === li ? '#2563EB' : '#111',
                        transition: 'color 0.2s',
                        cursor: 'default',
                        WebkitTextStroke: li === 2 && activeLine !== li ? '0px' : undefined,
                      }}
                    >{line}</h1>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.68 }}
              style={{
                fontSize: '0.95rem', color: '#6b7280',
                lineHeight: 1.75, marginTop: '1.6rem',
                maxWidth: 400,
              }}
            >
              Build scalable, tech-driven solutions aligned with the 17 UN Sustainable Development Goals.{' '}
              <span style={{ color: '#111', fontWeight: 600 }}>Collaborate. Innovate. Impact.</span>
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.82 }}
              style={{ display: 'flex', gap: 12, marginTop: '2rem', flexWrap: 'wrap' }}
            >
              <motion.a
                href="#register"
                className="h4-btn-primary"
                whileHover={{ scale: 1.03, boxShadow: '0 8px 28px rgba(37,99,235,0.3)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 26px',
                  background: '#111', color: '#fff',
                  fontWeight: 700, fontSize: '0.88rem',
                  borderRadius: 12, textDecoration: 'none',
                  border: '1.5px solid #111',
                }}
              >
                Register Now
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
              <motion.a
                href="#problem-statements"
                className="h4-btn-sec"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '13px 26px',
                  background: 'transparent', color: '#111',
                  fontWeight: 700, fontSize: '0.88rem',
                  borderRadius: 12, textDecoration: 'none',
                  border: '1.5px solid #e5e7eb',
                }}
              >
                View SDGs
              </motion.a>
            </motion.div>

            {/* Countdown */}
            <CountdownBadge />
          </div>

          {/* RIGHT — stat cards */}
          <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: 'clamp(28px, 4vw, 60px)',
            paddingLeft: 40,
            gap: 14,
            position: 'relative', zIndex: 1,
          }}>

            <StatCard num={24} suffix="h" label="Hours of Intense Hacking" sub="Nonstop building session" delay={0.38} icon="⚡" />
            <StatCard num={17} suffix="" label="UN SDG Tracks" sub="Choose your impact area" delay={0.50} icon="🌍" />
            <StatCard num={500} suffix="+" label="Expected Participants" sub="National level competition" delay={0.62} icon="👥" />

            {/* Info strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.84 }}
              style={{
                display: 'flex', gap: 0,
                background: '#2563EB',
                borderRadius: 14,
                overflow: 'hidden',
                marginTop: 4,
                boxShadow: '0 8px 32px rgba(37,99,235,0.25)',
              }}
            >
              {[
                { icon: '📅', label: 'Date', val: 'Aug 14–15, 2026' },
                { icon: '📍', label: 'Venue', val: 'SRCAS Campus' },
                { icon: '💰', label: 'Prize', val: '₹60,000+' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ background: 'rgba(255,255,255,0.1)' }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    flex: 1,
                    padding: '15px 16px',
                    borderRight: i < 2 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                    cursor: 'default',
                    transition: 'background 0.2s',
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>{item.label}</p>
                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>{item.val}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Ticker ── */}
      <Ticker />

      <style>{`
        .h4-cursor-dot { display: none; }
        @media (hover: hover) { .h4-cursor-dot { display: block; } }

        .h4-btn-primary { transition: background 0.2s, border-color 0.2s !important; }
        .h4-btn-primary:hover { background: #2563EB !important; border-color: #2563EB !important; }
        .h4-btn-sec { transition: border-color 0.2s, color 0.2s !important; }
        .h4-btn-sec:hover { border-color: #2563EB !important; color: #2563EB !important; }

        @media (max-width: 768px) {
          .h4-bluebar { display: none !important; }
          .h4-grid {
            grid-template-columns: 1fr !important;
          }
          #hero-v4 { min-height: 100svh; }
        }
      `}</style>
    </section>
  );
}
