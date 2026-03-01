"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { messages, type Messages } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/i18n/types";

type LocaleContextValue = {
  locale: Locale;
  dictionary: Messages;
  setLocale: (locale: Locale) => void;
  translate: (path: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function translatePath(dictionary: Messages, path: string): string {
  const value = path.split(".").reduce<unknown>((accumulator, key) => {
    if (accumulator && typeof accumulator === "object" && key in accumulator) {
      return (accumulator as Record<string, unknown>)[key];
    }

    return undefined;
  }, dictionary);

  return typeof value === "string" ? value : path;
}

type LocaleProviderProps = {
  initialLocale: Locale;
  initialDictionary: Messages;
  children: React.ReactNode;
};

export function LocaleProvider({
  initialLocale,
  initialDictionary,
  children,
}: LocaleProviderProps): JSX.Element {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [dictionary, setDictionary] = useState<Messages>(initialDictionary);
  const router = useRouter();

  function setLocale(nextLocale: Locale): void {
    if (nextLocale === locale) {
      return;
    }

    document.cookie = `site_locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    setLocaleState(nextLocale);
    setDictionary(messages[nextLocale]);
    router.refresh();
  }

  const value: LocaleContextValue = {
    locale,
    dictionary,
    setLocale,
    translate: (path: string) => translatePath(dictionary, path),
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }

  return context;
}
