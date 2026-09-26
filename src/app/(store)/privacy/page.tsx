import { getSiteSettings } from "@/lib/site-settings";
import { PolicyPage } from "@/components/PolicyPage";
import { siteMetadata } from "@/lib/metadata";

export const metadata = siteMetadata({ title: "Privacy" });

export default async function PrivacyPage() {
  const settings = await getSiteSettings();
  return <PolicyPage title="Privacy" body={settings.policies?.privacy ?? ""} />;
}
