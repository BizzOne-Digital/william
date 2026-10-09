"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/calculator", label: "Calculator" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({ cartCount }: { cartCount: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full max-w-[100%] border-b",
        onHome
          ? "border-white/[0.07] bg-black/15 backdrop-blur-[6px]"
          : "border-white/[0.06] bg-black/50 backdrop-blur-md",
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" aria-hidden />

      <div className="relative mx-auto flex h-[6rem] w-full min-w-0 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8 sm:h-[6.5rem]">
        <div className="min-w-0 shrink">
          <Logo variant="header" />
        </div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative py-1 text-[13px] font-medium tracking-wide transition",
                  active ? "text-white" : "text-white/55 hover:text-white/85",
                )}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.65)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center text-white/90 transition hover:text-white"
            aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
          >
            <ShoppingCart className="h-[1.4rem] w-[1.4rem]" strokeWidth={1.65} aria-hidden />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/shop"
            className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_28px_rgba(var(--accent-rgb),0.32)] transition hover:brightness-110 sm:inline-flex"
          >
            Shop Now
            <ArrowRight className="h-4 w-4" strokeWidth={2.75} aria-hidden />
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-black/92 px-4 py-4 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-3 text-sm font-medium",
                    isActive(pathname, l.href) ? "bg-white/10 text-accent" : "text-white/75",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-bold text-white"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
