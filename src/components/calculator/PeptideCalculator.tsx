"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
type AmountUnit = "mg" | "mcg";

function parsePositive(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export function PeptideCalculator() {
  const [vialMg, setVialMg] = useState("5");
  const [liquidMl, setLiquidMl] = useState("2");
  const [amount, setAmount] = useState("250");
  const [amountUnit, setAmountUnit] = useState<AmountUnit>("mcg");

  const result = useMemo(() => {
    const vial = parsePositive(vialMg);
    const vol = parsePositive(liquidMl);
    const rawAmount = parsePositive(amount);
    if (vial == null || vol == null || rawAmount == null) {
      return { error: "Enter valid positive numbers for all fields." as string | null };
    }
    if (vial > 1_000_000 || vol > 1_000 || rawAmount > 1_000_000) {
      return { error: "Values exceed supported range." };
    }
    const amountMg = amountUnit === "mg" ? rawAmount : rawAmount / 1000;
    const concentration = vial / vol;
    if (!Number.isFinite(concentration) || concentration <= 0) {
      return { error: "Unable to calculate concentration." };
    }
    if (amountMg > vial) {
      return {
        error: "Requested amount exceeds total contents in the vial.",
        concentration,
        amountMg,
        vial,
        vol,
      };
    }
    const volumeMl = amountMg / concentration;
    const volumeUl = volumeMl * 1000;
    return {
      error: null as string | null,
      concentration,
      volumeMl,
      volumeUl,
      amountMg,
      vial,
      vol,
    };
  }, [vialMg, liquidMl, amount, amountUnit]);

  const reset = () => {
    setVialMg("5");
    setLiquidMl("2");
    setAmount("250");
    setAmountUnit("mcg");
  };

  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
      <div className="glass-panel min-w-0 rounded-2xl p-4 sm:p-6 lg:p-8">
        <h2 className="font-display text-2xl font-semibold text-white">Conversion inputs</h2>
        <p className="mt-2 text-sm text-muted">
          Enter vial contents and reconstitution volume, then specify an amount to convert. This
          tool performs transparent arithmetic only.
        </p>

        <div className="mt-6 space-y-5">
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">Amount in vial (mg)</span>
            <input
              inputMode="decimal"
              value={vialMg}
              onChange={(e) => setVialMg(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none focus:border-accent"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">Liquid volume (mL)</span>
            <input
              inputMode="decimal"
              value={liquidMl}
              onChange={(e) => setLiquidMl(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none focus:border-accent"
            />
          </label>
          <div>
            <span className="mb-1.5 block text-sm text-muted">Amount to convert</span>
            <div className="flex gap-2">
              <input
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none focus:border-accent"
              />
              <select
                value={amountUnit}
                onChange={(e) => setAmountUnit(e.target.value as AmountUnit)}
                className="rounded-xl border border-border bg-surface px-3 py-3 text-sm"
                aria-label="Amount unit"
              >
                <option value="mg">mg</option>
                <option value="mcg">mcg</option>
              </select>
            </div>
          </div>
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
                  Concentration (mg/mL) = {result.vial?.toFixed(3)} mg ÷ {result.vol?.toFixed(3)} mL
                </div>
                <div className="text-accent">
                  = {result.concentration.toFixed(4)} mg/mL
                </div>
                {!result.error && (
                  <>
                    <div className="mt-3">
                      Volume (mL) = {result.amountMg?.toFixed(4)} mg ÷{" "}
                      {result.concentration.toFixed(4)} mg/mL
                    </div>
                    <div className="text-accent">= {result.volumeMl?.toFixed(4)} mL</div>
                    <div className="mt-3 text-muted">
                      ≈ {result.volumeUl?.toFixed(2)} µL (microlitres)
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>

        <div className="glass-panel rounded-2xl p-6 text-sm text-muted">
          <h3 className="font-display text-base font-semibold text-foreground">Worked example</h3>
          <p className="mt-2">
            Vial: <span className="text-foreground">5 mg</span> · Liquid:{" "}
            <span className="text-foreground">2 mL</span> → concentration{" "}
            <span className="text-accent">2.5 mg/mL</span>. Converting{" "}
            <span className="text-foreground">250 mcg</span> (0.25 mg): 0.25 ÷ 2.5 ={" "}
            <span className="text-accent">0.1 mL</span> (100 µL).
          </p>
        </div>
      </div>
    </div>
  );
}
