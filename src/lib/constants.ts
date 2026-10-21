export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/** Flat tracked shipping (CAD) — also set in Admin → Settings and shipping policy. */
export const SHIPPING_FLAT_RATE_CAD = 25.64;

/** Ontario HST-style rate applied to subtotal + shipping when tax is enabled in settings. */
export const DEFAULT_TAX_RATE_PERCENT = 13;

/** List and charge whole-dollar CAD (e.g. 16.57 → 17). */
export function ceilPriceCAD(amount: number): number {
  if (!Number.isFinite(amount)) return 0;
  if (amount % 1 !== 0) return Math.round(amount * 100) / 100;
  return Math.ceil(amount);
}

export const BRAND = {
  name: "Intense Dropz",
  email: "info@intensedropz.ca",
  phone: "226-499-8539",
  phoneTel: "+12264998539",
  market: "Canada",
  currency: "CAD",
  url: getSiteUrl(),
};

export const POLICY_REVIEW_NOTICE =
  "Draft for owner review — replace with your approved policy before going live.";

/** Home → “The experience” section body (editable in Admin → Settings). */
export const HOME_INTRO_DEFAULT =
  "Intense Dropz is our public brand! Our online experience is designed to be fast, transparent, and mobile-ready — with tools that help you shop with confidence.";

export const PICKUP_ORDER_CUSTOMER_NOTE =
  "Your order is reserved for local pickup. Pay in person when you collect your items (cash, e-Transfer, or another method we accept). We will email you when your order is ready.";

export const FOOTER_REFERRAL_LINE = "The greatest compliment you can give us is a referral";

export const FOOTER_RESEARCH_DISCLAIMER =
  "All products sold are intended for in vitro laboratory research purposes only and are not for human consumption, medical use, or veterinary use. These products are not drugs, food additives, or cosmetics and have not been evaluated by Health Canada, the FDA, or any other regulatory authority.";
