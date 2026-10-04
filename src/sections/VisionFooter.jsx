import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { VISION, FOOTER, BRAND } from '../data/siteConfig';
import './VisionFooter.css';

export default function VisionFooterSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <>
      <section className="vision section" id="vision" ref={ref} aria-label="Vision">
        {/* Background glow */}
        <div className="vision__bg">
          <div className="vision__glow" />
        </div>

        <div className="container">
          <motion.div
            className="vision__content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="vision__title">
              <span className="vision__title-line">{VISION.title[0]}</span>
              <br />
              <span className="vision__title-line text-accent-gradient">{VISION.title[1]}</span>
            </h2>
            
            <p className="vision__subtitle">{VISION.subtitle}</p>

            {/* Cinematic fleet visualization (HTML/CSS representation) */}
            <div className="vision__fleet" aria-hidden="true">
              {Array.from({ length: 40 }).map((_, i) => {
                // Random position within a wide ellipse
                const angle = Math.random() * Math.PI * 2;
                const radiusX = Math.random() * 400 + 50;
                const radiusY = Math.random() * 100 + 20;
                const x = Math.cos(angle) * radiusX;
                const y = Math.sin(angle) * radiusY;
                
                // Random delay for lighting up
                const delay = Math.random() * 2 + 0.5;
                
                return (
                  <motion.div
                    key={i}
                    className="vision__node"
                    initial={{ opacity: 0, x: x, y: y }}
                    animate={inView ? { 
                      opacity: [0, 1, 0.8],
                      x: [x, x + Math.random() * 80 - 40],
                      y: [y, y + Math.random() * 80 - 40]
                    } : {}}
                    transition={{ 
                      opacity: { delay, duration: 1.5 },
                      x: { delay, duration: 1.5 + Math.random() * 1.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                      y: { delay, duration: 1.5 + Math.random() * 1.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
                    }}
                  />
                );
              })}
              
              {/* Connecting lines */}
              <svg className="vision__network" viewBox="-500 -150 1000 300">
                <motion.path
                  d="M0 0 L150 -40 L250 20 L350 -10 M0 0 L-120 50 L-200 -20 L-300 30"
                  stroke="var(--color-accent)"
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
                  transition={{ delay: 2, duration: 2 }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="footer" aria-label="Site footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer__brand">
              <svg className="footer__logo" viewBox="0 0 32 32" width="24" height="24">
                <path d="M4 16 Q8 8, 12 16 Q16 24, 20 16 Q24 8, 28 16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              </svg>
              <span className="footer__brand-text">{BRAND.name}</span>
              <p className="footer__tagline">{BRAND.tagline}</p>
            </div>

            <div className="footer__links">
              {FOOTER.links.map(link => (
                <a key={link.label} href={link.href} className="footer__link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__bottom">
            <span className="footer__copy">&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
            <span className="footer__event">{BRAND.event}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
