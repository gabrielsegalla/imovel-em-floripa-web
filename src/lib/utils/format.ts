export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function formatArea(area: number): string {
  return `${area} m²`;
}

type SupportedLocale = "pt" | "en" | "es";

type CreateWhatsAppLinkParams = {
  propertyTitle: string;
  locale?: SupportedLocale;
  propertyUrl?: string;
};

function normalizeLocale(locale?: string): SupportedLocale {
  if (locale === "en" || locale === "es") {
    return locale;
  }

  return "pt";
}

function buildWhatsAppMessage({
  propertyTitle,
  locale,
  propertyUrl,
}: {
  propertyTitle: string;
  locale: SupportedLocale;
  propertyUrl?: string;
}): string {
  if (locale === "en") {
    return propertyUrl
      ? `Hello Sylvio, I am interested in this property: ${propertyTitle}\nLink: ${propertyUrl}`
      : `Hello Sylvio, I am interested in this property: ${propertyTitle}`;
  }

  if (locale === "es") {
    return propertyUrl
      ? `Hola Sylvio, estoy interesado en esta propiedad: ${propertyTitle}\nEnlace: ${propertyUrl}`
      : `Hola Sylvio, estoy interesado en esta propiedad: ${propertyTitle}`;
  }

  return propertyUrl
    ? `Olá Sylvio, tenho interesse neste imóvel: ${propertyTitle}\nLink: ${propertyUrl}`
    : `Olá Sylvio, tenho interesse neste imóvel: ${propertyTitle}`;
}

export function createWhatsAppLink(input: string | CreateWhatsAppLinkParams): string {
  const options = typeof input === "string" ? { propertyTitle: input } : input;
  const locale = normalizeLocale(options.locale);
  const message = buildWhatsAppMessage({
    propertyTitle: options.propertyTitle,
    locale,
    propertyUrl: options.propertyUrl,
  });

  return `https://wa.me/5548984055408?text=${encodeURIComponent(message)}`;
}
