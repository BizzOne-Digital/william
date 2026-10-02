"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { isStoredUploadUrl, resolveProductImageUrl } from "@/lib/product-image";
import { AdminToast, type AdminToastState } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/Button";

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif";

export function AdminProductImagesField({
  images,
  onChange,
}: {
  images: string[];
  onChange: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<AdminToastState>(null);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setToast(null);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "products");
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setToast({ type: "error", message: data.error ?? "Upload failed" });
        return;
      }
      onChange([...images, data.url]);
      setToast({ type: "success", message: "Image added. Save the product to publish on the shop." });
    } catch {
      setToast({ type: "error", message: "Upload failed" });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeAt = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
    setToast({ type: "success", message: "Removed from list. Save the product to update the shop." });
  };

  const replaceAt = async (index: number, file: File) => {
    setUploading(true);
    setToast(null);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "products");
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setToast({ type: "error", message: data.error ?? "Upload failed" });
        return;
      }
      const next = [...images];
      next[index] = data.url;
      onChange(next);
      setToast({ type: "success", message: "Image updated. Save the product to publish on the shop." });
    } catch {
      setToast({ type: "error", message: "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <span className="block text-sm font-medium">Product images</span>
      <p className="text-xs text-muted">
        First image is the main photo on the shop. Uploads are stored in the database (works on Vercel). Click{" "}
        <strong className="font-medium text-foreground">Save</strong> after changing images.
      </p>
      {images.length > 0 && (
        <ul className="grid gap-3 sm:grid-cols-2">
          {images.map((url, index) => (
            <li key={`${url}-${index}`} className="flex gap-3 rounded-xl border border-border p-3">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-elevated">
                <Image
                  src={resolveProductImageUrl(url)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                  unoptimized={isStoredUploadUrl(url)}
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                {index === 0 && <span className="text-[10px] uppercase tracking-wide text-accent">Primary</span>}
                <span className="truncate text-[10px] text-muted">{url}</span>
                <div className="flex flex-wrap gap-2">
                  <label className="cursor-pointer text-xs text-accent hover:underline">
                    Replace
                    <input
                      type="file"
                      accept={ACCEPT}
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) replaceAt(index, f);
                        e.target.value = "";
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    className="text-xs text-red-300 hover:underline"
                    disabled={uploading}
                    onClick={() => removeAt(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Button type="button" variant="secondary" disabled={uploading} onClick={() => inputRef.current?.click()}>
        {uploading ? "Uploading…" : "Add image"}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) uploadFile(f);
        }}
      />
      <AdminToast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
