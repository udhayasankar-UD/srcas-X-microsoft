import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ─────────────────────────────────────────────
   Icons — B&W inline SVG
───────────────────────────────────────────── */
const IconRegisterOpen = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconDeadline = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8"  y1="2" x2="8"  y2="6"/>
    <line x1="3"  y1="10" x2="21" y2="10"/>
    <path d="M12 14l1.5 1.5L16 13"/>
  </svg>
);
const IconAnnounce = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const IconTrophy = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4a2 2 0 0 1-2-2V5h4"/>
    <path d="M18 9h2a2 2 0 0 0 2-2V5h-4"/>
    <path d="M12 17v4"/><path d="M8 21h8"/>
    <path d="M6 5h12v7a6 6 0 0 1-12 0V5z"/>
  </svg>
);

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const EVENTS = [
  {
    index: 0, num: "01", day: "07", month: "JUN", year: "2026",
    title: "Registration Opens",
    desc: "Portal goes live. Assemble your team and lock in your spot before it fills up.",
    tag: "Opens", tagColor: "#111", tagBg: "#f5f5f5", tagBorder: "#e0e0e0",
    Icon: IconRegisterOpen,
  },
  {
    index: 1, num: "02", day: "21", month: "JUN", year: "2026",
    title: "Last Date to Register",
    desc: "Final call. No late entries accepted — your team must be confirmed and locked.",
    tag: "Deadline", tagColor: "#111", tagBg: "#f5f5f5", tagBorder: "#e0e0e0",
    Icon: IconDeadline,
  },
  {
    index: 2, num: "03", day: "30", month: "JUN", year: "2026",
    title: "Shortlisted Teams Announced",
    desc: "Selected teams notified and briefed on problem statements for the final round.",
    tag: "Announcement", tagColor: "#111", tagBg: "#f5f5f5", tagBorder: "#e0e0e0",
    Icon: IconAnnounce,
  },
  {
    index: 3, num: "04", day: "20", month: "JUL", year: "2026",
    title: "Finals & Awards",
    desc: "24 hours of intense hacking, live judging by industry experts, and the grand award ceremony.",
    tag: "Main Event", tagColor: "#fff",
    tagBg: "rgba(255,255,255,0.12)", tagBorder: "rgba(255,255,255,0.22)",
    Icon: IconTrophy, isFinal: true,
  },
];

/* ─────────────────────────────────────────────
   Scroll-progress thresholds per card
   Section = 280vh → sticky pin = 180vh
   8% buffer for header, then 23% per card
───────────────────────────────────────────── */
const BUFFER    = 0.08;
const SEG       = (1 - BUFFER) / EVENTS.length; // 0.23 each

function cardRange(index) {
  const start = BUFFER + index * SEG;
  const end   = start + SEG * 0.55;   // reveal over ~55% of its segment
  return [start, end];
}

