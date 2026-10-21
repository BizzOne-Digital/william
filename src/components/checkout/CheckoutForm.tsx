"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { formatCAD } from "@/lib/product-utils";
import type { CartTotals } from "@/lib/pricing";

export function CheckoutForm({
  paymentsActive,
  paymentProvider,
  pickupCheckoutEnabled,
}: {
  paymentsActive: boolean;
  paymentProvider: "stripe" | "etransfer" | "none";
  pickupCheckoutEnabled: boolean;
}) {
  const searchParams = useSearchParams();
  const cancelled = searchParams.get("cancelled");
  const pickupMode = searchParams.get("pickup") === "1" && pickupCheckoutEnabled;
  const [totals, setTotals] = useState<CartTotals | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = pickupMode ? "?fulfillment=local_pickup" : "";
    fetch(`/api/cart${q}`)
      .then((r) => r.json())
      .then(setTotals);
  }, [pickupMode]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      fulfillmentMethod: pickupMode ? "local_pickup" : "shipping",
      email: String(fd.get("email")),
      phone: String(fd.get("phone") || ""),
      shippingAddress: {
        fullName: String(fd.get("fullName")),
        line1: pickupMode ? undefined : String(fd.get("line1")),
        line2: pickupMode ? undefined : String(fd.get("line2") || ""),
        city: pickupMode ? undefined : String(fd.get("city")),
        province: pickupMode ? undefined : String(fd.get("province")),
        postalCode: pickupMode ? undefined : String(fd.get("postalCode")),
        country: "CA",
      },
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: { url?: string; error?: string; message?: string } = {};
      try {
        data = await res.json();
      } catch {
        setError("Server error. Please try again in a moment.");
        return;
      }

      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }

      setError(data.error ?? data.message ?? "Unable to start payment. Please try again.");
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!totals) return <p className="text-muted">Loading checkout…</p>;
  if (!totals.items.length) {
    return (
      <div className="glass-panel rounded-2xl p-8 text-center">
        <p>Your cart is empty.</p>
        <Button className="mt-4" href="/shop">
          Shop products
        </Button>
      </div>
    );
  }

  const canSubmitOnline = pickupMode || paymentsActive;

  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
      <form onSubmit={submit} className="glass-panel space-y-4 rounded-2xl p-6">
        {cancelled && !pickupMode && (
          <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-100">
            Payment was cancelled. You can update your details and try again.
          </p>
        )}
        {pickupMode ? (
          <p className="rounded-lg border border-accent/35 bg-accent/10 p-3 text-sm text-foreground/90">
            <span className="font-semibold text-accent">Local pickup.</span> No shipping charge. Pay in person when
            you collect your order (cash, e-Transfer, or another method we accept).
          </p>
        ) : (
          <>
            {!paymentsActive && (
              <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-100">
                Checkout is not configured on this server yet. Contact the store owner if placing an order fails.
              </p>
            )}
            {paymentsActive && paymentProvider === "etransfer" && (
              <p className="rounded-lg border border-border bg-surface/60 p-3 text-sm text-muted">
                You will pay by <span className="text-foreground">Interac e-Transfer</span> after placing your order.
                Payment instructions and your order number will be shown on the next page and emailed to you.
              </p>
            )}
          </>
        )}
        <h2 className="font-display text-xl font-semibold text-white">
          {pickupMode ? "Contact for pickup" : "Contact & shipping"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm sm:col-span-2">
            <span className="mb-1 block text-muted">Full name</span>
            <input name="fullName" required className="w-full rounded-xl border border-border bg-surface px-3 py-2.5" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-muted">Email</span>
            <input name="email" type="email" required className="w-full rounded-xl border border-border bg-surface px-3 py-2.5" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-muted">Phone</span>
            <input name="phone" required={pickupMode} className="w-full rounded-xl border border-border bg-surface px-3 py-2.5" />
          </label>
          {!pickupMode && (
            <>
              <label className="text-sm sm:col-span-2">
                <span className="mb-1 block text-muted">Address line 1</span>
                <input name="line1" required className="w-full rounded-xl border border-border bg-surface px-3 py-2.5" />
              </label>
              <label className="text-sm sm:col-span-2">
                <span className="mb-1 block text-muted">Address line 2</span>
                <input name="line2" className="w-full rounded-xl border border-border bg-surface px-3 py-2.5" />
              </label>
              <label className="text-sm">
                <span className="mb-1 block text-muted">City</span>
                <input name="city" required className="w-full rounded-xl border border-border bg-surface px-3 py-2.5" />
              </label>
              <label className="text-sm">
                <span className="mb-1 block text-muted">Province</span>
                <input name="province" required className="w-full rounded-xl border border-border bg-surface px-3 py-2.5" />
              </label>
              <label className="text-sm">
                <span className="mb-1 block text-muted">Postal code</span>
                <input name="postalCode" required className="w-full rounded-xl border border-border bg-surface px-3 py-2.5" />
              </label>
            </>
          )}
        </div>
        {error && <p className="text-sm text-red-300">{error}</p>}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button type="submit" disabled={loading || !canSubmitOnline} className="w-full sm:w-auto">
            {loading
              ? "Placing order…"
              : pickupMode
                ? "Reserve for pickup — pay in person"
                : paymentProvider === "etransfer"
                  ? "Place order & view e-Transfer details"
                  : "Pay now"}
          </Button>
          {pickupCheckoutEnabled && (
            <Button
              type="button"
              variant="secondary"
              href={pickupMode ? "/checkout" : "/checkout?pickup=1"}
              className="w-full sm:w-auto"
            >
              {pickupMode ? "Switch to ship & pay online" : "Local pickup instead"}
            </Button>
          )}
        </div>
      </form>
      <aside className="glass-panel h-fit rounded-2xl p-6 text-sm">
        <h3 className="font-display text-lg font-semibold text-white">Order total</h3>
        <p className="mt-4 text-2xl font-semibold">{formatCAD(totals.totalCAD)}</p>
        {pickupMode && totals.shippingCAD === 0 && (
          <p className="mt-2 text-xs text-accent">Shipping waived for local pickup.</p>
        )}
        <p className="mt-2 text-xs text-muted">
          {pickupMode ? "Tax included where applicable. Pay when you pick up." : "Includes shipping and tax where applicable."}
        </p>
      </aside>
    </div>
  );
}
