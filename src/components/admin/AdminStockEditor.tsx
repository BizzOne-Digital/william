"use client";

import { useState, useTransition } from "react";
import { updateProductStock } from "@/app/admin/actions";
import { getStockStatus, stockStatusLabel } from "@/lib/stock";
import { cn } from "@/lib/cn";

export function AdminStockEditor({
  productId,
  initialStock,
  compact,
}: {
  productId: string;
  initialStock: number;
  compact?: boolean;
}) {
  const [stock, setStock] = useState(initialStock);
  const [savedStock, setSavedStock] = useState(initialStock);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const status = getStockStatus(stock);

  const save = () => {
    setMessage(null);
    startTransition(async () => {
      const res = await updateProductStock(productId, stock);
      if (res.ok) {
        setSavedStock(stock);
        setMessage("Saved");
        setTimeout(() => setMessage(null), 2000);
      } else {
        setMessage(res.error ?? "Could not save");
      }
    });
  };

  return (
    <div className={cn("flex flex-col gap-1", compact ? "min-w-[7rem]" : "min-w-[10rem]")}>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={0}
          step={1}
          value={stock}
          disabled={pending}
          onChange={(e) => setStock(Math.max(0, Number.parseInt(e.target.value, 10) || 0))}
          className="w-20 rounded-lg border border-border bg-surface px-2 py-1.5 text-sm text-white"
          aria-label="Units in stock"
        />
        <button
          type="button"
          onClick={save}
          disabled={pending || stock === savedStock}
          className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-white/90 transition hover:border-accent/40 hover:text-accent disabled:opacity-40"
        >
          {pending ? "…" : "Save"}
        </button>
      </div>
      <span
        className={cn(
          "text-[11px] font-medium",
          status === "out_of_stock" && "text-red-300",
          status === "low_stock" && "text-amber-200",
          status === "in_stock" && "text-emerald-300",
        )}
      >
        {stockStatusLabel(status)}
      </span>
      {message && <span className="text-[10px] text-muted">{message}</span>}
    </div>
  );
}
