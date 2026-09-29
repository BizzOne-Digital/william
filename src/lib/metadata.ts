import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";

export function siteMetadata(overrides?: Metadata): Metadata {
  const title = overrides?.title
    ? `${overrides.title} | ${BRAND.name}`
    : `${BRAND.name} — Premium research products`;
  return {
    title,
    description:
      overrides?.description ??
      `Shop approved products from ${BRAND.name} in ${BRAND.market}.`,
    metadataBase: new URL(BRAND.url),
    icons: {
      icon: [
        { url: "/favicon.jpg", type: "image/jpeg", sizes: "32x32" },
        { url: "/favicon.jpg", type: "image/jpeg", sizes: "192x192" },
      ],
      shortcut: "/favicon.jpg",
      apple: "/apple-touch-icon.jpg",
    },
    openGraph: {
      title: String(title),
      description:
        (overrides?.description as string | undefined) ??
        `Premium ecommerce by ${BRAND.name}.`,
      siteName: BRAND.name,
      locale: "en_CA",
      type: "website",
    },
    ...overrides,
  };
}
