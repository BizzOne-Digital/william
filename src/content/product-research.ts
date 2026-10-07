export type ProductResearchProfile = {
  researchCategory: string;
  overview: string;
  researchThemes: string[];
  literature?: string[];
};

/** Educational copy for the shop — laboratory research context only; not dosing or medical advice. */
export const PRODUCT_RESEARCH_BY_SLUG: Record<string, ProductResearchProfile> = {
  "retatrutide-10mg-rt-10": {
    researchCategory: "Metabolic & incretin receptor research",
    overview:
      "Retatrutide is studied as a triple agonist at GLP-1, GIP, and glucagon receptors, allowing models that compare single-target incretin tools with combined pathway activation. Typical lab readouts include glucose handling, lipid metabolism, energy expenditure, and liver-fat models in preclinical systems.",
    researchThemes: [
      "Multi-receptor incretin pharmacology",
      "Glucose and insulin signaling models",
      "Hepatic fat and metabolic flexibility readouts",
      "Appetite and energy-balance pathway studies",
    ],
    literature: [
      "Triple agonist metabolic effects — Diabetes Care, 2023 (review context)",
      "Obesity-related liver disease models — Hepatology, 2023",
    ],
  },
  "tesamorelin-10mg-tsm10": {
    researchCategory: "Growth hormone axis research",
    overview:
      "Tesamorelin is a synthetic GHRH analog used to stimulate endogenous growth hormone release through pituitary GHRH receptors. It supports pulsatile GH secretion models, IGF-1 readouts, and adipose-tissue distribution studies without replacing the body’s feedback architecture in the way exogenous GH can.",
    researchThemes: [
      "Pituitary GH release and IGF-1 signaling",
      "Visceral adipose tissue models",
      "Lipid and metabolic marker panels",
      "Sleep and recovery biomarker studies",
    ],
    literature: [
      "Tesamorelin and visceral adipose tissue — NEJM, 2010",
      "Long-term GHRH analog safety literature — JAIDS, 2014",
    ],
  },
  "nad-plus-500mg-nj500": {
    researchCategory: "Energy & redox biology",
    overview:
      "NAD⁺ is a central coenzyme in mitochondrial ATP production, DNA repair enzymes, and sirtuin-mediated signaling. Declining NAD⁺ pools are modeled in aging and stress paradigms; restoring NAD⁺ availability is a common theme in cell-based longevity and metabolism experiments.",
    researchThemes: [
      "Mitochondrial energy metabolism",
      "Sirtuin and PARP substrate studies",
      "Oxidative stress and DNA repair models",
      "Cellular senescence readouts",
    ],
    literature: [
      "NAD⁺ metabolism and energy homeostasis — BioEssays, 2012",
      "NAD⁺ in aging and neurodegeneration models — Science, 2013",
    ],
  },
  "nad-plus-1000mg-nj1000": {
    researchCategory: "Energy & redox biology",
    overview:
      "This listing supplies a higher mass of NAD⁺ for extended cell-culture series, organoid work, or multi-assay programs that require consistent coenzyme levels across plates. Confirm chemical form and grade on the certificate of analysis before designing an experiment.",
    researchThemes: [
      "High-throughput redox assays",
      "Long-duration culture NAD⁺ maintenance",
      "Sirtuin activator pathway studies",
      "Mitochondrial stress models",
    ],
    literature: [
      "NAD⁺ metabolism and energy homeostasis — BioEssays, 2012",
      "NAD⁺ in aging and neurodegeneration models — Science, 2013",
    ],
  },
  "cjc-1295-ipamorelin-cp-10": {
    researchCategory: "Growth hormone secretagogue research",
    overview:
      "Pairing CJC-1295 (no DAC)—a modified GHRH analog—with ipamorelin lets researchers probe complementary GH release mechanisms: GHRH receptor stimulation plus selective ghrelin-receptor (GHS-R) activation with comparatively modest impact on cortisol and prolactin in published secretagogue profiles.",
    researchThemes: [
      "Pulsatile GH release models",
      "Lean mass and adipose metabolism readouts",
      "Sleep and recovery biomarkers in animal systems",
      "Collagen and connective-tissue signaling",
    ],
    literature: [
      "GHRP pharmacology — Journal of Clinical Endocrinology & Metabolism, 1997",
      "GHRH analog secretagogue profiles — European Journal of Endocrinology, 1998",
    ],
  },
  "klow80-80mg-bbkg80": {
    researchCategory: "Multi-peptide recovery research",
    overview:
      "KLOW80 is an 80mg blended material (BBKG80) intended for studies that span tissue repair, extracellular matrix biology, and copper-peptide signaling. Use the COA to confirm each component and ratio before building an in vitro or animal protocol.",
    researchThemes: [
      "Angiogenesis and fibroblast activity",
      "Matrix remodeling and collagen pathways",
      "Copper-peptide gene expression panels",
      "Multi-compound synergy models",
    ],
  },
  "bpc-157-10mg-bc10": {
    researchCategory: "Cytoprotection & repair signaling",
    overview:
      "BPC-157 is a synthetic peptide sequence related to gastric protective proteins. Research models explore angiogenesis, fibroblast migration, growth-factor pathways (including VEGF-linked readouts), and gastrointestinal barrier studies in controlled preclinical systems.",
    researchThemes: [
      "Tendon, ligament, and soft-tissue repair models",
      "Gut lining and barrier integrity assays",
      "Anti-inflammatory mediator panels",
      "Angiogenesis and perfusion studies",
    ],
  },
  "tb-500-5mg-bt5": {
    researchCategory: "Cell migration & actin biology",
    overview:
      "TB-500 research material aligns with thymosin beta-4 biology and actin polymerization—central to cell migration, wound-closure kinetics, and muscle/connective-tissue repair models in vitro and in vivo.",
    researchThemes: [
      "Actin dynamics and cell motility",
      "Muscle and connective-tissue recovery models",
      "Wound-healing time-course studies",
      "Combination protocols with BPC-157",
    ],
  },
  "bpc-157-tb-500-bb10": {
    researchCategory: "Dual repair-peptide research",
    overview:
      "This kit combines 5mg BPC-157 with 5mg TB-500 (BB10) for experiments that require both cytoprotective signaling and migration/actin biology in the same cohort—common in tendon, ligament, and soft-tissue research designs.",
    researchThemes: [
      "Complementary repair pathways in one model",
      "Angiogenesis plus migration readouts",
      "Soft-tissue injury time courses",
      "Inflammation resolution markers",
    ],
  },
  "bpc-157-tb-500-bb20": {
    researchCategory: "Dual repair-peptide research",
    overview:
      "A higher-strength pairing with 10mg of each peptide (BB20) for extended dosing windows in animal studies or larger-volume reconstitution schemes while keeping the same dual-mechanism design as BB10.",
    researchThemes: [
      "Scaled soft-tissue repair models",
      "Longer in vivo study timelines",
      "Matrix and perfusion biomarkers",
      "Side-by-side comparison with BB10 strength",
    ],
  },
  "ghk-cu-100mg-cu-100": {
    researchCategory: "Copper peptide & matrix biology",
    overview:
      "GHK-Cu couples the GHK tripeptide to copper and is widely used to study collagen synthesis, fibroblast behavior, elastin-related genes, and oxidative stress in skin and connective-tissue cell models.",
    researchThemes: [
      "Collagen and elastin gene panels",
      "Wound-healing and remodeling assays",
      "Anti-inflammatory signaling in culture",
      "Copper-dependent enzyme activity",
    ],
    literature: [
      "Copper peptides and skin genome remodeling — BioMed Research International, 2015",
      "GHK-Cu anti-aging pathway reviews — Aging and Disease, 2010",
    ],
  },
  "melanotan-ii-mt-2": {
    researchCategory: "Melanocortin pharmacology",
    overview:
      "Melanotan II is a melanocortin receptor ligand used to study pigmentation pathways, MC1R/MC4R signaling, and downstream cAMP effects in pharmacology and dermatology research models.",
    researchThemes: [
      "Melanogenesis and pigmentation assays",
      "Melanocortin receptor binding studies",
      "Energy balance and MC4R models",
    ],
  },
  "mots-c-10mg-ms-10": {
    researchCategory: "Mitochondrial peptide & metabolism",
    overview:
      "MOTS-c is a mitochondrial-derived peptide studied as a metabolic regulator—often linked to AMPK activation, insulin sensitivity, glucose uptake in muscle models, and diet-induced obesity paradigms in rodents.",
    researchThemes: [
      "Insulin sensitivity and glucose handling",
      "Mitochondrial–nuclear communication",
      "Exercise capacity and endurance models",
      "Metabolic syndrome reversal readouts",
    ],
    literature: [
      "MOTS-c and obesity or insulin resistance models — Cell Metabolism, 2015",
      "Mitochondrial-derived metabolic modulators — Physiological Reviews, 2021",
    ],
  },
  "ara-290-10mg-ara10": {
    researchCategory: "Innate repair receptor research",
    overview:
      "ARA-290 is a small peptide derived from erythropoietin biology and is used to probe innate repair receptor (IRR) signaling, neuroinflammation, and tissue-protection models without full erythropoietic activity.",
    researchThemes: [
      "IRR pathway activation assays",
      "Neuropathic and inflammatory pain models",
      "Cytoprotection in ischemia paradigms",
    ],
  },
  "ss-31-10mg-2s10": {
    researchCategory: "Mitochondrial membrane research",
    overview:
      "SS-31 (elamipretide) targets cardiolipin in the inner mitochondrial membrane, stabilizing electron transport chain architecture and reducing reactive oxygen species in models of mitochondrial injury, heart failure, and aging.",
    researchThemes: [
      "Cardiolipin binding and ETC efficiency",
      "ROS reduction in stress models",
      "Cardioprotection and heart-failure paradigms",
      "Pairing with other mitochondrial peptides in literature",
    ],
    literature: [
      "Elamipretide in mitochondrial dysfunction — Circulation: Heart Failure, 2017",
      "SS-31 cardiac dysfunction models — American Journal of Physiology, 2014",
    ],
  },
  "pt-141-10mg-p41": {
    researchCategory: "Melanocortin CNS pharmacology",
    overview:
      "PT-141 (bremelanotide) is a melanocortin agonist studied for central nervous system receptor binding and sexual-behavior pharmacology models distinct from peripheral tanning-related MC pathways.",
    researchThemes: [
      "MC3R/MC4R CNS signaling",
      "Sexual behavior and arousal models",
      "Autonomic and cardiovascular side-effect profiling",
    ],
  },
  "semax-10mg-xa10-sx": {
    researchCategory: "Neurotrophic peptide research",
    overview:
      "Semax is a modified ACTH fragment used in neuropharmacology models of BDNF-linked signaling, ischemia, cognition, and neuroprotection in rodent and cell systems.",
    researchThemes: [
      "BDNF and neurotrophic pathway readouts",
      "Ischemia–reperfusion brain models",
      "Learning and memory behavioral assays",
    ],
  },
  "selank-10mg-sk10": {
    researchCategory: "Anxiolytic & immunomodulatory research",
    overview:
      "Selank is a synthetic tuftsin analog studied for effects on BDNF, serotonin metabolism, enkephalins, and immune cytokines in preclinical anxiety and stress models—without benzodiazepine-style sedation in published profiles.",
    researchThemes: [
      "Anxiety and stress behavioral models",
      "BDNF and cognitive enhancement readouts",
      "Immune modulation (e.g., IL-6 panels)",
      "Intranasal vs injectable delivery comparisons",
    ],
    literature: [
      "Selank anxiolytic and nootropic properties — Journal of Psychopharmacology, 2013",
      "Immunomodulatory effects of Selank — Drug Design, Development and Therapy, 2011",
    ],
  },
  "kisspeptin-10mg-ks10": {
    researchCategory: "Reproductive endocrinology research",
    overview:
      "Kisspeptin stimulates GnRH release and downstream LH/FSH secretion, making it a cornerstone reagent in puberty, fertility, and hypogonadism research models as well as libido and mood pathway studies.",
    researchThemes: [
      "GnRH pulse generation assays",
      "LH/FSH and sex-steroid feedback loops",
      "Hypogonadism and ovulation models",
      "Central arousal and mood pathway readouts",
    ],
    literature: [
      "Kisspeptin and gonadotropin secretion — Journal of Clinical Investigation, 2005",
      "Kisspeptin effects on brain processing — JCEM, 2017",
    ],
  },
  "tirzepatide-20mg-tr20": {
    researchCategory: "Dual incretin receptor research",
    overview:
      "Tirzepatide activates both GIP and GLP-1 receptors, enabling comparison with single GLP-1 agonists in models of insulin secretion, glucagon suppression, appetite circuitry, and adipose metabolism.",
    researchThemes: [
      "Dual incretin receptor pharmacology",
      "Glycemic control and insulin sensitivity",
      "Visceral adipose and liver-fat models",
      "Energy intake and satiety biomarkers",
    ],
    literature: [
      "Tirzepatide obesity treatment trials — NEJM, 2022",
      "Metabolic effects of dual agonists — Diabetes Care, 2023",
    ],
  },
};

export function getProductResearch(slug: string): ProductResearchProfile | null {
  return PRODUCT_RESEARCH_BY_SLUG[slug] ?? null;
}
