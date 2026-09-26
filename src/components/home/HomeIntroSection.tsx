import Image from "next/image";
import { Calculator, ShieldCheck, Truck } from "lucide-react";

export function HomeIntroSection({ intro }: { intro: string }) {
  return (
    <section className="mx-auto w-full min-w-0 max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(0,229,255,0.08)] sm:aspect-[5/6]">
          <Image
            src="/images/feature-luxury-lab.jpg"
            alt="Premium laboratory interior with teal accent lighting"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-transparent to-transparent" aria-hidden />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">The experience</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">Built for clarity</h2>
          <p className="mt-4 leading-relaxed text-white/65">{intro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Verified listings", text: "Prices on published products only." },
              { icon: Truck, title: "Transparent checkout", text: "Totals calculated securely on the server." },
              { icon: Calculator, title: "Smart tools", text: "Educational peptide arithmetic converter." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <Icon className="mb-3 h-5 w-5 text-accent" aria-hidden />
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="mt-1 text-xs text-white/55">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
