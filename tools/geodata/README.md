# Lucerne Geodata Processing Pipeline

This directory contains the Python tools required to fetch and process authentic geographical data (swissALTI3D and OpenStreetMap) to generate the futuristic 3D wireframe scene in the React frontend.

## Architecture

The 3D scene (`src/components/lucerne/LucerneScene.tsx`) separates concerns into distinct visual layers (`TerrainLayer`, `BuildingLayer`, `LakeLayer`). To populate these layers, we pre-process heavy raw GIS data into lightweight, browser-friendly JSON files.

- `fetch_swissalti3d.py`: Downloads the official 0.5m resolution Digital Elevation Model (GeoTIFF) from the Swisstopo STAC API covering central Lucerne.
- `process_terrain.py`: Uses GDAL/Rasterio to resample the massive GeoTIFF into a lightweight 128x128 elevation grid normalized to a local Cartesian coordinate system.
- `fetch_osm.py`: Uses the Overpass API to download building footprints and water bodies as vector data. It utilizes `pyproj` to reproject WGS84 GPS coordinates into the same local metric coordinate system as the terrain, ensuring perfect alignment.

## Setup Instructions

1. Ensure you have Python 3 installed.
2. Create a virtual environment and install the required dependencies (GDAL must be installed on your system first):
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

## Running the Pipeline

You must run these scripts sequentially from the `tools/geodata` directory to generate the assets for the frontend.

1. **Fetch Terrain Data:**
   ```bash
   python fetch_swissalti3d.py
   ```
   *(This downloads `luzern_swissalti3d.tif` to the frontend data directory).*

2. **Process Terrain Data:**
   ```bash
   python process_terrain.py
   ```
   *(This generates `lucerne_terrain.json`).*

3. **Fetch OpenStreetMap Data:**
   ```bash
   python fetch_osm.py
   ```
   *(This queries Overpass and generates `lucerne_osm.json`).*
   **Important:** Overpass API enforces strict rate limits. If the automated script is blocked (HTTP 406), you must run this script from your local machine to bypass the block.

## Data Sources & Licenses
- **Terrain:** swissALTI3D by Swisstopo (Federal Office of Topography).
- **Buildings & Water:** OpenStreetMap contributors (ODbL).
