import HeroSection7 from '../components/hero/HeroSection7';
import AboutSection from '../components/sections/AboutSection';
import { PrizesSection } from '../components/sections/PrizesSection';
import SkewCards from '../components/sections/SkewCards';
import ProblemStatements from '../components/problem-statements/ProblemStatements';
import GuidelinesSection from '../components/sections/GuidelinesSection';
import TimelineSection from '../components/sections/TimelineSection';
import InteractiveSection from '../components/sections/InteractiveSection';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function DeadlinePopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkDeadline = async () => {
      try {
        const res = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
        const data = await res.json();
        const currentTime = new Date(data.datetime);
        const deadline = new Date('2026-07-26T12:30:00Z'); // 6:00 PM IST
        if (currentTime > deadline) setShowPopup(true);
      } catch (err) {
        if (new Date() > new Date('2026-07-26T12:30:00Z')) setShowPopup(true);
      }
    };
    checkDeadline();
  }, []);

  return (
    <AnimatePresence>
      {showPopup && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} 
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{ position: 'relative', background: '#fff', padding: '32px', borderRadius: 24, maxWidth: 440, width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
          >
            {/* Trophy icon */}
            <div style={{ width: 72, height: 72, background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 36 }}>
              🏆
            </div>
            
            <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 8 }}>Shortlisted Teams Announced!</h2>
            
            <p style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.6, marginBottom: 24 }}>
              The shortlisted teams for SRCAS Hackathon 3.0 have been announced — check if your team made it! 🎉
            </p>
            
            <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
              <a href="/shortlisted" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #4C9F38, #2d7a2d)', color: '#fff', borderRadius: 12, fontWeight: 700, textDecoration: 'none', display: 'inline-block', fontSize: 15, boxShadow: '0 4px 12px rgba(76,159,56,0.35)' }}>
                🏆 View Shortlisted Teams
              </a>
              <button 
                onClick={() => setShowPopup(false)}
                style={{ width: '100%', padding: '14px', background: 'transparent', color: '#9ca3af', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function FloatingCountdown() {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const target = new Date('2026-07-26T12:30:00Z').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      
      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
      } else {
        setTimeLeft(difference);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft === null || timeLeft <= 0) return null;

  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#111',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        zIndex: 9000,
        fontWeight: 700,
        fontSize: '14px',
        border: '1px solid #333'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ef4444' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', animation: 'pulse 1.5s infinite' }} />
        Submissions close in:
      </div>
      <div style={{ display: 'flex', gap: 6, color: '#fff', letterSpacing: '1px' }}>
        <span>{String(hours).padStart(2, '0')}</span>:
        <span>{String(minutes).padStart(2, '0')}</span>:
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      <style>{`@keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }`}</style>
    </motion.div>
  );
}

function HomePage() {
  return (
    <main>
      <DeadlinePopup />
      <FloatingCountdown />
      <HeroSection7 />
      
      {/* ── Rest of the page ── */}
      <AboutSection />
      <PrizesSection />
      <SkewCards />
      <ProblemStatements />
      <GuidelinesSection />
      <TimelineSection />
      {/* <InteractiveSection /> */}
    </main>
  );
}

export default HomePage;
