"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/discounts", label: "Discount codes" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminNavLinks() {
  const pathname = usePathname();
  return (
    <nav className="flex w-full min-w-0 flex-wrap gap-2 overflow-x-auto border-b border-border px-4 py-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:px-3 lg:py-6">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={cn(
            "rounded-lg px-3 py-2 text-sm text-muted hover:bg-white/5 hover:text-foreground",
            pathname === l.href && "bg-white/5 text-accent",
          )}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
