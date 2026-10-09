import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AgeGate } from "@/components/AgeGate";
import { getOrCreateCartSessionId } from "@/lib/cart-session";
import { calculateCartTotals } from "@/lib/pricing";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  let cartCount = 0;
  try {
    const sessionId = await getOrCreateCartSessionId();
    const totals = await calculateCartTotals(sessionId, { applyDiscount: false });
    cartCount = totals.items.reduce((s, i) => s + i.quantity, 0);
  } catch {
    cartCount = 0;
  }

  return (
    <>
      <SiteHeader cartCount={cartCount} />
      <main className="page-width flex-1 pt-[6rem] sm:pt-[6.5rem] [&:has(.home-hero-root)]:pt-0">
        {children}
      </main>
      <SiteFooter />
      <AgeGate />
    </>
  );
}
