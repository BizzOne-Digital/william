import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { siteMetadata } from "@/lib/metadata";
import { buildEtransferInstructions } from "@/lib/payment";
import { BRAND } from "@/lib/constants";
import { EtransferPaymentPanel } from "@/components/checkout/EtransferPaymentPanel";

type Props = { params: Promise<{ id: string }> };

export const metadata = siteMetadata({ title: "Complete your payment" });

export default async function OrderPaymentPage({ params }: Props) {
  const { id } = await params;
  await connectDB();
  const order = await Order.findById(id).lean();
  if (!order || order.deletedAt) notFound();
  if (order.paymentProvider !== "etransfer") notFound();

  const base = BRAND.url.replace(/\/$/, "");
  const instructions = buildEtransferInstructions({
    orderNumber: order.orderNumber,
    totalCAD: order.totalCAD,
    paymentPageUrl: `${base}/order/${id}/payment`,
  });

  const paid = order.paymentStatus === "paid";
  const cancelled =
    order.paymentStatus === "failed" || order.fulfillmentStatus === "cancelled";

  return (
    <div className="mx-auto w-full min-w-0 max-w-2xl px-4 py-12 sm:px-6">
      <div className="glass-panel rounded-2xl p-8">
        <h1 className="font-display text-3xl font-semibold text-white">
          {paid ? "Payment received" : cancelled ? "Order cancelled" : "Interac e-Transfer"}
        </h1>
        <p className="mt-2 text-sm text-muted">Order {order.orderNumber}</p>
        {cancelled && !paid ? (
          <p className="mt-6 text-sm text-amber-100/90">
            This order is no longer awaiting payment. Contact us at {BRAND.email} if you already sent a transfer.
          </p>
        ) : (
          <div className="mt-6">
            <EtransferPaymentPanel
              orderNumber={order.orderNumber}
              totalCAD={order.totalCAD}
              instructions={instructions}
              paymentDueAt={order.paymentDueAt ? new Date(order.paymentDueAt) : null}
              paid={paid}
            />
          </div>
        )}
      </div>
    </div>
  );
}
