import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { USE_CASES, DATA_FLYWHEEL } from '../data/siteConfig';
import './Applications.css';

export default function ApplicationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const scrollRef = useRef(null);

  return (
    <section className="apps section" id="applications" ref={ref} aria-label="Applications and Data Flywheel">
      <div className="container">
        
        {/* Horizontal Scrolling Applications */}
        <div className="apps__gallery-wrapper">
          <motion.div
            className="apps__header"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow">APPLICATIONS</span>
            <h2 className="section-title">Designed For Any Rotating Machine.</h2>
          </motion.div>

          <div className="apps__gallery" ref={scrollRef}>
            {USE_CASES.map((app, i) => (
              <motion.div
                key={app.id}
                className="apps__card card"
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              >
                <div className="apps__card-header">
                  <span className="apps__card-number">{app.number}</span>
                  <span className={`status-badge ${app.status === 'PROTOTYPE' ? 'status-badge--neutral' : 'status-badge--warning'}`}>
                    {app.status}
                  </span>
                </div>
                
                <h3 className="apps__card-title">{app.label}</h3>
                <p className="apps__card-desc">{app.description}</p>
                
                <div className="apps__card-meta">
                  <div className="apps__card-meta-item">
                    <span className="apps__card-meta-label">Example Anomaly</span>
                    <span className="apps__card-meta-value">{app.anomaly}</span>
                  </div>
                  <div className="apps__card-meta-item">
                    <span className="apps__card-meta-label">System Alert</span>
                    <span className="apps__card-meta-value text-accent-gradient">{app.alert}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data Flywheel */}
        <motion.div
          className="flywheel glass-strong"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flywheel__content">
            <h3 className="flywheel__title">{DATA_FLYWHEEL.title}</h3>
            <p className="flywheel__desc">{DATA_FLYWHEEL.description}</p>
            <span className="flywheel__disclaimer">{DATA_FLYWHEEL.disclaimer}</span>
          </div>

          <div className="flywheel__visual">
            <div className="flywheel__circle">
              {DATA_FLYWHEEL.steps.map((step, i) => {
                const angle = (i / DATA_FLYWHEEL.steps.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 100;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <div
                    key={step}
                    className="flywheel__step"
                    style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                  >
                    {step}
                  </div>
                );
              })}
              
              {/* Spinning arrows SVG */}
              <svg className="flywheel__arrows" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="1" />
                    <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="80" stroke="url(#arrowGrad)" strokeWidth="2" fill="none" strokeDasharray="100 20" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
