import { PolicyPage } from "@/components/PolicyPage";
import { RETURN_REFUND_POLICY } from "@/content/return-refund-policy";
import { siteMetadata } from "@/lib/metadata";

export const metadata = siteMetadata({
  title: "Returns",
  description: "Return and refund policy for Intense Dropz orders.",
});

export default function ReturnsPage() {
  return <PolicyPage title="Return & Refund Policy" body={RETURN_REFUND_POLICY} />;
}
