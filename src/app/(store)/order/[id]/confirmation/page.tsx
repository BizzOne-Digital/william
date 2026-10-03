import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { formatCAD } from "@/lib/product-utils";
import { Button } from "@/components/ui/Button";
import { siteMetadata } from "@/lib/metadata";
import { syncOrderPaymentFromStripeSession } from "@/lib/payment";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ disabled?: string; session_id?: string }>;
};

export const metadata = siteMetadata({ title: "Order confirmation" });

export default async function OrderConfirmationPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  await connectDB();

  if (sp.session_id) {
    await syncOrderPaymentFromStripeSession(id, sp.session_id);
  }

  const order = await Order.findById(id).lean();
  if (!order || order.deletedAt) notFound();

  const disabled = sp.disabled === "1" || order.paymentStatus === "unavailable";
  const paid = order.paymentStatus === "paid";
  const returnedFromStripe = Boolean(sp.session_id);

  return (
    <div className="mx-auto w-full min-w-0 max-w-2xl px-4 py-12 sm:px-6">
      <div className="glass-panel rounded-2xl p-8 text-center sm:text-left">
        {disabled ? (
          <>
            <h1 className="font-display text-3xl font-semibold text-white">Order received</h1>
            <p className="mt-2 text-sm text-muted">Order {order.orderNumber}</p>
            <p className="mt-4 text-sm leading-relaxed text-amber-100/90">
              {order.checkoutNote ??
                "Online payment is not activated. This record was saved for demonstration only."}
            </p>
          </>
        ) : paid || returnedFromStripe ? (
          <>
            <h1 className="font-display text-3xl font-semibold text-white">Thank you for your order!</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Order <span className="font-medium text-foreground">{order.orderNumber}</span> is confirmed.
              {paid
                ? ` A receipt was sent to ${order.email}.`
                : " Your payment is processing — we will email you when it is confirmed."}
            </p>
          </>
        ) : (
          <>
            <h1 className="font-display text-3xl font-semibold text-white">Order confirmation</h1>
            <p className="mt-2 text-sm text-muted">Order {order.orderNumber}</p>
            <p className="mt-4 text-sm text-muted">
              Payment status:{" "}
              <span className="font-medium text-foreground">{order.paymentStatus}</span>
            </p>
          </>
        )}

        <ul className="mt-8 space-y-2 border-t border-border pt-6 text-left text-sm">
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

        {!disabled && (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="/shop" className="w-full sm:w-auto">Continue shopping</Button>
            <Button href="/" variant="secondary" className="w-full sm:w-auto">
              Return to home
            </Button>
          </div>
        )}

        {disabled && (
          <div className="mt-8">
            <Button href="/shop">Continue shopping</Button>
          </div>
        )}
      </div>
    </div>
  );
}
