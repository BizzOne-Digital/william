import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
export default async function AdminDashboardPage() {
  await connectDB();
  const [products, published, orders] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ published: true }),
    Order.countDocuments({ deletedAt: null }),
  ]);

  const cards = [
    { label: "Products (draft + live)", value: products, href: "/admin/products" },
    { label: "Published products", value: published, href: "/admin/products" },
    { label: "Orders", value: orders, href: "/admin/orders" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-white">Dashboard</h1>
      <p className="mt-2 text-sm text-muted">
        Manage catalog, orders, and site content. Live checkout stays off until you enable it in
        settings with payment credentials configured.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="glass-panel rounded-2xl p-5 transition hover:border-accent/30"
          >
            <p className="text-sm text-muted">{c.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold text-accent">{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
