import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { getSiteSettings } from "@/lib/site-settings";
import { Logo } from "@/components/brand/Logo";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/calculator", label: "Calculator" },
  { href: "/contact", label: "Contact" },
];

const policyLinks = [
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms & Conditions" },
];

function FooterContact({
  email,
  phone,
}: {
  email: string;
  phone: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-5 sm:p-6 lg:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 lg:max-w-md">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Contact</p>
          <p className="mt-2 text-sm leading-relaxed text-white/50">
            Questions about an order or product? Email or call — or use the contact form.
          </p>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap lg:w-auto lg:flex-nowrap">
          <a
            href={`mailto:${email}`}
            className="group flex min-w-[min(100%,17rem)] flex-1 items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 transition hover:border-accent/35 hover:bg-black/45 sm:min-w-[15.5rem]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/25 transition group-hover:bg-accent/25">
              <Mail className="h-4 w-4" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/45">
                Email
              </span>
              <span className="mt-0.5 block text-sm font-medium leading-tight text-white/90 whitespace-nowrap group-hover:text-accent">
                {email}
              </span>
            </span>
          </a>
          <a
            href={`tel:${BRAND.phoneTel}`}
            className="group flex min-w-[min(100%,14rem)] flex-1 items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 transition hover:border-accent/35 hover:bg-black/45 sm:min-w-[12rem]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/25 transition group-hover:bg-accent/25">
              <Phone className="h-4 w-4" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/45">
                Phone
              </span>
              <span className="mt-0.5 block text-sm font-medium leading-tight text-white/90 whitespace-nowrap group-hover:text-accent">
                {phone}
              </span>
            </span>
          </a>
          <Link
            href="/contact"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-5 py-3.5 text-xs font-semibold text-accent transition hover:bg-accent/20 sm:w-auto sm:self-stretch sm:px-6"
          >
            Contact form
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function SiteFooter() {
  const settings = await getSiteSettings();

  return (
    <footer className="relative mt-auto w-full max-w-full overflow-x-clip border-t border-white/[0.08] bg-[#030508]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[min(100%,36rem)] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto w-full min-w-0 max-w-7xl px-4 pt-14 pb-10 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <div className="lg:col-span-4">
            <Logo variant="footer" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              Premium research products for {BRAND.market}. Transparent {BRAND.currency} pricing on
              every published listing.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-black shadow-[0_0_28px_rgba(0,245,255,0.25)] transition hover:brightness-110"
            >
              Shop Now
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:col-span-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                Explore
              </p>
              <ul className="mt-4 space-y-2.5">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                Policies
              </p>
              <ul className="mt-4 space-y-2.5">
                {policyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm lg:col-span-4 lg:self-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
              Quick links
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              Browse the shop or use the peptide calculator for educational volume conversions.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/calculator"
                className="flex-1 rounded-xl border border-white/15 py-2.5 text-center text-xs font-semibold text-white/80 transition hover:border-accent/40 hover:text-accent"
              >
                Peptide calculator
              </Link>
              <Link
                href="/contact"
                className="flex-1 rounded-xl border border-white/15 py-2.5 text-center text-xs font-semibold text-white/80 transition hover:border-accent/40 hover:text-accent"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-12">
          <FooterContact email={settings.contactEmail} phone={settings.contactPhone} />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
          <p className="text-[11px] leading-relaxed text-white/40 sm:text-xs">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-[11px] text-white/35 sm:text-xs">
            Adults 18+ · {BRAND.currency} · {BRAND.market}
          </p>
        </div>
      </div>
    </footer>
  );
}
