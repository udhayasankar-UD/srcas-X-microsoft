import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

const faqs = [
  {
    question: "Who can participate in the SRCAS Hackathon?",
    answer: "Any college student with a valid ID card can participate. You must form a team of 2-4 members from the same college to compete. No prior hackathon experience is required!"
  },
  {
    question: "Is there any registration fee?",
    answer: "No, participation is completely free! We also provide complimentary meals, snacks, and refreshments throughout the entire 24-hour event."
  },
  {
    question: "What is the format of the hackathon?",
    answer: "It is an intensive 24-hour in-person (offline) hackathon held at the SRCAS Coimbatore campus. Teams are expected to build, test, and pitch innovative solutions from scratch."
  },
  {
    question: "Do we need to bring our own equipment?",
    answer: "Yes, participants must bring their own laptops, chargers, extension cords, and any specific hardware required for their project. We will provide high-speed Wi-Fi and working spaces."
  },
  {
    question: "Can we work on our project before the event?",
    answer: "No, all core coding and development must be done during the 24-hour hackathon period to ensure fairness. However, you are highly encouraged to come prepared with ideas, research, and design wireframes."
  }
];

const FaqItem = ({ faq, isOpen, onClick }) => {
  return (
    <div style={{ 
      marginBottom: "16px", 
      width: "100%",
      backgroundColor: "#fff",
      border: isOpen ? "1px solid #ddd" : "1px solid #eaeaea",
      borderRadius: "16px",
      boxShadow: isOpen ? "0 10px 40px -10px rgba(0,0,0,0.08)" : "0 4px 10px rgba(0,0,0,0.02)",
      overflow: "hidden",
      transition: "all 0.3s ease"
    }}>
      <button
        onClick={onClick}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          outline: "none"
        }}
      >
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          color: "#111",
          fontSize: "1.15rem",
          letterSpacing: "-0.01em",
          paddingRight: "16px"
        }}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ flexShrink: 0, color: "#888" }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              padding: "0 24px 24px 24px",
              color: "#555",
              lineHeight: 1.6,
              fontSize: "0.95rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" style={{
      position: "relative",
      padding: "100px 0 100px",
      backgroundColor: "#fdfdfd",
      overflow: "hidden",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      {/* Fine grid */}
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

      <div style={{ 
        maxWidth: 800, 
        margin: "0 auto", 
        padding: "0 2.5rem", 
        position: "relative", 
        zIndex: 1 
      }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
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
            QUESTIONS?
          </span>
          <h2 style={{
            fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
            fontWeight: 900,
            color: "#111",
            letterSpacing: "-0.04em",
            margin: 0,
            lineHeight: 1.1
          }}>
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            textAlign: 'center',
          }}
        >
          <p style={{
            fontSize: '0.95rem',
            color: '#888',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            margin: 0,
          }}>
            Still have questions? We're happy to help.
          </p>
          <MagneticButton href="#contact" variant="dark" size="md">
            Contact Us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
