import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { TERMS_AND_CONDITIONS } from "@/content/terms-and-conditions";
import { BRAND, POLICY_REVIEW_NOTICE, SHIPPING_FLAT_RATE_CAD } from "@/lib/constants";

const defaultHomeHero = {
  headline: "Precision-formulated products. Elevated experience.",
  subheadline:
    "Intense Dropz — a premium Canadian storefront built for clarity, quality, and confident shopping.",
  ctaPrimary: "Explore the shop",
  ctaSecondary: "Peptide calculator",
};

const defaultAbout = `[Owner review required]

Replace this block in Admin → Settings with your approved story: why you started Intense Dropz, your quality standards, and what makes your catalog trustworthy — only include claims you can verify.`;

const defaultPolicies = {
  shipping: `${POLICY_REVIEW_NOTICE}\n\nAdd your shipping regions, carriers, processing times, and any restrictions once approved for your market.`,
  returns: `${POLICY_REVIEW_NOTICE}\n\nAdd your return eligibility, windows, and process once approved by the owner.`,
  privacy: `${POLICY_REVIEW_NOTICE}\n\nDescribe what data you collect, how orders and forms are handled, and contact details for privacy requests.`,
  terms: TERMS_AND_CONDITIONS,
};

const SiteSettingsSchema = new Schema(
  {
    singletonKey: { type: String, default: "default", unique: true },
    contactEmail: { type: String, default: BRAND.email },
    contactPhone: { type: String, default: BRAND.phone },
    homeHero: { type: Schema.Types.Mixed, default: defaultHomeHero },
    homeIntro: {
      type: String,
      default:
        "Intense Dropz is designed to be fast, transparent, and mobile-ready — with tools that help you shop with confidence.",
    },
    bookingAvailabilityMessage: {
      type: String,
      default:
        "Submit an appointment or inquiry request below. Our team will respond using the contact details you provide. This form is not a medical consultation unless explicitly confirmed by the business.",
    },
    pricingRangeMinCAD: { type: Number, default: null, min: 0 },
    pricingRangeMaxCAD: { type: Number, default: null, min: 0 },
    pricingRangeApproved: { type: Boolean, default: false },
    shippingFlatRateCAD: { type: Number, default: SHIPPING_FLAT_RATE_CAD, min: 0 },
    freeShippingThresholdCAD: { type: Number, default: null, min: 0 },
    taxRatePercent: { type: Number, default: 0, min: 0, max: 100 },
    taxEnabled: { type: Boolean, default: false },
    aboutContent: { type: String, default: defaultAbout },
    policies: {
      shipping: { type: String, default: defaultPolicies.shipping },
      returns: { type: String, default: defaultPolicies.returns },
      privacy: { type: String, default: defaultPolicies.privacy },
      terms: { type: String, default: defaultPolicies.terms },
    },
    checkoutEnabled: { type: Boolean, default: false },
    checkoutUnavailableMessage: {
      type: String,
      default:
        "Online checkout is not yet activated. Published products and pricing must be approved, policies finalized, and payment processing confirmed before live sales begin.",
    },
  },
  { timestamps: true },
);

export type ISiteSettings = InferSchemaType<typeof SiteSettingsSchema> & {
  _id: mongoose.Types.ObjectId;
};

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ??
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
