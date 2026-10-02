"use client";

import { useEffect } from "react";
import { cn } from "@/lib/cn";

export type AdminToastState = {
  type: "success" | "error";
  message: string;
} | null;

export function AdminToast({
  toast,
  onDismiss,
}: {
  toast: AdminToastState;
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(onDismiss, 4000);
    return () => window.clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div
      role="status"
      className={cn(
        "fixed bottom-4 right-4 z-50 max-w-sm rounded-xl border px-4 py-3 text-sm shadow-lg",
        toast.type === "success"
          ? "border-emerald-500/40 bg-emerald-950/95 text-emerald-100"
          : "border-red-500/40 bg-red-950/95 text-red-100",
      )}
    >
      {toast.message}
    </div>
  );
}
