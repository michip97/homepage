import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface TerrainData {
  size: number;
  elevation: number[];
  exaggeration: number;
}

export const TerrainLayer = ({ data, visible = true }: { data: TerrainData | null, visible?: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  const geometry = useMemo(() => {
    // We scale the 1000m x 1000m tile to a 10x10 unit plane
    if (!data) return new THREE.PlaneGeometry(10, 10, 128, 128);

    // Create plane with correct segments (size - 1)
    const segments = data.size - 1;
    const geo = new THREE.PlaneGeometry(10, 10, segments, segments);

    const positions = geo.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      // The array index in the flat elevation array
      const vertexIndex = i / 3;
      // Flip Y axis because texture coordinates differ from world coordinates
      const row = Math.floor(vertexIndex / data.size);
      const col = vertexIndex % data.size;
      const flippedIndex = (data.size - 1 - row) * data.size + col;

      // The elevation is already scaled in the python script.
      positions[i + 2] = data.elevation[flippedIndex];
    }

    geo.computeVertexNormals();
    return geo;
  }, [data]);

  if (!visible) return null;

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <meshStandardMaterial
        color={theme === 'dark' ? '#0ea5e9' : '#0284c7'}
        roughness={0.8}
        wireframe={true}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
};
