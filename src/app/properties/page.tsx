import type { Metadata } from "next";

import { PropertiesPageClient } from "@/components/property/properties-page-client";

type PropertiesPageProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export const metadata: Metadata = {
  title: "Properties in Florianópolis | Imóvel em Floripa",
  description:
    "Explore houses, apartments, and SPE developments in Florianópolis with interactive map and smart filters.",
};

export default async function PropertiesPage({ searchParams }: PropertiesPageProps): Promise<JSX.Element> {
  const params = await searchParams;

  return (
    <main className="py-3">
      <PropertiesPageClient initialFilters={params} />
    </main>
  );
}
