import { ceilPriceCAD } from "@/lib/constants";
import type { IProduct } from "@/models/Product";

export function getEffectivePrice(
  product: IProduct,
  variantId?: string | null,
): { price: number; salePrice: number | null; inStock: boolean; sku?: string | null } {
  if (variantId && product.variants?.length) {
    const variant = product.variants.find((v) => String(v._id) === variantId);
    if (variant) {
      const price = ceilPriceCAD(variant.priceCAD ?? product.priceCAD);
      const saleRaw = variant.salePriceCAD ?? product.salePriceCAD ?? null;
      const sale = saleRaw != null ? ceilPriceCAD(saleRaw) : null;
      return {
        price,
        salePrice: sale != null && sale < price ? sale : null,
        inStock: (variant.stock ?? 0) > 0,
        sku: variant.sku ?? product.sku,
      };
    }
  }
  const price = ceilPriceCAD(product.priceCAD);
  const saleRaw = product.salePriceCAD ?? null;
  const sale = saleRaw != null ? ceilPriceCAD(saleRaw) : null;
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
