import Stripe from "stripe";
import { isStripeSecretKey } from "../src/lib/payment/stripe";

const raw = process.env.STRIPE_SECRET_KEY ?? "";
const key = raw.trim().replace(/^['"]|['"]$/g, "");
const pk = (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "").trim();

console.log("secret length:", key.length);
console.log("recognized stripe key:", isStripeSecretKey(key));
console.log("restricted (rk_):", key.startsWith("rk_live_") || key.startsWith("rk_test_"));
console.log("sk account segment:", key.slice(8, 25));
console.log("pk account segment:", pk.slice(8, 25));
console.log("pk/sk account match:", key.slice(8, 25) === pk.slice(8, 25));
if (pk && key.slice(8, 25) !== pk.slice(8, 25)) {
  console.log("WARN: Publishable key is from a different Stripe account — update NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.");
}

async function main() {
  if (!isStripeSecretKey(key)) {
    console.log("STRIPE_API: SKIP — STRIPE_SECRET_KEY must start with sk_live_, sk_test_, rk_live_, or rk_test_");
    return;
  }
  try {
    const stripe = new Stripe(key);
    await stripe.balance.retrieve();
    console.log("STRIPE_API balance: OK");
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price_data: { currency: "cad", unit_amount: 100, product_data: { name: "Test" } }, quantity: 1 }],
      success_url: "http://localhost:3000/checkout?cancelled=1",
      cancel_url: "http://localhost:3000/checkout?cancelled=1",
    });
    console.log("STRIPE_API checkout session:", session.url ? "OK" : "no url");
  } catch (e) {
    console.log("STRIPE_API: FAIL —", e instanceof Error ? e.message : e);
  }
}

main();
