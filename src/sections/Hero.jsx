import { Suspense, lazy, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Html, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { HERO } from '../data/siteConfig';
import MachineScene from '../three/MachineScene';
import './Hero.css';

/* Floating labels around the 3D scene */
function SceneAnnotations() {
  const annotations = [
    { text: 'VIBRATION', pos: [-1.4, 0.6, 0.5] },
    { text: 'FFT', pos: [1.5, 0.3, -0.3] },
    { text: 'EDGE INFERENCE', pos: [-1.2, -0.4, 0.8] },
    { text: 'HEALTH SCORE', pos: [1.3, -0.6, 0.5] },
    { text: 'MACHINE FINGERPRINT', pos: [0, 1.5, 0.6] },
  ];

  return (
    <>
      {annotations.map((ann, i) => (
        <Html key={i} position={ann.pos} center distanceFactor={6}>
          <div className="hero-annotation" style={{ animationDelay: `${i * 0.8}s` }}>
            <span className="hero-annotation__dot" />
            <span className="hero-annotation__text">{ann.text}</span>
          </div>
        </Html>
      ))}
    </>
  );
}

/* 3D Scene with lighting */
function Scene3D() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#e0f0ff" />
      <directionalLight position={[-3, 3, -2]} intensity={0.2} color="#00d4ff" />
      <pointLight position={[0.8, 0.1, 0.5]} intensity={0.5} color="#00d4ff" distance={3} decay={2} />
      <spotLight
        position={[0, 4, 3]}
        angle={0.3}
        penumbra={0.8}
        intensity={0.3}
        color="#ffffff"
        castShadow={false}
      />

      {/* Machine */}
      <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
        <MachineScene status="healthy" />
      </Float>

      {/* Annotations */}
      <SceneAnnotations />

      {/* Ground reflection */}
      <ContactShadows
        position={[0, -1.1, 0]}
        opacity={0.2}
        scale={6}
        blur={2}
        far={3}
        color="#00d4ff"
      />

      {/* Environment */}
      <Environment preset="night" />
    </>
  );
}

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15 + 0.3,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Hero">
      <div className="hero__bg">
        <div className="grid-overlay" />
        <div className="hero__gradient" />
      </div>

      <div className="hero__content">
        {/* Left: Text */}
        <div className="hero__text">
          <motion.span
            className="eyebrow hero__eyebrow"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            {HERO.eyebrow}
          </motion.span>

          <motion.h1
            className="hero__headline"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            {HERO.headline[0]}
            <br />
            <span className="text-accent-gradient">{HERO.headline[1]}</span>
          </motion.h1>

          <motion.p
            className="hero__description"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            {HERO.description}
          </motion.p>

          <motion.div
            className="hero__cta"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            {HERO.cta.map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                className={`btn ${btn.variant === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(btn.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {btn.label}
                <span className="arrow">→</span>
              </a>
            ))}
          </motion.div>

          {/* Technical stats bar */}
          <motion.div
            className="hero__stats"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <div className="hero__stat">
              <span className="hero__stat-value">ESP32</span>
              <span className="hero__stat-label">Processor</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">MPU6050</span>
              <span className="hero__stat-label">Sensor</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">TinyML</span>
              <span className="hero__stat-label">Inference</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">Offline</span>
              <span className="hero__stat-label">First</span>
            </div>
          </motion.div>
        </div>

        {/* Right: 3D Scene */}
        <div className="hero__canvas-wrapper">
          <motion.div
            className="hero__canvas"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Canvas
              camera={{ position: [-3.5, 1.5, 5.5], fov: 32 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent' }}
            >
              <Suspense fallback={null}>
                <Scene3D />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text">SCROLL TO EXPLORE</span>
      </motion.div>
    </section>
  );
}
