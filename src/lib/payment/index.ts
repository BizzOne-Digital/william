import { createStripeCheckoutSession, getStripe, verifyStripeWebhook } from "./stripe";

export type PaymentConfig = {
  enabled: boolean;
  provider: "stripe" | "none";
};

export function getPaymentConfig(): PaymentConfig {
  const enabled =
    process.env.PAYMENTS_ENABLED === "true" &&
    Boolean(process.env.STRIPE_SECRET_KEY) &&
    Boolean(process.env.STRIPE_WEBHOOK_SECRET);
  return {
    enabled,
    provider: enabled ? "stripe" : "none",
  };
}

export async function createCheckoutSession(params: {
  orderId: string;
  orderNumber: string;
  email: string;
  lineItems: { name: string; amountCents: number; quantity: number }[];
  successUrl: string;
  cancelUrl: string;
}) {
  const config = getPaymentConfig();
  if (!config.enabled) {
    return { ok: false as const, reason: "payments_disabled" as const };
  }
  const session = await createStripeCheckoutSession(params);
  return { ok: true as const, sessionId: session.id, url: session.url };
}

export { getStripe, verifyStripeWebhook };
