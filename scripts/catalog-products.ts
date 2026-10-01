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
    priceCAD: 70,
    imageFile: "rt-10.jpg",
    description: `Retatrutide is a synthetic lipopeptide studied as a triple agonist at the GIP, GLP-1, and glucagon receptors. In laboratory research it is used to model incretin and glucagon signaling, glucose homeostasis, lipid metabolism, and energy-balance pathways. This listing is 10mg lyophilized material (code RT-10). ${RUO}`,
    featured: true,
    displayOrder: 1,
  },
  {
    title: "Tesamorelin 10mg",
    slug: "tesamorelin-10mg-tsm10",
    sku: "TSM10",
    priceCAD: 80,
    imageFile: "tsm10.jpg",
    description: `Tesamorelin is a stabilized growth hormone–releasing hormone (GHRH) analog used in research on pituitary GH secretion, IGF-1 axis signaling, and visceral adipose metabolism models. This listing is the 10mg format (TSM10). ${RUO}`,
    displayOrder: 2,
  },
  {
    title: "NAD 500mg",
    slug: "nad-plus-500mg-nj500",
    sku: "NJ500",
    priceCAD: 68,
    imageFile: "nj500.jpg",
    description: `Nicotinamide adenine dinucleotide (NAD) is a central coenzyme in redox biology and is widely used in cell-culture and biochemistry research on metabolism, sirtuin activity, and mitochondrial function. This listing is 500mg (NJ500); confirm the exact salt or form on the product label. ${RUO}`,
    displayOrder: 3,
  },
  {
    title: "NAD+ 1000mg",
    slug: "nad-plus-1000mg-nj1000",
    sku: "NJ1000",
    priceCAD: 75,
    imageFile: "nj1000.jpg",
    description: `NAD+ (oxidized NAD) supports laboratory work on NAD+-dependent enzymes, PARP and sirtuin pathways, and cellular stress responses. This listing is 1000mg (NJ1000). Review the label for the precise chemical form supplied. ${RUO}`,
    displayOrder: 4,
  },
  {
    title: "CJC-1295 (No DAC) 5mg + Ipamorelin 5mg",
    slug: "cjc-1295-ipamorelin-cp-10",
    sku: "CP-10",
    priceCAD: 70,
    imageFile: "cp-10.jpg",
    description: `This combination pairs CJC-1295 (No DAC), a long-acting GHRH analog, with ipamorelin, a selective growth hormone secretagogue peptide. Together they are used in somatotropic-axis research to study GH pulse dynamics and receptor-mediated secretion in vitro and in animal models. Listed as 5mg of each peptide (CP-10). ${RUO}`,
    featured: true,
    displayOrder: 5,
  },
  {
    title: "KLOW80 80mg",
    slug: "klow80-80mg-bbkg80",
    sku: "BBKG80",
    priceCAD: 95,
    imageFile: "bbkg80.jpg",
    description: `KLOW80 is an 80mg multi-peptide blend (BBKG80) catalogued for regenerative and matrix-remodeling research alongside copper-peptide and cytoprotection studies. Confirm the full ingredient list, amounts, and lot documentation from the supplier before use in protocols. ${RUO}`,
    displayOrder: 6,
  },
  {
    title: "BPC-157 5mg + TB-500 5mg",
    slug: "bpc-157-tb-500-bb10",
    sku: "BB10",
    priceCAD: 72,
    imageFile: "bb10.jpg",
    description: `BPC-157 is a pentadecapeptide researched for cytoprotective and angiogenesis-related signaling; TB-500 (thymosin beta-4 fragment) is studied for actin dynamics, cell migration, and tissue-remodeling models. This blend lists 5mg of each component (BB10). ${RUO}`,
    displayOrder: 7,
  },
  {
    title: "BPC-157 10mg + TB-500 10mg",
    slug: "bpc-157-tb-500-bb20",
    sku: "BB20",
    priceCAD: 96,
    imageFile: "bb20.jpg",
    description: `The same BPC-157 and TB-500 research pairing as the 5mg blend, supplied at 10mg of each peptide for higher-load laboratory protocols (BB20). Used in cytoprotection, angiogenesis, and cell-migration research models. ${RUO}`,
    featured: true,
    displayOrder: 8,
  },
  {
    title: "GHK-Cu 100mg",
    slug: "ghk-cu-100mg-cu-100",
    sku: "CU-100",
    priceCAD: 67,
    imageFile: "cu-100.jpg",
    description: `GHK-Cu is the copper complex of the tripeptide glycyl-L-histidyl-L-lysine, studied in vitro for gene expression, extracellular matrix remodeling, oxidative stress, and fibroblast behavior. This listing is 100mg (CU-100). ${RUO}`,
    featured: true,
    displayOrder: 9,
  },
  {
    title: "Melanotan II",
    slug: "melanotan-ii-mt-2",
    sku: "MT-2",
    priceCAD: 66,
    imageFile: "mt-2.jpg",
    description: `Melanotan II is a synthetic melanocortin receptor agonist used in pharmacology research on MC1R/MC4R signaling and pigmentary pathway models. Confirm the labeled quantity and specifications on the vial (MT-2). ${RUO}`,
    displayOrder: 10,
  },
  {
    title: "MOTS-C 10mg",
    slug: "mots-c-10mg-ms-10",
    sku: "MS10",
    priceCAD: 66,
    imageFile: "ms-10.jpg",
    description: `MOTS-C is a mitochondria-derived peptide researched for metabolic stress responses, exercise-mimetic signaling, and AMPK-related pathways in cellular models. This listing is 10mg (MS10). ${RUO}`,
    displayOrder: 11,
  },
  {
    title: "ARA-290 10mg",
    slug: "ara-290-10mg-ara10",
    sku: "ARA10",
    priceCAD: 67,
    imageFile: "ara10.jpg",
    description: `ARA-290 is a small erythropoietin-derived peptide studied for innate repair receptor (IRR) signaling and neuroinflammation or neuropathic pain models in preclinical research. This listing is 10mg (ARA10). ${RUO}`,
    displayOrder: 12,
  },
  {
    title: "SS-31 10mg",
    slug: "ss-31-10mg-2s10",
    sku: "2S10",
    priceCAD: 72,
    imageFile: "2s10.jpg",
    description: `SS-31 (elamipretide class) is a mitochondria-targeting peptide researched for interactions with cardiolipin and models of mitochondrial dysfunction, oxidative stress, and bioenergetics. This listing is 10mg (2S10). ${RUO}`,
    displayOrder: 13,
  },
  {
    title: "PT-141 10mg",
    slug: "pt-141-10mg-p41",
    sku: "P41",
    priceCAD: 68,
    imageFile: "p41.jpg",
    description: `PT-141 (bremelanotide class) is a synthetic melanocortin receptor agonist used in CNS and peripheral MC receptor pharmacology research. This listing is 10mg (P41). ${RUO}`,
    displayOrder: 14,
  },
  {
    title: "Semax 5mg",
    slug: "semax-5mg-xa5-sx",
    sku: "XA5(SX)",
    priceCAD: 63,
    imageFile: "xa5-sx.jpg",
    description: `Semax is a synthetic ACTH(4-10) analog studied in neurotrophic and BDNF-related pathways, cognitive models, and ischemia research in laboratory settings. This listing is 5mg (XA5(SX)). ${RUO}`,
    displayOrder: 15,
  },
  {
    title: "Cartalax 20mg",
    slug: "cartalax-20mg",
    sku: "",
    priceCAD: 75,
    imageFile: "cartalax-20mg.jpg",
    description: `Cartalax is a short peptide bioregulator from the Khavinson family, researched in cartilage, extracellular matrix, and cell-senescence models. This listing is 20mg; add verified sequence and composition when confirmed by the supplier. ${RUO}`,
    displayOrder: 16,
  },
  {
    title: "Bacteriostatic Water 10ml",
    slug: "bacteriostatic-water-bac-10ml",
    sku: "BAC",
    priceCAD: 20,
    imageFile: "bac-10ml.jpg",
    category: "Research supplies",
    description: `Sterile bacteriostatic water is used in the laboratory as a common diluent for reconstituting lyophilized peptides, with benzyl alcohol to inhibit microbial growth in multi-dose use per supplier labeling. This listing is 10ml (BAC). Confirm composition and intended use on the label. ${RUO}`,
    displayOrder: 17,
  },
  {
    title: "Bacteriostatic Water 3ml",
    slug: "bacteriostatic-water-bac-3ml",
    sku: "BAC",
    priceCAD: 10,
    imageFile: "bac-3ml.jpg",
    category: "Research supplies",
    description: `Same research-laboratory role as the 10ml format: diluent for peptide reconstitution protocols where a smaller volume is required. This listing is 3ml (BAC). Confirm composition on the supplier label. ${RUO}`,
    displayOrder: 18,
  },
  {
    title: "Acetic Acid 10ml",
    slug: "acetic-acid-aa3-10ml",
    sku: "AA3",
    priceCAD: 20,
    imageFile: "aa3-10ml.jpg",
    category: "Research supplies",
    description: `Acetic acid solutions are used in peptide handling workflows for pH adjustment and solubility per laboratory SOPs and supplier instructions. This listing is 10ml (AA3); concentration and handling details must be taken from the product label. ${RUO}`,
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
