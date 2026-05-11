import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { theme } from '../../theme';

// Inlined so Vite doesn't choke on the space in "problem statements/" during peer-import resolution
const SDGs = [
  {
    id: 1, num: '01', title: 'No Poverty',
    color: '#E5243B',
    logoUrl: 'data:image/png;base64,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',
    imageUrl: 'https://images.unsplash.com/photo-1635929114944-8bab23b98e74?q=80&w=1534&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'End poverty in all its forms everywhere by 2030.',
    challenges: [
      'Build a digital platform connecting low-income families to financial aid, food banks, and government schemes using AI-driven eligibility matching.',
      'Design a micro-finance app that uses alternative credit-scoring to provide loans to those without bank accounts or formal credit history.',
    ],
  },
  {
    id: 2, num: '02', title: 'Zero Hunger',
    color: '#DDA63A',
    logoUrl: 'hhttps://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQOjS2kEOX6ix-veSKjQhYzKXXaLMIV7l07PgmAeCAsOfVGSVt6gBkQQJEaB4Nh',
    imageUrl: 'https://images.unsplash.com/photo-1694286068611-d0c24cbc2cd5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UG92ZXJ0eSUyMEh1bmdlcnxlbnwwfHwwfHx8Mg%3D%3D',
    description: 'End hunger, achieve food security and improved nutrition.',
    challenges: [
      'Create an AI-powered crop yield prediction system that helps smallholder farmers optimize planting schedules and reduce food waste.',
      'Build a food redistribution network that connects surplus food from restaurants and markets to shelters and food banks in real-time.',
    ],
  },
  {
    id: 3, num: '03', title: 'Good Health',
    color: '#4C9F38',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sustainable_Development_Goal_03GoodHealth.svg/200px-Sustainable_Development_Goal_03GoodHealth.svg.png',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R29vZCUyMEhlYWx0aHxlbnwwfHwwfHx8Mg%3D%3D',
    description: 'Ensure healthy lives and promote well-being for all at all ages.',
    challenges: [
      'Develop low-cost AI diagnostic tools for rural clinics that detect common diseases from basic images or symptoms with high accuracy.',
      'Build a mental health companion app with crisis detection, anonymous peer support, and integration with licensed therapists.',
    ],
  },
  {
    id: 4, num: '04', title: 'Quality Education',
    color: '#C5192D',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sustainable_Development_Goal_04QualityEducation.svg/200px-Sustainable_Development_Goal_04QualityEducation.svg.png',
    imageUrl: 'https://images.unsplash.com/flagged/photo-1574097656146-0b43b7660cb6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFF1YWxpdHklMjBFZHVjYXRpb24lMjB0YW1pbHxlbnwwfHwwfHx8Mg%3D%3D',
    description: 'Ensure inclusive, equitable quality education for all.',
    challenges: [
      'Build an adaptive AI tutor that adjusts lesson complexity in real-time based on student comprehension, supporting 10+ regional languages.',
      'Create an offline-first learning platform for schools in bandwidth-limited areas, with teacher dashboards and progress analytics.',
    ],
  },
  {
    id: 5, num: '05', title: 'Gender Equality',
    color: '#FF3A21',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Sustainable_Development_Goal_05GenderEquality.svg/200px-Sustainable_Development_Goal_05GenderEquality.svg.png',
    imageUrl: 'https://images.unsplash.com/photo-1622675205169-901710ac8643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEdlbmRlciUyMEVxdWFsaXR5fGVufDB8fDB8fHwy',
    description: 'Achieve gender equality and empower all women and girls.',
    challenges: [
      'Develop an anonymous reporting and legal aid platform for survivors of gender-based violence, with AI-powered case documentation.',
      'Build a bias-detection tool that audits job listings and HR practices for discriminatory language and patterns.',
    ],
  },
  {
    id: 6, num: '06', title: 'Clean Water',
    color: '#26BDE2',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Sustainable_Development_Goal_06CleanWater.svg/200px-Sustainable_Development_Goal_06CleanWater.svg.png',
    imageUrl: 'https://images.unsplash.com/photo-1624948465027-6f9b51067557?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNsZWFuJTIwd2F0ZXJ8ZW58MHx8MHx8fDI%3D',
    description: 'Ensure access to water and sanitation for all.',
    challenges: [
      'Design an IoT water quality monitoring network that flags contamination events in real-time and alerts municipalities and households.',
      'Build a community sanitation tracker that maps open-defecation-free zones and guides NGOs to areas needing urgent intervention.',
    ],
  },
  {
    id: 7, num: '07', title: 'Clean Energy',
    color: '#FCC30B',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Sustainable_Development_Goal_07CleanEnergy.svg/200px-Sustainable_Development_Goal_07CleanEnergy.svg.png',
    imageUrl: 'https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q2xlYW4lMjBFbmVyZ3l8ZW58MHx8MHx8fDI%3D',
    description: 'Ensure access to affordable, reliable, sustainable energy.',
    challenges: [
      'Create an AI energy management system for micro-grids in rural villages powered by solar, balancing load and predicting demand.',
      'Build a marketplace platform for peer-to-peer renewable energy trading between prosumers and consumers in urban neighbourhoods.',
    ],
  },
  {
    id: 8, num: '08', title: 'Decent Work',
    color: '#A21942',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Sustainable_Development_Goal_08DecentWork.svg/200px-Sustainable_Development_Goal_08DecentWork.svg.png',
    imageUrl: 'https://images.unsplash.com/photo-1733826544839-2282050204e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGVjZW50JTIwd29ya3xlbnwwfHwwfHx8Mg%3D%3D',
    description: 'Promote inclusive economic growth and decent work for all.',
    challenges: [
      'Develop a skills-matching platform for informal-sector workers that translates vernacular experience into verified digital credentials.',
      'Build a gig-worker wellbeing app that tracks income volatility, suggests diversification, and provides safety-net micro-insurance options.',
    ],
  },
  {
    id: 9, num: '09', title: 'Industry & Innovation',
    color: '#FD6925',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Sustainable_Development_Goal_09Industry.svg/200px-Sustainable_Development_Goal_09Industry.svg.png',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
    description: 'Build resilient infrastructure and foster innovation.',
    challenges: [
      'Design an AI-driven predictive maintenance system for public infrastructure (bridges, roads) using sensor data and computer vision.',
      'Build a startup incubator platform connecting rural entrepreneurs with mentors, funding, and markets using AI-based opportunity matching.',
    ],
  },
  {
    id: 10, num: '10', title: 'Reduced Inequalities',
    color: '#DD1367',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Sustainable_Development_Goal_10ReducedInequalities.svg/200px-Sustainable_Development_Goal_10ReducedInequalities.svg.png',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
    description: 'Reduce inequality within and among countries.',
    challenges: [
      'Develop an algorithmic audit tool that detects racial, gender, or socioeconomic bias in lending, hiring, or admissions AI systems.',
      'Build an accessible digital-public-services navigator for immigrants and refugees, supporting 20+ languages with step-by-step guidance.',
    ],
  },
  {
    id: 11, num: '11', title: 'Sustainable Cities',
    color: '#FD9D24',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Sustainable_Development_Goal_11SustainableCities.svg/200px-Sustainable_Development_Goal_11SustainableCities.svg.png',
    imageUrl: 'https://images.unsplash.com/photo-1578913020856-1c5ded2ce3e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3VzdGFpbmFibGUlMjBjaXRpZXN8ZW58MHx8MHx8fDI%3D',
    description: 'Make cities inclusive, safe, resilient and sustainable.',
    challenges: [
      'Create a smart traffic orchestration system using real-time sensor feeds and ML to reduce congestion and lower urban emissions.',
      'Build a civic engagement platform where residents can report infrastructure issues, vote on local budgets, and track government responses.',
    ],
  },
  {
    id: 12, num: '12', title: 'Responsible Consumption',
    color: '#BF8B2E',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Sustainable_Development_Goal_12ResponsibleConsumption.svg/200px-Sustainable_Development_Goal_12ResponsibleConsumption.svg.png',
    imageUrl: 'https://images.unsplash.com/vector-1738396045672-e1675c8cb1a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVzcG9uc2libGUlMjBjb25zdW1wdGlvbnxlbnwwfHwwfHx8Mg%3D%3D',
    description: 'Ensure sustainable consumption and production patterns.',
    challenges: [
      'Design a product lifecycle tracker (using QR/blockchain) showing consumers the full environmental cost of a product from factory to disposal.',
      'Build an AI-powered waste sorting assistant for homes and businesses that gamifies recycling and tracks diversion rates.',
    ],
  },
  {
    id: 13, num: '13', title: 'Climate Action',
    color: '#3F7E44',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Sustainable_Development_Goal_13ClimateAction.svg/200px-Sustainable_Development_Goal_13ClimateAction.svg.png',
    imageUrl: 'https://images.unsplash.com/photo-1570095378004-ce65d6c2d5bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbWF0ZSUyMGFjdGlvbnxlbnwwfHwwfHx8Mg%3D%3D',
    description: 'Take urgent action to combat climate change.',
    challenges: [
      'Build a personal carbon footprint dashboard that integrates travel, diet, and energy data, then suggests and tracks offset actions.',
      'Develop an early-warning system for extreme weather events using satellite imagery and ML to protect vulnerable communities.',
    ],
  },
  {
    id: 14, num: '14', title: 'Life Below Water',
    color: '#0A97D9',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Sustainable_Development_Goal_14LifeBelowWater.svg/200px-Sustainable_Development_Goal_14LifeBelowWater.svg.png',
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZpc2h8ZW58MHx8MHx8fDI%3D',
    description: 'Conserve and sustainably use oceans and marine resources.',
    challenges: [
      'Create a computer-vision system for fishing vessels that automatically identifies and rejects bycatch species before they are hauled aboard.',
      'Build a coral-reef health monitoring platform using underwater drone imagery and AI to predict bleaching events and guide restoration.',
    ],
  },
  {
    id: 15, num: '15', title: 'Life on Land',
    color: '#56C02B',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Sustainable_Development_Goal_15LifeOnLand.svg/200px-Sustainable_Development_Goal_15LifeOnLand.svg.png',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80',
    description: 'Protect, restore and promote sustainable use of ecosystems.',
    challenges: [
      'Develop a real-time deforestation alert system using satellite data and ML that notifies rangers and authorities within hours of illegal clearing.',
      'Build a biodiversity mapping app that lets citizen scientists log wildlife sightings, auto-classifies species via camera, and feeds open datasets.',
    ],
  },
  {
    id: 16, num: '16', title: 'Peace & Justice',
    color: '#00689D',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Sustainable_Development_Goal_16PeaceJustice.svg/200px-Sustainable_Development_Goal_16PeaceJustice.svg.png',
    imageUrl: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=600&q=80',
    description: 'Promote just, peaceful and inclusive societies.',
    challenges: [
      'Build a transparent public-procurement tracker that uses ML to flag anomalous contracts and potential corruption in government spending.',
      'Design a legal-aid chatbot for low-income users that navigates jurisdictional law, drafts basic documents, and connects to pro-bono lawyers.',
    ],
  },
  {
    id: 17, num: '17', title: 'Partnerships',
    color: '#19486A',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Sustainable_Development_Goal_17Partnerships.svg/200px-Sustainable_Development_Goal_17Partnerships.svg.png',
    imageUrl: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGFydG5lcnNoaXBzfGVufDB8fDB8fHwy',
    description: 'Strengthen global partnerships for sustainable development.',
    challenges: [
      'Create a cross-sector collaboration platform matching NGOs, governments, and startups based on complementary resources and shared SDG targets.',
      'Build an open data aggregator that standardises development metrics from 50+ countries, enabling transparent progress tracking toward the 2030 Agenda.',
    ],
  },
];

