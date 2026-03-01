"use client";

import Image from "next/image";
import Link from "next/link";

import { useLocale } from "@/components/i18n/locale-provider";

type IconLinkProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

function IconLink({ href, label, children }: IconLinkProps): JSX.Element {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") || href.startsWith("mailto") ? "_blank" : undefined}
      rel={href.startsWith("http") || href.startsWith("mailto") ? "noreferrer" : undefined}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#0A1F44] transition hover:bg-blue-100 hover:text-[#16356f]"
    >
      {children}
    </a>
  );
}

export function Footer(): JSX.Element {
  const { translate } = useLocale();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 py-10 text-center sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center" aria-label="Imóvel em Floripa">
          <Image
            src="/logo.png"
            alt="Imóvel em Floripa"
            width={420}
            height={120}
            className="h-14 w-auto sm:h-16"
          />
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-base text-slate-600">
          <Link href="/" className="transition hover:text-[#0A1F44]">
            {translate("footer.home")}
          </Link>
          <Link href="/properties" className="transition hover:text-[#0A1F44]">
            {translate("footer.properties")}
          </Link>
          <Link href="/contact" className="transition hover:text-[#0A1F44]">
            {translate("footer.contact")}
          </Link>
        </nav>

        <div className="flex items-center justify-center gap-2">
          <IconLink href="https://wa.me/5548984055408" label="WhatsApp">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M20.52 3.48A11.86 11.86 0 0012.05 0C5.55 0 .27 5.28.27 11.78c0 2.08.54 4.1 1.57 5.88L0 24l6.5-1.7a11.74 11.74 0 005.55 1.42h.01c6.5 0 11.78-5.28 11.79-11.78a11.7 11.7 0 00-3.33-8.46zm-8.47 18.2h-.01a9.73 9.73 0 01-4.97-1.36l-.35-.2-3.86 1 1.03-3.76-.23-.38a9.7 9.7 0 01-1.5-5.2C2.16 6.4 6.45 2.1 11.78 2.1c2.58 0 5 1 6.83 2.84a9.6 9.6 0 012.83 6.84c0 5.34-4.34 9.7-9.39 9.9zm5.32-7.24c-.29-.14-1.72-.85-1.99-.95-.27-.1-.47-.14-.66.14-.2.29-.76.95-.94 1.14-.17.2-.34.22-.63.07-.29-.14-1.2-.44-2.28-1.41-.84-.74-1.4-1.66-1.57-1.95-.17-.29-.02-.44.12-.58.13-.13.29-.34.43-.5.15-.17.2-.29.3-.48.1-.2.05-.37-.02-.52-.08-.14-.66-1.6-.9-2.2-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.52.08-.8.37-.27.29-1.05 1.03-1.05 2.52s1.08 2.92 1.23 3.12c.15.2 2.12 3.23 5.13 4.53.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.08 1.72-.7 1.97-1.38.24-.68.24-1.26.17-1.38-.07-.11-.26-.18-.55-.33z" />
            </svg>
          </IconLink>

          <IconLink href="mailto:larfloripa@yahoo.com.br" label="Email">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M2 5.5A2.5 2.5 0 014.5 3h15A2.5 2.5 0 0122 5.5v13a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 18.5v-13zm2.15-.5L12 10.8 19.85 5H4.15zM20 6.22l-7.41 5.46a1 1 0 01-1.18 0L4 6.22V18.5a.5.5 0 00.5.5h15a.5.5 0 00.5-.5V6.22z" />
            </svg>
          </IconLink>

          <IconLink href="https://www.instagram.com/imovelemfloripa_/" label="Instagram">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 1.5h8.5a4.25 4.25 0 014.25 4.25v8.5a4.25 4.25 0 01-4.25 4.25h-8.5A4.25 4.25 0 013.5 16.25v-8.5A4.25 4.25 0 017.75 3.5zm8.75 2.75a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7z" />
            </svg>
          </IconLink>
        </div>

        <div className="space-y-1 text-sm text-slate-600">
          <p className="font-medium text-[#0A1F44]">Sylvio Segalla Junior · Imóvel em Floripa</p>
          <p>{translate("footer.contactLine")}</p>
          <p>
            © {new Date().getFullYear()} Imóvel em Floripa. {translate("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
