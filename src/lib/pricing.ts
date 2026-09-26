import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import DiscountCode from "@/models/DiscountCode";
import DiscountRedemption from "@/models/DiscountRedemption";
import { getEffectivePrice } from "@/lib/product-utils";
import { getSiteSettings } from "@/lib/site-settings";

export type PricedLine = {
  productId: string;
  variantId?: string | null;
  title: string;
  sku?: string;
  quantity: number;
  unitPriceCAD: number;
  lineTotalCAD: number;
  available: boolean;
  stock: number;
};

export type CartTotals = {
  items: PricedLine[];
  subtotalCAD: number;
  discountCAD: number;
  shippingCAD: number;
  taxCAD: number;
  totalCAD: number;
  discountCode: string | null;
  discountError: string | null;
  discountValid: boolean;
};

export async function calculateCartTotals(
  sessionId: string,
  options?: { applyDiscount?: boolean; customerKey?: string },
): Promise<CartTotals> {
  await connectDB();
  const settings = await getSiteSettings();
  const cart = await Cart.findOne({ sessionId });
  const empty: CartTotals = {
    items: [],
    subtotalCAD: 0,
    discountCAD: 0,
    shippingCAD: 0,
    taxCAD: 0,
    totalCAD: 0,
    discountCode: cart?.discountCode ?? null,
    discountError: null,
    discountValid: false,
  };
  if (!cart?.items?.length) return empty;

  const lines: PricedLine[] = [];
  for (const item of cart.items) {
    const product = await Product.findById(item.productId);
    if (!product || !product.published) continue;
    const pricing = getEffectivePrice(product, item.variantId);
    const unit = pricing.salePrice ?? pricing.price;
    const stock =
      item.variantId && product.variants?.length
        ? (product.variants.find((v) => String(v._id) === item.variantId)?.stock ?? 0)
        : product.stock;
    const qty = Math.min(item.quantity, Math.max(stock, 0) || item.quantity);
    lines.push({
      productId: String(product._id),
      variantId: item.variantId,
      title: product.title,
      sku: pricing.sku ?? undefined,
      quantity: qty,
      unitPriceCAD: unit,
      lineTotalCAD: Math.round(unit * qty * 100) / 100,
      available: stock >= item.quantity && stock > 0,
      stock,
    });
  }

  const subtotalCAD = lines.reduce((s, l) => s + l.lineTotalCAD, 0);
  let discountCAD = 0;
  let discountError: string | null = null;
  let discountValid = false;
  const codeStr = cart.discountCode?.trim().toUpperCase() ?? null;

  if (options?.applyDiscount !== false && codeStr) {
    const code = await DiscountCode.findOne({ code: codeStr, active: true });
    if (!code) {
      discountError = "Discount code is not valid.";
    } else if (code.expiresAt && code.expiresAt < new Date()) {
      discountError = "This discount code has expired.";
    } else if (code.maxUses != null && code.usageCount >= code.maxUses) {
      discountError = "This discount code has reached its usage limit.";
    } else if (code.minOrderCAD > subtotalCAD) {
      discountError = `Minimum order of ${code.minOrderCAD.toFixed(2)} CAD required.`;
    } else {
      const eligibleSubtotal = lines.reduce((sum, line) => {
        const product = line.productId;
        if (code.restrictedProductIds?.length) {
          const allowed = code.restrictedProductIds.some(
            (id) => String(id) === product,
          );
          if (!allowed) return sum;
        }
        return sum + line.lineTotalCAD;
      }, subtotalCAD);

      if (code.restrictedCategories?.length) {
        // Re-fetch categories for restricted check
      }

      let amount = 0;
      if (code.type === "percent") {
        amount = (eligibleSubtotal * code.value) / 100;
      } else {
        amount = code.value;
      }
      discountCAD = Math.min(Math.round(amount * 100) / 100, subtotalCAD);
      discountValid = discountCAD > 0;

      if (options?.customerKey && code.maxUsesPerCustomer != null) {
        const used = await DiscountRedemption.countDocuments({
          codeId: code._id,
          customerKey: options.customerKey,
        });
        if (used >= code.maxUsesPerCustomer) {
          discountCAD = 0;
          discountValid = false;
          discountError = "You have already used this discount code.";
        }
      }
    }
  }

  const afterDiscount = Math.max(subtotalCAD - discountCAD, 0);
  let shippingCAD = settings.shippingFlatRateCAD ?? 0;
  if (
    settings.freeShippingThresholdCAD != null &&
    afterDiscount >= settings.freeShippingThresholdCAD
  ) {
    shippingCAD = 0;
  }
  let taxCAD = 0;
  if (settings.taxEnabled && settings.taxRatePercent > 0) {
    taxCAD =
      Math.round(((afterDiscount + shippingCAD) * settings.taxRatePercent) / 100 * 100) /
      100;
  }
  const totalCAD =
    Math.round((afterDiscount + shippingCAD + taxCAD) * 100) / 100;

  return {
    items: lines,
    subtotalCAD,
    discountCAD,
    shippingCAD,
    taxCAD,
    totalCAD,
    discountCode: codeStr,
    discountError,
    discountValid,
  };
}

export async function redeemDiscountForOrder(params: {
  code: string;
  customerKey: string;
  orderId: mongoose.Types.ObjectId;
}) {
  await connectDB();
  const code = await DiscountCode.findOne({
    code: params.code.toUpperCase(),
    active: true,
  });
  if (!code) throw new Error("Invalid discount code");

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const fresh = await DiscountCode.findById(code._id).session(session);
    if (!fresh) throw new Error("Invalid discount code");
    if (fresh.maxUses != null && fresh.usageCount >= fresh.maxUses) {
      throw new Error("Discount code exhausted");
    }
    fresh.usageCount += 1;
    await fresh.save({ session });
    await DiscountRedemption.create(
      [
        {
          codeId: fresh._id,
          code: fresh.code,
          customerKey: params.customerKey,
          orderId: params.orderId,
        },
      ],
      { session },
    );
    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
}

export function generateOrderNumber() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `IDZ-${ts}-${rand}`;
}
