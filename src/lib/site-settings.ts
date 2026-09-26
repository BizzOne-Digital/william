import { connectDB } from "@/lib/mongodb";
import SiteSettings, { type ISiteSettings } from "@/models/SiteSettings";

export async function getSiteSettings(): Promise<ISiteSettings> {
  await connectDB();
  let settings = await SiteSettings.findOne({ singletonKey: "default" });
  if (!settings) {
    settings = await SiteSettings.create({ singletonKey: "default" });
  }
  return settings;
}

export function serializeSettings(settings: ISiteSettings) {
  return JSON.parse(JSON.stringify(settings));
}
