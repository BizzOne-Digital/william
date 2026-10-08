export type ProductResearchProfile = {
  researchCategory?: string;
  description: string;
  reconstitution: string;
};

/** Shop copy: research purpose + reconstitution reference (not dosing advice). */
export const PRODUCT_RESEARCH_BY_SLUG: Record<string, ProductResearchProfile> = {
  "retatrutide-10mg-rt-10": {
    description:
      "Activates GLP-1, GIP and glucagon receptors. Investigated for appetite regulation, body weight and glucose metabolism. Reference: pubmed.ncbi.nlm.nih.gov",
    reconstitution: "1 mL bacteriostatic water.",
  },
  "tesamorelin-10mg-tsm10": {
    description:
      "A GHRH analogue that stimulates growth hormone release. Clinical evidence focuses on excess abdominal fat in HIV-associated lipodystrophy. Reference: www.accessdata.fda.gov",
    reconstitution: "2 mL bacteriostatic water.",
  },
  "nad-plus-500mg-nj500": {
    description:
      "A cellular coenzyme involved in energy metabolism. Investigated for NAD+ metabolism; injectable anti-aging benefits remain unconfirmed. Reference: pmc.ncbi.nlm.nih.gov",
    reconstitution: "5 mL no-sting water (exact composition not specified on source sheet).",
  },
  "nad-plus-1000mg-nj1000": {
    description:
      "The same NAD+ coenzyme in a larger quantity, associated with research on cellular energy metabolism and NAD+ availability. Reference: pmc.ncbi.nlm.nih.gov",
    reconstitution: "10 mL no-sting water (exact composition not specified on source sheet).",
  },
  "cjc-1295-ipamorelin-cp-10": {
    description:
      "A two-peptide blend associated with growth-hormone-signaling research. Clinical recovery and muscle-building benefits for this blend remain unconfirmed. Reference: pubmed.ncbi.nlm.nih.gov",
    reconstitution: "1 mL diluent (type not specified on source sheet).",
  },
  "klow80-80mg-bbkg80": {
    description:
      "The sheet lists BPC-157, TB4, GHK-Cu and KPV. Individual components are investigated for repair-related, collagen and inflammatory pathways. Reference: pmc.ncbi.nlm.nih.gov",
    reconstitution: "3 mL bacteriostatic water or no-sting water (confirm exact formulation on your vial).",
  },
  "bpc-157-10mg-bc10": {
    description:
      "A research peptide investigated for tendon-cell activity and repair-related processes, predominantly in laboratory and animal studies. Reference: pmc.ncbi.nlm.nih.gov",
    reconstitution: "1 mL diluent (type not specified on source sheet).",
  },
  "tb-500-5mg-bt5": {
    description:
      "A thymosin-beta-4-related peptide investigated for cell migration and wound repair in animal models. Human benefits remain uncertain. Reference: europepmc.org",
    reconstitution: "1 mL bacteriostatic water (for this 5 mg vial).",
  },
  "kpv-10mg-kp10": {
    description:
      "A three-amino-acid peptide derived from alpha-MSH. Investigated for inflammatory signaling and intestinal inflammation in experimental models. Reference: pubmed.ncbi.nlm.nih.gov",
    reconstitution: "1 mL bacteriostatic water.",
  },
  "bpc-157-tb-500-bb10": {
    description:
      "A blend containing 10 mg total peptide material. Its components are studied in tissue-repair models; human benefits for the combination remain unconfirmed. Reference: pmc.ncbi.nlm.nih.gov",
    reconstitution: "2 mL bacteriostatic water (reference for this 5 mg + 5 mg blend).",
  },
  "bpc-157-tb-500-bb20": {
    description:
      "A blend containing 20 mg total peptide material, associated with research involving repair-related cell activity and tissue-injury models. Reference: pmc.ncbi.nlm.nih.gov",
    reconstitution: "2 mL bacteriostatic water (reference for this 10 mg + 10 mg blend).",
  },
  "ghk-cu-100mg-cu-100": {
    description:
      "A copper-binding tripeptide investigated for collagen synthesis, connective-tissue remodeling and wound biology. Reference: pubmed.ncbi.nlm.nih.gov",
    reconstitution: "2 mL bacteriostatic water (reference; confirm on product label).",
  },
  "melanotan-ii-mt-2": {
    description:
      "A synthetic melanocortin-receptor agonist investigated for melanin production and skin pigmentation. Reference: www.sciencedirect.com",
    reconstitution: "1 mL bacteriostatic water (reference; confirm on product label).",
  },
  "mots-c-10mg-ms-10": {
    description:
      "A mitochondria-derived peptide investigated for insulin sensitivity, skeletal-muscle metabolism and responses to metabolic stress. Reference: pubmed.ncbi.nlm.nih.gov",
    reconstitution: "1 mL diluent (type not specified on source sheet).",
  },
  "ara-290-10mg-ara10": {
    description:
      "Also called cibinetide. Investigated for tissue-protective signaling and small-fiber neuropathy symptoms in small clinical studies. Reference: pubmed.ncbi.nlm.nih.gov",
    reconstitution: "1 mL bacteriostatic water (reference; confirm on product label).",
  },
  "ss-31-10mg-2s10": {
    description:
      "Also called elamipretide. Targets mitochondrial cardiolipin and is investigated for mitochondrial function and energy production. Reference: pubmed.ncbi.nlm.nih.gov",
    reconstitution:
      "1 mL bacteriostatic water for this 10 mg vial (source materials for 50 mg often cite 5 mL; scale to your label).",
  },
  "pt-141-10mg-p41": {
    description:
      "Also called bremelanotide. Activates melanocortin receptors involved in sexual-desire signaling; clinical evidence concerns specific prescription formulations. Reference: www.accessdata.fda.gov",
    reconstitution: "1 mL bacteriostatic water (reference; confirm on product label).",
  },
  "semax-10mg-xa10-sx": {
    description:
      "An ACTH-fragment analogue investigated for neurotrophic-factor expression, brain-cell signaling and neuroprotection in experimental models. Reference: pubmed.ncbi.nlm.nih.gov",
    reconstitution: "1 mL bacteriostatic water.",
  },
  "cartalax-20mg": {
    description:
      "A short synthetic peptide commonly identified as Ala-Glu-Asp, proposed for bone and cartilage research. Supporting evidence is preliminary. Reference: patents.google.com",
    reconstitution: "2 mL bacteriostatic water (reference for 20 mg; confirm on product label).",
  },
  "selank-10mg-sk10": {
    description:
      "A tuftsin analogue investigated for anxiety-related effects and neurotransmitter signaling, including GABA-associated pathways. Reference: pubmed.ncbi.nlm.nih.gov",
    reconstitution: "1 mL bacteriostatic water.",
  },
  "kisspeptin-10mg-ks10": {
    description:
      "A reproductive-signaling peptide investigated for GnRH release, reproductive-hormone regulation and fertility-related pathways. Reference: pubmed.ncbi.nlm.nih.gov",
    reconstitution: "2 mL bacteriostatic water (confirm peptide form on your vial label).",
  },
  "tirzepatide-20mg-tr20": {
    description:
      "Activates GIP and GLP-1 receptors, influencing insulin secretion, glucose regulation and appetite. Reference: www.accessdata.fda.gov",
    reconstitution: "2 mL bacteriostatic water.",
  },
  "dsip-15mg": {
    description:
      "Delta Sleep-Inducing Peptide is investigated for sleep regulation. Small insomnia studies have not established a reliable therapeutic benefit. Reference: pubmed.ncbi.nlm.nih.gov",
    reconstitution: "2 mL bacteriostatic water (reference for 15 mg; confirm on product label).",
  },
};

export function getProductResearch(slug: string): ProductResearchProfile | null {
  return PRODUCT_RESEARCH_BY_SLUG[slug] ?? null;
}

export function formatProductResearchForDb(slug: string): string | null {
  const p = getProductResearch(slug);
  if (!p) return null;
  return `${p.description}\n\nReconstitution (reference): ${p.reconstitution}`;
}
