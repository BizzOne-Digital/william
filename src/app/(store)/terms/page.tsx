import { PolicyPage } from "@/components/PolicyPage";
import { TERMS_AND_CONDITIONS } from "@/content/terms-and-conditions";
import { siteMetadata } from "@/lib/metadata";

export const metadata = siteMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions for using intensedropz.ca and purchasing research products.",
});

export default function TermsPage() {
  return <PolicyPage title="Terms & Conditions" body={TERMS_AND_CONDITIONS} />;
}
