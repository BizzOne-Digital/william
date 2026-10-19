export type EducationalGuideSection = {
  title: string;
  paragraphs: string[];
};

export type ProductEducationalGuide = {
  sections: EducationalGuideSection[];
  closingDisclaimer?: string;
};

const EDU_CLOSING_DEFAULT =
  "This guide is for educational purposes only and is not medical advice. For research use only. Not for human consumption.";

const PRODUCT_EDUCATIONAL_GUIDES: Record<string, ProductEducationalGuide> = {
  "retatrutide-10mg-rt-10": {
    sections: [
      {
        title: "Reconstitution steps",
        paragraphs: [
          "Remove the vial from refrigerator storage and allow to equilibrate at room temperature for 15–20 minutes.",
          "Wipe top of peptide and bacteriostatic water with alcohol to disinfect.",
          "Draw 1.0 mL bacteriostatic water with a sterile syringe. All our vials are vacuum sealed, so when inserting syringe to add bacteriostatic water hold plunger so it does not shoot the water into the peptide or vial.",
          "Inject slowly down the vial wall; avoid foaming.",
          "Gently swirl/roll until dissolved—solution should be clear (do not shake).",
          "Refrigerate at 2–8 °C (35.6–46.4 °F).",
        ],
      },
      {
        title: "Retatrutide (10 mg) guide",
        paragraphs: [
          "After reconstituting your 10 mg vial with 1.0 mL follow this dosage guide for best results. Retatrutide is a once per week injection, in the morning on the same day, every week (example: every Sun in the morning). Start low to minimize GI side effects (nausea, diarrhea). If side effects are felt maintain same dose for following week, then titrate up week after. When desired body composition is achieved, go to a maintenance dose of 500 mcg per week, to maintain the health benefits.",
          "Week 1 — 1 mg / 10 units on a 1 mL syringe.\nWeek 2 — 2 mg / 20 units on a 1 mL syringe. (tolerance determined)\nWeek 3 — 2.5 mg / 25 units on a 1 mL syringe. (tolerance determined)\nWeek 4 — 3 mg / 30 units on a 1 mL syringe. (tolerance determined)\nWeek 5 — 3.5 mg / 35 units on a 1 mL syringe. (tolerance determined)\nWeek 6 — 4 mg / 40 units on a 1 mL syringe. (tolerance determined)\nWeek 7 — 4.5 mg / 45 units on a 1 mL syringe. (tolerance determined)\nWeek 8 — 5 mg / 50 units on a 1 mL syringe. (tolerance determined)\nWeek 9 — 5.5 mg / 55 units on a 1 mL syringe. (tolerance determined)\nWeek 10 — 6 mg / 60 units on a 1 mL syringe. (tolerance determined)\nWeek 11 — 6.5 mg / 65 units on a 1 mL syringe. (tolerance determined)\nWeek 12 — 7 mg / 70 units on a 1 mL syringe. (tolerance determined)\nWeek 13 — 7.5 mg / 75 units on a 1 mL syringe. (tolerance determined)\nWeek 14+ — 8 mg / 80 units on a 1 mL syringe. (tolerance determined)\nTitrating up 0.5 mg in the following weeks up to a maximum of 120 units (1.2 mL); maintain at that level if tolerated.",
        ],
      },
    ],
    closingDisclaimer:
      "This guide is for educational purposes only and is not medical advice. Retatrutide is not CSA or FDA approved and is available only for research use only. All dosing must follow trial protocols.",
  },
  "cjc-1295-ipamorelin-cp-10": {
    sections: [
      {
        title: "Reconstitution",
        paragraphs: [
          "To reconstitute a standard 10 mg blend of CJC-1295 (without DAC) + Ipamorelin add 2 mL of bacteriostatic (BAC) water or 1 mL of AA water and 1 mL of BAC water to the lyophilized powder vial.",
          "Clean the vials: Wipe the rubber stoppers of both the peptide vial and the bacteriostatic water vial with an alcohol swab.",
          "Draw the water: Use a sterile syringe to draw 2 mL of bacteriostatic water or 1 mL of AA water and 1 mL of BAC water.",
          "Add the water slowly: Insert the needle into the peptide vial and slowly aim the stream down the inside wall of the glass—do not spray it directly onto the powder.",
          "Dissolve gently: Swirl the vial gently in a circular motion until the powder is completely dissolved. Never shake the vial, as vigorous shaking can damage or denature the peptide bonds.",
          "Check the solution: Ensure the liquid is clear and free of particles or cloudiness.",
        ],
      },
      {
        title: "Concentration and sizing (10 mg blend / 2 mL BAC water)",
        paragraphs: [
          "Concentration: Adding 2 mL of BAC water to a 5 mg/5 mg blend yields a concentration of 2.5 mg/mL for each peptide.",
          "Syringe measurement (U-100 insulin syringe): 1 unit = 0.01 mL; 6 units = 0.3 mg (300 mcg) of combined peptides; 20 units = 1.0 mg (1000 mcg) of combined peptides.",
        ],
      },
      {
        title: "Storage and safety",
        paragraphs: [
          "Refrigeration: Store the reconstituted vial in the refrigerator (between 36°F and 46°F / 2°C and 8°C).",
          "Stability: The mixed solution remains stable for approximately 4 to 6 weeks under proper refrigeration. Do not freeze.",
          "CJC-1295 and Ipamorelin are prescription-grade or research-use compounds and should be used under clinical guidance.",
          "Confirm the exact total mg listed on your vial and your prescribed or target dosage in mcg.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
  "bpc-157-10mg-bc10": {
    sections: [
      {
        title: "Reconstitution",
        paragraphs: [
          "To reconstitute a standalone 10 mg BPC-157 vial, mix the dry lyophilized powder with sterile bacteriostatic (BAC) water. The amount of water you add depends on how concentrated you want the liquid to be. Choosing 2 mL or 3 mL of water makes the subsequent math straightforward on a standard U-100 syringe.",
          "2 mL → 5 mg/mL → 10 units = 500 mcg (0.5 mg)\n3 mL → 3.33 mg/mL → 10 units = 333 mcg (0.33 mg)\n4 mL → 2.5 mg/mL → 10 units = 250 mcg (0.25 mg)",
          "Sanitize: Wipe the rubber stoppers of both the BPC-157 vial and the bacteriostatic water vial with a 70% isopropyl alcohol swab. Let them air dry.",
          "Draw water: Pull back your syringe plunger to draw the chosen volume (e.g., 2 mL) of bacteriostatic water from its vial.",
          "Introduce slowly: Insert the needle into the BPC-157 vial. Aim the needle at the glass wall of the vial. Slowly inject the water so it runs down the glass rather than spraying directly onto the powder.",
          "Dissolve gently: Remove the needle. Roll or swirl the vial gently between your hands until the liquid is completely clear and the powder is fully dissolved. Do not shake the vial.",
          "Storage: Store the reconstituted solution immediately in the refrigerator. Light and heat will degrade the peptide quickly.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
  "ghk-cu-50mg-cu-50": {
    sections: [
      {
        title: "Reconstitution steps",
        paragraphs: [
          "Remove the vial from refrigerator storage and allow to equilibrate at room temperature for 15–20 minutes.",
          "Wipe top of peptide and bacteriostatic water with alcohol to disinfect.",
          "Draw 3.0 mL bacteriostatic water with a sterile syringe. All our vials are vacuum sealed, so when inserting syringe to add bacteriostatic water hold plunger so it does not shoot the water into the peptide or vial.",
          "Inject slowly down the vial wall; avoid foaming.",
          "Gently swirl/roll until dissolved—solution should be clear (do not shake).",
          "Refrigerate at 2–8 °C (35.6–46.4 °F).",
        ],
      },
      {
        title: "GHK-Cu (50 mg) dosage guide",
        paragraphs: [
          "After reconstituting this 50 mg vial with 3 mL of bacteriostatic water, your concentration will be 16.6 mg/mL. Using a standard U-100 insulin syringe, refer to the following dosage marks. This is a daily injection.",
          "Low dose — 1 mg (draw to the 6-unit mark). Best for long-term anti-aging maintenance and baseline skin health.",
          "Moderate dose — 2 mg (draw to the 12-unit mark). Best for meaningful collagen support, hair growth stimulation, and daily vitality.",
          "High dose — 4 mg (draw to the 24-unit mark). Best for targeted tissue repair and intensive cellular rejuvenation.",
        ],
      },
      {
        title: "Protocol and cycle length",
        paragraphs: [
          "Hair follicles are deep-rooted structures that respond gradually over time. Meaningful improvements in density and coverage require consistency and patience—the protocol below is designed to work with your hair's natural growth cycles.",
          "Frequency: Once daily.",
          "Loading phase — months 1 to 2: GHK-Cu works at the cellular level, resetting gene expression and increasing blood flow to dormant follicles. Scalp health and texture may visibly improve, but significant hair growth is not yet expected at this stage.",
          "Transformation phase — months 3 to 6: Follicles stimulated during the loading phase have had time to mature, producing thicker hair shafts and improved coverage in previously thinning areas. By month six, changes are typically undeniable.",
          "Recovery break: After six months of consistent use, take a four to six week break. This allows the body to rebalance mineral levels before transitioning into a maintenance cycle.",
        ],
      },
      {
        title: "Administration tips",
        paragraphs: [
          "Injection site sensation: A brief sting at the injection site is normal with copper peptides and typically resolves quickly.",
          "Hydration and mineral balance: Higher doses of GHK-Cu can shift your copper-to-zinc ratio over time. To support balance, aim for 15 to 25 mg of zinc daily and stay well hydrated.",
          "Finding your dose: A daily dose of 2 mg is widely regarded as the ideal balance point, offering meaningful recovery support alongside systemic benefits for skin and hair.",
          "Storage and quality control: Refrigeration is required. A properly stored GHK-Cu solution should appear as a clear, vibrant blue. If the color shifts to murky or green, the solution has oxidized and is no longer effective. Store it toward the back of the fridge, away from light exposure.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
  "ghk-cu-100mg-cu-100": {
    sections: [
      {
        title: "Reconstitution",
        paragraphs: [
          "Reconstituting a 100 mg GHK-Cu vial involves mixing the lyophilized powder with bacteriostatic water (BAC water) using strict sterile techniques.",
          "Supplies: 100 mg GHK-Cu vial, bacteriostatic water, sterile alcohol pads, mixing/reconstitution syringe, U-100 insulin syringes.",
          "Sanitize stoppers: Wipe the rubber stoppers of both the GHK-Cu vial and the bacteriostatic water vial with a fresh sterile alcohol pad. Let them air dry.",
          "Draw bacteriostatic water: Common volumes for a 100 mg vial include 2 mL to 3 mL (or up to 10 mL depending on preferred concentration and ease of measurement on an insulin syringe).",
          "Add water to the peptide: Slowly inject bacteriostatic water down the inner glass wall of the vial—do not spray it forcefully directly onto the powder.",
          "Dissolve gently: Gently swirl or roll the vial in your hands. Never shake the vial. Wait until the powder is completely dissolved and the solution looks clear with its characteristic blue copper tint.",
          "Storage: Store the reconstituted GHK-Cu vial in the refrigerator at 2°C to 8°C.",
        ],
      },
      {
        title: "Concentration examples",
        paragraphs: [
          "100 mg ÷ 3 mL ≈ 33.33 mg/mL",
          "100 mg ÷ 2 mL = 50 mg/mL",
          "Always double-check your math or use a verified peptide reconstitution calculator before measuring your draw volume on a U-100 insulin syringe (where 1 mL = 100 units).",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
  "bpc-157-tb-500-bb10": {
    sections: [
      {
        title: "Wolverine stack (5 mg BPC-157 + 5 mg TB-500)",
        paragraphs: [
          "To reconstitute a 10 mg total Wolverine Stack vial, add bacteriostatic (BAC) water to the freeze-dried powder. Because this combination is experimental and lacks standardized human dosing guidelines, reconstitution calculations depend on your target volume.",
          "If you add 2 mL of BAC water: Total concentration = 5 mg/mL (2.5 mg/mL of each peptide). Per unit on a U-100 syringe = 50 mcg of total peptide per unit. Example: 250 mcg = 5 units.",
          "If you add 1 mL of BAC water: Total concentration = 10 mg/mL (5 mg/mL of each peptide). Per unit = 100 mcg of total peptide per unit. Example: 250 mcg = 2.5 units (round per syringe markings).",
        ],
      },
      {
        title: "Step-by-step reconstitution",
        paragraphs: [
          "Sterilize: Use an alcohol wipe to clean the rubber stoppers on both your bacteriostatic water vial and the peptide vial. Let them air dry.",
          "Draw the water: Using a fresh, sterile reconstituting syringe, pull the exact amount of BAC water you decided on (e.g., 2 mL) into the syringe.",
          "Introduce gently: Insert the needle through the center of the peptide vial's rubber stopper. Angle the needle so the water trickles slowly down the inside glass wall of the vial.",
          "Dissolve without shaking: Gently swirl or roll the vial between your hands until the powder completely dissolves. Never shake the vial.",
          "Storage: Store the vial in the refrigerator at 2–8°C (36–46°F) and protect it from light. Reconstituted peptides generally retain stability for about 30 days.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
  "bpc-157-tb-500-bb20": {
    sections: [
      {
        title: "Wolverine stack (10 mg BPC-157 + 10 mg TB-500)",
        paragraphs: [
          "To reconstitute a 20 mg Wolverine Stack vial, introduce bacteriostatic water to transform the lyophilized powder into an injectable solution. A standard approach is 2 mL or 3 mL of BAC water.",
          "If you add 2 mL of BAC water: Final concentration of 10 mg/mL total peptide (5 mg/mL of BPC-157 and 5 mg/mL of TB-500).",
          "If you add 3 mL of BAC water: Final concentration of 6.67 mg/mL total peptide (3.33 mg/mL of each individual peptide).",
        ],
      },
      {
        title: "Step-by-step reconstitution",
        paragraphs: [
          "Sanitize: Wipe the top rubber stoppers of both your bacteriostatic water vial and the peptide vial with an alcohol swab. Let them air dry.",
          "Draw the water: Use a sterile syringe to draw up your chosen volume (e.g., 2 mL) of bacteriostatic water.",
          "Equalize vacuum pressure: Hold the syringe plunger firmly to counteract the vacuum pull when piercing the stopper on vacuum-sealed vials.",
          "Introduce water slowly: Angle the needle toward the inside glass wall. Slowly trickle the BAC water down the side of the glass so it rolls into the powder.",
          "Dissolve without shaking: Gently roll the vial between your palms or swirl it slowly until the powder is fully dissolved and the liquid is clear.",
          "Storage: Immediately place the reconstituted vial into the refrigerator.",
        ],
      },
      {
        title: "Important safety note",
        paragraphs: [
          "BPC-157 and TB-500 are investigational agents—not approved by the FDA or Health Canada for human use. Gray-market injectables carry risks of contamination or infection. Because both peptides stimulate angiogenesis, there are theoretical concerns regarding undiagnosed malignancies. Consult a licensed healthcare professional for approved treatment pathways when treating injury or chronic pain.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
  "tesamorelin-10mg-tsm10": {
    sections: [
      {
        title: "Reconstitution steps",
        paragraphs: [
          "Remove the vial from refrigerator storage and allow to equilibrate at room temperature for 15–20 minutes.",
          "Draw 1 mL bacteriostatic water with a sterile syringe.",
          "Wipe top of peptide and bacteriostatic water with alcohol to disinfect.",
          "Inject slowly down the vial wall; avoid foaming. All our vials are vacuum sealed, so when inserting syringe to add bacteriostatic water hold plunger so it does not shoot the water into the peptide or vial.",
          "Gently swirl/roll until dissolved (do not shake).",
          "Refrigerate at 2–8 °C (35.6–46.4 °F).",
        ],
      },
      {
        title: "Tesamorelin (10 mg) guide",
        paragraphs: [
          "Low (1 mg): Draw back to the 10-unit mark. Ideal for maintenance and long-term metabolic support with minimal side effects.",
          "The ideal spot (2 mg): Draw back to the 20-unit mark. Ideal for the standard clinical dose for maximum fat loss, specifically targeting visceral (belly) fat.",
        ],
      },
      {
        title: "Protocol and cycle length",
        paragraphs: [
          "The 5/2 schedule: Dose once daily for 5 consecutive days, then take 2 days off (e.g., Monday–Friday on, Saturday–Sunday off).",
          "Cycle length: A minimum of 12 weeks is recommended, with cycles extendable to 20 weeks. Significant improvements often emerge between months 3 and 5.",
          "The break: After completing your cycle, take a 4–6 week break before beginning again.",
        ],
      },
      {
        title: "Administration tips",
        paragraphs: [
          "Start low, go slow: Begin at 500 mcg–1 mg for the first two weeks to minimize potential joint stiffness.",
          "Tapering off: Reduce dosage gradually over the final two weeks of a cycle rather than stopping abruptly.",
          "Hydration: Keep water intake high throughout your cycle.",
          "When to take: Once daily in the evening, ideally before bed on an empty stomach—at least 2 hours after your last meal. Elevated insulin from food can blunt the growth hormone pulse.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
  "nad-plus-500mg-nj500": {
    sections: [
      {
        title: "Reconstitution steps",
        paragraphs: [
          "Remove the vial from refrigerator storage and allow to equilibrate at room temperature for 15–20 minutes.",
          "Wipe top of peptide and bacteriostatic water with alcohol to disinfect.",
          "Draw 5.0 mL (5 × 1 mL syringe) bacteriostatic water with a sterile syringe. All our vials are vacuum sealed, so when inserting syringe to add bacteriostatic water hold plunger so it does not shoot the water into the peptide or vial.",
          "Inject slowly down the vial wall; avoid foaming.",
          "Gently swirl/roll until dissolved—solution should be clear (do not shake).",
          "Refrigerate at 2–8 °C (35.6–46.4 °F).",
        ],
      },
      {
        title: "NAD+ (500 mg) dosage guide",
        paragraphs: [
          "50 mg dose: Draw to the 50-unit mark (0.5 mL).",
          "100 mg dose: Draw to the 100-unit mark (1.0 mL).",
          "150 mg dose: Requires 150 units (1.5 mL).",
        ],
      },
      {
        title: "Protocol and cycle length",
        paragraphs: [
          "Frequency: Administer 3 times per week.",
          "Cycle length: A typical cycle lasts 4 to 8 weeks. Many users transition to a weekly maintenance dose afterward.",
          "The break: Take a 2 to 4-week break after your cycle.",
        ],
      },
      {
        title: "Administration tips",
        paragraphs: [
          "The flush: Rapid administration can trigger chest pressure, nausea, or flushing. Split the dose or slow injection speed to reduce the response.",
          "Subcutaneous vs. IM: Higher-volume NAD+ doses (100 mg+) often use intramuscular (IM) injection for comfort and absorption.",
          "Hydration and electrolytes: Prioritize water intake and electrolytes, particularly magnesium and potassium.",
        ],
      },
    ],
    closingDisclaimer:
      "This guide is for educational purposes only and is not medical advice. NAD+ is an experimental compound for research use only. Not for human consumption.",
  },
  "klow80-80mg-bbkg80": {
    sections: [
      {
        title: "What is in an 80 mg KLOW vial?",
        paragraphs: [
          "Total content: 80 mg blend (typically 50 mg GHK-Cu, 10 mg BPC-157, 10 mg TB-500, and 10 mg KPV). Sold strictly as a non-FDA-approved research compound.",
        ],
      },
      {
        title: "Reconstitution protocol",
        paragraphs: [
          "Prepare workspace: Clean your surface and wipe the rubber stoppers of both the KLOW vial and the bacteriostatic water vial with a 70% isopropanol alcohol swab.",
          "Measure diluent: Draw your chosen volume of bacteriostatic (BAC) water into a sterile syringe.",
          "Inject diluent: Slowly inject bacteriostatic water down the inside glass wall of the vial rather than spraying it directly onto the powder.",
          "Dissolve: Gently swirl or rotate the vial until the powder dissolves completely. Do not shake or vortex the vial.",
          "Inspect: Check the solution for clarity and make sure no undissolved particulates remain.",
          "Storage: Refrigerate the reconstituted solution. Store unconstituted dry powder at appropriate low temperatures for extended storage.",
        ],
      },
      {
        title: "Reconstitution volume comparison",
        paragraphs: [
          "2 mL → 40 mg/mL → 10 units = 4 mg of total blend",
          "3 mL → 26.7 mg/mL → 10 units = 2.67 mg of total blend",
          "4 mL → 20 mg/mL → 10 units = 2 mg of total blend",
          "Ensure the glass vial has enough capacity for your chosen volume. Most standard peptide vials safely hold up to 3 mL or 5 mL of liquid.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
  "tb-500-5mg-bt5": {
    sections: [
      {
        title: "Reconstitution steps",
        paragraphs: [
          "Remove the vial from refrigerator storage and allow to equilibrate at room temperature for 15–20 minutes.",
          "Draw 1.0 mL bacteriostatic water with a sterile syringe.",
          "Wipe top of peptide and bacteriostatic water with alcohol to disinfect.",
          "Inject slowly down the vial wall; avoid foaming. All our vials are vacuum sealed, so when inserting syringe to add bacteriostatic water hold plunger so it does not shoot the water into the peptide or vial.",
          "Gently swirl/roll until dissolved (do not shake).",
          "Refrigerate at 2–8 °C (35.6–46.4 °F).",
        ],
      },
      {
        title: "TB-500 (5 mg) guide",
        paragraphs: [
          "After reconstituting this 5 mg vial with 1 mL of bacteriostatic water, the concentration is 5 mg/mL. Using a standard U-100 insulin syringe:",
          "Maintenance dosage (2.5 mg per injection for 5+ weeks): Draw to the 50-unit mark. Once weekly. Ideal for ongoing joint health, flexibility, and preventing new injuries.",
          "The ideal spot (5 mg per injection): Draw to the 100-unit mark (full 1 mL). Once weekly. Ideal for standard recovery for muscle tears, tendonitis, or ligament strain.",
          "Loading dosage (up to 10 mg per week for 1–4 weeks): Draw to the 50-unit mark twice per week (5 mg + 5 mg). Ideal for rapid tissue saturation following a fresh injury or surgery.",
        ],
      },
      {
        title: "Protocol and cycle length",
        paragraphs: [
          "Loading phase (weeks 1–4): Administer 5 mg to 10 mg per week, split into two injections (e.g., Monday and Thursday).",
          "Maintenance phase (weeks 5+): Administer 2.5 mg to 5 mg once per week.",
          "Cycle length: Typically 6 to 12 weeks. Consistency over 3 months often yields the best structural results.",
          "Systemic repair: TB-500 travels through the bloodstream to find and repair damaged tissue anywhere in the body—it does not need to be site injected but can be if you prefer.",
        ],
      },
      {
        title: "Administration tips",
        paragraphs: [
          "TB-500 has a very low molecular weight and moves through the body with ease. You do not need to inject near the site of injury.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
  "kpv-10mg-kp10": {
    sections: [
      {
        title: "Reconstitution steps",
        paragraphs: [
          "Remove the vial from refrigerator storage and allow to equilibrate at room temperature for 15–20 minutes.",
          "Wipe top of peptide and bacteriostatic water with alcohol to disinfect.",
          "Draw 2.0 mL bacteriostatic water with a sterile syringe. All our vials are vacuum sealed, so when inserting syringe to add bacteriostatic water hold plunger so it does not shoot the water into the peptide or vial.",
          "Inject slowly down the vial wall; avoid foaming.",
          "Gently swirl/roll until dissolved—solution should be clear (do not shake).",
          "Refrigerate at 2–8 °C (35.6–46.4 °F).",
        ],
      },
      {
        title: "KPV (10 mg) dosage guide",
        paragraphs: [
          "Low dosage (250 mcg): Draw to the 5-unit mark. Ideal for maintaining gut health and baseline immune support.",
          "The ideal spot (500 mcg): Draw to the 10-unit mark. Ideal for standard protocol for inflammatory skin issues or joint flares.",
          "High dosage (1 mg): Draw to the 20-unit mark. Ideal for focused support during acute gut irritation or intensive tissue repair.",
        ],
      },
      {
        title: "Protocol and cycle length",
        paragraphs: [
          "KPV is most effective when used to target specific flares rather than being run indefinitely.",
          "Frequency: Administer once daily.",
          "Cycle length: A typical cycle lasts 4 to 8 weeks. Once the gut or skin has stabilized, a break is recommended.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
};

export function getProductEducationalGuide(slug: string): ProductEducationalGuide | null {
  return PRODUCT_EDUCATIONAL_GUIDES[slug] ?? null;
}
