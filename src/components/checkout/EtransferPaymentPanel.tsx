import { formatCAD } from "@/lib/product-utils";
import { Button } from "@/components/ui/Button";
import type { buildEtransferInstructions } from "@/lib/payment/etransfer";

type Instructions = ReturnType<typeof buildEtransferInstructions>;

export function EtransferPaymentPanel({
  orderNumber,
  totalCAD,
  instructions,
  paymentDueAt,
  paid,
}: {
  orderNumber: string;
  totalCAD: number;
  instructions: Instructions;
  paymentDueAt: Date | null;
  paid: boolean;
}) {
  const dueLabel =
    paymentDueAt &&
    paymentDueAt.toLocaleString("en-CA", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/Toronto",
    });

  if (paid) {
    return (
      <p className="text-sm leading-relaxed text-muted">
        Payment for order <span className="font-medium text-foreground">{orderNumber}</span> is confirmed.
      </p>
    );
  }

  return (
    <div className="space-y-6 text-left text-sm">
      <p className="leading-relaxed text-muted">
        Send an Interac e-Transfer for <span className="font-semibold text-white">{formatCAD(totalCAD)}</span>.
        Your order is reserved until payment is received{dueLabel ? ` (please pay by ${dueLabel} ET)` : ""}.
      </p>
      <dl className="space-y-3 rounded-xl border border-border bg-surface/50 p-4">
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted">Send to</dt>
          <dd className="mt-1 font-mono text-base text-white">{instructions.email}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted">Amount (CAD)</dt>
          <dd className="mt-1 text-lg font-semibold text-white">${instructions.amount}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted">Message / memo (required)</dt>
          <dd className="mt-1 font-mono text-base text-accent">{instructions.memo}</dd>
        </div>
      </dl>
      <ul className="list-disc space-y-2 pl-5 text-muted">
        {instructions.lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/shop" variant="secondary" className="w-full sm:w-auto">Continue shopping</Button>
        <Button href="/" variant="secondary" className="w-full sm:w-auto">Return to home</Button>
      </div>
    </div>
  );
}
