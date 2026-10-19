import { CLIENT_PRODUCT_DESCRIPTIONS } from "@/content/client-product-copy";

export type ProductResearchProfile = {
  researchCategory?: string;
  description: string;
  reconstitution: string;
};

/** Shop copy: research purpose + reconstitution (not dosing advice). */
export const PRODUCT_RESEARCH_BY_SLUG: Record<string, ProductResearchProfile> = {
  "retatrutide-10mg-rt-10": {
    description:
      "Activates GLP-1, GIP and glucagon receptors. Investigated for appetite regulation, body weight and glucose metabolism.",
    reconstitution: "1 mL bacteriostatic water (BAC).",
  },
  "tesamorelin-10mg-tsm10": {
    description:
      "A GHRH analogue that stimulates growth hormone release. Clinical evidence focuses on excess abdominal fat in HIV-associated lipodystrophy.",
    reconstitution: "1 mL bacteriostatic water (BAC).",
  },
  "nad-plus-500mg-nj500": {
    description:
      "A cellular coenzyme involved in energy metabolism. Investigated for NAD+ metabolism; injectable anti-aging benefits remain unconfirmed.",
    reconstitution: "5 mL bacteriostatic water (BAC).",
  },
  "nad-plus-1000mg-nj1000": {
    description:
      "The same NAD+ coenzyme in a larger quantity, associated with research on cellular energy metabolism and NAD+ availability.",
    reconstitution: "10 mL bacteriostatic water (BAC).",
  },
  "cjc-1295-ipamorelin-cp-10": {
    description:
      "A two-peptide blend associated with growth-hormone-signaling research. Clinical recovery and muscle-building benefits for this blend remain unconfirmed.",
    reconstitution:
      "2 mL bacteriostatic water (BAC), or 1 mL acetic-acid water and 1 mL BAC water.",
  },
  "klow80-80mg-bbkg80": {
    description:
      "The sheet lists BPC-157, TB4, GHK-Cu and KPV. Individual components are investigated for repair-related, collagen and inflammatory pathways.",
    reconstitution: "3 mL bacteriostatic water (BAC).",
  },
  "bpc-157-10mg-bc10": {
    description:
      "A research peptide investigated for tendon-cell activity and repair-related processes, predominantly in laboratory and animal studies.",
    reconstitution: "2–4 mL bacteriostatic water (BAC); see educational guide for concentration math.",
  },
  "tb-500-5mg-bt5": {
    description:
      "A thymosin-beta-4-related peptide investigated for cell migration and wound repair in animal models. Human benefits remain uncertain.",
    reconstitution: "1 mL bacteriostatic water (BAC).",
  },
  "kpv-10mg-kp10": {
    description:
      "A three-amino-acid peptide derived from alpha-MSH. Investigated for inflammatory signaling and intestinal inflammation in experimental models.",
    reconstitution: "2 mL bacteriostatic water (BAC).",
  },
  "bpc-157-tb-500-bb10": {
    description:
      "The Wolverine Stack — 10 mg total (5 mg BPC-157 + 5 mg TB-500). Studied in tissue-repair models; human benefits for the combination remain unconfirmed.",
    reconstitution: "2 mL bacteriostatic water (BAC).",
  },
  "bpc-157-tb-500-bb20": {
    description:
      "The Wolverine Stack — 20 mg total (10 mg BPC-157 + 10 mg TB-500), associated with research involving repair-related cell activity and tissue-injury models.",
    reconstitution: "2 mL bacteriostatic water (BAC).",
  },
  "ghk-cu-100mg-cu-100": {
    description:
      "A copper-binding tripeptide investigated for collagen synthesis, connective-tissue remodeling and wound biology.",
    reconstitution: "2 mL bacteriostatic water (BAC).",
  },
  "ghk-cu-50mg-cu-50": {
    description:
      "A copper-binding tripeptide investigated for collagen synthesis, connective-tissue remodeling and wound biology.",
    reconstitution: "3 mL bacteriostatic water (BAC).",
  },
  "melanotan-ii-mt-2": {
    description:
      "A synthetic melanocortin-receptor agonist investigated for melanin production and skin pigmentation.",
    reconstitution: "1 mL bacteriostatic water (BAC).",
  },
  "mots-c-10mg-ms-10": {
    description:
      "A mitochondria-derived peptide investigated for insulin sensitivity, skeletal-muscle metabolism and responses to metabolic stress.",
    reconstitution: "1 mL bacteriostatic water (BAC).",
  },
  "ara-290-10mg-ara10": {
    description:
      "Also called cibinetide. Investigated for tissue-protective signaling and small-fiber neuropathy symptoms in small clinical studies.",
    reconstitution: "1 mL bacteriostatic water (BAC).",
  },
  "ss-31-10mg-2s10": {
    description:
      "Also called elamipretide. Targets mitochondrial cardiolipin and is investigated for mitochondrial function and energy production.",
    reconstitution: "1 mL bacteriostatic water (BAC).",
  },
  "pt-141-10mg-p41": {
    description:
      "Also called bremelanotide. Activates melanocortin receptors involved in sexual-desire signaling in research models.",
    reconstitution: "1 mL bacteriostatic water (BAC).",
  },
  "semax-10mg-xa10-sx": {
    description:
      "An ACTH-fragment analogue investigated for neurotrophic-factor expression, brain-cell signaling and neuroprotection in experimental models.",
    reconstitution: "3 mL bacteriostatic water (BAC).",
  },
  "cartalax-20mg": {
    description:
      "A short synthetic peptide commonly identified as Ala-Glu-Asp, proposed for bone and cartilage research.",
    reconstitution: "3 mL bacteriostatic water (BAC).",
  },
  "selank-10mg-sk10": {
    description:
      "A tuftsin analogue investigated for anxiety-related effects and neurotransmitter signaling, including GABA-associated pathways.",
    reconstitution: "3 mL bacteriostatic water (BAC).",
  },
  "kisspeptin-10mg-ks10": {
    description:
      "A reproductive-signaling peptide investigated for GnRH release, reproductive-hormone regulation and fertility-related pathways.",
    reconstitution: "3 mL bacteriostatic water (BAC).",
  },
  "tirzepatide-20mg-tr20": {
    description:
      "A dual GIP and GLP-1 receptor agonist investigated for glucose regulation, digestion, and appetite signaling.",
    reconstitution: "2 mL bacteriostatic water (BAC).",
  },
  "dsip-15mg": {
    description:
      "Delta Sleep-Inducing Peptide is investigated for sleep regulation. Small insomnia studies have not established a reliable therapeutic benefit.",
    reconstitution: "2 mL bacteriostatic water (BAC).",
  },
};

export function getProductResearch(slug: string): ProductResearchProfile | null {
  const base = PRODUCT_RESEARCH_BY_SLUG[slug];
  const clientDescription = CLIENT_PRODUCT_DESCRIPTIONS[slug];
  if (!base && !clientDescription) return null;

  return {
    researchCategory: base?.researchCategory,
    description: clientDescription ?? base!.description,
    reconstitution: base?.reconstitution ?? "",
  };
}

export function formatProductResearchForDb(slug: string): string | null {
  const p = getProductResearch(slug);
  if (!p) return null;
  if (!p.reconstitution.trim()) return p.description;
  return `${p.description}\n\nReconstitution: ${p.reconstitution}`;
}
