import { getSiteSettings } from "@/lib/site-settings";
import { PolicyPage } from "@/components/PolicyPage";
import { siteMetadata } from "@/lib/metadata";

export const metadata = siteMetadata({ title: "Returns" });

export default async function ReturnsPage() {
  const settings = await getSiteSettings();
  return <PolicyPage title="Returns" body={settings.policies?.returns ?? ""} />;
}
