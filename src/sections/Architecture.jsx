import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ARCHITECTURE } from '../data/siteConfig';
import './Architecture.css';

const nodeIcons = {
  machine: '⚙',
  mpu6050: '📡',
  esp32: '🔲',
  signal: '〰',
  fft: '📊',
  tinyml: '🧠',
  fingerprint: '🔏',
  health: '💚',
  alert: '🔔',
};

export default function ArchitectureDiagram() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <section className="architecture section" ref={ref} aria-label="System Architecture">
      <div className="container">
        <motion.div
          className="architecture__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">ARCHITECTURE</span>
          <h2 className="section-title">System Data Flow</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Hover over each component to understand how data flows through the system.
          </p>
        </motion.div>

        <div className="architecture__diagram">
          {/* Connecting lines */}
          <svg className="architecture__lines" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d="M0 50 L1000 50"
              stroke={hoveredNode ? 'rgba(0, 212, 255, 0.3)' : 'rgba(0, 212, 255, 0.1)'}
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Data flow particles */}
            {inView && (
              <circle r="3" fill="var(--color-accent)" opacity="0.6">
                <animateMotion dur="4s" repeatCount="indefinite" path="M0 50 L1000 50" />
              </circle>
            )}
          </svg>

          <div className="architecture__nodes">
            {ARCHITECTURE.nodes.map((node, i) => {
              const isHovered = hoveredNode === node.id;
              const isAdjacentToHovered = hoveredNode && (
                ARCHITECTURE.nodes.findIndex(n => n.id === hoveredNode) === i - 1 ||
                ARCHITECTURE.nodes.findIndex(n => n.id === hoveredNode) === i + 1
              );

              return (
                <motion.div
                  key={node.id}
                  className={`architecture__node ${isHovered ? 'architecture__node--active' : ''} ${isAdjacentToHovered ? 'architecture__node--adjacent' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  tabIndex={0}
                  onFocus={() => setHoveredNode(node.id)}
                  onBlur={() => setHoveredNode(null)}
                  role="button"
                  aria-label={`${node.label}: ${node.description}`}
                >
                  <div className="architecture__node-icon">
                    <span role="img" aria-hidden="true">{nodeIcons[node.id] || '◆'}</span>
                  </div>
                  <span className="architecture__node-label">{node.label}</span>

                  {/* Connection dot */}
                  <div className="architecture__node-dot" />

                  {/* Tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="architecture__tooltip"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="architecture__tooltip-title">{node.label}</span>
                        <p className="architecture__tooltip-desc">{node.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
