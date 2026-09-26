import { getSiteSettings } from "@/lib/site-settings";
import { siteMetadata } from "@/lib/metadata";
import { formatCAD } from "@/lib/product-utils";

export const metadata = siteMetadata({ title: "Pricing" });

export default async function PricingPage() {
  const settings = await getSiteSettings();
  const approved =
    settings.pricingRangeApproved &&
    settings.pricingRangeMinCAD != null &&
    settings.pricingRangeMaxCAD != null;

  return (
    <div className="mx-auto w-full min-w-0 max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-white">Pricing</h1>
      <p className="mt-4 text-muted leading-relaxed">
        Exact prices appear on each published product listing once your catalog is live. We do not
        display invented product prices on this page.
      </p>
      {approved ? (
        <div className="glass-panel mt-8 rounded-2xl p-6">
          <p className="text-sm text-muted">Owner-approved starting range (CAD)</p>
          <p className="mt-2 font-display text-3xl font-semibold text-accent">
            {formatCAD(settings.pricingRangeMinCAD!)} – {formatCAD(settings.pricingRangeMaxCAD!)}
          </p>
        </div>
      ) : (
        <div className="glass-panel mt-8 rounded-2xl px-6 py-14 text-center">
          <p className="font-display text-2xl text-white">Pricing details coming soon</p>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            Approve a starting price range in the admin portal when you are ready. Until then, shop
            listings will show verified prices per product only.
          </p>
        </div>
      )}
    </div>
  );
}
