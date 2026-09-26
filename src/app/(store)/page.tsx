import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeIntroSection } from "@/components/home/HomeIntroSection";
import { HomeShowcase } from "@/components/home/HomeShowcase";
import { HomeCalculatorBanner } from "@/components/home/HomeCalculatorBanner";
import Image from "next/image";
import { ProductCard } from "@/components/shop/ProductCard";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Testimonial from "@/models/Testimonial";
import { getSiteSettings } from "@/lib/site-settings";
import { BRAND } from "@/lib/constants";
import { PeptideCalculator } from "@/components/calculator/PeptideCalculator";

export default async function HomePage() {
  const settings = await getSiteSettings();
  type FeaturedProduct = {
    _id: unknown;
    title: string;
    category: string;
    priceCAD: number;
    salePriceCAD?: number;
    stock: number;
    slug: string;
    images: string[];
    variants?: unknown[];
  };
  let featured: FeaturedProduct[] = [];
  let testimonials: { _id: unknown; content: string; authorName: string; authorLocation?: string }[] =
    [];
  try {
    await connectDB();
    featured = (await Product.find({ published: true, featured: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(4)
      .lean()) as FeaturedProduct[];
    testimonials = (await Testimonial.find({ published: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(3)
      .lean()) as typeof testimonials;
  } catch {
    featured = [];
    testimonials = [];
  }

  return (
    <>
      <HomeHero />

      <HomeIntroSection intro={settings.homeIntro} />

      <HomeShowcase />

      <section className="border-y border-border bg-surface/40 py-16">
        <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold text-white">Featured products</h2>
              <p className="mt-2 text-sm text-muted">
                Published catalog items appear here. Add and publish products in admin when ready.
              </p>
            </div>
            <Link href="/shop" className="hidden items-center gap-1 text-sm text-accent sm:inline-flex">
              View shop <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {featured.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={String(p._id)} product={p as import("@/models/Product").IProduct} />
              ))}
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/50">
              <div className="relative h-48 sm:h-56">
                <Image
                  src="/images/feature-vials-neon.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="px-6 py-10 text-center">
                <p className="font-display text-xl font-bold text-white">Catalog coming soon</p>
                <p className="mx-auto mt-3 max-w-lg text-sm text-white/60">
                  Your storefront is ready. Once products, pricing, and policies are approved, publish
                  items from the admin portal to activate featured listings.
                </p>
                <Button className="mt-6" variant="secondary" href="/shop">
                  Browse shop
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full min-w-0 max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold text-white">How shopping works</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            "Browse published products with live availability.",
            "Add items to a cart that persists across visits.",
            "Review totals, shipping, and tax at checkout.",
            "Pay only when checkout and payments are activated.",
          ].map((step, i) => (
            <li key={step} className="glass-panel rounded-2xl p-5">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                {i + 1}
              </div>
              <p className="text-sm text-muted">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-border bg-surface/30 py-16">
        <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6">
          <HomeCalculatorBanner />
          <PeptideCalculator />
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="mx-auto w-full min-w-0 max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-white">Testimonials</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote key={String(t._id)} className="glass-panel rounded-2xl p-6">
                <p className="text-sm leading-relaxed text-slate-200">&ldquo;{t.content}&rdquo;</p>
                <footer className="mt-4 text-sm text-muted">
                  — {t.authorName}
                  {t.authorLocation ? `, ${t.authorLocation}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-border bg-gradient-to-b from-transparent to-surface/50 py-16">
        <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6">
          <div className="glass-panel grid gap-8 rounded-3xl p-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold text-white">Contact Intense Dropz</h2>
              <p className="mt-3 text-muted">
                Questions before you buy? Reach our team directly or send a message.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                <li>
                  <a href={`mailto:${settings.contactEmail}`} className="text-accent hover:underline">
                    {settings.contactEmail}
                  </a>
                </li>
                <li>
                  <a href={`tel:${BRAND.phoneTel}`} className="text-accent hover:underline">
                    {settings.contactPhone}
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Button href="/contact">Contact form</Button>
              <Button variant="secondary" href="/shop">
                Browse shop
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
