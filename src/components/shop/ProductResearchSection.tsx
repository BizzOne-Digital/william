import { getProductResearch } from "@/content/product-research";

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
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">Research focus</p>
        <p className="mt-1 text-foreground">{profile.researchCategory}</p>
      </div>
      <p className="leading-relaxed">{profile.overview}</p>
      {profile.researchThemes.length > 0 && (
        <div>
          <p className="font-medium text-foreground">Common research themes</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            {profile.researchThemes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {profile.literature && profile.literature.length > 0 && (
        <div>
          <p className="font-medium text-foreground">Selected literature (context only)</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs">
            {profile.literature.map((cite) => (
              <li key={cite}>{cite}</li>
            ))}
          </ul>
        </div>
      )}
      <p className="text-xs leading-relaxed text-muted">
        Educational summary for laboratory professionals. Not medical advice, not a dosing guide, and not
        for human or veterinary use.
      </p>
    </div>
  );
}
