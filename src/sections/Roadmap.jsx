import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ROADMAP } from '../data/siteConfig';
import './Roadmap.css';

export default function RoadmapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="roadmap section" id="roadmap" ref={ref} aria-label="Roadmap">
      <div className="container">
        <motion.div
          className="roadmap__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">ROADMAP</span>
          <h2 className="section-title">{ROADMAP.title}</h2>
        </motion.div>

        <div className="roadmap__timeline">
          <div className="roadmap__line" />

          {ROADMAP.phases.map((phase, i) => {
            const isNow = phase.status === 'NOW';
            const isFuture = phase.status === 'PLANNED' || phase.status === 'VISION';

            return (
              <motion.div
                key={phase.number}
                className={`roadmap__phase ${isNow ? 'roadmap__phase--active' : ''} ${isFuture ? 'roadmap__phase--future' : ''}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="roadmap__phase-marker">
                  <div className="roadmap__phase-dot" />
                </div>

                <div className="roadmap__phase-content card">
                  <div className="roadmap__phase-header">
                    <span className="roadmap__phase-number">{phase.number}</span>
                    <span className="roadmap__phase-status">{phase.status}</span>
                  </div>
                  
                  <h3 className="roadmap__phase-label">{phase.label}</h3>
                  
                  <ul className="roadmap__phase-items">
                    {phase.items.map(item => (
                      <li key={item}>
                        <span className="roadmap__phase-bullet" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
