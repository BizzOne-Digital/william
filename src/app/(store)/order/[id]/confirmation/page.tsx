import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { formatCAD } from "@/lib/product-utils";
import { Button } from "@/components/ui/Button";
import { siteMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ disabled?: string }>;
};

export const metadata = siteMetadata({ title: "Order confirmation" });

export default async function OrderConfirmationPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  await connectDB();
  const order = await Order.findById(id).lean();
  if (!order || order.deletedAt) notFound();

  const disabled = sp.disabled === "1" || order.paymentStatus === "unavailable";

  return (
    <div className="mx-auto w-full min-w-0 max-w-2xl px-4 py-12 sm:px-6">
      <div className="glass-panel rounded-2xl p-8">
        <h1 className="font-display text-3xl font-semibold text-white">
          {disabled ? "Order received — checkout not active" : "Order confirmation"}
        </h1>
        <p className="mt-2 text-sm text-muted">Order {order.orderNumber}</p>
        {disabled ? (
          <p className="mt-4 text-sm leading-relaxed text-amber-100/90">
            {order.checkoutNote ??
              "Online payment is not activated. This record was saved for demonstration only and is not marked as paid."}
          </p>
        ) : (
          <p className="mt-4 text-sm text-muted">
            Payment status:{" "}
            <span className="text-foreground font-medium">{order.paymentStatus}</span>. Final
            payment state is confirmed via payment provider webhooks, not this page alone.
          </p>
        )}
        <ul className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
          {order.items.map((item, i) => (
            <li key={i} className="flex justify-between gap-4">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>{formatCAD(item.lineTotalCAD)}</span>
            </li>
          ))}
          <li className="flex justify-between border-t border-border pt-3 font-semibold">
            <span>Total (CAD)</span>
            <span>{formatCAD(order.totalCAD)}</span>
          </li>
        </ul>
        <div className="mt-8 flex gap-3">
          <Button href="/shop">Continue shopping</Button>
          <Link href="/contact" className="text-sm text-accent self-center hover:underline">
            Need help?
          </Link>
        </div>
      </div>
    </div>
  );
}
