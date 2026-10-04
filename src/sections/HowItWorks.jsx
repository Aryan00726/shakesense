import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import { MotorBody, SensorUnit, VibrationWaves, DataParticles } from '../three/MachineScene';
import './HowItWorks.css';

/* ── Step 1: ESP32 ── */
function ESP32Model() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.4;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1 + 0.3;
  });
  return (
    <group ref={ref} scale={1.5} rotation={[0, -0.5, 0]}>
      {/* PCB */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.05, 1.5]} />
        <meshStandardMaterial color="#111" roughness={0.8} />
      </mesh>
      {/* ESP32 Shield/Chip */}
      <mesh position={[0, 0.06, -0.3]}>
        <boxGeometry args={[0.5, 0.1, 0.6]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Antenna Trace */}
      <mesh position={[0, 0.06, -0.65]}>
        <boxGeometry args={[0.4, 0.02, 0.1]} />
        <meshStandardMaterial color="#d4af37" metalness={1} />
      </mesh>
      {/* Headers Left */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={`pinL_${i}`} position={[-0.4, 0.05, -0.6 + i * 0.086]}>
          <boxGeometry args={[0.06, 0.15, 0.04]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} />
        </mesh>
      ))}
      {/* Headers Right */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={`pinR_${i}`} position={[0.4, 0.05, -0.6 + i * 0.086]}>
          <boxGeometry args={[0.06, 0.15, 0.04]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Step 2: Sensors ── */
function SensorsModel() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.4;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1 + 0.3;
  });
  return (
    <group ref={ref} scale={1.8} rotation={[0, 0.5, 0]}>
      {/* MPU6050 */}
      <group position={[-0.4, 0.2, 0]} rotation={[0.2, 0, -0.2]}>
        <mesh>
          <boxGeometry args={[0.5, 0.05, 0.7]} />
          <meshStandardMaterial color="#1f4287" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.2, 0.04, 0.2]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        {/* Chips and components */}
        <mesh position={[0, 0.03, 0.2]}>
          <boxGeometry args={[0.1, 0.02, 0.1]} />
          <meshStandardMaterial color="#777" />
        </mesh>
        <mesh position={[0.15, 0.03, -0.2]}>
          <boxGeometry args={[0.05, 0.02, 0.05]} />
          <meshStandardMaterial color="#d4af37" />
        </mesh>
        <Html position={[0, -0.2, 0]} center className="howitworks__label">
          <span>MPU6050 (Vibration)</span>
        </Html>
      </group>
      
      {/* Temperature Sensor */}
      <group position={[0.4, -0.2, 0]} rotation={[-0.1, 0, 0.1]}>
        <mesh>
          <boxGeometry args={[0.4, 0.05, 0.6]} />
          <meshStandardMaterial color="#4a154b" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.04, -0.1]}>
          <boxGeometry args={[0.15, 0.04, 0.15]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0, 0.08, 0.15]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
          <meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.2} />
        </mesh>
        <Html position={[0, -0.25, 0]} center className="howitworks__label">
          <span>Temperature Sensor</span>
        </Html>
      </group>
    </group>
  );
}

/* ── Step 3: Assembled ShakeSense ── */
function AssembledModel() {
  const groupRef = useRef();
  
  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={groupRef} scale={1.6} rotation={[0.4, 0.5, 0]}>
      {/* Top Lid */}
      <Float speed={2} rotationIntensity={0} floatIntensity={1} floatingRange={[0.6, 0.9]}>
        <group>
          <mesh>
            <boxGeometry args={[1.2, 0.15, 1.2]} />
            <meshStandardMaterial color="#1a2340" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <planeGeometry args={[0.6, 0.2]} />
            <meshBasicMaterial color="#00d4ff" />
          </mesh>
          {/* Screws */}
          {[[-0.5, 0.08, -0.5], [0.5, 0.08, -0.5], [-0.5, 0.08, 0.5], [0.5, 0.08, 0.5]].map((pos, i) => (
             <mesh key={i} position={pos}>
               <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
               <meshStandardMaterial color="#888" metalness={0.8} />
             </mesh>
          ))}
        </group>
      </Float>

      {/* PCB Layer */}
      <Float speed={2} rotationIntensity={0} floatIntensity={1} floatingRange={[0.2, 0.35]}>
        <mesh>
          <boxGeometry args={[1.0, 0.05, 1.0]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0, 0.05, -0.2]}>
          <boxGeometry args={[0.4, 0.08, 0.4]} />
          <meshStandardMaterial color="#333" metalness={0.5} />
        </mesh>
        <mesh position={[0.2, 0.05, 0.2]}>
          <boxGeometry args={[0.2, 0.04, 0.2]} />
          <meshStandardMaterial color="#1f4287" />
        </mesh>
      </Float>

      {/* Battery Layer */}
      <Float speed={2} rotationIntensity={0} floatIntensity={1} floatingRange={[-0.2, -0.1]}>
        <mesh rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.8, 32]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.5} />
        </mesh>
        <mesh position={[0.41, 0, 0]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.05, 32]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} />
        </mesh>
      </Float>

      {/* Bottom Case */}
      <Float speed={2} rotationIntensity={0} floatIntensity={1} floatingRange={[-0.7, -0.6]}>
        <mesh>
          <boxGeometry args={[1.2, 0.25, 1.2]} />
          <meshStandardMaterial color="#1a2340" roughness={0.6} />
        </mesh>
      </Float>
    </group>
  );
}

