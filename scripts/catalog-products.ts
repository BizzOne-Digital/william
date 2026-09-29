/** Owner catalog — image files live in public/images/products/ */
export type CatalogProduct = {
  title: string;
  slug: string;
  sku: string;
  priceCAD: number;
  imageFile: string;
  description: string;
  featured?: boolean;
  displayOrder: number;
};

const RESEARCH =
  "For research use only. Not for human or veterinary use. Handle and store per product label.";

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    title: "Retatrutide 10mg",
    slug: "retatrutide-10mg-rt-10",
    sku: "RT-10",
    priceCAD: 69.6,
    imageFile: "rt-10.jpg",
    description: `Retatrutide 10mg | RT-10. ${RESEARCH}`,
    featured: true,
    displayOrder: 1,
  },
  {
    title: "Tesamorelin 10mg",
    slug: "tesamorelin-10mg-tsm10",
    sku: "TSM10",
    priceCAD: 79.25,
    imageFile: "tsm10.jpg",
    description: `Tesamorelin 10mg | TSM10. ${RESEARCH}`,
    featured: true,
    displayOrder: 2,
  },
  {
    title: "NAD+ 500mg",
    slug: "nad-plus-500mg-nj500",
    sku: "NJ500",
    priceCAD: 67.27,
    imageFile: "nj500.jpg",
    description: `NAD+ 500mg | NJ500. ${RESEARCH}`,
    featured: true,
    displayOrder: 3,
  },
  {
    title: "NAD+ 1000mg",
    slug: "nad-plus-1000mg-nj1000",
    sku: "NJ1000",
    priceCAD: 74.99,
    imageFile: "nj1000.jpg",
    description: `NAD+ 1000mg | NJ1000. ${RESEARCH}`,
    featured: true,
    displayOrder: 4,
  },
  {
    title: "CJC-1295 (No DAC) 5mg + Ipamorelin 5mg",
    slug: "cjc-1295-ipamorelin-cp-10",
    sku: "CP-10",
    priceCAD: 69.74,
    imageFile: "cp-10.jpg",
    description: `CJC-1295 (No DAC) 5mg + Ipamorelin 5mg | CP-10. ${RESEARCH}`,
    displayOrder: 5,
  },
  {
    title: "KLOW80 80mg",
    slug: "klow80-80mg-bbkg80",
    sku: "BBKG80",
    priceCAD: 94.73,
    imageFile: "bbkg80.jpg",
    description: `KLOW80 80mg | BBKG80. ${RESEARCH}`,
    displayOrder: 6,
  },
  {
    title: "BPC-157 5mg + TB-500 5mg",
    slug: "bpc-157-tb-500-bb10",
    sku: "BB10",
    priceCAD: 71.16,
    imageFile: "bb10.jpg",
    description: `BPC-157 5mg + TB-500 5mg | BB10. ${RESEARCH}`,
    displayOrder: 7,
  },
  {
    title: "BPC-157 10mg + TB-500 10mg",
    slug: "bpc-157-tb-500-bb20",
    sku: "BB20",
    priceCAD: 95.6,
    imageFile: "bb20.jpg",
    description: `BPC-157 10mg + TB-500 10mg | BB20. ${RESEARCH}`,
    displayOrder: 8,
  },
  {
    title: "GHK-CU 100mg",
    slug: "ghk-cu-100mg-cu-100",
    sku: "CU-100",
    priceCAD: 66.49,
    imageFile: "cu-100.jpg",
    description: `GHK-CU 100mg | CU-100. ${RESEARCH}`,
    displayOrder: 9,
  },
  {
    title: "Melanotan II",
    slug: "melanotan-ii-mt-2",
    sku: "MT-2",
    priceCAD: 65.48,
    imageFile: "mt-2.jpg",
    description: `Melanotan II | MT-2. ${RESEARCH}`,
    displayOrder: 10,
  },
  {
    title: "MOTS-C 10mg",
    slug: "mots-c-10mg-ms-10",
    sku: "MS 10",
    priceCAD: 65.9,
    imageFile: "ms-10.jpg",
    description: `MOTS-C 10mg | MS 10. ${RESEARCH}`,
    displayOrder: 11,
  },
  {
    title: "ARA-290 10mg",
    slug: "ara-290-10mg-ara10",
    sku: "ARA10",
    priceCAD: 66.47,
    imageFile: "ara10.jpg",
    description: `ARA-290 10mg | ARA10. ${RESEARCH}`,
    displayOrder: 12,
  },
  {
    title: "SS-31 10mg",
    slug: "ss-31-10mg-2s10",
    sku: "2S10",
    priceCAD: 71.3,
    imageFile: "2s10.jpg",
    description: `SS-31 10mg | 2S10. ${RESEARCH}`,
    displayOrder: 13,
  },
  {
    title: "PT-141 10mg",
    slug: "pt-141-10mg-p41",
    sku: "P41",
    priceCAD: 67.61,
    imageFile: "p41.jpg",
    description: `PT-141 10mg | P41. ${RESEARCH}`,
    displayOrder: 14,
  },
  {
    title: "SEMAX 5mg",
    slug: "semax-5mg-xa5-sx",
    sku: "XA5(SX)",
    priceCAD: 62.78,
    imageFile: "xa5-sx.jpg",
    description: `SEMAX 5mg | XA5(SX). ${RESEARCH}`,
    displayOrder: 15,
  },
  {
    title: "Cartalax 20mg",
    slug: "cartalax-20mg",
    sku: "CARTALAX-20",
    priceCAD: 74.14,
    imageFile: "cartalax-20mg.jpg",
    description: `Cartalax 20mg. ${RESEARCH}`,
    displayOrder: 16,
  },
];

/**
 * Cursor asset filename fragment → catalog imageFile.
 * Retatrutide (rt-10.jpg) is intentionally omitted — keep existing hero-style image.
 */
export const ASSET_IMAGE_MAP: Record<string, string> = {
  "image-27c770c6": "tsm10.jpg",
  "image-f551d7e5": "nj500.jpg",
  "image-0741e952": "nj1000.jpg",
  "image-4369d254": "cp-10.jpg",
  "image-382b2855": "bbkg80.jpg",
  "image-62249ef6": "bb10.jpg",
  "image-a2d28aaf": "bb20.jpg",
  "image-0de31273": "cu-100.jpg",
  "image-b84ae15d": "mt-2.jpg",
  "image-bcf138e2": "ms-10.jpg",
  "image-648d689b": "ara10.jpg",
  "image-09ab3c2e": "2s10.jpg",
  "image-505d78d4": "p41.jpg",
  "image-24545d5f": "xa5-sx.jpg",
  "image-183140a2": "cartalax-20mg.jpg",
};
