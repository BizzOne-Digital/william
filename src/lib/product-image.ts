/** Placeholder when image is missing or points at legacy on-disk `/uploads/` paths. */
export const PRODUCT_IMAGE_PLACEHOLDER = "/images/feature-vial-rock.jpg";

export function resolveProductImageUrl(src: string | undefined | null): string {
  if (!src?.trim()) return PRODUCT_IMAGE_PLACEHOLDER;
  const path = src.trim();
  if (path.startsWith("/uploads/")) return PRODUCT_IMAGE_PLACEHOLDER;
  try {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      const u = new URL(path);
      if (u.pathname.startsWith("/uploads/")) return PRODUCT_IMAGE_PLACEHOLDER;
      if (u.pathname.startsWith("/api/uploads/")) return `${u.pathname}${u.search}`;
    }
  } catch {
    return PRODUCT_IMAGE_PLACEHOLDER;
  }
  return path;
}

export function isStoredUploadUrl(src: string): boolean {
  return src.trim().startsWith("/api/uploads/");
}