/* ─────────────────────────────────────────────
   Desktop Sticky Card
   Animation tied directly to scrollYProgress —
   Card 1 at 0–23%, Card 2 at 23–46%, etc.
───────────────────────────────────────────── */
function StickyCard({ event, scrollYProgress }) {
  const [hovered, setHovered] = useState(false);
  const isFinal = event.isFinal;
  const { Icon } = event;

  const [start, end] = cardRange(event.index);

  // y: 70px → 0px, stays at 0 after reveal
  const rawY  = useTransform(scrollYProgress, [start, end, 1], [70, 0, 0]);
  // opacity: 0 → 1, stays at 1 after reveal
  const rawOp = useTransform(scrollYProgress, [start, end, 1], [0,  1, 1]);

  // Spring adds a soft, trailing feel to the scroll
  const y       = useSpring(rawY,  { stiffness: 48, damping: 24, restDelta: 0.001 });
  const opacity = useSpring(rawOp, { stiffness: 48, damping: 24, restDelta: 0.001 });

  return (
    <motion.div
      style={{ opacity, y, display: "flex", flexDirection: "column" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        display: "flex", flexDirection: "column",
        background: isFinal ? "#0a0a0a" : "#fff",
        border: isFinal
          ? "1px solid rgba(255,255,255,0.1)"
          : `1px solid ${hovered ? "#111" : "#e8e8e8"}`,
        borderRadius: 22,
        padding: "28px 24px 24px",
        position: "relative", overflow: "hidden", cursor: "default", flex: 1,
        boxShadow: hovered
          ? isFinal
            ? "0 28px 70px rgba(0,0,0,0.45), 0 0 40px rgba(0,120,212,0.12)"
            : "0 16px 50px rgba(0,0,0,0.1)"
          : isFinal
            ? "0 12px 40px rgba(0,0,0,0.25)"
            : "0 2px 12px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "border-color 0.3s, box-shadow 0.35s, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}>
        {/* Watermark number */}
        <span style={{
          position: "absolute", bottom: -16, right: -4,
          fontSize: "7rem", fontWeight: 900, letterSpacing: "-0.08em", lineHeight: 1,
          color: isFinal ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          userSelect: "none", pointerEvents: "none",
        }}>{event.num}</span>

        {isFinal && (
          <>
            <div style={{
              position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
              background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)",
            }}/>
            <div style={{
              position: "absolute", inset: 0, borderRadius: 22, pointerEvents: "none",
              background: hovered
                ? "radial-gradient(400px at 30% 40%, rgba(0,120,212,0.1), transparent 70%)"
                : "transparent",
              transition: "background 0.4s",
            }}/>
          </>
        )}

        {/* Icon */}
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: isFinal ? "rgba(255,255,255,0.08)" : "#f5f5f5",
          border: isFinal ? "1px solid rgba(255,255,255,0.12)" : "1px solid #eaeaea",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 18, color: isFinal ? "#fff" : "#111",
          transition: "transform 0.3s",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}>
          <Icon />
        </div>

        {/* Date */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 14 }}>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "3.2rem", fontWeight: 900, letterSpacing: "-0.06em",
            lineHeight: 0.9, color: isFinal ? "#fff" : "#111",
          }}>{event.day}</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{
              fontFamily: "monospace", fontSize: "0.68rem", fontWeight: 700,
              letterSpacing: "0.14em", color: "#0078D4", textTransform: "uppercase",
            }}>{event.month}</span>
            <span style={{
              fontFamily: "monospace", fontSize: "0.56rem", letterSpacing: "0.08em",
              color: isFinal ? "rgba(255,255,255,0.28)" : "#c0c0c0",
            }}>{event.year}</span>
          </div>
        </div>

        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em",
          lineHeight: 1.25, color: isFinal ? "#fff" : "#111", margin: "0 0 10px",
        }}>{event.title}</h3>

        <div style={{
          height: 1,
          background: isFinal ? "rgba(255,255,255,0.07)" : "#f0f0f0",
          marginBottom: 12,
        }}/>

        <p style={{
          fontSize: "0.8rem", lineHeight: 1.7,
          color: isFinal ? "rgba(255,255,255,0.42)" : "#888",
          margin: 0, flex: 1,
        }}>{event.desc}</p>

        {/* Tag */}
        <div style={{
          marginTop: 18, alignSelf: "flex-start",
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "4px 10px", borderRadius: 999,
          background: event.tagBg, border: `1px solid ${event.tagBorder}`,
        }}>
          <span style={{
            fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.16em",
            color: event.tagColor, textTransform: "uppercase",
          }}>{event.tag}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Beam dot — appears exactly when its card does
