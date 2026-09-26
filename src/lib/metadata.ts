import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";

export function siteMetadata(overrides?: Metadata): Metadata {
  const title = overrides?.title
    ? `${overrides.title} | ${BRAND.name}`
    : `${BRAND.name} — Premium products by ${BRAND.operator}`;
  return {
    title,
    description:
      overrides?.description ??
      `Shop approved products from ${BRAND.name}, operated by ${BRAND.operator} in ${BRAND.market}.`,
    metadataBase: new URL(BRAND.url),
    openGraph: {
      title: String(title),
      description:
        (overrides?.description as string | undefined) ??
        `Premium ecommerce by ${BRAND.operator}.`,
      siteName: BRAND.name,
      locale: "en_CA",
      type: "website",
    },
    ...overrides,
  };
}
