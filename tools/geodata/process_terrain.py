import rasterio
from rasterio.enums import Resampling
import numpy as np
import json
import os

INPUT_TILE = "../../frontend/public/data/lucerne/luzern_swissalti3d.tif"
OUTPUT_DIR = "../../frontend/public/data/lucerne"

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    out_file = os.path.join(OUTPUT_DIR, 'lucerne_terrain.json')

    if not os.path.exists(INPUT_TILE):
        print(f"Heightmap {INPUT_TILE} not found. Ensure fetch_swissalti3d.py ran successfully.")
        return

    with rasterio.open(INPUT_TILE) as dataset:
        GRID_SIZE = 128

        data = dataset.read(
            1,
            out_shape=(GRID_SIZE, GRID_SIZE),
            resampling=Resampling.bilinear
        )

        bounds = dataset.bounds
        width_m = bounds.right - bounds.left
        height_m = bounds.top - bounds.bottom

        print(f"Original Tile Bounds: {bounds}")
        print(f"Tile Physical Size: {width_m}m x {height_m}m")

        min_elev = np.min(data)
        elevation = data - min_elev

        # Scale the elevation accurately to fit a 10x10 unit plane
        scale_factor = 10.0 / width_m
        EXAGGERATION = 1.5
        elevation_scaled = elevation * scale_factor * EXAGGERATION

        elev_list = elevation_scaled.flatten().tolist()

        with open(out_file, 'w') as f:
            json.dump({'size': GRID_SIZE, 'elevation': elev_list, 'exaggeration': EXAGGERATION}, f)

        print(f"Processed swissALTI3D terrain to {GRID_SIZE}x{GRID_SIZE} grid and saved to {out_file}")

if __name__ == '__main__':
    main()
