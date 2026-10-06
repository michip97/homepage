import { useState, useEffect } from 'react';
import { TerrainLayer } from './TerrainLayer';
import { BuildingLayer } from './BuildingLayer';
import { LakeLayer } from './LakeLayer';
import { CameraController } from './CameraController';
import { SceneControls } from './SceneControls';
import { Html } from '@react-three/drei';

export const LucerneScene = () => {
  const [terrainData, setTerrainData] = useState(null);
  const [osmData, setOsmData] = useState<{ buildings: any[], water: any[] } | null>(null);

  const [autoFly, setAutoFly] = useState(true);
  const [showTerrain, setShowTerrain] = useState(true);
  const [showBuildings, setShowBuildings] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);

  useEffect(() => {
    // Load local processed data
    fetch('/data/lucerne/lucerne_terrain.json')
      .then(res => res.json())
      .then(data => {
          if (data && data.elevation && data.elevation.length > 0) {
              setTerrainData(data);
          }
      })
      .catch(err => console.error("Could not load terrain data", err));

    fetch('/data/lucerne/lucerne_osm.json')
      .then(res => res.json())
      .then(data => setOsmData(data))
      .catch(err => console.error("Could not load OSM data", err));
  }, []);

  return (
    <>
      <color attach="background" args={['#0f172a']} />
      <fog attach="fog" args={['#0f172a', 5, 30]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 50, 20]} intensity={1} color="#e2e8f0" />

      <TerrainLayer data={terrainData} visible={showTerrain} />
      <BuildingLayer data={osmData?.buildings || null} visible={showBuildings} />
      <LakeLayer data={osmData?.water || null} visible={true} />

      <CameraController
        autoFly={autoFly}
        onUserInteraction={() => setAutoFly(false)}
        resetTrigger={resetTrigger}
      />

      <Html style={{ position: 'absolute', right: 0, bottom: 0, width: '200px' }} transform={false}>
        <SceneControls
          autoFly={autoFly} setAutoFly={setAutoFly}
          showTerrain={showTerrain} setShowTerrain={setShowTerrain}
          showBuildings={showBuildings} setShowBuildings={setShowBuildings}
          onReset={() => { setAutoFly(true); setResetTrigger(prev => prev + 1); }}
        />
      </Html>
    </>
  );
};