───────────────────────────────────────────── */
function BeamDot({ event, scrollYProgress }) {
  const { Icon } = event;
  const [start, end] = cardRange(event.index);
  const dotEnd = start + 0.04;

  const rawScale = useTransform(scrollYProgress, [start, dotEnd], [0, 1]);
  const rawOp    = useTransform(scrollYProgress, [start, dotEnd], [0, 1]);
  const scale    = useSpring(rawScale, { stiffness: 55, damping: 20 });

  return (
    <motion.div
      style={{
        scale, opacity: rawOp,
        width: event.isFinal ? 54 : 46,
        height: event.isFinal ? 54 : 46,
        borderRadius: "50%",
        background: event.isFinal ? "#0078D4" : "#111",
        border: event.isFinal ? "3px solid #0078D4" : "3px solid #111",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff",
        boxShadow: event.isFinal
          ? "0 0 0 6px rgba(0,120,212,0.15), 0 0 24px rgba(0,120,212,0.3)"
          : "0 0 0 5px rgba(0,0,0,0.06)",
        position: "relative", zIndex: 10, flexShrink: 0,
      }}
    >
      <Icon />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Mobile Card — whileInView side-slide
   (works naturally since cards are stacked vertically)
───────────────────────────────────────────── */
function MobileCard({ event }) {
  const isFinal = event.isFinal;
  const { Icon } = event;
  const fromX = event.index % 2 === 0 ? -55 : 55;
  const EASE = [0.22, 1, 0.36, 1];

  return (
    <motion.div
      initial={{ opacity: 0, x: fromX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ duration: 1.0, ease: EASE }}
      style={{
        background: isFinal ? "#0a0a0a" : "#fff",
        border: isFinal ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e8e8e8",
        borderRadius: 20, padding: "22px 20px",
        position: "relative", overflow: "hidden",
        boxShadow: isFinal
          ? "0 12px 40px rgba(0,0,0,0.25)"
          : "0 2px 16px rgba(0,0,0,0.05)",
      }}
    >
      {isFinal && (
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
          background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)",
        }}/>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12, flexShrink: 0,
          background: isFinal ? "rgba(255,255,255,0.08)" : "#f5f5f5",
          border: isFinal ? "1px solid rgba(255,255,255,0.12)" : "1px solid #eaeaea",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: isFinal ? "#fff" : "#111",
        }}><Icon /></div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "2.6rem", fontWeight: 900, letterSpacing: "-0.05em",
            lineHeight: 0.9, color: isFinal ? "#fff" : "#111",
          }}>{event.day}</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{
              fontFamily: "monospace", fontSize: "0.66rem", fontWeight: 700,
              letterSpacing: "0.12em", color: "#0078D4",
            }}>{event.month}</span>
            <span style={{
              fontFamily: "monospace", fontSize: "0.55rem",
              color: isFinal ? "rgba(255,255,255,0.28)" : "#c0c0c0",
            }}>{event.year}</span>
          </div>
        </div>
      </div>
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em",
        color: isFinal ? "#fff" : "#111", margin: "0 0 8px",
      }}>{event.title}</h3>
      <p style={{
        fontSize: "0.82rem", lineHeight: 1.65,
        color: isFinal ? "rgba(255,255,255,0.42)" : "#888", margin: 0,
      }}>{event.desc}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
