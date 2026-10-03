"use client";

import Image from "next/image";
import { useState } from "react";
import {
  isStoredUploadUrl,
  PRODUCT_IMAGE_PLACEHOLDER,
  resolveProductImageUrl,
} from "@/lib/product-image";

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Storefront product photo with placeholder + fallback if the URL fails to load. */
export function ProductImage({ src, alt, className, sizes, priority }: Props) {
  const resolved = resolveProductImageUrl(src);
  const [erroredSrc, setErroredSrc] = useState<string | null>(null);
  const displaySrc = erroredSrc === resolved ? PRODUCT_IMAGE_PLACEHOLDER : resolved;

  return (
    <Image
      src={displaySrc}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={
        isStoredUploadUrl(displaySrc) ||
        displaySrc.startsWith("/images/") ||
        displaySrc === PRODUCT_IMAGE_PLACEHOLDER
      }
      onError={() => {
        if (resolved !== PRODUCT_IMAGE_PLACEHOLDER) {
          setErroredSrc(resolved);
        }
      }}
    />
  );
}
