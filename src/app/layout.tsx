import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { LocaleProvider } from "@/components/i18n/locale-provider";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { getServerI18n } from "@/lib/i18n";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Imóvel em Floripa | Logo Oficial",
    template: "%s | Imóvel em Floripa",
  },
  description:
    "Professional real estate platform for houses, apartments, and SPE opportunities in Florianópolis - SC.",
  metadataBase: new URL("https://www.imovelemfloripa.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Imóvel em Floripa",
    description: "Find your ideal property in Florianópolis.",
    type: "website",
    locale: "pt_BR",
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: ["/logo.png"],
    apple: [{ url: "/logo.png" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<JSX.Element> {
  const { locale, dictionary } = await getServerI18n();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} antialiased`}>
        <LocaleProvider initialLocale={locale} initialDictionary={dictionary}>
          <div className="min-h-screen bg-slate-50 text-slate-900">
            <Navbar />
            {children}
            <Footer />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
