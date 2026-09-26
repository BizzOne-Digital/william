import type { IProduct } from "@/models/Product";

export function getEffectivePrice(
  product: IProduct,
  variantId?: string | null,
): { price: number; salePrice: number | null; inStock: boolean; sku?: string | null } {
  if (variantId && product.variants?.length) {
    const variant = product.variants.find((v) => String(v._id) === variantId);
    if (variant) {
      const price = variant.priceCAD ?? product.priceCAD;
      const sale = variant.salePriceCAD ?? product.salePriceCAD ?? null;
      return {
        price,
        salePrice: sale != null && sale < price ? sale : null,
        inStock: (variant.stock ?? 0) > 0,
        sku: variant.sku ?? product.sku,
      };
    }
  }
  const price = product.priceCAD;
  const sale = product.salePriceCAD ?? null;
  return {
    price,
    salePrice: sale != null && sale < price ? sale : null,
    inStock: product.stock > 0,
    sku: product.sku,
  };
}

export function formatCAD(amount: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
}
