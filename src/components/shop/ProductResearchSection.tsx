import { getProductEducationalGuide } from "@/content/product-educational-guides";
import { getProductResearch } from "@/content/product-research";

const RUO =
  "For in vitro laboratory research only. Not for human or veterinary use. Reconstitution notes are reference only—not dosing instructions.";

function EducationalGuideBlock({ slug }: { slug: string }) {
  const guide = getProductEducationalGuide(slug);
  if (!guide) return null;

  return (
    <div className="space-y-5 rounded-lg border border-amber-500/25 bg-amber-500/5 px-4 py-5">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-800 dark:text-amber-200">
        Educational purpose only
      </p>
      {guide.sections.map((section) => (
        <div key={section.title}>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">{section.title}</p>
          <div className="mt-2 space-y-3 leading-relaxed text-foreground/90">
            {section.paragraphs.map((para) => (
              <p key={`${section.title}-${para.slice(0, 40)}`} className="whitespace-pre-line">{para}</p>
            ))}
          </div>
        </div>
      ))}
      {guide.closingDisclaimer && (
        <p className="text-xs leading-relaxed text-muted">{guide.closingDisclaimer}</p>
      )}
    </div>
  );
}

export function ProductResearchSection({
  slug,
  fallbackDescription,
}: {
  slug: string;
  fallbackDescription?: string | null;
}) {
  const profile = getProductResearch(slug);

  const educationalGuide = getProductEducationalGuide(slug);

  if (!profile) {
    if (!fallbackDescription?.trim() && !educationalGuide) return null;
    return (
      <div className="mt-6 space-y-5 border-t border-border pt-6 text-sm text-muted">
        {fallbackDescription?.trim() && (
          <div className="prose-policy space-y-3">
            {fallbackDescription
              .trim()
              .split(/\n\n+/)
              .map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
          </div>
        )}
        <EducationalGuideBlock slug={slug} />
        <p className="text-xs leading-relaxed">{RUO}</p>
      </div>
    );
  }

  const paragraphs = profile.description.trim().split(/\n\n+/).filter(Boolean);
  const showReconstitution = profile.reconstitution.trim().length > 0;

  return (
    <div className="mt-6 space-y-5 border-t border-border pt-6 text-sm text-muted">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">Description / research purpose</p>
        <div className="mt-2 space-y-3 leading-relaxed text-foreground/90">
          {paragraphs.map((para) => (
            <p key={para.slice(0, 48)}>{para}</p>
          ))}
        </div>
      </div>
      {showReconstitution && !educationalGuide && (
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">Reconstitution</p>
          <p className="mt-2 leading-relaxed">{profile.reconstitution}</p>
        </div>
      )}
      <EducationalGuideBlock slug={slug} />
      <p className="text-xs leading-relaxed">{RUO}</p>
    </div>
  );
}
