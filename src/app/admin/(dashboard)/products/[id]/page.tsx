import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product) notFound();
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-semibold text-white">Edit product</h1>
      <ProductForm
        product={{
          _id: String(product._id),
          title: product.title,
          slug: product.slug,
          description: product.description,
          category: product.category,
          images: product.images,
          sku: product.sku ?? undefined,
          priceCAD: product.priceCAD,
          salePriceCAD: product.salePriceCAD ?? undefined,
          stock: product.stock,
          featured: product.featured,
          displayOrder: product.displayOrder,
          published: product.published,
        }}
      />
    </div>
  );
}
