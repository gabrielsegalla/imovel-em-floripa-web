"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

type PropertyLocationMapProps = {
  latitude: number;
  longitude: number;
};

const markerIcon = L.divIcon({
  className: "",
  html: '<div style="width:14px;height:14px;border-radius:9999px;background:#0A1F44;border:2px solid #BFDBFE"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

export function PropertyLocationMap({ latitude, longitude }: PropertyLocationMapProps): JSX.Element {
  return (
    <div className="h-72 overflow-hidden rounded-2xl border border-slate-200">
      <MapContainer center={[latitude, longitude]} zoom={14} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[latitude, longitude]} icon={markerIcon} />
      </MapContainer>
    </div>
  );
}