export default function ProblemStatements() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // For horizontal sliding of the filmstrip track (desktop only)
  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-85%']);

  const [activeSDG, setActiveSDG] = useState(SDGs[0]);
  const [mobileIndex, setMobileIndex] = useState(0);
  const isHoveringRef = useRef(false);
  const mobileScrollRef = useRef(null);

  // ── One-card-at-a-time swipe ─────────────────────────────────────────────────
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping   = useRef(false);   // locked to horizontal once determined

  const goToIndex = (idx) => {
    const next = Math.max(0, Math.min(idx, SDGs.length - 1));
    setMobileIndex(next);
    setActiveSDG(SDGs[next]);
    const el = mobileScrollRef.current;
    if (!el) return;
    // Each card slot = container width (one card fills the view)
    const slotWidth = el.clientWidth;
    el.scrollTo({ left: next * slotWidth, behavior: 'smooth' });
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const onTouchMove = (e) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    // Lock axis on first significant move
    if (!isSwiping.current && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      isSwiping.current = Math.abs(dx) > Math.abs(dy);
    }
    // Prevent page scroll only when swiping horizontally
    if (isSwiping.current) e.preventDefault();
  };

  const onTouchEnd = (e) => {
    if (!isSwiping.current) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const THRESHOLD = 40; // px — any swipe beyond this = advance one card
    if (dx < -THRESHOLD) goToIndex(mobileIndex + 1);
    else if (dx > THRESHOLD) goToIndex(mobileIndex - 1);
    else goToIndex(mobileIndex); // snap back if not far enough
    isSwiping.current = false;
  };

  // Attach passive:false so we can call preventDefault in onTouchMove
  useEffect(() => {
    const el = mobileScrollRef.current;
    if (!el || !isMobile) return;
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove',  onTouchMove,  { passive: false });
    el.addEventListener('touchend',   onTouchEnd,   { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove',  onTouchMove);
      el.removeEventListener('touchend',   onTouchEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, mobileIndex]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (isHoveringRef.current || isMobile) return;
      const index = Math.max(0, Math.min(Math.floor(latest * SDGs.length * 1.1), SDGs.length - 1));
      setActiveSDG(SDGs[index]);
    });
    return () => unsubscribe();
  }, [scrollYProgress, isMobile]);

  const handleHoverStart = (sdg) => {
    if (isMobile) return;
    isHoveringRef.current = true;
    setActiveSDG(sdg);
  };

  const handleHoverEnd = () => {
    if (isMobile) return;
    isHoveringRef.current = false;
  };

  const handleMobilePrev = () => goToIndex(mobileIndex - 1);
  const handleMobileNext = () => goToIndex(mobileIndex + 1);

  return (
    <section
      id="problem-statements"
      ref={targetRef}
      style={{
        height: isMobile ? 'auto' : '400vh',
        background: '#ffffff',
        position: 'relative',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
        <div style={{
          position: isMobile ? 'relative' : 'sticky',
          top: 0,
          height: isMobile ? 'auto' : '100vh',
          overflow: isMobile ? 'auto' : 'visible',
          overflowX: isMobile ? 'auto' : 'hidden',
          overflowY: isMobile ? 'hidden' : undefined,
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
        }}>
        {/* Title area */}
        <div style={{
          padding: isMobile ? '32px 6vw 16px' : '40px 6vw',
          flexShrink: 0,
          background: '#ffffff',
          zIndex: 10,
          borderBottom: '1px solid #f0f0f0',
        }}>
          <p style={{
            fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.22em',
            color: '#999', marginBottom: '0.5rem', textTransform: 'uppercase',
          }}>
            Problem Statements
          </p>
          <p style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 700, color: '#333', 
            marginBottom: '1.2rem', lineHeight: 1.4, fontStyle: 'italic',
          }}>
            The floor is completely open to your ideas
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{
              fontFamily: theme.fonts.heading,
              fontSize: 'clamp(1.8rem, 3.8vw, 3.4rem)',
              fontWeight: 800, color: '#111111',
              letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0,
            }}>
              The SDG <span style={{ color: activeSDG.color, transition: 'color 0.4s ease' }}>Filmstrip</span>
            </h2>
            {/* Mobile nav buttons */}
            {isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={handleMobilePrev}
                  disabled={mobileIndex === 0}
                  aria-label="Previous SDG"
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    border: `2px solid ${mobileIndex === 0 ? '#e0e0e0' : activeSDG.color}`,
                    background: mobileIndex === 0 ? '#f5f5f5' : activeSDG.color,
                    color: mobileIndex === 0 ? '#bbb' : '#fff',
                    fontSize: '18px', cursor: mobileIndex === 0 ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.25s ease',
                  }}
                >‹</button>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#666', minWidth: '48px', textAlign: 'center' }}>
                  {mobileIndex + 1} / {SDGs.length}
                </span>
                <button
                  onClick={handleMobileNext}
                  disabled={mobileIndex === SDGs.length - 1}
                  aria-label="Next SDG"
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    border: `2px solid ${mobileIndex === SDGs.length - 1 ? '#e0e0e0' : activeSDG.color}`,
                    background: mobileIndex === SDGs.length - 1 ? '#f5f5f5' : activeSDG.color,
                    color: mobileIndex === SDGs.length - 1 ? '#bbb' : '#fff',
                    fontSize: '18px', cursor: mobileIndex === SDGs.length - 1 ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.25s ease',
                  }}
                >›</button>
              </div>
            )}
          </div>
          {isMobile && (
            <p style={{ margin: '10px 0 0', fontSize: '12px', color: '#999', fontStyle: 'italic' }}>
              ← Swipe left to explore all 17 Sustainable Development Goals
            </p>
          )}
          {!isMobile && (
            <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#999' }}>
              ↕ Scroll down to explore all 17 goals — hover a card to preview
            </p>
          )}
        </div>

        {/* Filmstrip Track */}
        {isMobile ? (
          // Mobile: one-card-at-a-time gallery swipe
          <div
            ref={mobileScrollRef}
            style={{
              display: 'flex',
              overflowX: 'hidden',   // hide scrollbar, we control scroll programmatically
              padding: '24px 0',
              WebkitOverflowScrolling: 'touch',
              userSelect: 'none',
            }}
            className="mobile-filmstrip"
          >
            {SDGs.map((sdg, idx) => {
              const isActive = activeSDG.id === sdg.id;
              return (
                <div
                  key={sdg.id}
                  style={{
                    // Each slot is exactly the container width — true gallery behavior
                    minWidth: '100%',
                    padding: '0 6vw',
                    boxSizing: 'border-box',
                    flexShrink: 0,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '340px',
                      height: '320px',
                      borderRadius: '24px',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: isActive
                        ? `0 20px 40px ${sdg.color}50`
                        : '0 8px 20px rgba(0,0,0,0.10)',
                      border: `2px solid ${isActive ? sdg.color : 'rgba(0,0,0,0.06)'}`,
                      transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
                      transform: isActive ? 'scale(1.02)' : 'scale(0.96)',
                    }}
                  >
                    <img
                      src={sdg.imageUrl}
                      alt={sdg.title}
                      draggable={false}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `linear-gradient(0deg, ${sdg.color}CC 0%, rgba(0,0,0,0.45) 80%)`,
                    }} />
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '16px',
                      zIndex: 2, color: '#fff',
                    }}>
                      <div style={{
                        background: 'rgba(0,0,0,0.35)',
                        padding: '4px 8px', borderRadius: '4px',
                        fontSize: '12px', fontWeight: 800,
                        display: 'inline-block', marginBottom: '6px',
                      }}>SDG {sdg.num}</div>
                      <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, lineHeight: 1.2 }}>{sdg.title}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Desktop: horizontal scroll filmstrip
          <div style={{
            height: '420px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10,
            overflow: 'hidden',
            flexShrink: 0,
            marginBottom: '0px',
          }}>
            <motion.div
              style={{ x, display: 'flex', gap: '30px', padding: '0 6vw', alignItems: 'center' }}
            >
              {SDGs.map(sdg => {
                const isActive = activeSDG.id === sdg.id;
                return (
                  <motion.div
                    key={sdg.id}
                    onMouseEnter={() => handleHoverStart(sdg)}
                    onMouseLeave={handleHoverEnd}
                    animate={{
                      scale: isActive ? 1.05 : 0.95,
                      opacity: isActive ? 1 : 0.65,
                      y: isActive ? -8 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: '270px', height: '360px',
                      borderRadius: '20px', position: 'relative',
                      overflow: 'hidden', cursor: 'pointer', flexShrink: 0,
                      boxShadow: isActive ? `0 20px 40px ${sdg.color}45` : '0 6px 16px rgba(0,0,0,0.10)',
                      border: `1px solid ${isActive ? sdg.color : 'rgba(0,0,0,0.08)'}`,
                      zIndex: isActive ? 10 : 5,
                    }}
                  >
                    <img src={sdg.imageUrl} alt={sdg.title}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `linear-gradient(0deg, ${sdg.color}CC 0%, rgba(0,0,0,0.35) 60%)`, zIndex: 1,
                    }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '18px', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{
                        background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
                        color: '#fff', fontSize: '12px', fontWeight: 800,
                        padding: '3px 10px', borderRadius: '6px', alignSelf: 'flex-start',
                      }}>SDG {sdg.num}</div>
                      <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{sdg.title}</h3>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}

        {/* Dedicated Bottom Panel */}
        <div style={{
          minHeight: '220px',
          background: '#f9f9f9',
          borderTop: '1.5px solid #ebebeb',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          marginTop: '56px',
          position: 'relative',
          zIndex: 5,
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSDG.id}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '40px 6vw',
                height: '100%',
                display: 'flex',
                gap: '40px',
              }}
              className="bottom-panel-inner"
            >
              <div style={{ flex: '0 0 30%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{
                    width: '64px', height: '64px',
                    borderRadius: '16px', background: `${activeSDG.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <img src={activeSDG.logoUrl} alt="Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#111', margin: 0 }}>{activeSDG.title}</h3>
                    <p style={{ fontSize: '14px', color: activeSDG.color, fontWeight: 700, margin: 0 }}>SDG {activeSDG.num}</p>
                  </div>
                </div>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.6, margin: 0 }}>
                  {activeSDG.description}
                </p>
              </div>

              <div style={{ width: '1px', background: '#eee', margin: '0 10px' }} className="panel-divider" />

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{
                  fontSize: '11px', fontWeight: 700, color: '#999',
                  letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px', margin: 0,
                }}>
                  Challenge Statements
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                  {activeSDG.challenges.map((c, i) => (
                    <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: activeSDG.color, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '12px', fontWeight: 800, flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        {i + 1}
                      </div>
                      <p style={{ fontSize: '15px', color: '#333', lineHeight: 1.6, margin: 0 }}>
                        {c}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .mobile-filmstrip::-webkit-scrollbar { display: none; }
        @media (max-width: 900px) {
          .bottom-panel-inner {
            flex-direction: column !important;
            gap: 16px !important;
            padding: 24px 6vw !important;
            overflow-y: auto !important;
          }
          .panel-divider {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
