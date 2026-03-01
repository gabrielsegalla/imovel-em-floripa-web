import { createWhatsAppLink } from "@/lib/utils/format";

type FloatingWhatsAppButtonProps = {
  propertyTitle: string;
  label?: string;
};

export function FloatingWhatsAppButton({ propertyTitle, label }: FloatingWhatsAppButtonProps): JSX.Element {
  return (
    <a
      href={createWhatsAppLink(propertyTitle)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 rounded-full bg-[#0A1F44] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#16356f]"
    >
      {label ?? "I want more information"}
    </a>
  );
}
