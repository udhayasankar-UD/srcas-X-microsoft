import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "How do I register?",
    answer: "Register through our official portal at srcas.ac.in/hackathon. Fill in your team details, upload your college ID, and you're in. Registrations close 7 days before the event."
  },
  {
    question: "How many team members do I need?",
    answer: "Teams must have 2 to 4 members. Solo participation is not allowed. All members must be currently enrolled college students with a valid ID."
  },
  {
    question: "Can team members be from different colleges?",
    answer: "Yes! Cross-college teams are welcome and encouraged. Diversity of thought leads to better solutions — mix it up."
  },
  {
    question: "Who is eligible to participate in the hackathon?",
    answer: "Any undergraduate or postgraduate student from any college in India is eligible. No prior hackathon experience is required — just bring your ideas and energy."
  },
  {
    question: "Is there a registration fee?",
    answer: "No. Participation is completely free. We also provide meals, snacks, and refreshments throughout the 24-hour event."
  },
  {
    question: "Can we work on our project before the event?",
    answer: "You can come with ideas, research, and wireframes — but all core coding must happen during the 24-hour window. We run plagiarism and prior-work checks."
  },
  {
    question: "What should we bring?",
    answer: "Bring your laptop, chargers, extension cords, and any hardware your project needs. We provide high-speed Wi-Fi, power strips, and working spaces."
  },
];

const FaqItem = ({ faq, isOpen, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-20px' }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    style={{
      borderBottom: '1px solid #e5e7eb',
      overflow: 'hidden',
    }}
  >
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '22px 0',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        outline: 'none',
        gap: 16,
      }}
    >
      <span style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        color: '#111',
        fontSize: '1.05rem',
        letterSpacing: '-0.01em',
        lineHeight: 1.4,
      }}>
        {faq.question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        style={{
          flexShrink: 0,
          width: 30, height: 30,
          borderRadius: '50%',
          border: '1.5px solid #d1d5db',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#111',
          background: isOpen ? '#111' : 'transparent',
          transition: 'background 0.2s, border-color 0.2s',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke={isOpen ? '#fff' : '#111'} strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 5v14M5 12h14"/>
        </svg>
      </motion.div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <p style={{
            padding: '0 48px 22px 0',
            color: '#6b7280',
            lineHeight: 1.7,
            fontSize: '0.92rem',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            margin: 0,
          }}>
            {faq.answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" style={{
      position: 'relative',
      backgroundColor: '#ffffff',
      overflow: 'hidden',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      {/* Subtle dot grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '100px 48px',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* ── TOP ROW: heading left, icon right ── */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 32,
          marginBottom: 16,
        }}>
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
              fontWeight: 900,
              color: '#111',
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              margin: 0,
              maxWidth: 600,
            }}
          >
            Everything you need, all in one place!
          </motion.h2>

          {/* Question mark icon — right side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              flexShrink: 0,
              width: 96, height: 96,
              background: '#25D366',
              borderRadius: '50% 50% 50% 12%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.8rem', fontWeight: 900, color: '#fff',
              boxShadow: '0 12px 40px rgba(37,211,102,0.28)',
              userSelect: 'none',
            }}
          >
            ?
          </motion.div>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: '1rem',
            color: '#6b7280',
            lineHeight: 1.7,
            margin: '0 0 64px',
            maxWidth: 560,
          }}
        >
          Empowering your hacker journey with the right tools, guidance, and community. Reach out anytime to learn, collaborate, and grow together.
        </motion.p>

        {/* ── TWO COLUMNS: FAQs label left, list right ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: '48px',
          alignItems: 'start',
        }} className="faq-inner-grid">

          {/* Left: FAQs label + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ position: 'sticky', top: '120px' }}
          >
            <p style={{
              fontSize: '3rem',
              fontWeight: 900,
              color: '#111',
              letterSpacing: '-0.04em',
              margin: '0 0 12px',
              lineHeight: 1,
            }}>FAQs</p>
            <p style={{
              fontSize: '0.83rem',
              color: '#9ca3af',
              lineHeight: 1.6,
              margin: '0 0 24px',
            }}>
              Can't find what you're after? Chat with our stellar team.
            </p>
            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '10px 20px',
                background: '#111',
                color: '#fff',
                fontSize: '0.78rem',
                fontWeight: 700,
                borderRadius: 100,
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#333';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#111';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Chat to our team →
            </a>
          </motion.div>

          {/* Right: FAQ accordion */}
          <div style={{ borderTop: '1px solid #e5e7eb' }}>
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .faq-inner-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .faq-inner-grid > div:first-child {
            position: static !important;
          }
        }
        @media (max-width: 640px) {
          #faq > div { padding: 72px 20px !important; }
        }
      `}</style>
    </section>
  );
}
