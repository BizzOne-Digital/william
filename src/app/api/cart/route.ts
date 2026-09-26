import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import { getOrCreateCartSessionId } from "@/lib/cart-session";
import { calculateCartTotals } from "@/lib/pricing";

export async function GET() {
  const sessionId = await getOrCreateCartSessionId();
  const totals = await calculateCartTotals(sessionId);
  return NextResponse.json(totals);
}

const mutateSchema = z.object({
  action: z.enum(["add", "update", "remove", "clear", "setDiscount"]),
  productId: z.string().optional(),
  variantId: z.string().nullable().optional(),
  quantity: z.number().int().min(1).max(99).optional(),
  discountCode: z.string().nullable().optional(),
});

export async function POST(req: Request) {
  const sessionId = await getOrCreateCartSessionId();
  const body = await req.json();
  const parsed = mutateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await connectDB();
  let cart = await Cart.findOne({ sessionId });
  if (!cart) {
    cart = await Cart.create({ sessionId, items: [] });
  }

  const { action, productId, variantId, quantity, discountCode } = parsed.data;

  if (action === "clear") {
    cart.set("items", []);
    cart.discountCode = null;
    await cart.save();
    return NextResponse.json(await calculateCartTotals(sessionId));
  }

  if (action === "setDiscount") {
    cart.discountCode = discountCode?.trim().toUpperCase() || null;
    await cart.save();
    const totals = await calculateCartTotals(sessionId);
    return NextResponse.json(totals);
  }

  if (!productId) {
    return NextResponse.json({ error: "Product required" }, { status: 400 });
  }

  const product = await Product.findById(productId);
  if (!product || !product.published) {
    return NextResponse.json({ error: "Product unavailable" }, { status: 404 });
  }

  const idx = cart.items.findIndex(
    (i) =>
      String(i.productId) === productId &&
      (i.variantId ?? null) === (variantId ?? null),
  );

  if (action === "remove") {
    if (idx >= 0) cart.items.splice(idx, 1);
    await cart.save();
    return NextResponse.json(await calculateCartTotals(sessionId));
  }

  const qty = quantity ?? 1;
  if (action === "add") {
    if (idx >= 0) cart.items[idx].quantity = Math.min(cart.items[idx].quantity + qty, 99);
    else cart.items.push({ productId: product._id, variantId: variantId ?? null, quantity: qty });
  } else if (action === "update") {
    if (idx >= 0) cart.items[idx].quantity = qty;
    else return NextResponse.json({ error: "Item not in cart" }, { status: 404 });
  }

  await cart.save();
  return NextResponse.json(await calculateCartTotals(sessionId));
}
