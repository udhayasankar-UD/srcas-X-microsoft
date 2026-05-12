import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import ticketBg from "../../assets/tickets/PC_BG_ticket.png";

/* ─────────────────────────────────────────────
   GRAND PRIZE TICKET — Dark premium ticket
   with true scalloped-edge cutouts via SVG
   clip-path, rounded corners, dashed tear-line,
   70/30 split, wave mesh graphic & barcode.
───────────────────────────────────────────── */

const SANS = "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif";

/* ─── Build the SVG path for the ticket outline ─── */
function buildTicketPath(w, h) {
  const cr = 16;        // corner radius
  const sR = 7;         // small notch radius
  const bR = 14;        // big notch radius (center)
  const eR = 11;        // edge notch radius (top/bottom at divider)
  const divX = w * 0.7; // dashed divider x position

  // 9 side notches: indices 0-8, center at index 4
  const sideNotches = [];
  for (let i = 0; i < 9; i++) {
    const y = ((i + 1) / 10) * h;
    const r = i === 4 ? bR : sR;
    sideNotches.push({ y, r });
  }

  let d = "";

  // ── Top edge (left to right) ──
  d += `M ${cr} 0`;
  d += ` L ${divX - eR} 0`;
  // Top notch semicircle (curves down into ticket)
  d += ` A ${eR} ${eR} 0 0 0 ${divX + eR} 0`;
  d += ` L ${w - cr} 0`;

  // ── Top-right corner ──
  d += ` A ${cr} ${cr} 0 0 1 ${w} ${cr}`;

  // ── Right edge (top to bottom) with 9 notches ──
  for (const n of sideNotches) {
    d += ` L ${w} ${n.y - n.r}`;
    // Semicircle curving left (into ticket), counterclockwise
    d += ` A ${n.r} ${n.r} 0 0 0 ${w} ${n.y + n.r}`;
  }
  d += ` L ${w} ${h - cr}`;

  // ── Bottom-right corner ──
  d += ` A ${cr} ${cr} 0 0 1 ${w - cr} ${h}`;

  // ── Bottom edge (right to left) ──
  d += ` L ${divX + eR} ${h}`;
  // Bottom notch semicircle (curves up into ticket)
  d += ` A ${eR} ${eR} 0 0 0 ${divX - eR} ${h}`;
  d += ` L ${cr} ${h}`;

  // ── Bottom-left corner ──
  d += ` A ${cr} ${cr} 0 0 1 0 ${h - cr}`;

  // ── Left edge (bottom to top) with 9 notches ──
  const revNotches = [...sideNotches].reverse();
  for (const n of revNotches) {
    d += ` L 0 ${n.y + n.r}`;
    // Semicircle curving right (into ticket), counterclockwise
    d += ` A ${n.r} ${n.r} 0 0 0 0 ${n.y - n.r}`;
  }
  d += ` L 0 ${cr}`;

  // ── Top-left corner ──
  d += ` A ${cr} ${cr} 0 0 1 ${cr} 0`;

  d += " Z";
  return d;
}

