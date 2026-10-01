import { FileText } from "lucide-react";
import { getProductCoaUrl } from "@/lib/product-coa";

export function ProductCoaLink({ slug }: { slug: string }) {
  const href = getProductCoaUrl(slug);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white/90 transition hover:border-accent/40 hover:text-accent"
    >
      <FileText className="h-4 w-4 shrink-0 text-accent" aria-hidden />
      View Certificate of Analysis (PDF)
    </a>
  );
}
