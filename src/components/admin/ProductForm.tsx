"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveProduct } from "@/app/admin/actions";
import { AdminProductImagesField } from "@/components/admin/AdminProductImagesField";
import { Button } from "@/components/ui/Button";

type ProductData = {
  _id?: string;
  title?: string;
  slug?: string;
  description?: string;
  category?: string;
  images?: string[];
  sku?: string;
  priceCAD?: number;
  salePriceCAD?: number;
  stock?: number;
  featured?: boolean;
  displayOrder?: number;
  published?: boolean;
};

export function ProductForm({ product }: { product?: ProductData }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>(product?.images ?? []);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        fd.set("images", images.join("\n"));
        const res = await saveProduct(fd);
        setMessage(res.ok ? "Saved." : res.error ?? "Error");
        if (res.ok && res.id && !product?._id) {
          router.push(`/admin/products/${res.id}`);
        }
      }}
      className="glass-panel max-w-2xl space-y-4 rounded-2xl p-6"
    >
      {product?._id && <input type="hidden" name="id" value={product._id} />}
      <label className="block text-sm">
        Title
        <input name="title" required defaultValue={product?.title} className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2" />
      </label>
      <label className="block text-sm">
        Slug (optional)
        <input name="slug" defaultValue={product?.slug} className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2" />
      </label>
      <label className="block text-sm">
        Category
        <input name="category" required defaultValue={product?.category ?? "General"} className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2" />
      </label>
      <label className="block text-sm">
        Description
        <textarea name="description" rows={6} defaultValue={product?.description} className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2" />
      </label>
      <AdminProductImagesField images={images} onChange={setImages} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          SKU
          <input name="sku" defaultValue={product?.sku} className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2" />
        </label>
        <label className="block text-sm">
          Price (CAD)
          <input name="priceCAD" type="number" step="0.01" min="0" required defaultValue={product?.priceCAD ?? 0} className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2" />
        </label>
        <label className="block text-sm">
          Sale price (CAD)
          <input name="salePriceCAD" type="number" step="0.01" min="0" defaultValue={product?.salePriceCAD} className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2" />
        </label>
        <label className="block text-sm">
          Units on hand (inventory)
          <input
            name="stock"
            type="number"
            min="0"
            step="1"
            required
            defaultValue={product?.stock ?? 0}
            className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2"
          />
          <span className="mt-1 block text-xs text-muted">
            Shown on the product page and used at checkout. You can also update stock on the{" "}
            <a href="/admin/inventory" className="text-accent hover:underline">Inventory</a> page.
          </span>
        </label>
        <label className="block text-sm">
          Display order
          <input name="displayOrder" type="number" defaultValue={product?.displayOrder ?? 0} className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2" />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" defaultChecked={product?.featured} /> Featured
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={product?.published} /> Published (visible on storefront)
      </label>
      {message && <p className="text-sm text-accent">{message}</p>}
      <Button type="submit">{product?._id ? "Save changes" : "Create product"}</Button>
    </form>
  );
}
