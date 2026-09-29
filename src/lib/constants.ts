export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
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
