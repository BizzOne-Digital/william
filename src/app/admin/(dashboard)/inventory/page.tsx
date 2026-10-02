import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { AdminStockEditor } from "@/components/admin/AdminStockEditor";
import { LOW_STOCK_THRESHOLD, getStockStatus, stockStatusLabel } from "@/lib/stock";

export default async function AdminInventoryPage() {
  await connectDB();
  const products = await Product.find()
    .sort({ displayOrder: 1, title: 1 })
    .select("title sku slug stock published")
    .lean();

  const lowCount = products.filter((p) => getStockStatus(p.stock) === "low_stock").length;
  const outCount = products.filter((p) => getStockStatus(p.stock) === "out_of_stock").length;

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-white">Inventory</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Set how many units are available for each product. The storefront shows this count and
        blocks checkout when stock is zero. Orders that complete will reduce stock automatically.
        Changes here are live immediately.
      </p>
      <p className="mt-3 text-xs text-white/45">
        Low stock: {lowCount} at or below {LOW_STOCK_THRESHOLD} units · Out of stock: {outCount}
      </p>

      {products.length === 0 ? (
        <div className="glass-panel mt-8 rounded-2xl p-10 text-center text-muted">
          No products yet.{" "}
          <Link href="/admin/products/new" className="text-accent hover:underline">
            Add a product
          </Link>
          .
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-surface/80 text-muted">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Units on hand</th>
                <th className="px-4 py-3">Storefront</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={String(p._id)} className="border-t border-border/60 align-top">
                  <td className="px-4 py-3 font-medium text-white">
                    {p.title}
                    {!p.published && (
                      <span className="ml-2 text-[10px] font-normal uppercase text-amber-200">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">{p.sku || "—"}</td>
                  <td className="px-4 py-3">
                    <AdminStockEditor productId={String(p._id)} initialStock={p.stock} />
                  </td>
                  <td className="px-4 py-3 text-muted">{stockStatusLabel(getStockStatus(p.stock))}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/products/${p._id}`} className="text-accent hover:underline">
                      Edit product
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
