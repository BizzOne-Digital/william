"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, useTransition } from "react";
import { formatCAD } from "@/lib/product-utils";
import type { CartTotals } from "@/lib/pricing";
import { Button } from "@/components/ui/Button";

export function CartClient() {
  const [totals, setTotals] = useState<CartTotals | null>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [, startTransition] = useTransition();

  const refresh = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/cart");
    const data = (await res.json()) as CartTotals;
    setTotals(data);
    setCode(data.discountCode ?? "");
    setLoading(false);
  }, []);

  useEffect(() => {
    const handler = () => startTransition(() => void refresh());
    startTransition(() => void refresh());
    window.addEventListener("idz-cart-updated", handler);
    return () => window.removeEventListener("idz-cart-updated", handler);
  }, [refresh, startTransition]);

  const mutate = async (body: Record<string, unknown>) => {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    await refresh();
  };

  if (loading) return <p className="text-muted">Loading cart…</p>;
  if (!totals?.items.length) {
    return (
      <div className="glass-panel rounded-2xl p-10 text-center">
        <p className="text-lg text-white">Your cart is empty</p>
        <Button className="mt-4" href="/shop">
          Continue shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {totals.items.map((item) => (
          <div key={`${item.productId}-${item.variantId ?? ""}`} className="glass-panel flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link href={`/shop`} className="font-medium text-white hover:text-accent">
                {item.title}
              </Link>
              <p className="text-sm text-muted">
                {formatCAD(item.unitPriceCAD)} × {item.quantity}
                {!item.available && " · Adjust quantity — limited stock"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-lg border border-border px-3 py-1 text-sm"
                onClick={() =>
                  mutate({
                    action: "update",
                    productId: item.productId,
                    variantId: item.variantId,
                    quantity: Math.max(1, item.quantity - 1),
                  })
                }
              >
                −
              </button>
              <span className="w-8 text-center text-sm">{item.quantity}</span>
              <button
                type="button"
                className="rounded-lg border border-border px-3 py-1 text-sm"
                onClick={() =>
                  mutate({
                    action: "update",
                    productId: item.productId,
                    variantId: item.variantId,
                    quantity: item.quantity + 1,
                  })
                }
              >
                +
              </button>
              <button
                type="button"
                className="ml-2 text-sm text-red-300 hover:underline"
                onClick={() =>
                  mutate({
                    action: "remove",
                    productId: item.productId,
                    variantId: item.variantId,
                  })
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <aside className="glass-panel h-fit space-y-4 rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold text-white">Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal</span>
            <span>{formatCAD(totals.subtotalCAD)}</span>
          </div>
          {totals.discountCAD > 0 && (
            <div className="flex justify-between text-emerald-300">
              <span>Discount</span>
              <span>-{formatCAD(totals.discountCAD)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted">Shipping</span>
            <span>{formatCAD(totals.shippingCAD)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Tax</span>
            <span>{formatCAD(totals.taxCAD)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
            <span>Total</span>
            <span>{formatCAD(totals.totalCAD)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Discount code"
            className="min-w-0 flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm uppercase"
          />
          <button
            type="button"
            className="rounded-xl border border-border px-3 py-2 text-sm hover:border-accent/40"
            onClick={() => mutate({ action: "setDiscount", discountCode: code || null })}
          >
            Apply
          </button>
        </div>
        {totals.discountError && <p className="text-xs text-red-300">{totals.discountError}</p>}
        {totals.discountValid && <p className="text-xs text-emerald-300">Discount applied.</p>}
        <Button href="/checkout" className="w-full">
          Proceed to checkout
        </Button>
      </aside>
    </div>
  );
}
