import * as THREE from 'three';
import { useMemo } from 'react';

interface WaterData {
  geometry: [number, number][];
}

export const LakeLayer = ({ data, visible = true }: { data: WaterData[] | null, visible?: boolean }) => {
  const geometries = useMemo(() => {
    if (!data) return [];

    return data.map((w) => {
      const shape = new THREE.Shape();
      if (w.geometry.length < 3) return null;

      shape.moveTo(w.geometry[0][0], w.geometry[0][1]);
      for (let i = 1; i < w.geometry.length; i++) {
        shape.lineTo(w.geometry[i][0], w.geometry[i][1]);
      }
      shape.closePath();

      return new THREE.ShapeGeometry(shape);
    }).filter(g => g !== null) as THREE.ShapeGeometry[];
  }, [data]);

  if (!visible) return null;

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.99, 0]}>
      {geometries.map((geo, idx) => (
        <mesh key={idx} geometry={geo}>
          <meshBasicMaterial
            color="#0ea5e9"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
          <lineSegments>
            <edgesGeometry args={[geo]} />
            <lineBasicMaterial color="#0284c7" />
          </lineSegments>
        </mesh>
      ))}
    </group>
  );
};
