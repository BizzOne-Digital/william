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
import { createCheckoutSession, getPaymentConfig } from "@/lib/payment";
import { sendBusinessEmail } from "@/lib/email";
import { BRAND } from "@/lib/constants";

const checkoutSchema = z.object({
  email: z.string().email(),
  phone: z.string().optional(),
  shippingAddress: z.object({
    fullName: z.string().min(2),
    line1: z.string().min(3),
    line2: z.string().optional(),
    city: z.string().min(2),
    province: z.string().min(2),
    postalCode: z.string().min(3),
    country: z.string().default("CA"),
  }),
});

export async function POST(req: Request) {
  const settings = await getSiteSettings();
  const payment = getPaymentConfig();
  const checkoutAllowed = settings.checkoutEnabled && payment.enabled;

  const sessionId = await getOrCreateCartSessionId();
  const customerKey = sessionId;
  const totals = await calculateCartTotals(sessionId, {
    applyDiscount: true,
    customerKey,
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

  const body = await req.json();
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout details" }, { status: 400 });
  }

  if (!checkoutAllowed) {
    await connectDB();
    const orderNumber = generateOrderNumber();
    const order = await Order.create({
      orderNumber,
      email: parsed.data.email,
      phone: parsed.data.phone,
      shippingAddress: parsed.data.shippingAddress,
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
      paymentStatus: "unavailable",
      checkoutNote: settings.checkoutUnavailableMessage,
    });

    return NextResponse.json(
      {
        ok: false,
        checkoutDisabled: true,
        message: settings.checkoutUnavailableMessage,
        orderId: String(order._id),
        orderNumber: order.orderNumber,
      },
      { status: 503 },
    );
  }

  await connectDB();

  for (const line of totals.items) {
    const product = await Product.findById(line.productId);
    if (!product) continue;
    if (line.variantId && product.variants?.length) {
      const v = product.variants.id(line.variantId);
      if (!v || v.stock < line.quantity) {
        return NextResponse.json({ error: "Stock changed. Refresh your cart." }, { status: 409 });
      }
      v.stock -= line.quantity;
    } else {
      if (product.stock < line.quantity) {
        return NextResponse.json({ error: "Stock changed. Refresh your cart." }, { status: 409 });
      }
      product.stock -= line.quantity;
    }
    await product.save();
  }

  const orderNumber = generateOrderNumber();
  const order = await Order.create({
    orderNumber,
    email: parsed.data.email,
    phone: parsed.data.phone,
    shippingAddress: parsed.data.shippingAddress,
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
    paymentProvider: "stripe",
  });

  if (totals.discountValid && totals.discountCode) {
    try {
      await redeemDiscountForOrder({
        code: totals.discountCode,
        customerKey,
        orderId: order._id,
      });
    } catch {
      // Order created; discount redemption failed — admin can adjust
    }
  }

  const cart = await Cart.findOne({ sessionId });
  if (cart) {
    cart.set("items", []);
    cart.discountCode = null;
    await cart.save();
  }

  const base = BRAND.url.replace(/\/$/, "");
  const lineItems = [
    ...totals.items.map((i) => ({
      name: i.title,
      amountCents: Math.round(i.unitPriceCAD * 100),
      quantity: i.quantity,
    })),
  ];
  if (totals.shippingCAD > 0) {
    lineItems.push({
      name: "Shipping",
      amountCents: Math.round(totals.shippingCAD * 100),
      quantity: 1,
    });
  }
  if (totals.taxCAD > 0) {
    lineItems.push({
      name: "Tax",
      amountCents: Math.round(totals.taxCAD * 100),
      quantity: 1,
    });
  }
  if (totals.discountCAD > 0) {
    lineItems.push({
      name: "Discount",
      amountCents: -Math.round(totals.discountCAD * 100),
      quantity: 1,
    });
  }

  const session = await createCheckoutSession({
    orderId: String(order._id),
    orderNumber,
    email: parsed.data.email,
    lineItems,
    successUrl: `${base}/order/${order._id}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${base}/checkout?cancelled=1`,
  });

  if (!session.ok || !session.url) {
    order.paymentStatus = "failed";
    await order.save();
    return NextResponse.json({ error: "Unable to start payment session." }, { status: 502 });
  }

  order.paymentReference = session.sessionId;
  await order.save();

  await sendBusinessEmail({
    subject: `New order ${orderNumber} — payment pending`,
    text: `Order ${orderNumber} for ${parsed.data.email}. Total: ${totals.totalCAD} CAD. Awaiting payment confirmation via webhook.`,
  });

  return NextResponse.json({ ok: true, url: session.url, orderId: String(order._id) });
}
