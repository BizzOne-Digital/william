"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { formatCAD } from "@/lib/product-utils";
import type { CartTotals } from "@/lib/pricing";

export function CheckoutForm({ checkoutMessage }: { checkoutMessage: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cancelled = searchParams.get("cancelled");
  const [totals, setTotals] = useState<CartTotals | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/cart")
      .then((r) => r.json())
      .then(setTotals);
  }, []);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      email: String(fd.get("email")),
      phone: String(fd.get("phone") || ""),
      shippingAddress: {
        fullName: String(fd.get("fullName")),
        line1: String(fd.get("line1")),
        line2: String(fd.get("line2") || ""),
        city: String(fd.get("city")),
        province: String(fd.get("province")),
        postalCode: String(fd.get("postalCode")),
        country: "CA",
      },
    };
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
      return;
    }
    if (data.checkoutDisabled && data.orderId) {
      router.push(`/order/${data.orderId}/confirmation?disabled=1`);
      return;
    }
    setError(data.error ?? data.message ?? "Checkout unavailable.");
    setLoading(false);
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

  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
      <form onSubmit={submit} className="glass-panel space-y-4 rounded-2xl p-6">
        {cancelled && (
          <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-100">
            Payment was cancelled. You can try again when checkout is active.
          </p>
        )}
        <p className="rounded-lg border border-border bg-black/20 p-3 text-sm text-muted">
          {checkoutMessage}
        </p>
        <h2 className="font-display text-xl font-semibold text-white">Contact & shipping</h2>
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
            <input name="phone" className="w-full rounded-xl border border-border bg-surface px-3 py-2.5" />
          </label>
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
        </div>
        {error && <p className="text-sm text-red-300">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? "Processing…" : "Place order / continue"}
        </Button>
      </form>
      <aside className="glass-panel h-fit rounded-2xl p-6 text-sm">
        <h3 className="font-display text-lg font-semibold text-white">Order total</h3>
        <p className="mt-4 text-2xl font-semibold">{formatCAD(totals.totalCAD)}</p>
        <p className="mt-2 text-xs text-muted">
          Totals are calculated on the server. Payment completes only via verified provider
          webhooks when activated.
        </p>
      </aside>
    </div>
  );
}
