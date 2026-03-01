import Link from "next/link";
import type { Metadata } from "next";

import { PropertyCard } from "@/components/property/property-card";
import { AdvancedSearchForm } from "@/components/search/advanced-search-form";
import { getServerI18n, t } from "@/lib/i18n";
import { getLatestProperties } from "@/server/services/property-service";
import { serializeProperties } from "@/server/services/property-serializer";

export const metadata: Metadata = {
  title: "Imóvel em Floripa",
  description:
    "Explore premium houses, apartments, and SPE investments in Florianópolis with advanced real estate search.",
};

export const dynamic = "force-dynamic";

export default async function Home(): Promise<JSX.Element> {
  const { dictionary } = await getServerI18n();
  const latestEntities = await getLatestProperties(6).catch(() => []);
  const latestProperties = serializeProperties(latestEntities);

  return (
    <main className="space-y-14 pb-14">
      <section className="relative overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F44]/80 via-[#0A1F44]/65 to-blue-500/40" />

        <div className="relative z-10 mx-auto flex min-h-[520px] w-full max-w-7xl flex-col justify-center gap-6 px-4 py-16 text-white sm:px-6 lg:px-8">
          <p className="w-fit rounded-full border border-blue-100/40 bg-blue-100/10 px-3 py-1 text-xs uppercase tracking-wide">
            {t(dictionary, "home.badge")}
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            {t(dictionary, "home.title")}
          </h1>
          <p className="max-w-2xl text-sm text-blue-100 sm:text-base">
            {t(dictionary, "home.description")}
          </p>
          <div>
            <Link
              href="/properties"
              className="inline-flex rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#0A1F44] transition hover:bg-blue-100"
            >
              {t(dictionary, "home.cta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-4">
          <h2 className="text-2xl font-semibold text-[#0A1F44]">{t(dictionary, "home.advancedSearchTitle")}</h2>
          <p className="text-sm text-slate-600">
            {t(dictionary, "home.advancedSearchDescription")}
          </p>
        </header>
        <AdvancedSearchForm />
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[#0A1F44]">{t(dictionary, "home.latestTitle")}</h2>
            <p className="text-sm text-slate-600">{t(dictionary, "home.latestDescription")}</p>
          </div>
          <Link href="/properties" className="text-sm font-semibold text-[#0A1F44] hover:underline">
            {t(dictionary, "home.viewAll")}
          </Link>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {latestProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {!latestProperties.length ? (
          <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-600">
            {t(dictionary, "home.empty")}
          </p>
        ) : null}
      </section>
    </main>
  );
}
