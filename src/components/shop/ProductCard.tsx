import Link from "next/link";
import Image from "next/image";
import { formatCAD, getEffectivePrice } from "@/lib/product-utils";
import type { IProduct } from "@/models/Product";

export function ProductCard({ product }: { product: IProduct }) {
  const pricing = getEffectivePrice(product);
  const displayPrice = pricing.salePrice ?? pricing.price;
  const image = product.images?.[0];

  return (
    <article className="group glass-panel overflow-hidden rounded-2xl transition hover:border-accent/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-elevated">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transform-none"
              sizes="(max-width:768px) 50vw, 25vw"
            />
          ) : (
            <Image
              src="/images/feature-vial-rock.jpg"
              alt=""
              fill
              className="object-cover opacity-90"
              sizes="(max-width:768px) 50vw, 25vw"
            />
          )}
          {!pricing.inStock && (
            <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
              Out of stock
            </span>
          )}
        </div>
        <div className="space-y-2 p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent/90">{product.category}</p>
          <h3 className="font-display text-lg font-semibold text-white">{product.title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-foreground">{formatCAD(displayPrice)}</span>
            {pricing.salePrice != null && (
              <span className="text-sm text-muted line-through">{formatCAD(pricing.price)}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
