import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Imóvel em Floripa",
  description: "Protected administration area for property management.",
};

export default function AdminPage(): JSX.Element {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-[#0A1F44]">Admin Dashboard Placeholder</h1>
        <p className="mt-2 text-sm text-slate-600">
          This route is reserved for the protected dashboard and ready for authentication integration.
        </p>
      </section>
    </main>
  );
}
