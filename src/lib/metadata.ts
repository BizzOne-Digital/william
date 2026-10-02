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
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
