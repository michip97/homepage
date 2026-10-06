import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface CameraControllerProps {
  autoFly: boolean;
  onUserInteraction: () => void;
  resetTrigger: number;
}

export const CameraController = ({ autoFly, onUserInteraction, resetTrigger }: CameraControllerProps) => {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  const startPos = new THREE.Vector3(0, 5, 10);
  const startTarget = new THREE.Vector3(0, 0, 0);

  // Handle Reset
  useEffect(() => {
    if (resetTrigger > 0 && controlsRef.current) {
      camera.position.copy(startPos);
      controlsRef.current.target.copy(startTarget);
      controlsRef.current.update();
    }
  }, [resetTrigger, camera]);

  useFrame((state) => {
    if (autoFly && controlsRef.current) {
      const t = state.clock.elapsedTime;
      // Gentle cinematic orbit
      const radius = 10;
      const speed = 0.1;
      state.camera.position.x = Math.sin(t * speed) * radius;
      state.camera.position.z = Math.cos(t * speed) * radius;
      state.camera.position.y = 5 + Math.sin(t * 0.2) * 2;

      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={2}
      maxDistance={30}
      maxPolarAngle={Math.PI / 2 - 0.05} // Don't go below ground
      onStart={onUserInteraction} // Detect when user clicks/drags to disable auto-fly
    />
  );
};
