import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Helper: Create a ring of cylinders for bearing representation ── */
function BearingRing({ position, radius, count, color }) {
  const ref = useRef();
  const balls = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      arr.push([Math.cos(angle) * radius, Math.sin(angle) * radius]);
    }
    return arr;
  }, [radius, count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.5;
  });

  return (
    <group ref={ref} position={position}>
      {balls.map((pos, i) => (
        <mesh key={i} position={[pos[0], pos[1], 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      {/* Outer race */}
      <mesh>
        <torusGeometry args={[radius + 0.05, 0.02, 8, 32]} />
        <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Inner race */}
      <mesh>
        <torusGeometry args={[radius - 0.05, 0.02, 8, 32]} />
        <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

/* ── Vibration wave rings emanating from the sensor ── */
function VibrationWaves({ sensorPos, status }) {
  const wavesRef = useRef([]);
  const waveCount = 4;
  const color = status === 'critical' ? '#ff3b5c' : status === 'warning' ? '#f5a623' : '#00d4ff';

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    wavesRef.current.forEach((ring, i) => {
      if (!ring) return;
      const phase = (t * 2.0 + i * 0.8) % (waveCount * 0.8);
      const scale = 0.5 + phase * 1.5;
      const opacity = Math.max(0, 1 - phase / (waveCount * 0.8));
      ring.scale.set(scale, scale, scale);
      ring.material.opacity = opacity * 0.6;
    });
  });

  return (
    <group position={sensorPos}>
      {Array.from({ length: waveCount }).map((_, i) => (
        <mesh key={i} ref={el => (wavesRef.current[i] = el)} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.01, 8, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Data particles flowing from sensor ── */
function DataParticles({ status }) {
  const ref = useRef();
  const count = 40;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Start near sensor
      pos[i * 3] = 0.6 + Math.random() * 0.2;
      pos[i * 3 + 1] = 0.2 + Math.random() * 0.2;
      pos[i * 3 + 2] = 0.3 + (Math.random() - 0.5) * 0.2;
      
      // Flow outward and upward
      vel[i * 3] = 0.4 + Math.random() * 0.6;
      vel[i * 3 + 1] = 0.5 + Math.random() * 0.5;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    return [pos, vel];
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const posArray = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3] * delta;
      posArray[i * 3 + 1] += velocities[i * 3 + 1] * delta;
      posArray[i * 3 + 2] += velocities[i * 3 + 2] * delta;

      // Reset particle when too far out
      if (posArray[i * 3] > 3.0 || posArray[i * 3 + 1] > 2.5) {
        posArray[i * 3] = 0.6 + Math.random() * 0.2;
        posArray[i * 3 + 1] = 0.2 + Math.random() * 0.2;
        posArray[i * 3 + 2] = 0.3 + (Math.random() - 0.5) * 0.2;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  const color = status === 'critical' ? '#ff3b5c' : status === 'warning' ? '#f5a623' : '#00d4ff';

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.03} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/* ── Small sensor box attached to the motor ── */
function SensorUnit({ position, status }) {
  const ref = useRef();
  const glowColor = status === 'critical' ? '#ff3b5c' : status === 'warning' ? '#f5a623' : '#00e5a0';

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.material.emissiveIntensity = 0.3 + Math.sin(t * 3) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Sensor body */}
      <mesh>
        <boxGeometry args={[0.2, 0.15, 0.1]} />
        <meshStandardMaterial color="#1a2340" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* LED indicator */}
      <mesh ref={ref} position={[0.06, 0.04, 0.051]}>
        <circleGeometry args={[0.02, 16]} />
        <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={0.5} />
      </mesh>
      {/* Label */}
      <mesh position={[0, -0.04, 0.051]}>
        <planeGeometry args={[0.12, 0.03]} />
        <meshStandardMaterial color="#0a0f1a" />
      </mesh>
      {/* Mounting bracket */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.08, 0.05, 0.08]} />
        <meshStandardMaterial color="#2a3040" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

/* ── Main motor body ── */
function MotorBody({ status }) {
  const shaftRef = useRef();
  const fanRef = useRef();

  const shakeAmount = status === 'critical' ? 0.02 : status === 'warning' ? 0.008 : 0.001;
  const rotationSpeed = status === 'critical' ? 3 : status === 'warning' ? 2 : 1.5;

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    if (shaftRef.current) {
      shaftRef.current.rotation.x += rotationSpeed * delta;
    }
    if (fanRef.current) {
      fanRef.current.rotation.x += rotationSpeed * 1.2 * delta;
    }
  });

  return (
    <group>
      {/* Motor housing - main body */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.55, 1.2, 32]} />
        <meshStandardMaterial
          color="#1e2a3a"
          metalness={0.7}
          roughness={0.35}
        />
      </mesh>

      {/* Housing cooling fins */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.56,
              0,
              Math.sin(angle) * 0.56,
            ]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.02, 0.9, 0.08]} />
            <meshStandardMaterial color="#2a3040" metalness={0.6} roughness={0.4} />
          </mesh>
        );
      })}

      {/* End bell - front */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.5, 0.55, 0.1, 32]} />
        <meshStandardMaterial color="#1a2340" metalness={0.75} roughness={0.3} />
      </mesh>

      {/* End bell - back */}
      <mesh position={[0, -0.65, 0]}>
        <cylinderGeometry args={[0.55, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#1a2340" metalness={0.75} roughness={0.3} />
      </mesh>

      {/* Fan cover */}
      <mesh ref={fanRef} position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.45, 0.48, 0.15, 32]} />
        <meshStandardMaterial color="#141c33" metalness={0.5} roughness={0.5} transparent opacity={0.8} />
      </mesh>

      {/* Shaft */}
      <mesh ref={shaftRef} position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Junction box */}
      <mesh position={[0.4, 0.2, 0.35]}>
        <boxGeometry args={[0.25, 0.2, 0.15]} />
        <meshStandardMaterial color="#1a2340" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Mounting base */}
      <mesh position={[0, -0.85, 0]}>
        <boxGeometry args={[0.7, 0.1, 1.0]} />
        <meshStandardMaterial color="#0f1629" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Mounting feet */}
      {[[-0.3, -0.92, -0.35], [-0.3, -0.92, 0.35], [0.3, -0.92, -0.35], [0.3, -0.92, 0.35]].map(
        (pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.12, 0.05, 0.12]} />
            <meshStandardMaterial color="#2a3040" metalness={0.7} roughness={0.3} />
          </mesh>
        )
      )}

      {/* Bearings */}
      <BearingRing position={[0, 0.55, 0]} radius={0.15} count={8} color="#64748b" />
      <BearingRing position={[0, -0.55, 0]} radius={0.15} count={8} color="#64748b" />
    </group>
  );
}

