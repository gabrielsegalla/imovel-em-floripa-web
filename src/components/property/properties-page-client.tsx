"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { PropertyCardSkeleton } from "@/components/property/property-card-skeleton";
import { PropertyListPanel } from "@/components/property/property-list-panel";
import { PropertiesToolbar } from "@/components/property/properties-toolbar";
import type { Property } from "@/lib/types/property";

const DynamicPropertiesMap = dynamic(
  () => import("@/components/property/properties-map").then((module) => module.PropertiesMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[520px] w-full animate-pulse rounded-2xl border border-slate-200 bg-slate-200" />
    ),
  },
);

type PropertiesPageClientProps = {
  initialFilters: Record<string, string | number | undefined>;
};

type SortOption = "featured" | "newest" | "priceAsc" | "priceDesc";

function buildQuery(filters: Record<string, string | number | undefined>): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null || value === "") {
      continue;
    }

    params.set(key, String(value));
  }

  return params.toString();
}

export function PropertiesPageClient({ initialFilters }: PropertiesPageClientProps): JSX.Element {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [focusedPropertyId, setFocusedPropertyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const queryString = useMemo(() => buildQuery(initialFilters), [initialFilters]);
  const selectedNeighborhood =
    typeof initialFilters.neighborhood === "string" ? initialFilters.neighborhood : undefined;

  function handleSelectNeighborhood(neighborhood: string | null): void {
    const params = new URLSearchParams(queryString);

    if (neighborhood) {
      params.set("neighborhood", neighborhood);
    } else {
      params.delete("neighborhood");
    }

    const nextQuery = params.toString();
    router.push(nextQuery ? `/properties?${nextQuery}` : "/properties");
  }

  const sortedProperties = useMemo(() => {
    const cloned = [...properties];

    if (sortBy === "priceAsc") {
      cloned.sort((a, b) => a.price - b.price);
      return cloned;
    }

    if (sortBy === "priceDesc") {
      cloned.sort((a, b) => b.price - a.price);
      return cloned;
    }

    if (sortBy === "newest") {
      cloned.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      return cloned;
    }

    cloned.sort((a, b) => {
      if (a.featured === b.featured) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      return a.featured ? -1 : 1;
    });

    return cloned;
  }, [properties, sortBy]);

  useEffect(() => {
    let active = true;

    async function loadProperties(): Promise<void> {
      setIsLoading(true);
      const endpoint = queryString ? `/api/properties?${queryString}` : "/api/properties";
      const response = await fetch(endpoint, { cache: "no-store" });

      if (!response.ok) {
        if (active) {
          setProperties([]);
          setIsLoading(false);
        }
        return;
      }

      const payload = (await response.json()) as Property[];

      if (active) {
        setProperties(payload);
        setFocusedPropertyId(payload[0]?.id ?? null);
        setIsLoading(false);
      }
    }

    void loadProperties();

    return () => {
      active = false;
    };
  }, [queryString]);

  return (
    <section className="mx-auto w-full max-w-[1800px] px-4 pb-6 sm:px-6 lg:px-8">
      <div className="mb-3">
        <PropertiesToolbar key={queryString || "all"} initialFilters={initialFilters} />
      </div>

      <div className="grid gap-3 xl:h-[calc(100vh-11.5rem)] xl:grid-cols-[58%_42%]">
        <div className="h-full min-h-[420px] xl:min-h-0">
          {isLoading ? (
            <div className="grid h-full gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <DynamicPropertiesMap
              properties={sortedProperties}
              focusedPropertyId={focusedPropertyId}
              onSelectProperty={setFocusedPropertyId}
              selectedNeighborhood={selectedNeighborhood}
              onSelectNeighborhood={handleSelectNeighborhood}
            />
          )}
        </div>

        <PropertyListPanel
          properties={sortedProperties}
          onFocusProperty={setFocusedPropertyId}
          sortBy={sortBy}
          onChangeSort={setSortBy}
        />
      </div>
    </section>
  );
}
