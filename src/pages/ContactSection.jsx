import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, User, ExternalLink, Copy, Check } from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0, 0, 0.2, 1] },
    },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

/* Inline copy-phone button */
function CopyPhone({ number, display }) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(number).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href={`tel:${number}`} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                color: '#444', textDecoration: 'none', fontWeight: 500,
                transition: 'color 0.2s',
            }}
                onMouseEnter={e => e.currentTarget.style.color = '#111'}
                onMouseLeave={e => e.currentTarget.style.color = '#444'}
            >
                <Phone size={16} />
                {display}
            </a>
            <button
                onClick={copy}
                title="Copy number"
                style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '4px', borderRadius: 6,
                    color: copied ? '#0078D4' : '#bbb',
                    transition: 'color 0.2s, background 0.2s',
                    display: 'flex', alignItems: 'center',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f0f0f0'; e.currentTarget.style.color = '#555'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = copied ? '#0078D4' : '#bbb'; }}
            >
                <AnimatePresence mode="wait">
                    {copied
                        ? <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={14} /></motion.span>
                        : <motion.span key="copy"  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={14} /></motion.span>
                    }
                </AnimatePresence>
            </button>
        </div>
    );
}

const ContactSection = () => {
    return (
        <section id="contact" style={{
            position: "relative",
            padding: "100px 0 100px",
            backgroundColor: "#fff",
            overflow: "hidden",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
            {/* Fine grid (matches TimelineSection & FaqSection) */}
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
                    <span style={{
                        fontSize: "0.75rem",
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        color: "#666",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "16px"
                    }}>
                        GET IN TOUCH
                    </span>
                    <h2 style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "clamp(2.6rem,6vw,5rem)", fontWeight: 900,
                        lineHeight: 1.0, letterSpacing: "-0.045em", color: "#111", margin: 0,
                    }}>
                        How can we{" "}
                        <span style={{ WebkitTextStroke: "2.5px #111", color: "transparent" }}>
                            Help you?
                        </span>
                    </h2>
                    <p style={{
                        fontSize: "clamp(1rem, 2vw, 1.25rem)", 
                        fontFamily: "sans-serif", 
                        color: "#777", 
                        fontWeight: 400, 
                        marginTop: "16px", 
                        maxWidth: "600px",
                        margin: "16px auto 0"
                    }}>
                        Hacker Experience is what we prioritize! Have questions, need assistance, or just want to connect? Feel free to reach out!
                    </p>
                </motion.div>

                {/* Main Content Card */}
                <div style={{
                    backgroundColor: "#fff",
                    borderRadius: "24px",
                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)",
                    border: "1px solid #eaeaea",
                    padding: "clamp(24px, 5vw, 48px)",
                    maxWidth: "900px",
                    margin: "0 auto"
                }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px" }}
                    >
                        {/* Coordinators */}
                        <motion.div variants={fadeInUp}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                                <div style={{ padding: "10px", borderRadius: "12px", backgroundColor: "#f4f4f5" }}>
                                    <User size={24} color="#111" />
                                </div>
                                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111", margin: 0 }}>SRCAS Coordinators</h3>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
                                <div style={{ padding: "24px", borderRadius: "16px", backgroundColor: "#fafafa", border: "1px solid #eee", transition: "all 0.3s ease" }}>
                                    <p style={{ fontWeight: 700, color: "#111", fontSize: "1.1rem", margin: "0 0 8px 0" }}>name<br/><span style={{ fontSize: "0.9rem", color: "#666", fontWeight: 500 }}>(role)</span></p>
                                    <CopyPhone number="+919176070393" display="+91 00000 00000" />
                                </div>
                                <div style={{ padding: "24px", borderRadius: "16px", backgroundColor: "#fafafa", border: "1px solid #eee", transition: "all 0.3s ease" }}>
                                    <p style={{ fontWeight: 700, color: "#111", fontSize: "1.1rem", margin: "0 0 8px 0" }}>name<br /><span style={{ fontSize: "0.9rem", color: "#666", fontWeight: 500 }}>(role)</span></p>
                                    <CopyPhone number="+919629924052" display="+91 00000 00000" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Map Section */}
                        <motion.div variants={fadeInUp}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                                <div style={{ padding: "10px", borderRadius: "12px", backgroundColor: "#f4f4f5" }}>
                                    <MapPin size={24} color="#111" />
                                </div>
                                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111", margin: 0 }}>Location</h3>
                            </div>

                            <div style={{ padding: "24px", borderRadius: "16px", backgroundColor: "#fafafa", border: "1px solid #eee", marginBottom: "24px" }}>
                                <p style={{ color: "#444", lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                                    SRI RAMAKRISHNA COLLEGE OF ARTS & SCIENCE <br />
                                    Nava India, Avinashi Road <br />
                                    Coimbatore, Tamil Nadu 641006
                                </p>
                            </div>

                            <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #eaeaea", backgroundColor: "#eee" }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2649563948785!2d76.9868191!3d11.0226208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85849d74c3695%3A0x9153ec3168293ec5!2sSri%20Ramakrishna%20College%20of%20Arts%20%26%20Science!5e0!3m2!1sen!2sin!4v1709283746000!5m2!1sen!2sin"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0, display: "block" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>

                            <div style={{ marginTop: "16px", textAlign: "right" }}>
                                <MagneticButton
                                    href="https://maps.app.goo.gl/W7uqokm1bK1miC1b9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="outline"
                                    size="sm"
                                >
                                    <ExternalLink size={14} />
                                    Open in Google Maps
                                </MagneticButton>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
