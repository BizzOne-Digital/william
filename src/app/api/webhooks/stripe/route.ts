import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { verifyStripeWebhook } from "@/lib/payment";
import { sendBusinessEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = Buffer.from(await req.arrayBuffer());
  let event;
  try {
    event = verifyStripeWebhook(rawBody, signature);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as {
      id: string;
      payment_status?: string;
      metadata?: { orderId?: string; orderNumber?: string };
    };
    if (session.payment_status === "paid" && session.metadata?.orderId) {
      await connectDB();
      const order = await Order.findById(session.metadata.orderId);
      if (order && order.paymentStatus !== "paid") {
        order.paymentStatus = "paid";
        order.paymentReference = session.id;
        await order.save();
        await sendBusinessEmail({
          subject: `Payment confirmed — ${order.orderNumber}`,
          text: `Stripe confirmed payment for order ${order.orderNumber}. Total: ${order.totalCAD} CAD.`,
        });
      }
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as { metadata?: { orderId?: string } };
    if (session.metadata?.orderId) {
      await connectDB();
      const order = await Order.findById(session.metadata.orderId);
      if (order && order.paymentStatus === "pending") {
        order.paymentStatus = "failed";
        await order.save();
      }
    }
  }

  return NextResponse.json({ received: true });
}
