import Stripe from "stripe";

let stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!stripe) {
    stripe = new Stripe(key);
  }
  return stripe;
}

export async function createStripeCheckoutSession(params: {
  orderId: string;
  orderNumber: string;
  email: string;
  lineItems: { name: string; amountCents: number; quantity: number }[];
  successUrl: string;
  cancelUrl: string;
}) {
  const client = getStripe();
  if (!client) throw new Error("Stripe is not configured");

  return client.checkout.sessions.create({
    mode: "payment",
    customer_email: params.email,
    metadata: {
      orderId: params.orderId,
      orderNumber: params.orderNumber,
    },
    line_items: params.lineItems.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "cad",
        unit_amount: item.amountCents,
        product_data: { name: item.name },
      },
    })),
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  });
}

export function verifyStripeWebhook(rawBody: Buffer, signature: string) {
  const client = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!client || !secret) throw new Error("Stripe webhook not configured");
  return client.webhooks.constructEvent(rawBody, signature, secret);
}

/** After Stripe redirect, confirm payment even if the webhook is slightly delayed. */
export async function retrieveCheckoutSessionPayment(sessionId: string) {
  const client = getStripe();
  if (!client) return null;
  const session = await client.checkout.sessions.retrieve(sessionId);
  return {
    orderId: session.metadata?.orderId ?? null,
    orderNumber: session.metadata?.orderNumber ?? null,
    paid: session.payment_status === "paid",
    sessionId: session.id,
  };
}
