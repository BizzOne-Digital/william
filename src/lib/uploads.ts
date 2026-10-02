import { randomBytes } from "crypto";
import { connectDB } from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";

export const UPLOAD_FOLDERS = ["products", "gallery", "pages", "misc"] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const MIME_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export function isUploadFolder(value: string): value is UploadFolder {
  return (UPLOAD_FOLDERS as readonly string[]).includes(value);
}

export function mimeToExt(mimeType: string): string | null {
  return MIME_EXT[mimeType] ?? null;
}

export function isAllowedImageMime(mimeType: string): boolean {
  return ALLOWED_MIME.has(mimeType);
}

export function generateUploadFilename(mimeType: string): string | null {
  const ext = mimeToExt(mimeType);
  if (!ext) return null;
  return `${Date.now()}-${randomBytes(8).toString("hex")}.${ext}`;
}

export function buildUploadPublicUrl(folder: UploadFolder, filename: string): string {
  return `/api/uploads/${folder}/${filename}`;
}

const UPLOAD_URL_RE = /^\/api\/uploads\/([^/]+)\/([^/]+)$/;

export function parseStoredUploadUrl(url: string): { folder: string; filename: string } | null {
  const trimmed = url.trim();
  if (!trimmed.startsWith("/api/uploads/")) return null;
  const match = UPLOAD_URL_RE.exec(trimmed.split("?")[0] ?? "");
  if (!match) return null;
  const folder = match[1];
  const filename = match[2];
  if (folder.includes("..") || filename.includes("..") || filename.includes("/")) return null;
  return { folder, filename };
}

export function isSafeUploadPathSegment(segment: string): boolean {
  if (!segment || segment.includes("..") || segment.includes("/") || segment.includes("\\")) {
    return false;
  }
  return true;
}

export async function deleteStoredUploadByUrl(url: string): Promise<boolean> {
  const parsed = parseStoredUploadUrl(url);
  if (!parsed || !isUploadFolder(parsed.folder)) return false;
  await connectDB();
  const result = await StoredUpload.deleteOne({
    folder: parsed.folder,
    filename: parsed.filename,
  });
  return result.deletedCount > 0;
}

/** Delete Mongo-stored files only when no product still references the URL. */
export async function deleteStoredUploadsIfUnreferenced(urls: string[]): Promise<void> {
  const unique = [...new Set(urls.map((u) => u.trim()).filter(Boolean))];
  if (!unique.length) return;

  await connectDB();
  const Product = (await import("@/models/Product")).default;

  for (const url of unique) {
    if (!parseStoredUploadUrl(url)) continue;
    const refs = await Product.countDocuments({ images: url });
    if (refs === 0) await deleteStoredUploadByUrl(url);
  }
}
