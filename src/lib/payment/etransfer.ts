import { BRAND } from "@/lib/constants";

export function getEtransferEmail(): string {
  const fromEnv = process.env.ETRANSFER_EMAIL?.trim();
  return fromEnv || BRAND.email;
}

export function getEtransferPaymentHours(): number {
  const raw = process.env.ETRANSFER_PAYMENT_HOURS?.trim();
  const n = raw ? Number(raw) : 24;
  if (!Number.isFinite(n) || n < 1) return 24;
  return Math.min(Math.floor(n), 168);
}

export function getEtransferPaymentDueAt(from: Date = new Date()): Date {
  const due = new Date(from);
  due.setHours(due.getHours() + getEtransferPaymentHours());
  return due;
}

export function buildEtransferInstructions(params: {
  orderNumber: string;
  totalCAD: number;
  paymentPageUrl: string;
}) {
  const email = getEtransferEmail();
  const hours = getEtransferPaymentHours();
  const amount = params.totalCAD.toFixed(2);

  return {
    email,
    hours,
    amount,
    memo: params.orderNumber,
    lines: [
      `Send ${amount} CAD via Interac e-Transfer to ${email}.`,
      `In the message / memo field, enter exactly: ${params.orderNumber}`,
      `Autodeposit is enabled — no security question is required.`,
      `The name shown in your banking app may differ from "${BRAND.name}"; use the email above.`,
      `Complete payment within ${hours} hours. Unpaid orders may be cancelled.`,
      `We ship after your transfer is received and confirmed.`,
    ],
    text: [
      `Order ${params.orderNumber} — Interac e-Transfer instructions`,
      ``,
      `Amount: $${amount} CAD`,
      `Send to: ${email}`,
      `Message / memo: ${params.orderNumber}`,
      ``,
      `Pay within ${hours} hours. Fulfillment begins after we confirm your transfer.`,
      ``,
      `View your order: ${params.paymentPageUrl}`,
    ].join("\n"),
  };
}
