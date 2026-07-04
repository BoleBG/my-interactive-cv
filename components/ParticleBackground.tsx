"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ParticleField = () => {
  const points = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const particlesData = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 8 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mix = Math.random();
      colors[i * 3] = 0.024 * (1 - mix) + 0.659 * mix;
      colors[i * 3 + 1] = 0.714 * (1 - mix) + 0.333 * mix;
      colors[i * 3 + 2] = 0.831 * (1 - mix) + 0.969 * mix;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const { x, y } = state.mouse;
    mousePosition.current.x += (x - mousePosition.current.x) * 0.05;
    mousePosition.current.y += (y - mousePosition.current.y) * 0.05;

    points.current.rotation.y = state.clock.elapsedTime * 0.05 + mousePosition.current.x * 0.3;
    points.current.rotation.x = mousePosition.current.y * 0.2;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particlesData.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[particlesData.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
};

export const ParticleBackground = () => (
  <div className="absolute inset-0 z-0 opacity-60">
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ParticleField />
    </Canvas>
  </div>
);