import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/cn";

export type HeaderBrandMode = "logo" | "hidden-on-home" | "flag-wordmark";

export function resolveHeaderBrandMode(): HeaderBrandMode {
  const raw = process.env.NEXT_PUBLIC_HEADER_BRAND?.trim().toLowerCase();
  if (raw === "hidden-on-home" || raw === "flag-wordmark" || raw === "logo") return raw;
  return "logo";
}

function CanadaFlagIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={cn("h-3.5 w-5 shrink-0 rounded-[2px] shadow-sm ring-1 ring-white/20", className)}
      aria-hidden
    >
      <rect width="24" height="16" fill="#fff" />
      <rect width="6" height="16" fill="#d52b1e" />
      <rect x="18" width="6" height="16" fill="#d52b1e" />
      <path
        fill="#d52b1e"
        d="M12 3.2 10.9 6.1H8l2.3 1.7-.9 2.8 2.6-1.9 2.6 1.9-.9-2.8L16 6.1h-2.9L12 3.2z"
      />
    </svg>
  );
}

function FlagWordmark() {
  return (
    <Link
      href="/"
      className="group inline-flex min-w-0 max-w-full items-center gap-2.5 transition-opacity hover:opacity-95"
    >
      <CanadaFlagIcon />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="font-display text-base font-bold tracking-tight text-white sm:text-[1.05rem]">
          {BRAND.name}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
          {BRAND.market}
        </span>
      </span>
    </Link>
  );
}

function HomeTextMark() {
  return (
    <Link
      href="/"
      className="font-display text-lg font-semibold tracking-tight text-white/90 transition hover:text-white sm:text-xl"
    >
      {BRAND.name}
    </Link>
  );
}

export function HeaderBrand({ onHome }: { onHome: boolean }) {
  const mode = resolveHeaderBrandMode();

  if (mode === "flag-wordmark") {
    return <FlagWordmark />;
  }

  if (mode === "hidden-on-home" && onHome) {
    return <HomeTextMark />;
  }

  return <Logo variant="header" />;
}
