"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong.");
      setStatus("error");
      return;
    }
    setStatus("ok");
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={onSubmit} className="glass-panel w-full min-w-0 space-y-4 rounded-2xl p-4 sm:p-6">
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block text-muted">Name</span>
          <input name="name" required minLength={2} className="w-full rounded-xl border border-border bg-surface px-3 py-2.5" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted">Email</span>
          <input name="email" type="email" required className="w-full rounded-xl border border-border bg-surface px-3 py-2.5" />
        </label>
      </div>
      <label className="text-sm block">
        <span className="mb-1 block text-muted">Phone (optional)</span>
        <input name="phone" className="w-full rounded-xl border border-border bg-surface px-3 py-2.5" />
      </label>
      <label className="text-sm block">
        <span className="mb-1 block text-muted">Subject (optional)</span>
        <input name="subject" className="w-full rounded-xl border border-border bg-surface px-3 py-2.5" />
      </label>
      <label className="text-sm block">
        <span className="mb-1 block text-muted">Message</span>
        <textarea name="message" required minLength={10} rows={5} className="w-full rounded-xl border border-border bg-surface px-3 py-2.5" />
      </label>
      {error && <p className="text-sm text-red-300">{error}</p>}
      {status === "ok" && <p className="text-sm text-emerald-300">Message sent. We will respond soon.</p>}
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
