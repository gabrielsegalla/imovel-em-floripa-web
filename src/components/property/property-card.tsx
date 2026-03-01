"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { useLocale } from "@/components/i18n/locale-provider";
import type { Property } from "@/lib/types/property";
import { formatArea, formatCurrency } from "@/lib/utils/format";

type PropertyCardProps = {
  property: Property;
};

function Badge({ label, tone }: { label: string; tone: "sale" | "rent" | "featured" }): JSX.Element {
  const toneClass =
    tone === "featured"
      ? "bg-[#0A1F44] text-white"
      : tone === "sale"
        ? "bg-blue-100 text-blue-900"
        : "bg-slate-200 text-slate-800";

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${toneClass}`}>{label}</span>
  );
}

export function PropertyCard({ property }: PropertyCardProps): JSX.Element {
  const { translate } = useLocale();
  const statusLabel = property.status === "Sale" ? translate("common.sale") : translate("common.rent");

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <Link href={`/properties/${property.id}`} className="block">
        <div className="relative h-56 w-full overflow-hidden bg-slate-100">
          <img
            src={property.images[0]}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge label={statusLabel} tone={property.status === "Sale" ? "sale" : "rent"} />
            {property.featured ? <Badge label={translate("common.featured")} tone="featured" /> : null}
          </div>
        </div>
        <div className="space-y-3 p-4">
          <div>
            <p className="text-xl font-semibold text-[#0A1F44]">{formatCurrency(property.price)}</p>
            <h3 className="line-clamp-1 text-base font-semibold text-slate-900">{property.title}</h3>
            <p className="text-sm text-slate-600">{property.neighborhood}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 sm:text-sm">
            <span>{property.bedrooms} {translate("common.beds")}</span>
            <span>{property.bathrooms} {translate("common.baths")}</span>
            <span>{property.parkingSpots} {translate("common.parking")}</span>
            <span>{formatArea(property.area)}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
