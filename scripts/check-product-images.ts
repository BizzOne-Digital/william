import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import StoredUpload from "@/models/StoredUpload";

async function main() {
  await connectDB();
  const uploads = await StoredUpload.countDocuments();
  const withApi = await Product.countDocuments({
    images: { $regex: "^/api/uploads/" },
  });
  const products = await Product.find()
    .select("title slug images published")
    .limit(5)
    .lean();

  console.log("StoredUpload count:", uploads);
  console.log("Products with /api/uploads images:", withApi);
  for (const p of products) {
    console.log("-", p.slug, "| images:", p.images);
  }

  if (uploads > 0) {
    const one = await StoredUpload.findOne().select("folder filename mimeType size").lean();
    console.log("Sample upload:", one);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
