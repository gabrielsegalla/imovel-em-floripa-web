"use client";

import Image from "next/image";
import Link from "next/link";

import { useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/lib/i18n/types";

type LocaleOption = {
  value: Locale;
  label: string;
};

const localeOptions: LocaleOption[] = [
  { value: "pt", label: "Português" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

function FlagIcon({ locale }: { locale: Locale }): JSX.Element {
  if (locale === "pt") {
    return (
      <svg viewBox="0 0 24 16" className="h-4 w-6 rounded-[2px]" aria-hidden="true">
        <rect width="24" height="16" fill="#009B3A" />
        <polygon points="12,2 21,8 12,14 3,8" fill="#FFDF00" />
        <circle cx="12" cy="8" r="3.2" fill="#002776" />
      </svg>
    );
  }

  if (locale === "en") {
    return (
      <svg viewBox="0 0 24 16" className="h-4 w-6 rounded-[2px]" aria-hidden="true">
        <rect width="24" height="16" fill="#B22234" />
        <rect y="2" width="24" height="2" fill="#FFFFFF" />
        <rect y="6" width="24" height="2" fill="#FFFFFF" />
        <rect y="10" width="24" height="2" fill="#FFFFFF" />
        <rect y="14" width="24" height="2" fill="#FFFFFF" />
        <rect width="10" height="8" fill="#3C3B6E" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 16" className="h-4 w-6 rounded-[2px]" aria-hidden="true">
      <rect width="24" height="16" fill="#AA151B" />
      <rect y="4" width="24" height="8" fill="#F1BF00" />
    </svg>
  );
}

export function Navbar(): JSX.Element {
  const { locale, setLocale, translate } = useLocale();

  const navItems = [
    { href: "/", label: translate("nav.home") },
    { href: "/properties", label: translate("nav.properties") },
    { href: "/contact", label: translate("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex min-h-[4.75rem] w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/logo.png"
            alt="Imóvel em Floripa"
            width={500}
            height={120}
            priority
            className="h-11 w-auto sm:h-12 logo"
          />
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <nav className="flex items-center gap-1 text-sm font-medium text-slate-600 sm:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2.5 py-2 transition-colors hover:bg-slate-100 hover:text-[#0A1F44] sm:px-3"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-white p-1">
            <span className="sr-only">{translate("nav.language")}</span>
            {localeOptions.map((option) => {
              const isActive = locale === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setLocale(option.value)}
                  className={`inline-flex h-8 w-10 items-center justify-center rounded transition ${
                    isActive ? "bg-blue-100 ring-1 ring-[#0A1F44]/20" : "hover:bg-slate-100"
                  }`}
                  aria-label={option.label}
                  title={option.label}
                >
                  <FlagIcon locale={option.value} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
