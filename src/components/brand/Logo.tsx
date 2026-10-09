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
          width={512}
          height={512}
          priority={isHeader || isFooter}
          unoptimized
          className={cn(
            "h-auto w-auto object-contain object-center transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none",
            isHeader &&
              "max-h-[4.75rem] max-w-[15rem] sm:max-h-[5.25rem] sm:max-w-[17rem] md:max-h-[5.5rem] md:max-w-[18rem]",
            compact && "max-h-16 max-w-[14rem] sm:max-h-[4.5rem] sm:max-w-[16rem]",
            isFooter && "max-h-[7rem] max-w-[18rem] sm:max-h-[8rem] sm:max-w-[20rem]",
            !isHeader && !compact && !isFooter && "max-h-[4.5rem] max-w-[16rem]",
          )}
        />
      </span>
    </Link>
  );
}
