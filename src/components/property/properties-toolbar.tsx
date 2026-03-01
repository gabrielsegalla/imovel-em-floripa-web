"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLocale } from "@/components/i18n/locale-provider";
import {
  FLORIANOPOLIS_NEIGHBORHOODS,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
} from "@/lib/constants/florianopolis-neighborhoods";

type PropertiesToolbarProps = {
  initialFilters: Record<string, string | number | undefined>;
};

function getDefaultValue(values: Record<string, string | number | undefined>, key: string): string {
  const value = values[key];
  return value === undefined || value === null ? "" : String(value);
}

function toQueryString(formData: FormData): string {
  const params = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string") {
      continue;
    }

    const normalized = value.trim();
    if (!normalized) {
      continue;
    }

    params.set(key, normalized);
  }

  return params.toString();
}

function getPropertyTypeLabel(type: string, translate: (path: string) => string): string {
  if (type === "House") {
    return translate("common.house");
  }

  if (type === "Apartment") {
    return translate("common.apartment");
  }

  return translate("common.spe");
}

function getStatusLabel(status: string, translate: (path: string) => string): string {
  return status === "Sale" ? translate("common.sale") : translate("common.rent");
}

export function PropertiesToolbar({ initialFilters }: PropertiesToolbarProps): JSX.Element {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { translate } = useLocale();

  async function onSubmit(formData: FormData): Promise<void> {
    setIsSubmitting(true);
    const queryString = toQueryString(formData);
    const target = queryString ? `/properties?${queryString}` : "/properties";
    router.push(target);
    setIsSubmitting(false);
  }

  const baseFieldClass =
    "h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-[#0A1F44] focus:ring-2 focus:ring-blue-100";

  return (
    <form action={onSubmit} className="flex w-full flex-wrap items-end gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <div className="flex min-w-[180px] flex-1 flex-col gap-1">
        <label htmlFor="property-search" className="text-[11px] font-medium text-slate-600">
          {translate("common.search")}
        </label>
        <input
          id="property-search"
          name="search"
          defaultValue={getDefaultValue(initialFilters, "search")}
          placeholder={translate("properties.toolbarSearchPlaceholder")}
          className={`${baseFieldClass}`}
        />
      </div>

      <div className="flex min-w-[120px] flex-col gap-1">
        <label htmlFor="property-status" className="text-[11px] font-medium text-slate-600">
          {translate("properties.toolbarStatus")}
        </label>
        <select id="property-status" name="status" defaultValue={getDefaultValue(initialFilters, "status")} className={`${baseFieldClass}`}>
          <option value="">{translate("properties.toolbarStatusAll")}</option>
          {PROPERTY_STATUSES.map((status) => (
            <option key={status} value={status}>
              {getStatusLabel(status, translate)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex min-w-[120px] flex-col gap-1">
        <label htmlFor="property-type" className="text-[11px] font-medium text-slate-600">
          {translate("properties.toolbarType")}
        </label>
        <select id="property-type" name="type" defaultValue={getDefaultValue(initialFilters, "type")} className={`${baseFieldClass}`}>
          <option value="">{translate("properties.toolbarTypeAll")}</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {getPropertyTypeLabel(type, translate)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex min-w-[170px] flex-col gap-1">
        <label htmlFor="property-neighborhood" className="text-[11px] font-medium text-slate-600">
          {translate("common.neighborhood")}
        </label>
        <select id="property-neighborhood" name="neighborhood" defaultValue={getDefaultValue(initialFilters, "neighborhood")} className={`${baseFieldClass}`}>
          <option value="">{translate("properties.toolbarNeighborhoodAll")}</option>
          {FLORIANOPOLIS_NEIGHBORHOODS.map((neighborhood) => (
            <option key={neighborhood} value={neighborhood}>
              {neighborhood}
            </option>
          ))}
        </select>
      </div>

      <div className="flex w-[110px] flex-col gap-1 sm:w-[120px]">
        <label htmlFor="property-min-price" className="text-[11px] font-medium text-slate-600">
          {translate("common.minPrice")}
        </label>
        <input
          id="property-min-price"
          type="number"
          min={0}
          name="minPrice"
          defaultValue={getDefaultValue(initialFilters, "minPrice")}
          placeholder={translate("common.minPrice")}
          className={`${baseFieldClass}`}
        />
      </div>

      <div className="flex w-[110px] flex-col gap-1 sm:w-[120px]">
        <label htmlFor="property-max-price" className="text-[11px] font-medium text-slate-600">
          {translate("common.maxPrice")}
        </label>
        <input
          id="property-max-price"
          type="number"
          min={0}
          name="maxPrice"
          defaultValue={getDefaultValue(initialFilters, "maxPrice")}
          placeholder={translate("common.maxPrice")}
          className={`${baseFieldClass}`}
        />
      </div>

      <div className="flex w-[90px] flex-col gap-1">
        <label htmlFor="property-bedrooms" className="text-[11px] font-medium text-slate-600">
          {translate("common.bedrooms")}
        </label>
        <input
          id="property-bedrooms"
          type="number"
          min={0}
          name="bedrooms"
          defaultValue={getDefaultValue(initialFilters, "bedrooms")}
          placeholder={translate("common.bedrooms")}
          className={`${baseFieldClass}`}
        />
      </div>

      <div className="flex w-[90px] flex-col gap-1">
        <label htmlFor="property-bathrooms" className="text-[11px] font-medium text-slate-600">
          {translate("common.bathrooms")}
        </label>
        <input
          id="property-bathrooms"
          type="number"
          min={0}
          name="bathrooms"
          defaultValue={getDefaultValue(initialFilters, "bathrooms")}
          placeholder={translate("common.bathrooms")}
          className={`${baseFieldClass}`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-10 items-center justify-center rounded-md bg-[#0A1F44] px-4 text-sm font-semibold text-white transition hover:bg-[#16356f] disabled:opacity-60"
      >
        {isSubmitting ? translate("common.searching") : translate("common.search")}
      </button>
    </form>
  );
}
