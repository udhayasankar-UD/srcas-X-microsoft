import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { InternshipTicket } from "../ui/InternshipTicket";

/* ─── Wave mesh ─── */
const WaveMesh = () => {
  const lines = useMemo(() => {
    const result = [];
    for (let l = 0; l < 36; l++) {
      const baseY = (l / 36) * 400;
      const points = [];
      for (let s = 0; s <= 60; s++) {
        const x = (s / 60) * 500;
        const t = s / 60;
        const y = baseY
          + Math.sin(t * Math.PI * 3 + l * 0.3) * (20 + l * 0.8)
          + Math.sin(t * Math.PI * 5 + l * 0.15) * (8 + l * 0.3)
          + Math.cos(t * Math.PI * 2.5 + l * 0.5) * (12 + l * 0.5)
          - Math.exp(-Math.pow((t - 0.5) * 2.5, 2)) * 30;
        points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }
      result.push(
        <polyline key={l} points={points.join(" ")} fill="none"
          stroke="#fff" strokeWidth={0.7} opacity={0.12 + (l / 36) * 0.35} />
      );
    }
    return result;
  }, []);
  return (
    <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice"
      style={{ width:"100%", height:"100%", display:"block" }} aria-hidden>
      <defs>
        <radialGradient id="wf2" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="wm2"><rect width="500" height="400" fill="url(#wf2)" /></mask>
      </defs>
      <g mask="url(#wm2)">{lines}</g>
    </svg>
  );
};

/* ─── Main Section ─── */
export const PrizesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="prizes" style={{
      position:"relative",
      padding:"100px 2.5rem 120px",
      backgroundColor:"#fff",
      overflow:"hidden",
      fontFamily:"'Plus Jakarta Sans', sans-serif",
    }}>
      {/* Grid background */}
      <svg aria-hidden style={{
        position:"absolute", inset:0, width:"100%", height:"100%",
        opacity:0.035, pointerEvents:"none",
      }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`v${i}`} x1={`${(i+1)*7.14}%`} y1="0" x2={`${(i+1)*7.14}%`} y2="100%" stroke="#000" strokeWidth="1"/>
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={`${(i+1)*10}%`} x2="100%" y2={`${(i+1)*10}%`} stroke="#000" strokeWidth="1"/>
        ))}
      </svg>

      <div style={{ maxWidth:1100, margin:"0 auto", position:"relative", zIndex:1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }}
          transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
          style={{ marginBottom:64 }}
        >
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
            <div style={{ width:28, height:1, background:"#111" }} />
            <p style={{
              fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.22em",
              color:"#111", textTransform:"uppercase", margin:0,
            }}>The Prizes</p>
          </div>
          <h2 style={{
            fontSize:"clamp(2.8rem,6vw,5rem)", fontWeight:800,
            lineHeight:1.05, letterSpacing:"-0.04em", color:"#111", margin:0,
          }}>
            Win more than<br />bragging rights.
          </h2>
          <p style={{ fontSize:"1.05rem", color:"#666", maxWidth:480, marginTop:14, lineHeight:1.6 }}>
            Exclusive prizes, life-changing opportunities and perks that set you ahead.
          </p>
        </motion.div>

        {/* 3D Ticket */}
        <motion.div
          initial={{ opacity:0, y:40 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-80px" }}
          transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
          style={{ marginBottom:40 }}
        >
          <InternshipTicket />
        </motion.div>

        {/* View more button */}
        <motion.div
          initial={{ opacity:0, y:16 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.5, delay:0.2 }}
          style={{ display:"flex", justifyContent:"center" }}
        >
          <button
            onClick={() => { navigate("/prizes"); window.scrollTo({ top: 0, behavior: 'instant' }); }}
            style={{
              display:"inline-flex", alignItems:"center", gap:10,
              padding:"14px 32px",
              background:"#111", color:"#fff",
              fontSize:"0.85rem", fontWeight:700,
              letterSpacing:"0.06em", textTransform:"uppercase",
              border:"2px solid #111", borderRadius:100,
              cursor:"pointer",
              transition:"background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s",
              boxShadow:"0 4px 20px rgba(0,0,0,0.12)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#111";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.18)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#111";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.12)";
            }}
          >
            <span>💸</span>
            Show Me The Money
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          #prizes { padding: 72px 1.25rem 80px !important; }
        }
      `}</style>
    </section>
  );
};
