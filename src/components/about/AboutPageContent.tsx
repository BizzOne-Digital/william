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
      <section className="mx-auto w-full min-w-0 max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <header className="mb-10 max-w-2xl border-b border-white/[0.08] pb-8">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            About <span className="text-accent">{BRAND.name}</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
            Premium research products for {BRAND.market} — clarity, consistency, and a refined
            shopping experience.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Who we are</h2>
              <p className="mt-4 leading-relaxed text-white/65">
                <strong className="font-semibold text-white/90">{BRAND.name}</strong> is building a
                trustworthy ecommerce experience for adults in {BRAND.market} — with
                honest product information, clear policies, and tools that support informed
                decisions.
              </p>
              <p className="mt-4 leading-relaxed text-white/65">
                This website is ready for your approved catalog, imagery, and legal copy. Until
                products are published and checkout is activated, the shop demonstrates the
                experience without presenting unverified claims or live sales.
              </p>
            </div>

            {showOwnerBlock && (
              <div className="rounded-2xl border border-accent/25 bg-accent/[0.06] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  From the owner
                </p>
                <div className="prose-policy mt-4 text-white/75">{ownerMessage}</div>
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
