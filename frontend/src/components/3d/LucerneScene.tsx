import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const Wasserturm = () => {
  const towerRef = useRef<THREE.Group>(null);

  // Gentle floating animation
  useFrame((state) => {
    if (towerRef.current) {
      towerRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={towerRef}>
      {/* Water Base */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[4, 4.5, 0.5, 16]} />
        <meshStandardMaterial color="#0ea5e9" transparent opacity={0.8} metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Tower Base (Stone) - Octagonal */}
      <mesh position={[0, 1.5, -1]}>
        <cylinderGeometry args={[1, 1.2, 4, 8]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.9} />
      </mesh>

      {/* Tower Roof Base */}
      <mesh position={[0, 3.6, -1]}>
        <cylinderGeometry args={[1.2, 1, 0.4, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* Tower Roof (Tile) - Octagonal Cone */}
      <mesh position={[0, 4.5, -1]}>
        <coneGeometry args={[1.4, 1.8, 8]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.8} />
      </mesh>

      {/* Tower Spire */}
      <mesh position={[0, 5.6, -1]}>
        <cylinderGeometry args={[0.05, 0.1, 0.8, 4]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
      </mesh>

      {/* Kapellbrücke (Wooden Bridge) */}
      <group position={[0, 0.5, 0.5]} rotation={[0, -Math.PI / 4, 0]}>
        {/* Bridge Path */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[6, 0.2, 1]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
        </mesh>

        {/* Bridge Roof */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[6.2, 0.1, 1.4]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.8} />
        </mesh>

        {/* Bridge Roof Peak */}
        <mesh position={[0, 1.4, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 6.2, 3]} />
          <meshStandardMaterial color="#991b1b" roughness={0.8} />
        </mesh>

        {/* Pillars */}
        <mesh position={[-2, -0.5, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 1, 4]} />
          <meshStandardMaterial color="#451a03" />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 1, 4]} />
          <meshStandardMaterial color="#451a03" />
        </mesh>
        <mesh position={[2, -0.5, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 1, 4]} />
          <meshStandardMaterial color="#451a03" />
        </mesh>

        {/* Supports */}
        {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((x, i) => (
          <mesh key={i} position={[x, 0.6, 0.4]}>
            <boxGeometry args={[0.1, 1.2, 0.1]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export const LucerneScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#2563eb" />

      <Wasserturm />

      {/* Nice soft shadows underneath the model */}
      <ContactShadows position={[0, -0.6, 0]} opacity={0.4} scale={20} blur={2} far={4} />

      {/* Interactive controls */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={1}
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2 + 0.1} // Prevent looking directly from underneath
        minPolarAngle={Math.PI / 4}
      />
      <Environment preset="city" />
    </>
  );
};
