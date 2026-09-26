import { getSiteSettings } from "@/lib/site-settings";
import { siteMetadata } from "@/lib/metadata";
import { AboutPageContent } from "@/components/about/AboutPageContent";

export const metadata = siteMetadata({
  title: "About Us",
  description: "Learn about Intense Dropz and WJT Enterprises.",
});

export default async function AboutPage() {
  const settings = await getSiteSettings();
  return (
    <AboutPageContent
      ownerMessage={settings.aboutContent}
      contactEmail={settings.contactEmail}
      contactPhone={settings.contactPhone}
    />
  );
}
