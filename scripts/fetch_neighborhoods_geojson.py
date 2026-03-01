import json
import ssl
import unicodedata
import urllib.request
from pathlib import Path

import geopandas as gpd

DATASET_URL = "https://www.ipea.gov.br/geobr/data_gpkg/neighborhood/2022/neighborhoods_2022_simplified.gpkg"
FLORIANOPOLIS_IBGE_CODE = 4205407
LOCAL_GPKG_PATH = Path("tmp/neighborhoods_2022_simplified.gpkg")
TARGET_GEOJSON_PATH = Path("public/data/florianopolis-neighborhoods.geojson")


def normalize_text(value: str) -> str:
    return "".join(
        char for char in unicodedata.normalize("NFKD", value) if not unicodedata.combining(char)
    ).lower()


def download_gpkg() -> Path:
    LOCAL_GPKG_PATH.parent.mkdir(parents=True, exist_ok=True)
    context = ssl._create_unverified_context()

    with urllib.request.urlopen(DATASET_URL, timeout=180, context=context) as response:
        LOCAL_GPKG_PATH.write_bytes(response.read())

    return LOCAL_GPKG_PATH


def build_geojson(source_gpkg: Path) -> dict:
    neighborhoods = gpd.read_file(source_gpkg)

    florianopolis = neighborhoods[
        neighborhoods["code_muni"].fillna(0).astype(int) == FLORIANOPOLIS_IBGE_CODE
    ].copy()

    if florianopolis.empty:
        florianopolis = neighborhoods[
            neighborhoods["name_muni"].astype(str).map(normalize_text) == "florianopolis"
        ].copy()

    florianopolis = florianopolis[florianopolis.geometry.notnull()].to_crs(4326)

    features = []
    for _, row in florianopolis.iterrows():
        name = str(row.get("name_neighborhood", "")).strip()
        properties = {
            "neighborhood": name,
            "name": name,
            "bairro": name,
            "name_muni": str(row.get("name_muni", "")).strip(),
            "code_muni": int(row.get("code_muni")) if row.get("code_muni") is not None else None,
            "source": "geobr 2022 simplified",
        }

        features.append(
            {
                "type": "Feature",
                "properties": properties,
                "geometry": row.geometry.__geo_interface__,
            }
        )

    return {
        "type": "FeatureCollection",
        "features": features,
    }


def main() -> None:
    source_gpkg = download_gpkg()
    collection = build_geojson(source_gpkg)

    TARGET_GEOJSON_PATH.parent.mkdir(parents=True, exist_ok=True)
    TARGET_GEOJSON_PATH.write_text(json.dumps(collection, ensure_ascii=False), encoding="utf-8")

    print(f"Saved {len(collection['features'])} real neighborhoods to {TARGET_GEOJSON_PATH}")


if __name__ == "__main__":
    main()
