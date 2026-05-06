import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { theme } from "../../theme";
import srcasLogo from "../../assets/logo/srcas-1-logo.png";
import msLogo from "../../assets/logo/microsoft.png";
import pcLogo from "../../assets/logo/programming-club-2-logo.png";
import { GoogleGeminiEffectLight } from "../ui/google-gemini-effect-light";

const SPRING = { stiffness: 280, damping: 40, mass: 0.6 };

// ── Floating particle dots ─────────────────────────────────────────────────────
function Dots() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: i % 3 === 0 ? 4 : 2,
            height: i % 3 === 0 ? 4 : 2,
            borderRadius: '50%',
            background: i % 4 === 0 ? '#2563EB' : '#d1d5db',
            left: `${(i * 37 + 11) % 90 + 5}%`,
            top: `${(i * 53 + 7) % 80 + 10}%`,
            opacity: 0.5,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3.5 + (i % 5) * 0.7, repeat: Infinity, delay: i * 0.22, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ── Scramble text on hover ─────────────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#%';
function ScrambleWord({ text, style }) {
  const [display, setDisplay] = useState(text);
  const timer = useRef(null);
  const scramble = useCallback(() => {
    let iter = 0;
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setDisplay(
        text.split('').map((c, i) =>
          c === ' ' ? ' ' : i < iter ? c : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join('')
      );
      iter += 0.5;
      if (iter >= text.length) clearInterval(timer.current);
    }, 40);
  }, [text]);
  return (
    <span onMouseEnter={scramble} style={{ cursor: 'default', ...style }}>{display}</span>
  );
}

