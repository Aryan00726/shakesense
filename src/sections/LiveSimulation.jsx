import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { SIMULATION } from '../data/siteConfig';
import './LiveSimulation.css';

/* Generate simulated vibration data */
function generateVibrationData(mode, time) {
  const points = 200;
  const data = [];
  for (let i = 0; i < points; i++) {
    const t = (i / points) * Math.PI * 8 + time;
    let val = 0;
    switch (mode) {
      case 'normal':
        val = Math.sin(t * 2) * 0.3 + Math.sin(t * 5) * 0.1 + (Math.random() - 0.5) * 0.05;
        break;
      case 'imbalance':
        val = Math.sin(t * 2) * 0.6 + Math.sin(t * 1) * 0.3 + (Math.random() - 0.5) * 0.1;
        break;
      case 'looseness':
        val = Math.sin(t * 2) * 0.4 + Math.sin(t * 4) * 0.3 + Math.sin(t * 6) * 0.2 + (Math.random() - 0.5) * 0.15;
        break;
      case 'critical':
        val = Math.sin(t * 2) * 0.8 + Math.sin(t * 3) * 0.5 + Math.sin(t * 7) * 0.3 + (Math.random() - 0.5) * 0.25;
        break;
    }
    data.push(val);
  }
  return data;
}

/* Generate FFT-like frequency data */
function generateFFTData(mode) {
  const bins = 64;
  const data = [];
  for (let i = 0; i < bins; i++) {
    const freq = i / bins;
    let val = 0;
    switch (mode) {
      case 'normal':
        val = Math.exp(-((freq - 0.15) ** 2) / 0.005) * 0.8 + Math.random() * 0.05;
        break;
      case 'imbalance':
        val = Math.exp(-((freq - 0.08) ** 2) / 0.003) * 1.0 + Math.exp(-((freq - 0.15) ** 2) / 0.005) * 0.5 + Math.random() * 0.08;
        break;
      case 'looseness':
        val = Math.exp(-((freq - 0.15) ** 2) / 0.005) * 0.6;
        for (let h = 2; h <= 5; h++) {
          val += Math.exp(-((freq - 0.15 * h) ** 2) / 0.003) * (0.4 / h);
        }
        val += Math.random() * 0.1;
        break;
      case 'critical':
        val = Math.exp(-((freq - 0.08) ** 2) / 0.003) * 1.2 + Math.exp(-((freq - 0.15) ** 2) / 0.005) * 0.8 + Math.exp(-((freq - 0.3) ** 2) / 0.01) * 0.6 + Math.random() * 0.15;
        break;
    }
    data.push(Math.max(0, val));
  }
  return data;
}

const modeConfig = {
  normal: { health: 96, anomaly: 0.07, status: 'healthy', fault: 'None detected' },
  imbalance: { health: 72, anomaly: 0.38, status: 'warning', fault: 'Rotor imbalance' },
  looseness: { health: 58, anomaly: 0.55, status: 'warning', fault: 'Mechanical looseness' },
  critical: { health: 31, anomaly: 0.87, status: 'critical', fault: 'Bearing failure' },
};

