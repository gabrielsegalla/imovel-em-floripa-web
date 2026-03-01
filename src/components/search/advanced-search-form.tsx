"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLocale } from "@/components/i18n/locale-provider";
import {
  FLORIANOPOLIS_NEIGHBORHOODS,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
} from "@/lib/constants/florianopolis-neighborhoods";

type AdvancedSearchFormProps = {
  initialValues?: Record<string, string | number | undefined>;
  compact?: boolean;
};

function getDefaultValue(
  values: Record<string, string | number | undefined> | undefined,
  key: string,
): string {
  const value = values?.[key];
  return value === undefined || value === null ? "" : String(value);
}

function toQueryString(formData: FormData): string {
  const params = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string") {
      continue;
    }

    if (!value.trim()) {
      continue;
    }

    params.set(key, value.trim());
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

export function AdvancedSearchForm({ initialValues, compact = false }: AdvancedSearchFormProps): JSX.Element {
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

  const wrapperClass = compact
    ? "grid grid-cols-1 gap-3"
    : "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4";

  const fieldClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-[#0A1F44] focus:ring-2 focus:ring-blue-100";

  return (
    <form action={onSubmit} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className={wrapperClass}>
        <input
          name="search"
          defaultValue={getDefaultValue(initialValues, "search")}
          placeholder={translate("properties.toolbarSearchPlaceholder")}
          className={fieldClass}
        />

        <select name="neighborhood" defaultValue={getDefaultValue(initialValues, "neighborhood")} className={fieldClass}>
          <option value="">{translate("common.neighborhood")}</option>
          {FLORIANOPOLIS_NEIGHBORHOODS.map((neighborhood) => (
            <option key={neighborhood} value={neighborhood}>
              {neighborhood}
            </option>
          ))}
        </select>

        <select name="type" defaultValue={getDefaultValue(initialValues, "type")} className={fieldClass}>
          <option value="">{translate("common.type")}</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {getPropertyTypeLabel(type, translate)}
            </option>
          ))}
        </select>

        <select name="status" defaultValue={getDefaultValue(initialValues, "status")} className={fieldClass}>
          <option value="">{translate("common.status")}</option>
          {PROPERTY_STATUSES.map((status) => (
            <option key={status} value={status}>
              {getStatusLabel(status, translate)}
            </option>
          ))}
        </select>

        <input type="number" min={0} name="bedrooms" defaultValue={getDefaultValue(initialValues, "bedrooms")} placeholder={translate("common.bedrooms")} className={fieldClass} />
        <input type="number" min={0} name="bathrooms" defaultValue={getDefaultValue(initialValues, "bathrooms")} placeholder={translate("common.bathrooms")} className={fieldClass} />
        <input type="number" min={0} name="livingRooms" defaultValue={getDefaultValue(initialValues, "livingRooms")} placeholder={translate("common.livingRooms")} className={fieldClass} />
        <input type="number" min={0} name="parkingSpots" defaultValue={getDefaultValue(initialValues, "parkingSpots")} placeholder={translate("common.parkingSpots")} className={fieldClass} />
        <input type="number" min={0} name="minArea" defaultValue={getDefaultValue(initialValues, "minArea")} placeholder={translate("common.minArea")} className={fieldClass} />
        <input type="number" min={0} name="minPrice" defaultValue={getDefaultValue(initialValues, "minPrice")} placeholder={translate("common.minPrice")} className={fieldClass} />
        <input type="number" min={0} name="maxPrice" defaultValue={getDefaultValue(initialValues, "maxPrice")} placeholder={translate("common.maxPrice")} className={fieldClass} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-lg bg-[#0A1F44] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#16356f] disabled:opacity-60"
      >
        {isSubmitting ? translate("common.searching") : translate("home.cta")}
      </button>
    </form>
  );
}
