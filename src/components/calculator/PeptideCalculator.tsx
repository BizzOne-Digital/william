"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SyringeDoseVisual } from "@/components/calculator/SyringeDoseVisual";
import { CalculatorPresetField } from "@/components/calculator/CalculatorPresetField";

const DOSE_MG_PRESETS = [0.1, 0.25, 0.5, 1, 2, 2.5, 5, 7.5, 10, 12.5, 15];
const STRENGTH_MG_PRESETS = [1, 5, 10, 15, 20, 50];
const WATER_ML_PRESETS = [0.5, 1, 1.5, 2, 2.5, 3];

function parsePositive(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export function PeptideCalculator() {
  const [strengthMg, setStrengthMg] = useState("5");
  const [waterMl, setWaterMl] = useState("2");
  const [doseMg, setDoseMg] = useState("0.25");

  const result = useMemo(() => {
    const strength = parsePositive(strengthMg);
    const water = parsePositive(waterMl);
    const dose = parsePositive(doseMg);
    if (strength == null || water == null || dose == null) {
      return { error: "Enter valid positive numbers for all fields." as string | null };
    }
    if (strength > 1_000_000 || water > 1_000 || dose > 1_000_000) {
      return { error: "Values exceed supported range." };
    }
    const concentration = strength / water;
    if (!Number.isFinite(concentration) || concentration <= 0) {
      return { error: "Unable to calculate concentration." };
    }
    if (dose > strength) {
      return {
        error: "Dose is greater than the strength in the vial.",
        concentration,
        dose,
        strength,
        water,
      };
    }
    const volumeMl = dose / concentration;
    const volumeUl = volumeMl * 1000;
    return {
      error: null as string | null,
      concentration,
      volumeMl,
      volumeUl,
      dose,
      strength,
      water,
    };
  }, [strengthMg, waterMl, doseMg]);

  const reset = () => {
    setStrengthMg("5");
    setWaterMl("2");
    setDoseMg("0.25");
  };

  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
      <div className="glass-panel min-w-0 rounded-2xl p-4 sm:p-6 lg:p-8">
        <h2 className="font-display text-2xl font-semibold text-white">Peptide calculator</h2>
        <p className="mt-2 text-sm text-muted">
          Enter your dose, vial strength, and bacteriostatic water (BAC) volume. The tool shows
          concentration and draw volume — educational arithmetic only.
        </p>

        <div className="mt-6 space-y-6">
          <CalculatorPresetField
            label="Dose of peptide"
            value={doseMg}
            onChange={setDoseMg}
            presets={DOSE_MG_PRESETS}
            unit="mg"
            placeholder="Enter custom dose (mg)"
          />
          <CalculatorPresetField
            label="Strength of peptide"
            value={strengthMg}
            onChange={setStrengthMg}
            presets={STRENGTH_MG_PRESETS}
            unit="mg"
            placeholder="Enter custom strength (mg)"
          />
          <CalculatorPresetField
            label="Water (BAC) of peptide"
            value={waterMl}
            onChange={setWaterMl}
            presets={WATER_ML_PRESETS}
            unit="mL"
            placeholder="Enter custom water (mL)"
          />
          <Button type="button" variant="secondary" onClick={reset}>
            Reset
          </Button>
        </div>

        <div className="mt-8 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-100/90">
          <strong className="font-semibold">Not medical advice.</strong> This calculator is an
          educational arithmetic tool. It does not recommend amounts, injection methods, or safety.
          Follow product documentation and guidance from a qualified professional.
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-panel rounded-2xl p-6 sm:p-8">
          <h3 className="font-display text-xl font-semibold text-white">Results</h3>
          {"error" in result && result.error && !("concentration" in result && result.concentration) ? (
            <p className="mt-4 text-sm text-red-300">{result.error}</p>
          ) : "concentration" in result && result.concentration ? (
            <div className="mt-4 space-y-4 text-sm">
              {result.error && (
                <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-200">
                  {result.error}
                </p>
              )}
              <div className="overflow-x-auto rounded-xl bg-black/25 p-4 font-mono text-[12px] leading-relaxed text-slate-200 sm:text-[13px]">
                <div>
                  Concentration (mg/mL) = {result.strength?.toFixed(3)} mg strength ÷{" "}
                  {result.water?.toFixed(3)} mL BAC
                </div>
                <div className="text-accent">= {result.concentration.toFixed(4)} mg/mL</div>
                {!result.error && (
                  <>
                    <div className="mt-3">
                      Draw volume (mL) = {result.dose?.toFixed(4)} mg dose ÷{" "}
                      {result.concentration.toFixed(4)} mg/mL
                    </div>
                    <div className="text-accent">= {result.volumeMl?.toFixed(4)} mL</div>
                    <div className="mt-3 text-muted">
                      ≈ {result.volumeUl?.toFixed(2)} µL (microlitres)
                    </div>
                  </>
                )}
              </div>
              {!result.error &&
                result.volumeMl != null &&
                result.volumeUl != null &&
                result.volumeMl > 0 && (
                  <SyringeDoseVisual volumeMl={result.volumeMl} volumeUl={result.volumeUl} />
                )}
            </div>
          ) : null}
        </div>

        <div className="glass-panel rounded-2xl p-6 text-sm text-muted">
          <h3 className="font-display text-base font-semibold text-foreground">Worked example</h3>
          <p className="mt-2">
            Strength: <span className="text-foreground">5 mg</span> · Water (BAC):{" "}
            <span className="text-foreground">2 mL</span> → concentration{" "}
            <span className="text-accent">2.5 mg/mL</span>. Dose{" "}
            <span className="text-foreground">0.25 mg</span>: 0.25 ÷ 2.5 ={" "}
            <span className="text-accent">0.1 mL</span> (100 µL).
          </p>
        </div>
      </div>
    </div>
  );
}
