import { getSiteSettings } from "@/lib/site-settings";
import { PolicyPage } from "@/components/PolicyPage";
import { siteMetadata } from "@/lib/metadata";

export const metadata = siteMetadata({ title: "Terms" });

export default async function TermsPage() {
  const settings = await getSiteSettings();
  return <PolicyPage title="Terms" body={settings.policies?.terms ?? ""} />;
}
