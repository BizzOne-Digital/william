import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { getSiteSettings } from "@/lib/site-settings";
import { siteMetadata } from "@/lib/metadata";

export const metadata = siteMetadata({ title: "Checkout" });

export default async function CheckoutPage() {
  const settings = await getSiteSettings();
  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 font-display text-4xl font-semibold text-white">Checkout</h1>
      <Suspense fallback={<p className="text-muted">Loading…</p>}>
        <CheckoutForm checkoutMessage={settings.checkoutUnavailableMessage} />
      </Suspense>
    </div>
  );
}
