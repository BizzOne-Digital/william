import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  primary:
    "bg-accent text-black hover:brightness-110 shadow-[0_0_24px_rgba(0,229,255,0.3)] font-bold",
  secondary:
    "border border-border bg-surface-elevated/80 text-foreground hover:border-accent/40 hover:bg-surface-elevated",
  ghost: "text-muted hover:text-foreground hover:bg-white/5",
  danger: "bg-red-600/90 text-white hover:bg-red-600",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  href?: string;
  children: ReactNode;
};

export function Button({
  className,
  variant = "primary",
  href,
  children,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none";
  if (href) {
    return (
      <Link href={href} className={cn(base, variants[variant], className)}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
