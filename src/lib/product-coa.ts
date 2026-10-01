/** COA PDFs at public/coa/{slug}.pdf — synced from owner COA folder */
export const PRODUCT_SLUGS_WITH_COA = new Set([
  "retatrutide-10mg-rt-10",
  "cjc-1295-ipamorelin-cp-10",
  "bpc-157-tb-500-bb20",
  "ghk-cu-100mg-cu-100",
  "tesamorelin-10mg-tsm10",
  "nad-plus-500mg-nj500",
  "nad-plus-1000mg-nj1000",
  "klow80-80mg-bbkg80",
  "bpc-157-tb-500-bb10",
  "melanotan-ii-mt-2",
  "mots-c-10mg-ms-10",
  "ara-290-10mg-ara10",
  "ss-31-10mg-2s10",
  "pt-141-10mg-p41",
  "semax-5mg-xa5-sx",
  "cartalax-20mg",
]);

export function getProductCoaUrl(slug: string): string | null {
  if (!PRODUCT_SLUGS_WITH_COA.has(slug)) return null;
  return `/coa/${slug}.pdf`;
}
