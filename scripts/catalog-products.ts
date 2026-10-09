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

const RUO =
  "For in vitro laboratory research only. Not for human or veterinary use.";

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
    priceCAD: 80,
    imageFile: "rt-10.jpg",
    description: `Retatrutide is a research peptide that activates GIP, GLP-1, and glucagon receptors in the same molecule, making it useful for studying how these pathways work together in glucose, lipid, and energy-balance models. This vial contains 10mg (RT-10). ${RUO}`,
    featured: true,
    displayOrder: 1,
  },
  {
    title: "Tesamorelin 10mg",
    slug: "tesamorelin-10mg-tsm10",
    sku: "TSM10",
    priceCAD: 80,
    imageFile: "tsm10.jpg",
    description: `Tesamorelin mimics growth hormone–releasing hormone and is commonly used in lab work on pituitary GH output, IGF-1 signaling, and fat-distribution research models. Supplied as 10mg (TSM10). ${RUO}`,
    displayOrder: 2,
  },
  {
    title: "NAD+ 500mg",
    slug: "nad-plus-500mg-nj500",
    sku: "NJ500",
    priceCAD: 70,
    imageFile: "nj500.jpg",
    description: `NAD supports redox reactions and mitochondrial metabolism in cell-based studies, including work on sirtuins and age-related pathway readouts. This material is listed at 500mg (NJ500); check the label for the exact chemical form. ${RUO}`,
    displayOrder: 3,
  },
  {
    title: "NAD+ 1000mg",
    slug: "nad-plus-1000mg-nj1000",
    sku: "NJ1000",
    priceCAD: 80,
    imageFile: "nj1000.jpg",
    description: `NAD+ is the oxidized coenzyme used when experiments require NAD+ as a substrate for PARP, sirtuin, or other NAD+-dependent enzymes. Listed at 1000mg (NJ1000); confirm form and grade on the product documentation. ${RUO}`,
    displayOrder: 4,
  },
  {
    title: "CJC-1295 (No DAC) 5mg + Ipamorelin 5mg",
    slug: "cjc-1295-ipamorelin-cp-10",
    sku: "CP-10",
    priceCAD: 70,
    imageFile: "cp-10.jpg",
    description: `This kit combines CJC-1295 without DAC—a modified GHRH peptide—with ipamorelin, a selective GH secretagogue, so researchers can study complementary triggers on the growth-hormone axis. Each component is 5mg (CP-10). ${RUO}`,
    featured: true,
    displayOrder: 5,
  },
  {
    title: "KLOW80 80mg",
    slug: "klow80-80mg-bbkg80",
    sku: "BBKG80",
    priceCAD: 110,
    imageFile: "bbkg80.jpg",
    description: `KLOW80 is an 80mg blended product (BBKG80) used in research that spans copper peptides, extracellular matrix signaling, and multi-compound recovery models. Review the COA for the full ingredient list before designing a protocol. ${RUO}`,
    displayOrder: 6,
  },
  {
    title: "BPC-157 10mg",
    slug: "bpc-157-10mg-bc10",
    sku: "BC10",
    priceCAD: 65,
    imageFile: "bc10.jpg",
    description: `BPC-157 is a synthetic peptide sequence related to gastric protective proteins and is studied in models of cytoprotection, angiogenesis, and tissue-repair signaling. 10mg (BC10). ${RUO}`,
    displayOrder: 7,
  },
  {
    title: "TB-500 5mg",
    slug: "tb-500-5mg-bt5",
    sku: "BT5",
    priceCAD: 70,
    imageFile: "bt5.jpg",
    description: `TB-500 research material maps to thymosin beta-4 biology and actin-linked cell movement in migration and wound-healing models. 5mg (BT5). ${RUO}`,
    displayOrder: 8,
  },
  {
    title: "KPV 10mg",
    slug: "kpv-10mg-kp10",
    sku: "KP10",
    priceCAD: 55,
    imageFile: "kp10.jpg",
    description: `KPV is a tripeptide fragment studied in inflammatory and antimicrobial pathway research in cultured systems. 10mg (KP10). ${RUO}`,
    displayOrder: 9,
  },
  {
    title: "BPC-157 5mg + TB-500 5mg",
    slug: "bpc-157-tb-500-bb10",
    sku: "BB10",
    priceCAD: 75,
    imageFile: "bb10.jpg",
    description: `BPC-157 is a synthetic peptide sequence related to gastric protective proteins; TB-500 research material maps to thymosin beta-4 biology and actin-linked cell movement. Together they support dual-mechanism studies on repair signaling—5mg of each (BB10). ${RUO}`,
    featured: true,
    displayOrder: 10,
  },
  {
    title: "BPC-157 10mg + TB-500 10mg",
    slug: "bpc-157-tb-500-bb20",
    sku: "BB20",
    priceCAD: 90,
    imageFile: "bb20.jpg",
    description: `A higher-strength version of the BPC-157 and TB-500 pairing for the same categories of cytoprotection, angiogenesis, and migration research, with 10mg of each peptide (BB20). ${RUO}`,
    displayOrder: 11,
  },
  {
    title: "GHK-Cu 100mg",
    slug: "ghk-cu-100mg-cu-100",
    sku: "CU-100",
    priceCAD: 70,
    imageFile: "cu-100.jpg",
    description: `GHK-Cu links the GHK tripeptide to copper and is frequently used to examine collagen-related gene activity, fibroblast behavior, and oxidative stress in cultured systems. 100mg listing (CU-100). ${RUO}`,
    featured: true,
    displayOrder: 12,
  },
  {
    title: "Melanotan II 10mg",
    slug: "melanotan-ii-mt-2",
    sku: "MT-2",
    priceCAD: 55,
    imageFile: "mt-2.jpg",
    description: `Melanotan II targets melanocortin receptors and is applied in pharmacology studies of pigmentation pathways and MC1R/MC4R activity. 10mg (MT-2). ${RUO}`,
    displayOrder: 13,
  },
  {
    title: "MOTS-C 10mg",
    slug: "mots-c-10mg-ms-10",
    sku: "MS10",
    priceCAD: 55,
    imageFile: "ms-10.jpg",
    description: `MOTS-C is encoded in mitochondrial DNA and is researched for its role in metabolic flexibility, AMPK-related signaling, and exercise-response models in cells. 10mg (MS10). ${RUO}`,
    displayOrder: 14,
  },
  {
    title: "ARA-290 10mg",
    slug: "ara-290-10mg-ara10",
    sku: "ARA10",
    priceCAD: 67,
    imageFile: "ara10.jpg",
    description: `ARA-290 is a compact peptide derived from erythropoietin biology and is used to explore innate repair receptor signaling and neuroinflammatory mechanisms in preclinical systems. 10mg (ARA10). ${RUO}`,
    displayOrder: 15,
  },
  {
    title: "SS-31 10mg",
    slug: "ss-31-10mg-2s10",
    sku: "2S10",
    priceCAD: 72,
    imageFile: "2s10.jpg",
    description: `SS-31 concentrates in mitochondria and is studied for cardiolipin binding, electron-transport efficiency, and models of mitochondrial injury or aging. 10mg vial (2S10). ${RUO}`,
    displayOrder: 16,
  },
  {
    title: "PT-141 10mg",
    slug: "pt-141-10mg-p41",
    sku: "P41",
    priceCAD: 65,
    imageFile: "p41.jpg",
    description: `PT-141 is a melanocortin agonist peptide used in receptor-binding and central nervous system pharmacology research distinct from tanning-related MC pathways. 10mg (P41). ${RUO}`,
    displayOrder: 17,
  },
  {
    title: "Semax 10mg",
    slug: "semax-10mg-xa10-sx",
    sku: "XA10(SX)",
    priceCAD: 60,
    imageFile: "xa10-sx.jpg",
    description: `Semax is a modified ACTH fragment studied for neurotrophic signaling, BDNF-linked pathways, and ischemia or cognition models in controlled laboratory settings. 10mg (XA10(SX)). ${RUO}`,
    displayOrder: 18,
  },
  {
    title: "Cartalax 20mg",
    slug: "cartalax-20mg",
    sku: "CART20",
    priceCAD: 60,
    imageFile: "cartalax-20mg.jpg",
    description: `Cartalax belongs to the short-peptide bioregulator class and is used in research on cartilage cells, matrix maintenance, and senescence-related readouts. 20mg; obtain verified sequence data from the supplier when available. ${RUO}`,
    displayOrder: 19,
  },
  {
    title: "Selank 10mg",
    slug: "selank-10mg-sk10",
    sku: "SK10",
    priceCAD: 55,
    imageFile: "sk10.jpg",
    description: `Selank is a synthetic tuftsin-derived peptide studied in anxiolytic and immunomodulatory pathway research in preclinical models. 10mg (SK10). ${RUO}`,
    displayOrder: 20,
  },
  {
    title: "Kisspeptin 10mg",
    slug: "kisspeptin-10mg-ks10",
    sku: "KS10",
    priceCAD: 55,
    imageFile: "ks10.jpg",
    description: `Kisspeptin activates the KISS1R receptor and is used in reproductive endocrinology and GnRH pulse research models. 10mg (KS10). ${RUO}`,
    displayOrder: 21,
  },
  {
    title: "Tirzepatide 20mg",
    slug: "tirzepatide-20mg-tr20",
    sku: "TR20",
    priceCAD: 100,
    imageFile: "tr20.jpg",
    description: `Tirzepatide is a dual GIP/GLP-1 receptor agonist researched for incretin signaling, glucose homeostasis, and metabolic pathway studies. 20mg (TR20). ${RUO}`,
    displayOrder: 22,
  },
  {
    title: "DSIP 15mg",
    slug: "dsip-15mg",
    sku: "DSIP15",
    priceCAD: 65,
    imageFile: "dsip-15mg.jpg",
    description: `Delta sleep-inducing peptide (DSIP) is studied in circadian, stress-response, and neuromodulatory research models. 15mg (DSIP15). ${RUO}`,
    displayOrder: 23,
  },
  {
    title: "Bacteriostatic Water 10ml",
    slug: "bacteriostatic-water-bac-10ml",
    sku: "BAC",
    priceCAD: 20,
    imageFile: "bac-10ml.jpg",
    category: "Research supplies",
    description: `Sterile bacteriostatic water is a standard diluent for reconstituting lyophilized peptides in the lab, typically with a preservative to limit bacterial growth in multi-use vials. 10ml (BAC); follow the supplier label for composition. ${RUO}`,
    displayOrder: 24,
  },
  {
    title: "Bacteriostatic Water 3ml",
    slug: "bacteriostatic-water-bac-3ml",
    sku: "BAC",
    priceCAD: 10,
    imageFile: "bac-3ml.jpg",
    category: "Research supplies",
    description: `A smaller-volume bacteriostatic water option for reconstitution workflows that call for less diluent per vial. 3ml (BAC); confirm formulation on the label. ${RUO}`,
    displayOrder: 25,
  },
  {
    title: "Acetic Acid 10ml",
    slug: "acetic-acid-aa3-10ml",
    sku: "AA3",
    priceCAD: 20,
    imageFile: "aa3-10ml.jpg",
    category: "Research supplies",
    description: `Acetic acid may be used in peptide solubility and pH-adjustment steps according to laboratory SOPs and the manufacturer’s instructions. 10ml (AA3); concentration must be confirmed from the vial label. ${RUO}`,
    displayOrder: 26,
  },
];

/** Owner-branded photos not yet in the Cursor assets folder (add to ASSET_IMAGE_MAP when uploaded). */
export const CATALOG_IMAGE_FILES_AWAITING_PHOTOS = [
  "bc10.jpg",
  "bt5.jpg",
  "kp10.jpg",
  "sk10.jpg",
  "ks10.jpg",
  "tr20.jpg",
  "dsip-15mg.jpg",
] as const;

/**
 * Cursor asset filename fragment → catalog imageFile.
 * Fragment may be `image-xxxxxxxx` or just `xxxxxxxx` (matched inside asset filenames).
 */
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
  /** Only branded Semax photo on file is 5mg XA5(SX); used for XA10(SX) listing until a 10mg photo is supplied. */
  "image-a0688f3a": "xa10-sx.jpg",
  "image-183140a2": "cartalax-20mg.jpg",
  "image-1ed82635": "bac-10ml.jpg",
  "image-4604d3d3": "bac-3ml.jpg",
  "image-28b952c7": "aa3-10ml.jpg",
};
