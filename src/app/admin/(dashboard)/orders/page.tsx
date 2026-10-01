import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { formatCAD } from "@/lib/product-utils";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const q = sp.q?.trim();
  const page = Math.max(1, Number(sp.page ?? 1));
  const limit = 20;
  await connectDB();
  const filter: Record<string, unknown> = { deletedAt: null };
  if (q) {
    filter.$or = [{ orderNumber: new RegExp(q, "i") }, { email: new RegExp(q, "i") }];
  }
  const [orders, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Order.countDocuments(filter),
  ]);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-white">Orders</h1>
      <form className="mt-4 flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search order # or email"
          className="flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm"
        />
        <button className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">
          Search
        </button>
      </form>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-surface/80 text-muted">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Fulfillment</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={String(o._id)} className="border-t border-border/60">
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${o._id}`} className="text-accent hover:underline">
                    {o.orderNumber}
                  </Link>
                  {o.archivedAt && <span className="ml-2 text-xs text-muted">(archived)</span>}
                </td>
                <td className="px-4 py-3">{o.email}</td>
                <td className="px-4 py-3">{formatCAD(o.totalCAD)}</td>
                <td className="px-4 py-3">{o.paymentStatus}</td>
                <td className="px-4 py-3">{o.fulfillmentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!orders.length && (
        <p className="mt-4 text-sm text-muted">No orders yet.</p>
      )}
      {total > limit && (
        <div className="mt-4 text-sm">
          Page {page} ·{" "}
          <Link href={`/admin/orders?page=${page + 1}${q ? `&q=${encodeURIComponent(q)}` : ""}`} className="text-accent">
            Next
          </Link>
        </div>
      )}
    </div>
  );
}
