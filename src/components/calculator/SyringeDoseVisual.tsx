"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

/** U-100 insulin syringe: 100 units = 1 mL (each unit = 0.01 mL). */
const SYRINGE_SIZES_ML = [1, 0.5, 0.3] as const;
type SyringeSizeMl = (typeof SYRINGE_SIZES_ML)[number];

type SyringeDoseVisualProps = {
  volumeMl: number;
  volumeUl: number;
};

export function SyringeDoseVisual({ volumeMl, volumeUl }: SyringeDoseVisualProps) {
  const [syringeMl, setSyringeMl] = useState<SyringeSizeMl>(1);

  const units = volumeMl * 100;
  const maxUnits = syringeMl * 100;
  const overCapacity = volumeMl > syringeMl + 1e-9;
  const fillRatio = overCapacity ? 1 : Math.max(0, Math.min(1, volumeMl / syringeMl));

  const suggestedSize = useMemo((): SyringeSizeMl => {
    if (volumeMl <= 0.3) return 0.3;
    if (volumeMl <= 0.5) return 0.5;
    return 1;
  }, [volumeMl]);

  const barrelTop = 48;
  const barrelBottom = 268;
  const barrelHeight = barrelBottom - barrelTop;
  const fillTop = barrelBottom - fillRatio * barrelHeight;

  const majorStep = syringeMl >= 1 ? 10 : syringeMl >= 0.5 ? 5 : 5;
  const tickCount = Math.round(maxUnits / majorStep);

  return (
    <div className="mt-6 border-t border-border pt-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h4 className="font-display text-base font-semibold text-white">Syringe preview</h4>
          <p className="mt-1 text-xs text-muted">
            U-100 style markings (100 units = 1 mL). Visual guide only — verify with your syringe
            label.
          </p>
        </div>
        <label className="text-xs text-muted">
          <span className="mb-1 block">Barrel size</span>
          <select
            value={syringeMl}
            onChange={(e) => setSyringeMl(Number(e.target.value) as SyringeSizeMl)}
            className="rounded-lg border border-border bg-surface px-2 py-1.5 text-sm text-foreground"
            aria-label="Syringe barrel size"
          >
            {SYRINGE_SIZES_ML.map((ml) => (
              <option key={ml} value={ml}>
                {ml} mL ({ml * 100} units)
              </option>
            ))}
          </select>
        </label>
      </div>

      {overCapacity && (
        <p className="mt-3 rounded-lg border border-amber-500/35 bg-amber-500/10 px-3 py-2 text-xs text-amber-100/95">
          {volumeMl > 1 ? (
            <>
              Dose ({volumeMl.toFixed(3)} mL) exceeds a standard 1 mL syringe. Adjust inputs or use
              equipment appropriate for your protocol.
            </>
          ) : (
            <>
              Dose ({volumeMl.toFixed(3)} mL) is larger than a {syringeMl} mL syringe. Switch to a{" "}
              {suggestedSize} mL barrel or adjust inputs.
            </>
          )}
        </p>
      )}

      <div
        className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center sm:gap-8"
        role="img"
        aria-label={`Syringe filled to ${units.toFixed(1)} units, ${volumeMl.toFixed(3)} milliliters`}
      >
        <svg
          viewBox="0 0 140 320"
          className="h-auto w-[min(100%,9.5rem)] shrink-0 drop-shadow-[0_0_24px_rgba(7,120,214,0.15)]"
          aria-hidden
        >
          <defs>
            <linearGradient id="syringeLiquid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(7,120,214,0.55)" />
              <stop offset="100%" stopColor="rgba(7,120,214,0.28)" />
            </linearGradient>
            <clipPath id="syringeBarrelClip">
              <rect x="44" y={barrelTop} width="52" height={barrelHeight} rx="4" />
            </clipPath>
          </defs>

          {/* Plunger rod */}
          <rect x="67" y="8" width="6" height={barrelTop - 4} rx="2" fill="rgba(148,163,184,0.45)" />
          <rect x="58" y="4" width="24" height="14" rx="4" fill="rgba(226,232,240,0.35)" />

          {/* Barrel outline */}
          <rect
            x="44"
            y={barrelTop}
            width="52"
            height={barrelHeight}
            rx="5"
            fill="rgba(15,23,42,0.85)"
            stroke="rgba(148,163,184,0.45)"
            strokeWidth="1.5"
          />

          {/* Liquid fill */}
          <g clipPath="url(#syringeBarrelClip)">
            <rect
              x="44"
              y={fillTop}
              width="52"
              height={barrelBottom - fillTop}
              fill="url(#syringeLiquid)"
            />
            {!overCapacity && fillRatio > 0.02 && (
              <line
                x1="42"
                x2="98"
                y1={fillTop}
                y2={fillTop}
                stroke="#0778d6"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
            )}
          </g>

          {/* Graduations */}
          {Array.from({ length: tickCount + 1 }, (_, i) => {
            const unit = i * majorStep;
            const ratio = unit / maxUnits;
            const y = barrelBottom - ratio * barrelHeight;
            const isMajor = unit % (majorStep * 2) === 0 || unit === maxUnits;
            return (
              <g key={unit}>
                <line
                  x1={isMajor ? 38 : 40}
                  x2="44"
                  y1={y}
                  y2={y}
                  stroke="rgba(148,163,184,0.7)"
                  strokeWidth={isMajor ? 1.2 : 0.8}
                />
                {isMajor && (
                  <text
                    x="34"
                    y={y + 3}
                    textAnchor="end"
                    fontSize="8"
                    fill="rgba(148,163,184,0.85)"
                    fontFamily="ui-monospace, monospace"
                  >
                    {unit}
                  </text>
                )}
              </g>
            );
          })}

          {/* Needle hub + needle */}
          <rect x="52" y={barrelBottom} width="36" height="14" rx="3" fill="rgba(148,163,184,0.35)" />
          <line
            x1="70"
            x2="70"
            y1={barrelBottom + 14}
            y2="312"
            stroke="rgba(203,213,225,0.75)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <polygon points="70,312 66,302 74,302" fill="rgba(203,213,225,0.6)" />
        </svg>

        <div className="w-full max-w-xs space-y-3 text-sm sm:pt-2">
          <div className="rounded-xl border border-accent/25 bg-accent/5 p-4">
            <p className="text-xs uppercase tracking-wide text-muted">Draw to</p>
            <p className="mt-1 font-display text-2xl font-bold text-accent">
              {units.toFixed(units < 10 ? 1 : 0)} units
            </p>
            <p className="mt-1 font-mono text-foreground">
              {volumeMl.toFixed(3)} mL · {volumeUl.toFixed(1)} µL
            </p>
          </div>
          <p className="text-xs leading-relaxed text-muted">
            On a U-100 syringe, each numbered unit is 0.01 mL. Align the top of the plunger rubber
            with the dashed blue line (liquid meniscus level).
          </p>
          {!overCapacity && syringeMl !== suggestedSize && (
            <button
              type="button"
              onClick={() => setSyringeMl(suggestedSize)}
              className={cn(
                "text-xs text-accent underline-offset-2 hover:underline",
              )}
            >
              Use suggested {suggestedSize} mL syringe for this dose
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
