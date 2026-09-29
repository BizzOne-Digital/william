import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Product from "../src/models/Product";
import { ASSET_IMAGE_MAP, CATALOG_PRODUCTS } from "./catalog-products";

function resolveAssetsDir(): string | null {
  const candidates = [
    process.env.CATALOG_ASSETS_DIR,
    path.join(process.env.USERPROFILE ?? "", ".cursor", "projects", "e-2sri-nokri-william", "assets"),
    path.join(process.cwd(), "public", "images", "products"),
  ].filter(Boolean) as string[];

  for (const dir of candidates) {
    if (fs.existsSync(dir) && fs.readdirSync(dir).some((f) => f.endsWith(".jpg"))) {
      return dir;
    }
  }
  return null;
}

function copyProductImages() {
  const assetsDir = resolveAssetsDir();
  const outDir = path.join(process.cwd(), "public", "images", "products");
  fs.mkdirSync(outDir, { recursive: true });

  if (!assetsDir || assetsDir === outDir) {
    console.warn("Source assets folder not found; using existing public/images/products/ if present.");
    return;
  }

  const files = fs.readdirSync(assetsDir).filter((f) => f.endsWith(".jpg"));
  let copied = 0;
  for (const [fragment, destName] of Object.entries(ASSET_IMAGE_MAP)) {
    const source = files.find((f) => f.includes(fragment));
    if (!source) {
      console.warn("Missing asset for", destName, fragment);
      continue;
    }
    fs.copyFileSync(path.join(assetsDir, source), path.join(outDir, destName));
    copied++;
  }
  console.log(`Copied ${copied} product images to public/images/products/`);
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Set MONGODB_URI");
    process.exit(1);
  }

  copyProductImages();

  await mongoose.connect(uri);

  for (const item of CATALOG_PRODUCTS) {
    const imagePath = `/images/products/${item.imageFile}`;
    const payload = {
      title: item.title,
      slug: item.slug,
      sku: item.sku,
      description: item.description,
      category: "Research peptides",
      images: [imagePath],
      priceCAD: item.priceCAD,
      stock: 100,
      featured: item.featured ?? false,
      displayOrder: item.displayOrder,
      published: true,
    };

    const existing = await Product.findOne({ slug: item.slug });
    if (existing) {
      const update = { ...payload };
      if (item.imageFile === "rt-10.jpg" && existing.images?.[0]) {
        update.images = existing.images as string[];
      }
      await Product.updateOne({ _id: existing._id }, { $set: update });
      console.log("Updated:", item.title);
    } else {
      await Product.create(payload);
      console.log("Created:", item.title);
    }
  }

  console.log(`Done. ${CATALOG_PRODUCTS.length} products in catalog.`);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
