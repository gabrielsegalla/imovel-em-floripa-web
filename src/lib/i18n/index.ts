import { cookies } from "next/headers";

import { messages, type Messages } from "@/lib/i18n/messages";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/types";

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}

export async function getLocaleFromCookies(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("site_locale")?.value;

  if (locale && isLocale(locale)) {
    return locale;
  }

  return DEFAULT_LOCALE;
}

export async function getServerI18n(): Promise<{ locale: Locale; dictionary: Messages }> {
  const locale = await getLocaleFromCookies();
  return {
    locale,
    dictionary: getMessages(locale),
  };
}

export function t(dictionary: Messages, path: string): string {
  const value = path.split(".").reduce<unknown>((accumulator, key) => {
    if (accumulator && typeof accumulator === "object" && key in accumulator) {
      return (accumulator as Record<string, unknown>)[key];
    }

    return undefined;
  }, dictionary);

  return typeof value === "string" ? value : path;
}

export type { Messages };