export const GrandPrizeTicket = () => {
  const ticketRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [dims, setDims] = useState({ w: 1200, h: 420 });

  const handleMove = useCallback((e) => {
    if (!ticketRef.current) return;
    const rect = ticketRef.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  // Track actual element size for accurate clip path
  useEffect(() => {
    if (!ticketRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDims({ w: width, h: height });
        }
      }
    });
    observer.observe(ticketRef.current);
    return () => observer.disconnect();
  }, []);

  const clipPath = useMemo(
    () => `path('${buildTicketPath(dims.w, dims.h)}')`,
    [dims]
  );

  const dividerPct = 70;
  const eR = 11;

  return (
    <div style={{ width: "100%" }}>
      <motion.div
        ref={ticketRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMouse({ x: 0.5, y: 0.5 });
        }}
        className="grand-ticket"
        style={{
          position: "relative",
          display: "flex",
          backgroundImage: `url("${ticketBg}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#0e0e0e",
          willChange: "transform",
          cursor: "default",
          fontFamily: SANS,
          overflow: "visible",
          clipPath,
          WebkitClipPath: clipPath,
          boxShadow:
            "0 2px 0 rgba(0,0,0,0.12), 0 20px 60px -15px rgba(0,0,0,0.55)",
        }}
      >
        {/* ── Subtle noise texture ── */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            mixBlendMode: "screen",
            pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 320 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            zIndex: 1,
          }}
        />

        {/* ── Cursor spotlight ── */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.5s ease",
            background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(255,255,255,0.04), transparent 50%)`,
            zIndex: 2,
          }}
        />

        {/* ── DASHED VERTICAL DIVIDER at 70% ── */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: `${dividerPct}%`,
            top: eR + 2,
            bottom: eR + 2,
            width: 0,
            borderLeft: "1.5px dashed rgba(255,255,255,0.2)",
            zIndex: 5,
            pointerEvents: "none",
          }}
        />

        {/* ═══════ LEFT 70% — MAIN CONTENT ═══════ */}
        <div
          className="ticket-main"
          style={{
            width: `${dividerPct}%`,
            flexShrink: 0,
            padding: "clamp(24px, 3vw, 40px) clamp(24px, 3vw, 40px)",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 3,
            minHeight: 280,
          }}
        >
          {/* Vertical "GRAND PRIZE" text on far left */}
          <div
            style={{
              position: "absolute",
              left: "clamp(14px, 2vw, 28px)",
              top: "50%",
              transform: "translateY(-50%) rotate(180deg)",
              writingMode: "vertical-rl",
              fontFamily: SANS,
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: "0.7rem", lineHeight: 1 }}>✦</span>
            GRAND PRIZE
            <span style={{ fontSize: "0.7rem", lineHeight: 1 }}>✦</span>
          </div>

          {/* Briefcase icon */}
          <div
            style={{
              marginLeft: "clamp(32px, 4vw, 56px)",
              width: 64,
              height: 64,
              background: "rgba(255,255,255,0.07)",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 28,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>

          {/* Subtitle */}
          <div
            style={{
              marginLeft: "clamp(32px, 4vw, 56px)",
              fontFamily: SANS,
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            MICROSOFT × GENIUS AI
          </div>

          {/* Main heading */}
          <h3
            style={{
              fontFamily: SANS,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              margin: "0 0 20px",
              marginLeft: "clamp(32px, 4vw, 56px)",
              letterSpacing: "-0.02em",
            }}
          >
            Win a Ticket
            <br />
            to <span style={{ color: "#54f0ff" }}>Singapore!</span> 
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: SANS,
              fontSize: "0.82rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 380,
              margin: "0 0 28px",
              marginLeft: "clamp(32px, 4vw, 56px)",
              fontWeight: 400,
            }}
          >
            Top three teams will qualify for the Science and Innovation Competition held in Singapore, with all expenses fully covered. Outstanding performers will also receive opportunities for Microsoft internships.
          </p>

          {/* CTA + label row */}
          <div
            style={{
              marginLeft: "clamp(32px, 4vw, 56px)",
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: "auto",
            }}
          >
            <a
              href="#register"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                background: "#fff",
                color: "#0e0e0e",
                fontFamily: SANS,
                fontSize: "0.82rem",
                fontWeight: 600,
                borderRadius: 8,
                textDecoration: "none",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Register to Compete
              <span style={{ fontSize: "1rem" }}>→</span>
            </a>
            <span
              style={{
                fontFamily: SANS,
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.35)",
                fontWeight: 400,
                borderLeft: "1px solid rgba(255,255,255,0.12)",
                paddingLeft: 20,
              }}
            >
              Top 1 team only
            </span>
          </div>

          {/* ── Wave mesh graphic ── */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: "55%",
              height: "75%",
              pointerEvents: "none",
              zIndex: 0,
              opacity: 0.5,
              overflow: "hidden",
            }}
          >
            <WaveMesh />
          </div>
        </div>

        {/* ═══════ RIGHT 30% — STUB (badge + barcode) ═══════ */}
        <div
          className="ticket-stub"
          style={{
            width: `${100 - dividerPct}%`,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(20px, 3vw, 32px) clamp(16px, 2vw, 28px)",
            position: "relative",
            zIndex: 3,
            gap: 24,
          }}
        >
          {/* ── Top Row: QR + Ticket Number ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
             {/* QR Code */}
             <div style={{ width: 72, height: 72, background: "#fff", padding: 4, borderRadius: 6 }}>
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=MSFT-AI-2026-TICKET" 
                  alt="Ticket QR Code" 
                  style={{ width: "100%", height: "100%", display: "block" }} 
                />
             </div>

             {/* Right side: green bar + number */}
             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                 <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                     <div style={{ width: 42, height: 10, background: "#8cc63f" }} />
                     <div style={{ color: "#fff", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em" }}>{"UD :)"}</div>
                 </div>
                 <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.75rem", color: "#ccc", letterSpacing: "0.05em" }}>
                     000000114351
                 </div>
             </div>
          </div>

          {/* ── Bottom Row: Barcode + Rotated Text ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%", flex: 1 }}>
             {/* Barcode wrapper */}
             <div style={{ width: "35%", maxWidth: 90 }}>
                <Barcode />
             </div>
             
             {/* Rotated text */}
             <div
               style={{
                 writingMode: "vertical-rl",
                 transform: "rotate(180deg)",
                 display: "flex",
                 flexDirection: "column",
                 gap: 8,
                 fontFamily: SANS,
                 alignItems: "flex-start",
               }}
             >
                <span style={{ fontSize: "0.75rem", color: "#ccc", letterSpacing: "0.05em" }}>
                   21-06-26
                </span>
                <span style={{ fontSize: "0.9rem", color: "#fff", fontWeight: 500, letterSpacing: "0.02em" }}>
                   Internship ticket
                </span>
                <span style={{ fontSize: "0.9rem", color: "#fff", fontWeight: 500, letterSpacing: "0.02em" }}>
                   14.00 to 16.00 Hs
                </span>
             </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .grand-ticket {
            flex-direction: column !important;
            clip-path: none !important;
            -webkit-clip-path: none !important;
            border-radius: 16px !important;
          }
          .grand-ticket .ticket-main {
            width: 100% !important;
            min-height: 280px !important;
          }
          .grand-ticket .ticket-stub {
            width: 100% !important;
            flex-direction: row !important;
            padding: 20px !important;
            border-top: 1.5px dashed rgba(255,255,255,0.15);
          }
        }
      `}</style>
    </div>
  );
};

/* ─── Realistic Code-128 Barcode ─── */
const Barcode = () => {
  const pattern = useMemo(
    () => [
      2, 1, 1, 2, 1, 4, 1, 2, 1, 1, 3, 2, 2, 2, 1, 1, 3, 1, 1, 3, 1, 2, 1, 2,
      3, 1, 1, 2, 2, 1, 1, 2, 2, 3, 1, 1, 2, 1, 3, 1, 1, 2, 1, 1, 1, 3, 2, 2,
      2, 3, 1, 1, 1, 2, 1, 2, 1, 2, 3, 1, 3, 1, 2, 1, 1, 2, 1, 2, 3, 1, 2, 1,
      2, 3, 3, 1, 1, 1, 2,
    ],
    []
  );

  const moduleH = 1.2;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "100%",
      }}
    >
      {pattern.map((h, i) => (
        <div
          key={`bar-${i}`}
          style={{
            height: h * moduleH,
            background: i % 2 === 0 ? "rgba(255,255,255,0.85)" : "transparent",
            width: "100%",
          }}
        />
      ))}
    </div>
  );
};

/* ─── Flowing wave mesh graphic (procedural SVG) ─── */
const WaveMesh = () => {
  const lines = useMemo(() => {
    const result = [];
    const numLines = 36;
    const width = 500;
    const height = 400;

    for (let l = 0; l < numLines; l++) {
      const baseY = (l / numLines) * height;
      const points = [];
      const segments = 60;

      for (let s = 0; s <= segments; s++) {
        const x = (s / segments) * width;
        const t = s / segments;

        const wave1 = Math.sin(t * Math.PI * 3 + l * 0.3) * (20 + l * 0.8);
        const wave2 = Math.sin(t * Math.PI * 5 + l * 0.15) * (8 + l * 0.3);
        const wave3 = Math.cos(t * Math.PI * 2.5 + l * 0.5) * (12 + l * 0.5);
        const centerPull = Math.exp(-Math.pow((t - 0.5) * 2.5, 2)) * 30;

        const y = baseY + wave1 + wave2 + wave3 - centerPull;
        points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }

      const opacity = 0.12 + (l / numLines) * 0.35;
      result.push(
        <polyline
          key={`wave-${l}`}
          points={points.join(" ")}
          fill="none"
          stroke="#fff"
          strokeWidth={0.7}
          opacity={opacity}
        />
      );
    }
    return result;
  }, []);

  return (
    <svg
      viewBox="0 0 500 400"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden
    >
      <defs>
        <radialGradient id="waveFade" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="waveMask">
          <rect width="500" height="400" fill="url(#waveFade)" />
        </mask>
      </defs>
      <g mask="url(#waveMask)">{lines}</g>
    </svg>
  );
};

export default GrandPrizeTicket;