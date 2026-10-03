/**
 * Inserts a tiny PNG into StoredUpload and verifies GET /api/uploads serves bytes.
 * Run: npx tsx --env-file=.env.local scripts/test-stored-upload-serve.ts
 * Requires dev server: npm run dev (port 3000)
 */
import { connectDB } from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";

const PNG_1X1 = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

async function main() {
  const folder = "products";
  const filename = `test-${Date.now()}-serve.png`;

  await connectDB();
  await StoredUpload.create({
    folder,
    filename,
    mimeType: "image/png",
    size: PNG_1X1.length,
    data: PNG_1X1,
  });

  const url = `http://localhost:3000/api/uploads/${folder}/${filename}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error("FAIL: GET", url, res.status, await res.text());
    process.exit(1);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length !== PNG_1X1.length) {
    console.error("FAIL: size mismatch", buf.length, PNG_1X1.length);
    process.exit(1);
  }
  const ct = res.headers.get("content-type");
  if (ct !== "image/png") {
    console.error("FAIL: content-type", ct);
    process.exit(1);
  }

  await StoredUpload.deleteOne({ folder, filename });
  console.log("OK: upload serve round-trip", url);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
