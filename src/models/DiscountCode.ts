import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const DiscountCodeSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    type: { type: String, enum: ["percent", "fixed"], required: true },
    value: { type: Number, required: true, min: 0 },
    minOrderCAD: { type: Number, default: 0, min: 0 },
    expiresAt: { type: Date, default: null },
    maxUses: { type: Number, default: null, min: 1 },
    maxUsesPerCustomer: { type: Number, default: null, min: 1 },
    usageCount: { type: Number, default: 0, min: 0 },
    restrictedCategories: [{ type: String }],
    restrictedProductIds: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    active: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

export type IDiscountCode = InferSchemaType<typeof DiscountCodeSchema> & {
  _id: mongoose.Types.ObjectId;
};

const DiscountCode: Model<IDiscountCode> =
  mongoose.models.DiscountCode ??
  mongoose.model<IDiscountCode>("DiscountCode", DiscountCodeSchema);

export default DiscountCode;
