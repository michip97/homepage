import * as THREE from 'three';
import { useMemo } from 'react';

interface BuildingData {
  geometry: [number, number][];
  height: number;
  tags: any;
}

export const BuildingLayer = ({ data, visible = true }: { data: BuildingData[] | null, visible?: boolean }) => {
  const geometries = useMemo(() => {
    if (!data) return [];

    return data.map((b) => {
      const shape = new THREE.Shape();
      if (b.geometry.length < 3) return null;

      shape.moveTo(b.geometry[0][0], b.geometry[0][1]);
      for (let i = 1; i < b.geometry.length; i++) {
        shape.lineTo(b.geometry[i][0], b.geometry[i][1]);
      }
      shape.closePath();

      // Convert real height in meters to our 3D scale (1 unit = 100m)
      const scaledHeight = b.height / 100.0;

      const extrudeSettings = {
        depth: scaledHeight,
        bevelEnabled: false,
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      return geo;
    }).filter(g => g !== null) as THREE.ExtrudeGeometry[];
  }, [data]);

  if (!visible) return null;

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      {geometries.map((geo, idx) => (
        <mesh key={idx} geometry={geo}>
          <meshStandardMaterial
            color="#3b82f6"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
          <lineSegments>
            <edgesGeometry args={[geo]} />
            <lineBasicMaterial color="#60a5fa" linewidth={1} opacity={0.5} transparent />
          </lineSegments>
        </mesh>
      ))}
    </group>
  );
};