/* Graph canvas component */
function GraphCanvas({ data, color, label, type = 'line', height = 120 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.offsetWidth * 2;
    const h = canvas.height = height * 2;
    const dpr = 2;

    ctx.clearRect(0, 0, w, h);

    if (type === 'line') {
      // Draw grid
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      for (let y = 0; y < h; y += h / 6) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw signal
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      const step = w / data.length;
      for (let i = 0; i < data.length; i++) {
        const x = i * step;
        const y = h / 2 - data[i] * (h / 2.5);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Glow
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;
    } else {
      // FFT bars
      const barW = w / data.length - 2;
      for (let i = 0; i < data.length; i++) {
        const x = i * (w / data.length);
        const barH = data[i] * h * 0.7;
        const y = h - barH;

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8 + data[i] * 0.2;
        ctx.fillRect(x + 1, y, barW, barH);

        // Glow top
        ctx.globalAlpha = 0.9;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fillRect(x + 1, y, barW, 3);
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
    }
  }, [data, color, type, height]);

  return (
    <div className="sim__graph">
      <span className="sim__graph-label">{label}</span>
      <canvas ref={canvasRef} style={{ width: '100%', height: `${height}px` }} />
    </div>
  );
}

export default function LiveSimulation() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [mode, setMode] = useState('normal');
  const [vibData, setVibData] = useState([]);
  const [fftData, setFFTData] = useState([]);
  const timeRef = useRef(0);

  const config = modeConfig[mode];

  // Animate vibration data
  useEffect(() => {
    if (!inView) return;
    let animId;
    const animate = () => {
      timeRef.current += 0.05;
      setVibData(generateVibrationData(mode, timeRef.current));
      setFFTData(generateFFTData(mode));
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [mode, inView]);

  const statusColor = config.status === 'healthy' ? '#00e5a0' : config.status === 'warning' ? '#f5a623' : '#ff3b5c';

  return (
    <section className="sim section" ref={ref} aria-label="Live Machine Simulation">
      <div className="container">
        <motion.div
          className="sim__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">INTERACTIVE DEMO</span>
          <h2 className="section-title">{SIMULATION.title}</h2>
          <span className="sim__disclaimer">{SIMULATION.disclaimer}</span>
        </motion.div>

        <motion.div
          className="sim__panel glass-strong"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Mode selector */}
          <div className="sim__controls">
            {SIMULATION.modes.map(m => (
              <button
                key={m.id}
                className={`sim__mode-btn ${mode === m.id ? 'sim__mode-btn--active' : ''}`}
                onClick={() => setMode(m.id)}
                style={{ '--mode-color': m.color }}
                aria-pressed={mode === m.id}
              >
                <span className="sim__mode-dot" style={{ background: m.color }} />
                {m.label}
              </button>
            ))}
          </div>

          <div className="sim__body">
            {/* Left: Graphs */}
            <div className="sim__graphs">
              <GraphCanvas
                data={vibData}
                color={statusColor}
                label="VIBRATION WAVEFORM"
                type="line"
                height={130}
              />
              <GraphCanvas
                data={fftData}
                color={statusColor}
                label="FREQUENCY SPECTRUM (FFT)"
                type="fft"
                height={100}
              />
            </div>

            {/* Right: Status panel */}
            <div className="sim__status">
              {/* Health score */}
              <div className="sim__health">
                <div className="sim__health-ring" style={{ '--ring-color': statusColor }}>
                  <svg viewBox="0 0 120 120">
                    <circle
                      cx="60" cy="60" r="52"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="6"
                      fill="none"
                    />
                    <motion.circle
                      cx="60" cy="60" r="52"
                      stroke={statusColor}
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 52}`}
                      animate={{
                        strokeDashoffset: 2 * Math.PI * 52 * (1 - config.health / 100),
                      }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      transform="rotate(-90 60 60)"
                      style={{ filter: `drop-shadow(0 0 6px ${statusColor})` }}
                    />
                  </svg>
                  <div className="sim__health-value" style={{ color: statusColor }}>
                    {config.health}
                  </div>
                </div>
                <span className="sim__health-label">HEALTH SCORE</span>
              </div>

              {/* Status info */}
              <div className="sim__info">
                <div className="sim__info-row">
                  <span className="sim__info-label">STATUS</span>
                  <span className={`status-badge status-badge--${config.status}`}>
                    <span className={`status-dot status-dot--${config.status}`} />
                    {config.status.toUpperCase()}
                  </span>
                </div>
                <div className="sim__info-row">
                  <span className="sim__info-label">ANOMALY</span>
                  <span className="sim__info-value" style={{ color: statusColor }}>
                    {config.anomaly.toFixed(2)}
                  </span>
                </div>
                <div className="sim__info-row">
                  <span className="sim__info-label">FAULT</span>
                  <span className="sim__info-value">{config.fault}</span>
                </div>
              </div>

              {/* Alert indicator */}
              {config.status === 'critical' && (
                <motion.div
                  className="sim__alert"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                  CRITICAL ALERT — IMMEDIATE INSPECTION REQUIRED
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
