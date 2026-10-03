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

export const FOOTER_REFERRAL_LINE = "Our greatest compliments are your referrals";

export const FOOTER_RESEARCH_DISCLAIMER =
  "All products sold are intended for in vitro laboratory research purposes only and are not for human consumption, medical use, or veterinary use. These products are not drugs, food additives, or cosmetics and have not been evaluated by Health Canada, the FDA, or any other regulatory authority.";
