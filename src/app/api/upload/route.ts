import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";
import {
  buildUploadPublicUrl,
  generateUploadFilename,
  isAllowedImageMime,
  isUploadFolder,
  MAX_UPLOAD_BYTES,
  type UploadFolder,
} from "@/lib/uploads";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  const folderRaw = String(form.get("folder") ?? "misc");

  if (!isUploadFolder(folderRaw)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }
  const folder: UploadFolder = folderRaw;

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }
  if (!isAllowedImageMime(file.type)) {
    return NextResponse.json({ error: "Invalid image type" }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "File too large (max 8MB)" }, { status: 400 });
  }

  const filename = generateUploadFilename(file.type);
  if (!filename) {
    return NextResponse.json({ error: "Invalid image type" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await connectDB();

  try {
    await StoredUpload.create({
      folder,
      filename,
      mimeType: file.type,
      size: buffer.length,
      data: buffer,
    });
  } catch (err) {
    const code = err && typeof err === "object" && "code" in err ? (err as { code: number }).code : 0;
    if (code === 11000) {
      return NextResponse.json({ error: "Upload conflict, try again" }, { status: 409 });
    }
    throw err;
  }

  const url = buildUploadPublicUrl(folder, filename);
  return NextResponse.json({
    success: true,
    url,
    filename,
    size: buffer.length,
    folder,
  });
}