/* ── Step 4: Mounted on Pump ── */
function MountedModel() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.3;
  });
  return (
    <group ref={ref} scale={1.2} rotation={[0.2, -0.5, 0]}>
      <MotorBody status="healthy" />
      <SensorUnit position={[0.55, 0.1, 0.35]} status="healthy" />
    </group>
  );
}

/* ── Step 5: Real-Time Monitoring ── */
function MonitoringModel() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.3;
  });
  return (
    <group ref={ref} scale={1.2} rotation={[0.2, 0.5, 0]}>
      <MotorBody status="healthy" />
      <SensorUnit position={[0.55, 0.1, 0.35]} status="healthy" />
      <VibrationWaves sensorPos={[0.7, 0.1, 0.35]} status="healthy" />
      <DataParticles status="healthy" />
      <Html position={[0, 1.8, 0]} center>
        <div className="howitworks__status-badge">
          <span className="howitworks__status-dot"></span>
          <div>
            <div className="howitworks__status-title">Pump Health</div>
            <div className="howitworks__status-value">NORMAL</div>
          </div>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#00e5a0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </Html>
    </group>
  );
}

const steps = [
  {
    id: 1,
    title: 'ESP32',
    desc: 'The brain of ShakeSense. Processes sensor data and runs the on-device AI model.',
    Model: ESP32Model,
  },
  {
    id: 2,
    title: 'Sensors',
    desc: 'Capture vibration (3 axes) and temperature data from the machine.',
    Model: SensorsModel,
  },
  {
    id: 3,
    title: 'Assembled ShakeSense',
    desc: 'All components integrated into a compact, rugged, plug-and-play device.',
    Model: AssembledModel,
  },
  {
    id: 4,
    title: 'Mounted on Pump',
    desc: 'Easily attach to your pump or motor using adhesive or straps.',
    Model: MountedModel,
  },
  {
    id: 5,
    title: 'Real-Time Monitoring',
    desc: 'Continuously monitors vibration patterns and alerts you when something is abnormal.',
    Model: MonitoringModel,
  }
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="howitworks section" ref={ref} aria-label="How It Works">
      <div className="container">
        <motion.div
          className="howitworks__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">HOW IT WORKS</span>
          <h2 className="section-title">From Vibration To Insight</h2>
          <p className="section-subtitle">
            A simple, intelligent system that listens to your machine and alerts you before problems become serious.
          </p>
        </motion.div>

        <div className="howitworks__steps">
          {steps.map((step, index) => (
            <div className="howitworks__step-wrapper" key={step.id}>
              <motion.div
                className="howitworks__step"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              >
                <div className="howitworks__canvas-container">
                  <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[10, 10, 5]} intensity={2} />
                    <directionalLight position={[-10, -10, -5]} intensity={0.5} />
                    <step.Model />
                  </Canvas>
                </div>
                <div className="howitworks__content">
                  <div className="howitworks__number">0{step.id}</div>
                  <h3 className="howitworks__title">{step.title}</h3>
                  <p className="howitworks__desc">{step.desc}</p>
                </div>
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div 
                  className="howitworks__arrow"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.15, duration: 0.4 }}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
