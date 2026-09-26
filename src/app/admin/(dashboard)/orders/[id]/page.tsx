import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { formatCAD } from "@/lib/product-utils";
import {
  archiveOrder,
  deleteOrderPermanent,
  updateOrderStatus,
} from "@/app/admin/actions";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();
  const order = await Order.findById(id).lean();
  if (!order || order.deletedAt) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-white">{order.orderNumber}</h1>
        <p className="text-sm text-muted">{order.email}</p>
      </div>
      <div className="glass-panel rounded-2xl p-6 text-sm space-y-2">
        <p>Payment: {order.paymentStatus}</p>
        <p>Provider: {order.paymentProvider ?? "—"}</p>
        <p>Reference: {order.paymentReference ?? "—"}</p>
        <ul className="mt-4 border-t border-border pt-4">
          {order.items.map((item, i) => (
            <li key={i} className="flex justify-between py-1">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>{formatCAD(item.lineTotalCAD)}</span>
            </li>
          ))}
        </ul>
        <p className="font-semibold pt-2">Total {formatCAD(order.totalCAD)}</p>
      </div>
      <div className="glass-panel rounded-2xl p-6">
        <h2 className="font-semibold text-white">Shipping</h2>
        <pre className="mt-2 whitespace-pre-wrap text-xs text-muted">
          {JSON.stringify(order.shippingAddress, null, 2)}
        </pre>
      </div>
      <form
        action={async (fd) => {
          "use server";
          await updateOrderStatus(id, String(fd.get("fulfillmentStatus")));
        }}
        className="glass-panel flex flex-wrap items-end gap-3 rounded-2xl p-6"
      >
        <label className="text-sm">
          Fulfillment status
          <select
            name="fulfillmentStatus"
            defaultValue={order.fulfillmentStatus}
            className="mt-1 block rounded-xl border border-border bg-surface px-3 py-2"
          >
            {["new", "processing", "shipped", "delivered", "cancelled"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-slate-950">
          Update
        </button>
      </form>
      <div className="flex flex-wrap gap-3">
        <form
          action={async () => {
            "use server";
            await archiveOrder(id);
          }}
        >
          <button type="submit" className="rounded-full border border-border px-4 py-2 text-sm">
            Archive order
          </button>
        </form>
        <form
          action={async (fd) => {
            "use server";
            await deleteOrderPermanent(id, String(fd.get("confirm")));
          }}
          className="flex items-center gap-2"
        >
          <input
            name="confirm"
            placeholder='Type DELETE'
            className="rounded-xl border border-red-500/40 bg-surface px-3 py-2 text-sm"
          />
          <button type="submit" className="rounded-full bg-red-600/80 px-4 py-2 text-sm text-white">
            Soft delete
          </button>
        </form>
      </div>
    </div>
  );
}
