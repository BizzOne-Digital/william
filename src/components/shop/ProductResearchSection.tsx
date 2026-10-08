import { getProductResearch } from "@/content/product-research";

const RUO =
  "For in vitro laboratory research only. Not for human or veterinary use. Reconstitution notes are reference only—not dosing instructions.";

export function ProductResearchSection({
  slug,
  fallbackDescription,
}: {
  slug: string;
  fallbackDescription?: string | null;
}) {
  const profile = getProductResearch(slug);

  if (!profile) {
    if (!fallbackDescription?.trim()) return null;
    return (
      <div className="prose-policy mt-6 space-y-3 text-sm text-muted">
        {fallbackDescription
          .trim()
          .split(/\n\n+/)
          .map((para) => (
            <p key={para.slice(0, 48)}>{para}</p>
          ))}
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-5 border-t border-border pt-6 text-sm text-muted">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">Description / research purpose</p>
        <p className="mt-2 leading-relaxed text-foreground/90">{profile.description}</p>
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">Reconstitution (reference)</p>
        <p className="mt-2 leading-relaxed">{profile.reconstitution}</p>
      </div>
      <p className="text-xs leading-relaxed">{RUO}</p>
    </div>
  );
}
