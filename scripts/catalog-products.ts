/** Owner catalog — image files live in public/images/products/ */
export type CatalogProduct = {
  title: string;
  slug: string;
  sku: string;
  priceCAD: number;
  imageFile: string;
  description: string;
  category?: string;
  featured?: boolean;
  displayOrder: number;
};

/**
 * Supplier confirmation before publishing (owner review):
 * - NAD 500mg naming / chemical form (NJ500)
 * - KLOW80 ingredient composition (BBKG80)
 * - Melanotan II quantity (MT-2)
 * - Cartalax specifications
 * - Bacteriostatic Water 10ml & 3ml formulation (BAC)
 * - Acetic Acid concentration (AA3)
 */
export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    title: "Retatrutide 10mg",
    slug: "retatrutide-10mg-rt-10",
    sku: "RT-10",
    priceCAD: 69.6,
    imageFile: "rt-10.jpg",
    description:
      "Retatrutide is a synthetic peptide investigated in research involving the GIP, GLP-1, and glucagon receptor pathways. This listing is for one 10mg product. Check the product label and lot documentation for its exact specifications.",
    featured: true,
    displayOrder: 1,
  },
  {
    title: "Tesamorelin 10mg",
    slug: "tesamorelin-10mg-tsm10",
    sku: "TSM10",
    priceCAD: 79.25,
    imageFile: "tsm10.jpg",
    description:
      "Tesamorelin is a synthetic peptide studied in growth hormone releasing hormone research. This listing identifies the 10mg format. Refer to the product label and lot documentation for material and handling details.",
    displayOrder: 2,
  },
  {
    title: "NAD 500mg",
    slug: "nad-plus-500mg-nj500",
    sku: "NJ500",
    priceCAD: 67.27,
    imageFile: "nj500.jpg",
    description:
      "NAD is a coenzyme studied in cellular metabolism and energy-related research. This listing identifies the 500mg format. Confirm the exact chemical name and form with the supplier before publishing the final label.",
    displayOrder: 3,
  },
  {
    title: "NAD+ 1000mg",
    slug: "nad-plus-1000mg-nj1000",
    sku: "NJ1000",
    priceCAD: 74.99,
    imageFile: "nj1000.jpg",
    description:
      "NAD+ is the oxidized form of nicotinamide adenine dinucleotide, a coenzyme involved in cellular processes. This listing identifies the 1000mg format. Review the product label for its exact form and specifications.",
    displayOrder: 4,
  },
  {
    title: "CJC-1295 (No DAC) 5mg + Ipamorelin 5mg",
    slug: "cjc-1295-ipamorelin-cp-10",
    sku: "CP-10",
    priceCAD: 69.74,
    imageFile: "cp-10.jpg",
    description:
      "This blend combines 5mg of CJC-1295 (No DAC) and 5mg of Ipamorelin in one product. The two peptides are studied in growth hormone related research. Confirm the identity and quantity of each component against the product documentation.",
    featured: true,
    displayOrder: 5,
  },
  {
    title: "KLOW80 80mg",
    slug: "klow80-80mg-bbkg80",
    sku: "BBKG80",
    priceCAD: 94.73,
    imageFile: "bbkg80.jpg",
    description:
      "KLOW80 is listed as an 80mg product under code BBKG80. Its ingredient composition has not been supplied, so this description should remain limited to the confirmed product name and size until the supplier provides a complete formula.",
    displayOrder: 6,
  },
  {
    title: "BPC-157 5mg + TB-500 5mg",
    slug: "bpc-157-tb-500-bb10",
    sku: "BB10",
    priceCAD: 71.16,
    imageFile: "bb10.jpg",
    description:
      "This blend contains a listed 5mg of BPC-157 and 5mg of TB-500. Both names appear in peptide research catalogues, but the identity and ratio of this specific blend should be checked against its label and lot documentation.",
    displayOrder: 7,
  },
  {
    title: "BPC-157 10mg + TB-500 10mg",
    slug: "bpc-157-tb-500-bb20",
    sku: "BB20",
    priceCAD: 95.6,
    imageFile: "bb20.jpg",
    description:
      "This blend contains a listed 10mg of BPC-157 and 10mg of TB-500. It is the higher-strength format of the BPC-157 + TB-500 combination in this catalogue. Confirm each component and its quantity with the supplier documentation.",
    featured: true,
    displayOrder: 8,
  },
  {
    title: "GHK-Cu 100mg",
    slug: "ghk-cu-100mg-cu-100",
    sku: "CU-100",
    priceCAD: 66.49,
    imageFile: "cu-100.jpg",
    description:
      "GHK-Cu is a copper-peptide complex examined in laboratory research. This listing identifies the 100mg format. Check the stated copper complex, quantity, and lot details on the product documentation.",
    featured: true,
    displayOrder: 9,
  },
  {
    title: "Melanotan II",
    slug: "melanotan-ii-mt-2",
    sku: "MT-2",
    priceCAD: 65.48,
    imageFile: "mt-2.jpg",
    description:
      "Melanotan II is a synthetic peptide studied in melanocortin receptor research. The supplier has not provided a quantity for this listing. Display the quantity only after it has been confirmed.",
    displayOrder: 10,
  },
  {
    title: "MOTS-C 10mg",
    slug: "mots-c-10mg-ms-10",
    sku: "MS10",
    priceCAD: 65.9,
    imageFile: "ms-10.jpg",
    description:
      "MOTS-C is a mitochondria-derived peptide studied in cellular and metabolic research. This listing identifies the 10mg format. Refer to the product label for its exact specifications.",
    displayOrder: 11,
  },
  {
    title: "ARA-290 10mg",
    slug: "ara-290-10mg-ara10",
    sku: "ARA10",
    priceCAD: 66.47,
    imageFile: "ara10.jpg",
    description:
      "ARA-290 is a synthetic peptide examined in experimental research. This listing identifies the 10mg format. Check the label and supplier documentation for its exact identity and handling details.",
    displayOrder: 12,
  },
  {
    title: "SS-31 10mg",
    slug: "ss-31-10mg-2s10",
    sku: "2S10",
    priceCAD: 71.3,
    imageFile: "2s10.jpg",
    description:
      "SS-31 is a synthetic peptide studied in mitochondrial research. This listing identifies the 10mg format. Confirm the stated material identity and specifications with the supplier documentation.",
    displayOrder: 13,
  },
  {
    title: "PT-141 10mg",
    slug: "pt-141-10mg-p41",
    sku: "P41",
    priceCAD: 67.61,
    imageFile: "p41.jpg",
    description:
      "PT-141 is a synthetic peptide studied in melanocortin receptor research. This listing identifies the 10mg format. Refer to the product label and lot documentation for material details.",
    displayOrder: 14,
  },
  {
    title: "Semax 5mg",
    slug: "semax-5mg-xa5-sx",
    sku: "XA5(SX)",
    priceCAD: 62.78,
    imageFile: "xa5-sx.jpg",
    description:
      "Semax is a synthetic peptide examined in experimental research. This listing identifies the 5mg format. Check the product documentation for its exact form and specifications.",
    displayOrder: 15,
  },
  {
    title: "Cartalax 20mg",
    slug: "cartalax-20mg",
    sku: "",
    priceCAD: 74.14,
    imageFile: "cartalax-20mg.jpg",
    description:
      "Cartalax is listed as a 20mg peptide product. Additional formulation details have not been provided. Add verified composition and specifications when the supplier confirms them.",
    displayOrder: 16,
  },
  {
    title: "Bacteriostatic Water 10ml",
    slug: "bacteriostatic-water-bac-10ml",
    sku: "BAC",
    priceCAD: 20,
    imageFile: "bac-10ml.jpg",
    category: "Research supplies",
    description:
      "Bacteriostatic Water is listed in a 10ml format. Confirm the solution composition, packaging, and labeled intended use with the supplier before adding further technical details.",
    displayOrder: 17,
  },
  {
    title: "Bacteriostatic Water 3ml",
    slug: "bacteriostatic-water-bac-3ml",
    sku: "BAC",
    priceCAD: 10,
    imageFile: "bac-3ml.jpg",
    category: "Research supplies",
    description:
      "Bacteriostatic Water is listed in a 3ml format. Confirm the solution composition, packaging, and labeled intended use with the supplier before adding further technical details.",
    displayOrder: 18,
  },
  {
    title: "Acetic Acid 10ml",
    slug: "acetic-acid-aa3-10ml",
    sku: "AA3",
    priceCAD: 20,
    imageFile: "aa3-10ml.jpg",
    category: "Research supplies",
    description:
      "Acetic Acid is listed in a 10ml format under code AA3. The code alone does not confirm its concentration. Add concentration and handling information only after checking the supplier label.",
    displayOrder: 19,
  },
];

/** Cursor asset filename fragment → catalog imageFile */
export const ASSET_IMAGE_MAP: Record<string, string> = {
  "image-6dc3bbcf": "rt-10.jpg",
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
  "image-1ed82635": "bac-10ml.jpg",
  "image-4604d3d3": "bac-3ml.jpg",
  "image-28b952c7": "aa3-10ml.jpg",
};
