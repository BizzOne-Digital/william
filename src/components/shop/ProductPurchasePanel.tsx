"use client";

import { useMemo, useState } from "react";
import { formatCAD, getEffectivePrice } from "@/lib/product-utils";
import { AddToCartButton } from "@/components/shop/AddToCartButton";

type Variant = {
  _id: string;
  name: string;
  stock: number;
  priceCAD?: number | null;
  salePriceCAD?: number | null;
};

type ProductShape = {
  _id: string;
  priceCAD: number;
  salePriceCAD?: number;
  stock: number;
  variants?: Variant[];
};

export function ProductPurchasePanel({ product }: { product: ProductShape }) {
  const variants = useMemo(() => product.variants ?? [], [product.variants]);
  const [variantId, setVariantId] = useState<string | null>(
    variants[0] ? String(variants[0]._id) : null,
  );
  const [qty, setQty] = useState(1);

  const pricing = useMemo(() => {
    const mock = {
      ...product,
      variants: variants.map((v) => ({ ...v, _id: v._id as unknown as import("mongoose").Types.ObjectId })),
    } as never;
    return getEffectivePrice(mock, variantId);
  }, [product, variantId, variants]);

  const stock = useMemo(() => {
    if (variantId) {
      const v = variants.find((x) => String(x._id) === variantId);
      return v?.stock ?? 0;
    }
    return product.stock;
  }, [variantId, variants, product.stock]);

  const displayPrice = pricing.salePrice ?? pricing.price;

  return (
    <div className="glass-panel space-y-6 rounded-2xl p-6">
      <div>
        <p className="text-sm text-muted">Price (CAD)</p>
        <div className="mt-1 flex items-baseline gap-3">
          <span className="font-display text-3xl font-semibold text-white">
            {formatCAD(displayPrice)}
          </span>
          {pricing.salePrice != null && (
            <span className="text-muted line-through">{formatCAD(pricing.price)}</span>
          )}
        </div>
      </div>

      {variants.length > 0 && (
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Variant</span>
          <select
            value={variantId ?? ""}
            onChange={(e) => setVariantId(e.target.value || null)}
            className="w-full rounded-xl border border-border bg-surface px-3 py-2.5"
          >
            {variants.map((v) => (
              <option key={v._id} value={v._id}>
                {v.name} {v.stock <= 0 ? "(out of stock)" : ""}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="block text-sm">
        <span className="mb-1.5 block text-muted">Quantity</span>
        <input
          type="number"
          min={1}
          max={Math.min(stock || 1, 99)}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="w-28 rounded-xl border border-border bg-surface px-3 py-2.5"
          disabled={stock <= 0}
        />
      </label>

      <p className="text-sm">
        Availability:{" "}
        <span className={stock > 0 ? "text-emerald-300" : "text-red-300"}>
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </span>
      </p>

      <AddToCartButton
        productId={product._id}
        variantId={variantId}
        quantity={qty}
        disabled={stock <= 0}
      />
    </div>
  );
}
