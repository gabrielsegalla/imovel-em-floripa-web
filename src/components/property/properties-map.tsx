"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GeoJSON,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import L, { type DivIcon } from "leaflet";

import { useLocale } from "@/components/i18n/locale-provider";
import { FLORIANOPOLIS_NEIGHBORHOODS } from "@/lib/constants/florianopolis-neighborhoods";
import type { Property } from "@/lib/types/property";
import { createWhatsAppLink, formatCurrency } from "@/lib/utils/format";

type PropertiesMapProps = {
  properties: Property[];
  focusedPropertyId: string | null;
  onSelectProperty: (propertyId: string) => void;
  selectedNeighborhood?: string;
  onSelectNeighborhood?: (neighborhood: string | null) => void;
};

type NeighborhoodFeature = {
  type: "Feature";
  properties?: Record<string, unknown>;
  geometry: GeoJSON.Geometry;
};

type NeighborhoodFeatureCollection = {
  type: "FeatureCollection";
  features: NeighborhoodFeature[];
};

function getNeighborhoodName(feature: NeighborhoodFeature): string | null {
  const properties = feature.properties ?? {};
  const value =
    properties.neighborhood ??
    properties.bairro ??
    properties.name ??
    properties.NM_BAIRRO ??
    properties.nome;

  return typeof value === "string" ? value.trim() : null;
}

