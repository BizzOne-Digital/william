import Image from "next/image";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { ProductCard } from "@/components/shop/ProductCard";
import { siteMetadata } from "@/lib/metadata";
import { ShopFilters } from "@/components/shop/ShopFilters";

export const metadata = siteMetadata({ title: "Shop", description: "Browse published products." });

type SearchParams = Promise<{
  q?: string;
  category?: string;
  sort?: string;
}>;

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const category = sp.category?.trim() ?? "";
  const sort = sp.sort ?? "featured";

  let products: import("@/models/Product").IProduct[] = [];
  let categories: string[] = [];
  try {
    await connectDB();
    const filter: Record<string, unknown> = { published: true };
    if (category) filter.category = category;
    if (q) filter.$text = { $search: q };

    let query = Product.find(filter);
    if (sort === "price-asc") query = query.sort({ priceCAD: 1 });
    else if (sort === "price-desc") query = query.sort({ priceCAD: -1 });
    else if (sort === "newest") query = query.sort({ createdAt: -1 });
    else query = query.sort({ featured: -1, displayOrder: 1, createdAt: -1 });

    products = (await query.lean()) as import("@/models/Product").IProduct[];
    categories = await Product.distinct("category", { published: true });
  } catch {
    products = [];
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative mb-10 overflow-hidden rounded-2xl border border-white/10">
        <div className="relative min-h-[160px] sm:min-h-[200px]">
          <Image src="/images/feature-vials-neon.jpg" alt="" fill className="object-cover object-center" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/25" />
          <div className="relative px-6 py-10 sm:px-10">
            <h1 className="font-display text-4xl font-bold text-white">Shop</h1>
          </div>
        </div>
      </div>
      <ShopFilters categories={categories} initial={{ q, category, sort }} />
      {products.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={String(p._id)} product={p} />
          ))}
        </div>
      ) : (
        <div className="glass-panel mt-8 rounded-2xl px-6 py-16 text-center">
          <p className="text-lg text-white">No published products yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            When your catalog is ready, publish products from the admin portal to activate the shop.
          </p>
        </div>
      )}
    </div>
  );
}
