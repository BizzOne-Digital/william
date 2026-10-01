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
        { url: "/favicon.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon.png", type: "image/png", sizes: "192x192" },
      ],
      shortcut: "/favicon.png",
      apple: "/apple-touch-icon.png",
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
