"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(fd.get("email")),
      password: String(fd.get("password")),
      redirect: false,
      callbackUrl,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    window.location.href = callbackUrl;
  };

  return (
    <div className="flex min-h-screen w-full max-w-full items-center justify-center overflow-x-clip px-4">
      <div className="glass-panel w-full max-w-md rounded-2xl p-8">
        <div className="mb-8 flex justify-center">
          <Logo compact />
        </div>
        <h1 className="text-center font-display text-2xl font-semibold text-white">Admin sign in</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block text-muted">Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              className="w-full rounded-xl border border-border bg-surface px-3 py-2.5"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-muted">Password</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-border bg-surface px-3 py-2.5"
            />
          </label>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
