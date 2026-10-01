import { notFound } from "next/navigation";
import Image from "next/image";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { siteMetadata } from "@/lib/metadata";
import { ProductPurchasePanel } from "@/components/shop/ProductPurchasePanel";

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

  const images = product.images?.length ? product.images : [];
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
            {images[0] ? (
              <Image src={images[0]} alt="" fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 50vw" />
            ) : (
              <Image
                src="/images/feature-vial-rock.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.slice(1, 5).map((src) => (
                <div key={src} className="relative aspect-square overflow-hidden rounded-xl border border-border">
                  <Image src={src} alt="" fill className="object-cover" sizes="120px" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{product.category}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-white">{product.title}</h1>
          {product.sku && <p className="mt-2 text-sm text-muted">SKU: {product.sku}</p>}
          <div className="mt-8">
            <ProductPurchasePanel product={serialized} />
          </div>
        </div>
      </div>
    </div>
  );
}
