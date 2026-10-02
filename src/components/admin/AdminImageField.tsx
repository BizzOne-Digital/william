"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { resolveProductImageUrl, isStoredUploadUrl } from "@/lib/product-image";
import type { UploadFolder } from "@/lib/uploads";
import { AdminToast, type AdminToastState } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/Button";

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif";

type Props = {
  value: string;
  onChange: (url: string) => void;
  folder: UploadFolder;
  label?: string;
};

export function AdminImageField({ value, onChange, folder, label = "Image" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<AdminToastState>(null);

  const previewSrc = value ? resolveProductImageUrl(value) : "";

  const uploadFile = async (file: File) => {
    setUploading(true);
    setToast(null);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setToast({ type: "error", message: data.error ?? "Upload failed" });
        return;
      }
      onChange(data.url);
      setToast({ type: "success", message: "Image uploaded." });
    } catch {
      setToast({ type: "error", message: "Upload failed" });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    onChange("");
    setToast({ type: "success", message: "Image removed." });
  };

  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium text-foreground">{label}</span>
      {previewSrc ? (
        <div className="flex flex-wrap items-start gap-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-border bg-surface-elevated">
            <Image src={previewSrc} alt="" fill className="object-cover" sizes="96px" unoptimized={isStoredUploadUrl(value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="secondary"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
            >
              Replace
            </Button>
            <Button type="button" variant="secondary" disabled={uploading} onClick={handleRemove}>
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <Button type="button" variant="secondary" disabled={uploading} onClick={() => inputRef.current?.click()}>
          {uploading ? "Uploading…" : "Choose image"}
        </Button>
      )}
      {uploading && <p className="text-xs text-muted">Uploading…</p>}
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
