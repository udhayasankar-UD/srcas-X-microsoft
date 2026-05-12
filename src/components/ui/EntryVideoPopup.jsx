import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import AI_video_promotion from '../../assets/videos/AI_video_promotion.mp4';

const VIDEO_SRC = AI_video_promotion;

export default function EntryVideoPopup() {
  const [visible, setVisible] = useState(false);
  const [muted, setMuted]     = useState(true);
  const [loaded, setLoaded]   = useState(false);
  const videoRef = useRef(null);

  // Show only once — persists across reloads via localStorage
// Always show on page load
useEffect(() => {
  const t = setTimeout(() => setVisible(true), 600);
  return () => clearTimeout(t);
}, []);

  // Play as soon as modal is visible — works whether video is cached or not
  useEffect(() => {
    if (!visible) return;
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    setMuted(true);

    // If already has data (cached), fire loaded immediately
    if (vid.readyState >= 3) {
      setLoaded(true);
      vid.play().catch(() => {});
    } else {
      const onReady = () => {
        setLoaded(true);
        vid.play().catch(() => {});
      };
      vid.addEventListener('canplay', onReady, { once: true });
      return () => vid.removeEventListener('canplay', onReady);
    }
  }, [visible]);

  const close = () => {
    if (videoRef.current) videoRef.current.pause();
    setVisible(false);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  // Close on Escape key
  useEffect(() => {
    if (!visible) return;
    const handler = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [visible]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
            style={{
              position: 'fixed', inset: 0, zIndex: 9998,
              background: 'rgba(0,0,0,0.82)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              cursor: 'pointer',
            }}
            aria-hidden="true"
          />

          {/* ── Modal ── */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(16px, 4vw, 40px)',
              pointerEvents: 'none',
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                pointerEvents: 'auto',
                width: '100%',
                maxWidth: 860,
                background: '#0a0a0a',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)',
                position: 'relative',
              }}
            >
              {/* ── Top bar ── */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 18px',
                background: '#111',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {/* Live dot */}
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: '#ef4444',
                    boxShadow: '0 0 6px #ef4444',
                    display: 'inline-block',
                    animation: 'pulse-dot 1.4s ease-in-out infinite',
                  }} />
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    SRCAS Hackathon 3.0 - 2026
                  </span>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {/* Mute / Unmute */}
                  <button
                    onClick={toggleMute}
                    title={muted ? 'Unmute' : 'Mute'}
                    style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#fff', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                  >
                    {muted ? (
                      // Muted icon
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                      </svg>
                    ) : (
                      // Unmuted icon
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      </svg>
                    )}
                  </button>

                  {/* Close */}
                  <button
                    onClick={close}
                    title="Close (Esc)"
                    style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#fff', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, fontWeight: 300,
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.3)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                    aria-label="Close video"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* ── Video ── */}
              <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
                {/* Loading shimmer */}
                {!loaded && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(90deg, #111 25%, #1a1a1a 50%, #111 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.4s infinite',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      border: '3px solid rgba(255,255,255,0.1)',
                      borderTopColor: '#fff',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                  </div>
                )}

                <video
                  ref={videoRef}
                  src={VIDEO_SRC}
                  muted
                  autoPlay
                  loop
                  playsInline
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', display: 'block',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                  }}
                />

                {/* Muted badge overlay */}
                <AnimatePresence>
                  {muted && loaded && (
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      onClick={toggleMute}
                      style={{
                        position: 'absolute', bottom: 16, left: 16,
                        display: 'flex', alignItems: 'center', gap: 7,
                        background: 'rgba(0,0,0,0.65)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: 100,
                        padding: '7px 14px',
                        color: '#fff', cursor: 'pointer',
                        fontSize: '0.75rem', fontWeight: 700,
                        letterSpacing: '0.06em',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.85)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.65)'}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                      </svg>
                      Tap to unmute
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Bottom CTA bar ── */}
              <div style={{
                padding: '16px 20px',
                background: '#111',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: 12,
              }}>
                <div>
                  <p style={{
                    margin: 0, fontSize: '0.95rem', fontWeight: 800,
                    color: '#fff', letterSpacing: '-0.01em',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    Aug 14–16, 2026 · SRCAS, Coimbatore
                  </p>
                  <p style={{
                    margin: '2px 0 0', fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    India's premier national-level hackathon
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  
                  <a
                    href="#register"
                    onClick={close}
                    style={{
                      padding: '9px 22px', borderRadius: 100,
                      background: '#fff', color: '#111',
                      fontSize: '0.8rem', fontWeight: 800,
                      textDecoration: 'none', cursor: 'pointer',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      letterSpacing: '0.04em',
                      transition: 'background 0.2s, transform 0.15s',
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#e5e5e5'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    🚀 Register Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Keyframe styles ── */}
          <style>{`
            @keyframes pulse-dot {
              0%, 100% { opacity: 1; transform: scale(1); }
              50%       { opacity: 0.5; transform: scale(0.85); }
            }
            @keyframes shimmer {
              0%   { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
