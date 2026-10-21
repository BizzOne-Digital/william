import { connectDB } from "@/lib/mongodb";
import { HOME_INTRO_DEFAULT } from "@/lib/constants";
import SiteSettings, { type ISiteSettings } from "@/models/SiteSettings";

export async function getSiteSettings(): Promise<ISiteSettings> {
  await connectDB();
  let settings = await SiteSettings.findOne({ singletonKey: "default" });
  if (!settings) {
    settings = await SiteSettings.create({ singletonKey: "default" });
    return settings;
  }

  let dirty = false;
  if (!settings.checkoutEnabled) {
    settings.checkoutEnabled = true;
    dirty = true;
  }
  const legacyHomeIntros = [
    "Intense Dropz is designed to be fast, transparent, and mobile-ready — with tools that help you shop with confidence.",
    "Intense Dropz is our public brand. Our online experience is designed to be fast, transparent, and mobile-ready—with tools that help you shop with confidence.",
    "Intense Dropz is the public brand Our online experience is designed to be fast, transparent, and mobile-ready — with tools that help you shop with confidence.",
  ];
  const introNeedsUpdate =
    legacyHomeIntros.includes(settings.homeIntro) ||
    (/Intense Dropz is the public brand/i.test(settings.homeIntro) &&
      !/our public brand/i.test(settings.homeIntro));
  if (introNeedsUpdate) {
    settings.homeIntro = HOME_INTRO_DEFAULT;
    dirty = true;
  }
  if (dirty) await settings.save();

  return settings;
}

export function serializeSettings(settings: ISiteSettings) {
  return JSON.parse(JSON.stringify(settings));
}

/** Home “Built for clarity” blurb — fixes legacy DB typos at read time. */
export function getHomeIntroText(stored: string | undefined | null): string {
  const value = stored?.trim() ?? "";
  if (!value) return HOME_INTRO_DEFAULT;
  if (value === HOME_INTRO_DEFAULT) return value;
  if (/Intense Dropz is the public brand/i.test(value) && !/our public brand/i.test(value)) {
    return HOME_INTRO_DEFAULT;
  }
  return value;
}
