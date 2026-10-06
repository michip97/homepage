interface SceneControlsProps {
  autoFly: boolean;
  setAutoFly: (val: boolean) => void;
  showTerrain: boolean;
  setShowTerrain: (val: boolean) => void;
  showBuildings: boolean;
  setShowBuildings: (val: boolean) => void;
  onReset: () => void;
}

export const SceneControls = ({
  autoFly, setAutoFly,
  showTerrain, setShowTerrain,
  showBuildings, setShowBuildings,
  onReset
}: SceneControlsProps) => {
  return (
    <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2 bg-bgPrimary/80 backdrop-blur-md p-4 rounded-xl border border-borderBase shadow-lg">
      <div className="text-xs font-bold text-textSecondary uppercase tracking-wider mb-2 border-b border-borderBase pb-2">
        Scene Controls
      </div>

      <label className="flex items-center space-x-3 cursor-pointer">
        <input
          type="checkbox"
          checked={autoFly}
          onChange={(e) => setAutoFly(e.target.checked)}
          className="form-checkbox h-4 w-4 text-accent bg-bgSecondary border-borderBase rounded focus:ring-accent"
        />
        <span className="text-sm font-medium text-textPrimary">Auto-Pilot</span>
      </label>

      <label className="flex items-center space-x-3 cursor-pointer">
        <input
          type="checkbox"
          checked={showBuildings}
          onChange={(e) => setShowBuildings(e.target.checked)}
          className="form-checkbox h-4 w-4 text-accent bg-bgSecondary border-borderBase rounded focus:ring-accent"
        />
        <span className="text-sm font-medium text-textPrimary">Buildings</span>
      </label>

      <label className="flex items-center space-x-3 cursor-pointer">
        <input
          type="checkbox"
          checked={showTerrain}
          onChange={(e) => setShowTerrain(e.target.checked)}
          className="form-checkbox h-4 w-4 text-accent bg-bgSecondary border-borderBase rounded focus:ring-accent"
        />
        <span className="text-sm font-medium text-textPrimary">Terrain</span>
      </label>

      <button
        onClick={onReset}
        className="mt-2 text-xs font-semibold bg-bgSecondary hover:bg-borderBase text-textPrimary py-2 px-4 rounded transition-colors"
      >
        Reset Camera
      </button>
    </div>
  );
};
