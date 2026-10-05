import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
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
        // Delay the drop until the camera is getting closer (around 3.5 seconds into the 5s flight)
        const t = state.clock.elapsedTime;
        const delay = 3.5;
        const duration = 1.5;

        const progress = Math.min(Math.max(t - delay, 0) / duration, 1);

        // Easing function (cubic ease-out)
        const ease = 1 - Math.pow(1 - progress, 3);

        towerRef.current.scale.setScalar(ease * 0.15); // Final scale is 0.15

        // Small hover effect after landing
        if (progress === 1) {
            towerRef.current.position.copy(position).add(
               new THREE.Vector3().copy(position).normalize().multiplyScalar(Math.sin(t * 2) * 0.05)
            );
        } else {
             // Drop in from very far out (Space -> Luzern)
            const offset = (1 - ease) * 10;
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

  const [colorMap, bumpMap] = useTexture([
    'https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg',
    'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png'
  ]);

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

  // The cinematic camera handles the movement now. The globe can stay still (or spin very slowly).
  useFrame((state) => {
    if (globeRef.current) {
        const t = state.clock.elapsedTime;
        // Very slow idle rotation
        globeRef.current.rotation.y = Math.sin(t * 0.1) * 0.05;
    }
  });

  return (
    <group ref={globeRef}>

      {/* Realistic Night Earth */}
      <mesh>
         <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
         <meshStandardMaterial
            map={colorMap}
            bumpMap={bumpMap}
            bumpScale={0.05}
            metalness={0.1}
            roughness={0.8}
            emissiveMap={colorMap}
            emissive={new THREE.Color(0x444444)}
            emissiveIntensity={0.5}
         />
      </mesh>

      {/* Very faint wireframe aura to keep it technical */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.02, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.05} />
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

const CinematicCamera = ({ luzernPos }: { luzernPos: THREE.Vector3 }) => {
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (t < 5) {
      // Flight phase: Start far away, swoop in
      const startPos = new THREE.Vector3(0, 5, 20);

      // We want to end up looking directly at Luzern, slightly zoomed out
      // Since Luzern is at luzernPos, let's place the camera a bit further out on that same vector
      const targetPos = luzernPos.clone().normalize().multiplyScalar(GLOBE_RADIUS + 2.5);

      // Smooth interpolation
      const progress = Math.pow(t / 5, 2); // Accelerating ease
      state.camera.position.lerpVectors(startPos, targetPos, progress);
      state.camera.lookAt(0, 0, 0);
    } else {
      // Idle phase: very slow sway around the target position
      const basePos = luzernPos.clone().normalize().multiplyScalar(GLOBE_RADIUS + 2.5);
      // Start sin/cos from 0 to prevent harsh jump at t = 5
      state.camera.position.x = basePos.x + Math.sin((t - 5) * 0.5) * 0.2;
      state.camera.position.y = basePos.y + (1 - Math.cos((t - 5) * 0.3)) * 0.2;
      state.camera.lookAt(0, 0, 0);
    }
  });

  return null;
};

export const TechGlobeScene = () => {
  const luzernPos = useMemo(() => latLongToVector3(LUZERN_LAT, LUZERN_LON, GLOBE_RADIUS), []);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <TechGlobe />
      <CinematicCamera luzernPos={luzernPos} />

      {/* OrbitControls disabled initially to allow cinematic flight, but we let users interact after */}
      {/* We handle interaction manually via camera path now for a true "flight" feel */}
    </>
  );
};
