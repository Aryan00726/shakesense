import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('init'); // init → ready → exit
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setPhase('ready'), 1200);
    const t2 = setTimeout(() => setPhase('exit'), 2200);
    const t3 = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setSkipped(true);
    onComplete();
  };

  if (skipped) return null;

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="splash__content">
            {/* Vibration waveform */}
            <svg className="splash__wave" viewBox="0 0 400 80" aria-hidden="true">
              <motion.path
                d="M0 40 Q20 20, 40 40 Q60 60, 80 40 Q100 20, 120 40 Q140 60, 160 40 Q180 20, 200 40 Q220 60, 240 40 Q260 20, 280 40 Q300 60, 320 40 Q340 20, 360 40 Q380 60, 400 40"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.6, 0.8] }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </svg>

            {/* Status label */}
            <motion.div
              className="splash__status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="splash__status-dot" />
              {phase === 'init'
                ? 'INITIALIZING MACHINE INTELLIGENCE...'
                : 'SYSTEM READY'}
            </motion.div>

            {/* Logo */}
            <motion.div
              className="splash__logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={phase === 'ready' ? { opacity: 1, scale: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg viewBox="0 0 32 32" width="36" height="36" aria-hidden="true">
                <path d="M4 16 Q8 8, 12 16 Q16 24, 20 16 Q24 8, 28 16" stroke="var(--color-accent)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              </svg>
              <span>SHAKESENSE</span>
            </motion.div>
          </div>

          {/* Skip */}
          <button className="splash__skip" onClick={handleSkip} aria-label="Skip intro">
            Skip <span className="arrow">→</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
