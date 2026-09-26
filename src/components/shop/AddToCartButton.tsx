"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function AddToCartButton({
  productId,
  variantId,
  quantity = 1,
  disabled,
}: {
  productId: string;
  variantId?: string | null;
  quantity?: number;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const add = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          productId,
          variantId: variantId ?? null,
          quantity,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setMessage(data.error ?? "Could not add to cart.");
        return;
      }
      setMessage("Added to cart.");
      window.dispatchEvent(new Event("idz-cart-updated"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button type="button" disabled={disabled || loading} onClick={add} className="w-full sm:w-auto">
        {loading ? "Adding…" : "Add to cart"}
      </Button>
      {message && <p className="text-sm text-accent">{message}</p>}
    </div>
  );
}
