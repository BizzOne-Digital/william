import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = BRAND.url.replace(/\/$/, "");
  const staticRoutes = [
    "",
    "/shop",
    "/about",
    "/calculator",
    "/contact",
    "/cart",
    "/shipping",
    "/returns",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  try {
    await connectDB();
    const products = await Product.find({ published: true }).select("slug updatedAt").lean();
    const productRoutes = products.map((p) => ({
      url: `${base}/shop/${p.slug}`,
      lastModified: p.updatedAt ?? new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    return [...staticRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
