import React from "react";
import { motion } from "framer-motion";
import srcasLogo from "../../assets/logo/srcas-1-logo.png";
import msLogo from "../../assets/logo/microsoft.png";
import heroArchImage from "../../assets/images/hero_arch_image.png";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

// --- Icons ---
const CodeBracket = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const ClockIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const StarIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const GiftIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"></polyline>
    <rect x="2" y="7" width="20" height="5"></rect>
    <line x1="12" y1="22" x2="12" y2="7"></line>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
  </svg>
);

const TrophyIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>
  </svg>
);

const BrainIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);

const PinIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const BulbIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"></path>
    <path d="M9 18h6"></path>
    <path d="M10 22h4"></path>
  </svg>
);

const CalendarIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ArrowRight = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// --- Components ---

export default function HeroSection6() {
  return (
    <div style={{
      backgroundColor: "#f9fafb",
      minHeight: "100vh",
      fontFamily: "'Inter', sans-serif",
      color: "#111",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Dots/Grid (subtle) */}
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        opacity: 0.5,
        zIndex: 0
      }} />

      {/* Header */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 40px",
        position: "relative",
        zIndex: 10
      }}>
        {/* Left: Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            backgroundColor: "#111",
            color: "#fff",
            padding: "6px 8px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <CodeBracket size={18} />
          </div>
          <span style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>HACKATHON</span>
        </div>

        {/* Center: Pills */}
        <div className="hs6-pills-mobile-hide" style={{ display: "flex", alignItems: "center" }}>
          <div style={{
            backgroundColor: "#111",
            color: "#fff",
            padding: "8px 20px",
            borderRadius: "30px 0 0 30px",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}>
            <StarIcon size={12} fill="#fff" /> NATIONAL HACKATHON 2024
          </div>
          <div style={{
            backgroundColor: "#fff",
            color: "#6b7280",
            padding: "8px 20px",
            borderRadius: "0 30px 30px 0",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            border: "1px solid #e5e7eb",
            borderLeft: "none"
          }}>
            #BUILD THE FUTURE
          </div>
        </div>

        {/* Right: Logos */}
        <div className="hs6-logos-mobile-hide" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, fontSize: "1.2rem" }}>
            SDG
            <div style={{
              width: "24px", height: "24px", borderRadius: "50%",
              background: "conic-gradient(#e5243b 0 21deg, #dda63a 21deg 42deg, #4c9f38 42deg 64deg, #c5192d 64deg 85deg, #ff3a21 85deg 107deg, #26bde2 107deg 128deg, #fcc30b 128deg 150deg, #a21942 150deg 171deg, #fd6925 171deg 193deg, #dd1367 193deg 214deg, #fd9d24 214deg 236deg, #bf8b2e 236deg 257deg, #3f7e44 257deg 279deg, #0a97d9 279deg 300deg, #56c02b 300deg 321deg, #00689d 321deg 343deg, #19486a 343deg 360deg)"
            }} />
          </div>
          <div style={{ width: "1px", height: "30px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "0.6rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600, display: "flex", flexDirection: "column" }}>
              Organized by
            </span>
            <img src={srcasLogo} alt="SRCAS" style={{ height: "32px", objectFit: "contain" }} />
          </div>
          <div style={{ width: "1px", height: "30px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "0.6rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600, display: "flex", flexDirection: "column" }}>
              Partner
            </span>
            <img src={msLogo} alt="Microsoft" style={{ height: "24px", objectFit: "contain" }} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        padding: "20px 60px",
        gap: "40px",
        position: "relative",
        zIndex: 10,
        alignItems: "center"
      }} className="hs6-main-container">
        
        {/* Left Column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ 
            fontSize: "clamp(4rem, 7vw, 7rem)", 
            fontWeight: 800, 
            lineHeight: 1.05, 
            letterSpacing: "-0.04em",
            margin: 0
          }}>
            What's the <br />
            next <br />
            <span style={{ color: "#d1d5db" }}>big</span> idea?
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: "1.1rem", color: "#4b5563", lineHeight: 1.6, maxWidth: "400px" }}>
            India's premier hackathon for the UN SDGs.<br />
            <span style={{ fontWeight: 800, color: "#111" }}>Build. Solve. Impact.</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "10px" }}>
            <a href="#register" style={{
              display: "flex", alignItems: "center", gap: "8px",
              backgroundColor: "#111", color: "#fff",
              padding: "16px 28px", borderRadius: "12px",
              fontWeight: 600, fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              Register Now <ArrowRight size={18} />
            </a>
            <a href="#problems" style={{
              display: "flex", alignItems: "center", gap: "8px",
              backgroundColor: "#fff", color: "#111",
              padding: "16px 28px", borderRadius: "12px",
              fontWeight: 600, fontSize: "0.95rem",
              textDecoration: "none",
              border: "1px solid #e5e7eb",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              View Problem Statements <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>

        {/* Right Column (Image/Graphic) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ flex: 1, position: "relative", display: "flex", justifyContent: "flex-end" }} className="hs6-image-container">
          
          <CardContainer className="w-full max-w-[600px]" containerClassName="py-0 flex-1 flex justify-end">
            <CardBody style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4/3",
              backgroundColor: "#fff",
              borderRadius: "32px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
              border: "1px solid rgba(255,255,255,0.5)",
              padding: 0
            }} className="w-full h-auto">
              
              <CardItem translateZ="50" style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: "32px" }}>
                <img src={heroArchImage} alt="Abstract Architecture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </CardItem>
              
              {/* Floating Card */}
              <CardItem translateZ="100" style={{
                position: "absolute",
                top: "40px",
                left: "-30px",
              }}>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(12px)",
                  padding: "24px",
                  borderRadius: "20px",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
                  maxWidth: "200px"
                }} className="hs6-floating-card">
                  <div style={{
                    width: "40px", height: "40px",
                    backgroundColor: "#111", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", marginBottom: "16px"
                  }}>
                    <BulbIcon size={20} />
                  </div>
                  <p style={{ margin: 0, fontWeight: 500, fontSize: "1.1rem", lineHeight: 1.4 }}>
                    Innovate today to impact <span style={{ fontWeight: 800 }}>tomorrow.</span>
                  </p>
                </motion.div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </motion.div>

      </main>

      {/* Bottom Stats/Info Rows */}
      <div style={{
        padding: "0 60px 40px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        position: "relative",
        zIndex: 10
      }} className="hs6-bottom-container">
        
        {/* Row 1 */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
          backgroundColor: "#fff",
          borderRadius: "24px",
          padding: "30px 40px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          {[
            { icon: <ClockIcon size={22} />, val: "24h", label: "HACKING" },
            { icon: <CodeBracket size={22} />, val: "17", label: "SDG STAGES" },
            { icon: <StarIcon size={22} />, val: "National", label: "LEVEL" },
            { icon: <GiftIcon size={22} />, val: "₹5L+", label: "PRIZE POOL" }
          ].map((stat, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, minWidth: "150px" }}>
              <div style={{
                width: "48px", height: "48px",
                backgroundColor: "#111", color: "#fff",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "16px"
              }}>
                {stat.icon}
              </div>
              <div style={{ fontWeight: 800, fontSize: "1.5rem", marginBottom: "4px" }}>{stat.val}</div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6b7280", letterSpacing: "0.1em" }}>{stat.label}</div>
            </div>
          ))}
        </motion.div> */}

        {/* Row 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "20px 30px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#111" }}>
            <TrophyIcon size={18} /> 4TH HACKATHON
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#111" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
              <div style={{width: 8, height: 8, background: "#f25022"}}></div>
              <div style={{width: 8, height: 8, background: "#7fba00"}}></div>
              <div style={{width: 8, height: 8, background: "#00a4ef"}}></div>
              <div style={{width: 8, height: 8, background: "#ffb900"}}></div>
            </div> MICROSOFT PARTNER
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#111" }}>
            <BrainIcon size={18} /> GENIUS AI
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#111" }}>
            <div style={{
              width: "18px", height: "18px", borderRadius: "50%",
              background: "conic-gradient(#e5243b 0 21deg, #dda63a 21deg 42deg, #4c9f38 42deg 64deg, #c5192d 64deg 85deg, #ff3a21 85deg 107deg, #26bde2 107deg 128deg, #fcc30b 128deg 150deg, #a21942 150deg 171deg, #fd6925 171deg 193deg, #dd1367 193deg 214deg, #fd9d24 214deg 236deg, #bf8b2e 236deg 257deg, #3f7e44 257deg 279deg, #0a97d9 279deg 300deg, #56c02b 300deg 321deg, #00689d 321deg 343deg, #19486a 343deg 360deg)"
            }} /> 17 UN SDGS
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#111" }}>
            <PinIcon size={18} /> NATIONAL LEVEL
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#111" }}>
            <BulbIcon size={18} /> OPEN INNOVATION
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#111" }}>
            <StarIcon size={18} /> SRCAS 2026
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e5e7eb" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#111" }}>
            <CalendarIcon size={18} /> AUG 14–16 2026
          </div>
        </motion.div>

        {/* Scroll text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ textAlign: "center", marginTop: "10px", fontSize: "0.85rem", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          Scroll to explore <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 1200px) {
          .hs6-logos-mobile-hide { display: none !important; }
        }
        @media (max-width: 900px) {
          .hs6-main-container { flex-direction: column !important; padding: 20px 30px !important; }
          .hs6-bottom-container { padding: 0 30px 40px !important; }
          .hs6-image-container { width: 100% !important; justify-content: center !important; margin-top: 40px; }
          .hs6-floating-card { left: 20px !important; top: -20px !important; }
        }
        @media (max-width: 768px) {
          .hs6-pills-mobile-hide { display: none !important; }
          header { padding: 20px !important; }
        }
      `}</style>
    </div>
  );
}
