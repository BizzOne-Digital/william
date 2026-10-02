import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { formatCAD } from "@/lib/product-utils";
import { deleteProduct } from "@/app/admin/actions";
import { AdminStockEditor } from "@/components/admin/AdminStockEditor";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page ?? 1));
  const limit = 20;
  await connectDB();
  const [items, total] = await Promise.all([
    Product.find().sort({ displayOrder: 1, updatedAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Product.countDocuments(),
  ]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold text-white">Products</h1>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/inventory"
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-white/90 hover:border-accent/40"
          >
            Manage inventory
          </Link>
          <Link
            href="/admin/products/new"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white"
          >
            Add product
          </Link>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="glass-panel rounded-2xl p-10 text-center text-muted">
          No products yet. Add draft products here — publish when approved for sale.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-surface/80 text-muted">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Inventory</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={String(p._id)} className="border-t border-border/60">
                  <td className="px-4 py-3 font-medium text-white">{p.title}</td>
                  <td className="px-4 py-3">{formatCAD(p.priceCAD)}</td>
                  <td className="px-4 py-3">
                    <AdminStockEditor productId={String(p._id)} initialStock={p.stock} compact />
                  </td>
                  <td className="px-4 py-3">
                    {p.published ? (
                      <span className="text-emerald-300">Published</span>
                    ) : (
                      <span className="text-amber-200">Draft</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/products/${p._id}`} className="text-accent hover:underline">
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteProduct(String(p._id));
                      }}
                      className="inline ml-3"
                    >
                      <button type="submit" className="text-red-300 hover:underline">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {total > limit && (
        <div className="mt-4 flex gap-2 text-sm">
          {page > 1 && (
            <Link href={`/admin/products?page=${page - 1}`} className="text-accent">
              Previous
            </Link>
          )}
          {page * limit < total && (
            <Link href={`/admin/products?page=${page + 1}`} className="text-accent">
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
