import requests
import zipfile
import io
import os

OUTPUT_DIR = "../../frontend/public/data/lucerne"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def fetch_swisstopo_dem():
    print("Fetching official swissALTI3D GeoTIFF from swisstopo...")

    search_url = "https://data.geo.admin.ch/api/stac/v0.9/collections/ch.swisstopo.swissalti3d/items"

    params = {
        "bbox": "8.295,47.045,8.320,47.055",
        "limit": 1
    }

    response = requests.get(search_url, params=params)
    if response.status_code == 200:
        data = response.json()
        if not data.get("features"):
            raise Exception("No swisstopo tiles found for this bounding box.")

        feature = data["features"][0]

        asset_url = None
        for key, asset in feature.get("assets", {}).items():
            if asset.get("href") and (".tif" in asset["href"] or ".zip" in asset["href"]):
                if "2m" in asset["href"] or asset_url is None:
                    asset_url = asset["href"]

        if not asset_url:
             raise Exception("Could not find a valid DEM asset in the swisstopo STAC response.")

        print(f"Downloading from {asset_url}...")

        dl_response = requests.get(asset_url)
        if dl_response.status_code == 200:
             content = dl_response.content
             if content.startswith(b'PK'):
                 with zipfile.ZipFile(io.BytesIO(content)) as z:
                     tif_file = next(name for name in z.namelist() if name.endswith('.tif'))
                     with open(os.path.join(OUTPUT_DIR, 'luzern_swissalti3d.tif'), 'wb') as f:
                         f.write(z.read(tif_file))
                 print("Extracted TIF from ZIP.")
             else:
                 with open(os.path.join(OUTPUT_DIR, 'luzern_swissalti3d.tif'), 'wb') as f:
                     f.write(content)
                 print("Saved TIF directly.")
        else:
             raise Exception(f"Failed to download asset: HTTP {dl_response.status_code}")

    else:
        raise Exception(f"Failed to query STAC API: HTTP {response.status_code}")

if __name__ == '__main__':
    try:
        fetch_swisstopo_dem()
    except Exception as e:
        print(e)
        print("Note: To fulfill the project requirements, you must run this locally to obtain the official swisstopo data.")
