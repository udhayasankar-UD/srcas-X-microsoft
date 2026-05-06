import { useRef } from "react";
import { motion } from "framer-motion";
import { Trophy, Users, Cloud, ArrowRight, Zap } from "lucide-react";
import { ScratchCard } from "../ui/ScratchCard.jsx";
import { GrandPrizeTicket } from "../ui/GrandPrizeTicket.jsx";

const PRIZES = [
  {
    icon: Trophy,
    label: "01",
    title: "Cash Prize Pool",
    desc: "₹5,00,000+ across categories",
  },
  {
    icon: Users,
    label: "02",
    title: "1:1 Mentorship",
    desc: "From Microsoft & Igenius AI engineers",
  },
  {
    icon: Cloud,
    label: "03",
    title: "Azure Cloud Credits",
    desc: "For every shipping team",
  },
];

export const PrizesSection = () => {
  return (
    <section
      id="prizes"
      style={{
        position: "relative",
        padding: "100px 2.5rem 120px",
        backgroundColor: "#fff",
        overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Fine grid lines background */}
      <svg
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.035, pointerEvents: "none" }}
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`v${i}`} x1={`${(i + 1) * 7.14}%`} y1="0" x2={`${(i + 1) * 7.14}%`} y2="100%" stroke="#000" strokeWidth="1" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={`${(i + 1) * 10}%`} x2="100%" y2={`${(i + 1) * 10}%`} stroke="#000" strokeWidth="1" />
        ))}
      </svg>

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 72 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 28, height: 1, background: "#111" }} />
            <p style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "#111",
              textTransform: "uppercase",
              margin: 0,
            }}>
              The Prizes
            </p>
          </div>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "#111",
            margin: 0,
          }}>
            Win more than<br />bragging rights.
          </h2>
          <p style={{
            fontSize: "1.1rem",
            color: "#666",
            maxWidth: 500,
            marginTop: 16,
            lineHeight: 1.6,
          }}>
            Exclusive prizes, life-changing opportunities and perks that set you ahead.
          </p>
        </motion.div>

        {/* ── Grand Prize Ticket ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 24, width: "100%" }}
        >
          <GrandPrizeTicket />
        </motion.div>

        {/* ── Bottom: prize list + Mystery Benefit Ticket ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          alignItems: "stretch",
        }} className="prizes-bottom-grid">

          {/* Prize list (White rounded cards) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {PRIZES.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: 5 }}
                style={{
                  background: "#fff",
                  border: "1px solid #e8e8e8",
                  borderRadius: 20,
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  cursor: "default",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#111";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.09)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#e8e8e8";
                  e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                }}
              >
                {/* Number tag */}
                <span style={{
                  fontFamily: "monospace",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  color: "#111",
                  flexShrink: 0,
                  width: 24,
                }}>
                  {p.label}
                </span>

                {/* Icon */}
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <p.icon size={22} color="#111" strokeWidth={1.8} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#111", marginBottom: 4, letterSpacing: "-0.01em" }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>{p.desc}</div>
                </div>

                <ArrowRight size={16} color="#ccc" style={{ flexShrink: 0 }} />
              </motion.div>
            ))}

            {/* "And more" pill */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "16px 24px",
                borderRadius: 20,
                border: "1px dashed #ddd",
                color: "#888",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              <Zap size={16} color="#aaa" />
              + Goodies, certificates & more surprises
            </motion.div>
          </div>

          {/* Mystery Benefit Ticket (ScratchCard) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <ScratchCard />
          </motion.div>
        </div>
      </div>

      <style>{`
        /* ── ScratchCard ticket holes ── */
        .ticket-small-holes::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            radial-gradient(circle at 0px 50%, #fff 18px, transparent 18.5px),
            radial-gradient(circle at 100% 50%, #fff 18px, transparent 18.5px);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          z-index: 20;
          border-radius: 20px;
        }

        @media (max-width: 900px) {
          .prizes-bottom-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          #prizes { padding: 72px 1.25rem 80px !important; }
        }
      `}</style>
    </section>
  );
};
