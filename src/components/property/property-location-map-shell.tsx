"use client";

import dynamic from "next/dynamic";

type PropertyLocationMapProps = {
  latitude: number;
  longitude: number;
};

const DynamicPropertyLocationMap = dynamic(
  () => import("@/components/property/property-location-map").then((module) => module.PropertyLocationMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-slate-200" />
    ),
  },
);

export function PropertyLocationMapShell({ latitude, longitude }: PropertyLocationMapProps): JSX.Element {
  return <DynamicPropertyLocationMap latitude={latitude} longitude={longitude} />;
}
