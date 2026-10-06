"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth, signOut } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import Testimonial from "@/models/Testimonial";
import DiscountCode from "@/models/DiscountCode";
import SiteSettings from "@/models/SiteSettings";
import { logAudit } from "@/lib/audit";
import { deleteStoredUploadByUrl, deleteStoredUploadsIfUnreferenced } from "@/lib/uploads";

async function adminSession() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const productSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  slug: z.string().optional(),
  description: z.string().optional(),
  category: z.string().min(1),
  images: z.array(z.string()).optional(),
  sku: z.string().optional(),
  priceCAD: z.coerce.number().min(0),
  salePriceCAD: z.coerce.number().min(0).optional().nullable(),
  stock: z.coerce.number().int().min(0),
  featured: z.coerce.boolean(),
  displayOrder: z.coerce.number().int(),
  published: z.coerce.boolean(),
});

export async function deleteStoredUploadAction(url: string) {
  await adminSession();
  await deleteStoredUploadByUrl(url);
  return { ok: true as const };
}

export async function saveProduct(formData: FormData) {
  const session = await adminSession();
  const imagesRaw = String(formData.get("images") ?? "");
  const images = imagesRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const parsed = productSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug") || undefined,
    description: formData.get("description"),
    category: formData.get("category"),
    sku: formData.get("sku"),
    priceCAD: formData.get("priceCAD"),
    salePriceCAD: formData.get("salePriceCAD") || null,
    stock: formData.get("stock"),
    featured: formData.get("featured") === "on",
    displayOrder: formData.get("displayOrder") ?? 0,
    published: formData.get("published") === "on",
    images,
  });
  if (!parsed.success) return { ok: false as const, error: "Invalid product data" };

  await connectDB();
  const slug = parsed.data.slug?.trim() || slugify(parsed.data.title);
  const payload = {
    ...parsed.data,
    slug,
    images,
    salePriceCAD: parsed.data.salePriceCAD || undefined,
  };
  delete (payload as { id?: string }).id;

  let previousImages: string[] = [];
  if (parsed.data.id) {
    const prev = await Product.findById(parsed.data.id).select("images").lean();
    previousImages = prev?.images ?? [];
  }

  let product;
  try {
    if (parsed.data.id) {
      product = await Product.findByIdAndUpdate(parsed.data.id, payload, { new: true });
      if (!product) return { ok: false as const, error: "Product not found." };
      await logAudit({
        actorId: session.user.id,
        actorEmail: session.user.email ?? undefined,
        action: "product.update",
        entityType: "product",
        entityId: parsed.data.id,
      });
    } else {
      product = await Product.create(payload);
      await logAudit({
        actorId: session.user.id,
        actorEmail: session.user.email ?? undefined,
        action: "product.create",
        entityType: "product",
        entityId: String(product._id),
      });
    }
  } catch (err) {
    const code = err && typeof err === "object" && "code" in err ? (err as { code: number }).code : 0;
    if (code === 11000) {
      return { ok: false as const, error: "A product with this slug already exists. Choose a different slug or title." };
    }
    throw err;
  }

  const removedImages = previousImages.filter((url) => !images.includes(url));
  await deleteStoredUploadsIfUnreferenced(removedImages);

  revalidatePath("/shop");
  revalidatePath("/");
  if (product?.slug) revalidatePath(`/shop/${product.slug}`);
  revalidatePath("/admin/products");
  revalidatePath("/admin/inventory");
  return { ok: true as const, id: String(product?._id), error: undefined as string | undefined };
}

export async function updateProductStock(productId: string, stock: number) {
  const session = await adminSession();
  const parsed = z.coerce.number().int().min(0).safeParse(stock);
  if (!parsed.success) return { ok: false as const, error: "Stock must be zero or greater." };

  await connectDB();
  const updated = await Product.findByIdAndUpdate(
    productId,
    { $set: { stock: parsed.data } },
    { new: true },
  );
  if (!updated) return { ok: false as const, error: "Product not found." };

  await logAudit({
    actorId: session.user.id,
    actorEmail: session.user.email ?? undefined,
    action: "product.stock_update",
    entityType: "product",
    entityId: productId,
    details: { stock: parsed.data, title: updated.title },
  });

  revalidatePath("/shop");
  revalidatePath("/");
  revalidatePath("/admin/products");
  revalidatePath("/admin/inventory");
  return { ok: true as const };
}

