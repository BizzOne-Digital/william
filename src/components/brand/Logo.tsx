import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export const LOGO_SRC = "/images/intense-dropz-logo.png";
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
          "inline-flex shrink-0 items-center justify-center overflow-hidden",
          isHeader && "px-0.5 py-0",
          compact && "px-1 py-0.5",
          isFooter && "px-0 py-0",
          !isHeader && !compact && !isFooter && "px-1 py-0.5",
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
            isHeader && "max-h-[3.75rem] max-w-[12.5rem] sm:max-h-[4.5rem] sm:max-w-[15rem]",
            compact && "max-h-14 max-w-[13rem]",
            isFooter && "max-h-[6.5rem] max-w-[16rem] sm:max-h-[7.5rem] sm:max-w-[18rem]",
            !isHeader && !compact && !isFooter && "max-h-16 max-w-[14rem]",
          )}
        />
      </span>
    </Link>
  );
}
