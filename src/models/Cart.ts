import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const CartItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    variantId: { type: String, default: null },
    quantity: { type: Number, required: true, min: 1, default: 1 },
  },
  { _id: false },
);

const CartSchema = new Schema(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    items: [CartItemSchema],
    discountCode: { type: String, default: null },
  },
  { timestamps: true },
);

export type ICart = InferSchemaType<typeof CartSchema> & {
  _id: mongoose.Types.ObjectId;
};

const Cart: Model<ICart> =
  mongoose.models.Cart ?? mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
