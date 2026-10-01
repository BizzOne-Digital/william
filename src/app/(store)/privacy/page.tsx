import { PolicyPage } from "@/components/PolicyPage";
import { PRIVACY_POLICY } from "@/content/privacy-policy";
import { siteMetadata } from "@/lib/metadata";

export const metadata = siteMetadata({
  title: "Privacy",
  description: "Privacy and cookie policy for intensedropz.ca.",
});

export default function PrivacyPage() {
  return <PolicyPage title="Privacy and Cookie Policy" body={PRIVACY_POLICY} />;
}