function normalizeLabel(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

function toCanonicalNeighborhood(name: string): string {
  const normalized = normalizeLabel(name);

  const matched = FLORIANOPOLIS_NEIGHBORHOODS.find(
    (neighborhood) => normalizeLabel(neighborhood) === normalized,
  );

  return matched ?? name;
}

function MapCenterController({ property }: { property: Property | null }): null {
  const map = useMap();

  useEffect(() => {
    if (property) {
      map.setView([property.latitude, property.longitude], 14, {
        animate: true,
      });
    }
  }, [map, property]);

  return null;
}

function createMarkerIcon(): DivIcon {
  return L.divIcon({
    className: "",
    html: '<div style="width:22px;height:22px;border-radius:9999px;background:#0A1F44;border:3px solid #BFDBFE;box-shadow:0 5px 12px rgba(10,31,68,0.35)"></div>',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

export function PropertiesMap({
  properties,
  focusedPropertyId,
  onSelectProperty,
  selectedNeighborhood,
  onSelectNeighborhood,
}: PropertiesMapProps): JSX.Element {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [neighborhoodsData, setNeighborhoodsData] = useState<NeighborhoodFeatureCollection | null>(null);
  const [showNeighborhoodLayer, setShowNeighborhoodLayer] = useState(false);
  const { translate, locale } = useLocale();
  const markerIcon = useMemo(() => createMarkerIcon(), []);
  const focusedProperty = useMemo(
    () => properties.find((property) => property.id === focusedPropertyId) ?? null,
    [properties, focusedPropertyId],
  );

  useEffect(() => {
    const envUrl = process.env.NEXT_PUBLIC_NEIGHBORHOODS_GEOJSON_URL;
    const candidateUrls = [envUrl, "/data/florianopolis-neighborhoods.geojson"].filter(
      (value): value is string => Boolean(value),
    );

    let active = true;

    async function loadNeighborhoods(): Promise<void> {
      for (const url of candidateUrls) {
        try {
          const response = await fetch(url, { cache: "no-store" });
          if (!response.ok) {
            continue;
          }

          const payload = (await response.json()) as NeighborhoodFeatureCollection;
          const hasFeatures =
            payload?.type === "FeatureCollection" &&
            Array.isArray(payload.features) &&
            payload.features.length > 0;

          if (active && hasFeatures) {
            setNeighborhoodsData(payload);
            return;
          }
        } catch {
          continue;
        }
      }

      if (active) {
        setNeighborhoodsData(null);
      }
    }

    void loadNeighborhoods();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="relative h-full min-h-[520px] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <MapContainer
        center={[-27.5949, -48.5482]}
        zoom={12}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <MapCenterController property={focusedProperty} />

        {showNeighborhoodLayer && neighborhoodsData?.features?.length ? (
          <GeoJSON
            data={neighborhoodsData as unknown as GeoJSON.GeoJsonObject}
            style={(feature) => {
              const neighborhoodName = feature
                ? getNeighborhoodName(feature as unknown as NeighborhoodFeature)
                : null;
              const isSelected =
                Boolean(neighborhoodName) &&
                Boolean(selectedNeighborhood) &&
                neighborhoodName?.toLowerCase() === selectedNeighborhood?.toLowerCase();

              return {
                color: isSelected ? "#1D4ED8" : "#60A5FA",
                weight: isSelected ? 2.4 : 1.4,
                dashArray: "8 6",
                lineCap: "round",
                fillColor: isSelected ? "#3B82F6" : "#93C5FD",
                fillOpacity: isSelected ? 0.22 : 0.12,
              };
            }}
            onEachFeature={(feature, layer) => {
              const neighborhoodName = getNeighborhoodName(feature as unknown as NeighborhoodFeature);

              if (!neighborhoodName) {
                return;
              }

              layer.bindTooltip(neighborhoodName, {
                sticky: true,
              });

              layer.on({
                click: () => {
                  onSelectNeighborhood?.(toCanonicalNeighborhood(neighborhoodName));
                },
              });
            }}
          />
        ) : null}

        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.latitude, property.longitude]}
            icon={markerIcon}
            eventHandlers={{
              click: () => {
                onSelectProperty(property.id);
                setSelectedProperty(property);
              },
            }}
          >
            <Tooltip direction="top" opacity={1}>
              <div className="w-48">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="mb-2 h-20 w-full rounded object-cover"
                />
                <p className="text-xs font-semibold text-[#0A1F44]">{formatCurrency(property.price)}</p>
                <p className="line-clamp-1 text-xs text-slate-800">{property.type}</p>
                <p className="line-clamp-1 text-xs text-slate-600">{property.neighborhood}</p>
              </div>
            </Tooltip>
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold text-[#0A1F44]">{formatCurrency(property.price)}</p>
                <p className="text-sm text-slate-800">{property.title}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <button
        type="button"
        role="switch"
        aria-checked={showNeighborhoodLayer}
        onClick={() => {
          const nextValue = !showNeighborhoodLayer;
          setShowNeighborhoodLayer(nextValue);

          if (!nextValue) {
            onSelectNeighborhood?.(null);
          }
        }}
        className="absolute right-4 top-4 z-[450] inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#0A1F44] shadow-sm transition hover:bg-blue-50"
      >
        <span>Bairros</span>
        <span
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
            showNeighborhoodLayer ? "bg-blue-600" : "bg-slate-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
              showNeighborhoodLayer ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </span>
      </button>

      {selectedNeighborhood ? (
        <button
          type="button"
          onClick={() => onSelectNeighborhood?.(null)}
          className="absolute left-4 top-4 z-[450] rounded-md border border-blue-200 bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#0A1F44] shadow-sm transition hover:bg-blue-50"
        >
          {selectedNeighborhood} · limpar filtro
        </button>
      ) : null}

      {showNeighborhoodLayer && !neighborhoodsData?.features?.length ? (
        <div className="pointer-events-none absolute left-4 top-14 z-[430] rounded-md border border-amber-200 bg-amber-50/95 px-3 py-1.5 text-xs font-medium text-amber-700 shadow-sm">
          Carregue um GeoJSON real de bairros para ver as divisões oficiais.
        </div>
      ) : null}

      <AnimatePresence>
        {selectedProperty ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[500] flex items-center justify-center bg-slate-950/50 p-4"
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-2xl rounded-2xl bg-white p-4 shadow-xl"
            >
              <div className="mb-4 grid gap-2 sm:grid-cols-2">
                {selectedProperty.images.slice(0, 4).map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt={selectedProperty.title}
                    className="h-40 w-full rounded-lg object-cover"
                  />
                ))}
              </div>
              <h3 className="text-xl font-semibold text-[#0A1F44]">{selectedProperty.title}</h3>
              <p className="mb-2 text-lg font-semibold text-slate-900">
                {formatCurrency(selectedProperty.price)}
              </p>
              <p className="mb-4 text-sm text-slate-600">{selectedProperty.description}</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`/properties/${selectedProperty.id}`}
                  className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-[#0A1F44] transition hover:bg-slate-50"
                >
                  {translate("common.viewDetails")}
                </a>
                <a
                  href={createWhatsAppLink({
                    propertyTitle: selectedProperty.title,
                    locale,
                    propertyUrl:
                      typeof window !== "undefined"
                        ? `${window.location.origin}/properties/${selectedProperty.id}`
                        : `/properties/${selectedProperty.id}`,
                  })}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-lg bg-[#0A1F44] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#16356f]"
                >
                  {translate("properties.mapButton")}
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
