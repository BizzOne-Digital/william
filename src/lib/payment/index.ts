import {
  createStripeCheckoutSession,
  getStripe,
  isStripeSecretKey,
  verifyStripeWebhook,
} from "./stripe";

export type PaymentConfig = {
  enabled: boolean;
  provider: "stripe" | "none";
};

export function getPaymentConfig(): PaymentConfig {
  const secret = process.env.STRIPE_SECRET_KEY?.trim().replace(/^['"]|['"]$/g, "");
  const hasSecret = Boolean(secret && isStripeSecretKey(secret));
  const explicitlyDisabled = process.env.PAYMENTS_ENABLED === "false";
  const enabled = hasSecret && !explicitlyDisabled;
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
  try {
    const session = await createStripeCheckoutSession(params);
    if (!session.url) {
      return { ok: false as const, reason: "stripe_error" as const, message: "Stripe did not return a checkout URL." };
    }
    return { ok: true as const, sessionId: session.id, url: session.url };
  } catch (err) {
    let message =
      err instanceof Error ? err.message : "Could not connect to Stripe. Check API keys on the server.";
    if (/invalid api key/i.test(message)) {
      message =
        "Invalid Stripe key. Use a standard secret (sk_live_…) or restricted key (rk_live_…) from the same account, in STRIPE_SECRET_KEY.";
    }
    if (/does not have the required permissions/i.test(message)) {
      message =
        "This restricted key cannot create Checkout. In Stripe → API keys → your restricted key, enable Write access for Checkout Sessions.";
    }
    console.error("[stripe checkout]", message);
    return { ok: false as const, reason: "stripe_error" as const, message };
  }
}

export { getStripe, verifyStripeWebhook };
export { syncOrderPaymentFromStripeSession } from "./sync-order-payment";
