import { connectDB } from "@/lib/mongodb";
import { DEFAULT_TAX_RATE_PERCENT, HOME_INTRO_DEFAULT } from "@/lib/constants";
import SiteSettings, { type ISiteSettings } from "@/models/SiteSettings";

export async function getSiteSettings(): Promise<ISiteSettings> {
  await connectDB();
  let settings = await SiteSettings.findOne({ singletonKey: "default" });
  if (!settings) {
    settings = await SiteSettings.create({ singletonKey: "default" });
    return settings;
  }

  let dirty = false;
  if (!settings.taxEnabled && settings.taxRatePercent === 0) {
    settings.taxEnabled = true;
    settings.taxRatePercent = DEFAULT_TAX_RATE_PERCENT;
    dirty = true;
  }
  if (!settings.checkoutEnabled) {
    settings.checkoutEnabled = true;
    dirty = true;
  }
  const legacyHomeIntro =
    "Intense Dropz is designed to be fast, transparent, and mobile-ready — with tools that help you shop with confidence.";
  if (settings.homeIntro === legacyHomeIntro) {
    settings.homeIntro = HOME_INTRO_DEFAULT;
    dirty = true;
  }
  if (dirty) await settings.save();

  return settings;
}

export function serializeSettings(settings: ISiteSettings) {
  return JSON.parse(JSON.stringify(settings));
}
