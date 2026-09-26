import { CartClient } from "@/components/cart/CartClient";
import { siteMetadata } from "@/lib/metadata";

export const metadata = siteMetadata({ title: "Cart" });

export default function CartPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 font-display text-4xl font-semibold text-white">Your cart</h1>
      <CartClient />
    </div>
  );
}
