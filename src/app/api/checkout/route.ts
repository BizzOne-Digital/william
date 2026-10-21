import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import { getOrCreateCartSessionId } from "@/lib/cart-session";
import {
  calculateCartTotals,
  generateOrderNumber,
  redeemDiscountForOrder,
} from "@/lib/pricing";
import { getSiteSettings } from "@/lib/site-settings";
import {
  buildEtransferInstructions,
  createCheckoutSession,
  getEtransferPaymentDueAt,
  getPaymentConfig,
  isPickupCheckoutEnabled,
} from "@/lib/payment";
import { sendBusinessEmail, sendCustomerEmail } from "@/lib/email";
import { BRAND, PICKUP_ORDER_CUSTOMER_NOTE } from "@/lib/constants";
import type { FulfillmentMethod } from "@/lib/pricing";

export const maxDuration = 60;

const checkoutSchema = z
  .object({
    fulfillmentMethod: z.enum(["shipping", "local_pickup"]).default("shipping"),
    email: z.string().email(),
    phone: z.string().optional(),
    shippingAddress: z.object({
      fullName: z.string().min(2),
      line1: z.string().optional(),
      line2: z.string().optional(),
      city: z.string().optional(),
      province: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().default("CA"),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.fulfillmentMethod === "shipping") {
      const a = data.shippingAddress;
      if (!a.line1 || a.line1.length < 3) {
        ctx.addIssue({ code: "custom", message: "Address required", path: ["shippingAddress", "line1"] });
      }
      if (!a.city || a.city.length < 2) {
        ctx.addIssue({ code: "custom", message: "City required", path: ["shippingAddress", "city"] });
      }
      if (!a.province || a.province.length < 2) {
        ctx.addIssue({ code: "custom", message: "Province required", path: ["shippingAddress", "province"] });
      }
      if (!a.postalCode || a.postalCode.length < 3) {
        ctx.addIssue({ code: "custom", message: "Postal code required", path: ["shippingAddress", "postalCode"] });
      }
    }
  });

export async function POST(req: Request) {
  try {
    const settings = await getSiteSettings();
    const payment = getPaymentConfig();
    const checkoutAllowed = settings.checkoutEnabled && payment.enabled;

    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid checkout details" }, { status: 400 });
    }

    const fulfillmentMethod = parsed.data.fulfillmentMethod as FulfillmentMethod;
    const isPickup = fulfillmentMethod === "local_pickup";

    if (isPickup && !isPickupCheckoutEnabled()) {
      return NextResponse.json({ error: "Local pickup orders are not available right now." }, { status: 503 });
    }

    if (!isPickup && !checkoutAllowed) {
      const message = !payment.enabled
        ? "Checkout is not configured. Set PAYMENT_PROVIDER=etransfer (and ETRANSFER_EMAIL) or Stripe keys on the server, then redeploy."
        : settings.checkoutUnavailableMessage;
      return NextResponse.json({ error: message }, { status: 503 });
    }

    const sessionId = await getOrCreateCartSessionId();
    const customerKey = sessionId;
    const totals = await calculateCartTotals(sessionId, {
      applyDiscount: true,
      customerKey,
      fulfillmentMethod,
    });

    if (!totals.items.length) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }
    if (totals.items.some((i) => !i.available)) {
      return NextResponse.json(
        { error: "One or more items are out of stock or unavailable." },
        { status: 400 },
      );
    }

    await connectDB();

    for (const line of totals.items) {
      const product = await Product.findById(line.productId);
      if (!product) {
        return NextResponse.json({ error: "A product in your cart is no longer available." }, { status: 409 });
      }
      if (line.variantId && product.variants?.length) {
        const v = product.variants.id(line.variantId);
        if (!v || v.stock < line.quantity) {
          return NextResponse.json({ error: "Stock changed. Refresh your cart." }, { status: 409 });
        }
      } else if (product.stock < line.quantity) {
        return NextResponse.json({ error: "Stock changed. Refresh your cart." }, { status: 409 });
      }
    }

    const orderNumber = generateOrderNumber();
    const provider = isPickup ? "pickup" : payment.provider;
    const paymentDueAt = provider === "etransfer" ? getEtransferPaymentDueAt() : null;

    const shippingAddress = isPickup
      ? {
          fullName: parsed.data.shippingAddress.fullName,
          line1: "Local pickup",
          line2: parsed.data.phone ? `Phone: ${parsed.data.phone}` : undefined,
          city: "Pickup",
          province: "—",
          postalCode: "—",
          country: "CA",
        }
      : {
          fullName: parsed.data.shippingAddress.fullName,
          line1: parsed.data.shippingAddress.line1!,
          line2: parsed.data.shippingAddress.line2,
          city: parsed.data.shippingAddress.city!,
          province: parsed.data.shippingAddress.province!,
          postalCode: parsed.data.shippingAddress.postalCode!,
          country: parsed.data.shippingAddress.country ?? "CA",
        };

    const order = await Order.create({
      orderNumber,
      email: parsed.data.email,
      phone: parsed.data.phone,
      shippingAddress,
      fulfillmentMethod,
      items: totals.items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        title: i.title,
        sku: i.sku,
        unitPriceCAD: i.unitPriceCAD,
        quantity: i.quantity,
        lineTotalCAD: i.lineTotalCAD,
      })),
      subtotalCAD: totals.subtotalCAD,
      discountCAD: totals.discountCAD,
      shippingCAD: totals.shippingCAD,
      taxCAD: totals.taxCAD,
      totalCAD: totals.totalCAD,
      discountCode: totals.discountValid ? totals.discountCode : null,
      paymentStatus: "pending",
      paymentProvider: provider,
      paymentDueAt,
    });

    const base = BRAND.url.replace(/\/$/, "");
    const totalCents = Math.round(totals.totalCAD * 100);
    if (totalCents < 1) {
      await Order.findByIdAndDelete(order._id);
      return NextResponse.json({ error: "Order total is invalid." }, { status: 400 });
    }

    let redirectUrl: string;

    if (isPickup) {
      order.checkoutNote = PICKUP_ORDER_CUSTOMER_NOTE;
      redirectUrl = `${base}/order/${order._id}/confirmation`;
    } else if (provider === "etransfer") {
      redirectUrl = `${base}/order/${order._id}/payment`;
    } else {
      if (totalCents < 50) {
        await Order.findByIdAndDelete(order._id);
        return NextResponse.json({ error: "Order total is too small to charge." }, { status: 400 });
      }

      const session = await createCheckoutSession({
        orderId: String(order._id),
        orderNumber,
        email: parsed.data.email,
        lineItems: [{ name: `Intense Dropz order ${orderNumber}`, amountCents: totalCents, quantity: 1 }],
        successUrl: `${base}/order/${order._id}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${base}/checkout?cancelled=1`,
      });

      if (!session.ok || !session.url) {
        await Order.findByIdAndDelete(order._id);
        const stripeMessage =
          session.ok === false && "message" in session ? session.message : "Unable to start payment session.";
        return NextResponse.json({ error: stripeMessage }, { status: 502 });
      }

      order.paymentReference = session.sessionId;
      redirectUrl = session.url;
    }

    for (const line of totals.items) {
      const product = await Product.findById(line.productId);
      if (!product) continue;
      if (line.variantId && product.variants?.length) {
        const v = product.variants.id(line.variantId);
        if (v) v.stock -= line.quantity;
      } else {
        product.stock -= line.quantity;
      }
      await product.save();
    }

    if (totals.discountValid && totals.discountCode) {
      try {
        await redeemDiscountForOrder({
          code: totals.discountCode,
          customerKey,
          orderId: order._id,
        });
      } catch {
        /* admin can adjust */
      }
    }

    const cart = await Cart.findOne({ sessionId });
    if (cart) {
      cart.set("items", []);
      cart.discountCode = null;
      await cart.save();
    }

    await order.save();

    if (isPickup) {
      void sendCustomerEmail({
        to: parsed.data.email,
        subject: `Order ${orderNumber} — local pickup reserved`,
        text: `${PICKUP_ORDER_CUSTOMER_NOTE}\n\nOrder ${orderNumber}\nTotal: ${totals.totalCAD} CAD (pay when you pick up).\n\nQuestions: ${BRAND.email} or ${BRAND.phone}.`,
      }).catch((err) => console.error("[checkout customer email]", err));
      void sendBusinessEmail({
        subject: `New order ${orderNumber} — local pickup (pay in person)`,
        text: `Order ${orderNumber} for ${parsed.data.email}. Total: ${totals.totalCAD} CAD. Customer will pay in person on pickup. Phone: ${parsed.data.phone ?? "—"}.`,
        replyTo: parsed.data.email,
      }).catch((err) => console.error("[checkout email]", err));
    } else if (provider === "etransfer") {
      const instructions = buildEtransferInstructions({
        orderNumber,
        totalCAD: totals.totalCAD,
        paymentPageUrl: redirectUrl,
      });
      void sendCustomerEmail({
        to: parsed.data.email,
        subject: `Order ${orderNumber} — e-Transfer instructions`,
        text: instructions.text,
      }).catch((err) => console.error("[checkout customer email]", err));
      void sendBusinessEmail({
        subject: `New order ${orderNumber} — e-Transfer pending`,
        text: `Order ${orderNumber} for ${parsed.data.email}. Total: ${totals.totalCAD} CAD. Awaiting Interac e-Transfer to ${instructions.email}. Memo: ${orderNumber}.`,
        replyTo: parsed.data.email,
      }).catch((err) => console.error("[checkout email]", err));
    } else {
      void sendBusinessEmail({
        subject: `New order ${orderNumber} — payment pending`,
        text: `Order ${orderNumber} for ${parsed.data.email}. Total: ${totals.totalCAD} CAD. Awaiting payment confirmation via webhook.`,
        replyTo: parsed.data.email,
      }).catch((err) => console.error("[checkout email]", err));
    }

    return NextResponse.json({ ok: true, url: redirectUrl, orderId: String(order._id) });
  } catch (err) {
    console.error("[checkout]", err);
    const message = err instanceof Error ? err.message : "Checkout failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
