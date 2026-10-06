import json
import os
from shapely.geometry import Polygon
import pyproj
import requests

BBOX = [47.045, 8.295, 47.055, 8.320] # Central Lucerne
OUTPUT_DIR = "../../frontend/public/data/lucerne"

# Local coordinate system origin (Kapellbrücke / Wasserturm)
ORIGIN_LAT = 47.0502
ORIGIN_LON = 8.3093

os.makedirs(OUTPUT_DIR, exist_ok=True)
wgs84 = pyproj.CRS('EPSG:4326')
local_crs = pyproj.CRS(
    f"+proj=tmerc +lat_0={ORIGIN_LAT} +lon_0={ORIGIN_LON} +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs"
)
project = pyproj.Transformer.from_crs(wgs84, local_crs, always_xy=True).transform

def fetch_osm_data():
    print("Fetching real OSM data via Overpass API...")
    overpass_url = "https://lz4.overpass-api.de/api/interpreter"

    overpass_query = f"""
    [out:json][timeout:250];
    (
      way["building"]({BBOX[0]},{BBOX[1]},{BBOX[2]},{BBOX[3]});
      relation["building"]({BBOX[0]},{BBOX[1]},{BBOX[2]},{BBOX[3]});

      way["natural"="water"]({BBOX[0]},{BBOX[1]},{BBOX[2]},{BBOX[3]});
      relation["natural"="water"]({BBOX[0]},{BBOX[1]},{BBOX[2]},{BBOX[3]});
    );
    out body;
    >;
    out skel qt;
    """

    response = requests.post(overpass_url, data={'data': overpass_query}, headers={'User-Agent': 'Mozilla/5.0'})

    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to fetch OSM data: HTTP {response.status_code}\nNote: If the automated sandbox IP is blocked by Overpass, you MUST run this script locally to fetch the real data. Do NOT use fake data.")

def process_osm_to_geojson(osm_data):
    nodes = {node['id']: (node['lon'], node['lat']) for node in osm_data['elements'] if node['type'] == 'node'}

    buildings = []
    water = []

    for element in osm_data['elements']:
        if element['type'] == 'way':
            try:
                coords = [nodes[node_id] for node_id in element['nodes']]
                if len(coords) < 3: continue

                local_coords = [project(lon, lat) for lon, lat in coords]
                poly = Polygon(local_coords)

                if not poly.is_valid:
                    poly = poly.buffer(0)

                tags = element.get('tags', {})
                feature = {
                    'geometry': list(poly.exterior.coords),
                    'tags': tags
                }

                # Scale from meters to our 3D grid size (1 unit = 100 meters, so divide by 100)
                scaled_geom = [[x / 100.0, y / 100.0] for x, y in poly.exterior.coords]
                feature['geometry'] = scaled_geom

                if 'building' in tags:
                    height = float(tags.get('height', tags.get('building:levels', 3) * 3.5))
                    feature['height'] = height / 100.0 # scale height too
                    buildings.append(feature)
                elif 'natural' in tags and tags['natural'] == 'water':
                    water.append(feature)

            except Exception:
                pass

    return {'buildings': buildings, 'water': water}

def main():
    try:
        osm_data = fetch_osm_data()
        processed_data = process_osm_to_geojson(osm_data)
        out_file = os.path.join(OUTPUT_DIR, 'lucerne_osm.json')
        with open(out_file, 'w') as f:
            json.dump(processed_data, f)
        print(f"Successfully saved {len(processed_data['buildings'])} buildings and {len(processed_data['water'])} water bodies to {out_file}")
    except Exception as e:
        print(e)
        with open(os.path.join(OUTPUT_DIR, 'lucerne_osm.json'), 'w') as f:
            json.dump({'buildings': [], 'water': []}, f)
        print("Wrote empty JSON as fallback. Please run this script locally to fetch real data.")

if __name__ == '__main__':
    main()