// ── Floating tag badges ────────────────────────────────────────────────────────
const TAGS = ['17 UN SDGs', '24h Hacking', 'National Level', 'Open Innovation', 'Teams of 3–4'];
function FloatingTags({ scrollProgress }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {TAGS.map((tag, i) => {
        const positions = [
          { top: '18%', left: '4%' },
          { top: '12%', right: '5%' },
          { top: '70%', left: '3%' },
          { top: '75%', right: '4%' },
          { bottom: '18%', left: '8%' },
          { bottom: '22%', right: '6%' },
        ];
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              ...positions[i],
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid #e5e7eb',
              borderRadius: 100,
              padding: '5px 14px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#374151',
              letterSpacing: '0.04em',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { delay: 0.6 + i * 0.12, duration: 0.5 },
              scale: { delay: 0.6 + i * 0.12, duration: 0.5 },
              y: { duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' },
            }}
          >
            {i === 0 || i === 3 ? <span style={{ color: '#2563EB', marginRight: 4 }}>✦</span> : null}
            {tag}
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Pulsing ring ───────────────────────────────────────────────────────────────
function PulsingRing({ delay = 0 }) {
  return (
    <motion.div
      style={{
        position: 'absolute', borderRadius: '50%',
        border: '1px solid rgba(37,99,235,0.15)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
      animate={{ width: [80, 500], height: [80, 500], opacity: [0.7, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, delay, ease: 'easeOut' }}
    />
  );
}

// ── Stat badge (bottom left) ───────────────────────────────────────────────────
function StatBadge({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="h2-stat-badge"
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '10px 20px',
        background: 'rgba(255,255,255,0.95)',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        backdropFilter: 'blur(12px)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        minWidth: 80,
      }}
    >
      <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#111', letterSpacing: '-0.03em' }}>{value}</span>
      <span style={{ fontSize: '10px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 }}>{label}</span>
    </motion.div>
  );
}

// ── Countdown timer ────────────────────────────────────────────────────────────
function Countdown() {
  const target = new Date('2026-08-14T09:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
      className="h2-countdown"
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'rgba(255,255,255,0.95)',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: '8px 16px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      }}
    >
      <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: '#9ca3af', textTransform: 'uppercase', marginRight: 4 }}>Starts in</span>
      {[{ v: timeLeft.d, l: 'd' }, { v: timeLeft.h, l: 'h' }, { v: timeLeft.m, l: 'm' }, { v: timeLeft.s, l: 's' }].map(({ v, l }) => (
        <div key={l} style={{ textAlign: 'center', minWidth: 28 }}>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={v}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', fontSize: '0.88rem', fontWeight: 900, color: '#111', lineHeight: 1 }}
            >
              {String(v).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
          <span style={{ fontSize: '8px', color: '#9ca3af', fontWeight: 600 }}>{l}</span>
        </div>
      ))}
    </motion.div>
  );
}

// ── Register button ────────────────────────────────────────────────────────────
function RegisterBtn() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="#about"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '14px 28px',
        background: hovered ? '#2563EB' : '#111',
        color: '#fff',
        fontWeight: 700, fontSize: '0.9rem',
        borderRadius: 12, textDecoration: 'none',
        border: `1.5px solid ${hovered ? '#2563EB' : '#111'}`,
        transition: 'all 0.3s ease',
        position: 'relative', zIndex: 10,
        letterSpacing: '0.02em',
        boxShadow: hovered ? '0 8px 32px rgba(37,99,235,0.3)' : '0 4px 16px rgba(0,0,0,0.15)',
      }}
      whileTap={{ scale: 0.97 }}
    >
      Register Now
      <motion.svg
        width="16" height="16" viewBox="0 0 16 16" fill="none"
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </motion.svg>
    </motion.a>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function HeroSection2() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const raw1 = useTransform(scrollYProgress, [0, 0.5], [0.2, 1.2]);
  const raw2 = useTransform(scrollYProgress, [0, 0.5], [0.15, 1.2]);
  const raw3 = useTransform(scrollYProgress, [0, 0.5], [0.1, 1.2]);
  const raw4 = useTransform(scrollYProgress, [0, 0.5], [0.05, 1.2]);
  const raw5 = useTransform(scrollYProgress, [0, 0.5], [0, 1.2]);

  const pathLengthFirst  = useSpring(raw1, SPRING);
  const pathLengthSecond = useSpring(raw2, SPRING);
  const pathLengthThird  = useSpring(raw3, SPRING);
  const pathLengthFourth = useSpring(raw4, SPRING);
  const pathLengthFifth  = useSpring(raw5, SPRING);


  return (
    <div
      ref={ref}
      className="hero2-wrapper"
      style={{
        background: "#ffffff",
        width: "100%",
        position: "relative",
        overflow: "clip",
        fontFamily: theme.fonts.body,
      }}
    >
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "80px",
        overflow: "hidden",
      }}>

        {/* Floating dots */}
        <Dots />

        {/* Pulsing rings behind everything */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <PulsingRing delay={0} />
          <PulsingRing delay={1.2} />
          <PulsingRing delay={2.4} />
        </div>

        {/* Floating tags — desktop only */}
        <div className="h2-tags-desktop">
          <FloatingTags />
        </div>

        {/* Partner logos */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "2.5rem",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            padding: "0.5rem 1rem",
          }}
          className="hero2-partners-hide-mobile"
        >
          <img src={srcasLogo} alt="SRCAS" style={{ height: "28px", width: "auto", objectFit: "contain", opacity: 0.85 }} />
          <div style={{ width: "1px", height: "18px", background: "#ddd" }} />
          <img src={msLogo} alt="Microsoft" style={{ height: "28px", width: "auto", objectFit: "contain", opacity: 0.85 }} />
          <div style={{ width: "1px", height: "18px", background: "#ddd" }} />
          <img src={pcLogo} alt="Programming Club" style={{ height: "28px", width: "auto", objectFit: "contain", opacity: 0.85 }} />
        </motion.div>

        {/* Event badge — top left */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            position: 'absolute', top: '1.5rem', left: '2.5rem', zIndex: 50,
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 14px',
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: 100,
            fontSize: '11px', fontWeight: 700,
            color: '#2563EB', letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
          className="hero2-partners-hide-mobile"
        >
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#2563EB',
            boxShadow: '0 0 0 3px rgba(37,99,235,0.2)',
            display: 'inline-block',
          }} />
          Registrations Open
        </motion.div>

        {/* Heading */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.22em', color: '#9ca3af',
              textTransform: 'uppercase', marginBottom: '1.2rem',
            }}
          >
            National Hackathon 2026
          </motion.p>

          <h1 style={{
            fontFamily: theme.fonts.heading,
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            color: theme.colors.textPrimary,
            textAlign: "center",
            marginBottom: "0.5rem",
            letterSpacing: "-0.03em",
            paddingLeft: "6vw",
            paddingRight: "6vw",
          }}>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'block' }}
              >
                <ScrambleWord text="What's the Next" style={{ display: 'inline' }} />
              </motion.span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'block' }}
              >
                <span style={{
                  fontFamily: theme.fonts.pixel,
                  color: theme.colors.microsoftBlue,
                  fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
                }}>
                  <ScrambleWord text="Big Idea!" />
                </span>
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.6 }}
          style={{
            fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
            fontWeight: 400,
            textAlign: "center",
            color: "#6b7280",
            lineHeight: 1.7,
            maxWidth: "38rem",
            marginTop: "1.2rem",
            marginBottom: "1.8rem",
            paddingLeft: "6vw",
            paddingRight: "6vw",
            position: 'relative', zIndex: 2,
          }}
        >
          A national-level hackathon by SRCAS × Microsoft × Igenius AI —
          build solutions for the 17 UN Sustainable Development Goals.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.5 }}
          style={{ display: 'flex', gap: 12, alignItems: 'center', position: 'relative', zIndex: 10, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <RegisterBtn />
          <a href="#problem-statements" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '13px 22px',
            background: 'transparent', color: '#374151',
            fontWeight: 600, fontSize: '0.88rem',
            borderRadius: 12, textDecoration: 'none',
            border: '1.5px solid #e5e7eb',
            transition: 'border-color 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.color = '#2563EB'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#374151'; }}
          >
            View SDGs →
          </a>
        </motion.div>

        {/* SVG Lines */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%", height: "100%",
          zIndex: 0, pointerEvents: "none",
        }}>
          <GoogleGeminiEffectLight
            pathLengths={[pathLengthFirst, pathLengthSecond, pathLengthThird, pathLengthFourth, pathLengthFifth]}
            hideText={true}
          />
        </div>

        {/* Bottom strip: stats + countdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.5 }}
          style={{
            position: 'absolute', bottom: '1.8rem', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: 10,
            zIndex: 10, flexWrap: 'wrap', justifyContent: 'center',
          }}
        >
          <StatBadge value="24h" label="Hacking" delay={0.9} />
          <StatBadge value="17" label="SDG Tracks" delay={1.0} />
          <StatBadge value="₹5L+" label="Prize Pool" delay={1.1} />
          <Countdown />
        </motion.div>

        {/* Calendar badge */}
        <motion.div
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            position: "absolute", bottom: "2rem", right: "2.5rem",
            zIndex: 50,
            display: "flex", alignItems: "center", gap: "0.75rem",
            background: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "12px",
            padding: "0.75rem 1.25rem",
            whiteSpace: "nowrap",
            backdropFilter: "blur(10px)",
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          }}
          className="hero2-calendar-hide-mobile"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="4" width="14" height="13" rx="2" stroke="#0078D4" strokeWidth="1.5" fill="none"/>
            <line x1="3" y1="8" x2="17" y2="8" stroke="#0078D4" strokeWidth="1.5"/>
            <line x1="7" y1="2" x2="7" y2="5" stroke="#0078D4" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="13" y1="2" x2="13" y2="5" stroke="#0078D4" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#333", letterSpacing: "0.05em" }}>
            AUG 14–15, 2026
          </span>
        </motion.div>


      </div>

      <style>{`
        .hero2-wrapper { height: 200vh; }
        @media (max-width: 768px) {
          .hero2-wrapper { height: 110vh !important; }
          .hero2-partners-hide-mobile { display: none !important; }
          .hero2-calendar-hide-mobile { display: none !important; }
          .h2-tags-desktop { display: none !important; }
          .h2-countdown { display: none !important; }
          .h2-stat-badge { padding: 7px 12px !important; min-width: 60px !important; }
          .h2-stat-badge span:first-child { font-size: 0.95rem !important; }
          .h2-stat-badge span:last-child { font-size: 9px !important; }
        }
      `}</style>
    </div>
  );
}
