import React, { useState, useRef } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import { theme } from '../../theme';

// Inlined so Vite doesn't choke on the space in "problem statements/" during peer-import resolution
const SDGs = [
  {
    id: 1, num: '01', title: 'No Poverty',
    color: '#E5243B',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Sustainable_Development_Goal_01NoPoverty.svg/200px-Sustainable_Development_Goal_01NoPoverty.svg.png',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
    description: 'End poverty in all its forms everywhere by 2030.',
    challenges: [
      'Build a digital platform connecting low-income families to financial aid, food banks, and government schemes using AI-driven eligibility matching.',
      'Design a micro-finance app that uses alternative credit-scoring to provide loans to those without bank accounts or formal credit history.',
    ],
  },
  {
    id: 2, num: '02', title: 'Zero Hunger',
    color: '#DDA63A',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Sustainable_Development_Goal_02ZeroHunger.svg/200px-Sustainable_Development_Goal_02ZeroHunger.svg.png',
    imageUrl: 'https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1505751172107-573957a24369?w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1548932813-71ede3462674?w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80',
    description: 'Strengthen global partnerships for sustainable development.',
    challenges: [
      'Create a cross-sector collaboration platform matching NGOs, governments, and startups based on complementary resources and shared SDG targets.',
      'Build an open data aggregator that standardises development metrics from 50+ countries, enabling transparent progress tracking toward the 2030 Agenda.',
    ],
  },
];

// ── react-bits Folder icon (open controlled by parent, hover animates internally) ──
const _darken = (hex, pct) => {
  const c = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, Math.floor(((c >> 16) & 0xff) * (1 - pct))));
  const g = Math.max(0, Math.min(255, Math.floor(((c >>  8) & 0xff) * (1 - pct))));
  const b = Math.max(0, Math.min(255, Math.floor(( c        & 0xff) * (1 - pct))));
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase();
};

function FolderIcon({ isOpen }) {
  const color = '#EAB308';
  const back  = _darken(color, 0.08);
  const paperColors = [_darken('#ffffff', 0.1), _darken('#ffffff', 0.05), '#ffffff'];

  const [hovered, setHovered]       = useState(false);
  const [offsets, setOffsets]       = useState([{x:0,y:0},{x:0,y:0},{x:0,y:0}]);

  const up = isOpen || hovered;

  const openXfm = i => {
    const base = i === 0 ? 'translate(-120%,-70%) rotate(-15deg)'
               : i === 1 ? 'translate(10%,-70%) rotate(15deg)'
               :            'translate(-50%,-100%) rotate(5deg)';
    return `${base} translate(${offsets[i].x}px,${offsets[i].y}px)`;
  };

  const onPaperMove = (e, i) => {
    if (!isOpen) return;
    const r = e.currentTarget.getBoundingClientRect();
    setOffsets(prev => {
      const n = [...prev];
      n[i] = { x: (e.clientX - (r.left + r.width/2))  * 0.15,
               y: (e.clientY - (r.top  + r.height/2)) * 0.15 };
      return n;
    });
  };
  const onPaperLeave = (_, i) =>
    setOffsets(prev => { const n=[...prev]; n[i]={x:0,y:0}; return n; });

  // Outer div is 64×54 px (matches the grid slot).
  // Inner div renders at the natural 100×80 and is CSS-scaled to fit.
  return (
    <div
      style={{ width:64, height:54, position:'relative', overflow:'visible' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position:'absolute', top:0, left:0, transformOrigin:'top left', transform:'scale(0.64)' }}>
        {/* ── 100 × 80 folder body ── */}
        <div style={{
          position:'relative', width:100, height:80,
          borderRadius:'0 10px 10px 10px',
          backgroundColor: back,
          transform: up ? 'translateY(-8px)' : 'none',
          transition:'transform 0.2s ease-in',
        }}>
          {/* Tab nub */}
          <span style={{
            position:'absolute', zIndex:0,
            bottom:'98%', left:0, width:30, height:10,
            borderRadius:'5px 5px 0 0', backgroundColor:back,
          }} />

          {/* Papers */}
          {paperColors.map((pc, i) => (
            <div
              key={i}
              onMouseMove={e => onPaperMove(e, i)}
              onMouseLeave={e => onPaperLeave(e, i)}
              style={{
                position:'absolute', zIndex:20,
                bottom:'10%', left:'50%',
                width:  i===0?'70%':i===1?'80%':'90%',
                height: isOpen ? '80%' : i===0?'80%':i===1?'70%':'60%',
                backgroundColor: pc,
                borderRadius:10,
                transition:'all 0.3s ease-in-out',
                transform: isOpen
                  ? openXfm(i)
                  : hovered
                    ? 'translateX(-50%) translateY(0)'
                    : 'translateX(-50%) translateY(10%)',
              }}
            />
          ))}

          {/* Front flap — left skew */}
          <div style={{
            position:'absolute', zIndex:30, width:'100%', height:'100%',
            transformOrigin:'bottom', backgroundColor:color,
            borderRadius:'5px 10px 10px 10px',
            transition:'all 0.3s ease-in-out',
            transform: up ? 'skew(15deg) scaleY(0.6)' : 'none',
          }} />
          {/* Front flap — right skew */}
          <div style={{
            position:'absolute', zIndex:30, width:'100%', height:'100%',
            transformOrigin:'bottom', backgroundColor:color,
            borderRadius:'5px 10px 10px 10px',
            transition:'all 0.3s ease-in-out',
            transform: up ? 'skew(-15deg) scaleY(0.6)' : 'none',
          }} />
        </div>
      </div>
    </div>
  );
}

