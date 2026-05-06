import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const SECTIONS = [
  { id: 'home',      label: 'Home'      },
  { id: 'about',     label: 'About'     },
  { id: 'problems',  label: 'Problems'  },
  { id: 'prizes',    label: 'Prizes'    },
  { id: 'finalists', label: 'Guidelines'},
  { id: 'timeline',  label: 'Timeline'  },
  { id: 'faq',       label: 'FAQs'      },
  { id: 'contact',   label: 'Contact'   },
];

export default function ScrollProgressUI() {
  const { scrollYProgress } = useScroll();
  const barScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const [active,   setActive]   = useState('home');
  const [showTop,  setShowTop]  = useState(false);
  const [dotHover, setDotHover] = useState(null);

  useEffect(() => {
    /* Active section tracker */
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.25, rootMargin: '-8% 0px -8% 0px' }
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });

    /* Scroll-to-top visibility */
    const onScroll = () => setShowTop(window.scrollY > 420);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* ── Top progress bar ── */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #0078D4, #005a9e)',
          scaleX: barScale,
          transformOrigin: '0%',
          zIndex: 9999,
          borderRadius: '0 2px 2px 0',
        }}
      />

      {/* ── Right-side section dots ── */}
      <div style={{
        position: 'fixed',
        right: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        zIndex: 900,
      }} className="scroll-dots">
        {SECTIONS.map(s => {
          const isActive = active === s.id;
          const isHov    = dotHover === s.id;
          return (
            <div key={s.id} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              {/* Label tooltip — appears on hover */}
              <AnimatePresence>
                {isHov && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      position: 'absolute',
                      right: 20,
                      whiteSpace: 'nowrap',
                      background: '#111',
                      color: '#fff',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      pointerEvents: 'none',
                    }}
                  >
                    {s.label}
                  </motion.span>
                )}
              </AnimatePresence>

              <a
                href={`#${s.id}`}
                title={s.label}
                onMouseEnter={() => setDotHover(s.id)}
                onMouseLeave={() => setDotHover(null)}
                style={{
                  display: 'block',
                  width:  isActive ? 10 : isHov ? 8 : 6,
                  height: isActive ? 10 : isHov ? 8 : 6,
                  borderRadius: '50%',
                  background: isActive ? '#0078D4' : isHov ? '#555' : '#ccc',
                  transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                  boxShadow: isActive ? '0 0 0 3px rgba(0,120,212,0.22)' : 'none',
                  flexShrink: 0,
                  textDecoration: 'none',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ── Scroll-to-top FAB ── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1,   y: 0  }}
            exit={{ opacity: 0, scale: 0.7, y: 16  }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={scrollToTop}
            title="Back to top"
            style={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              width: 46,
              height: 46,
              borderRadius: '50%',
              background: '#111',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
              zIndex: 900,
              transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s',
              fontFamily: 'sans-serif',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#0078D4';
              e.currentTarget.style.boxShadow  = '0 8px 28px rgba(0,120,212,0.35)';
              e.currentTarget.style.transform  = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#111';
              e.currentTarget.style.boxShadow  = '0 6px 24px rgba(0,0,0,0.18)';
              e.currentTarget.style.transform  = 'translateY(0)';
            }}
          >
            {/* Up arrow SVG */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hide dots on small screens */}
      <style>{`
        @media (max-width: 768px) {
          .scroll-dots { display: none; }
        }
      `}</style>
    </>
  );
}
