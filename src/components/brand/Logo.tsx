import Link from "next/link";
import { cn } from "@/lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-11 w-11 shrink-0", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="idz-ring" x1="8" y1="8" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00E5FF" />
          <stop offset="1" stopColor="#00E5FF" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="idz-drop" x1="22" y1="14" x2="34" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00E5FF" />
          <stop offset="1" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      <circle cx="28" cy="28" r="24" stroke="url(#idz-ring)" strokeWidth="1.25" opacity="0.9" />
      <path
        d="M28 12c-5 7-14 9-14 18 0 7.732 6.268 14 14 14s14-6.268 14-14c0-9-9-11-14-18z"
        fill="url(#idz-drop)"
      />
      <circle cx="24" cy="26" r="1.75" fill="#000" opacity="0.25" />
      <circle cx="31" cy="22" r="2" stroke="#E0FDFF" strokeWidth="1" opacity="0.9" />
      <circle cx="35" cy="28" r="1.5" stroke="#E0FDFF" strokeWidth="1" opacity="0.7" />
      <path d="M31 22l4 3M33 25l-2 3" stroke="#E0FDFF" strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

export function Logo({ compact, variant = "default" }: { compact?: boolean; variant?: "default" | "header" }) {
  const isHeader = variant === "header";

  return (
    <Link href="/" className="group inline-flex min-w-0 max-w-full items-center gap-2 sm:gap-3">
      <LogoMark className="h-9 w-9 sm:h-11 sm:w-11 transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none" />
      <div className="min-w-0 leading-none">
        {isHeader ? (
          <div className="truncate font-display text-[12px] font-extrabold uppercase tracking-[0.08em] sm:text-[15px] sm:tracking-[0.12em]">
            <span className="text-white">INTENSE </span>
            <span className="text-accent">DROPZ</span>
          </div>
        ) : (
          <>
            <div className="font-display text-base font-extrabold uppercase tracking-[0.1em] text-white sm:text-lg">
              Intense Dropz
            </div>
            {!compact && (
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-muted sm:text-[11px]">
                WJT Enterprises
              </div>
            )}
          </>
        )}
      </div>
    </Link>
  );
}