export default function TimelineSection() {
  const sectionRef = useRef(null);

  /*
    useScroll targets the tall outer section (280vh on desktop).
    offset ["start start", "end end"]:
      progress=0 → section top hits viewport top  (pin begins)
      progress=1 → section bottom hits viewport bottom (pin ends)
  */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Beam fill — slow spring so line trails scroll gently */
  const beamWidth = useSpring(
    useTransform(scrollYProgress, [BUFFER, 0.95], ["0%", "100%"]),
    { stiffness: 28, damping: 30, restDelta: 0.001 }
  );

  /* Mobile vertical beam */
  const beamHeight = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
    { stiffness: 28, damping: 30, restDelta: 0.001 }
  );

  const EASE = [0.22, 1, 0.36, 1];

  return (
    <div id="timeline" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#fff" }}>

      {/* ═══════════════════════════════════════════
          OUTER SECTION — tall on desktop for sticky
      ═══════════════════════════════════════════ */}
      <div ref={sectionRef} className="tl-section">

        {/* Sticky inner — pins for the full scroll of tl-section */}
        <div className="tl-sticky">

          {/* Background grid */}
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

          {/* Faint "2026" watermark */}
          <div aria-hidden style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            fontSize: "clamp(10rem,24vw,22rem)", fontWeight: 900,
            letterSpacing: "-0.08em", color: "rgba(0,0,0,0.022)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            userSelect: "none", pointerEvents: "none",
            whiteSpace: "nowrap", lineHeight: 1,
          }}>2026</div>

          <div style={{
            maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem",
            position: "relative", zIndex: 1, width: "100%",
          }}>

            {/* ══════════════════════════════════
                DESKTOP  (> 768px)
                Sticky scroll-driven card reveal
            ══════════════════════════════════ */}
            <div className="tl-desktop">

              {/* Header */}
              <div style={{
                marginBottom: 40,
                display: "flex", alignItems: "flex-end",
                justifyContent: "space-between", gap: 24, flexWrap: "wrap",
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 28, height: 1, background: "#111" }}/>
                    <p style={{
                      fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em",
                      color: "#111", textTransform: "uppercase", margin: 0,
                    }}>Event Timeline</p>
                  </div>
                  <h2 style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(2.4rem,5vw,4.5rem)", fontWeight: 900,
                    lineHeight: 1.0, letterSpacing: "-0.045em", color: "#111", margin: 0,
                  }}>
                    Mark your{" "}
                    <span style={{ WebkitTextStroke: "2.5px #111", color: "transparent" }}>
                      calendar.
                    </span>
                  </h2>
                </div>
                {/* Stages pill */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "9px 18px", border: "1px solid #e8e8e8",
                  borderRadius: 999, background: "#fafafa",
                }}>
                  {[0,1,2,3].map(i => (
                    <div key={i} style={{
                      width: i === 3 ? 24 : 7, height: 7, borderRadius: 999,
                      background: i === 3 ? "#0078D4" : "#ddd",
                    }}/>
                  ))}
                  <span style={{
                    fontFamily: "monospace", fontSize: "0.62rem", fontWeight: 700,
                    letterSpacing: "0.1em", color: "#888", marginLeft: 6,
                  }}>4 STAGES</span>
                </div>
              </div>

              {/* ── Connecting beam + icon dots ── */}
              <div style={{ position: "relative", marginBottom: 24 }}>
                {/* Grey track — full width, z:0 */}
                <div style={{
                  position: "absolute",
                  top: "50%", left: 0,
                  width: "100%", height: 3,
                  transform: "translateY(-50%)",
                  background: "#e8e8e8",
                  borderRadius: 999,
                  zIndex: 0,
                }}/>
                {/* Scroll-driven blue fill — same geometry, z:1 */}
                <motion.div style={{
                  position: "absolute",
                  top: "50%", left: 0,
                  height: 3,
                  transform: "translateY(-50%)",
                  background: "linear-gradient(90deg, #0078D4 0%, #111 100%)",
                  borderRadius: 999,
                  zIndex: 1,
                  width: beamWidth,
                }}/>
                {/* Icon dots — z:10, in normal flow so line centres on them */}
                <div style={{
                  position: "relative", zIndex: 10,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  {EVENTS.map(ev => (
                    <BeamDot key={ev.num} event={ev} scrollYProgress={scrollYProgress} />
                  ))}
                </div>
              </div>

              {/* ── Cards — each scroll-driven individually ── */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 14,
                alignItems: "stretch",
              }}>
                {EVENTS.map(ev => (
                  <StickyCard key={ev.num} event={ev} scrollYProgress={scrollYProgress} />
                ))}
              </div>
            </div>

            {/* ══════════════════════════════════
                MOBILE  (≤ 768px)
                Normal flow, side-slide whileInView
            ══════════════════════════════════ */}
            <div className="tl-mobile">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.9, ease: EASE }}
                style={{ marginBottom: 40 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 28, height: 1, background: "#111" }}/>
                  <p style={{
                    fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em",
                    color: "#111", textTransform: "uppercase", margin: 0,
                  }}>Event Timeline</p>
                </div>
                <h2 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(2.2rem,8vw,3.2rem)", fontWeight: 900,
                  lineHeight: 1.0, letterSpacing: "-0.04em", color: "#111", margin: 0,
                }}>
                  Mark your{" "}
                  <span style={{ WebkitTextStroke: "2px #111", color: "transparent" }}>
                    calendar.
                  </span>
                </h2>
              </motion.div>

              {/* Vertical line + cards */}
              <div style={{ position: "relative", paddingLeft: 52 }}>
                {/* Grey vertical track */}
                <div style={{
                  position: "absolute", top: 0, bottom: 0, left: 22,
                  width: 2, background: "#e8e8e8", borderRadius: 999,
                  zIndex: 0, overflow: "hidden",
                }}>
                  <motion.div style={{
                    width: "100%",
                    background: "linear-gradient(180deg, #0078D4 0%, #111 100%)",
                    borderRadius: 999, height: beamHeight,
                  }}/>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  {EVENTS.map(ev => (
                    <div key={ev.num} style={{ position: "relative" }}>
                      {/* Icon node */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-60px 0px" }}
                        transition={{ duration: 0.7, ease: EASE }}
                        style={{
                          position: "absolute", left: -52, top: 18,
                          width: ev.isFinal ? 44 : 38, height: ev.isFinal ? 44 : 38,
                          borderRadius: "50%",
                          background: ev.isFinal ? "#0078D4" : "#111",
                          border: ev.isFinal ? "3px solid #0078D4" : "3px solid #111",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff",
                          boxShadow: ev.isFinal
                            ? "0 0 0 5px rgba(0,120,212,0.15), 0 0 20px rgba(0,120,212,0.25)"
                            : "0 0 0 4px rgba(0,0,0,0.07)",
                          zIndex: 2,
                          transform: "translateX(-50%) translateX(1px)",
                        }}
                      >
                        <ev.Icon />
                      </motion.div>
                      <MobileCard event={ev} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────
          CTA Banner — outside sticky section,
          appears in normal flow after scroll ends
      ───────────────────────────────────────── */}
      <div style={{ background: "#fff", padding: "64px 2.5rem 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{
              background: "#0a0a0a", borderRadius: 24,
              padding: "40px 48px",
              display: "flex", alignItems: "center",
              justifyContent: "space-between", gap: 24, flexWrap: "wrap",
              position: "relative", overflow: "hidden",
            }}
          >
            <div aria-hidden style={{
              position: "absolute", top: 0, left: "8%", right: "8%", height: 1,
              background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)",
            }}/>
            <div aria-hidden style={{
              position: "absolute", left: -80, top: -80,
              width: 320, height: 320, borderRadius: "50%",
              background: "radial-gradient(circle,rgba(0,120,212,0.1) 0%,transparent 70%)",
              pointerEvents: "none",
            }}/>

            <div style={{ position: "relative" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "4px 12px", borderRadius: 999,
                background: "rgba(0,120,212,0.15)",
                border: "1px solid rgba(0,120,212,0.3)", marginBottom: 12,
              }}>
                <div style={{
                  width: 5, height: 5, borderRadius: "50%", background: "#0078D4",
                  animation: "tl-pulse 1.5s ease-in-out infinite",
                }}/>
                <span style={{
                  fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em",
                  color: "#0078D4", textTransform: "uppercase",
                }}>Registrations Open</span>
              </div>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(1.05rem,2vw,1.35rem)",
                fontWeight: 800, color: "#fff", margin: 0,
                letterSpacing: "-0.02em", lineHeight: 1.3,
              }}>
                Don't wait — spots fill fast.<br/>
                <span style={{ color: "rgba(255,255,255,0.42)", fontWeight: 500, fontSize: "0.88em" }}>
                  Registration closes June 21, 2026.
                </span>
              </p>
            </div>

            <a
              href="#register"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "15px 30px", background: "#fff", color: "#111",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800, fontSize: "0.88rem", letterSpacing: "-0.01em",
                borderRadius: 13, textDecoration: "none", flexShrink: 0,
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 10px 28px rgba(255,255,255,0.16)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Register Now
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes tl-pulse {
          0%,100% { opacity:1; transform:scale(1);   }
          50%      { opacity:0.5; transform:scale(1.5); }
        }

        /* ── Desktop: tall section + sticky inner ── */
        .tl-section {
          position: relative;
          height: 280vh;        /* scroll space for 4 sequential cards */
        }
        .tl-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #fff;
        }
        .tl-desktop { display: block; }
        .tl-mobile  { display: none;  }

        /* ── Mobile: normal flow, vertical layout ── */
        @media (max-width: 768px) {
          .tl-section {
            height: auto !important;  /* natural height on mobile */
          }
          .tl-sticky {
            position: relative !important;
            height: auto !important;
            overflow: visible !important;
            padding: 64px 1.25rem 80px;
            justify-content: flex-start;
          }
          .tl-desktop { display: none;  }
          .tl-mobile  { display: block; }
          #timeline > div:first-child > div > div { padding: 0 !important; }
        }
      `}</style>
    </div>
  );
}
