import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SOLUTION } from '../data/siteConfig';
import './Solution.css';

const stepIcons = {
  sensor: (
    <svg viewBox="0 0 48 48" fill="none">
      <rect x="14" y="14" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M24 6v4M24 38v4M6 24h4M38 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10.3 10.3l2.8 2.8M34.9 34.9l2.8 2.8M10.3 37.7l2.8-2.8M34.9 13.1l2.8-2.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
  processor: (
    <svg viewBox="0 0 48 48" fill="none">
      <rect x="12" y="12" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="18" y="18" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1"/>
      <path d="M18 8v4M24 8v4M30 8v4M18 36v4M24 36v4M30 36v4M8 18h4M8 24h4M8 30h4M36 18h4M36 24h4M36 30h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 48 48" fill="none">
      <path d="M24 8c-6 0-12 4-12 12s4 12 8 16h8c4-4 8-8 8-16s-6-12-12-12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 20c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5-2 3-4 5-4 3-4 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <circle cx="28" cy="28" r="1.5" fill="currentColor" opacity="0.4"/>
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 48 48" fill="none">
      <path d="M24 8L6 38h36L24 8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M24 18v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="24" cy="32" r="1.5" fill="currentColor"/>
    </svg>
  ),
};

export default function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="solution section" id="how-it-works" ref={ref} aria-label="The Solution">
      <div className="container">
        <motion.div
          className="solution__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">THE SOLUTION</span>
          <h2 className="section-title">{SOLUTION.title}</h2>
        </motion.div>

        <div className="solution__pipeline">
          {/* Connecting line */}
          <motion.div
            className="solution__line"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {SOLUTION.steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="solution__step"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="solution__step-number">{step.number}</div>
              <div className="solution__step-icon">
                {stepIcons[step.icon]}
                {/* Glow dot */}
                <div className="solution__step-glow" />
              </div>
              <h3 className="solution__step-label">{step.label}</h3>
              <p className="solution__step-desc">{step.description}</p>
              {step.states && (
                <div className="solution__states">
                  {step.states.map(s => (
                    <span
                      key={s}
                      className={`status-badge status-badge--${s.toLowerCase()}`}
                    >
                      <span className={`status-dot status-dot--${s.toLowerCase()}`} />
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Data flow animation indicator */}
        <motion.div
          className="solution__flow-indicator"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="solution__flow-particle" />
          <span>DATA FLOWS FROM SENSOR TO INTELLIGENCE</span>
          <div className="solution__flow-particle" />
        </motion.div>
      </div>
    </section>
  );
}
