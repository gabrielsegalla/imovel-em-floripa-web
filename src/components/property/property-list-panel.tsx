"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/locale-provider";
import type { Property } from "@/lib/types/property";
import { formatCurrency } from "@/lib/utils/format";

type SortOption = "featured" | "newest" | "priceAsc" | "priceDesc";

type PropertyListPanelProps = {
  properties: Property[];
  onFocusProperty: (propertyId: string) => void;
  sortBy: SortOption;
  onChangeSort: (value: SortOption) => void;
};

export function PropertyListPanel({
  properties,
  onFocusProperty,
  sortBy,
  onChangeSort,
}: PropertyListPanelProps): JSX.Element {
  const { locale, translate } = useLocale();

  return (
    <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:h-full">
      <header className="border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-[#0A1F44]">{translate("properties.listTitle")}</h1>
            <p className="text-sm text-slate-600">
              {properties.length.toLocaleString(locale === "pt" ? "pt-BR" : locale)} {translate("properties.results")}
            </p>
          </div>

          <select
            value={sortBy}
            onChange={(event) => onChangeSort(event.target.value as SortOption)}
            className="h-9 rounded-md border border-slate-300 px-3 text-sm text-slate-700 outline-none transition focus:border-[#0A1F44] focus:ring-2 focus:ring-blue-100"
          >
            <option value="featured">{translate("properties.sortFeatured")}</option>
            <option value="newest">{translate("properties.sortNewest")}</option>
            <option value="priceAsc">{translate("properties.sortPriceAsc")}</option>
            <option value="priceDesc">{translate("properties.sortPriceDesc")}</option>
          </select>
        </div>
      </header>

      <div className="max-h-[60vh] overflow-y-auto p-3 xl:h-[calc(100%-74px)] xl:max-h-none">
        {properties.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {properties.map((property) => (
              <article
                key={property.id}
                onClick={() => onFocusProperty(property.id)}
                className="cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-md"
              >
                <div className="h-36 overflow-hidden bg-slate-100">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="space-y-1 p-3">
                  <p className="text-lg font-semibold text-[#0A1F44]">{formatCurrency(property.price)}</p>
                  <p className="line-clamp-1 text-sm font-semibold text-slate-900">{property.title}</p>
                  <p className="line-clamp-1 text-xs text-slate-600">
                    {property.bedrooms} {translate("common.beds")} · {property.bathrooms} {translate("common.baths")} · {property.area} m²
                  </p>
                  <p className="line-clamp-1 text-xs text-slate-500">{property.neighborhood}</p>
                  <Link
                    href={`/properties/${property.id}`}
                    className="inline-flex pt-1 text-xs font-semibold text-[#0A1F44] hover:underline"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {translate("common.viewDetails")}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-600">
            {translate("properties.noResults")}
          </p>
        )}
      </div>
    </aside>
  );
}
