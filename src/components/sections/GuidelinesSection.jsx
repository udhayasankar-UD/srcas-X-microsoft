import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import {
  Clock, UserPlus, FileText, Unlock, Badge,
  Users, Coffee, Building, MapPin, ShieldCheck
} from 'lucide-react';

const guidelinesPart1 = [
  {
    id: '01', title: '24-Hour Hackathon',
    description: 'A thrilling 24-hour coding marathon where teams collaborate, innovate, and build amazing solutions from scratch.',
    icon: Clock
  },
  {
    id: '02', title: 'Register with Ease',
    description: 'Registration is now open! Join us for an amazing hackathon experience.',
    icon: UserPlus
  },
  {
    id: '03', title: 'Use Official PPT Template',
    description: 'Download and use our official PPT template for submissions. Ensure uniformity and professionalism in your presentation.',
    icon: FileText
  },
  {
    id: '04', title: 'No Prerequisites',
    description: 'Any college student can join, no prerequisites—just bring your creativity!',
    icon: Unlock
  },
  {
    id: '05', title: 'ID Card Mandatory',
    description: 'All participants must carry their valid college ID cards throughout the event for identification and security purposes.',
    icon: Badge
  }
];

const guidelinesPart2 = [
  {
    id: '06', title: 'Form Team',
    description: 'Team up with 2-4 members from the same college; join our community to find teammates and get the latest updates!',
    icon: Users
  },
  {
    id: '07', title: 'Zero Fees & Free Food',
    description: 'No cost to participate, plus free meals and refreshments at SRCAS campus.',
    icon: Coffee
  },
  {
    id: '08', title: 'In-person Event',
    description: 'SRCAS Hackathon 2.0 is an in-person (offline) hackathon event at SRCAS Coimbatore.',
    icon: Building
  },
  {
    id: '09', title: 'Venue',
    description: 'SRCAS Coimbatore awaits—explore our beautiful campus and bring innovative ideas to life.',
    icon: MapPin
  },
  {
    id: '10', title: 'Safe and Secure',
    description: 'Organized by Sri Ramakrishna College of Arts and Science for an inclusive and secure environment for everyone.',
    icon: ShieldCheck
  }
];

const GuidelineItem = ({ item, accentColor, glowColor, isLast }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        cursor: "default",
        paddingBottom: "36px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      {/* Timeline track for this item */}
      {!isLast && (
        <div style={{
          position: "absolute",
          top: 38,
          bottom: 0,
          left: 15,
          width: 2,
          background: "#e8e8e8",
          zIndex: 0,
        }} />
      )}

      {/* Timeline Dot */}
      <div style={{
        position: "relative",
        zIndex: 10,
        width: 32,
        flexShrink: 0,
        display: "flex",
        justifyContent: "center",
        paddingTop: 22,
      }}>
        <motion.div
          animate={{ scale: isHovered ? 1.3 : 1 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "white",
            border: `2px solid ${accentColor}`,
            position: "relative",
            boxShadow: isHovered ? `0 0 12px ${glowColor}` : "none",
          }}
        >
          <div style={{
            position: "absolute",
            inset: 2,
            borderRadius: "50%",
            backgroundColor: accentColor,
            opacity: isHovered ? 1 : 0.5,
            transition: "opacity 0.3s",
          }} />
        </motion.div>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, flex: 1, paddingLeft: 20 }}>
        <div style={{
          transition: "all 0.3s ease",
          borderRadius: 16,
          padding: "14px 20px",
          backgroundColor: isHovered ? "white" : "transparent",
          boxShadow: isHovered ? "0 10px 40px -10px rgba(0,0,0,0.08)" : "none",
          border: isHovered ? "1px solid #f4f4f5" : "1px solid transparent",
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              fontFamily: "monospace",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: accentColor,
              flexShrink: 0,
            }}>
              {item.id}
            </span>
            <h3 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "1.25rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#111",
              margin: 0,
              flex: 1,
            }}>
              {item.title}
            </h3>
            <div style={{
              opacity: isHovered ? 1 : 0.25,
              transition: "opacity 0.3s",
              flexShrink: 0,
            }}>
              <Icon size={20} style={{ color: accentColor }} />
            </div>
          </div>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontSize: "0.95rem",
              lineHeight: 1.65,
              color: "#666",
              margin: "10px 0 0 0",
            }}>
              {item.description}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default function GuidelinesSection() {
  return (
    <section id="finalists" style={{
      position: "relative",
      padding: "100px 0 100px",
      backgroundColor: "#fff",
      overflow: "hidden",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      {/* Fine grid (matches TimelineSection) */}
      <svg aria-hidden style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        opacity: 0.03, pointerEvents: "none",
      }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`v${i}`} x1={`${(i+1)*7.14}%`} y1="0" x2={`${(i+1)*7.14}%`} y2="100%" stroke="#000" strokeWidth="1"/>
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={`${(i+1)*10}%`} x2="100%" y2={`${(i+1)*10}%`} stroke="#000" strokeWidth="1"/>
        ))}
      </svg>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem", position: "relative", zIndex: 1 }}>
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 64, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 28, height: 1, background: "#111" }} />
            <p style={{
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em",
              color: "#111", textTransform: "uppercase", margin: 0,
            }}>Event Guidelines</p>
            <div style={{ width: 28, height: 1, background: "#111" }} />
          </div>
          
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900,
            lineHeight: 1.05, letterSpacing: "-0.04em", color: "#111", margin: 0,
          }}>
            Rules of the game. <br className="hidden md:block" />
            <span style={{ color: "#777" }}>Everything you need to know.</span>
          </h2>
        </motion.div>

        {/* Two Columns */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "40px md:gap-[80px]", 
          marginTop: "60px" 
        }} className="md:grid-cols-2">
          
          {/* Column 1 - Part 1 (Black Accent) */}
          <div>
            <div style={{ marginBottom: "24px", paddingLeft: "16px" }}>
              <span style={{
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em",
                color: "#888", textTransform: "uppercase", fontFamily: "monospace"
              }}>
                Part 1 // Essentials
              </span>
            </div>
            
            <div className="flex flex-col">
              {guidelinesPart1.map((item, index) => (
                <GuidelineItem 
                  key={item.id} 
                  item={item} 
                  accentColor="#000000"
                  glowColor="rgba(0, 0, 0, 0.2)"
                  isLast={index === guidelinesPart1.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Column 2 - Part 2 (Blue Accent) */}
          <div className="mt-8 md:mt-0">
            <div style={{ marginBottom: "24px", paddingLeft: "16px" }}>
              <span style={{
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em",
                color: "#888", textTransform: "uppercase", fontFamily: "monospace"
              }}>
                Part 2 // Logistics
              </span>
            </div>
            
            <div className="flex flex-col">
              {guidelinesPart2.map((item, index) => (
                <GuidelineItem 
                  key={item.id} 
                  item={item} 
                  accentColor="#0078D4"
                  glowColor="rgba(0, 120, 212, 0.3)"
                  isLast={index === guidelinesPart2.length - 1}
                />
              ))}
            </div>
          </div>

        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: 60,
            padding: '32px 36px',
            background: '#0a0a0a',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            flexWrap: 'wrap',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div aria-hidden style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)',
          }} />
          <div>
            <p style={{
              fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', margin: '0 0 8px',
            }}>Ready to compete?</p>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(1rem,2vw,1.2rem)', fontWeight: 800,
              color: '#fff', margin: 0, lineHeight: 1.3,
            }}>
              Registration is free. No prerequisites.
            </p>
          </div>
          <MagneticButton href="#problems" variant="light" size="md">
            Register Now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
