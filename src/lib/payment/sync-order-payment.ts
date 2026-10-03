import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { retrieveCheckoutSessionPayment } from "./stripe";

export async function syncOrderPaymentFromStripeSession(orderId: string, sessionId: string) {
  const result = await retrieveCheckoutSessionPayment(sessionId);
  if (!result || result.orderId !== orderId) {
    return { ok: false as const, paid: false };
  }

  if (!result.paid) {
    return { ok: true as const, paid: false };
  }

  await connectDB();
  const order = await Order.findById(orderId);
  if (!order) return { ok: false as const, paid: false };

  if (order.paymentStatus !== "paid") {
    order.paymentStatus = "paid";
    order.paymentReference = result.sessionId;
    await order.save();
  }

  return { ok: true as const, paid: true };
}
