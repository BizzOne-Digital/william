import { getSiteSettings } from "@/lib/site-settings";
import { siteMetadata } from "@/lib/metadata";
import { BRAND } from "@/lib/constants";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = siteMetadata({ title: "Contact" });

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return (
    <div className="mx-auto w-full min-w-0 max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-white">Contact</h1>
      <ul className="mt-4 space-y-2 text-sm">
        <li>
          <a className="text-accent hover:underline" href={`mailto:${settings.contactEmail}`}>
            {settings.contactEmail}
          </a>
        </li>
        <li>
          <a className="text-accent hover:underline" href={`tel:${BRAND.phoneTel}`}>
            {settings.contactPhone}
          </a>
        </li>
      </ul>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
