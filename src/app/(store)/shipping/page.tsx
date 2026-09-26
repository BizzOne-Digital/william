import { getSiteSettings } from "@/lib/site-settings";
import { PolicyPage } from "@/components/PolicyPage";
import { siteMetadata } from "@/lib/metadata";

export const metadata = siteMetadata({ title: "Shipping" });

export default async function ShippingPage() {
  const settings = await getSiteSettings();
  return <PolicyPage title="Shipping" body={settings.policies?.shipping ?? ""} />;
}
