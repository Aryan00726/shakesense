import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TECHNOLOGY, COMPARISON } from '../data/siteConfig';
import './Technology.css';

const techIcons = {
  chip: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="16" y="16" width="32" height="32" rx="4"/>
      <rect x="24" y="24" width="16" height="16" rx="2" opacity="0.5"/>
      <path d="M24 8v8M32 8v8M40 8v8M24 48v8M32 48v8M40 48v8M8 24h8M8 32h8M8 40h8M48 24h8M48 32h8M48 40h8" strokeLinecap="round"/>
    </svg>
  ),
  offline: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="32" cy="36" r="20"/>
      <path d="M32 20v16l10 6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 12l-4-4M44 12l4-4" strokeLinecap="round" opacity="0.5"/>
      <line x1="8" y1="8" x2="56" y2="56" strokeWidth="2.5" opacity="0.3"/>
    </svg>
  ),
  cost: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 16v32M24 24c0-4 3.5-5 8-5s8 1 8 5-3.5 5-8 5-8 1-8 5 3.5 5 8 5 8-1 8-5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

export default function TechnologySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="tech section" id="technology" ref={ref} aria-label="Technology">
      <div className="container">
        <motion.div
          className="tech__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">TECHNOLOGY</span>
          <h2 className="section-title">{TECHNOLOGY.title}</h2>
        </motion.div>

        {/* Tech cards */}
        <div className="tech__cards">
          {TECHNOLOGY.cards.map((card, i) => (
            <motion.div
              key={card.id}
              className="tech__card card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
            >
              <div className="tech__card-icon">
                {techIcons[card.icon]}
              </div>
              <h3 className="tech__card-label">{card.label}</h3>
              <p className="tech__card-desc">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Comparison */}
        <motion.div
          className="tech__comparison"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="section-title tech__comparison-title">{COMPARISON.title}</h3>

          <div className="tech__comparison-grid">
            <div className="tech__comparison-col tech__comparison-col--traditional">
              <h4 className="tech__comparison-heading">TRADITIONAL MONITORING</h4>
              {COMPARISON.traditional.map(item => (
                <div key={item} className="tech__comparison-item">
                  <svg viewBox="0 0 16 16" width="14" height="14">
                    <line x1="4" y1="4" x2="12" y2="12" stroke="#ff3b5c" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="12" y1="4" x2="4" y2="12" stroke="#ff3b5c" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="tech__comparison-divider">
              <span>VS</span>
            </div>

            <div className="tech__comparison-col tech__comparison-col--shakesense">
              <h4 className="tech__comparison-heading">
                <span className="text-accent-gradient">SHAKESENSE</span>
              </h4>
              {COMPARISON.shakesense.map(item => (
                <div key={item} className="tech__comparison-item">
                  <svg viewBox="0 0 16 16" width="14" height="14">
                    <polyline points="3,8 6,11 13,4" stroke="#00e5a0" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
