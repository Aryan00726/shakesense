import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROBLEM } from '../data/siteConfig';
import './Problem.css';

const stageColors = ['#00e5a0', '#a8d840', '#f5a623', '#ff6b35', '#ff3b5c'];
const stageLabels = PROBLEM.sequence;

const painIcons = {
  downtime: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      <line x1="4" y1="4" x2="20" y2="20" strokeWidth="2"/>
    </svg>
  ),
  repair: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  production: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M2 20h20"/><path d="M5 20V8l5 4V8l5 4V4l5 4v12"/>
    </svg>
  ),
  replacement: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2v6m0 8v6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"/>
    </svg>
  ),
  monitoring: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      <path d="M6 10l3-3 3 3 3-3 3 3" opacity="0.5"/>
    </svg>
  ),
  connectivity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M1 1l22 22"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
      <path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/>
    </svg>
  ),
};

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="problem section" id="system" ref={ref} aria-label="The Problem">
      <div className="problem__bg">
        <div className="grid-overlay" />
      </div>

      <div className="container">
        {/* Section header */}
        <motion.div
          className="problem__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">THE PROBLEM</span>
          <h2 className="section-title problem__title">
            {PROBLEM.title}
          </h2>
        </motion.div>

        {/* Degradation sequence */}
        <motion.div
          className="problem__sequence"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {stageLabels.map((stage, i) => (
            <div key={stage} className="problem__stage">
              <div
                className="problem__stage-indicator"
                style={{
                  '--stage-color': stageColors[i],
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                {/* Vibration line visualization */}
                <svg className="problem__vibration" viewBox="0 0 80 30" preserveAspectRatio="none">
                  <motion.path
                    d={getVibrationPath(i)}
                    stroke={stageColors[i]}
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                  />
                </svg>
              </div>
              <span className="problem__stage-label" style={{ color: stageColors[i] }}>
                {stage}
              </span>
              {i < stageLabels.length - 1 && (
                <div className="problem__stage-arrow">
                  <svg viewBox="0 0 16 16" width="12" height="12">
                    <path d="M8 2 L8 14 M4 10 L8 14 L12 10" stroke={stageColors[i]} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Pain point cards */}
        <div className="problem__pains">
          {PROBLEM.painPoints.map((point, i) => (
            <motion.div
              key={point.label}
              className="problem__pain card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="problem__pain-icon">
                {painIcons[point.icon]}
              </div>
              <span className="problem__pain-label">{point.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getVibrationPath(intensity) {
  const amp = 2 + intensity * 3;
  const freq = 4 + intensity * 2;
  let d = 'M0 15';
  for (let x = 1; x <= 80; x++) {
    const y = 15 + Math.sin(x / freq) * amp * (1 + Math.random() * intensity * 0.3);
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return d;
}
