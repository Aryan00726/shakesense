import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BUSINESS, PILOT, VALIDATION } from '../data/siteConfig';
import './Validation.css';

export default function ValidationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="validation section" id="business" ref={ref} aria-label="Business and Validation">
      <div className="container">
        
        {/* Business Model */}
        <div className="business__grid">
          <motion.div
            className="business__content"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow">DEPLOYMENT MODEL</span>
            <h2 className="section-title business__title">{BUSINESS.title}</h2>
            
            <div className="business__flow">
              <div className="business__flow-box">
                <span className="business__flow-label">CUSTOMER</span>
                <ul>
                  {BUSINESS.customers.map(c => <li key={c}>{c}</li>)}
                </ul>
              </div>
              
              <div className="business__flow-arrow">↓</div>
              
              <div className="business__flow-box">
                <span className="business__flow-label">DISTRIBUTION</span>
                <ul>
                  {BUSINESS.distribution.map(d => <li key={d}>{d}</li>)}
                </ul>
              </div>
              
              <div className="business__flow-arrow">↓</div>
              
              <div className="business__flow-box business__flow-box--accent">
                <span className="business__flow-label">PRODUCT</span>
                <ul>
                  {BUSINESS.product.map(p => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </div>
            
            <div className="business__pricing glass">
              <span className="business__pricing-value">{BUSINESS.pricing.range}</span>
              <span className="business__pricing-desc">{BUSINESS.pricing.disclaimer}</span>
            </div>
          </motion.div>
          
          {/* Pilot Strategy Map */}
          <motion.div
            className="pilot__map card"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="eyebrow">PILOT STRATEGY</span>
            
            <div className="pilot__sequence">
              <div className="pilot__step pilot__step--active">
                <div className="pilot__dot" />
                <div className="pilot__info">
                  <span className="pilot__name">{PILOT.startingPoint}</span>
                  <span className="pilot__status">{PILOT.label}</span>
                </div>
              </div>
              
              {PILOT.expansion.map(exp => (
                <div key={exp.region} className="pilot__step">
                  <div className="pilot__dot pilot__dot--future" />
                  <div className="pilot__info">
                    <span className="pilot__name">{exp.region}</span>
                    <span className="pilot__status">{exp.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Validation Metrics */}
        <motion.div
          className="metrics"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="metrics__header">
            <span className="eyebrow">VALIDATION</span>
            <h3 className="section-title">{VALIDATION.title}</h3>
          </div>
          
          <div className="metrics__grid">
            {VALIDATION.metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="metrics__card card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              >
                <span className="metrics__value">{metric.value}</span>
                <span className="metrics__label">{metric.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
