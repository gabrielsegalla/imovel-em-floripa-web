"use client";

import type { Property } from "@/lib/types/property";
import { formatCurrency } from "@/lib/utils/format";
import { AdvancedSearchForm } from "@/components/search/advanced-search-form";

type PropertySidebarProps = {
  properties: Property[];
  onFocusProperty: (propertyId: string) => void;
  initialFilters: Record<string, string | number | undefined>;
};

export function PropertySidebar({
  properties,
  onFocusProperty,
  initialFilters,
}: PropertySidebarProps): JSX.Element {
  return (
    <aside className="h-full border-l border-slate-200 bg-white shadow-[-6px_0_16px_rgba(2,6,23,0.05)]">
      <div className="h-full space-y-4 overflow-y-auto p-4">
        <h1 className="text-lg font-semibold text-[#0A1F44]">Properties in Florianópolis</h1>
        <AdvancedSearchForm compact initialValues={initialFilters} />

        <div className="space-y-3">
          {properties.map((property) => (
            <button
              key={property.id}
              type="button"
              onClick={() => onFocusProperty(property.id)}
              className="w-full rounded-xl border border-slate-200 p-3 text-left transition hover:border-blue-200 hover:bg-blue-50"
            >
              <p className="text-sm font-semibold text-[#0A1F44]">{formatCurrency(property.price)}</p>
              <p className="line-clamp-1 text-sm font-medium text-slate-900">{property.title}</p>
              <p className="text-xs text-slate-600">
                {property.type} · {property.neighborhood}
              </p>
            </button>
          ))}

          {!properties.length ? (
            <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600">
              No properties found with the selected filters.
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
