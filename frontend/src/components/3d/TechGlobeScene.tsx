import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Convert Lat/Lon to 3D Cartesian coordinates on a sphere
const latLongToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));

  return new THREE.Vector3(x, y, z);
};

// Lucerne Coordinates: ~47.0502° N, 8.3093° E
const LUZERN_LAT = 47.0502;
const LUZERN_LON = 8.3093;
const GLOBE_RADIUS = 3;

const WireframeWasserturm = ({ position, rotation }: { position: THREE.Vector3, rotation: THREE.Euler }) => {
  const towerRef = useRef<THREE.Group>(null);
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: '#3b82f6', wireframe: true, transparent: true, opacity: 0.8 }), []);

  useFrame((state) => {
    if (towerRef.current) {
        // Drop-in animation effect based on time
        const t = state.clock.elapsedTime;
        // Animation: starts high (scale 0), drops in and scales up within the first 2 seconds
        const progress = Math.min(Math.max(t - 1, 0) / 1.5, 1); // Delay 1s, duration 1.5s

        // Easing function (easeOutBounce or similar)
        const ease = 1 - Math.pow(1 - progress, 3);

        towerRef.current.scale.setScalar(ease * 0.15); // Final scale is 0.15

        // Small hover effect after landing
        if (progress === 1) {
            towerRef.current.position.copy(position).add(
               new THREE.Vector3().copy(position).normalize().multiplyScalar(Math.sin(t * 2) * 0.05)
            );
        } else {
             // Drop in from further out
            const offset = (1 - ease) * 5;
            towerRef.current.position.copy(position).add(
               new THREE.Vector3().copy(position).normalize().multiplyScalar(offset)
            );
        }
    }
  });

  return (
    <group ref={towerRef} rotation={rotation}>
      {/* Base */}
      <mesh position={[0, 0, 0]} material={material}>
        <cylinderGeometry args={[1, 1.2, 4, 8]} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 3, 0]} material={material}>
        <coneGeometry args={[1.4, 2, 8]} />
      </mesh>
      {/* Spire */}
      <mesh position={[0, 4.5, 0]} material={material}>
        <cylinderGeometry args={[0.05, 0.05, 1, 4]} />
      </mesh>

      {/* Minimalist marker ring at the bottom */}
      <mesh position={[0, -2, 0]} rotation={[Math.PI / 2, 0, 0]}>
         <ringGeometry args={[1.5, 1.8, 32]} />
         <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};


const TechGlobe = () => {
  const globeRef = useRef<THREE.Group>(null);

  // Calculate Luzern position and the rotation needed so the tower points outwards
  const luzernPos = useMemo(() => latLongToVector3(LUZERN_LAT, LUZERN_LON, GLOBE_RADIUS), []);
  const luzernRotation = useMemo(() => {
      // Create an object to point from origin to luzernPos to get the correct rotation
      const obj = new THREE.Object3D();
      obj.position.copy(luzernPos);
      obj.lookAt(new THREE.Vector3(0, 0, 0));
      // Rotate 180 degrees so it faces out from the globe, not into it
      obj.rotateX(Math.PI / 2);
      return obj.rotation;
  }, [luzernPos]);

  useFrame((state) => {
    if (globeRef.current) {
        const t = state.clock.elapsedTime;

        // Initial cinematic rotation: spin the globe to center Europe
        // Europe is roughly facing camera when Y rot is ~ -1.5 rad
        const targetRotY = -1.2;
        const targetRotX = 0.3;

        if (t < 3) {
            // Smoothly interpolate to the target position
            globeRef.current.rotation.y = THREE.MathUtils.lerp(Math.PI, targetRotY, t / 3);
            globeRef.current.rotation.x = THREE.MathUtils.lerp(0, targetRotX, t / 3);
        } else {
            // Very slow idle rotation after landing
            globeRef.current.rotation.y = targetRotY + Math.sin((t - 3) * 0.2) * 0.1;
            globeRef.current.rotation.x = targetRotX + Math.cos((t - 3) * 0.1) * 0.05;
        }
    }
  });

  return (
    <group ref={globeRef}>
      {/* Outer Wireframe Globe */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
        <meshBasicMaterial color="#334155" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Inner Core (dark, solid) */}
      <mesh>
         <sphereGeometry args={[GLOBE_RADIUS * 0.98, 32, 32]} />
         <meshBasicMaterial color="#0f172a" />
      </mesh>

      {/* Lat/Lon Grid lines effect */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.01, 16, 16]} />
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Wasserturm Marker at Luzern */}
      <WireframeWasserturm position={luzernPos} rotation={luzernRotation} />

      {/* Highlight ring specifically over Luzern location */}
      <mesh position={luzernPos} rotation={luzernRotation}>
         <ringGeometry args={[0, 0.1, 16]} />
         <meshBasicMaterial color="#3b82f6" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const TechGlobeScene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <TechGlobe />

      {/* User interaction: allowed to spin but auto-returns roughly to center (handled manually or just let them spin) */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
      />
    </>
  );
};
