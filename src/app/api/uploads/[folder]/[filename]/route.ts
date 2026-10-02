import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";
import { isSafeUploadPathSegment, isUploadFolder } from "@/lib/uploads";

export const runtime = "nodejs";

type Params = { params: Promise<{ folder: string; filename: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { folder, filename } = await params;

  if (!isSafeUploadPathSegment(folder) || !isSafeUploadPathSegment(filename) || !isUploadFolder(folder)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await connectDB();
  const doc = await StoredUpload.findOne({ folder, filename }).select("mimeType size data");
  if (!doc?.data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const data = Buffer.isBuffer(doc.data) ? doc.data : Buffer.from(doc.data);

  return new NextResponse(new Uint8Array(data), {
    status: 200,
    headers: {
      "Content-Type": doc.mimeType,
      "Content-Length": String(doc.size),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
