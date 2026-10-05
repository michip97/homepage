import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import { createNoise2D } from 'simplex-noise';

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

// Procedural Terrain for Luzern (Lake + Mountains)
const LuzernTerrain = ({ opacity }: { opacity: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(10, 10, 64, 64);
    const noise2D = createNoise2D();

    const positions = geo.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];

      // Create a lake in the center (flat), mountains on the edges
      const distFromCenter = Math.sqrt(x * x + y * y);

      if (distFromCenter < 2) {
        // Lake Vierwaldstättersee area (mostly flat)
        positions[i + 2] = noise2D(x * 0.5, y * 0.5) * 0.05;
      } else {
        // Mountains (Pilatus, Rigi)
        const elevation = noise2D(x * 0.3, y * 0.3) * (distFromCenter - 2) * 0.8;
        positions[i + 2] = elevation > 0 ? elevation : 0;
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {/* Terrain Surface */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={theme === 'dark' ? '#1e293b' : '#e2e8f0'}
          roughness={0.8}
          transparent
          opacity={opacity}
          wireframe={true}
        />
      </mesh>

      {/* Lake Plane overlay */}
      <mesh position={[0, 0, 0.02]}>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={opacity * 0.4} />
      </mesh>
    </group>
  );
};


const WireframeWasserturm = ({ position, rotation, scale = 0.15, opacity = 1 }: { position: THREE.Vector3, rotation: THREE.Euler, scale?: number, opacity?: number }) => {
  const towerRef = useRef<THREE.Group>(null);
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: '#3b82f6', wireframe: true, transparent: true, opacity: 0.8 }), []);

  useFrame((state) => {
    if (towerRef.current) {
        const t = state.clock.elapsedTime;
        const delay = 5.0; // Wait until deep dive transition is mostly done
        const duration = 1.5;

        const progress = Math.min(Math.max(t - delay, 0) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        towerRef.current.scale.setScalar(ease * scale);

        // Hover effect after landing
        if (progress === 1) {
             towerRef.current.position.copy(position).add(
                 new THREE.Vector3().copy(position).normalize().multiplyScalar(Math.sin(t * 2) * (scale * 0.3))
             );
        } else {
             // Drop in from above
             const offset = (1 - ease) * (scale * 30);
             towerRef.current.position.copy(position).add(
                 new THREE.Vector3().copy(position).normalize().multiplyScalar(offset)
             );
        }
    }
  });

  // Make material reactive to opacity prop
  useFrame(() => {
     material.opacity = opacity * 0.8;
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


const SceneOrchestrator = () => {
  const globeRef = useRef<THREE.Group>(null);
  const globeMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const auraMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const localSceneRef = useRef<THREE.Group>(null);

  const { theme } = useTheme();
  const [flightPhase, setFlightPhase] = useState<'approaching' | 'transitioning' | 'local'>('approaching');

  // Load both day and night maps, plus topology
  const [nightMap, dayMap, bumpMap] = useTexture([
    'https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg',
    'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg',
    'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png'
  ]);

  const activeMap = theme === 'dark' ? nightMap : dayMap;

  // Calculate Luzern position and rotation on the globe
  const luzernPosGlobe = useMemo(() => latLongToVector3(LUZERN_LAT, LUZERN_LON, GLOBE_RADIUS), []);
  const luzernRotGlobe = useMemo(() => {
      const normal = luzernPosGlobe.clone().normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(up, normal);
      return new THREE.Euler().setFromQuaternion(quaternion);
  }, [luzernPosGlobe]);

  // Local Scene Center (0,0,0)
  const luzernPosLocal = new THREE.Vector3(0, 0, 0);
  const luzernRotLocal = new THREE.Euler(0, 0, 0);

  const TRANSITION_START = 3.5; // Seconds when globe starts fading
  const LOCAL_START = 4.5;      // Seconds when local terrain starts appearing

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // --- CAMERA FLIGHT ---
    if (t < LOCAL_START) {
      if (flightPhase !== 'approaching') setFlightPhase('approaching');

      const startPos = new THREE.Vector3(0, 10, 20);
      const normal = luzernPosGlobe.clone().normalize();
      const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), normal).normalize();
      const up = new THREE.Vector3(0, 1, 0);

      // Target position right above Luzern
      const targetPos = luzernPosGlobe.clone()
        .add(normal.multiplyScalar(GLOBE_RADIUS * 0.2))
        .add(right.multiplyScalar(GLOBE_RADIUS * 0.1))
        .add(up.multiplyScalar(GLOBE_RADIUS * 0.1));

      const progress = Math.pow(t / LOCAL_START, 2.5); // Ease-in
      state.camera.position.lerpVectors(startPos, targetPos, progress);
      state.camera.lookAt(luzernPosGlobe);

    } else if (t >= LOCAL_START && t < LOCAL_START + 1.0) {
      if (flightPhase !== 'transitioning') setFlightPhase('transitioning');

      // Snap camera to local scene perspective
      const localProgress = (t - LOCAL_START) / 1.0;

      // Local isometric view
      const localTargetPos = new THREE.Vector3(5, 5, 8);
      state.camera.position.lerpVectors(state.camera.position, localTargetPos, localProgress);
      state.camera.lookAt(0, 0, 0);
    } else {
      if (flightPhase !== 'local') setFlightPhase('local');
    }

    // --- FADE ANIMATIONS ---
    if (t > TRANSITION_START && globeRef.current && globeMaterialRef.current && auraMaterialRef.current) {
        // Fade out Globe
        const fadeProgress = Math.min((t - TRANSITION_START) / 1.0, 1);
        globeRef.current.scale.setScalar(1 + fadeProgress * 0.5); // Slightly swell before disappearing
        globeMaterialRef.current.opacity = 1 - fadeProgress;
        auraMaterialRef.current.opacity = (1 - fadeProgress) * 0.05;
        globeMaterialRef.current.transparent = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />

      {/* MACRO SCENE: The Globe */}
      {flightPhase !== 'local' && (
        <group ref={globeRef}>
          <mesh>
             <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
             <meshStandardMaterial
                ref={globeMaterialRef}
                map={activeMap}
                bumpMap={bumpMap}
                bumpScale={0.05}
                metalness={0.1}
                roughness={0.8}
                emissiveMap={theme === 'dark' ? activeMap : null}
                emissive={theme === 'dark' ? new THREE.Color(0x444444) : new THREE.Color(0x000000)}
                emissiveIntensity={theme === 'dark' ? 0.5 : 0}
             />
          </mesh>
          <mesh>
            <sphereGeometry args={[GLOBE_RADIUS + 0.02, 32, 32]} />
            <meshBasicMaterial ref={auraMaterialRef} color="#3b82f6" wireframe transparent opacity={0.05} />
          </mesh>
          <mesh position={luzernPosGlobe} rotation={luzernRotGlobe}>
             <ringGeometry args={[0, 0.1, 16]} />
             <meshBasicMaterial color="#3b82f6" transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* MICRO SCENE: Local Luzern Terrain & Tower */}
      {flightPhase !== 'approaching' && (
        <group ref={localSceneRef}>
           <LuzernTerrain opacity={flightPhase === 'local' ? 1 : 0.5} />
           <WireframeWasserturm position={luzernPosLocal} rotation={luzernRotLocal} scale={1} opacity={flightPhase === 'local' ? 1 : 0} />
        </group>
      )}

      {/* Handover to interactive controls after flight */}
      {flightPhase === 'local' && (
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          rotateSpeed={0.6}
          zoomSpeed={0.8}
          target={[0, 0, 0]}
          minDistance={2}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2 - 0.1} // don't go under ground
          autoRotate
          autoRotateSpeed={0.5}
        />
      )}
    </>
  );
};

export const TechGlobeScene = () => {
  return <SceneOrchestrator />;
};
