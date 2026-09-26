import { Suspense } from "react";

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="p-8 text-center text-muted">Loading…</div>}>{children}</Suspense>;
}
