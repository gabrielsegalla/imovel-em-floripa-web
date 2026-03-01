import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { getServerI18n, t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Contact | Imóvel em Floripa",
  description: "Contact Sylvio Segalla Junior to schedule visits and get support for properties in Florianópolis.",
};

export default async function ContactPage(): Promise<JSX.Element> {
  const { dictionary } = await getServerI18n();

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-[#0A1F44]">{t(dictionary, "contact.title")}</h1>
        <p className="text-sm text-slate-600">
          {t(dictionary, "contact.description")}
        </p>

        <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-sm text-slate-700">
          <p className="font-semibold text-[#0A1F44]">Sylvio Segalla Junior</p>
          <p>WhatsApp: +55 (48) 98405-5408</p>
          <p>Email: larfloripa@yahoo.com.br</p>
          <a
            href="https://wa.me/5548984055408"
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-lg bg-[#0A1F44] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#16356f]"
          >
            {t(dictionary, "contact.whatsappButton")}
          </a>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
