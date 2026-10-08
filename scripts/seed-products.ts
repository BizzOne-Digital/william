import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Product from "../src/models/Product";
import { formatProductResearchForDb } from "../src/content/product-research";
import {
  ASSET_IMAGE_MAP,
  CATALOG_IMAGE_FILES_AWAITING_PHOTOS,
  CATALOG_PRODUCTS,
} from "./catalog-products";
import crypto from "crypto";

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
    const needle = fragment.replace(/^image-/, "");
    const source = files.find((f) => f.includes(needle));
    if (!source) {
      console.warn("Missing asset for", destName, fragment);
      continue;
    }
    fs.copyFileSync(path.join(assetsDir, source), path.join(outDir, destName));
    copied++;
  }
  console.log(`Copied ${copied} product images to public/images/products/`);
}

function rockPlaceholderHash(): string | null {
  const fallback = path.join(process.cwd(), "public", "images", "feature-vial-rock.jpg");
  if (!fs.existsSync(fallback)) return null;
  return crypto.createHash("sha256").update(fs.readFileSync(fallback)).digest("hex");
}

/** Remove generic rock copies so listings without real photos use the runtime placeholder. */
function stripMisleadingProductPlaceholders() {
  const outDir = path.join(process.cwd(), "public", "images", "products");
  const rockHash = rockPlaceholderHash();
  if (!rockHash || !fs.existsSync(outDir)) return;

  for (const file of CATALOG_IMAGE_FILES_AWAITING_PHOTOS) {
    const dest = path.join(outDir, file);
    if (!fs.existsSync(dest)) continue;
    const hash = crypto.createHash("sha256").update(fs.readFileSync(dest)).digest("hex");
    if (hash === rockHash) {
      fs.unlinkSync(dest);
      console.log("Removed misleading placeholder:", file);
    }
  }
}

function resolveCatalogImagePath(imageFile: string): string[] {
  const dest = path.join(process.cwd(), "public", "images", "products", imageFile);
  if (!fs.existsSync(dest)) return [];
  const rockHash = rockPlaceholderHash();
  if (rockHash) {
    const hash = crypto.createHash("sha256").update(fs.readFileSync(dest)).digest("hex");
    if (hash === rockHash) return [];
  }
  return [`/images/products/${imageFile}`];
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Set MONGODB_URI");
    process.exit(1);
  }

  copyProductImages();
  stripMisleadingProductPlaceholders();

  await mongoose.connect(uri);

  for (const item of CATALOG_PRODUCTS) {
    const researchDescription = formatProductResearchForDb(item.slug);
    const catalogFields = {
      title: item.title,
      slug: item.slug,
      sku: item.sku,
      description: researchDescription
        ? `${researchDescription}\n\nFor in vitro laboratory research only. Not for human or veterinary use.`
        : item.description,
      category: item.category ?? "Research peptides",
      images: resolveCatalogImagePath(item.imageFile),
      priceCAD: Math.ceil(item.priceCAD),
      featured: item.featured ?? false,
      displayOrder: item.displayOrder,
      published: true,
    };

    const existing = await Product.findOne({ slug: item.slug });
    if (existing) {
      await Product.updateOne({ _id: existing._id }, { $set: catalogFields });
      console.log("Updated:", item.title, "(stock unchanged)");
    } else {
      await Product.create({ ...catalogFields, stock: 100 });
      console.log("Created:", item.title);
    }
  }

  const catalogSlugs = CATALOG_PRODUCTS.map((p) => p.slug);
  const retired = await Product.updateMany(
    { slug: { $nin: catalogSlugs }, published: true },
    { $set: { published: false } },
  );
  if (retired.modifiedCount) {
    console.log(`Unpublished ${retired.modifiedCount} product(s) no longer in catalog.`);
  }

  console.log(`Done. ${CATALOG_PRODUCTS.length} products in catalog.`);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
