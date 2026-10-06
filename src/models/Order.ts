import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const OrderLineSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    variantId: { type: String },
    title: { type: String, required: true },
    sku: { type: String },
    unitPriceCAD: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    lineTotalCAD: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const OrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    shippingAddress: {
      fullName: String,
      line1: String,
      line2: String,
      city: String,
      province: String,
      postalCode: String,
      country: { type: String, default: "CA" },
    },
    items: [OrderLineSchema],
    subtotalCAD: { type: Number, required: true, min: 0 },
    discountCAD: { type: Number, default: 0, min: 0 },
    shippingCAD: { type: Number, default: 0, min: 0 },
    taxCAD: { type: Number, default: 0, min: 0 },
    totalCAD: { type: Number, required: true, min: 0 },
    discountCode: { type: String, trim: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded", "unavailable"],
      default: "pending",
    },
    paymentProvider: { type: String },
    paymentReference: { type: String },
    paymentDueAt: { type: Date, default: null },
    fulfillmentStatus: {
      type: String,
      enum: ["new", "processing", "shipped", "delivered", "cancelled"],
      default: "new",
    },
    checkoutNote: { type: String },
    archivedAt: { type: Date, default: null },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export type IOrder = InferSchemaType<typeof OrderSchema> & {
  _id: mongoose.Types.ObjectId;
};

const Order: Model<IOrder> =
  mongoose.models.Order ?? mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
