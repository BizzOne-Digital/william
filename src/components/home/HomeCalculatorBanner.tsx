import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HomeCalculatorBanner() {
  return (
    <div className="relative mb-10 overflow-hidden rounded-2xl border border-white/10">
      <div className="relative min-h-[140px] sm:min-h-[180px]">
        <Image
          src="/images/feature-molecule.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" aria-hidden />
        <div className="relative flex flex-col justify-center gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Calculator preview</h2>
            <p className="mt-1 text-sm text-white/65">Educational mg/mL conversion — full tool on the calculator page.</p>
          </div>
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-accent/50 hover:bg-white/15"
          >
            Open full calculator
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