/* ── Floating annotations ── */
function FloatingAnnotations({ status }) {
  const groupRef = useRef();
  const annotations = [
    { text: 'VIBRATION', pos: [-1.2, 0.8, 0.5] },
    { text: 'FFT', pos: [1.3, 0.5, -0.3] },
    { text: 'EDGE INFERENCE', pos: [-1.0, -0.3, 0.8] },
    { text: 'MACHINE FINGERPRINT', pos: [1.1, -0.5, 0.5] },
    { text: 'HEALTH SCORE', pos: [0, 1.4, 0.8] },
  ];

  // We render these as HTML overlays instead of 3D text for performance
  // This is a placeholder — actual labels rendered via Drei Html component
  return null;
}

/* ── Main scene composition ── */
export default function MachineScene({ status = 'healthy' }) {
  const groupRef = useRef();
  const { viewport } = useThree();

  const shakeAmount = status === 'critical' ? 0.025 : status === 'warning' ? 0.01 : 0.002;

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Strong mouse-follow rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 1.5 + t * 0.05,
      0.08
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -(pointer.y * 1.0) - 0.1,
      0.08
    );

    // Vibration shake
    groupRef.current.position.x = Math.sin(t * 35) * shakeAmount;
    groupRef.current.position.y = Math.cos(t * 40) * shakeAmount * 0.8;
  });

  const scale = Math.min(viewport.width / 6, 1.0);

  return (
    <group ref={groupRef} scale={scale} rotation={[0.1, -0.3, 0]}>
      <MotorBody status={status} />
      <SensorUnit position={[0.55, 0.1, 0.35]} status={status} />
      <VibrationWaves sensorPos={[0.7, 0.1, 0.35]} status={status} />
      <DataParticles status={status} />
    </group>
  );
}
