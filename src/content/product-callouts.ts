/** Short merchandising lines shown on the product page (above price). */
export const PRODUCT_CALLOUT_BY_SLUG: Record<
  string,
  { headline: string; subline?: string }
> = {
  "bpc-157-tb-500-bb10": {
    headline: "The Wolverine Stack",
    subline: "10 mg total · 5 mg BPC-157 + 5 mg TB-500",
  },
  "bpc-157-tb-500-bb20": {
    headline: "The Wolverine Stack",
    subline: "20 mg total · 10 mg BPC-157 + 10 mg TB-500",
  },
};

export function getProductCallout(slug: string) {
  return PRODUCT_CALLOUT_BY_SLUG[slug] ?? null;
}