export async function deleteProduct(id: string) {
  const session = await adminSession();
  await connectDB();
  await Product.findByIdAndDelete(id);
  await logAudit({
    actorId: session.user.id,
    actorEmail: session.user.email ?? undefined,
    action: "product.delete",
    entityType: "product",
    entityId: id,
  });
  revalidatePath("/shop");
  revalidatePath("/admin/products");
  revalidatePath("/admin/inventory");
  return { ok: true as const };
}

export async function archiveOrder(id: string) {
  const session = await adminSession();
  await connectDB();
  await Order.findByIdAndUpdate(id, { archivedAt: new Date() });
  await logAudit({
    actorId: session.user.id,
    actorEmail: session.user.email ?? undefined,
    action: "order.archive",
    entityType: "order",
    entityId: id,
  });
  revalidatePath("/admin/orders");
  return { ok: true as const };
}

export async function deleteOrderPermanent(id: string, confirm: string) {
  const session = await adminSession();
  if (confirm !== "DELETE") return { ok: false as const, error: "Confirmation required" };
  await connectDB();
  await Order.findByIdAndUpdate(id, { deletedAt: new Date() });
  await logAudit({
    actorId: session.user.id,
    actorEmail: session.user.email ?? undefined,
    action: "order.soft_delete",
    entityType: "order",
    entityId: id,
  });
  revalidatePath("/admin/orders");
  return { ok: true as const };
}

export async function updateOrderStatus(id: string, fulfillmentStatus: string) {
  const session = await adminSession();
  await connectDB();
  await Order.findByIdAndUpdate(id, { fulfillmentStatus });
  await logAudit({
    actorId: session.user.id,
    actorEmail: session.user.email ?? undefined,
    action: "order.fulfillment",
    entityType: "order",
    entityId: id,
    details: { fulfillmentStatus },
  });
  revalidatePath(`/admin/orders/${id}`);
  return { ok: true as const };
}

async function restockOrderLines(order: {
  items: { productId: unknown; variantId?: string | null; quantity: number }[];
}) {
  for (const line of order.items) {
    const product = await Product.findById(line.productId);
    if (!product) continue;
    if (line.variantId && product.variants?.length) {
      const v = product.variants.id(line.variantId);
      if (v) v.stock += line.quantity;
    } else {
      product.stock += line.quantity;
    }
    await product.save();
  }
}

export async function markOrderPaid(id: string) {
  const session = await adminSession();
  await connectDB();
  const order = await Order.findById(id);
  if (!order || order.deletedAt) return { ok: false as const, error: "Order not found" };
  order.paymentStatus = "paid";
  if (order.fulfillmentStatus === "new") order.fulfillmentStatus = "processing";
  await order.save();
  await logAudit({
    actorId: session.user.id,
    actorEmail: session.user.email ?? undefined,
    action: "order.payment_paid",
    entityType: "order",
    entityId: id,
  });
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/admin/orders");
  revalidatePath(`/order/${id}/payment`);
  return { ok: true as const };
}

export async function cancelUnpaidOrder(id: string) {
  const session = await adminSession();
  await connectDB();
  const order = await Order.findById(id);
  if (!order || order.deletedAt) return { ok: false as const, error: "Order not found" };
  if (order.paymentStatus === "paid") {
    return { ok: false as const, error: "Order is already paid" };
  }
  await restockOrderLines(order);
  order.paymentStatus = "failed";
  order.fulfillmentStatus = "cancelled";
  await order.save();
  await logAudit({
    actorId: session.user.id,
    actorEmail: session.user.email ?? undefined,
    action: "order.cancel_unpaid",
    entityType: "order",
    entityId: id,
  });
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/admin/orders");
  revalidatePath("/admin/inventory");
  revalidatePath(`/order/${id}/payment`);
  return { ok: true as const };
}

export async function saveTestimonialForm(formData: FormData): Promise<void> {
  await saveTestimonial(formData);
}

async function saveTestimonial(formData: FormData) {
  const session = await adminSession();
  await connectDB();
  const id = String(formData.get("id") || "");
  const payload = {
    authorName: String(formData.get("authorName")),
    authorLocation: String(formData.get("authorLocation") || ""),
    content: String(formData.get("content")),
    rating: formData.get("rating") ? Number(formData.get("rating")) : undefined,
    published: formData.get("published") === "on",
    displayOrder: Number(formData.get("displayOrder") ?? 0),
  };
  if (id) await Testimonial.findByIdAndUpdate(id, payload);
  else await Testimonial.create(payload);
  await logAudit({
    actorId: session.user.id,
    actorEmail: session.user.email ?? undefined,
    action: id ? "testimonial.update" : "testimonial.create",
    entityType: "testimonial",
    entityId: id || undefined,
  });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { ok: true as const };
}

