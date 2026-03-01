import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PropertyGallery } from "@/components/property/property-gallery";
import { PropertyLocationMapShell } from "@/components/property/property-location-map-shell";
import { getServerI18n, t } from "@/lib/i18n";
import { createWhatsAppLink, formatArea, formatCurrency } from "@/lib/utils/format";
import { getPropertyById } from "@/server/services/property-service";
import { serializeProperty } from "@/server/services/property-serializer";

type PropertyDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PropertyDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    return {
      title: "Property not found | Imóvel em Floripa",
    };
  }

  return {
    title: `${property.title} | Imóvel em Floripa`,
    description: property.description.slice(0, 160),
  };
}

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps): Promise<JSX.Element> {
  const { dictionary, locale } = await getServerI18n();
  const { id } = await params;
  const propertyEntity = await getPropertyById(id);

  if (!propertyEntity) {
    notFound();
  }

  const property = serializeProperty(propertyEntity);
  const statusLabel = property.status === "Sale" ? t(dictionary, "common.sale") : t(dictionary, "common.rent");
  const siteOrigin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const normalizedSiteOrigin = siteOrigin.replace(/\/$/, "");
  const propertyUrl = `${normalizedSiteOrigin}/properties/${property.id}`;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <nav>
        <Link href="/properties" className="text-sm font-medium text-[#0A1F44] hover:underline">
          {t(dictionary, "propertyDetails.back")}
        </Link>
      </nav>

      <PropertyGallery title={property.title} images={property.images} />

      <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <article className="space-y-6">
          <header className="space-y-2">
            <p className="text-3xl font-semibold text-[#0A1F44]">{formatCurrency(property.price)}</p>
            <h1 className="text-2xl font-semibold text-slate-900">{property.title}</h1>
            <p className="text-sm text-slate-600">{property.neighborhood} · Florianópolis - SC</p>
          </header>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">{t(dictionary, "propertyDetails.description")}</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">{property.description}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">{t(dictionary, "propertyDetails.technical")}</h2>
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 p-4 text-sm text-slate-700 sm:grid-cols-4">
              <p>{property.bedrooms} {t(dictionary, "common.bedrooms")}</p>
              <p>{property.bathrooms} {t(dictionary, "common.bathrooms")}</p>
              <p>{property.livingRooms} {t(dictionary, "common.livingRooms")}</p>
              <p>{property.parkingSpots} {t(dictionary, "common.parkingSpots")}</p>
              <p>{formatArea(property.area)}</p>
              <p>{property.type}</p>
              <p>{statusLabel}</p>
              <p>{property.featured ? t(dictionary, "propertyDetails.featured") : t(dictionary, "propertyDetails.standard")}</p>
            </div>
          </section>
        </article>

        <aside className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">{t(dictionary, "propertyDetails.location")}</h2>
          <PropertyLocationMapShell latitude={property.latitude} longitude={property.longitude} />
          <a
            href={createWhatsAppLink({
              propertyTitle: property.title,
              locale,
              propertyUrl,
            })}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#0A1F44] px-4 text-sm font-semibold text-white transition hover:bg-[#16356f]"
          >
            {t(dictionary, "propertyDetails.schedule")}
          </a>
        </aside>
      </section>
    </main>
  );
}
