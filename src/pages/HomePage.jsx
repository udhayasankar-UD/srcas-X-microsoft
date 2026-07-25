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
        const deadline = new Date('2026-07-25T19:10:59Z'); // 12:40 AM IST
        if (currentTime > deadline) setShowPopup(true);
      } catch (err) {
        if (new Date() > new Date('2026-07-25T19:10:59Z')) setShowPopup(true);
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
            style={{ position: 'relative', background: '#fff', padding: '32px', borderRadius: 24, maxWidth: 420, width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
          >
            <div style={{ width: 64, height: 64, background: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            
            <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 12 }}>Registration Closed</h2>
            
            <p style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.6, marginBottom: 24 }}>
              The deadline for SRCAS Hackathon 3.0 has officially passed. You can still log in to view your team details and submission data.
            </p>
            
            <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
              <a href="/register" style={{ width: '100%', padding: '14px', background: '#4C9F38', color: '#fff', borderRadius: 12, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
                Go to Login
              </a>
              <button 
                onClick={() => setShowPopup(false)}
                style={{ width: '100%', padding: '14px', background: 'transparent', color: '#6b7280', border: 'none', fontWeight: 600, cursor: 'pointer' }}
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

function HomePage() {
  return (
    <main>
      <DeadlinePopup />
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
