import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { LOGO_ALT, LOGO_SRC } from "@/components/brand/Logo";

export function HomeHero() {
  return (
    <section className="home-hero-root relative w-full max-w-full min-h-[100svh] overflow-hidden">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        quality={95}
        unoptimized
        className="object-cover object-[62%_center] sm:object-[68%_center] lg:object-[right_center]"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/40 via-50% to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full min-w-0 max-w-7xl flex-col justify-center px-4 pb-24 pt-[5.75rem] sm:px-6 sm:pb-20 sm:pt-[6rem] lg:px-8">
        <div className="w-full min-w-0 max-w-xl lg:max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90 sm:text-[11px] sm:tracking-[0.35em]">
            {BRAND.market} · {BRAND.currency}
          </p>

          <h1 className="mt-4 sm:mt-5">
            <span className="sr-only">{BRAND.name}</span>
            <Image
              src={LOGO_SRC}
              alt={LOGO_ALT}
              width={480}
              height={300}
              priority
              unoptimized
              className="h-auto w-full max-w-[min(100%,18rem)] object-contain object-left drop-shadow-[0_12px_40px_rgba(0,0,0,0.55)] sm:max-w-[22rem] lg:max-w-[26rem]"
            />
          </h1>

          <p className="mt-6 text-lg font-semibold leading-snug text-white sm:mt-8 sm:text-xl lg:text-[1.35rem]">
            A refined destination for peptide research.
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55 sm:text-[15px] md:text-base">
            Explore a carefully curated collection with a seamless shopping experience.
          </p>

          <div className="mt-8 flex w-full min-w-0 flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <Link
              href="/shop"
              className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_40px_rgba(var(--accent-rgb),0.38)] transition hover:brightness-110 sm:w-auto sm:px-8 sm:text-[15px]"
            >
              Explore Products
              <ArrowRight className="h-[18px] w-[18px] shrink-0" strokeWidth={2.75} aria-hidden />
            </Link>
            <Link
              href="/calculator"
              className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-full border border-white/40 bg-black/15 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-[2px] transition hover:border-white/60 hover:bg-black/25 sm:w-auto sm:px-8 sm:text-[15px]"
            >
              <Calculator className="h-[17px] w-[17px] shrink-0 text-white/90" strokeWidth={2} aria-hidden />
              Peptide Calculator
            </Link>
          </div>
        </div>

        <p className="mt-10 text-[10px] leading-relaxed text-white/40 sm:absolute sm:bottom-8 sm:left-6 sm:mt-0 sm:max-w-md sm:text-xs lg:left-8">
          For adults 18+ · Product details coming soon
        </p>
      </div>
    </section>
  );
}
