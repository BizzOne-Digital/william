import { PeptideCalculator } from "@/components/calculator/PeptideCalculator";
import { siteMetadata } from "@/lib/metadata";

export const metadata = siteMetadata({
  title: "Peptide Calculator",
  description: "Educational mg/mL and volume conversion tool.",
});

export default function CalculatorPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-white">Peptide calculator</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Transparent unit conversion based on your inputs. This tool does not provide medical advice
        or recommended amounts.
      </p>
      <div className="mt-10">
        <PeptideCalculator />
      </div>
    </div>
  );
}
