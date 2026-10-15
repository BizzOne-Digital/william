import Image from "next/image";
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
      {showReconstitution && (
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">Reconstitution (reference)</p>
          <p className="mt-2 leading-relaxed">{profile.reconstitution}</p>
        </div>
      )}
      {profile.referenceCardImage && (
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">Reference card</p>
          <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-surface-elevated">
            <Image
              src={profile.referenceCardImage}
              alt="CJC-1295 and Ipamorelin compound reference chart"
              width={1200}
              height={1600}
              unoptimized
              className="h-auto w-full object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      )}
      <p className="text-xs leading-relaxed">{RUO}</p>
    </div>
  );
}
