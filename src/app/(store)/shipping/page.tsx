import { PolicyPage } from "@/components/PolicyPage";
import { SHIPPING_POLICY } from "@/content/shipping-policy";
import { siteMetadata } from "@/lib/metadata";

export const metadata = siteMetadata({
  title: "Shipping",
  description: "Shipping rates, processing times, and delivery information for Intense Dropz.",
});

export default function ShippingPage() {
  return <PolicyPage title="Shipping Policy" body={SHIPPING_POLICY} />;
}
