import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const DiscountRedemptionSchema = new Schema(
  {
    codeId: { type: Schema.Types.ObjectId, ref: "DiscountCode", required: true, index: true },
    code: { type: String, required: true, uppercase: true },
    customerKey: { type: String, required: true, index: true },
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
  },
  { timestamps: true },
);

DiscountRedemptionSchema.index({ codeId: 1, customerKey: 1 });

export type IDiscountRedemption = InferSchemaType<typeof DiscountRedemptionSchema> & {
  _id: mongoose.Types.ObjectId;
};

const DiscountRedemption: Model<IDiscountRedemption> =
  mongoose.models.DiscountRedemption ??
  mongoose.model<IDiscountRedemption>("DiscountRedemption", DiscountRedemptionSchema);

export default DiscountRedemption;
