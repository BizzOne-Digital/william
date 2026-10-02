"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
  const [displaySrc, setDisplaySrc] = useState(resolved);

  useEffect(() => {
    setDisplaySrc(resolveProductImageUrl(src));
  }, [src]);

  return (
    <Image
      src={displaySrc}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={isStoredUploadUrl(displaySrc)}
      onError={() => {
        if (displaySrc !== PRODUCT_IMAGE_PLACEHOLDER) {
          setDisplaySrc(PRODUCT_IMAGE_PLACEHOLDER);
        }
      }}
    />
  );
}
