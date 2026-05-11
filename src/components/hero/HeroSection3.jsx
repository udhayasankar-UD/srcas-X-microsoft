import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { theme } from '../../theme';
import srcasLogo from '../../assets/logo/srcas-1-logo.png';
import msLogo from '../../assets/logo/microsoft.png';
import pcLogo from '../../assets/logo/programming-club-2-logo.png';
import { ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react';

// Magnetic button
function MagneticBtn({ children, href, primary }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.35;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    ref.current.style.transform = `translate(${x}px,${y}px)`;
  };
  const onLeave = () => { ref.current.style.transform = 'translate(0,0)'; };
  return (
    <a
      ref={ref} href={href}
      onMouseMove={onMove} onMouseLeave={onLeave}
      className={primary ? 'h3-btn-primary' : 'h3-btn-sec'}
      style={{ textDecoration: 'none', transition: 'transform 0.3s cubic-bezier(.23,1,.32,1)' }}
    >
      {children}
    </a>
  );
}

// Tilt card
function TiltCard({ children, style }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 16;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 16;
    ref.current.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.02)`;
  };
  const onLeave = () => { ref.current.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)'; };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ ...style, transition: 'transform 0.25s ease' }}>
      {children}
    </div>
  );
}

export default function HeroSection3() {
  const containerRef = useRef(null);
  const [count, setCount] = useState({ sdgs: 0, teams: 0, prize: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.h3-word', {
        y: 80, opacity: 0, duration: 0.9,
        stagger: 0.08, ease: 'power4.out', delay: 0.1,
      });
      gsap.from('.h3-fade', {
        opacity: 0, y: 24, duration: 0.7,
        stagger: 0.12, ease: 'power3.out', delay: 0.5,
      });
      // Floating shapes
      gsap.to('.h3-shape', {
        y: 'random(-18,18)', x: 'random(-12,12)',
        rotation: 'random(-10,10)',
        duration: 'random(3,5)', repeat: -1, yoyo: true,
        ease: 'sine.inOut', stagger: 0.6,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Count-up
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let f = 0;
        const t = setInterval(() => {
          f++;
          setCount({
            sdgs: Math.min(Math.round(f * 17 / 60), 17),
            teams: Math.min(Math.round(f * 500 / 60), 500),
            prize: Math.min(Math.round(f * 5 / 60), 5),
          });
          if (f >= 60) clearInterval(t);
        }, 18);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const WORDS1 = ["WHAT'S", "THE"];
  const WORDS2 = ["NEXT", "BIG"];
  const WORDS3 = ["IDEA?"];

  return (
    <section
      ref={containerRef}
      id="hero-v3"
      style={{
        position: 'relative', minHeight: '100vh', width: '100%',
        background: '#ffffff', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Dot grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(#00000009 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Blue glow corners */}
      <div style={{
        position: 'absolute', top: '-8%', left: '-8%',
        width: '45%', height: '45%', borderRadius: '50%',
        background: '#2563EB', filter: 'blur(100px)', opacity: 0.05, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-8%', right: '-8%',
        width: '45%', height: '45%', borderRadius: '50%',
        background: '#2563EB', filter: 'blur(100px)', opacity: 0.06, pointerEvents: 'none',
      }} />

      {/* Floating decorative shapes */}
      <div className="h3-shape" style={{
        position: 'absolute', top: '18%', left: '6%',
        width: 56, height: 56,
        border: '2px solid #2563EB22', borderRadius: '14px',
      }} />
      <div className="h3-shape" style={{
        position: 'absolute', top: '30%', right: '7%',
        width: 38, height: 38,
        border: '2px solid #11111118', borderRadius: '50%',
      }} />
      <div className="h3-shape" style={{
        position: 'absolute', bottom: '28%', left: '10%',
        width: 20, height: 20, borderRadius: '50%',
        background: '#2563EB15',
      }} />
      <div className="h3-shape" style={{
        position: 'absolute', top: '55%', right: '12%',
        width: 48, height: 2,
        background: '#2563EB33',
      }} />
      <div className="h3-shape" style={{
        position: 'absolute', top: '22%', right: '22%',
        width: 8, height: 8, borderRadius: '50%',
        background: '#2563EB',
        boxShadow: '0 0 16px #2563EB',
        opacity: 0.5,
      }} />

      {/* Nav */}
      <div style={{
        position: 'relative', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 40px', borderBottom: '1px solid #f3f4f6',
        flexWrap: 'wrap', gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={srcasLogo} alt="SRCAS" style={{ height: 30, filter: 'grayscale(0.5)' }} />
          <div style={{ width: 1, height: 18, background: '#e5e7eb' }} />
          <img src={msLogo} alt="Microsoft" style={{ height: 18, opacity: 0.6, filter: 'grayscale(0.4)' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 16px',
            background: '#f0f9ff', border: '1px solid #bfdbfe',
            borderRadius: 100,
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.12em', color: '#2563EB',
            textTransform: 'uppercase',
          }}
        >
          <Sparkles size={11} />
          Empowering Innovation · 2026
        </motion.div>

        <img src={pcLogo} alt="Programming Club" style={{ height: 30, opacity: 0.4 }} />
      </div>

      {/* Hero body */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 40px 0', position: 'relative', zIndex: 10,
        textAlign: 'center',
      }}>

        {/* Badge */}
        <div className="h3-fade" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 18px',
          background: '#f0f9ff', border: '1px solid #bfdbfe',
          borderRadius: 100,
          fontSize: '11px', fontWeight: 700,
          color: '#2563EB', letterSpacing: '0.14em',
          textTransform: 'uppercase', marginBottom: '2rem',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#2563EB', display: 'inline-block',
            animation: 'h3ping 1.8s infinite',
          }} />
          Registration Now Open for 2026
        </div>

        {/* Heading — word-by-word */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 16px', overflow: 'hidden' }}>
            {WORDS1.map((w, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <h1 className="h3-word" style={{
                  fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                  fontWeight: 900, lineHeight: 1,
                  letterSpacing: '-0.04em', color: '#111',
                  margin: 0, display: 'inline-block',
                }}>{w}</h1>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 16px', overflow: 'hidden' }}>
            {WORDS2.map((w, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <h1 className="h3-word" style={{
                  fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                  fontWeight: 900, lineHeight: 1,
                  letterSpacing: '-0.04em', color: '#111',
                  margin: 0, display: 'inline-block',
                }}>{w}</h1>
              </div>
            ))}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h1 className="h3-word" style={{
              fontSize: 'clamp(2.8rem, 8vw, 7rem)',
              fontWeight: 900, lineHeight: 1,
              letterSpacing: '-0.04em',
              color: 'transparent',
              WebkitTextStroke: '3px #2563EB',
              margin: 0, display: 'inline-block',
            }}>IDEA?</h1>
          </div>
        </div>

        {/* Subtext */}
        <p className="h3-fade" style={{
          fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
          color: '#6b7280', lineHeight: 1.7,
          maxWidth: 520, marginBottom: '2rem',
        }}>
          Join India's premier national-level hackathon by SRCAS × Microsoft.
          Build tech-driven solutions for the 17 UN Sustainable Development Goals.
        </p>

        {/* Buttons */}
        <div className="h3-fade" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
          <MagneticBtn href="#register" primary>
            Register for Hackathon <ArrowRight size={16} style={{ display: 'inline', marginLeft: 6 }} />
          </MagneticBtn>
          <MagneticBtn href="#problem-statements">
            View Problem Statements
          </MagneticBtn>
        </div>

        {/* 3 tilt stat cards */}
        <div className="h3-fade" style={{
          display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center',
          borderTop: '1px solid #f3f4f6', paddingTop: '2rem',
        }}>
          {[
            { icon: <Calendar size={18} />, label: 'Date', val: 'Aug 14–15, 2026' },
            { icon: <MapPin size={18} />, label: 'Venue', val: 'SRCAS Campus' },
            { icon: <Sparkles size={18} />, label: 'Prize Pool', val: '₹60,000+' },
          ].map((s, i) => (
            <TiltCard key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 22px',
              background: '#fafafa', border: '1px solid #f3f4f6',
              borderRadius: 14,
            }}>
              <div style={{
                width: 36, height: 36,
                background: '#f0f9ff', border: '1px solid #bfdbfe',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#2563EB',
              }}>{s.icon}</div>
              <div>
                <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', color: '#9ca3af', textTransform: 'uppercase' }}>{s.label}</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111' }}>{s.val}</p>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Animated count row */}
        <div className="h3-fade" style={{
          display: 'flex', gap: 32, marginTop: '2rem', paddingBottom: '2.5rem',
        }}>
          {[
            { val: count.sdgs, suffix: '', label: 'UN SDG Tracks' },
            { val: count.teams, suffix: '+', label: 'Expected Teams' },
            { val: count.prize, suffix: 'L+', label: 'Prize Pool (₹)' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '2rem', fontWeight: 900, color: '#2563EB', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {s.val}{s.suffix}
              </p>
              <p style={{ fontSize: '10px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll line */}
      <motion.div
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{
          position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          zIndex: 5,
        }}
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 40, background: '#2563EB', borderRadius: 1 }}
        />
      </motion.div>

      <style>{`
        @keyframes h3ping {
          0%,100%{box-shadow:0 0 0 0 #2563EB44}
          50%{box-shadow:0 0 0 5px #2563EB00}
        }
        .h3-btn-primary {
          display:inline-flex;align-items:center;padding:14px 28px;
          background:#111;color:#fff;font-weight:700;font-size:.9rem;
          border-radius:12px;border:2px solid #111;
          transition:background .2s,border-color .2s,box-shadow .2s,transform .3s cubic-bezier(.23,1,.32,1);
        }
        .h3-btn-primary:hover{background:#2563EB;border-color:#2563EB;box-shadow:0 8px 28px rgba(37,99,235,.3)}
        .h3-btn-sec {
          display:inline-flex;align-items:center;padding:14px 28px;
          background:transparent;color:#111;font-weight:700;font-size:.9rem;
          border-radius:12px;border:2px solid #e5e7eb;
          transition:border-color .2s,color .2s,transform .3s cubic-bezier(.23,1,.32,1);
        }
        .h3-btn-sec:hover{border-color:#2563EB;color:#2563EB}
        @media(max-width:640px){
          .h3-word{font-size:clamp(2rem,12vw,3.5rem)!important}
        }
      `}</style>
    </section>
  );
}
