"use client";

import { cn } from "@/lib/cn";

type CalculatorPresetFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  presets: number[];
  unit: string;
  placeholder: string;
  step?: string;
};

export function CalculatorPresetField({
  label,
  value,
  onChange,
  presets,
  unit,
  placeholder,
  step = "any",
}: CalculatorPresetFieldProps) {
  const active = (n: number) => {
    const v = Number(value);
    return Number.isFinite(v) && Math.abs(v - n) < 1e-9;
  };

  return (
    <div className="text-sm">
      <span className="mb-2 block font-semibold text-foreground">{label}</span>
      <div className="flex flex-wrap gap-2">
        {presets.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(String(n))}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition",
              active(n)
                ? "border-accent bg-accent/15 text-accent"
                : "border-border bg-surface text-muted hover:border-accent/40 hover:text-foreground",
            )}
          >
            {n}
            {unit}
          </button>
        ))}
      </div>
      <input
        inputMode="decimal"
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full rounded-full border border-border bg-surface px-4 py-3 text-foreground outline-none focus:border-accent"
      />
    </div>
  );
}
