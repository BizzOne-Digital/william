import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Layers, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/constants";

const pillars = [
  {
    icon: Sparkles,
    title: "Premium presentation",
    text: "A polished storefront designed to showcase your approved products with clarity — on mobile, tablet, and desktop.",
  },
  {
    icon: Shield,
    title: "Transparent shopping",
    text: "Published listings, server-calculated totals, and checkout that activates only when you and your payment provider are ready.",
  },
  {
    icon: Layers,
    title: "Built for your catalog",
    text: "Draft products stay in admin until you publish. No invented pricing, reviews, or product claims on the live site.",
  },
  {
    icon: Globe,
    title: "Canada-first",
    text: `Serving customers in ${BRAND.market} with ${BRAND.currency} pricing on verified product pages when your catalog goes live.`,
  },
];

export function AboutPageContent({
  ownerMessage,
  contactEmail,
  contactPhone,
}: {
  ownerMessage: string;
  contactEmail: string;
  contactPhone: string;
}) {
  const showOwnerBlock =
    ownerMessage.trim().length > 0 &&
    !ownerMessage.includes("[Owner review required]");

  return (
    <>
      <section className="about-hero-band relative -mt-[4.5rem] w-full max-w-full overflow-hidden border-b border-white/[0.06]">
        <div className="relative min-h-[min(52svh,520px)] sm:min-h-[min(58svh,580px)]">
          <Image
            src="/images/feature-luxury-lab.jpg"
            alt=""
            fill
            className="object-cover object-[75%_center] sm:object-[right_center]"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/55 via-45% to-black/25"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35"
            aria-hidden
          />

          <div className="relative mx-auto flex min-h-[min(52svh,520px)] w-full min-w-0 max-w-7xl flex-col justify-center px-4 py-16 pt-[5.5rem] sm:min-h-[min(58svh,580px)] sm:px-6 sm:py-20 lg:px-8">
            <div className="w-full min-w-0 max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/85 sm:text-[11px] sm:tracking-[0.38em]">
                {BRAND.operator}
              </p>

              <h1 className="mt-4 font-display text-[clamp(2rem,8vw,4.25rem)] font-black uppercase leading-[0.92] tracking-[-0.02em] break-words">
                <span className="text-white">About </span>
                <span className="text-accent">Intense Dropz</span>
              </h1>

              <div className="mt-5 h-[3px] w-12 rounded-sm bg-accent shadow-[0_0_18px_rgba(0,245,255,0.55)]" />

              <p className="mt-6 text-lg font-semibold leading-snug text-white sm:text-xl">
                The public face of WJT Enterprises.
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                A refined online destination built for peptide research customers who expect
                clarity, consistency, and a premium experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full min-w-0 max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Who we are</h2>
              <p className="mt-4 leading-relaxed text-white/65">
                <strong className="font-semibold text-white/90">{BRAND.name}</strong> is operated by{" "}
                <strong className="font-semibold text-white/90">{BRAND.operator}</strong>. We are
                building a trustworthy ecommerce experience for adults in {BRAND.market} — with
                honest product information, clear policies, and tools that support informed
                decisions.
              </p>
              <p className="mt-4 leading-relaxed text-white/65">
                This website is ready for your approved catalog, imagery, and legal copy. Until
                products are published and checkout is activated, the shop demonstrates the
                experience without presenting unverified claims or live sales.
              </p>
            </div>

            {showOwnerBlock ? (
              <div className="rounded-2xl border border-accent/25 bg-accent/[0.06] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  From the owner
                </p>
                <div className="prose-policy mt-4 text-white/75">{ownerMessage}</div>
              </div>
            ) : (
              <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/90">
                  Owner story — coming soon
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/65">
                  Add your approved brand story, mission, and standards in{" "}
                  <span className="text-white/85">Admin → Settings → About content</span>. We
                  intentionally avoid placeholder history or credentials until you supply verified
                  copy.
                </p>
              </div>
            )}

            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                What you can expect
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-white/65 sm:text-base">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  Browse published products with search, filters, and availability shown on each
                  listing.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  Use the peptide calculator as an educational arithmetic tool — not medical advice.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  Contact requests are stored securely and routed to the business team.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  Checkout and payments go live only after catalog, policies, and provider approval.
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,245,255,0.06)]">
              <Image
                src="/images/feature-lab.jpg"
                alt="Laboratory environment with glassware and teal lighting"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/feature-droplets.jpg"
                alt="Abstract liquid droplets with cyan light"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <h3 className="font-display text-lg font-bold text-white">Get in touch</h3>
              <p className="mt-2 text-sm text-white/55">
                Questions about the brand, catalog, or when shopping goes live?
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href={`mailto:${contactEmail}`} className="text-accent hover:underline">
                    {contactEmail}
                  </a>
                </li>
                <li>
                  <a href={`tel:${BRAND.phoneTel}`} className="text-accent hover:underline">
                    {contactPhone}
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" className="sm:flex-1">
                  Contact us
                </Button>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-accent/50"
                >
                  Visit shop
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-black/30 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Our approach</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white">Designed with intention</h2>
            <p className="mt-3 text-white/60">
              Every section of this experience is built to stay honest until you approve what goes
              public.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-accent/25"
              >
                <Icon className="h-5 w-5 text-accent" aria-hidden />
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{text}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-xs text-white/40">
            For adults 18+. Product authorization and regulatory compliance remain the
            responsibility of the business before live sales.
          </p>
        </div>
      </section>
    </>
  );
}
