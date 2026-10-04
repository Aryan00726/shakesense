import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FINGERPRINT } from '../data/siteConfig';
import './Fingerprint.css';

function AnimatedNumber({ value, duration = 1.5, inView }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.round(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [value, inView, duration]);

  return <span>{display}</span>;
}

function FingerprintVisualization({ healthScore, inView }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!inView || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = 280;
    const h = canvas.height = 280;
    let animId;
    let time = 0;

    const draw = () => {
      time += 0.02;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const rings = 8;

      for (let r = 0; r < rings; r++) {
        const radius = 20 + r * 15;
        const segments = 32 + r * 8;
        const wobble = (100 - healthScore) / 100 * 3;

        ctx.beginPath();
        for (let s = 0; s <= segments; s++) {
          const angle = (s / segments) * Math.PI * 2;
          const noise = Math.sin(angle * (3 + r) + time * (1 + r * 0.2)) * wobble;
          const x = cx + Math.cos(angle) * (radius + noise);
          const y = cy + Math.sin(angle) * (radius + noise);

          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        const hue = healthScore > 70 ? 170 : healthScore > 40 ? 36 : 350;
        const alpha = 0.15 + (r / rings) * 0.3;
        ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = healthScore > 70 ? '#00e5a0' : healthScore > 40 ? '#f5a623' : '#ff3b5c';
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [healthScore, inView]);

  return <canvas ref={canvasRef} className="fingerprint__canvas" />;
}

export default function MachineFingerprint() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [degradationStep, setDegradationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentHealth = FINGERPRINT.degradationSequence[degradationStep];
  const statusFromHealth = (h) => h > 70 ? 'healthy' : h > 40 ? 'warning' : 'critical';
  const currentStatus = statusFromHealth(currentHealth);

  const startDegradation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDegradationStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= FINGERPRINT.degradationSequence.length) {
        clearInterval(interval);
        setTimeout(() => {
          setDegradationStep(0);
          setIsAnimating(false);
        }, 2000);
        return;
      }
      setDegradationStep(step);
    }, 1500);
  };

  return (
    <section className="fingerprint section" ref={ref} aria-label="Machine Fingerprint">
      <div className="container">
        <motion.div
          className="fingerprint__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">MACHINE LEARNING</span>
          <h2 className="section-title">{FINGERPRINT.title}</h2>
        </motion.div>

        <div className="fingerprint__content">
          {/* Left: Fingerprint visualization */}
          <motion.div
            className="fingerprint__visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <FingerprintVisualization healthScore={currentHealth} inView={inView} />

            {/* Process steps */}
            <div className="fingerprint__process">
              {['INSTALL SENSOR', 'LEARN NORMAL', 'CREATE FINGERPRINT', 'MONITOR DEVIATION'].map((step, i) => (
                <div key={step} className="fingerprint__process-step">
                  <div className={`fingerprint__process-dot ${i <= degradationStep ? 'fingerprint__process-dot--active' : ''}`} />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Machine profile card */}
          <motion.div
            className="fingerprint__profile card"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="fingerprint__profile-header">
              <div className="fingerprint__machine-id">
                <span className="eyebrow">{FINGERPRINT.demoMachine.id}</span>
                <span className="fingerprint__baseline">{FINGERPRINT.demoMachine.baselineLabel}</span>
              </div>
              <span className={`status-badge status-badge--${currentStatus}`}>
                <span className={`status-dot status-dot--${currentStatus}`} />
                {currentStatus.toUpperCase()}
              </span>
            </div>

            {/* Health score */}
            <div className="fingerprint__score">
              <div className="fingerprint__score-label">HEALTH</div>
              <div className="fingerprint__score-value" style={{
                color: currentStatus === 'healthy' ? 'var(--color-healthy)' : currentStatus === 'warning' ? 'var(--color-warning)' : 'var(--color-critical)'
              }}>
                <AnimatedNumber value={currentHealth} inView={inView} duration={0.5} />
                <span className="fingerprint__score-unit">/ 100</span>
              </div>

              {/* Progress bar */}
              <div className="fingerprint__progress">
                <motion.div
                  className="fingerprint__progress-bar"
                  animate={{
                    width: `${currentHealth}%`,
                    backgroundColor: currentStatus === 'healthy' ? '#00e5a0' : currentStatus === 'warning' ? '#f5a623' : '#ff3b5c',
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            {/* Metrics */}
            <div className="fingerprint__metrics">
              <div className="fingerprint__metric">
                <span className="fingerprint__metric-label">ANOMALY</span>
                <span className="fingerprint__metric-value">
                  {(FINGERPRINT.demoMachine.anomalyScore + (3 - degradationStep) * -0.01 + degradationStep * 0.2).toFixed(2)}
                </span>
              </div>
              <div className="fingerprint__metric">
                <span className="fingerprint__metric-label">CONFIDENCE</span>
                <span className="fingerprint__metric-value">0.92</span>
              </div>
            </div>

            {/* Warning message */}
            <AnimatePresence>
              {degradationStep >= 2 && (
                <motion.div
                  className="fingerprint__warning"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                    <path d="M10 2L1 18h18L10 2zm0 4l6.5 11h-13L10 6zm-1 4v4h2V10H9zm0 5v2h2v-2H9z"/>
                  </svg>
                  {FINGERPRINT.warningMessage}
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <button className="btn btn-secondary fingerprint__cta" onClick={startDegradation} disabled={isAnimating}>
              {isAnimating ? 'Simulating...' : 'Simulate Degradation'}
              <span className="arrow">→</span>
            </button>

            <p className="fingerprint__disclaimer">{FINGERPRINT.disclaimer}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