export async function deleteTestimonial(id: string) {
  const session = await adminSession();
  await connectDB();
  await Testimonial.findByIdAndDelete(id);
  await logAudit({
    actorId: session.user.id,
    actorEmail: session.user.email ?? undefined,
    action: "testimonial.delete",
    entityType: "testimonial",
    entityId: id,
  });
  revalidatePath("/");
  return { ok: true as const };
}

export async function saveDiscountForm(formData: FormData): Promise<void> {
  await saveDiscount(formData);
}

async function saveDiscount(formData: FormData) {
  const session = await adminSession();
  await connectDB();
  const id = String(formData.get("id") || "");
  const payload = {
    code: String(formData.get("code")).toUpperCase(),
    type: String(formData.get("type")) as "percent" | "fixed",
    value: Number(formData.get("value")),
    minOrderCAD: Number(formData.get("minOrderCAD") ?? 0),
    expiresAt: formData.get("expiresAt") ? new Date(String(formData.get("expiresAt"))) : null,
    maxUses: formData.get("maxUses") ? Number(formData.get("maxUses")) : null,
    maxUsesPerCustomer: formData.get("maxUsesPerCustomer")
      ? Number(formData.get("maxUsesPerCustomer"))
      : null,
    active: formData.get("active") === "on",
  };
  if (id) await DiscountCode.findByIdAndUpdate(id, payload);
  else await DiscountCode.create(payload);
  await logAudit({
    actorId: session.user.id,
    actorEmail: session.user.email ?? undefined,
    action: id ? "discount.update" : "discount.create",
    entityType: "discount",
    entityId: id || undefined,
  });
  revalidatePath("/admin/discounts");
  return { ok: true as const };
}

export async function deleteDiscount(id: string) {
  const session = await adminSession();
  await connectDB();
  await DiscountCode.findByIdAndDelete(id);
  await logAudit({
    actorId: session.user.id,
    actorEmail: session.user.email ?? undefined,
    action: "discount.delete",
    entityType: "discount",
    entityId: id,
  });
  revalidatePath("/admin/discounts");
  return { ok: true as const };
}

export async function adminSignOut() {
  await signOut({ redirectTo: "/admin/login" });
}

export async function saveSiteSettingsForm(formData: FormData): Promise<void> {
  await saveSiteSettings(formData);
}

async function saveSiteSettings(formData: FormData) {
  const session = await adminSession();
  await connectDB();
  const settings = await SiteSettings.findOne({ singletonKey: "default" });
  if (!settings) throw new Error("Settings missing");

  settings.contactEmail = String(formData.get("contactEmail"));
  settings.contactPhone = String(formData.get("contactPhone"));
  settings.homeIntro = String(formData.get("homeIntro"));
  settings.bookingAvailabilityMessage = String(formData.get("bookingAvailabilityMessage"));
  settings.aboutContent = String(formData.get("aboutContent"));
  settings.shippingFlatRateCAD = Number(formData.get("shippingFlatRateCAD") ?? 0);
  settings.freeShippingThresholdCAD = formData.get("freeShippingThresholdCAD")
    ? Number(formData.get("freeShippingThresholdCAD"))
    : null;
  settings.taxEnabled = formData.get("taxEnabled") === "on";
  settings.taxRatePercent = Number(formData.get("taxRatePercent") ?? 0);
  settings.checkoutEnabled = formData.get("checkoutEnabled") === "on";
  settings.checkoutUnavailableMessage = String(formData.get("checkoutUnavailableMessage"));
  settings.pricingRangeApproved = formData.get("pricingRangeApproved") === "on";
  settings.pricingRangeMinCAD = formData.get("pricingRangeMinCAD")
    ? Number(formData.get("pricingRangeMinCAD"))
    : null;
  settings.pricingRangeMaxCAD = formData.get("pricingRangeMaxCAD")
    ? Number(formData.get("pricingRangeMaxCAD"))
    : null;
  settings.policies = {
    shipping: String(formData.get("policyShipping")),
    returns: String(formData.get("policyReturns")),
    privacy: String(formData.get("policyPrivacy")),
    terms: String(formData.get("policyTerms")),
  };
  settings.homeHero = {
    headline: String(formData.get("heroHeadline")),
    subheadline: String(formData.get("heroSubheadline")),
    ctaPrimary: String(formData.get("heroCtaPrimary")),
    ctaSecondary: String(formData.get("heroCtaSecondary")),
  };
  await settings.save();
  await logAudit({
    actorId: session.user.id,
    actorEmail: session.user.email ?? undefined,
    action: "settings.update",
    entityType: "site_settings",
  });
  revalidatePath("/");
  return { ok: true as const };
}