// ── Windows-style titlebar ────────────────────────────────────────────────────
function WinChrome({ title, accentColor }) {
  return (
    <div style={{
      background: '#f0f0f0',
      borderBottom: '1px solid #e0e0e0',
      display: 'flex',
      alignItems: 'center',
      height: '32px',
      flexShrink: 0,
      userSelect: 'none',
    }}>
      <div style={{ width: 3, height: '100%', background: accentColor, flexShrink: 0 }} />
      <span style={{
        fontSize: '12px',
        fontWeight: 600,
        color: '#555555',
        paddingLeft: '10px',
        flex: 1,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}>
        {title}
      </span>
      {['─', '□', '✕'].map((icon, i) => (
        <div
          key={i}
          style={{
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: i === 1 ? '9px' : i === 2 ? '12px' : '11px',
            color: '#888888',
            cursor: 'default',
          }}
        >
          {icon}
        </div>
      ))}
    </div>
  );
}

// ── Mobile Mission Modal ───────────────────────────────────────────────────────
function MobileMissionModal({ sdg, onClose }) {
  const col = sdg.color;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.55)',
        zIndex: 1000,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '20px 20px 0 0',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '24px 20px 40px',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 32, height: 32,
            background: '#f0f0f0', border: 'none', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', color: '#555', cursor: 'pointer',
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Drag handle pill */}
        <div style={{
          width: 36, height: 4, background: '#e0e0e0',
          borderRadius: 2, margin: '0 auto 20px',
        }} />

        {/* SDG badge + title + description */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            background: col, color: '#fff',
            fontSize: '13px', fontWeight: 800,
            padding: '5px 10px', borderRadius: '6px',
            flexShrink: 0, letterSpacing: '0.04em', whiteSpace: 'nowrap',
          }}>
            SDG {sdg.num}
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#111111', lineHeight: 1.25, marginBottom: '5px' }}>
              {sdg.title}
            </div>
            <div style={{ fontSize: '13px', color: '#555555', lineHeight: 1.55 }}>
              {sdg.description}
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: '#eeeeee', marginBottom: '14px' }} />

        <p style={{
          fontSize: '11px', fontWeight: 700,
          color: '#999999', letterSpacing: '0.15em',
          textTransform: 'uppercase', marginBottom: '12px',
        }}>
          Challenge Statements
        </p>

        {sdg.challenges.map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: i < sdg.challenges.length - 1 ? '14px' : 0 }}>
            <div style={{
              width: 3, flexShrink: 0, background: col,
              borderRadius: '2px', alignSelf: 'stretch',
            }} />
            <p style={{ fontSize: '13.5px', color: '#333333', lineHeight: 1.65, margin: 0 }}>
              {c}
            </p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function ProblemStatements() {
  const [selectedSDG, setSelectedSDG] = useState(SDGs[0]);
  const [animKey, setAnimKey]         = useState(0);
  const [topCard, setTopCard]         = useState(null);
  const [mobileModal, setMobileModal] = useState(null); // SDG shown in mobile popup

  // Drag controls — each card's titlebar is its drag handle
  const ctrl1 = useDragControls();
  const ctrl2 = useDragControls();
  const ctrl3 = useDragControls();
  const windowsRef = useRef(null);

  // Detect mobile (≤ 768px)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleSelect = (sdg) => {
    if (isMobile) {
      setSelectedSDG(sdg);
      setMobileModal(sdg);
      return;
    }
    if (sdg.id === selectedSDG.id) return;
    setSelectedSDG(sdg);
    setAnimKey(k => k + 1);
  };

  const col = selectedSDG.color;

  return (
    <section
      id="problem-statements"
      style={{
        background: '#ffffff',
        padding: '60px 40px 80px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow that follows the selected SDG colour */}
      <div style={{
        position: 'absolute',
        top: '38%', left: '62%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '700px',
        background: col,
        filter: 'blur(180px)',
        opacity: 0.04,
        borderRadius: '50%',
        transition: 'background 0.65s ease',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* ── Heading ── */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px', position: 'relative', zIndex: 1 }}>
        <p style={{
          fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.22em',
          color: '#888888', marginBottom: '1rem', textTransform: 'uppercase',
        }}>
          Problem Statements
        </p>
        <h2 style={{
          fontFamily: theme.fonts.heading,
          fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
          fontWeight: 800, color: '#111111',
          letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.25rem',
          whiteSpace: 'nowrap',
        }}>
          Explore the{' '}
          <span style={{ color: col, transition: 'color 0.4s ease' }}>UN SDG Goals</span>
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#555555', lineHeight: 1.7 }}>
          Click any goal to explore the challenge statements we&apos;re tackling
          to make a global impact by 2030.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="ps-layout" style={{ position: 'relative', zIndex: 1 }}>

        {/* LEFT — glassmorphism folder panel, 4 columns, 17 folders */}
        <div className="ps-folder-panel" style={{
          background: '#f5f5f5',
          border: '1px solid #e8e8e8',
          borderRadius: '20px',
          padding: '22px',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {SDGs.map(sdg => {
              const active = selectedSDG.id === sdg.id;
              return (
                <motion.div
                  key={sdg.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelect(sdg)}
                  onKeyDown={e => e.key === 'Enter' && handleSelect(sdg)}
                  aria-pressed={active}
                  aria-label={`SDG ${sdg.num}: ${sdg.title}`}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    backgroundColor: active ? '#DDA63A1a' : 'rgba(0,0,0,0)',
                    borderColor: active ? '#DDA63A' : 'rgba(0,0,0,0)',
                  }}
                  transition={{ duration: 0.22 }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: '6px', cursor: 'pointer', padding: '10px 4px 8px',
                    borderRadius: '10px', border: '1.5px solid transparent', outline: 'none',
                  }}
                >
                  <div style={{ width: '64px', height: '54px', overflow: 'visible' }}>
                    <FolderIcon isOpen={active} />
                  </div>
                  <span style={{
                    fontSize: '10px', fontWeight: 600,
                    color: active ? '#111111' : '#666666',
                    textAlign: 'center', lineHeight: 1.3,
                    wordBreak: 'break-word', maxWidth: '68px',
                    transition: 'color 0.22s ease',
                  }}>
                    {sdg.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — background card + 3 draggable windows */}
        <div className="ps-right-panel" style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{
            background: '#f5f5f5',
            border: '1px solid #e8e8e8',
            borderRadius: '20px',
            padding: '20px',
          }}>
            <div className="ps-windows" ref={windowsRef}>

          {/* Card 1 — SDG Official Logo (back, top-right) — draggable from titlebar */}
          <motion.div
            key={`logo-${animKey}`}
            drag dragControls={ctrl1} dragListener={false}
            dragConstraints={windowsRef} dragMomentum={false} dragElastic={0}
            onDragStart={() => setTopCard('logo')}
            onDragEnd={() => setTopCard(null)}
            initial={{ opacity: 0, y: -24, scale: 0.91 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', top: 0, left: 354, width: 262,
              zIndex: topCard === 'logo' ? 50 : 1,
              borderRadius: '10px', overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
              border: '1px solid #e8e8e8',
            }}
          >
            <div
              onPointerDown={e => ctrl1.start(e)}
              style={{ cursor: 'grab', touchAction: 'none', userSelect: 'none' }}
            >
              <WinChrome title={`SDG ${selectedSDG.num} — Logo`} accentColor={col} />
            </div>
            <div style={{
              background: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '22px', height: '218px',
            }}>
              <img
                src={selectedSDG.logoUrl}
                alt={`SDG ${selectedSDG.num}: ${selectedSDG.title} official logo`}
                loading="lazy"
                style={{ width: 158, height: 158, objectFit: 'contain' }}
              />
            </div>
          </motion.div>

          {/* Card 2 — Real-world photo (back, bottom-right) — draggable from titlebar */}
          <motion.div
            key={`photo-${animKey}`}
            drag dragControls={ctrl2} dragListener={false}
            dragConstraints={windowsRef} dragMomentum={false} dragElastic={0}
            onDragStart={() => setTopCard('photo')}
            onDragEnd={() => setTopCard(null)}
            initial={{ opacity: 0, y: 24, scale: 0.91 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.42, delay: 0.09, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', top: 314, left: 349, width: 318,
              zIndex: topCard === 'photo' ? 50 : 2,
              borderRadius: '10px', overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
              border: '1px solid #e8e8e8',
            }}
          >
            <div
              onPointerDown={e => ctrl2.start(e)}
              style={{ cursor: 'grab', touchAction: 'none', userSelect: 'none' }}
            >
              <WinChrome title={`SDG ${selectedSDG.num} — Impact`} accentColor={col} />
            </div>
            <div style={{ height: 192, overflow: 'hidden' }}>
              <img
                src={selectedSDG.imageUrl}
                alt={`Real-world impact — SDG ${selectedSDG.num}: ${selectedSDG.title}`}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </motion.div>

          {/* Card 3 — Text description (front, main) — draggable from titlebar */}
          <motion.div
            key={`text-${animKey}`}
            drag dragControls={ctrl3} dragListener={false}
            dragConstraints={windowsRef} dragMomentum={false} dragElastic={0}
            onDragStart={() => setTopCard('text')}
            onDragEnd={() => setTopCard(null)}
            initial={{ opacity: 0, x: -22, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.42, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', top: 55, left: 0, width: 400,
              zIndex: topCard === 'text' ? 50 : 3,
              borderRadius: '10px', overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
              border: '1px solid #e8e8e8',
            }}
          >
            <div
              onPointerDown={e => ctrl3.start(e)}
              style={{ cursor: 'grab', touchAction: 'none', userSelect: 'none' }}
            >
              <WinChrome title={`Mission: ${selectedSDG.title}`} accentColor={col} />
            </div>
            <div style={{ background: '#ffffff', padding: '26px 26px 30px' }}>

              {/* SDG badge + title + description */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '18px' }}>
                <div style={{
                  background: col, color: '#fff',
                  fontSize: '14px', fontWeight: 800,
                  padding: '5px 12px', borderRadius: '6px',
                  flexShrink: 0, letterSpacing: '0.04em', whiteSpace: 'nowrap',
                }}>
                  SDG {selectedSDG.num}
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#111111', lineHeight: 1.25, marginBottom: '6px' }}>
                    {selectedSDG.title}
                  </div>
                  <div style={{ fontSize: '14px', color: '#555555', lineHeight: 1.55 }}>
                    {selectedSDG.description}
                  </div>
                </div>
              </div>

              <div style={{ height: 1, background: '#eeeeee', marginBottom: '16px' }} />

              <p style={{
                fontSize: '11px', fontWeight: 700,
                color: '#999999',
                letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '14px',
              }}>
                Challenge Statements
              </p>

              {selectedSDG.challenges.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: i < selectedSDG.challenges.length - 1 ? '14px' : 0 }}>
                  <div style={{
                    width: 3, flexShrink: 0, background: col,
                    borderRadius: '2px', minHeight: '100%', alignSelf: 'stretch',
                  }} />
                  <p style={{ fontSize: '13.5px', color: '#333333', lineHeight: 1.65, margin: 0 }}>
                    {c}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

            </div>
          </div>
          <p className="ps-drag-hint" style={{
            margin: 0,
            textAlign: 'right',
            fontSize: '18px',
            color: '#aaaaaa',
            fontStyle: 'italic',
            letterSpacing: '0.02em',
          }}>
            ✦ Click a titlebar &amp; drag to rearrange windows
          </p>
        </div>
      </div>

      <style>{`
        .ps-layout {
          display: flex;
          gap: 52px;
          align-items: flex-start;
          max-width: 1200px;
          margin: 0 auto;
        }
        .ps-folder-panel { flex-shrink: 0; width: 370px; }
        .ps-windows { width: 100%; position: relative; height: 538px; }

        @media (max-width: 1150px) {
          .ps-layout { gap: 36px; }
          .ps-folder-panel { width: 340px; }
        }
        @media (max-width: 960px) {
          .ps-layout { flex-direction: column; align-items: center; gap: 36px; }
          .ps-folder-panel { width: 100%; max-width: 420px; }
          .ps-windows { width: 100%; max-width: 580px; height: 568px; }
        }
        @media (max-width: 640px) {
          #problem-statements { padding: 40px 20px 60px !important; }
          .ps-windows { height: 620px; }
        }
        @media (max-width: 768px) {
          .ps-right-panel { display: none !important; }
          .ps-drag-hint { display: none !important; }
        }
      `}</style>

      {/* Mobile mission modal */}
      <AnimatePresence>
        {mobileModal && (
          <MobileMissionModal sdg={mobileModal} onClose={() => setMobileModal(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
