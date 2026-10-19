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
          "Week 1 — 1 mg / 10 units on a 1 mL syringe.\nWeek 2 — 2 mg / 20 units on a 1 mL syringe. (tolerance determined)\nWeek 3 — 2.5 mg / 25 units on a 1 mL syringe. (tolerance determined)\nWeek 4 — 3 mg / 30 units on a 1 mL syringe. (tolerance determined)",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
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
          "To reconstitute a 10 mg total Wolverine Stack vial, add bacteriostatic (BAC) water to the freeze-dried powder. How much water you add determines your final concentration.",
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
  "mots-c-10mg-ms-10": {
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
        title: "When to take: the morning pre-workout window",
        paragraphs: [
          "Optimal timing: Administer in the morning, 30–60 minutes before training.",
          "MOTS-c is most effective when paired with activity. It primes your mitochondria to handle workout stress and accelerates fat oxidation (burning fat for fuel).",
          "Fasted cardio: If you perform fasted morning cardio, MOTS-c helps protect muscle tissue from being broken down for energy, encouraging the body to tap into stored fat instead.",
        ],
      },
      {
        title: "MOTS-c (10 mg) dosage guide",
        paragraphs: [
          "After reconstituting with 1 mL bacteriostatic water (10 mg/mL):",
          "Beginner dosage (2.5 mg): Draw to the 25-unit mark. Ideal for beginners, those sensitive to metabolic shifts, or daily micro-pulsing protocols.",
          "Intermediate dosage (5 mg): Draw to the 50-unit mark. Ideal for significant athletic performance and metabolic maintenance.",
        ],
      },
      {
        title: "Protocol and cycle length",
        paragraphs: [
          "Frequency: Administer 2 times per week (e.g., Tue/Thurs).",
          "Cycle length: A typical cycle lasts 4 to 6 weeks, followed by a 4-week break.",
        ],
      },
      {
        title: "Administration tips",
        paragraphs: [
          "Volume management: A 5 mg dose is 0.5 mL on a 1 mL reconstitution—some users split across two injection sites for comfort and absorption.",
          "The lactic sensation: A mild warmth or pump at the injection site can occur with metabolic activation. Sites with more subcutaneous fat, such as the outer glute or upper-outer thigh, are often more comfortable.",
          "Insulin sensitivity: MOTS-c drives glucose into working muscle. If you are on a hard cut or low-carb diet, monitor energy; a small piece of fruit pre-workout may help balance increased glucose demand.",
        ],
      },
    ],
    closingDisclaimer:
      "This guide is for educational purposes only and is not medical advice. MOTS-c is an experimental compound for research use only. Not for human consumption.",
  },
  "ara-290-10mg-ara10": {
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "ARA-290 (cibinetide) is a non-erythropoietic peptide derived from erythropoietin (EPO), evaluated in research for small fiber neuropathy and nerve repair. Reconstitution and dosing require careful calculations on a standard U-100 insulin syringe.",
        ],
      },
      {
        title: "Reconstitution instructions",
        paragraphs: [
          "ARA-290 arrives as lyophilized powder mixed with bacteriostatic water (BAC water) for multi-dose vials.",
          "Prep: Allow the peptide vial to reach room temperature (approx. 15–20 minutes). Clean the rubber stoppers of both the BAC water and peptide vials with an alcohol swab.",
          "Introduce water: Draw the desired amount of BAC water into a sterile syringe. Slowly inject the water into the ARA-290 vial.",
          "Dissolve: Swirl or roll the vial gently until the powder completely dissolves into a clear solution. Avoid vigorous shaking.",
        ],
      },
      {
        title: "Dosage and protocol overview",
        paragraphs: [
          "Standard trial dosage: 4 mg per day in many studies evaluating sarcoidosis and diabetic small fiber neuropathy.",
          "Alternative schedules: Some models explore 2 mg daily or 4 mg injected 4 times per week.",
          "Standard cycle length: Often administered daily for 28 days (4 weeks). Extended research cycles sometimes span up to 12 weeks.",
          "Route of administration: Primarily subcutaneous injection into the anterior thigh or abdomen.",
        ],
      },
      {
        title: "Reconstitution and syringe math (10 mg vial)",
        paragraphs: [
          "On a U-100 insulin syringe, 1 mL = 100 units.",
          "10 mg vial + 1.0 mL BAC → 10 mg/mL → 4 mg dose = 0.40 mL (40 units).",
          "10 mg vial + 2.0 mL BAC → 5 mg/mL → 4 mg dose = 0.80 mL (80 units).",
          "16 mg vial + 2.0 mL BAC → 8 mg/mL → 4 mg dose = 0.50 mL (50 units).",
        ],
      },
      {
        title: "Storage and stability",
        paragraphs: [
          "Once reconstituted, store refrigerated at 2–8°C (36–46°F) and protect from direct light.",
          "Reconstituted ARA-290 is ideally used within 14 to 28 days when kept cold; at room temperature it can degrade within 24 hours.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
  "ss-31-10mg-2s10": {
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
        title: "SS-31 (10 mg) dosage guide",
        paragraphs: [
          "After reconstituting this 10 mg vial with 1 mL of bacteriostatic water, the concentration is 10 mg/mL. Frequency: administer daily.",
          "Low dosage (1 mg): Draw to the 10-unit mark. Ideal for baseline mitochondrial support and cellular energy maintenance.",
          "The ideal range (2.5 mg): Draw to the 25-unit mark. Ideal for standard recovery for muscle fatigue, neuroprotection, and metabolic support.",
          "High dosage (5 mg): Draw to the 50-unit mark. Ideal for intensive protocols targeting acute oxidative stress or significant tissue repair.",
        ],
      },
      {
        title: "Protocol and cycle length",
        paragraphs: [
          "SS-31 is a mitochondria-targeting peptide most effective in structured cycles to support cellular respiration and ATP production.",
          "Cycle length: A typical cycle lasts 4 to 12 weeks. For many, a 4-week cycle is sufficient, followed by a 4-week break.",
        ],
      },
      {
        title: "Administration tips",
        paragraphs: [
          "Start low, go slow: Begin with 1 mg (10 units) during your first week, then adjust upward as needed.",
          "Tapering off: Many users reduce dosage gradually during the final week of a cycle.",
          "Hydration: Drink plenty of water throughout your cycle as metabolic shifts can increase hydration needs.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
  "pt-141-10mg-p41": {
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
        title: "PT-141 (10 mg) dosage guide",
        paragraphs: [
          "After reconstituting with 1 mL (10 mg/mL):",
          "0.5 mg (low dose): Draw to the 5-unit mark.",
          "1.0 mg (standard dose): Draw to the 10-unit mark.",
          "1.5 mg (high dose): Draw to the 15-unit mark.",
          "2.0 mg (maximum dose): Draw to the 20-unit mark.",
        ],
      },
      {
        title: "Protocol and timing",
        paragraphs: [
          "Unlike fast-acting oral medications, PT-141 works on a longer ramp-up cycle and requires advance planning.",
          "The window: Administer 4–6 hours before sexual activity. Peak effects often occur around the 6-hour mark and can persist for up to 24–48 hours.",
          "Frequency: Use as needed, but limit to 2–3 times per week to reduce receptor desensitization.",
        ],
      },
      {
        title: "Administration tips",
        paragraphs: [
          "Managing nausea: Temporary nausea 30–60 minutes post-injection is common. OTC anti-nausea support or ginger, hydration, and slower titration may help.",
          "The slow load for new users: Start at 1 mg (10 units). If needed, wait 48 hours before stepping up to 1.5 mg—do not double-dose the same night.",
          "Blood pressure awareness: PT-141 can temporarily elevate blood pressure. Begin at the lowest dose if you monitor blood pressure closely.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
  "semax-10mg-xa10-sx": {
    sections: [
      {
        title: "Reconstitution steps",
        paragraphs: [
          "Remove the vial from refrigerator storage and allow to equilibrate at room temperature for 15–20 minutes.",
          "Wipe top of peptide and bacteriostatic water with alcohol to disinfect.",
          "Draw 3.0 mL (3 × 1 mL syringe) bacteriostatic water with a sterile syringe. All our vials are vacuum sealed, so when inserting syringe to add bacteriostatic water hold plunger so it does not shoot the water into the peptide or vial.",
          "Inject slowly down the vial wall; avoid foaming.",
          "Gently swirl/roll until dissolved—solution should be clear (do not shake).",
          "Refrigerate at 2–8 °C (35.6–46.4 °F).",
        ],
      },
      {
        title: "Semax (10 mg) guide",
        paragraphs: [
          "After reconstituting this 10 mg vial with 3 mL of bacteriostatic water:",
          "Low (250 mcg): Draw to the 7.5-unit mark. Ideal for beginners or a subtle mood and focus boost.",
          "The ideal spot (500 mcg): Draw to the 15-unit mark. Ideal for cognitive enhancement, clearing brain fog, and intense study or work sessions.",
          "High (1 mg): Draw to the 30-unit mark. Ideal for acute recovery support or high-demand neurological tasks. May feel overstimulating if taken late in the day.",
        ],
      },
      {
        title: "Protocol and cycle length",
        paragraphs: [
          "Frequency: Administer once daily.",
          "Cycle length: A typical cycle lasts 4 weeks.",
          "The break: Take a 2 to 4-week break between cycles.",
        ],
      },
      {
        title: "Administration tips",
        paragraphs: [
          "Start low, go slow: Consider 100 mcg (3 units) for the first few days to assess mental lift.",
          "Tapering off: Lower dosage over the final 3 days of a cycle rather than stopping abruptly.",
          "Storage: Refrigerate once mixed; protect from light and do not shake during reconstitution.",
          "Hydration: Proper water intake supports increased metabolic activity in the brain.",
        ],
      },
      {
        title: "When to take",
        paragraphs: [
          "Administer in the morning or early afternoon to support alertness without disrupting sleep.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
  "cartalax-20mg": {
    sections: [
      {
        title: "Reconstitution steps",
        paragraphs: [
          "Remove the vial from refrigerator storage and allow to equilibrate at room temperature for 30 or more minutes.",
          "Remove protective plastic cap; wipe top of peptide and bacteriostatic water with alcohol to disinfect.",
          "Draw 3.0 mL bacteriostatic water with a sterile syringe. All our vials are vacuum sealed, so when inserting syringe to add bacteriostatic water hold plunger so it does not shoot the water into the peptide or vial.",
          "Inject very slowly down the inside vial wall; avoid foaming.",
          "Gently swirl/roll until dissolved—solution should be clear (do not shake).",
          "Refrigerate at 2–8 °C (35.6–46.4 °F).",
        ],
      },
      {
        title: "Standard / gradual approach",
        paragraphs: [
          "Frequency: Subcutaneous, once daily.",
          "Cycle length: 8–12 weeks; optional extension to 16 weeks, with 4 weeks off.",
          "Weeks 1–2: 2,000 mcg (2.0 mg) daily — 30 units (0.30 mL).\nWeeks 3–4: 3,000 mcg (3.0 mg) daily — 45 units (0.45 mL).\nWeeks 5–8: 4,000 mcg (4.0 mg) daily — 60 units (0.60 mL).\nWeeks 9–12: 5,000 mcg (5.0 mg) daily — 75 units (0.75 mL).",
          "From a research-protocol standpoint, morning or evening is reasonable; consistency day to day matters more than clock time.",
        ],
      },
      {
        title: "How this works",
        paragraphs: [
          "Cartalax (Ala-Glu-Asp) is among the Khavinson bioregulatory peptides—ultrashort peptides studied for interactions with gene expression at nanomolar concentrations. The sequence corresponds to a motif in type XI collagen, important for cartilage integrity.",
        ],
      },
      {
        title: "Potential benefits and limitations",
        paragraphs: [
          "Preclinical literature describes fibroblast proliferation support, extracellular matrix homeostasis, and general tolerability in observational settings; mild injection-site reactions may occur.",
          "Limitations: No large-scale human RCTs; most data derive from in vitro or rodent models.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
  "selank-10mg-sk10": {
    sections: [
      {
        title: "Mixing steps",
        paragraphs: [
          "Remove the vial from refrigerator and allow to equilibrate at room temperature for 15–20 minutes.",
          "Wipe top of peptide and bacteriostatic water with alcohol to disinfect.",
          "Draw 3.0 mL (3 × 1 mL syringe) bacteriostatic water with a sterile syringe. All our vials are vacuum sealed, so when inserting syringe to add bacteriostatic water hold plunger so it does not shoot the water into the peptide or vial.",
          "Inject slowly down the vial wall; avoid foaming.",
          "Gently swirl/roll until dissolved—solution should be clear (do not shake).",
          "Refrigerate at 2–8 °C (35.6–46.4 °F).",
        ],
      },
      {
        title: "Timing considerations for Selank",
        paragraphs: [
          "Research protocols use varied schedules; timing may depend on study goals.",
          "Some researchers use morning administration when investigating stress resilience and cognitive performance; others use evening administration when exploring relaxation and sleep quality.",
        ],
      },
      {
        title: "Evening administration",
        paragraphs: [
          "Supporting relaxation: Selank may promote a calmer mental state after a stressful day.",
          "Mental quieting: Investigated for reducing mental tension and excessive worry via stress-related neurotransmitter pathways.",
          "Minimal sedative effects: Research has not demonstrated pronounced sedation; calm without feeling drugged.",
        ],
      },
      {
        title: "Selank (10 mg) quick dosage guide",
        paragraphs: [
          "After reconstituting this 10 mg vial with 3 mL of bacteriostatic water, concentration is approximately 3.33 mg/mL (~33 mcg per unit).",
          "Low dosage (100 mcg): Draw to the 3-unit mark. Ideal for light anxiety relief and a calm, focused state.",
          "The sweet spot (250 mcg): Draw to the 7.5-unit mark. Ideal for stress management, mood enhancement, and cognitive stability.",
          "Advanced dosage (500 mcg): Draw to the 15-unit mark. Ideal for intensive support during high-stress periods.",
        ],
      },
      {
        title: "Protocol and cycle length",
        paragraphs: [
          "Frequency: Administer once daily.",
          "Cycle length: A typical cycle lasts 2 to 4 weeks.",
          "The break: Take a 2 to 4-week break between cycles.",
        ],
      },
      {
        title: "Administration tips",
        paragraphs: [
          "Start low, go slow: Begin at 100 mcg (3 units) for the first few days.",
          "Hydration: Proper water intake supports metabolic and neurological shifts.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
  "kisspeptin-10mg-ks10": {
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
        title: "When to take",
        paragraphs: [
          "Kisspeptin is typically taken once daily; consistent timing matters more than the exact hour.",
          "Evening or nighttime dosing is often preferred to align with natural hormonal signaling rhythms.",
        ],
      },
      {
        title: "Kisspeptin-10 (10 mg) dosage guide",
        paragraphs: [
          "After reconstituting this 10 mg vial with 3 mL of bacteriostatic water, the concentration is 3.33 mg/mL.",
          "Low dosage (100 mcg): Draw to the 3-unit mark. Ideal for maintaining baseline hormonal signaling.",
          "The ideal spot (200 mcg): Draw to the 6-unit mark. Ideal for stimulating natural testosterone and LH production.",
          "High dosage (500 mcg): Draw to the 15-unit mark. Ideal for intensive axis reboot protocols.",
        ],
      },
      {
        title: "For men: the axis reboot cycle",
        paragraphs: [
          "Cycle length: 10 to 14 days of continuous use, followed by a minimum 14-day break.",
          "Frequency: Usually once daily (at night) or twice daily (morning and night).",
          "Maintenance option: 2–3 times per week for up to 8 weeks, then a 4-week break.",
        ],
      },
      {
        title: "For women: the hormonal harmony cycle",
        paragraphs: [
          "Cycle length: 5 to 10 days, often during the follicular phase (starting around day 3 or 5) in fertility research.",
          "The break: Usually discontinued after ovulation until the next cycle begins.",
          "Restart protocol: 10 days on, 20 days off until the cycle returns.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
  "dsip-15mg": {
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
        title: "DSIP (15 mg) dosage guide",
        paragraphs: [
          "After reconstituting this 15 mg vial with 2 mL of bacteriostatic water:",
          "Low dosage (100 mcg): Draw to the 6-unit mark. Ideal for subtle relaxation and minor sleep disruptions.",
          "The ideal range (250 mcg): Draw to the 15-unit mark. Ideal for deep, restorative slow-wave sleep and managing high cortisol.",
          "High dosage (500 mcg): Draw to the 30-unit mark. Ideal for advanced recovery protocols or significant insomnia.",
        ],
      },
      {
        title: "Protocol and timing",
        paragraphs: [
          "The pulse strategy: DSIP is most effective 2 to 3 times per week. Every-other-day or pre-stress-day use helps maintain potency.",
          "Optimal timing: Administer 30 to 60 minutes before bed.",
          "Cycle length: 4 to 6 weeks to reset a broken sleep schedule, followed by a 2-week break.",
        ],
      },
      {
        title: "Administration tips",
        paragraphs: [
          "Sleep latency: DSIP may not cause immediate drowsiness like a sleeping pill. Follow your normal bedtime routine without re-dosing.",
          "Morning after clarity: Grogginess may indicate deep recovery debt—lower dose slightly and allow 7–8 hours of sleep.",
          "Synergy with GH secretagogues: DSIP pairs with nighttime Ipamorelin in some protocols to support GH release during delta-wave sleep.",
        ],
      },
    ],
    closingDisclaimer: EDU_CLOSING_DEFAULT,
  },
};

export function getProductEducationalGuide(slug: string): ProductEducationalGuide | null {
  return PRODUCT_EDUCATIONAL_GUIDES[slug] ?? null;
}
