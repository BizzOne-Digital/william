import { getSiteSettings } from "@/lib/site-settings";
import { saveSiteSettingsForm } from "@/app/admin/actions";
import { getPaymentConfig } from "@/lib/payment";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  const payment = getPaymentConfig();
  const hero = settings.homeHero as {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-white">Site settings</h1>
      <p className="mt-2 text-sm text-muted">
        Payment adapter: {payment.provider} · Env ready: {payment.enabled ? "yes" : "no"}
      </p>
      <form action={saveSiteSettingsForm} className="mt-8 max-w-3xl space-y-6">
        <fieldset className="glass-panel space-y-3 rounded-2xl p-6">
          <legend className="px-2 font-semibold text-white">Contact</legend>
          <input name="contactEmail" defaultValue={settings.contactEmail} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
          <input name="contactPhone" defaultValue={settings.contactPhone} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
        </fieldset>
        <fieldset className="glass-panel space-y-3 rounded-2xl p-6">
          <legend className="px-2 font-semibold text-white">Homepage hero</legend>
          <input name="heroHeadline" defaultValue={hero.headline} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
          <textarea name="heroSubheadline" defaultValue={hero.subheadline} rows={3} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
          <input name="heroCtaPrimary" defaultValue={hero.ctaPrimary} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
          <input name="heroCtaSecondary" defaultValue={hero.ctaSecondary} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
          <textarea name="homeIntro" defaultValue={settings.homeIntro} rows={3} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
        </fieldset>
        <fieldset className="glass-panel space-y-3 rounded-2xl p-6">
          <legend className="px-2 font-semibold text-white">Checkout & shipping</legend>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="checkoutEnabled" defaultChecked={settings.checkoutEnabled} />
            Enable checkout (requires PAYMENTS_ENABLED + Stripe secrets)
          </label>
          <textarea name="checkoutUnavailableMessage" defaultValue={settings.checkoutUnavailableMessage} rows={3} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
          <input name="shippingFlatRateCAD" type="number" step="0.01" defaultValue={settings.shippingFlatRateCAD} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
          <input name="freeShippingThresholdCAD" type="number" step="0.01" placeholder="Free shipping threshold CAD" defaultValue={settings.freeShippingThresholdCAD ?? ""} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="taxEnabled" defaultChecked={settings.taxEnabled} /> Enable tax
          </label>
          <input name="taxRatePercent" type="number" step="0.01" defaultValue={settings.taxRatePercent} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
        </fieldset>
        <fieldset className="glass-panel space-y-3 rounded-2xl p-6">
          <legend className="px-2 font-semibold text-white">Content</legend>
          <textarea name="aboutContent" defaultValue={settings.aboutContent} rows={6} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
          <textarea name="bookingAvailabilityMessage" defaultValue={settings.bookingAvailabilityMessage} rows={3} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
        </fieldset>
        <fieldset className="glass-panel space-y-3 rounded-2xl p-6">
          <legend className="px-2 font-semibold text-white">Policies</legend>
          <textarea name="policyShipping" defaultValue={settings.policies?.shipping ?? ""} rows={4} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
          <textarea name="policyReturns" defaultValue={settings.policies?.returns ?? ""} rows={4} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
          <textarea name="policyPrivacy" defaultValue={settings.policies?.privacy ?? ""} rows={4} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
          <textarea name="policyTerms" defaultValue={settings.policies?.terms ?? ""} rows={4} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
        </fieldset>
        <button type="submit" className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white">
          Save settings
        </button>
      </form>
    </div>
  );
}
