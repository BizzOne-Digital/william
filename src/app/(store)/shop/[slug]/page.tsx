import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { siteMetadata } from "@/lib/metadata";
import { ProductCoaLink } from "@/components/shop/ProductCoaLink";
import { ProductPurchasePanel } from "@/components/shop/ProductPurchasePanel";
import { ProductImage } from "@/components/shop/ProductImage";
import { ProductResearchSection } from "@/components/shop/ProductResearchSection";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    await connectDB();
    const product = await Product.findOne({ slug, published: true }).lean();
    if (!product) return siteMetadata({ title: "Product" });
    return siteMetadata({ title: product.title });
  } catch {
    return siteMetadata({ title: "Product" });
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const product = await Product.findOne({ slug, published: true }).lean();
  if (!product) notFound();

  const imageUrls = product.images?.length ? product.images : [];
  const categoryLabel = product.category;
  const serialized = {
    _id: String(product._id),
    priceCAD: product.priceCAD,
    salePriceCAD: product.salePriceCAD ?? undefined,
    stock: product.stock,
    variants: (product.variants ?? []).map((v) => ({
      _id: String(v._id),
      name: v.name,
      stock: v.stock ?? 0,
      priceCAD: v.priceCAD,
      salePriceCAD: v.salePriceCAD,
    })),
  };

  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-surface-elevated">
            <ProductImage
              src={imageUrls[0]}
              alt={product.title}
              priority
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
          {imageUrls.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {imageUrls.slice(1, 5).map((src) => (
                <div key={src} className="relative aspect-square overflow-hidden rounded-xl border border-border bg-surface-elevated">
                  <ProductImage src={src} alt="" className="object-cover" sizes="120px" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{categoryLabel}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-white">{product.title}</h1>
          <ProductResearchSection slug={slug} fallbackDescription={product.description} />
          <ProductCoaLink slug={slug} />
          <div className="mt-8">
            <ProductPurchasePanel product={serialized} />
          </div>
        </div>
      </div>
    </div>
  );
}
