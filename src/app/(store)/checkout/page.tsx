import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { getSiteSettings } from "@/lib/site-settings";
import { getPaymentConfig } from "@/lib/payment";
import { siteMetadata } from "@/lib/metadata";

export const metadata = siteMetadata({ title: "Checkout" });

export default async function CheckoutPage() {
  const settings = await getSiteSettings();
  const payment = getPaymentConfig();
  const paymentsActive = settings.checkoutEnabled && payment.enabled;

  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 font-display text-4xl font-semibold text-white">Checkout</h1>
      <Suspense fallback={<p className="text-muted">Loading…</p>}>
        <CheckoutForm paymentsActive={paymentsActive} paymentProvider={payment.provider} />
      </Suspense>
    </div>
  );
}
