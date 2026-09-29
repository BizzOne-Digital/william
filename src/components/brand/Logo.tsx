import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export const LOGO_SRC = "/images/intense-dropz-logo.jpg";
export const LOGO_ALT = "Intense Dropz — Repair. Rebuild. Renew.";

type LogoProps = {
  compact?: boolean;
  variant?: "default" | "header" | "footer";
};

export function Logo({ compact, variant = "default" }: LogoProps) {
  const isHeader = variant === "header";
  const isFooter = variant === "footer";

  return (
    <Link
      href="/"
      className="group inline-flex min-w-0 max-w-full items-center transition-opacity hover:opacity-95"
    >
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/95 shadow-[0_0_20px_rgba(0,0,0,0.25)] ring-1 ring-white/20",
          isHeader && "rounded-md px-1.5 py-1 sm:px-2",
          compact && "px-2 py-1.5",
          isFooter && "px-2.5 py-2",
          !isHeader && !compact && !isFooter && "px-2 py-1.5",
        )}
      >
        <Image
          src={LOGO_SRC}
          alt={LOGO_ALT}
          width={320}
          height={200}
          priority={isHeader}
          className={cn(
            "h-auto w-auto object-contain object-center transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none",
            isHeader && "max-h-8 max-w-[7.5rem] sm:max-h-9 sm:max-w-[9rem]",
            compact && "max-h-12 max-w-[11rem]",
            isFooter && "max-h-[4.75rem] max-w-[13rem] sm:max-h-20 sm:max-w-[15rem]",
            !isHeader && !compact && !isFooter && "max-h-14 max-w-[12rem]",
          )}
        />
      </span>
    </Link>
  );
}
